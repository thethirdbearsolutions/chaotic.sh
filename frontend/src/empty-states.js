/**
 * Empty state rendering helpers (CHT-1146)
 *
 * Consistent empty states with icon, message, and optional CTA button.
 */

import { escapeHtml, escapeAttr } from './utils.js';

/**
 * Render an empty state with icon, heading, description, and optional CTA.
 *
 * @param {Object} options
 * @param {string} options.icon - SVG string for the icon
 * @param {string} options.heading - Main heading text
 * @param {string} options.description - Secondary description text
 * @param {Object} [options.cta] - Optional call-to-action button
 * @param {string} options.cta.label - Button label
 * @param {string} options.cta.action - data-action value
 * @param {Object} [options.cta.data] - Additional data-* attributes (key-value pairs)
 * @param {'error'} [options.variant] - CHT-1224: pass 'error' for failure
 *   states (as opposed to genuine empty collections) so they're visually
 *   distinguishable — a low-pri ticket had flagged the dashboard's error and
 *   empty states as identical-looking, which this variant unifies a fix for
 *   across every call site rather than patching one view.
 * @returns {string} HTML string
 */
export function renderEmptyState({ icon, heading, description, cta, variant }) {
    const ctaHtml = cta ? `
        <button class="btn btn-primary empty-state-cta" data-action="${escapeAttr(cta.action)}"${
            cta.data ? Object.entries(cta.data).map(([k, v]) => ` data-${escapeAttr(k)}="${escapeAttr(v)}"`).join('') : ''
        }>${escapeHtml(cta.label)}</button>
    ` : '';

    const variantClass = variant === 'error' ? ' empty-state-error' : '';

    return `
        <div class="empty-state${variantClass}">
            <div class="empty-state-icon">${icon}</div>
            <h3>${escapeHtml(heading)}</h3>
            <p>${escapeHtml(description)}</p>
            ${ctaHtml}
        </div>
    `;
}

// SVG icons for empty states (simple, minimal line drawings)
export const EMPTY_ICONS = {
    issues: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    board: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    sprints: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    documents: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    projects: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    dashboard: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',
    epics: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    activity: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    search: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    // CHT-1226: rituals-view.js and gate-approvals.js (rituals/gate content)
    // and teams.js (people) had no dedicated icon and were still raw divs.
    rituals: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',
    team: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    // CHT-1250: inbox view (gates/mentions/assignments/reviews awaiting you).
    inbox: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
};
