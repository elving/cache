chrome.contextMenus.create({
  'id': 'cache-page',
  'title': 'Store page',
  'contexts': ['page']
});

chrome.contextMenus.create({
  'id': 'cache-text',
  'title': 'Store text',
  'contexts': ['selection']
});

chrome.contextMenus.create({
  'id': 'cache-link',
  'title': 'Store link',
  'contexts': ['link']
});

chrome.contextMenus.create({
  'id': 'cache-image',
  'title': 'Store image',
  'contexts': ['image']
});

chrome.contextMenus.create({
  'id': 'cache-video',
  'title': 'Store video',
  'contexts': ['video']
});

chrome.contextMenus.create({
  'id': 'cache-audio',
  'title': 'Store audio',
  'contexts': ['audio']
});

chrome.contextMenus.onClicked.addListener(function(event, tab) {
  switch(event.menuItemId) {
    case 'cache-page': {
      saveLink({
        sourceUrl: event.pageUrl,
        directUrl: event.pageUrl
      });

      break;
    }

    case 'cache-text': {
      saveText({
        text: event.selectionText,
        sourceUrl: event.pageUrl,
        directUrl: event.pageUrl
      });

      break;
    }

    case 'cache-link': {
      saveLink({
        sourceUrl: event.pageUrl,
        directUrl: event.linkUrl
      });

      break;
    }

    case 'cache-image': {
      saveImage({
        sourceUrl: event.pageUrl,
        directUrl: event.srcUrl
      });

      break;
    }

    case 'cache-video': {
      saveVideo({
        sourceUrl: event.pageUrl,
        directUrl: event.srcUrl
      });

      break;
    }

    case 'cache-audio': {
      saveAudio({
        sourceUrl: event.pageUrl,
        directUrl: event.srcUrl
      });

      break;
    }

    default: {
      return true;
    }
  }
});

chrome.runtime.onMessage.addListener(function(response) {
  switch (response.type) {
    case 'store-image': {
      currentImage = response.data;
    }

    default: {
      return;
    }
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString().trim();'
  }, function(selection) {
    var selectedText = selection[0];

    if (selectedText) {
      saveText({
        text: selectedText,
        sourceUrl: tab.url,
        directUrl: tab.url
      });
    } else {
      saveLink({
        sourceUrl: tab.url,
        directUrl: tab.url
      });
    }
  });
});
