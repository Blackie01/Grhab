
// console.log('Content script loaded');

// setTimeout(function() {
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'screenshotCaptured') {
//     console.log('received screenshot url', request.screenshotUrl);
//   }
// });
// }, 3000);


// const port = chrome.runtime.connect({ name: 'content-script' });
// port.postMessage({ action: 'captureScreenshot' });
// port.onMessage.addListener(function(response) {
//   console.log('Received response:', response);
// });