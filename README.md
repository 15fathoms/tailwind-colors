# 🎨 Tailwind Color Variables – Multi-format

This repository provides all default Tailwind CSS colors in three formats: `HEX`, `RGBA`, and `OKLCH`.

Each format is exported in multiple syntaxes to be used with any frontend workflow:  
**CSS Custom Properties**, **SCSS**, **LESS**, and **Stylus**.

---

## 📁 Directory Structure

```
/css/
  colors-hex.css
  colors-rgba.css
  colors-oklch.css

/scss/
  _colors-hex.scss
  _colors-rgba.scss
  _colors-oklch.scss

/less/
  colors-hex.less
  colors-rgba.less
  colors-oklch.less

/styl/
  colors-hex.styl
  colors-rgba.styl
  colors-oklch.styl
```

---

## ✨ Available Formats

### ✅ HEX
- Great for legacy and visual tools  
- Precise color values used in Tailwind by default

### ✅ RGBA
- Useful for transparency control  
- Easy to use in classic CSS workflows

### ✅ OKLCH
- Tailwind 4’s native color model  
- Perceptually uniform and future-friendly

---

## 🔧 Usage Examples

### In CSS:
```css
@import 'css/colors-hex.css';

.my-class {
  color: var(--amber-500);
}
```

### In SCSS:
```scss
@use 'scss/colors-oklch' as *;

body {
  background-color: $zinc-950;
}
```

### In LESS:
```less
@import 'less/colors-rgba.less';

.card {
  border-color: @blue-600;
}
```

### In Stylus:
```stylus
@import 'styl/colors-hex.styl'

h1
  color: blue-400
```

---

## 🔗 License

MIT — Free to use, modify, and share.