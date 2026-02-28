#!/usr/bin/env node
/**
 * Generate frontend/index.html from frontend/templates/index.html
 *
 * The production template (templates/index.html) is the single source of truth
 * for the app's HTML structure. This script transforms it into a Vite-compatible
 * dev entry by:
 *   1. Stripping the /static/ prefix from asset paths (Vite's publicDir handles it)
 *   2. Removing cache-busting query strings (?v=NN)
 *   3. Replacing the bundle script tag with a Vite module entry
 *   4. Adding a "DO NOT EDIT" header
 *
 * Usage: node scripts/generate-dev-html.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const source = readFileSync(resolve(root, 'templates/index.html'), 'utf-8');

let output = source;

// 1. Strip /static/ prefix from asset paths (href, src attributes)
//    /static/favicon.ico -> /favicon.ico
//    /static/css/style.css -> /css/style.css
output = output.replace(/(?<==")\/static\//g, '/');

// 2. Remove cache-busting query strings (?v=NN)
output = output.replace(/\?v=\d+/g, '');

// 3. Replace the production bundle script with Vite module entry
output = output.replace(
    /<script src="\/js\/app\.bundle\.js"><\/script>/,
    '<script type="module" src="/src/main.js"></script>'
);

// 4. Add DO NOT EDIT header after <!DOCTYPE html>
output = output.replace(
    '<!DOCTYPE html>',
    '<!DOCTYPE html>\n<!-- DO NOT EDIT — generated from templates/index.html by scripts/generate-dev-html.js -->'
);

writeFileSync(resolve(root, 'index.html'), output);
console.log('Generated frontend/index.html from templates/index.html');
