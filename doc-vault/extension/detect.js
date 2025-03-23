document.getElementById('yes').onclick = function() {
    chrome.storage.local.set({upload: 1});
};