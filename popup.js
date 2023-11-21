const sendAction = () => {
    chrome.runtime.sendMessage({action: 'captureScreenshot'})
}

document.getElementById('capture').addEventListener('click', sendAction())

