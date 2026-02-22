/**
 * Command Palette module
 * Extracted from app.js for better testability and maintainability.
 *
 * Provides a Cmd+K style command palette for quick navigation and actions.
 */

import { registerActions } from './event-delegation.js';

// State
let commandPaletteOpen = false;
let selectedCommandIndex = 0;
let filteredCommands = [];
let commands = [];

/**
 * Set the available commands.
 * @param {Array} cmds - Array of command objects with id, title, subtitle, icon, category, action
 */
export function setCommands(cmds) {
    commands = cmds;
    filteredCommands = [...cmds];
}

/**
 * Check if the command palette is currently open.
 * @returns {boolean}
 */
export function isOpen() {
    return commandPaletteOpen;
}

/**
 * Get the currently filtered commands.
 * @returns {Array}
 */
export function getFiltered() {
    return filteredCommands;
}

/**
 * Get the current selected command index.
 * @returns {number}
 */
export function getSelectedIndex() {
    return selectedCommandIndex;
}

/**
 * Open the command palette.
 */
export function open() {
    if (commandPaletteOpen) return;
    commandPaletteOpen = true;
    selectedCommandIndex = 0;
    filteredCommands = [...commands];

    const overlay = document.createElement('div');
    overlay.id = 'command-palette-overlay';
    overlay.className = 'command-palette-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) close(); };

    overlay.innerHTML = `
        <div class="command-palette">
            <div class="command-input-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" class="command-input" placeholder="Type a command or search..." autofocus>
            </div>
            <div class="command-results" id="command-results"></div>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector('.command-input');
    input.addEventListener('input', (e) => filter(e.target.value));
    input.addEventListener('keydown', handleKeydown);

    // Mouseover for hover-to-select (local listener, not global delegation)
    overlay.addEventListener('mouseover', (e) => {
        const item = e.target.closest('[data-action="execute-command"]');
        if (item) selectCommand(Number(item.dataset.commandIndex));
    });

    render();

    // Focus input after animation
    requestAnimationFrame(() => input.focus());
}

/**
 * Close the command palette.
 */
export function close() {
    commandPaletteOpen = false;
    const overlay = document.getElementById('command-palette-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Filter commands based on search query.
 * @param {string} query - Search query
 */
export function filter(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        filteredCommands = [...commands];
    } else {
        filteredCommands = commands.filter(cmd =>
            cmd.title.toLowerCase().includes(q) ||
            cmd.subtitle.toLowerCase().includes(q) ||
            cmd.category.toLowerCase().includes(q)
        );
    }
    selectedCommandIndex = 0;
    render();
}

/**
 * Render the command results list.
 */
function render() {
    const container = document.getElementById('command-results');
    if (!container) return;

    if (filteredCommands.length === 0) {
        container.innerHTML = '<div class="command-empty">No commands found</div>';
        return;
    }

    // Group by category
    const grouped = {};
    filteredCommands.forEach(cmd => {
        if (!grouped[cmd.category]) grouped[cmd.category] = [];
        grouped[cmd.category].push(cmd);
    });

    let html = '';
    let globalIndex = 0;

    for (const [category, cmds] of Object.entries(grouped)) {
        html += `<div class="command-group">
            <div class="command-group-title">${category}</div>`;

        for (const cmd of cmds) {
            const isSelected = globalIndex === selectedCommandIndex;
            html += `
                <div class="command-item ${isSelected ? 'selected' : ''}"
                     data-index="${globalIndex}"
                     data-action="execute-command" data-command-index="${globalIndex}"
>
                    <div class="command-item-icon">${cmd.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${cmd.title}</div>
                        <div class="command-item-subtitle">${cmd.subtitle}</div>
                    </div>
                    ${cmd.shortcut ? `<div class="command-item-shortcut"><kbd>${cmd.shortcut}</kbd></div>` : ''}
                </div>
            `;
            globalIndex++;
        }

        html += '</div>';
    }

    container.innerHTML = html;

    // Scroll selected into view
    const selected = container.querySelector('.command-item.selected');
    if (selected && selected.scrollIntoView) {
        selected.scrollIntoView({ block: 'nearest' });
    }
}

/**
 * Select a command by index.
 * @param {number} index - Command index
 */
export function selectCommand(index) {
    selectedCommandIndex = index;
    render();
}

/**
 * Execute a command by index.
 * @param {number} index - Command index
 */
export function executeCommand(index) {
    const cmd = filteredCommands[index];
    if (cmd) {
        close();
        cmd.action();
    }
}

/**
 * Handle keyboard events in the command palette.
 * @param {KeyboardEvent} e - Keyboard event
 */
export function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            selectedCommandIndex = Math.min(selectedCommandIndex + 1, filteredCommands.length - 1);
            render();
            break;
        case 'ArrowUp':
            e.preventDefault();
            selectedCommandIndex = Math.max(selectedCommandIndex - 1, 0);
            render();
            break;
        case 'Enter':
            e.preventDefault();
            executeCommand(selectedCommandIndex);
            break;
        case 'Escape':
            e.preventDefault();
            close();
            break;
    }
}

// Register delegated event handlers
registerActions({
    'execute-command': (_event, data) => {
        executeCommand(Number(data.commandIndex));
    },
});
