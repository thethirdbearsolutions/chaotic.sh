/**
 * Window Exports Verification Test
 *
 * This test ensures that all functions referenced in inline event handlers
 * (onclick, onsubmit, onchange, oninput, onkeydown, etc.) in templates/index.html
 * are properly exported to the window object by the source modules.
 *
 * This prevents runtime errors like "handleAddRelation is not defined" that
 * occur when a function is used in HTML but not attached to window.
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

  // Match all common event handlers: onclick, onsubmit, onchange, oninput, onkeydown, etc.
  const handlerPattern = /on(click|submit|change|input|keydown|keyup|keypress|focus|blur|mousedown|mouseup|mouseover|mouseout)="([^"]*)"/gi;
  let match;

  while ((match = handlerPattern.exec(html)) !== null) {
    const handlerCode = match[2];

    // Extract function calls from the handler code
    // Matches: funcName(, return funcName(, funcName( with spaces
    const funcCallPattern = /(?:return\s+)?(\w+)\s*\(/g;
    let funcMatch;

    while ((funcMatch = funcCallPattern.exec(handlerCode)) !== null) {
      const funcName = funcMatch[1];
      // Exclude JavaScript keywords, built-ins, and DOM methods
      const excluded = [
        // Keywords
        'return', 'event', 'this', 'true', 'false', 'null', 'undefined',
        // Common DOM methods that might appear in handlers
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

/**
 * Extract function names from Object.assign(window, {...}) blocks in JS source
 */
function extractWindowExports(jsSource) {
  const exports = new Set();

  // Match Object.assign(window, { ... }) blocks
  // This regex finds the content between the braces
  const assignPattern = /Object\.assign\s*\(\s*window\s*,\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs;
  let match;

  while ((match = assignPattern.exec(jsSource)) !== null) {
    const blockContent = match[1];

    // Extract identifiers from the object - both "name," and "name: value," forms
    // Simple property: funcName,
    // Property with value: funcName: someValue,
    const propPattern = /^\s*(\w+)\s*(?:,|:|$)/gm;
    let propMatch;

    while ((propMatch = propPattern.exec(blockContent)) !== null) {
      exports.add(propMatch[1]);
    }
  }

  // Also match direct window.funcName = assignments
  const directPattern = /window\.(\w+)\s*=\s*(?:function|async\s+function|\w+)/g;
  while ((match = directPattern.exec(jsSource)) !== null) {
    exports.add(match[1]);
  }

  return exports;
}

describe('Window Exports', () => {
  const frontendDir = path.resolve(__dirname, '..');
  const templatePath = path.join(frontendDir, 'templates', 'index.html');
  const srcDir = __dirname;

  // Source files that export to window
  const sourceFiles = [
    'app.js',
    'api.js',
    'auth.js',
    'ui.js',
    'teams.js',
    'projects.js',
    'documents.js',
    'agents.js',
    'rituals.js',
    'main.js'
  ];

  it('should export all functions used in inline HTML handlers to window', () => {
    // Read and parse HTML template
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    const requiredFunctions = extractHandlerFunctions(htmlContent);

    // Read and parse all source files to find window exports
    const exportedFunctions = new Set();
    for (const file of sourceFiles) {
      const filePath = path.join(srcDir, file);
      if (fs.existsSync(filePath)) {
        const jsContent = fs.readFileSync(filePath, 'utf-8');
        const exports = extractWindowExports(jsContent);
        exports.forEach(fn => exportedFunctions.add(fn));
      }
    }

    // Find any missing exports
    const missingExports = [];
    for (const func of requiredFunctions) {
      if (!exportedFunctions.has(func)) {
        missingExports.push(func);
      }
    }

    if (missingExports.length > 0) {
      const _message = [
        'The following functions are used in inline HTML handlers but not exported to window:',
        '',
        ...missingExports.map(fn => `  - ${fn}`),
        '',
        'Add them to the Object.assign(window, {...}) block in the appropriate source file.',
        '',
        `Required functions (${requiredFunctions.size}): ${[...requiredFunctions].sort().join(', ')}`,
        `Exported functions (${exportedFunctions.size}): ${[...exportedFunctions].sort().join(', ')}`
      ].join('\n');

      expect(missingExports).toEqual([]);
    }

    // Log success info
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
    // 'event' is a built-in, should be excluded
    expect(functions.has('event')).toBe(false);
  });

  it('should extract window exports correctly from sample JS', () => {
    const sampleJs = `
      Object.assign(window, {
        handleLogin,
        handleSignup,
        showLogin,
        escapeHtml,
      });

      window.initApp = initApp;

      window.showModal = function() {
        // implementation
      };
    `;

    const exports = extractWindowExports(sampleJs);

    expect(exports.has('handleLogin')).toBe(true);
    expect(exports.has('handleSignup')).toBe(true);
    expect(exports.has('showLogin')).toBe(true);
    expect(exports.has('escapeHtml')).toBe(true);
    expect(exports.has('initApp')).toBe(true);
    expect(exports.has('showModal')).toBe(true);
  });

  it('should have zero inline handlers after CHT-1057 migration', () => {
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    const requiredFunctions = extractHandlerFunctions(htmlContent);

    // All inline handlers have been migrated to addEventListener (CHT-1057)
    expect(requiredFunctions.size).toBe(0);
  });

  it('should export functions from multiple source files', () => {
    const exportedFunctions = new Set();
    const filesWithExports = [];

    for (const file of sourceFiles) {
      const filePath = path.join(srcDir, file);
      if (fs.existsSync(filePath)) {
        const jsContent = fs.readFileSync(filePath, 'utf-8');
        const exports = extractWindowExports(jsContent);
        if (exports.size > 0) filesWithExports.push(file);
        exports.forEach(fn => exportedFunctions.add(fn));
      }
    }

    expect(filesWithExports.length).toBeGreaterThanOrEqual(3);
    expect(exportedFunctions.size).toBeGreaterThanOrEqual(20);

    expect(exportedFunctions.has('navigateTo')).toBe(true);
    expect(exportedFunctions.has('showToast')).toBe(true);
    expect(exportedFunctions.has('closeModal')).toBe(true);
  });
});
