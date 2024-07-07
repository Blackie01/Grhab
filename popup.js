document.getElementById('downloadBtn').addEventListener('click', () => {
  console.log('did it get here')
  document.getElementById('nameInputDiv').style.display = 'block';
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const docName = document.getElementById('docName').value;
  if (!docName) {
    alert('Please enter a document name.');
    return;
  }

  chrome.storage.local.get({ screenshots: [] }, (result) => {
    const screenshots = result.screenshots;
    if (screenshots.length === 0) {
      alert('No screenshots to download.');
      return;
    }

    const pdf = new jsPDF();
    screenshots.forEach((screenshot, index) => {
      pdf.addImage(screenshot, 'JPEG', 0, 0);
      if (index < screenshots.length - 1) {
        pdf.addPage();
      }
    });

    pdf.save(`${docName}.pdf`);
    chrome.storage.local.set({ screenshots: [] });
    document.getElementById('nameInputDiv').style.display = 'none';
  });
});

const tester = () => {
  console.log('checking button')
}