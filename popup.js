document.addEventListener('DOMContentLoaded', function() {
  updateScreenshotCount();

  document.getElementById('downloadBtn').addEventListener('click', () => {
    document.getElementById('nameInputDiv').style.display = 'block';
  });

  document.getElementById('saveBtn').addEventListener('click', () => {
    const docName = document.getElementById('docName').value.trim();
    if (!docName) {
      alert('Please enter a document name.');
      return;
    }

    // Send a message to the background script to handle the PDF generation
    chrome.runtime.sendMessage({
      action: "generatePDF",
      docName: docName
    });
  });
});

function updateScreenshotCount() {
  chrome.storage.local.get(['screenshots'], function(result) {
    const count = result.screenshots ? result.screenshots.length : 0;
    document.getElementById('screenshotCount').textContent = count;
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.screenshots) {
    updateScreenshotCount();
  }
});