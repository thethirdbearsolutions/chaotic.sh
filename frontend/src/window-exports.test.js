/**
 * Window Exports Verification Test
 *
 * Verifies that inline event handlers have been fully eliminated from
 * templates/index.html, and that no Object.assign(window, {...}) blocks
 * remain in source modules (CHT-1073 Phase 3).
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Extract function names from inline event handlers in HTML
 * Looks for onclick="funcName(...)", onsubmit="return funcName(...)", etc.
 */
function extractHandlerFunctions(html) {
  const functions = new Set();

  const handlerPattern = /on(click|submit|change|input|keydown|keyup|keypress|focus|blur|mousedown|mouseup|mouseover|mouseout|mouseenter)="([^"]*)"/gi;
  let match;

  while ((match = handlerPattern.exec(html)) !== null) {
    const handlerCode = match[2];
    const funcCallPattern = /(?:return\s+)?(\w+)\s*\(/g;
    let funcMatch;

    while ((funcMatch = funcCallPattern.exec(handlerCode)) !== null) {
      const funcName = funcMatch[1];
      const excluded = [
        'return', 'event', 'this', 'true', 'false', 'null', 'undefined',
        'stopPropagation', 'preventDefault', 'stopImmediatePropagation',
        'focus', 'blur', 'click', 'submit'
      ];
      if (!excluded.includes(funcName)) {
        functions.add(funcName);
      }
    }
  }

  return functions;
}

describe('Window Exports', () => {
  const frontendDir = path.resolve(__dirname, '..');
  const templatePath = path.join(frontendDir, 'templates', 'index.html');
  const srcDir = __dirname;

  it('should have zero inline handlers in index.html', () => {
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    const requiredFunctions = extractHandlerFunctions(htmlContent);

    expect(requiredFunctions.size).toBe(0);
    console.log(`✓ All ${requiredFunctions.size} inline handler functions are properly exported`);
  });

  it('should extract handler functions correctly from sample HTML', () => {
    const sampleHtml = `
      <form onsubmit="return handleLogin(event)">
      <a onclick="showSignup()">Sign up</a>
      <select onchange="filterIssues()">
      <button onclick="navigateTo('issues')">Issues</button>
      <div onclick="event.stopPropagation()">
      <input oninput="debounceSearch()">
      <input onkeydown="handleQuickCreate(event)">
    `;

    const functions = extractHandlerFunctions(sampleHtml);

    expect(functions.has('handleLogin')).toBe(true);
    expect(functions.has('showSignup')).toBe(true);
    expect(functions.has('filterIssues')).toBe(true);
    expect(functions.has('navigateTo')).toBe(true);
    expect(functions.has('debounceSearch')).toBe(true);
    expect(functions.has('handleQuickCreate')).toBe(true);
    expect(functions.has('event')).toBe(false);
  });

  it('should have no Object.assign(window, {...}) blocks in source modules', () => {
    const sourceFiles = fs.readdirSync(srcDir)
      .filter(f => f.endsWith('.js') && !f.endsWith('.test.js'));

    const filesWithWindowAssign = [];

    for (const file of sourceFiles) {
      const filePath = path.join(srcDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      if (/Object\.assign\s*\(\s*window\s*,/.test(content)) {
        filesWithWindowAssign.push(file);
      }
    }

    expect(filesWithWindowAssign).toEqual([]);
  });

  it('should have no window.funcName = assignments in source modules (except browser APIs)', () => {
    const sourceFiles = fs.readdirSync(srcDir)
      .filter(f => f.endsWith('.js') && !f.endsWith('.test.js'));

    // Allowed: window.marked, window.DOMPurify (third-party lib setup in main.js),
    // window.api (API client in api.js)
    const allowedPatterns = ['marked', 'DOMPurify', 'api'];

    const violations = [];

    for (const file of sourceFiles) {
      const filePath = path.join(srcDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const pattern = /window\.(\w+)\s*=\s*(?!.*(?:location|innerWidth|scrollY))/g;
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (!allowedPatterns.includes(match[1])) {
          violations.push(`${file}: window.${match[1]}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
