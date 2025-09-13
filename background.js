// chrome.commands.onCommand.addListener((command) => {
//   if (command === "capture-screenshot") {
//     takeScreenshot();
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "generatePDF") {
//     generatePDF(request.docName);
//   }
// });

// function takeScreenshot() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
//       chrome.storage.local.get(['screenshots'], function(result) {
//         const screenshots = result.screenshots || [];
//         screenshots.push(dataUrl);
//         chrome.storage.local.set({screenshots: screenshots}, function() {
//           chrome.tabs.sendMessage(tabs[0].id, {message: 'screenshot taken'});
//         });
//       });
//     });
//   });
// }


// function generatePDF(docName) {
//   chrome.storage.local.get(['screenshots'], function(result) {
//     if (!result.screenshots || result.screenshots.length === 0) {
//       alert('No screenshots to generate PDF');
//       return;
//     }

//     const pdf = new jspdf.jsPDF();
//     result.screenshots.forEach((screenshot, index) => {
//       if (index > 0) {
//         pdf.addPage();
//       }
//       pdf.addImage(screenshot, 'PNG', 0, 0, 210, 297);
//     });

//     pdf.save(`${docName}.pdf`);
//     chrome.storage.local.set({screenshots: []});
//   });
// }







// Import the jspdf library. This is crucial as it allows the background script to access it.






importScripts("jspdf.umd.min.js");

chrome.commands.onCommand.addListener((command) => {
  if (command === "capture-screenshot") {
    takeScreenshot();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generatePDF") {
    generatePDF(request.docName);
  }
});

function takeScreenshot() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Check if a tab is found before proceeding.
    if (!tabs || tabs.length === 0) {
      return;
    }
    const activeTab = tabs[0];
    chrome.tabs.captureVisibleTab(null, {
      format: 'png'
    }, function(dataUrl) {
      chrome.storage.local.get(['screenshots'], function(result) {
        const screenshots = result.screenshots || [];
        screenshots.push(dataUrl);
        chrome.storage.local.set({
          screenshots: screenshots
        }, function() {
          // Send a message to the content script of the active tab to show feedback
          chrome.tabs.sendMessage(activeTab.id, {
            action: 'showNotification'
          });
        });
      });
    });
  });
}

function generatePDF(docName) {
  chrome.storage.local.get(['screenshots'], function(result) {
    if (!result.screenshots || result.screenshots.length === 0) {
      alert('No screenshots to generate PDF');
      return;
    }

    // Initialize jsPDF within the background script
    const pdf = new jspdf.jsPDF();
    const screenshots = result.screenshots;

    // A4 size in pixels at 96 DPI: 794 x 1123
    const a4Width = 210; // mm
    const a4Height = 297; // mm
    
    screenshots.forEach((screenshot, index) => {
      // Add a new page for each screenshot after the first one
      if (index > 0) {
        pdf.addPage();
      }
      
      const img = new Image();
      img.src = screenshot;
      
      // Calculate aspect ratio to fit the image on the page
      const imgWidth = a4Width;
      const imgHeight = (img.height * a4Width) / img.width;
      
      pdf.addImage(screenshot, 'PNG', 0, 0, imgWidth, imgHeight);
    });

    pdf.save(`${docName}.pdf`);
    // Clear storage after successful download
    chrome.storage.local.set({
      screenshots: []
    });
  });
}