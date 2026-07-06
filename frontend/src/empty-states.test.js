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

        // CHT-1224: a low-pri ticket flagged error and empty states as
        // visually identical — this variant is the cheap, unified fix so
        // every failure-state call site gets it for free instead of each
        // view inventing its own distinction.
        describe('error variant (CHT-1224)', () => {
            it('adds empty-state-error class when variant is "error"', () => {
                const html = renderEmptyState({
                    icon: '<svg></svg>',
                    heading: 'Failed to load things',
                    description: 'Check your connection and try again',
                    variant: 'error',
                });
                expect(html).toContain('class="empty-state empty-state-error"');
            });

            it('does not add the class when variant is omitted', () => {
                const html = renderEmptyState({
                    icon: '<svg></svg>',
                    heading: 'No things yet',
                    description: 'Create one to get started',
                });
                expect(html).toContain('class="empty-state"');
                expect(html).not.toContain('empty-state-error');
            });
        });
    });
});
