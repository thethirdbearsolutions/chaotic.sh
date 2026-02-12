import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';

// Mock the projects module
vi.mock('./projects.js', () => ({
    getSavedProjectId: vi.fn(() => null),
}));

import { getSavedProjectId } from './projects.js';

describe('getProjectFromUrl', () => {
    let originalLocation;

    beforeEach(() => {
        // Save original location
        originalLocation = window.location;
        // Mock window.location
        delete window.location;
        window.location = {
            search: '',
            pathname: '/board',
        };
        vi.clearAllMocks();
    });

    afterEach(() => {
        // Restore original location
        window.location = originalLocation;
    });

    it('returns project ID from URL when present', () => {
        window.location.search = '?project=proj-123';
        const result = getProjectFromUrl();
        expect(result).toBe('proj-123');
        expect(getSavedProjectId).not.toHaveBeenCalled();
    });

    it('falls back to localStorage when URL param missing', () => {
        window.location.search = '';
        getSavedProjectId.mockReturnValue('saved-proj-456');
        const result = getProjectFromUrl();
        expect(result).toBe('saved-proj-456');
        expect(getSavedProjectId).toHaveBeenCalled();
    });

    it('returns null when neither URL nor localStorage has project', () => {
        window.location.search = '';
        getSavedProjectId.mockReturnValue(null);
        const result = getProjectFromUrl();
        expect(result).toBeNull();
    });

    it('handles URL with other params but no project', () => {
        window.location.search = '?status=done&priority=high';
        getSavedProjectId.mockReturnValue('fallback-proj');
        const result = getProjectFromUrl();
        expect(result).toBe('fallback-proj');
    });

    it('returns URL project even when localStorage has different value', () => {
        window.location.search = '?project=url-proj';
        getSavedProjectId.mockReturnValue('local-proj');
        const result = getProjectFromUrl();
        expect(result).toBe('url-proj');
    });

    it('handles URL with project among other params', () => {
        window.location.search = '?status=todo&project=my-proj&priority=high';
        const result = getProjectFromUrl();
        expect(result).toBe('my-proj');
    });

    it('handles URL-encoded project IDs', () => {
        window.location.search = '?project=proj%20with%20spaces';
        const result = getProjectFromUrl();
        expect(result).toBe('proj with spaces');
    });

    it('handles empty project param', () => {
        window.location.search = '?project=';
        getSavedProjectId.mockReturnValue('fallback');
        const result = getProjectFromUrl();
        // Empty string is falsy, should fall back
        expect(result).toBe('fallback');
    });

    it('handles project param with special characters', () => {
        window.location.search = '?project=proj-abc_123';
        const result = getProjectFromUrl();
        expect(result).toBe('proj-abc_123');
    });
});

describe('updateUrlWithProject', () => {
    let originalLocation;
    let replaceStateSpy;

    beforeEach(() => {
        // Save original location
        originalLocation = window.location;
        // Mock window.location
        delete window.location;
        window.location = {
            search: '',
            pathname: '/board',
        };
        // Mock history.replaceState
        replaceStateSpy = vi.spyOn(history, 'replaceState').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore original location
        window.location = originalLocation;
        replaceStateSpy.mockRestore();
    });

    it('adds project param to empty URL', () => {
        window.location.search = '';
        window.location.pathname = '/board';
        updateUrlWithProject('proj-123');
        expect(replaceStateSpy).toHaveBeenCalledWith(
            history.state,
            '',
            '/board?project=proj-123'
        );
    });

    it('updates existing project param', () => {
        window.location.search = '?project=old-proj';
        window.location.pathname = '/board';
        updateUrlWithProject('new-proj');
        expect(replaceStateSpy).toHaveBeenCalledWith(
            history.state,
            '',
            '/board?project=new-proj'
        );
    });

    it('preserves other URL params when adding project', () => {
        window.location.search = '?status=todo&priority=high';
        window.location.pathname = '/issues';
        updateUrlWithProject('proj-abc');
        const calledUrl = replaceStateSpy.mock.calls[0][2];
        expect(calledUrl).toContain('project=proj-abc');
        expect(calledUrl).toContain('status=todo');
        expect(calledUrl).toContain('priority=high');
    });

    it('preserves other URL params when updating project', () => {
        window.location.search = '?status=todo&project=old&priority=high';
        window.location.pathname = '/issues';
        updateUrlWithProject('new');
        const calledUrl = replaceStateSpy.mock.calls[0][2];
        expect(calledUrl).toContain('project=new');
        expect(calledUrl).toContain('status=todo');
        expect(calledUrl).toContain('priority=high');
        expect(calledUrl).not.toContain('old');
    });

    it('removes project param when projectId is empty string', () => {
        window.location.search = '?project=old-proj';
        window.location.pathname = '/board';
        updateUrlWithProject('');
        expect(replaceStateSpy).toHaveBeenCalledWith(
            history.state,
            '',
            '/board'
        );
    });

    it('removes project param when projectId is null', () => {
        window.location.search = '?project=old-proj';
        window.location.pathname = '/board';
        updateUrlWithProject(null);
        expect(replaceStateSpy).toHaveBeenCalledWith(
            history.state,
            '',
            '/board'
        );
    });

    it('preserves other params when removing project', () => {
        window.location.search = '?status=done&project=proj&priority=low';
        window.location.pathname = '/issues';
        updateUrlWithProject(null);
        const calledUrl = replaceStateSpy.mock.calls[0][2];
        expect(calledUrl).not.toContain('project');
        expect(calledUrl).toContain('status=done');
        expect(calledUrl).toContain('priority=low');
    });

    it('preserves history state', () => {
        window.location.search = '';
        window.location.pathname = '/board';
        const mockState = { view: 'board', someData: 123 };
        history.replaceState.mockImplementation(() => {});
        // Set up history.state mock
        Object.defineProperty(history, 'state', {
            value: mockState,
            writable: true,
            configurable: true,
        });
        updateUrlWithProject('proj');
        expect(replaceStateSpy).toHaveBeenCalledWith(
            mockState,
            '',
            expect.any(String)
        );
    });

    it('handles special characters in project ID', () => {
        window.location.search = '';
        window.location.pathname = '/board';
        updateUrlWithProject('proj-abc_123');
        const calledUrl = replaceStateSpy.mock.calls[0][2];
        expect(calledUrl).toContain('project=proj-abc_123');
    });
});
