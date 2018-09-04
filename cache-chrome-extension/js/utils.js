var currentImage = null;
var currentWindow = null;

function makeUrl(data) {
  var url = 'https://app.trycache.co/items/create?';

  Object.keys(data).forEach(function(key) {
    url += '&' + key + '=' + data[key];
  });

  return url;
}

function openUrl(data) {
  currentWindow = createWindow(
    makeUrl(data), 'Cache | Store this ' + data.type, 750
  );
}

function createWindow(url, title, width, height) {
  height = height || screen.height;

  var top = (screen.height / 2) - (height / 2);
  var left = (screen.width / 2) - (width / 2);
  var options = 'scrollbars=yes';

  options += ', top=' + top;
  options += ', left=' + left;
  options += ', width=' + width;
  options += ', height=' + height;

  var w = window.open(url, title, options);

  if (window.focus) {
    w.focus();
  }

  return w;
}

function removeQueryString(str) {
  return str ? str.replace(/\?.+$/g, '') : '';
}

function getExtension(str) {
  var match = str.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  return match ? match[match.length - 1].replace('.', '') : '';
}

function getSelectedText() {
  return window.getSelection().toString().trim();
}

function saveLink(data) {
  var item = {};

  item = {
    type: 'link',
    sourceUrl: encodeURIComponent(data.sourceUrl),
    directUrl: encodeURIComponent(data.directUrl),
    storingMethod: 'extension-chrome'
  };

  openUrl(item);
}

function saveText(data) {
  openUrl({
    type: 'text',
    metaText: encodeURIComponent(data.text),
    sourceUrl: encodeURIComponent(data.sourceUrl),
    directUrl: encodeURIComponent(data.directUrl),
    storingMethod: 'extension-chrome'
  });
}

function saveImage(data) {
  var image = new Image();

  function onImageLoad(w, h) {
    item.metaWidth = w;
    item.metaHeight = h;

    if (w === h) {
      item.metaOrientation = 'square';
    } else if (w > h) {
      item.metaOrientation = 'landscape';
    } else if (w < h) {
      item.metaOrientation = 'portrait';
    }

    currentImage = null;
    openUrl(item);
  }

  var item = {
    type: 'image',
    sourceUrl: encodeURIComponent(data.sourceUrl),
    directUrl: encodeURIComponent(data.directUrl),
    metaExtension: getExtension(data.directUrl),
    storingMethod: 'extension-chrome'
  };

  if (currentImage && currentImage.src === decodeURIComponent(data.directUrl)) {
    onImageLoad(currentImage.width, currentImage.height);
  } else {
    image.src = data.directUrl;

    if (image.complete) {
      onImageLoad(image.width, image.height);
    } else {
      image.addEventListener('load', function() {
        onImageLoad(image.width, image.height);
      });
    }
  }
}

function saveVideo(data) {
  openUrl({
    type: 'video',
    sourceUrl: encodeURIComponent(data.sourceUrl),
    directUrl: encodeURIComponent(data.directUrl),
    storingMethod: 'extension-chrome',
    metaExtension: getExtension(data.directUrl)
  });
}

function saveAudio(data) {
  openUrl({
    type: 'audio',
    sourceUrl: encodeURIComponent(data.sourceUrl),
    directUrl: encodeURIComponent(data.directUrl),
    storingMethod: 'extension-chrome',
    metaExtension: getExtension(data.directUrl)
  });
}
