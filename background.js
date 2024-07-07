chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`)
  if (command === "capture-screenshot") {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
      chrome.storage.local.get({screenshots: []}, (result) => {
        let screenshots = result.screenshots;
        screenshots.push(screenshotUrl);
        chrome.storage.local.set({screenshots: screenshots});
      });
    });
  }
});