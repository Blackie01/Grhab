
console.log('Content script loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'screenshotCaptured') {
    console.log('received screenshot url', request.screenshotUrl);
  }
});
