do# Kim Vu Interior Design Portfolio

A creative, stylish portfolio website showcasing interior design and architectural work.

## Setup Instructions

### Adding Your Portfolio Images

1. Place your portfolio images in the `images/` folder with these exact filenames:
   - `luma-house.jpg` - LUMA House project image
   - `infinity-shelter.jpg` - Infinity Shelter project image
   - `architectural-renderings.jpg` - Architectural concepts image
   - `floor-plans.jpg` - Floor plans image
   - `design-process.jpg` - Design process sketches image
   - `site-plans.jpg` - Site plans image

2. Supported image formats: `.jpg`, `.jpeg`, `.png`, `.webp`

3. Recommended image size: At least 1200px wide for best quality

### Running the Website

**Option 1: Simple (Double-click)**
- Double-click `index.html` to open in your browser

**Option 2: Local Server (Recommended)**
```bash
# Using Python
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Option 3: Using Node.js**
```bash
npx serve
```

## Features

- **Dark Theme**: Elegant dark color scheme with warm accents
- **Smooth Animations**: Parallax effects, fade-ins, and transitions
- **Interactive Portfolio**: Click portfolio items to view project details
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Custom Cursor**: Enhanced cursor experience on desktop
- **Scroll Progress**: Visual progress indicator at the top

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --color-cream: #1a1612;
    --color-beige: #2a241e;
    --color-taupe: #3a3428;
    /* ... */
}
```

### Content
- Edit project descriptions in `script.js` (projects object)
- Update contact information in `index.html`
- Modify text content directly in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- If images are missing, the site will show fallback gradients
- All images should be optimized for web (compressed) for faster loading
- The site uses Google Fonts (Playfair Display & Inter)

# kimm2
