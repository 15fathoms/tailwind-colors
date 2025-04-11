#!/usr/bin/env node

import fs from 'fs';
import colors from 'tailwindcss/colors';
import Color from 'colorjs.io';
import path from 'path';

// Simple CLI arg parsing
const args = process.argv.slice(2);
const opts = {
  format: 'all',
  ext: 'all',
  out: 'dist',
};

if (args.includes('-h') || args.includes('--help')) {
  console.log(`
Tailwind Colors Exporter

Usage:
  node tailwind-colors.js [options]

Options:
  -f, --format <type>   Color format to export: hex, rgba, oklch, all (default: all)
  -e, --ext <type>      Output style: css, scss, less, styl, all (default: all)
  -o, --out <dir>       Output directory (default: dist)
  -h, --help            Show this help message
`);
  process.exit(0);
}

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-f' || args[i] === '--format') opts.format = args[i + 1];
  if (args[i] === '-e' || args[i] === '--ext') opts.ext = args[i + 1];
  if (args[i] === '-o' || args[i] === '--out') opts.out = args[i + 1];
}

const ignore = ['lightBlue', 'trueGray', 'coolGray', 'warmGray', 'blueGray'];
const allFormats = ['hex', 'rgba', 'oklch'];
const allTargets = ['css', 'scss', 'less', 'styl'];

const selectedFormats = opts.format === 'all' ? allFormats : [opts.format];
const selectedTargets = opts.ext === 'all' ? allTargets : [opts.ext];
const outputDir = opts.out;

const colorData = {
  hex: new Map(),
  rgba: new Map(),
  oklch: new Map()
};

function flattenColors(obj, prefix = '') {
  const result = [];
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'string') {
      result.push([`${prefix}${key}`, val]);
    } else {
      result.push(...flattenColors(val, `${prefix}${key}-`));
    }
  }
  return result;
}

for (const colorName in colors) {
  if (ignore.includes(colorName)) continue;
  const entries = flattenColors(colors[colorName], `${colorName}-`);
  for (const [name, hex] of entries) {
    try {
      const color = new Color(hex);
      const hexStr = color.to('srgb').toString({ format: 'hex' });
      const [r, g, b] = color.to('srgb').coords.map(n => Math.round(Math.max(0, Math.min(1, n)) * 255));
      const rgbaStr = `rgba(${r}, ${g}, ${b}, 1)`;
      const [l, c, h] = color.oklch;
      const oklchStr = `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
      colorData.hex.set(name, hexStr);
      colorData.rgba.set(name, rgbaStr);
      colorData.oklch.set(name, oklchStr);
    } catch {
      colorData.hex.set(name, '/* invalid */');
      colorData.rgba.set(name, '/* invalid */');
      colorData.oklch.set(name, '/* invalid */');
    }
  }
}

const writers = {
  css: (map) => `:root {\n${[...map].filter(([_, v]) => !v.includes('invalid')).map(([k, v]) => `  --${k}: ${v};`).join('\n')}\n}`,
  scss: (map) => [...map].filter(([_, v]) => !v.includes('invalid')).map(([k, v]) => `$${k}: ${v};`).join('\n'),
  less: (map) => [...map].filter(([_, v]) => !v.includes('invalid')).map(([k, v]) => `@${k}: ${v};`).join('\n'),
  styl: (map) => [...map].filter(([_, v]) => !v.includes('invalid')).map(([k, v]) => `${k} = ${v};`).join('\n')
};

for (const format of selectedFormats) {
  const map = colorData[format];
  for (const target of selectedTargets) {
    const content = writers[target](map);
    const ext = target === 'scss' ? '.scss' : target === 'styl' ? '.styl' : `.${target}`;
    const filePath = path.join(outputDir, target, `colors-${format}${ext}`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated: ${filePath}`);
  }
}

console.log('🎉 Done. Tailwind color variables exported in' + outputDir)
