Create a complete, production-ready "Social Media Post Designer" web application using only HTML, CSS, and JavaScript (no frameworks, no backend).

=== PROJECT STRUCTURE ===

social-media-post-designer/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── canvas.js
│   │   ├── templates.js
│   │   ├── elements.js
│   │   ├── export.js
│   │   └── toolbar.js
│   └── images/
│       └── (placeholder assets)
├── libs/
│   ├── fabric.min.js
│   └── html2canvas.min.js
└── README.md

=== LIBRARIES (USE CDN ONLY) ===

- Fabric.js: https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js
- html2canvas: https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
- jsPDF: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
- Google Fonts: Poppins, Inter, Playfair Display, Montserrat

=== PLATFORM SIZES ===

Support these canvas sizes with a dropdown switcher:
- Instagram Post → 1080x1080 (1:1)
- Instagram Story → 1080x1920 (9:16)
- Facebook Post → 1200x630
- Facebook Cover → 851x315
- Twitter/X Post → 1200x675
- Twitter/X Header → 1500x500
- LinkedIn Post → 1200x627
- LinkedIn Banner → 1584x396
- YouTube Thumbnail → 1280x720
- Pinterest Pin → 1000x1500

Canvas should scale visually to fit the screen while maintaining real export dimensions.

=== LEFT SIDEBAR — TOOLS PANEL ===

1. TEMPLATES TAB
   - Minimum 12 pre-designed templates
   - Categories: Business, Fashion, Food, Travel, Tech, Motivational, Sale/Promo, Event
   - Each template has background color/gradient + placeholder text layers
   - Click to apply template instantly on canvas

2. ELEMENTS TAB
   - Shapes: Rectangle, Circle, Triangle, Star, Line, Arrow
   - Click to add shape on canvas center
   - Color picker for each shape
   - Opacity slider

3. TEXT TAB
   - Add Heading (large bold)
   - Add Subheading (medium)
   - Add Body Text (small)
   - Font family selector (Google Fonts list)
   - Font size input
   - Bold, Italic, Underline buttons
   - Text color picker
   - Text alignment: Left, Center, Right
   - Text shadow toggle
   - Letter spacing slider
   - Line height slider

4. BACKGROUND TAB
   - Solid color picker
   - Gradient builder (2 color stops, direction selector: horizontal, vertical, diagonal)
   - Upload background image (drag & drop or file input)
   - Background image fit: Cover, Contain, Stretch
   - Background opacity slider

5. UPLOAD TAB
   - Upload image/logo/sticker (PNG, JPG, SVG, WEBP)
   - Drag & drop support
   - Uploaded image added to canvas center
   - Resize handles on canvas

=== CANVAS AREA (CENTER) ===

- Fabric.js canvas in the middle
- White background by default
- Object selection with resize + rotate handles
- Multi-select support (Shift+click)
- Drag to move objects
- Delete selected object with Delete/Backspace key
- Arrow keys to nudge objects
- Grid overlay toggle (optional)
- Ruler/guides visible on edges
- Canvas zoom: + / - buttons and scroll wheel

=== RIGHT SIDEBAR — PROPERTIES PANEL ===

Show properties of selected object dynamically:

FOR TEXT:
- Font family dropdown
- Font size
- Font weight
- Color picker
- Alignment buttons
- Opacity slider
- Shadow toggle + shadow color, blur, offset X/Y
- Duplicate button
- Delete button
- Layer order: Bring Forward, Send Backward, Bring to Front, Send to Back

FOR SHAPES:
- Fill color picker
- Stroke color + stroke width
- Border radius (for rectangles)
- Opacity slider
- Shadow toggle
- Duplicate, Delete, Layer order buttons

FOR IMAGES:
- Opacity slider
- Flip horizontal / vertical
- Grayscale toggle
- Brightness slider (-100 to 100)
- Contrast slider (-100 to 100)
- Duplicate, Delete, Layer order buttons

=== TOP TOOLBAR ===

Left side:
- App logo + name "PostCraft Studio"
- Platform size dropdown (changes canvas dimensions)
- Canvas size display (e.g., 1080 x 1080)

Center:
- Undo button (Ctrl+Z)
- Redo button (Ctrl+Y)
- Clear Canvas button
- Grid toggle button
- Zoom In / Zoom Out / Reset Zoom

Right side:
- Export dropdown button with options:
  → Download as PNG (full resolution)
  → Download as JPG (full resolution)
  → Download as PDF
  → Copy to Clipboard
- Save Design button (saves to localStorage as JSON)
- Load Design button (loads from localStorage)

=== EXPORT SYSTEM ===

- Use html2canvas + jsPDF for export
- PNG export at 2x resolution (retina quality)
- JPG export with quality 0.95
- PDF export: canvas image embedded in A4 or original size
- File name format: postcraft-[platform]-[timestamp].png

=== TEMPLATES DESIGN ===

Each template must have:
- A named title
- Background (color or gradient)
- At least 2 text layers with placeholder content
- Maybe a shape/border element

