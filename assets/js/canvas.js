window.PostCraft = window.PostCraft || {};

(function () {
  const selectionSummary = document.getElementById('selection-summary');
  const propTextSection = document.getElementById('property-text');
  const propShapeSection = document.getElementById('property-shape');
  const propImageSection = document.getElementById('property-image');
  const propActions = document.getElementById('property-actions');
  const propFontFamily = document.getElementById('prop-font-family');
  const propFontSize = document.getElementById('prop-font-size');
  const propLetterSpacing = document.getElementById('prop-letter-spacing');
  const propLineHeight = document.getElementById('prop-line-height');
  const propTextColor = document.getElementById('prop-text-color');
  const propOpacity = document.getElementById('prop-opacity');
  const propShadowToggle = document.getElementById('prop-shadow-toggle');
  const propShadowControls = document.getElementById('prop-shadow-controls');
  const propShadowColor = document.getElementById('prop-shadow-color');
  const propShadowBlur = document.getElementById('prop-shadow-blur');
  const propShadowOffsetX = document.getElementById('prop-shadow-offset-x');
  const propShadowOffsetY = document.getElementById('prop-shadow-offset-y');
  const propBold = document.getElementById('prop-bold');
  const propItalic = document.getElementById('prop-italic');
  const propUnderline = document.getElementById('prop-underline');
  const propAlignLeft = document.getElementById('prop-align-left');
  const propAlignCenter = document.getElementById('prop-align-center');
  const propAlignRight = document.getElementById('prop-align-right');
  const propFillColor = document.getElementById('prop-fill-color');
  const propStrokeColor = document.getElementById('prop-stroke-color');
  const propStrokeWidth = document.getElementById('prop-stroke-width');
  const propRadius = document.getElementById('prop-radius');
  const propShapeOpacity = document.getElementById('prop-shape-opacity');
  const propShapeShadowToggle = document.getElementById('prop-shape-shadow-toggle');
  const propImageOpacity = document.getElementById('prop-image-opacity');
  const propFlipH = document.getElementById('prop-flip-h');
  const propFlipV = document.getElementById('prop-flip-v');
  const propGrayscale = document.getElementById('prop-image-grayscale');
  const propBrightness = document.getElementById('prop-brightness');
  const propContrast = document.getElementById('prop-contrast');
  const propDuplicate = document.getElementById('prop-duplicate');
  const propDelete = document.getElementById('prop-delete');
  const propBringFront = document.getElementById('prop-bring-front');
  const propSendBack = document.getElementById('prop-send-back');
  const propBringForward = document.getElementById('prop-bring-forward');
  const propSendBackward = document.getElementById('prop-send-backward');

  const fontOptions = [
    'Poppins, sans-serif',
    'Inter, sans-serif',
    'Montserrat, sans-serif',
    'Playfair Display, serif',
    'Arial, sans-serif'
  ];

  function updatePropertyPanel() {
    const canvas = window.PostCraft.canvas;
    const activeObject = canvas.getActiveObject();

    if (!activeObject) {
      selectionSummary.textContent = 'Select an element to edit';
      propTextSection.classList.add('hidden');
      propShapeSection.classList.add('hidden');
      propImageSection.classList.add('hidden');
      propActions.classList.remove('hidden');
      return;
    }

    selectionSummary.textContent = `${activeObject.type.charAt(0).toUpperCase() + activeObject.type.slice(1)} selected`;
    propActions.classList.remove('hidden');

    const isText = activeObject.type === 'textbox' || activeObject.type === 'text';
    const isShape = ['rect', 'circle', 'triangle', 'polygon', 'line', 'path', 'group'].includes(activeObject.type) && !activeObject.type.includes('image');
    const isImage = activeObject.type === 'image';

    propTextSection.classList.toggle('hidden', !isText);
    propShapeSection.classList.toggle('hidden', !isShape);
    propImageSection.classList.toggle('hidden', !isImage);

    if (isText) {
      propFontFamily.value = activeObject.fontFamily || 'Poppins, sans-serif';
      propFontSize.value = activeObject.fontSize || 36;
      propLetterSpacing.value = activeObject.charSpacing || 0;
      propLineHeight.value = activeObject.lineHeight || 1.2;
      propTextColor.value = activeObject.fill || '#ffffff';
      propOpacity.value = activeObject.opacity || 1;
      const shadow = activeObject.shadow || { color: '#000000', blur: 0, offsetX: 0, offsetY: 0 };
      propShadowColor.value = shadow.color;
      propShadowBlur.value = shadow.blur || 0;
      propShadowOffsetX.value = shadow.offsetX || 0;
      propShadowOffsetY.value = shadow.offsetY || 0;
      propShadowControls.classList.toggle('hidden', !activeObject.shadow);
      propBold.classList.toggle('active', activeObject.fontWeight === 'bold');
      propItalic.classList.toggle('active', activeObject.fontStyle === 'italic');
      propUnderline.classList.toggle('active', activeObject.underline === true);
    }

    if (isShape) {
      propFillColor.value = activeObject.fill || '#7c3aed';
      propStrokeColor.value = activeObject.stroke || '#000000';
      propStrokeWidth.value = activeObject.strokeWidth || 0;
      propRadius.value = activeObject.rx || activeObject.ry || 0;
      propShapeOpacity.value = activeObject.opacity || 1;
      propShapeShadowToggle.classList.toggle('active', !!activeObject.shadow);
    }

    if (isImage) {
      propImageOpacity.value = activeObject.opacity || 1;
      propBrightness.value = (activeObject.filters?.find((filter) => filter.type === 'Brightness')?.brightness || 0) * 100;
      propContrast.value = (activeObject.filters?.find((filter) => filter.type === 'Contrast')?.contrast || 0) * 100;
      propGrayscale.classList.toggle('active', activeObject.filters?.some((filter) => filter.type === 'Grayscale'));
    }
  }

  function applyTextProperty(property, value) {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object) return;
    object.set(property, value);
    object.setCoords();
    window.PostCraft.canvas.renderAll();
  }

  function applyTextAlignment(alignment) {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object || (object.type !== 'textbox' && object.type !== 'text')) return;
    object.set('textAlign', alignment);
    window.PostCraft.canvas.renderAll();
  }

  function toggleTextShadow() {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object || (object.type !== 'textbox' && object.type !== 'text')) return;
    if (object.shadow) {
      object.set('shadow', null);
      propShadowControls.classList.add('hidden');
    } else {
      object.set('shadow', {
        color: '#000000',
        blur: 12,
        offsetX: 4,
        offsetY: 4
      });
      propShadowControls.classList.remove('hidden');
    }
    window.PostCraft.canvas.renderAll();
  }

  function toggleShapeShadow() {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object || ['rect', 'circle', 'triangle', 'polygon', 'line', 'path'].indexOf(object.type) < 0) return;
    if (object.shadow) {
      object.set('shadow', null);
    } else {
      object.set('shadow', {
        color: 'rgba(0,0,0,0.35)',
        blur: 18,
        offsetX: 6,
        offsetY: 6
      });
    }
    window.PostCraft.canvas.renderAll();
  }

  function applyShapeShadowSettings() {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object) return;
    const shadow = {
      color: propShadowColor.value,
      blur: parseInt(propShadowBlur.value, 10),
      offsetX: parseInt(propShadowOffsetX.value, 10),
      offsetY: parseInt(propShadowOffsetY.value, 10)
    };
    object.set('shadow', shadow);
    window.PostCraft.canvas.renderAll();
  }

  function applyImageFilters() {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object || object.type !== 'image') return;
    const filters = [];
    const brightnessValue = parseInt(propBrightness.value, 10) / 100;
    const contrastValue = parseInt(propContrast.value, 10) / 100;
    if (brightnessValue !== 0) {
      filters.push(new fabric.Image.filters.Brightness({ brightness: brightnessValue }));
    }
    if (contrastValue !== 0) {
      filters.push(new fabric.Image.filters.Contrast({ contrast: contrastValue }));
    }
    if (propGrayscale.classList.contains('active')) {
      filters.push(new fabric.Image.filters.Grayscale());
    }
    object.filters = filters;
    object.applyFilters();
    window.PostCraft.canvas.renderAll();
  }

  function duplicateSelected() {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object) return;
    object.clone((cloned) => {
      cloned.set({ left: object.left + 20, top: object.top + 20 });
      window.PostCraft.canvas.add(cloned);
      window.PostCraft.canvas.setActiveObject(cloned);
      window.PostCraft.canvas.requestRenderAll();
      window.PostCraft.canvas.fire('object:modified');
    });
  }

  function deleteSelected() {
    const activeObject = window.PostCraft.canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'activeSelection') {
      activeObject.getObjects().forEach((object) => window.PostCraft.canvas.remove(object));
    } else {
      window.PostCraft.canvas.remove(activeObject);
    }
    window.PostCraft.canvas.discardActiveObject();
    window.PostCraft.canvas.requestRenderAll();
    updatePropertyPanel();
  }

  function changeLayer(order) {
    const object = window.PostCraft.canvas.getActiveObject();
    if (!object) return;
    if (object.type === 'activeSelection') return;
    switch (order) {
      case 'front':
        object.bringToFront();
        break;
      case 'back':
        object.sendToBack();
        break;
      case 'forward':
        object.bringForward();
        break;
      case 'backward':
        object.sendBackwards();
        break;
      default:
        break;
    }
    window.PostCraft.canvas.requestRenderAll();
  }

  function bindPropertyControls() {
    fontOptions.forEach((font) => {
      const option = document.createElement('option');
      option.value = font;
      option.textContent = font.split(',')[0];
      propFontFamily.appendChild(option);
    });

    propFontFamily.addEventListener('change', () => applyTextProperty('fontFamily', propFontFamily.value));
    propFontSize.addEventListener('input', () => applyTextProperty('fontSize', parseInt(propFontSize.value, 10)));
    propLetterSpacing.addEventListener('input', () => applyTextProperty('charSpacing', parseFloat(propLetterSpacing.value)));
    propLineHeight.addEventListener('input', () => applyTextProperty('lineHeight', parseFloat(propLineHeight.value)));
    propTextColor.addEventListener('input', () => applyTextProperty('fill', propTextColor.value));
    propOpacity.addEventListener('input', () => applyTextProperty('opacity', parseFloat(propOpacity.value)));
    propShadowToggle.addEventListener('click', toggleTextShadow);
    propShadowColor.addEventListener('input', applyShapeShadowSettings);
    propShadowBlur.addEventListener('input', applyShapeShadowSettings);
    propShadowOffsetX.addEventListener('input', applyShapeShadowSettings);
    propShadowOffsetY.addEventListener('input', applyShapeShadowSettings);
    propBold.addEventListener('click', () => {
      const object = window.PostCraft.canvas.getActiveObject();
      if (!object || !object.set) return;
      const current = object.fontWeight === 'bold' ? 'normal' : 'bold';
      object.set('fontWeight', current);
      window.PostCraft.canvas.renderAll();
      updatePropertyPanel();
    });
    propItalic.addEventListener('click', () => {
      const object = window.PostCraft.canvas.getActiveObject();
      if (!object) return;
      const current = object.fontStyle === 'italic' ? 'normal' : 'italic';
      object.set('fontStyle', current);
      window.PostCraft.canvas.renderAll();
      updatePropertyPanel();
    });
    propUnderline.addEventListener('click', () => {
      const object = window.PostCraft.canvas.getActiveObject();
      if (!object) return;
      object.set('underline', !object.underline);
      window.PostCraft.canvas.renderAll();
      updatePropertyPanel();
    });
    propAlignLeft.addEventListener('click', () => applyTextAlignment('left'));
    propAlignCenter.addEventListener('click', () => applyTextAlignment('center'));
    propAlignRight.addEventListener('click', () => applyTextAlignment('right'));
    propFillColor.addEventListener('input', () => applyTextProperty('fill', propFillColor.value));
    propStrokeColor.addEventListener('input', () => applyTextProperty('stroke', propStrokeColor.value));
    propStrokeWidth.addEventListener('input', () => applyTextProperty('strokeWidth', parseInt(propStrokeWidth.value, 10)));
    propRadius.addEventListener('input', () => {
      const object = window.PostCraft.canvas.getActiveObject();
      if (!object || object.type !== 'rect') return;
      object.set({ rx: parseInt(propRadius.value, 10), ry: parseInt(propRadius.value, 10) });
      window.PostCraft.canvas.renderAll();
    });
    propShapeOpacity.addEventListener('input', () => applyTextProperty('opacity', parseFloat(propShapeOpacity.value)));
    propShapeShadowToggle.addEventListener('click', toggleShapeShadow);
    propImageOpacity.addEventListener('input', () => applyTextProperty('opacity', parseFloat(propImageOpacity.value)));
    propFlipH.addEventListener('click', () => {
      const object = window.PostCraft.canvas.getActiveObject();
      if (!object) return;
      object.toggle('flipX');
      window.PostCraft.canvas.renderAll();
    });
    propFlipV.addEventListener('click', () => {
      const object = window.PostCraft.canvas.getActiveObject();
      if (!object) return;
      object.toggle('flipY');
      window.PostCraft.canvas.renderAll();
    });
    propGrayscale.addEventListener('click', () => {
      propGrayscale.classList.toggle('active');
      applyImageFilters();
    });
    propBrightness.addEventListener('input', applyImageFilters);
    propContrast.addEventListener('input', applyImageFilters);
    propDuplicate.addEventListener('click', duplicateSelected);
    propDelete.addEventListener('click', deleteSelected);
    propBringFront.addEventListener('click', () => changeLayer('front'));
    propSendBack.addEventListener('click', () => changeLayer('back'));
    propBringForward.addEventListener('click', () => changeLayer('forward'));
    propSendBackward.addEventListener('click', () => changeLayer('backward'));
  }

  function setupCanvasEvents() {
    window.PostCraft.canvas.on('selection:created', updatePropertyPanel);
    window.PostCraft.canvas.on('selection:updated', updatePropertyPanel);
    window.PostCraft.canvas.on('selection:cleared', updatePropertyPanel);
    window.PostCraft.canvas.on('object:modified', updatePropertyPanel);
    window.PostCraft.canvas.on('object:moving', (event) => {
      event.target.setCoords();
    });
  }

  function init() {
    bindPropertyControls();
    setupCanvasEvents();
    window.updateSelectionProperties = updatePropertyPanel;
    window.duplicateSelected = duplicateSelected;
    window.deleteSelected = deleteSelected;
  }

  init();
})();
