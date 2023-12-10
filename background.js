

// chrome.runtime.onInstalled.addListener(async function() {
//     chrome.tabs.query({}, async  function(tabs) {
//       tabs.forEach(async function(tab) {
//         await chrome.scripting.executeScript({
//           target: {tabId: tab.id},
//           files: ['content.js']
//         });
//       });
//     });
//   });


///////////////////////////

// chrome.runtime.onInstalled.addListener(async () => {
//     for (const cs of chrome.runtime.getManifest().content_scripts) {
//       for (const tab of await chrome.tabs.query({url: cs.matches})) {
//         chrome.scripting.executeScript({
//           target: {tabId: tab.id},
//           files: ['./content.js'],
//         });
//       }
//     }
//   });

// chrome.runtime.onMessage.addListener(function(request, sender, senderResponse) {
  
//     if (request.action === 'captureScreenshot') {
//         captureScreenshot()
//     } else if (request.action === 'createPDF') {
//         convertToPdf()
//     }
// })

// let capturedScreenshots = [] 

// const captureScreenshot = () => {
//     chrome.tabs.captureVisibleTab({ format: 'png',  full: true }, function (screenshotUrl) {
//         capturedScreenshots.push(screenshotUrl)
//         chrome.tabs.query({active: true, currentWindow: true }, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {active: 'screenshotCaptured', screenshotUrl})
//         })
//     })
// }


// const convertToPdf = () => {
//     const pdf = new jsPDF();

//     capturedScreenshots.forEach((screenshot, index) => {
//         if (index > 0) {
//             pdf.addPage()
//         }
//         pdf.addImage(screenshot, 'PNG', 0, 0)
//     })

//     capturedScreenshots = []

//     chrome.fileSystem.chooseEntry({type: 'saveFile', suggestedName: 'screenshot.pdf'}, function(entry) {
//         if (entry) {
//           pdf.save(entry);
//         } else {
//           console.log('User cancelled the file selection.');
//         }
//       });
// }



// chrome.runtime.onInstalled.addListener(async function() {
//     console.log('Extension installed');
//     for (const cs of chrome.runtime.getManifest().content_scripts) {
//               for (const tab of await chrome.tabs.query({url: cs.matches})) {
//                 chrome.scripting.executeScript({
//                   target: {tabId: tab.id},
//                   files: ['./content.js'],
//                 });
//               }
//             }
//   });

  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'captureScreenshot') {
      captureScreenshot();
    } else if (request.action === 'createPDF') {
      convertToPdf();
    }
  });
  
  let capturedScreenshots = [];
  
  function captureScreenshot() {
    chrome.tabs.captureVisibleTab({ format: 'png' }, function(screenshotUrl) {

        //
        if (chrome.runtime.lastError) {
            console.error('Error capturing screenshot:', chrome.runtime.lastError);
            // Send error message to popup
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'screenshotError',
                error: 'Failed to capture screenshot!'
              });
            });
            return;
          }

          //
      capturedScreenshots.push(screenshotUrl);
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'screenshotCaptured',
          screenshotUrl,
        });
      });
    });
    console.log('do we have a capture?', screenshotUrl)
  }



  
  function convertToPdf() {
    const pdf = new jsPDF();
  
    try {
        capturedScreenshots.forEach((screenshot, index) => {
            if (index > 0) {
              pdf.addPage();
            }
            pdf.addImage(screenshot, 'PNG', 0, 0);
          });
        
          pdf.save('Grhab.pdf');
             capturedScreenshots = []
      
          chrome.fileSystem.chooseEntry({type: 'saveFile', suggestedName: 'screenshot.pdf'}, function(entry) {
              if (entry) {
                pdf.save(entry);
              } else {
                console.log('User cancelled the file selection.');
              }
            });
    } catch (error) {
        console.error('Error creating PDF:', error);
        // Send error message to popup
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'pdfError',
            error: 'Failed to create PDF!'
          });
        });
    }
   
    capturedScreenshots = [];
}
  


  