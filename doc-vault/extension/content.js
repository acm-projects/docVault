window.addEventListener("message", function (event) {
    if (event.source !== window) return; // only accept messages from same page
    if (event.data && event.data.type === "SEND_JWT") {
      const token = event.data.token;
      console.log("Received JWT from page:", token);
  
      chrome.storage.local.set({ accessToken: token }, () => {
        console.log("JWT saved to chrome.storage");
      });
    }
  });