# Dark Mode Guide - Common Styles for Full Project

This guide shows how to use the common dark mode styles across your project.

## CSS Variables (Available Globally)

All these variables automatically change in dark mode:

```css
/* Backgrounds */
--background: #ffffff (light) / #0b0b0b (dark)
--section-bg: #ffffff (light) / #0b0b0b (dark)
--card-bg: #ffffff (light) / #1a1a1a (dark)

/* Text Colors */
--text-primary: #171717 (light) / #ededed (dark)
--text-secondary: #6b7280 (light) / #9ca3af (dark)

/* Accent Colors */
--accent-color: #442917 (light) / #d4a574 (dark)
--accent-light: #d4a574 (both modes)

/* Borders & Shadows */
--card-border: #e5e7eb (light) / #2d2d2d (dark)
--shadow-color: rgba(0, 0, 0, 0.1) (light) / rgba(0, 0, 0, 0.3) (dark)
--shadow-lg: rgba(0, 0, 0, 0.2) (light) / rgba(0, 0, 0, 0.5) (dark)

/* Element Specific */
--icon-bg: #EDE8D0E8 (light) / #4a4a5c (dark)
--circle-stroke: #EDE8D0E8 (light) / #4a4a5c (dark)
```

## Usage Examples

### 1. Using CSS Variables Directly

```tsx
// In your component
<div 
  className="p-4 rounded-lg"
  style={{
    backgroundColor: 'var(--card-bg)',
    borderColor: 'var(--card-border)',
    color: 'var(--text-primary)'
  }}
>
  Content here
</div>
```

### 2. Using Utility Classes

```tsx
// Card with dark mode
<div className="dark-card p-4 rounded-lg shadow-theme">
  <h3 className="dark-text-primary">Title</h3>
  <p className="dark-text-secondary">Description</p>
</div>

// Section with dark mode
<section className="dark-section py-20">
  Content here
</section>

// Text with accent color
<span className="dark-accent">Highlighted text</span>

// Icon background
<div className="dark-icon-bg rounded-full p-4">
  <Icon />
</div>
```

### 3. Using Component Classes

```tsx
// Card component
<div className="card p-6 rounded-xl">
  <h2 className="text-primary">Card Title</h2>
  <p className="text-secondary">Card description</p>
</div>

// Section component
<section className="section py-20">
  <div className="container">
    Content here
  </div>
</section>

// Icon container
<div className="icon-container rounded-full p-4">
  <Icon />
</div>
```

### 4. Using Tailwind with CSS Variables

```tsx
// Background
<div className="bg-[var(--card-bg)] border-[var(--card-border)]">
  Content
</div>

// Text colors
<h1 className="text-[var(--text-primary)]">Title</h1>
<p className="text-[var(--text-secondary)]">Description</p>
<span className="text-[var(--accent-color)]">Accent</span>

// Shadows
<div className="shadow-[0_4px_6px_var(--shadow-color)]">
  Content
</div>
```

### 5. SVG Elements

```tsx
// SVG with dark mode stroke
<svg>
  <circle 
    stroke="var(--circle-stroke)"
    fill="none"
  />
</svg>
```

## Available Utility Classes

- `.dark-card` - Card with dark mode background, border, and text
- `.dark-section` - Section with dark mode background and text
- `.dark-text-primary` - Primary text color (adapts to dark mode)
- `.dark-text-secondary` - Secondary text color (adapts to dark mode)
- `.dark-accent` - Accent color (adapts to dark mode)
- `.dark-accent-light` - Light accent color
- `.dark-border` - Border color (adapts to dark mode)
- `.dark-shadow` - Shadow (adapts to dark mode)
- `.dark-shadow-lg` - Large shadow (adapts to dark mode)
- `.dark-icon-bg` - Icon background (adapts to dark mode)

## Available Component Classes

- `.card` - Card component with dark mode support
- `.section` - Section component with dark mode support
- `.icon-container` - Icon container with dark mode support
- `.text-primary` - Primary text color
- `.text-secondary` - Secondary text color
- `.text-accent` - Accent text color
- `.border-theme` - Theme-aware border
- `.shadow-theme` - Theme-aware shadow
- `.shadow-theme-lg` - Large theme-aware shadow

## Best Practices

1. **Use CSS Variables** for inline styles or when you need dynamic values
2. **Use Utility Classes** for quick styling with consistent dark mode support
3. **Use Component Classes** for reusable component patterns
4. **Always test** both light and dark modes when adding new styles

## Adding New Common Styles

To add new common dark mode styles:

1. Add CSS variables to `:root` and `.dark` in `globals.css`
2. Create utility classes in `@layer utilities`
3. Create component classes in `@layer components` if needed
4. Document the new styles in this guide
