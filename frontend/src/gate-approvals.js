/**
 * Markdown and relative-time helpers, from the former Approvals tab
 * (CHT-1040). The tab folded into the Inbox's Approvals filter (CHT-2032),
 * which decides reviews, gates and sprint rituals in place; what stays
 * here is shared by every markdown surface.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { markAttachmentRefs } from './attachment-refs.js';


/**
 * Mark attachment images and links in sanitized HTML (CHT-1996), so every
 * markdown surface loads them with the token instead of a bare <img src>.
 * A <template> is inert: nothing in it is fetched.
 */
function withAttachmentRefs(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    markAttachmentRefs(template.content);
    return template.innerHTML;
}

/**
 * Render markdown content safely using marked + DOMPurify.
 */
export function renderMarkdown(content) {
    if (!content) return '';
    try {
        marked.setOptions({ breaks: true, gfm: true });
        const rawHtml = marked.parse(content);
        // Escape raw-text HTML elements (title, style, textarea, xmp) whose
        // content gets silently destroyed by DOMPurify since it treats their
        // children as raw text, not DOM nodes (CHT-829)
        const safeHtml = rawHtml.replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,
            (match) => match.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        // No data-* attributes from content (CHT-1996 review): event
        // delegation dispatches any [data-action] click, so markup in a
        // comment could otherwise plant a working control (delete an
        // attachment, approve a ritual). Every data-* the app needs is
        // added after sanitising (attachment refs, issue links, mentions).
        const clean = DOMPurify.sanitize(safeHtml, { FORCE_BODY: true, ALLOW_DATA_ATTR: false });
        return clean.includes('/api/attachments/') ? withAttachmentRefs(clean) : clean;
    } catch (e) {
        console.error('Markdown parsing error:', e);
        return content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    }
}


/**
 * Format ISO timestamp to relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffMs = now - date;
    if (diffMs < 0) return 'just now';
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

export { formatRelativeTime };