Template list:
1. Modern Business — Dark navy + gold text
2. Bold Sale — Red gradient + white text "SALE 50% OFF"
3. Minimal Quote — White + thin black serif text
4. Neon Glow — Dark bg + neon pink/blue text
5. Elegant Fashion — Beige + script font
6. Food Special — Orange gradient + food emoji placeholder
7. Travel Vibes — Sky blue + white bold heading
8. Tech Launch — Dark + purple gradient + monospace font
9. Event Promo — Colorful confetti bg + bold date text
10. Motivation — Gradient purple-pink + bold quote
11. New Arrival — Clean white + product placeholder
12. Thank You Card — Soft pastel + cursive thank you text

=== DESIGN & UI STYLE ===

- Dark theme UI (sidebar and toolbar: #1a1a2e or #0f0f1a)
- Canvas area: medium gray background (#2d2d2d) to contrast white canvas
- Accent color: #7c3aed (purple) for buttons and highlights
- Sidebar width: 280px left, 260px right
- Top toolbar height: 60px
- Smooth hover transitions on all buttons
- Tooltip on hover for every icon button
- Icons: Use Font Awesome 6 CDN
- Scrollable sidebar sections with collapsible panels
- Active tab highlighted with accent color underline

=== KEYBOARD SHORTCUTS ===

- Ctrl+Z → Undo
- Ctrl+Y → Redo
- Delete / Backspace → Delete selected object
- Ctrl+D → Duplicate selected
- Ctrl+A → Select all objects
- Ctrl+S → Save design
- Arrow keys → Nudge selected object by 1px
- Shift+Arrow → Nudge by 10px

=== RESPONSIVE BEHAVIOR ===

- On screen < 1024px: hide right panel, show as toggle button
- On screen < 768px: left panel becomes bottom sheet
- Canvas always visible and usable on tablet
- Mobile: basic view with top toolbar and canvas only

=== IMPORTANT CODING RULES ===

1. NO duplicate element IDs anywhere in HTML
2. All JS in separate files, linked at bottom of body
3. Use Fabric.js canvas object model for all drawing operations
4. Do NOT use plain <canvas> 2D context directly — use Fabric.js API only
5. Export must use actual canvas pixel dimensions, not screen size
6. All event listeners in respective JS files only
7. Use const/let, no var
8. Use addEventListener, no inline onclick
9. Error handling for file uploads (wrong format, too large)
10. LocalStorage save/load must serialize full Fabric.js JSON
11. Templates must apply via Fabric.js loadFromJSON or manual object addition
12. No jQuery, no React, no Vue — pure Vanilla JS only
13. CSS custom properties (variables) for all colors and spacing
14. Fabric.js version 5.3.1 exactly (not v6 — API is different)
15. jsPDF: always use const { jsPDF } = window.jspdf;

=== FILE-BY-FILE INSTRUCTIONS ===

index.html:
- Full semantic HTML5 structure
- All CDN links in <head>
- Three-column layout: left sidebar, canvas center, right sidebar
- Top toolbar as fixed header
- All JS files linked before </body>
- No inline styles, no inline JS

style.css:
- CSS custom properties at :root
- Full dark theme
- Sidebar, toolbar, canvas wrapper styles
- Tab switching styles
- Button and input styles
- Slider custom styling
- Template card grid styles
- Tooltip styles

responsive.css:
- Media queries for 1280px, 1024px, 768px, 480px
- Panel hide/show logic
- Mobile-friendly canvas scaling

app.js:
- Initialize Fabric.js canvas
- Handle platform size switching (resize canvas)
- Keyboard shortcuts
- Undo/Redo history stack (max 50 states)
- Grid toggle
- Zoom controls

canvas.js:
- Canvas object selection events
- Right panel dynamic update on selection
- Object property change handlers (color, opacity, font, etc.)
- Delete, duplicate, layer order functions

templates.js:
- Array of 12 template objects
- Each template: { name, category, background, objects[] }
- Render template cards in left panel
- Apply template to canvas on click

elements.js:
- Add shape functions (rect, circle, triangle, star, line)
- Add text functions (heading, subheading, body)
- Upload image handler
- Background change handler (solid, gradient, image)

export.js:
- exportAsPNG()
- exportAsJPG()
- exportAsPDF()
- copyToClipboard()
- saveDesign() → localStorage
- loadDesign() ← localStorage

toolbar.js:
- Platform dropdown handler
- Undo/Redo buttons
- Clear canvas
- Zoom buttons
- All top toolbar event bindings

=== FINAL CHECKLIST ===

Before finishing, verify:
[ ] All 10 platform sizes work correctly
[ ] All 12 templates apply without error
[ ] Text can be added, edited, styled on canvas
[ ] Shapes can be added and customized
[ ] Images can be uploaded and manipulated
[ ] Background: solid, gradient, image — all work
[ ] PNG, JPG, PDF export all work
[ ] Undo/Redo works (min 10 steps)
[ ] Save/Load from localStorage works
[ ] Keyboard shortcuts all work
[ ] Right panel updates dynamically on selection
[ ] No console errors on load
[ ] Responsive on 768px screen
[ ] Dark theme consistent throughout
[ ] All fonts load from Google Fonts
[ ] Fabric.js version 5.3.1 used

Build all files completely. Do not skip any file. Do not use placeholder comments like "// add code here". Every function must be fully implemented and working.