/**
 * The shared helpers left in gate-approvals.js once the Approvals tab
 * folded into the Inbox (CHT-2032).
 */
import { describe, it, expect } from 'vitest';
import { renderMarkdown, formatRelativeTime } from './gate-approvals.js';

describe('renderMarkdown', () => {
    it('renders markdown and drops scripts and data attributes', () => {
        const html = renderMarkdown('**bold** <script>alert(1)</script><span data-action="approve">x</span>');
        expect(html).toContain('<strong>bold</strong>');
        expect(html).not.toContain('<script');
        expect(html).not.toContain('data-action');
    });

    it('renders nothing for no content', () => {
        expect(renderMarkdown('')).toBe('');
        expect(renderMarkdown(null)).toBe('');
    });
});

describe('formatRelativeTime', () => {
    it('says how long ago', () => {
        const now = Date.now();
        expect(formatRelativeTime(new Date(now - 5 * 1000).toISOString())).toBe('just now');
        expect(formatRelativeTime(new Date(now - 5 * 60 * 1000).toISOString())).toBe('5m ago');
        expect(formatRelativeTime(new Date(now - 3 * 3600 * 1000).toISOString())).toBe('3h ago');
        expect(formatRelativeTime(new Date(now - 3 * 86400 * 1000).toISOString())).toBe('3d ago');
    });

    it('is empty for no time or a bad one', () => {
        expect(formatRelativeTime(null)).toBe('');
        expect(formatRelativeTime('not a date')).toBe('');
    });
});
