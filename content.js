// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "showNotification") {
//       const overlay = document.createElement('div');
//       overlay.innerText = 'Screenshot taken';
//       overlay.style.position = 'fixed';
//       overlay.style.top = '10px';
//       overlay.style.right = '10px';
//       overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//       overlay.style.color = 'white';
//       overlay.style.padding = '5px 10px';
//       overlay.style.borderRadius = '5px';
//       overlay.style.zIndex = '9999';
//       document.body.appendChild(overlay);
  
//       setTimeout(() => {
//         document.body.removeChild(overlay);
//       }, 2000);
//     }
//   });



// This script runs in the context of the webpage.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showNotification") {
        const overlay = document.createElement('div');
        overlay.innerText = 'Screenshot taken!'; // Add an emoji for a nicer touch 📸
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-family: sans-serif;
            font-size: 16px;
            z-index: 99999;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        `;
        document.body.appendChild(overlay);

        // Animate the fade-in and fade-out effect.
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500); // Wait for fade-out to complete
        }, 2000); // Display for 2 seconds
    }
});