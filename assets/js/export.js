window.PostCraft = window.PostCraft || {};

(function () {
  const canvas = window.PostCraft.canvas;
  const storageKey = 'postcraft-design';

  function getFileName(type) {
    const platform = window.PostCraft.currentPlatform?.name?.toLowerCase().replace(/\s+/g, '-') || 'design';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `postcraft-${platform}-${timestamp}.${type}`;
  }

  function exportAsPNG() {
    const filename = getFileName('png');
    const dataURL = canvas.toDataURL({ format: 'png', multiplier: 2 });
    downloadDataURL(dataURL, filename);
  }

  function exportAsJPG() {
    const filename = getFileName('jpg');
    const dataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.95, multiplier: 2 });
    downloadDataURL(dataURL, filename);
  }

  async function exportAsPDF() {
    const filename = getFileName('pdf');
    const wrapper = document.getElementById('canvas-wrapper');
    const { jsPDF } = window.jspdf;
    const canvasImage = await html2canvas(wrapper, { backgroundColor: '#ffffff', scale: 2 });
    const imageData = canvasImage.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: window.PostCraft.currentPlatform.width > window.PostCraft.currentPlatform.height ? 'landscape' : 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvasImage.width, pageHeight / canvasImage.height);
    const imgWidth = canvasImage.width * ratio;
    const imgHeight = canvasImage.height * ratio;
    const left = (pageWidth - imgWidth) / 2;
    const top = (pageHeight - imgHeight) / 2;
    pdf.addImage(imageData, 'PNG', left, top, imgWidth, imgHeight);
    pdf.save(filename);
  }

  async function copyToClipboard() {
    try {
      const dataURL = canvas.toDataURL({ format: 'png', multiplier: 2 });
      const response = await fetch(dataURL);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      alert('Design copied to clipboard.');
    } catch (error) {
      alert('Unable to copy to clipboard in this browser.');
      console.error(error);
    }
  }

  function downloadDataURL(dataURL, filename) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function saveDesign() {
    try {
      const json = JSON.stringify(canvas.toJSON());
      localStorage.setItem(storageKey, json);
      alert('Design saved to local storage.');
    } catch (error) {
      console.error(error);
      alert('Unable to save design.');
    }
  }

  function loadDesign() {
    try {
      const payload = localStorage.getItem(storageKey);
      if (!payload) {
        alert('No saved design available.');
        return;
      }
      canvas.loadFromJSON(payload, () => {
        canvas.renderAll();
        alert('Design loaded from local storage.');
      });
    } catch (error) {
      console.error(error);
      alert('Unable to load design.');
    }
  }

  function init() {
    window.exportAsPNG = exportAsPNG;
    window.exportAsJPG = exportAsJPG;
    window.exportAsPDF = exportAsPDF;
    window.copyToClipboard = copyToClipboard;
    window.saveDesign = saveDesign;
    window.loadDesign = loadDesign;
  }

  init();
})();
