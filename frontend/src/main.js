/**
 * Main entry point for Chaotic frontend
 * This file imports dependencies and initializes the app
 */

// Import npm dependencies
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Make dependencies available globally for app.js
window.marked = marked;
window.DOMPurify = DOMPurify;

// Import API client (also attaches to window.api)
import './api.js';

// Import extracted modules (attach to window for backward compat)
import './ui.js';
import './auth.js';
import './documents.js';
import './agents.js';
import './teams.js';
import './projects.js';
import './rituals.js';
import './gate-approvals.js';
import './api-keys.js';
import './command-palette.js';
import './dashboard.js';
import './onboarding.js';

// Import main application (attaches all handlers to window)
import './app.js';

console.log('Chaotic frontend loaded via Vite');
