window.PostCraft = window.PostCraft || {};

(function () {
  const canvas = window.PostCraft.canvas;
  const shapeColorPicker = document.getElementById('shape-color-picker');
  const shapeOpacitySlider = document.getElementById('shape-opacity-slider');
  const fontFamilySelect = document.getElementById('font-family-select');
  const fontSizeInput = document.getElementById('font-size-input');
  const letterSpacingSlider = document.getElementById('letter-spacing-slider');
  const lineHeightSlider = document.getElementById('line-height-slider');
  const textColorPicker = document.getElementById('text-color-picker');
  const textButtons = {
    heading: document.getElementById('add-heading'),
    subheading: document.getElementById('add-subheading'),
    body: document.getElementById('add-body-text')
  };
  const shapeButtons = {
    rect: document.getElementById('add-rect'),
    circle: document.getElementById('add-circle'),
    triangle: document.getElementById('add-triangle'),
    star: document.getElementById('add-star'),
    line: document.getElementById('add-line'),
    arrow: document.getElementById('add-arrow')
  };
  const bgColorPicker = document.getElementById('bg-color-picker');
  const gradientColor1 = document.getElementById('gradient-color-1');
  const gradientColor2 = document.getElementById('gradient-color-2');
  const gradientDirection = document.getElementById('gradient-direction');
  const applyGradientButton = document.getElementById('apply-gradient');
  const bgImageUpload = document.getElementById('bg-image-upload');
  const bgFitSelect = document.getElementById('bg-fit-select');
  const bgOpacitySlider = document.getElementById('bg-opacity-slider');
  const uploadInput = document.getElementById('asset-upload-input');
  const dropzone = document.getElementById('upload-dropzone');

  function getCenterPosition(objectWidth, objectHeight) {
    return {
      left: canvas.width / 2 - objectWidth / 2,
      top: canvas.height / 2 - objectHeight / 2
    };
  }

  function createShape(type) {
    const fill = shapeColorPicker.value;
    const opacity = parseFloat(shapeOpacitySlider.value);
    let shape;

    switch (type) {
      case 'rect':
        shape = new fabric.Rect({ width: 260, height: 180, fill, opacity, rx: 24, ry: 24 });
        break;
      case 'circle':
        shape = new fabric.Circle({ radius: 100, fill, opacity });
        break;
      case 'triangle':
        shape = new fabric.Triangle({ width: 220, height: 200, fill, opacity });
        break;
      case 'star': {
        const points = 5;
        const outerRadius = 100;
        const innerRadius = 45;
        const pathData = [];
        for (let i = 0; i < points * 2; i++) {
          const angle = (Math.PI * i) / points - Math.PI / 2;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = Math.cos(angle) * radius + outerRadius;
          const y = Math.sin(angle) * radius + outerRadius;
          pathData.push(i === 0 ? 'M' : 'L', x, y);
        }
        pathData.push('Z');
        shape = new fabric.Path(pathData.join(' '), { fill, opacity, scaleX: 0.9, scaleY: 0.9 });
        break;
      }
      case 'line':
        shape = new fabric.Line([0, 0, 260, 0], { stroke: fill, strokeWidth: 14, opacity, strokeLineCap: 'round' });
        break;
      case 'arrow': {
        const line = new fabric.Line([0, 0, 200, 0], { stroke: fill, strokeWidth: 14, strokeLineCap: 'round', opacity });
        const triangle = new fabric.Triangle({ width: 24, height: 28, fill, opacity });
        triangle.set({ left: 200, top: -14, originX: 'center', originY: 'center' });
        shape = new fabric.Group([line, triangle], { angle: 0 });
        break;
      }
      default:
        shape = new fabric.Rect({ width: 220, height: 180, fill, opacity, rx: 24, ry: 24 });
    }

    const position = getCenterPosition(shape.width || shape.getScaledWidth(), shape.height || shape.getScaledHeight());
    shape.set(position);
    shape.set({ originX: 'left', originY: 'top' });
    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.requestRenderAll();
  }

  function addText(type) {
    const base = {
      fill: textColorPicker.value,
      fontFamily: fontFamilySelect.value,
      opacity: 1,
      charSpacing: parseFloat(letterSpacingSlider.value),
      lineHeight: parseFloat(lineHeightSlider.value),
      textAlign: 'center'
    };

    let text;
    if (type === 'heading') {
      text = new fabric.Textbox('Your Heading', { ...base, fontSize: 58, fontWeight: '700', width: 760 });
    } else if (type === 'subheading') {
      text = new fabric.Textbox('Subheading text goes here', { ...base, fontSize: 34, fontWeight: '600', width: 700 });
    } else {
      text = new fabric.Textbox('Add your body text here and customize it.', { ...base, fontSize: 24, fontWeight: '400', width: 720 });
    }

    const position = getCenterPosition(text.width, text.height);
    text.set(position);
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
  }

  function applySolidBackground() {
    const color = bgColorPicker.value;
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
  }

  function applyGradientBackground() {
    const color1 = gradientColor1.value;
    const color2 = gradientColor2.value;
    const direction = gradientDirection.value;
    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: getGradientCoords(direction, canvas.width, canvas.height),
      colorStops: [
        { offset: 0, color: color1 },
        { offset: 1, color: color2 }
      ]
    });
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    canvas.setBackgroundColor(gradient, canvas.renderAll.bind(canvas));
  }

  function getGradientCoords(direction, width, height) {
    switch (direction) {
      case 'horizontal':
        return { x1: 0, y1: 0, x2: width, y2: 0 };
      case 'vertical':
        return { x1: 0, y1: 0, x2: 0, y2: height };
      default:
        return { x1: 0, y1: 0, x2: width, y2: height };
    }
  }

  function setBackgroundImage(file, fitType) {
    if (!file) return;
    if (!file.type.match('image.*')) {
      alert('Please upload a valid image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image file is too large. Use a file under 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (image) => {
        const scale = getImageScale(image, fitType);
        image.set({ originX: 'center', originY: 'center', left: canvas.width / 2, top: canvas.height / 2, opacity: parseFloat(bgOpacitySlider.value || 1) });
        image.scaleX = scale.x;
        image.scaleY = scale.y;
        canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
      }, { crossOrigin: 'anonymous' });
    };
    reader.readAsDataURL(file);
  }

  function getImageScale(image, fitType) {
    const widthScale = canvas.width / image.width;
    const heightScale = canvas.height / image.height;
    switch (fitType) {
      case 'contain':
        const minScale = Math.min(widthScale, heightScale);
        return { x: minScale, y: minScale };
      case 'stretch':
        return { x: widthScale, y: heightScale };
      default:
        const maxScale = Math.max(widthScale, heightScale);
        return { x: maxScale, y: maxScale };
    }
  }

  function updateBackgroundOpacity() {
    const image = canvas.backgroundImage;
    if (image) {
      image.opacity = parseFloat(bgOpacitySlider.value);
      canvas.renderAll();
    }
  }

  function addUploadedAsset(file) {
    if (!file) return;
    if (!file.type.match('image.*')) {
      alert('Please upload a valid PNG, JPG, WEBP or SVG image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Please use a smaller asset.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (image) => {
        const maxSize = Math.min(canvas.width, canvas.height) * 0.6;
        image.set({ left: canvas.width / 2, top: canvas.height / 2, originX: 'center', originY: 'center' });
        if (image.width > image.height) {
          image.scaleToWidth(maxSize);
        } else {
          image.scaleToHeight(maxSize);
        }
        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.requestRenderAll();
      }, { crossOrigin: 'anonymous' });
    };
    reader.readAsDataURL(file);
  }

  function init() {
    Object.entries(shapeButtons).forEach(([type, button]) => {
      button.addEventListener('click', () => createShape(type));
    });
    Object.entries(textButtons).forEach(([type, button]) => {
      button.addEventListener('click', () => addText(type === 'heading' ? 'heading' : type === 'subheading' ? 'subheading' : 'body'));
    });
    bgColorPicker.addEventListener('input', applySolidBackground);
    applyGradientButton.addEventListener('click', applyGradientBackground);
    bgImageUpload.addEventListener('change', (event) => setBackgroundImage(event.target.files[0], bgFitSelect.value));
    bgFitSelect.addEventListener('change', () => {
      const file = bgImageUpload.files[0];
      if (file) setBackgroundImage(file, bgFitSelect.value);
    });
    bgOpacitySlider.addEventListener('input', updateBackgroundOpacity);
    uploadInput.addEventListener('change', (event) => addUploadedAsset(event.target.files[0]));
    dropzone.addEventListener('dragenter', (event) => {
      event.preventDefault();
      dropzone.classList.add('drag-over');
    });
    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropzone.classList.remove('drag-over');
      if (event.dataTransfer.files.length) {
        addUploadedAsset(event.dataTransfer.files[0]);
      }
    });
  }

  init();
})();
