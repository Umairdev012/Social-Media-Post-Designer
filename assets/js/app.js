window.PostCraft = window.PostCraft || {};

(function () {
  const canvasElement = document.getElementById('main-canvas');
  const platformSelect = document.getElementById('platform-select');
  const canvasSizeDisplay = document.getElementById('canvas-size-display');
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const canvasArea = document.getElementById('canvas-area');
  const exportBtn = document.getElementById('export-btn');
  const exportMenu = document.getElementById('export-menu');
  const rightPanelToggle = document.getElementById('right-panel-toggle');

  const platformSizes = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'Facebook Post', width: 1200, height: 630 },
    { name: 'Facebook Cover', width: 851, height: 315 },
    { name: 'Twitter/X Post', width: 1200, height: 675 },
    { name: 'Twitter/X Header', width: 1500, height: 500 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'LinkedIn Banner', width: 1584, height: 396 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Pinterest Pin', width: 1000, height: 1500 }
  ];

  const undoStack = [];
  const redoStack = [];
  let isUpdatingHistory = false;
  let currentScale = 1;
  let currentPlatform = platformSizes[0];
  let gridVisible = false;

  window.PostCraft.canvas = new fabric.Canvas('main-canvas', {
    backgroundColor: '#ffffff',
    preserveObjectStacking: true,
    selection: true,
    hoverCursor: 'move'
  });

  window.PostCraft.canvas.on('object:modified', saveHistory);
  window.PostCraft.canvas.on('object:added', saveHistory);
  window.PostCraft.canvas.on('object:removed', saveHistory);
  window.PostCraft.canvas.on('selection:created', () => {
    window.updateSelectionProperties();
  });
  window.PostCraft.canvas.on('selection:updated', () => {
    window.updateSelectionProperties();
  });
  window.PostCraft.canvas.on('selection:cleared', () => {
    window.updateSelectionProperties();
  });

  function initializePlatformSelect() {
    platformSizes.forEach((platform, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = platform.name;
      platformSelect.appendChild(option);
    });
    platformSelect.value = 0;
  }

  function updateCanvasInfo() {
    canvasSizeDisplay.textContent = `${currentPlatform.width} x ${currentPlatform.height}`;
    document.getElementById('canvas-dimensions-label').textContent = `${currentPlatform.width} x ${currentPlatform.height}`;
    document.getElementById('canvas-platform-label').textContent = currentPlatform.name;
  }

  function setCanvasDimensions(width, height) {
    window.PostCraft.canvas.setWidth(width);
    window.PostCraft.canvas.setHeight(height);
    window.PostCraft.canvas.setBackgroundColor(window.PostCraft.canvas.backgroundColor || '#ffffff', window.PostCraft.canvas.renderAll.bind(window.PostCraft.canvas));
    window.PostCraft.canvas.calcOffset();
    canvasWrapper.style.width = `${width}px`;
    canvasWrapper.style.height = `${height}px`;
    updateVisualScale();
    updateCanvasInfo();
  }

  function updateVisualScale() {
    const areaWidth = canvasArea.clientWidth - 40;
    const areaHeight = canvasArea.clientHeight - 40;
    const scale = Math.min(1, areaWidth / currentPlatform.width, areaHeight / currentPlatform.height) || 1;
    currentScale = scale;
    canvasWrapper.style.transform = `scale(${scale})`;
  }

  function saveHistory() {
    if (isUpdatingHistory) {
      return;
    }
    const json = window.PostCraft.canvas.toJSON();
    undoStack.push(json);
    if (undoStack.length > 50) {
      undoStack.shift();
    }
    redoStack.length = 0;
  }

  function undoAction() {
    if (!undoStack.length) return;
    const state = undoStack.pop();
    redoStack.push(window.PostCraft.canvas.toJSON());
    isUpdatingHistory = true;
    window.PostCraft.canvas.loadFromJSON(state, () => {
      window.PostCraft.canvas.renderAll();
      isUpdatingHistory = false;
      window.updateSelectionProperties();
    });
  }

  function redoAction() {
    if (!redoStack.length) return;
    const state = redoStack.pop();
    undoStack.push(window.PostCraft.canvas.toJSON());
    isUpdatingHistory = true;
    window.PostCraft.canvas.loadFromJSON(state, () => {
      window.PostCraft.canvas.renderAll();
      isUpdatingHistory = false;
      window.updateSelectionProperties();
    });
  }

  function clearCanvas() {
    window.PostCraft.canvas.clear();
    window.PostCraft.canvas.setBackgroundColor('#ffffff', window.PostCraft.canvas.renderAll.bind(window.PostCraft.canvas));
    saveHistory();
  }

  function toggleGrid() {
    gridVisible = !gridVisible;
    document.getElementById('grid-overlay').classList.toggle('visible', gridVisible);
  }

  function zoomIn() {
    currentScale = Math.min(2.5, currentScale + 0.1);
    canvasWrapper.style.transform = `scale(${currentScale})`;
  }

  function zoomOut() {
    currentScale = Math.max(0.3, currentScale - 0.1);
    canvasWrapper.style.transform = `scale(${currentScale})`;
  }

  function resetZoom() {
    currentScale = Math.min(1, Math.min(canvasArea.clientWidth / currentPlatform.width, canvasArea.clientHeight / currentPlatform.height) || 1);
    canvasWrapper.style.transform = `scale(${currentScale})`;
  }

  function bindShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
      if (event.key.toLowerCase() === 'z') {
        event.preventDefault();
        undoAction();
        return;
      }
      if (event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redoAction();
        return;
      }
      if (event.key.toLowerCase() === 'd') {
        event.preventDefault();
        window.duplicateSelected();
        return;
      }
      if (event.key.toLowerCase() === 'a') {
        event.preventDefault();
        window.PostCraft.canvas.discardActiveObject();
        window.PostCraft.canvas.selection = true;
        window.PostCraft.canvas.forEachObject((object) => object.selectable = true);
        const activeGroup = new fabric.ActiveSelection(window.PostCraft.canvas.getObjects(), {
          canvas: window.PostCraft.canvas
        });
        window.PostCraft.canvas.setActiveObject(activeGroup);
        window.PostCraft.canvas.requestRenderAll();
        return;
      }
      if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        window.saveDesign();
        return;
      }
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      window.deleteSelected();
      return;
    }

    const activeObject = window.PostCraft.canvas.getActiveObject();
    if (!activeObject) return;
    const step = event.shiftKey ? 10 : 1;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        activeObject.top -= step;
        activeObject.setCoords();
        window.PostCraft.canvas.requestRenderAll();
        break;
      case 'ArrowDown':
        event.preventDefault();
        activeObject.top += step;
        activeObject.setCoords();
        window.PostCraft.canvas.requestRenderAll();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        activeObject.left -= step;
        activeObject.setCoords();
        window.PostCraft.canvas.requestRenderAll();
        break;
      case 'ArrowRight':
        event.preventDefault();
        activeObject.left += step;
        activeObject.setCoords();
        window.PostCraft.canvas.requestRenderAll();
        break;
      default:
        break;
    }
  }

  function initEventBindings() {
    document.getElementById('undo-btn').addEventListener('click', undoAction);
    document.getElementById('redo-btn').addEventListener('click', redoAction);
    document.getElementById('clear-btn').addEventListener('click', clearCanvas);
    document.getElementById('grid-toggle-btn').addEventListener('click', toggleGrid);
    document.getElementById('zoom-in-btn').addEventListener('click', zoomIn);
    document.getElementById('zoom-out-btn').addEventListener('click', zoomOut);
    document.getElementById('reset-zoom-btn').addEventListener('click', resetZoom);
    exportBtn.addEventListener('click', () => exportMenu.classList.toggle('visible'));
    document.addEventListener('click', (event) => {
      if (!exportBtn.contains(event.target) && !exportMenu.contains(event.target)) {
        exportMenu.classList.remove('visible');
      }
    });
    platformSelect.addEventListener('change', (event) => {
      currentPlatform = platformSizes[event.target.value];
      window.PostCraft.currentPlatform = currentPlatform;
      setCanvasDimensions(currentPlatform.width, currentPlatform.height);
      window.PostCraft.canvas.renderAll();
      saveHistory();
    });
    rightPanelToggle.addEventListener('click', () => {
      document.getElementById('right-panel').classList.toggle('visible');
    });
    window.addEventListener('resize', updateVisualScale);
    window.addEventListener('keydown', bindShortcuts);
    canvasArea.addEventListener('wheel', (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY < 0) zoomIn();
        else zoomOut();
      }
    });
  }

  function init() {
    initializePlatformSelect();
    updateCanvasInfo();
    setCanvasDimensions(currentPlatform.width, currentPlatform.height);
    resetZoom();
    saveHistory();
    initEventBindings();
    window.PostCraft.canvas.calcOffset();
  }

  init();
  window.PostCraft.undoAction = undoAction;
  window.PostCraft.redoAction = redoAction;
  window.PostCraft.clearCanvas = clearCanvas;
  window.PostCraft.setCanvasDimensions = setCanvasDimensions;
  window.PostCraft.updateVisualScale = updateVisualScale;
  window.PostCraft.currentPlatform = currentPlatform;
  window.PostCraft.platformSizes = platformSizes;
})();
