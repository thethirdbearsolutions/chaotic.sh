import { describe, it, expect } from 'vitest';
import { registerViewFilter, focusViewFilter } from './view-filter.js';

describe('view filter (CHT-2096)', () => {
    it('focuses the current view\'s filter box', () => {
        document.body.innerHTML = '<input id="epics-filter" value="abc">';
        registerViewFilter('epics', 'epics-filter');
        expect(focusViewFilter('epics')).toBe(true);
        expect(document.activeElement.id).toBe('epics-filter');
    });

    it('reports a view with no filter, or one not on the page', () => {
        document.body.innerHTML = '';
        expect(focusViewFilter('board')).toBe(false);
        registerViewFilter('docs', 'docs-filter');
        expect(focusViewFilter('docs')).toBe(false);
    });
});
