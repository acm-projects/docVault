document.getElementById('yes').onclick = function () {
    chrome.storage.local.get(["upload"]).then((uploadResult) => {
      const req = new XMLHttpRequest();
      req.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          const base64 = reader.result.split(',')[1];
          const filepath = uploadResult.upload;
          const filename = filepath.split('\\').pop().split('/').pop(); // handles both \ and /

  
          chrome.storage.local.get(["accessToken"]).then((tokenResult) => {
            const token = tokenResult.accessToken;
  
            fetch("https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/UPLOAD", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                fileName: filename,
                file: base64
              })
            })
            .then(res => res.json())
            .then(data => console.log("✅ Upload successful:", data))
            .catch(err => console.error("❌ Upload error:", err));
          });
        };
  
        reader.readAsDataURL(req.response);
      };
  
      req.open("GET", `file://${uploadResult.upload}`);
      req.responseType = 'blob';
      req.send();
    });
    setTimeout(()=>{window.location.href = 'success.html';}, 1000)
  };
