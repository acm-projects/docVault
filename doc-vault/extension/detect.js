document.getElementById('yes').onclick = function() {
    chrome.storage.local.get(["upload"]).then((result) => {
        const req = new XMLHttpRequest();
        req.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                console.log(reader.result);
                //reader.result is base64 of file, DO STUFF HERE
            }
            reader.readAsDataURL(req.response);
        }
        req.open("GET", `file://${result.upload}`);
        req.responseType = 'blob';
        req.send();
    });
};
