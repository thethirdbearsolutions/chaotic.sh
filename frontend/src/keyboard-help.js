/**
 * Keyboard shortcuts help overlay (CHT-1145)
 *
 * Data-driven shortcut help modal triggered by '?' key.
 * Extracts and improves the inline HTML that was in app.js.
 */

import { showModal } from './ui.js';
import { escapeHtml } from './utils.js';

const SHORTCUT_GROUPS = [
    {
        title: 'Navigation',
        shortcuts: [
            { key: 'm', description: 'Dashboard' },
            { key: 'i', description: 'All Issues' },
            { key: 'b', description: 'Board' },
            { key: 'p', description: 'Projects' },
            { key: 'g s', description: 'Sprints' },
            { key: 'g d', description: 'Documents' },
            { key: 'g t', description: 'Team' },
        ],
    },
    {
        title: 'Actions',
        shortcuts: [
            { key: '⌘K', description: 'Command palette' },
            { key: '/', description: 'Search issues' },
            { key: 'c', description: 'Create new item' },
            { key: '?', description: 'Show shortcuts' },
            { key: 'Esc', description: 'Close modal / dropdown' },
        ],
    },
    {
        title: 'Issue List',
        shortcuts: [
            { key: 'j / k', description: 'Navigate list' },
            { key: 'Enter', description: 'Open selected issue' },
            { key: 'e', description: 'Edit selected issue' },
        ],
    },
    {
        title: 'Issue Detail',
        shortcuts: [
            { key: 'c', description: 'Focus comment box' },
            { key: 'j / k', description: 'Next / previous issue' },
            { key: '\u2190 / \u2192', description: 'Previous / next issue' },
            { key: 's', description: 'Status' },
            { key: 'p', description: 'Priority' },
            { key: 'a', description: 'Assignee' },
            { key: 'l', description: 'Labels' },
            { key: 'e', description: 'Estimate' },
            { key: 't', description: 'Type' },
        ],
    },
    {
        title: 'Documents',
        shortcuts: [
            { key: 'j / k', description: 'Navigate list' },
            { key: 'Enter', description: 'Open selected document' },
            { key: 'e', description: 'Edit selected document' },
        ],
    },
    {
        title: 'General',
        shortcuts: [
            { key: '⌘Enter', description: 'Submit form / comment' },
        ],
    },
];

function renderShortcutRow(shortcut) {
    return `<div class="shortcut-row">
        <span class="shortcut-description">${escapeHtml(shortcut.description)}</span>
        <span class="shortcut-keys">${shortcut.key.split(' / ').map(k =>
        `<kbd class="kbd-hint">${escapeHtml(k.trim())}</kbd>`
    ).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`;
}

function renderGroup(group) {
    return `<div class="shortcut-group">
        <h4 class="shortcut-group-title">${escapeHtml(group.title)}</h4>
        ${group.shortcuts.map(renderShortcutRow).join('')}
    </div>`;
}

export function showKeyboardShortcutsHelp() {
    document.getElementById('modal-title').textContent = 'Keyboard Shortcuts';
    document.getElementById('modal-content').innerHTML = `
        <div class="shortcuts-help">
            ${SHORTCUT_GROUPS.map(renderGroup).join('')}
        </div>
    `;
    showModal();
}

// Exported for testing
export { SHORTCUT_GROUPS };
