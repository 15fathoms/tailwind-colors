# Tailwind Color Variables – Multi-format

This repository provides all default Tailwind CSS colors in three formats: `HEX`, `RGBA`, and `OKLCH`.

Each format is exported in multiple syntaxes to be used with any frontend workflow:  
**CSS Custom Properties**, **SCSS**, **LESS**, and **Stylus**.

---

## Tailwind Color Variables CLI

Export all Tailwind CSS default colors as HEX, RGBA, or OKLCH variables — ready for CSS, SCSS, LESS, or Stylus.

---

### Features

- Extracts the full Tailwind color palette
- Supports three color formats: `hex`, `rgba`, `oklch`
- Outputs variables for:
  - CSS Custom Properties
  - SCSS / Sass
  - LESS
  - Stylus
- Easy CLI interface
- Outputs clean, organized files by format & language

---

### Installation

Clone the repository or copy the script locally:

```bash
git clone https://github.com/15fathoms/tailwind-colors
cd tailwind-colors
```

Install dependencies:

```bash
npm install
```

Run the CLI:

```bash
node tailwind-colors.js [options]
```

---

### Usage

```bash
node tailwind-colors.js -f <format> -e <extension> -o <output-folder>
```

### Options

| Option        | Description                                               | Default  |
|---------------|-----------------------------------------------------------|----------|
| `-f`, `--format`   | Color format to export (`hex`, `rgba`, `oklch`, `all`)     | `all`    |
| `-e`, `--ext`      | Target output style (`css`, `scss`, `less`, `styl`, `all`) | `all`    |
| `-o`, `--out`      | Output directory path                                    | `dist`   |
| `-h`, `--help`     | Display help message                                     | —        |

---

### Examples

**Export all formats and targets:**
```bash
node tailwind-colors.js
```

**Export only OKLCH values in CSS:**
```bash
node tailwind-colors.js -f oklch -e css
```

**Export only RGBA to SCSS in a custom folder:**
```bash
node tailwind-colors.js -f rgba -e scss -o exports
```

---

## How it works

The CLI uses the official `tailwindcss/colors` object and the `colorjs.io` library to:
- Flatten nested Tailwind color structures (e.g. `blue-500`)
- Convert color values to the desired format
- Write them as variables in the selected syntax

All output files are grouped in folders like:
```
dist/css/colors-hex.css
dist/scss/colors-rgba.scss
...
```

---

## Directory Structure

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

## Available Formats

### HEX
- Great for legacy and visual tools  
- Precise color values used in Tailwind by default

### RGBA
- Useful for transparency control  
- Easy to use in classic CSS workflows

### OKLCH
- Tailwind 4’s native color model  
- Perceptually uniform and future-friendly

---

## Usage Examples

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

## License

MIT — Free to use, modify, and share.