/**
 * Entry for editor.bundle.js (CHT-2028): the rich comment editor, kept
 * out of app.bundle.js and loaded on first use by rich-composer.js.
 */
import * as editor from './tiptap-editor.js';

window.ChaoticEditor = editor;
