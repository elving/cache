let currentWindow;

const { data } = require('sdk/self');
const contextMenu = require('sdk/context-menu');
const { stringify } = require('sdk/querystring');
const { ActionButton } = require('sdk/ui/button/action');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
const { getTabContentWindow, getActiveTab } = require('sdk/tabs/utils');

function getExtension(str) {
  var match = str.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  return match ? match[match.length - 1].replace('.', '') : '';
}

function removeQueryString(str) {
  return str ? str.replace(/\?.+$/g, '') : '';
}

function openUrl(data) {
  const url = `https://app.trycache.co/items/create?${stringify(data)}`;
  cacheWindow = centerPopup(url, 'Cache | Store this ' + data.type, 750);
}

function centerPopup(url, title, w, h) {
  if (!h) {
    h = currentWindow.screen.height;
  }

  const top = (currentWindow.screen.height / 2) - (h / 2);
  const left = (currentWindow.screen.width / 2) - (w / 2);

  const newWindow = currentWindow.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  if (currentWindow.focus) {
    newWindow.focus();
  }

  return newWindow;
}

function saveLink(data) {
  var item = {};

  item = {
    type: 'link',
    title: data.title,
    sourceUrl: encodeURIComponent(data.sourceUrl),
    directUrl: encodeURIComponent(data.directUrl),
    storingMethod: 'extension-chrome'
  };

  openUrl(item);
}

function saveText(data) {
  openUrl({
    type: 'text',
    title: data.title,
    metaText: data.text,
    sourceUrl: data.sourceUrl,
    directUrl: data.directUrl,
    storingMethod: 'extension-firefox'
  });
}

function saveImage(data) {
  var item = {
    type: 'image',
    title: data.title,
    sourceUrl: data.sourceUrl,
    directUrl: data.directUrl,
    metaWidth: data.width,
    metaHeight: data.height,
    metaExtension: getExtension(data.directUrl),
    storingMethod: 'extension-firefox'
  };

  if (data.width === data.height) {
    item.metaOrientation = 'square';
  } else if (data.width > data.height) {
    item.metaOrientation = 'landscape';
  } else if (data.width < data.height) {
    item.metaOrientation = 'portrait';
  }

  openUrl(item);
}

function saveVideo(data) {
  openUrl({
    type: 'video',
    title: data.title,
    sourceUrl: data.sourceUrl,
    directUrl: data.directUrl,
    storingMethod: 'extension-firefox',
    metaExtension: getExtension(data.directUrl)
  });
}

function saveAudio(data) {
  openUrl({
    type: 'audio',
    title: data.title,
    sourceUrl: data.sourceUrl,
    directUrl: data.directUrl,
    storingMethod: 'extension-firefox',
    metaExtension: getExtension(data.directUrl)
  });
}

function handleActionButtonClick() {
  const tab = getActiveTab(getMostRecentBrowserWindow());
  currentWindow = getTabContentWindow(tab);

  const selectedText = currentWindow.getSelection().toString().trim();

  if (selectedText) {
    saveText({
      text: selectedText,
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      sourceUrl: currentWindow.location.href,
      directUrl: currentWindow.location.href
    });
  } else {
    saveLink({
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      sourceUrl: currentWindow.location.href,
      directUrl: currentWindow.location.href
    });
  }
}

const button = ActionButton({
  id: 'cache-store-link',
  label: 'Store this page',

  icon: {
    '16': './icon-16.png',
    '32': './icon-32.png',
    '64': './icon-64.png'
  },

  onClick: handleActionButtonClick
});

const cacheLinkMenuItem = contextMenu.Item({
  label: 'Store link',
  image: data.url('icon-16.png'),
  context: contextMenu.SelectorContext('a'),
  contentScript: 'self.on("click", function(node) {' +
                 '  self.postMessage(node.attributes.href.value);' +
                 '});',

  onMessage: function (link) {
    const tab = getActiveTab(getMostRecentBrowserWindow());
    currentWindow = getTabContentWindow(tab);

    saveLink({
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      sourceUrl: currentWindow.location.href,
      directUrl: link
    });
  }
});

const cacheTextMenuItem = contextMenu.Item({
  label: 'Store text',
  image: data.url('icon-16.png'),
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function() {' +
                 '  self.postMessage(window.getSelection().toString());' +
                 '});',

  onMessage: function (text) {
    const tab = getActiveTab(getMostRecentBrowserWindow());
    currentWindow = getTabContentWindow(tab);

    saveText({
      text: text,
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      sourceUrl: currentWindow.location.href,
      directUrl: currentWindow.location.href
    });
  }
});

const cacheImageMenuItem = contextMenu.Item({
  label: 'Store image',
  image: data.url('icon-16.png'),
  context: contextMenu.SelectorContext('img'),
  contentScript: 'self.on("click", function(node) {' +
                 '  self.postMessage({src: node.src, width: node.width, height: node.height});' +
                 '});',

  onMessage: function (message) {
    const tab = getActiveTab(getMostRecentBrowserWindow());
    currentWindow = getTabContentWindow(tab);

    saveImage({
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      width: message.width,
      height: message.height,
      sourceUrl: currentWindow.location.href,
      directUrl: message.src
    });
  }
});

const cacheVideoMenuItem = contextMenu.Item({
  label: 'Store video',
  image: data.url('icon-16.png'),
  context: contextMenu.SelectorContext('video'),
  contentScript: 'self.on("click", function(node) {' +
                 '  self.postMessage(node.src);' +
                 '});',

  onMessage: function (src) {
    const tab = getActiveTab(getMostRecentBrowserWindow());
    currentWindow = getTabContentWindow(tab);

    saveVideo({
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      sourceUrl: currentWindow.location.href,
      directUrl: src
    });
  }
});

const cacheAudioMenuItem = contextMenu.Item({
  label: 'Store audio',
  image: data.url('icon-16.png'),
  context: contextMenu.SelectorContext('audio'),
  contentScript: 'self.on("click", function(node) {' +
                 '  if (!node.src && node.querySelector("source") !== undefined) {' +
                 '    self.postMessage(node.querySelector("source").src)' +
                 '  } else {' +
                 '    self.postMessage(node.src);' +
                 '  }' +
                 '});',

  onMessage: function (src) {
    const tab = getActiveTab(getMostRecentBrowserWindow());
    currentWindow = getTabContentWindow(tab);

    saveAudio({
      title: currentWindow.document.title.replace(/(\r\n|\n|\r)/gm, ''),
      sourceUrl: currentWindow.location.href,
      directUrl: src
    });
  }
});
