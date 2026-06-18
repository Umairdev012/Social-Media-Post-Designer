window.PostCraft = window.PostCraft || {};

(function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const exportPngButton = document.getElementById('export-png');
  const exportJpgButton = document.getElementById('export-jpg');
  const exportPdfButton = document.getElementById('export-pdf');
  const copyClipboardButton = document.getElementById('copy-clipboard');
  const saveButton = document.getElementById('save-btn');
  const loadButton = document.getElementById('load-btn');
  const exportMenu = document.getElementById('export-menu');

  function switchTab(targetId) {
    document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach((button) => button.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    document.querySelector(`.tab-button[data-tab="${targetId}"]`).classList.add('active');
  }

  function bindTabButtons() {
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
  }

  function bindToolbarActions() {
    exportPngButton.addEventListener('click', () => {
      window.exportAsPNG();
      exportMenu.classList.remove('visible');
    });
    exportJpgButton.addEventListener('click', () => {
      window.exportAsJPG();
      exportMenu.classList.remove('visible');
    });
    exportPdfButton.addEventListener('click', () => {
      window.exportAsPDF();
      exportMenu.classList.remove('visible');
    });
    copyClipboardButton.addEventListener('click', () => {
      window.copyToClipboard();
      exportMenu.classList.remove('visible');
    });
    saveButton.addEventListener('click', () => window.saveDesign());
    loadButton.addEventListener('click', () => window.loadDesign());
  }

  function init() {
    bindTabButtons();
    bindToolbarActions();
  }

  init();
})();
