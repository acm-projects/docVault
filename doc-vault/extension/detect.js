document.getElementById('yes').onclick = function() {
    chrome.storage.local.get(["upload"]).then((result) => {
        const req = new XMLHttpRequest();
        req.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                console.log(reader.result);
                //reader.result is base64 of file, DO STUFF HERE
                const base64 = reader.result.split(',')[1];
                const filepath = result.upload;
                const filename = filepath.split('/').pop();

                fetch("https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-No-Auth/UPLOAD", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fileName: filename,
                        file: base64
                    })
                })
                .then(res => res.json())
                .then(data => console.log(" Upload successful:", data))
                .catch(err => console.error(" Upload error:", err));
            }
            
            reader.readAsDataURL(req.response);
        }
        req.open("GET", `file://${result.upload}`);
        req.responseType = 'blob';
        req.send();
    });
};
