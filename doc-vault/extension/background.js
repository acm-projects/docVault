var path;
chrome.downloads.onChanged.addListener(function(delta) {
    if (delta.state && (delta.state.current == 'complete')) {
      chrome.downloads.search({id:delta.id}, function(results) {
            if (results.length > 0) {
                path = results[0].filename;
                console.log(path);
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
