// // console.log("Popup script loaded");

// // document.getElementById("capture").addEventListener("click", function () {
// //   console.log("this runs");

// //   try {
// //     chrome.runtime.sendMessage({ action: "captureScreenshot" });
// //   } catch (error) {
// //     console.error(" here is error point 1", error);
// //   }
// // });

// // document.getElementById("download").addEventListener("click", function () {
// //   try {
// //     chrome.runtime.sendMessage({ action: "createPDF" });
// //   } catch (error) {
// //     console.error(error);
// //   }
// // });

// // "content_scripts": [
// //     {
// //       "matches": ["<all_urls>"],
// //       "js": [
// //         "content.js"
// //       ]
// //     }
// //   ]


// //////////////////////////////////////////////////////////////


// document.getElementById("capture")?.addEventListener("click", function () {

//   document.getElementById("capture").style.backgroundColor = "red";

//   chrome.runtime.sendMessage({
//     action: "captureScreenshot",
//     function(response) {
//       document.getElementById("capture").innerText = "Captured"
//     }
//   });

//   document.getElementById("capture").innerText = "Capturing...";
//   alert('there was a click')

// });

// document.getElementById("download")?.addEventListener("click", function () {
  
//   console.log("Download button clicked");

//   chrome.runtime.sendMessage({
//     action: "createPDF",
//     function(response) {
//       document.getElementById("download").innerText = "Done"
//     }
//   });

//   document.getElementById("download").innerText = "Downloading...";
// });


// //
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === "screenshotCaptured") {
//     // Show capture success message
//     document.getElementById("capture").innerText = "Screenshot Captured";
//   } else if (message.action === "screenshotError") {
//     // Show capture error message
//     alert(message.error);
//   } else if (message.action === "pdfDownloadComplete") {
//     // Show download completion message
//     document.getElementById("download").innerText = "Download Complete";
//   } else if (message.action === "pdfError") {
//     // Show download error message
//     alert(message.error);
//   }
// });






document.getElementById("capture")?.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "captureScreenshot" }, function(response) {
    document.getElementById("capture").innerText = "Captured";
  });
  document.getElementById("capture").innerText = "Capturing...";
  console.log('does this run')
});

document.getElementById("download")?.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "createPDF" }, function(response) {
    document.getElementById("download").innerText = "Done";
  });
  document.getElementById("download").innerText = "Downloading...";
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "screenshotError") {
    alert(message.error);
  } else if (message.action === "pdfError") {
    alert(message.error);
  }
});
