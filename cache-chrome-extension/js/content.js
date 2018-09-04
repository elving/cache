if (document.readyState != 'loading'){
  onDomLoaded();
} else {
  document.addEventListener('DOMContentLoaded', onDomLoaded);
}

function onDomLoaded() {
  document.addEventListener('contextmenu', function (event) {
    var element = event.srcElement;

    if (element instanceof HTMLImageElement) {
      chrome.runtime.sendMessage({
        type: 'store-image',
        data: {
          src: element.src,
          alt: element.alt,
          width: element.width,
          height: element.height
        }
      });
    }
  }, true);
}
