/**
 * Utility functions for Chaotic frontend
 * Extracted from app.js for testability
 */

/**
 * Format status string for display
 * @param {string} status - Status like 'in_progress', 'todo', etc.
 * @returns {string} Formatted status like 'In Progress', 'Todo'
 */
export function formatStatus(status) {
  if (!status) return '';
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Format priority string for display
 * @param {string} priority - Priority like 'no_priority', 'high', etc.
 * @returns {string} Formatted priority like 'No Priority', 'High'
 */
export function formatPriority(priority) {
  if (!priority) return '';
  if (priority === 'no_priority') return 'No Priority';
  return priority.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Format date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date like 'Jan 15, 2024', or empty string for invalid inputs
 */
export function formatDate(dateString) {
  // Validate input: handle null, undefined, empty string
  if (!dateString) return '';

  // Parse date and validate it's a valid date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Invalid date string
    return '';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Sanitize a color string to prevent XSS
 * @param {string} color - Color string like '#ff0000'
 * @returns {string} Sanitized color or default gray
 */
export function sanitizeColor(color) {
  if (typeof color === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(color))
    return color;
  return '#888888';
}

/**
 * Escape HTML special characters (pure version)
 * @param {string} text - Text to escape
 * @returns {string} HTML-escaped text
 */
export function escapeHtml(text) {
  if (!text) return '';
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return String(text).replace(/[&<>]/g, (char) => escapeMap[char]);
}

/**
 * Escape text for use in HTML attributes
 * @param {string} text - Text to escape
 * @returns {string} Attribute-safe escaped text
 */
export function escapeAttr(text) {
  return escapeHtml(text).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

/**
 * Create a debounced version of a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function with .cancel() method
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  const debounced = function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
  debounced.cancel = function () {
    clearTimeout(timeoutId);
  };
  return debounced;
}

/**
 * Get SVG icon for priority level
 * @param {string} priority - Priority level
 * @returns {string} SVG markup string
 */
export function getPriorityIcon(priority) {
  const icons = {
    urgent:
      '<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',
    high: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
    medium:
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
    low: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
    no_priority:
      '<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>',
  };
  return icons[priority] || icons.no_priority;
}

/**
 * Get SVG icon for status
 * @param {string} status - Status value
 * @returns {string} SVG markup string
 */
export function getStatusIcon(status) {
  const icons = {
    backlog:
      '<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',
    todo: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    in_progress:
      '<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',
    in_review:
      '<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',
    done: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',
    canceled:
      '<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>',
  };
  return icons[status] || icons.backlog;
}

/**
 * Format a date as a relative time string (e.g., "2h ago", "just now")
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted relative time string, or empty string for invalid inputs
 */
export function formatTimeAgo(dateString) {
  // Validate input: handle null, undefined, empty string
  if (!dateString) return '';

  // Parse date and validate it's a valid date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Invalid date string
    return '';
  }

  const now = new Date();
  const diffMs = now - date;

  // Check for future dates
  if (diffMs < 0) {
    return 'in the future';
  }

  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

/**
 * Escape a string for use inside JavaScript string literals.
 * Use this when embedding values in onclick="func('${value}')" handlers.
 * @param {string} text - Text to escape
 * @returns {string} Escaped string safe for use in JS string literals
 */
export function escapeJsString(text) {
    if (text == null) return '';
    return String(text)
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/'/g, '\\x27')
        .replace(/"/g, '\\x22')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/</g, '\\x3c')
        .replace(/>/g, '\\x3e');
}
