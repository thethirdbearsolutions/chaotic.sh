/**
 * Issue tooltip module - shows preview microcard on hover over issue links
 */

import { escapeHtml } from './utils.js';

// Cache for fetched issues to avoid repeated API calls
const issueCache = new Map();
const CACHE_TTL = 60000; // 1 minute
const MAX_CACHE_SIZE = 100; // Prevent unbounded growth

// Current tooltip element
let tooltipEl = null;
let hideTimeout = null;
let showTimeout = null;
let currentIdentifier = null;
let listenersRegistered = false;

// Status and priority colors (matching CSS)
const STATUS_COLORS = {
    backlog: '#6b7280',
    todo: '#9ca3af',
    in_progress: '#f59e0b',
    in_review: '#8b5cf6',
    done: '#22c55e',
    canceled: '#ef4444',
};

const PRIORITY_COLORS = {
    urgent: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#9ca3af',
    no_priority: '#6b7280',
};

// Default dependencies (can be overridden for testing)
const defaultDeps = {
    api: null,
};

let deps = { ...defaultDeps };

/**
 * Initialize the tooltip system
 * @param {Object} dependencies - { api, getStatusColor, getPriorityColor }
 */
export function initIssueTooltip(dependencies = {}) {
    deps = { ...defaultDeps, ...dependencies };

    // Create tooltip element if it doesn't exist
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'issue-tooltip';
        tooltipEl.style.display = 'none';
        document.body.appendChild(tooltipEl);

        // Keep tooltip visible when hovering over it
        tooltipEl.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
        });
        tooltipEl.addEventListener('mouseleave', () => {
            hideTooltip();
        });
    }

    // Use event delegation on document for all issue links (only register once)
    if (!listenersRegistered) {
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        listenersRegistered = true;
    }
}

/**
 * Handle mouseover events
 */
function handleMouseOver(e) {
    const link = e.target.closest('.issue-link, .activity-issue-link');
    if (!link) return;

    // Extract identifier from href or text content
    const identifier = extractIdentifier(link);
    if (!identifier) return;

    // Don't re-show tooltip for same issue
    if (identifier === currentIdentifier && tooltipEl.style.display !== 'none') {
        clearTimeout(hideTimeout);
        return;
    }

    // Delay showing tooltip slightly to avoid flicker
    clearTimeout(showTimeout);
    showTimeout = setTimeout(() => {
        showTooltip(link, identifier);
    }, 200);
}

/**
 * Handle mouseout events
 */
function handleMouseOut(e) {
    const link = e.target.closest('.issue-link, .activity-issue-link');
    if (!link) return;

    clearTimeout(showTimeout);

    // Delay hiding to allow moving to tooltip
    hideTimeout = setTimeout(() => {
        hideTooltip();
    }, 150);
}

/**
 * Extract issue identifier from link
 */
function extractIdentifier(link) {
    // Try href first (format: #/issue/CHT-123 or /issue/CHT-123)
    const href = link.getAttribute('href') || '';
    const hrefMatch = href.match(/\/issue\/([A-Z]{2,10}-\d+)/);
    if (hrefMatch) return hrefMatch[1];

    // Fall back to text content
    const text = link.textContent.trim();
    const textMatch = text.match(/^([A-Z]{2,10}-\d+)$/);
    if (textMatch) return textMatch[1];

    return null;
}

/**
 * Show tooltip for an issue link
 */
async function showTooltip(link, identifier) {
    currentIdentifier = identifier;

    // Position tooltip near the link
    const rect = link.getBoundingClientRect();
    tooltipEl.style.left = `${rect.left + window.scrollX}px`;
    tooltipEl.style.top = `${rect.bottom + window.scrollY + 8}px`;

    // Show loading state
    tooltipEl.innerHTML = `<div class="issue-tooltip-loading">Loading...</div>`;
    tooltipEl.style.display = 'block';

    try {
        const issue = await fetchIssue(identifier);

        // Check if we're still showing this tooltip
        if (currentIdentifier !== identifier) return;

        renderTooltip(issue);
    } catch {
        // Check if we're still showing this tooltip
        if (currentIdentifier !== identifier) return;

        tooltipEl.innerHTML = `<div class="issue-tooltip-error">Could not load issue</div>`;
    }
}

/**
 * Hide the tooltip
 */
export function hideTooltip() {
    if (tooltipEl) {
        tooltipEl.style.display = 'none';
    }
    currentIdentifier = null;
}

/**
 * Evict expired entries from cache
 */
function evictExpiredCache() {
    const now = Date.now();
    for (const [key, value] of issueCache.entries()) {
        if (now - value.timestamp >= CACHE_TTL) {
            issueCache.delete(key);
        }
    }
}

/**
 * Fetch issue from cache or API
 */
async function fetchIssue(identifier) {
    // Periodically evict expired entries to prevent memory leaks
    if (issueCache.size > MAX_CACHE_SIZE / 2) {
        evictExpiredCache();
    }

    const cached = issueCache.get(identifier);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.issue;
    }

    if (!deps.api) {
        throw new Error('API not initialized');
    }

    const issue = await deps.api.getIssueByIdentifier(identifier);

    // Enforce cache size limit (LRU-like: just clear oldest half if full)
    if (issueCache.size >= MAX_CACHE_SIZE) {
        const entries = Array.from(issueCache.entries());
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const toDelete = entries.slice(0, MAX_CACHE_SIZE / 2);
        for (const [key] of toDelete) {
            issueCache.delete(key);
        }
    }

    issueCache.set(identifier, { issue, timestamp: Date.now() });
    return issue;
}

/**
 * Render the tooltip content
 */
function renderTooltip(issue) {
    const statusColor = STATUS_COLORS[issue.status] || '#6b7280';
    const priorityColor = PRIORITY_COLORS[issue.priority] || '#6b7280';
    const typeLabel = (issue.issue_type || 'task').replace(/_/g, ' ');
    const estimateText = issue.estimate ? `${issue.estimate}pt` : '';

    tooltipEl.innerHTML = `
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${escapeHtml(issue.identifier)}</span>
            <span class="issue-tooltip-type">${escapeHtml(typeLabel)}</span>
            ${estimateText ? `<span class="issue-tooltip-estimate">${estimateText}</span>` : ''}
        </div>
        <div class="issue-tooltip-title">${escapeHtml(issue.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${statusColor}">${formatStatus(issue.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${priorityColor}">${formatPriority(issue.priority)}</span>
        </div>
    `;
}

/**
 * Format status for display
 */
function formatStatus(status) {
    return (status || 'backlog').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Format priority for display
 */
function formatPriority(priority) {
    return (priority || 'no_priority').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Clear the issue cache (useful for testing or after updates)
 */
export function clearIssueCache() {
    issueCache.clear();
}

/**
 * Clean up tooltip (for testing)
 */
export function destroyIssueTooltip() {
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    if (tooltipEl && tooltipEl.parentNode) {
        tooltipEl.parentNode.removeChild(tooltipEl);
    }
    tooltipEl = null;
    listenersRegistered = false;
    issueCache.clear();
}
