chrome.runtime.onMessage.addListener(function(request, sender, senderResponse) {
    if (request.action === 'captureScreenshot') {
        chrome.tabs.captureVisibleTab({format: 'png'}, function (screenshotUrl) {
            chrome.runtime.sendMessage({action: 'screenshotCaptured', screenshotUrl})
        })
    }
})