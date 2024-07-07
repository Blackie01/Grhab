chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'screenshot taken') {
        const overlay = document.createElement('div')
        overlay.innerText = 'Screenshot taken'
        overlay.style.position = 'fixed'
        overlay.style.top = '10px'
        overlay.style.right = '10px'
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        overlay.style.color = 'white'
        overlay.style.padding = '5px 10px'
        overlay.style.borderRadius = '5px'
        document.body.appendChild(overlay)

        setTimeout(() => {
            document.body.removeChild(overlay)
        }, 2000)
    }
})