/**
 * Tests for router.js module (CHT-782)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock state.js
vi.mock('./state.js', () => ({
    setCurrentView: vi.fn(),
}));

// Mock url-helpers.js
vi.mock('./url-helpers.js', () => ({
    getProjectFromUrl: vi.fn(() => null),
}));

import { setCurrentView } from './state.js';
import { getProjectFromUrl } from './url-helpers.js';
import {
    registerViews,
    configureRouter,
    getValidViews,
    navigateTo,
    handleRoute,
    navigateToIssueByIdentifier,
    navigateToEpicByIdentifier,
    initRouter,
    resetRouter,
} from './router.js';

describe('router', () => {
    let pushStateSpy;
    let replaceStateSpy;
    let originalLocation;

    beforeEach(() => {
        // Reset router state for test isolation
        resetRouter();
        vi.clearAllMocks();

        // Mock history
        pushStateSpy = vi.spyOn(history, 'pushState').mockImplementation(() => {});
        replaceStateSpy = vi.spyOn(history, 'replaceState').mockImplementation(() => {});

        // Mock location
        originalLocation = window.location;
        delete window.location;
        window.location = {
            pathname: '/',
            search: '',
            href: 'http://localhost/',
        };

        // Set up minimal DOM
        document.body.innerHTML = `
            <a class="nav-item" data-view="my-issues"></a>
            <a class="nav-item" data-view="issues"></a>
            <a class="nav-item" data-view="board"></a>
            <a class="nav-item" data-view="settings"></a>
            <div id="my-issues-view" class="view hidden"></div>
            <div id="issues-view" class="view hidden"></div>
            <div id="board-view" class="view hidden"></div>
            <div id="settings-view" class="view hidden"></div>
        `;
    });

    afterEach(() => {
        window.location = originalLocation;
        pushStateSpy.mockRestore();
        replaceStateSpy.mockRestore();
        document.body.innerHTML = '';
    });

    describe('registerViews', () => {
        it('registers view handlers', () => {
            registerViews({ 'my-issues': vi.fn(), 'issues': vi.fn() });
            expect(getValidViews()).toContain('my-issues');
            expect(getValidViews()).toContain('issues');
        });

        it('merges with existing handlers', () => {
            registerViews({ 'my-issues': vi.fn() });
            registerViews({ 'board': vi.fn() });
            expect(getValidViews()).toContain('my-issues');
            expect(getValidViews()).toContain('board');
        });
    });

    describe('getValidViews', () => {
        it('returns list of registered view names', () => {
            registerViews({ 'my-issues': vi.fn(), 'board': vi.fn() });
            const views = getValidViews();
            expect(Array.isArray(views)).toBe(true);
            expect(views).toContain('my-issues');
            expect(views).toContain('board');
        });

        it('returns empty list when no views registered', () => {
            expect(getValidViews()).toEqual([]);
        });
    });

    describe('navigateTo', () => {
        let myIssuesHandler;
        let issuesHandler;

        beforeEach(() => {
            myIssuesHandler = vi.fn();
            issuesHandler = vi.fn();
            registerViews({
                'my-issues': myIssuesHandler,
                'issues': issuesHandler,
                'board': vi.fn(),
                'settings': vi.fn(),
            });
        });

        it('updates centralized state', () => {
            navigateTo('issues');
            expect(setCurrentView).toHaveBeenCalledWith('issues');
        });

        it('pushes history state by default', () => {
            navigateTo('issues');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'issues' },
                '',
                '/issues'
            );
        });

        it('skips history push when pushHistory=false', () => {
            navigateTo('issues', false);
            expect(pushStateSpy).not.toHaveBeenCalled();
        });

        it('uses / for my-issues URL', () => {
            navigateTo('my-issues');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'my-issues' },
                '',
                '/'
            );
        });

        it('preserves query params for issues view', () => {
            window.location.search = '?status=todo&priority=high';
            navigateTo('issues');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'issues' },
                '',
                '/issues?status=todo&priority=high'
            );
        });

        it('includes project param for project-filtered views', () => {
            getProjectFromUrl.mockReturnValue('proj-123');
            navigateTo('board');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'board' },
                '',
                '/board?project=proj-123'
            );
        });

        it('includes project param for sprints view', () => {
            getProjectFromUrl.mockReturnValue('proj-456');
            registerViews({ 'sprints': vi.fn() });
            navigateTo('sprints');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'sprints' },
                '',
                '/sprints?project=proj-456'
            );
        });

        it('does not include project param for non-filtered views', () => {
            getProjectFromUrl.mockReturnValue('proj-123');
            navigateTo('settings');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'settings' },
                '',
                '/settings'
            );
        });

        it('highlights the active nav item', () => {
            navigateTo('issues', false);
            const issuesNav = document.querySelector('[data-view="issues"]');
            const myIssuesNav = document.querySelector('[data-view="my-issues"]');
            expect(issuesNav.classList.contains('active')).toBe(true);
            expect(myIssuesNav.classList.contains('active')).toBe(false);
        });

        it('hides all views then shows the selected one', () => {
            navigateTo('issues', false);
            expect(document.getElementById('my-issues-view').classList.contains('hidden')).toBe(true);
            expect(document.getElementById('board-view').classList.contains('hidden')).toBe(true);
            expect(document.getElementById('issues-view').classList.contains('hidden')).toBe(false);
        });

        it('calls the registered view handler', () => {
            navigateTo('issues', false);
            expect(issuesHandler).toHaveBeenCalled();
            expect(myIssuesHandler).not.toHaveBeenCalled();
        });

        it('calls beforeNavigate cleanup', () => {
            const cleanup = vi.fn();
            configureRouter({ beforeNavigate: cleanup });
            navigateTo('issues', false);
            expect(cleanup).toHaveBeenCalled();
        });

        it('does not crash if view element does not exist', () => {
            expect(() => navigateTo('nonexistent', false)).not.toThrow();
        });

        it('does not crash if no handler registered for view', () => {
            expect(() => navigateTo('unknown-view', false)).not.toThrow();
        });
    });

    describe('handleRoute', () => {
        beforeEach(() => {
            registerViews({
                'my-issues': vi.fn(),
                'issues': vi.fn(),
                'board': vi.fn(),
                'settings': vi.fn(),
            });
        });

        it('routes / to my-issues', () => {
            window.location.pathname = '/';
            handleRoute();
            expect(setCurrentView).toHaveBeenCalledWith('my-issues');
        });

        it('routes /issues to issues view', () => {
            window.location.pathname = '/issues';
            handleRoute();
            expect(setCurrentView).toHaveBeenCalledWith('issues');
        });

        it('routes /board to board view', () => {
            window.location.pathname = '/board';
            handleRoute();
            expect(setCurrentView).toHaveBeenCalledWith('board');
        });

        it('routes unknown paths to my-issues', () => {
            window.location.pathname = '/nonexistent';
            handleRoute();
            expect(setCurrentView).toHaveBeenCalledWith('my-issues');
        });

        it('calls restoreProject callback', () => {
            const restorer = vi.fn();
            configureRouter({ restoreProject: restorer });
            window.location.pathname = '/';
            handleRoute();
            expect(restorer).toHaveBeenCalled();
        });

        it('delegates to detailRoute for /issue/:id', () => {
            const detailRoute = vi.fn((parts) => {
                if (parts[0] === 'issue' && parts[1]) return true;
                return false;
            });
            configureRouter({ detailRoute });
            window.location.pathname = '/issue/CHT-123';
            handleRoute();
            expect(detailRoute).toHaveBeenCalledWith(['issue', 'CHT-123']);
            // Should NOT have navigated to a standard view
            expect(setCurrentView).not.toHaveBeenCalled();
        });

        it('delegates to detailRoute for /document/:id', () => {
            const detailRoute = vi.fn((parts) => {
                if (parts[0] === 'document' && parts[1]) return true;
                return false;
            });
            configureRouter({ detailRoute });
            window.location.pathname = '/document/abc-123';
            handleRoute();
            expect(detailRoute).toHaveBeenCalledWith(['document', 'abc-123']);
            expect(setCurrentView).not.toHaveBeenCalled();
        });

        it('delegates to detailRoute for /projects/:id/settings', () => {
            const detailRoute = vi.fn((parts) => {
                if (parts[0] === 'projects' && parts[1] && parts[2] === 'settings') return true;
                return false;
            });
            configureRouter({ detailRoute });
            window.location.pathname = '/projects/proj-1/settings';
            handleRoute();
            expect(detailRoute).toHaveBeenCalledWith(['projects', 'proj-1', 'settings']);
            expect(setCurrentView).not.toHaveBeenCalled();
        });

        it('falls through to standard routing when detailRoute returns false', () => {
            const detailRoute = vi.fn(() => false);
            configureRouter({ detailRoute });
            window.location.pathname = '/board';
            handleRoute();
            expect(detailRoute).toHaveBeenCalled();
            expect(setCurrentView).toHaveBeenCalledWith('board');
        });

        it('sets history state on initial page load', () => {
            Object.defineProperty(history, 'state', { value: null, writable: true, configurable: true });
            window.location.pathname = '/issues';
            window.location.href = 'http://localhost/issues';
            handleRoute();
            expect(replaceStateSpy).toHaveBeenCalledWith(
                { view: 'issues' },
                '',
                'http://localhost/issues'
            );
        });
    });

    describe('navigateToIssueByIdentifier', () => {
        it('pushes history state with identifier', () => {
            navigateToIssueByIdentifier('CHT-42');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'issue', identifier: 'CHT-42' },
                '',
                '/issue/CHT-42'
            );
        });

        it('calls the issueNavigate callback', () => {
            const issueNavigate = vi.fn();
            configureRouter({ issueNavigate });
            navigateToIssueByIdentifier('WEB-7');
            expect(issueNavigate).toHaveBeenCalledWith('WEB-7');
        });
    });

    describe('navigateToEpicByIdentifier', () => {
        it('pushes history state with identifier', () => {
            navigateToEpicByIdentifier('CHT-42');
            expect(pushStateSpy).toHaveBeenCalledWith(
                { view: 'epic', identifier: 'CHT-42' },
                '',
                '/epic/CHT-42'
            );
        });

        it('calls the epicNavigate callback', () => {
            const epicNavigate = vi.fn();
            configureRouter({ epicNavigate });
            navigateToEpicByIdentifier('WEB-7');
            expect(epicNavigate).toHaveBeenCalledWith('WEB-7');
        });
    });

    describe('initRouter', () => {
        it('listens for popstate events', () => {
            const addEventSpy = vi.spyOn(window, 'addEventListener');
            initRouter();
            expect(addEventSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
            addEventSpy.mockRestore();
        });

        it('navigates to view on popstate with view state', () => {
            registerViews({ 'board': vi.fn() });
            initRouter();
            const event = new PopStateEvent('popstate', { state: { view: 'board' } });
            window.dispatchEvent(event);
            expect(setCurrentView).toHaveBeenCalledWith('board');
        });

        it('delegates to detailPopstate handler first', () => {
            const detailPopstate = vi.fn((state) => {
                if (state.issueId) return true;
                return false;
            });
            configureRouter({ detailPopstate });
            initRouter();
            const event = new PopStateEvent('popstate', {
                state: { issueId: 'abc-123', view: 'issue' },
            });
            window.dispatchEvent(event);
            expect(detailPopstate).toHaveBeenCalledWith({ issueId: 'abc-123', view: 'issue' });
            // Should NOT have called standard navigateTo
            expect(setCurrentView).not.toHaveBeenCalled();
        });

        it('falls back to handleRoute on popstate with no state', () => {
            registerViews({ 'my-issues': vi.fn() });
            window.location.pathname = '/';
            initRouter();
            const event = new PopStateEvent('popstate', { state: null });
            window.dispatchEvent(event);
            // handleRoute should navigate to my-issues for /
            expect(setCurrentView).toHaveBeenCalledWith('my-issues');
        });
    });

    describe('configureRouter', () => {
        it('sets beforeNavigate callback', () => {
            const cleanup = vi.fn();
            configureRouter({ beforeNavigate: cleanup });
            registerViews({ 'issues': vi.fn() });
            navigateTo('issues', false);
            expect(cleanup).toHaveBeenCalledTimes(1);
        });

        it('sets restoreProject callback', () => {
            const restorer = vi.fn();
            configureRouter({ restoreProject: restorer });
            registerViews({ 'my-issues': vi.fn() });
            window.location.pathname = '/';
            handleRoute();
            expect(restorer).toHaveBeenCalledTimes(1);
        });

        it('sets issueNavigate callback', () => {
            const nav = vi.fn();
            configureRouter({ issueNavigate: nav });
            navigateToIssueByIdentifier('TEST-1');
            expect(nav).toHaveBeenCalledWith('TEST-1');
        });

        it('preserves previously set callbacks when updating partially', () => {
            const cleanup = vi.fn();
            const restorer = vi.fn();
            configureRouter({ beforeNavigate: cleanup });
            configureRouter({ restoreProject: restorer });
            registerViews({ 'my-issues': vi.fn() });
            // Both should be set
            navigateTo('my-issues', false);
            expect(cleanup).toHaveBeenCalled();
            window.location.pathname = '/';
            handleRoute();
            expect(restorer).toHaveBeenCalled();
        });
    });

    describe('resetRouter', () => {
        it('clears all registered views', () => {
            registerViews({ 'board': vi.fn(), 'settings': vi.fn() });
            expect(getValidViews()).toContain('board');
            resetRouter();
            expect(getValidViews()).toEqual([]);
        });

        it('clears all callbacks', () => {
            const cleanup = vi.fn();
            configureRouter({ beforeNavigate: cleanup });
            resetRouter();
            registerViews({ 'issues': vi.fn() });
            navigateTo('issues', false);
            expect(cleanup).not.toHaveBeenCalled();
        });

        it('allows initRouter to be called again', () => {
            const addEventSpy = vi.spyOn(window, 'addEventListener');
            initRouter();
            const firstCallCount = addEventSpy.mock.calls.filter(c => c[0] === 'popstate').length;
            // Without reset, second call is a no-op
            initRouter();
            const secondCallCount = addEventSpy.mock.calls.filter(c => c[0] === 'popstate').length;
            expect(secondCallCount).toBe(firstCallCount); // guard prevented double-add
            // After reset, can init again
            resetRouter();
            initRouter();
            const thirdCallCount = addEventSpy.mock.calls.filter(c => c[0] === 'popstate').length;
            expect(thirdCallCount).toBe(firstCallCount + 1);
            addEventSpy.mockRestore();
        });
    });

    describe('initRouter guard', () => {
        it('only adds popstate listener once', () => {
            const addEventSpy = vi.spyOn(window, 'addEventListener');
            initRouter();
            initRouter();
            initRouter();
            const popstateCalls = addEventSpy.mock.calls.filter(c => c[0] === 'popstate');
            expect(popstateCalls.length).toBe(1);
            addEventSpy.mockRestore();
        });
    });
});
