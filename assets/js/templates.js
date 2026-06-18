window.PostCraft = window.PostCraft || {};

(function () {
  const templateGrid = document.getElementById('template-grid');

  const templates = [
    {
      name: 'Modern Business',
      category: 'Business',
      background: { type: 'solid', value: '#081826' },
      accent: '#f2c94c',
      objects: [
        { type: 'rect', width: 1000, height: 900, left: 40, top: 40, fill: '#0d2440', rx: 36, ry: 36, opacity: 0.95 },
        { type: 'text', text: 'Modern Business', left: 120, top: 100, fill: '#f2c94c', fontSize: 64, fontFamily: 'Montserrat, sans-serif', fontWeight: '700' },
        { type: 'text', text: 'Plan your next big launch with premium design.', left: 120, top: 220, fill: '#ffffff', fontSize: 24, fontFamily: 'Inter, sans-serif', lineHeight: 1.3, width: 820 }
      ]
    },
    {
      name: 'Bold Sale',
      category: 'Sale/Promo',
      background: { type: 'gradient', colors: ['#f94144', '#f3722c'], direction: 'diagonal' },
      objects: [
        { type: 'text', text: 'SALE 50% OFF', left: 120, top: 260, fill: '#ffffff', fontSize: 78, fontFamily: 'Montserrat, sans-serif', fontWeight: '800' },
        { type: 'text', text: 'Limited time only', left: 120, top: 360, fill: '#ffe8d6', fontSize: 22, fontFamily: 'Inter, sans-serif' },
        { type: 'rect', width: 420, height: 140, left: 120, top: 460, fill: 'rgba(255,255,255,0.12)', rx: 18, ry: 18 }
      ]
    },
    {
      name: 'Minimal Quote',
      category: 'Motivational',
      background: { type: 'solid', value: '#ffffff' },
      objects: [
        { type: 'text', text: '“Clarity is the new luxury.”', left: 120, top: 220, fill: '#111827', fontSize: 44, fontFamily: 'Playfair Display, serif', fontWeight: '500', width: 760 },
        { type: 'text', text: 'A clean layout for a modern brand.', left: 120, top: 340, fill: '#6b7280', fontSize: 18, fontFamily: 'Inter, sans-serif' }
      ]
    },
    {
      name: 'Neon Glow',
      category: 'Fashion',
      background: { type: 'solid', value: '#090b22' },
      objects: [
        { type: 'text', text: 'Neon Glow', left: 120, top: 180, fill: '#ff6ff8', fontSize: 72, fontFamily: 'Poppins, sans-serif', fontWeight: '800', shadow: { color: '#ff6ff8', blur: 30, offsetX: 0, offsetY: 0 } },
        { type: 'text', text: 'Bright designs for night events', left: 120, top: 310, fill: '#80d6ff', fontSize: 22, fontFamily: 'Inter, sans-serif' },
        { type: 'circle', radius: 90, left: 800, top: 180, fill: 'rgba(131, 56, 236, 0.3)' }
      ]
    },
    {
      name: 'Elegant Fashion',
      category: 'Fashion',
      background: { type: 'gradient', colors: ['#f5ede9', '#e7dacf'], direction: 'vertical' },
      objects: [
        { type: 'text', text: 'Elegant Edition', left: 100, top: 180, fill: '#3d2c2d', fontSize: 72, fontFamily: 'Playfair Display, serif', fontWeight: '600' },
        { type: 'text', text: 'A new look for your style brand.', left: 100, top: 310, fill: '#6b5b5f', fontSize: 22, fontFamily: 'Inter, sans-serif' },
        { type: 'rect', width: 260, height: 260, left: 730, top: 280, fill: '#ffffff', rx: 24, ry: 24, opacity: 0.8 }
      ]
    },
    {
      name: 'Food Special',
      category: 'Food',
      background: { type: 'gradient', colors: ['#ffbc42', '#ff8f1f'], direction: 'horizontal' },
      objects: [
        { type: 'text', text: 'Food Special', left: 120, top: 140, fill: '#ffffff', fontSize: 62, fontFamily: 'Montserrat, sans-serif', fontWeight: '700' },
        { type: 'text', text: '🍔 Tasty menu awaits', left: 120, top: 260, fill: '#fff1d0', fontSize: 28, fontFamily: 'Poppins, sans-serif' },
        { type: 'rect', width: 180, height: 180, left: 760, top: 220, fill: 'rgba(255,255,255,0.15)', rx: 36, ry: 36 }
      ]
    },
    {
      name: 'Travel Vibes',
      category: 'Travel',
      background: { type: 'solid', value: '#4b9be2' },
      objects: [
        { type: 'text', text: 'Travel Vibes', left: 100, top: 140, fill: '#ffffff', fontSize: 68, fontFamily: 'Montserrat, sans-serif', fontWeight: '800' },
        { type: 'text', text: 'Adventure starts now', left: 100, top: 240, fill: '#eef7ff', fontSize: 24, fontFamily: 'Inter, sans-serif' },
        { type: 'triangle', width: 260, height: 220, left: 720, top: 360, fill: 'rgba(255,255,255,0.18)' }
      ]
    },
    {
      name: 'Tech Launch',
      category: 'Tech',
      background: { type: 'gradient', colors: ['#0f172a', '#312e81'], direction: 'diagonal' },
      objects: [
        { type: 'text', text: 'Tech Launch', left: 120, top: 160, fill: '#a78bfa', fontSize: 68, fontFamily: 'Montserrat, sans-serif', fontWeight: '800' },
        { type: 'text', text: 'New product arrives soon.', left: 120, top: 260, fill: '#dbeafe', fontSize: 24, fontFamily: 'Inter, sans-serif' },
        { type: 'rect', width: 220, height: 220, left: 760, top: 320, fill: '#ffffff1f', rx: 28, ry: 28 }
      ]
    },
    {
      name: 'Event Promo',
      category: 'Event',
      background: { type: 'solid', value: '#1f2937' },
      objects: [
        { type: 'text', text: 'Event Promo', left: 120, top: 120, fill: '#ffe066', fontSize: 66, fontFamily: 'Montserrat, sans-serif', fontWeight: '800' },
        { type: 'text', text: 'Saturday • 8 PM', left: 120, top: 220, fill: '#ffffff', fontSize: 28, fontFamily: 'Inter, sans-serif' },
        { type: 'circle', radius: 70, left: 840, top: 140, fill: 'rgba(255, 210, 58, 0.35)' },
        { type: 'rect', width: 160, height: 120, left: 820, top: 400, fill: '#fb7185', rx: 18, ry: 18 }
      ]
    },
    {
      name: 'Motivation',
      category: 'Motivational',
      background: { type: 'gradient', colors: ['#6d28d9', '#ec4899'], direction: 'vertical' },
      objects: [
        { type: 'text', text: 'Dream bigger, act bolder.', left: 120, top: 210, fill: '#ffffff', fontSize: 60, fontFamily: 'Playfair Display, serif', fontWeight: '600', width: 760 },
        { type: 'text', text: 'Your next step starts today.', left: 120, top: 340, fill: '#ffe4fb', fontSize: 22, fontFamily: 'Inter, sans-serif' }
      ]
    },
    {
      name: 'New Arrival',
      category: 'Business',
      background: { type: 'solid', value: '#f8fafc' },
      objects: [
        { type: 'text', text: 'New Arrival', left: 100, top: 180, fill: '#111827', fontSize: 64, fontFamily: 'Montserrat, sans-serif', fontWeight: '700' },
        { type: 'text', text: 'Fresh collection ready now.', left: 100, top: 280, fill: '#475569', fontSize: 22, fontFamily: 'Inter, sans-serif' },
        { type: 'rect', width: 240, height: 240, left: 740, top: 260, fill: '#e2e8f0', rx: 24, ry: 24 }
      ]
    },
    {
      name: 'Thank You Card',
      category: 'Event',
      background: { type: 'gradient', colors: ['#ffe4ec', '#f9fafb'], direction: 'horizontal' },
      objects: [
        { type: 'text', text: 'Thank You', left: 120, top: 220, fill: '#7c3aed', fontSize: 68, fontFamily: 'Playfair Display, serif', fontWeight: '600' },
        { type: 'text', text: 'Your support means everything.', left: 120, top: 340, fill: '#334155', fontSize: 22, fontFamily: 'Inter, sans-serif' },
        { type: 'circle', radius: 90, left: 770, top: 220, fill: 'rgba(124, 58, 237, 0.18)' }
      ]
    }
  ];

  function renderTemplateCards() {
    templates.forEach((template, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'template-card';
      card.setAttribute('data-template-index', index);
      card.style.background = getTemplateBackgroundCSS(template);
      card.innerHTML = `<span>${template.name}</span><small>${template.category}</small>`;
      card.addEventListener('click', () => applyTemplate(index));
      templateGrid.appendChild(card);
    });
  }

  function getTemplateBackgroundCSS(template) {
    if (template.background.type === 'gradient') {
      const gradient = template.background.direction === 'horizontal'
        ? `linear-gradient(90deg, ${template.background.colors[0]}, ${template.background.colors[1]})`
        : template.background.direction === 'vertical'
          ? `linear-gradient(180deg, ${template.background.colors[0]}, ${template.background.colors[1]})`
          : `linear-gradient(135deg, ${template.background.colors[0]}, ${template.background.colors[1]})`;
      return gradient;
    }
    return template.background.value;
  }

  function applyTemplate(index) {
    const template = templates[index];
    const canvas = window.PostCraft.canvas;
    canvas.clear();
    window.PostCraft.canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));
    if (template.background.type === 'solid') {
      canvas.setBackgroundColor(template.background.value, canvas.renderAll.bind(canvas));
    } else if (template.background.type === 'gradient') {
      const gradient = new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'pixels',
        coords: getGradientCoords(template.background.direction, canvas.width, canvas.height),
        colorStops: [
          { offset: 0, color: template.background.colors[0] },
          { offset: 1, color: template.background.colors[1] }
        ]
      });
      canvas.setBackgroundColor(gradient, canvas.renderAll.bind(canvas));
    }

    template.objects.forEach((item) => {
      let object;
      if (item.type === 'text') {
        object = new fabric.Textbox(item.text, {
          left: item.left,
          top: item.top,
          fill: item.fill,
          fontSize: item.fontSize,
          fontFamily: item.fontFamily,
          fontWeight: item.fontWeight || 'normal',
          lineHeight: item.lineHeight || 1.2,
          width: item.width || 760,
          shadow: item.shadow || null,
          opacity: item.opacity || 1
        });
      } else if (item.type === 'rect') {
        object = new fabric.Rect({
          left: item.left,
          top: item.top,
          width: item.width,
          height: item.height,
          fill: item.fill,
          rx: item.rx || 0,
          ry: item.ry || 0,
          opacity: item.opacity || 1
        });
      } else if (item.type === 'circle') {
        object = new fabric.Circle({
          left: item.left,
          top: item.top,
          radius: item.radius,
          fill: item.fill,
          opacity: item.opacity || 1
        });
      } else if (item.type === 'triangle') {
        object = new fabric.Triangle({
          left: item.left,
          top: item.top,
          width: item.width,
          height: item.height,
          fill: item.fill,
          opacity: item.opacity || 1
        });
      } else {
        object = new fabric.Rect({
          left: item.left,
          top: item.top,
          width: item.width || 120,
          height: item.height || 120,
          fill: item.fill || '#ffffff',
          opacity: item.opacity || 1
        });
      }
      canvas.add(object);
    });

    canvas.renderAll();
    window.PostCraft.canvas.fire('object:modified');
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

  function init() {
    renderTemplateCards();
  }

  init();
})();
