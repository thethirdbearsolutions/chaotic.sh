import { describe, it, expect, vi } from 'vitest';

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((s) => s),
    escapeAttr: vi.fn((s) => s),
}));

import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';

describe('empty-states', () => {
    describe('EMPTY_ICONS', () => {
        it('has SVG icons for all view types', () => {
            const expected = ['issues', 'board', 'sprints', 'documents', 'projects', 'dashboard', 'epics', 'activity', 'search'];
            for (const key of expected) {
                expect(EMPTY_ICONS[key]).toBeTruthy();
                expect(EMPTY_ICONS[key]).toContain('<svg');
            }
        });
    });

    describe('renderEmptyState', () => {
        it('renders heading and description', () => {
            const html = renderEmptyState({
                icon: '<svg></svg>',
                heading: 'No items',
                description: 'Nothing here yet',
            });
            expect(html).toContain('No items');
            expect(html).toContain('Nothing here yet');
        });

        it('renders icon in empty-state-icon container', () => {
            const html = renderEmptyState({
                icon: '<svg class="test-icon"></svg>',
                heading: 'Test',
                description: 'Desc',
            });
            expect(html).toContain('empty-state-icon');
            expect(html).toContain('test-icon');
        });

        it('renders empty-state container class', () => {
            const html = renderEmptyState({
                icon: '<svg></svg>',
                heading: 'Test',
                description: 'Desc',
            });
            expect(html).toContain('class="empty-state"');
        });

        it('renders CTA button when provided', () => {
            const html = renderEmptyState({
                icon: '<svg></svg>',
                heading: 'Test',
                description: 'Desc',
                cta: { label: 'Create item', action: 'create-item' },
            });
            expect(html).toContain('Create item');
            expect(html).toContain('data-action="create-item"');
            expect(html).toContain('empty-state-cta');
        });

        it('does not render CTA button when not provided', () => {
            const html = renderEmptyState({
                icon: '<svg></svg>',
                heading: 'Test',
                description: 'Desc',
            });
            expect(html).not.toContain('empty-state-cta');
            expect(html).not.toContain('data-action');
        });

        it('renders CTA with extra data attributes', () => {
            const html = renderEmptyState({
                icon: '<svg></svg>',
                heading: 'Test',
                description: 'Desc',
                cta: { label: 'Go', action: 'navigate', data: { view: 'issues', id: '123' } },
            });
            expect(html).toContain('data-view="issues"');
            expect(html).toContain('data-id="123"');
        });
    });
});
