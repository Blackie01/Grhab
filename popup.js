// console.log("Popup script loaded");

// document.getElementById("capture").addEventListener("click", function () {
//   console.log("this runs");

//   try {
//     chrome.runtime.sendMessage({ action: "captureScreenshot" });
//   } catch (error) {
//     console.error(" here is error point 1", error);
//   }
// });

// document.getElementById("download").addEventListener("click", function () {
//   try {
//     chrome.runtime.sendMessage({ action: "createPDF" });
//   } catch (error) {
//     console.error(error);
//   }
// });

// "content_scripts": [
//     {
//       "matches": ["<all_urls>"],
//       "js": [
//         "content.js"
//       ]
//     }
//   ]

console.log("Popup script loaded");

document.getElementById("capture")?.addEventListener("click", function () {
  document.getElementById("capture").style.backgroundColor = "red";
  chrome.runtime.sendMessage({
    action: "captureScreenshot",
  });

  //
  document.getElementById("capture").innerText = "Capturing...";
});

document.getElementById("download")?.addEventListener("click", function () {
  console.log("Download button clicked");
  chrome.runtime.sendMessage({
    action: "createPDF",
  });

  //
  document.getElementById("download").innerText = "Downloading...";
});

//
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "screenshotCaptured") {
    // Show capture success message
    document.getElementById("capture").innerText = "Screenshot Captured";
  } else if (message.action === "screenshotError") {
    // Show capture error message
    alert(message.error);
  } else if (message.action === "pdfDownloadComplete") {
    // Show download completion message
    document.getElementById("download").innerText = "Download Complete";
  } else if (message.action === "pdfError") {
    // Show download error message
    alert(message.error);
  }
});
