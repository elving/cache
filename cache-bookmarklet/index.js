javascript:location.href= 'http://localhost:8080/items/create?type='
  + encodeURIComponent('link')
  + '&title=' + encodeURIComponent(document.title.replace(/(\r\n|\n|\r)/gm, ''))
  + '&sourceUrl=' + encodeURIComponent(location.href)
  + '&directUrl=' + encodeURIComponent(location.href)
  + '&description=' + encodeURIComponent(document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').getAttribute('content').replace(/(\r\n|\n|\r)/gm, ''))
  + '&storingMethod=' + encodeURIComponent('bookmarklet');
