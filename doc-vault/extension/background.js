chrome.downloads.onChanged.addListener(function(delta) {
  if (delta.state && (delta.state.current == 'complete')) {
    chrome.downloads.search({id:delta.id}, function(results) {
          if (results.length > 0) {
              const path = results[0].filename;
              chrome.storage.local.set({upload: path});
              chrome.action.setPopup({
                  popup: 'detect.html'
              });
              chrome.action.openPopup();
             
              chrome.action.setPopup({
                  popup: 'index.html'
              });
          }
      })
  }
})