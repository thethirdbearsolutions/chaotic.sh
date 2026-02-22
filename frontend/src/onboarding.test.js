/**
 * Tests for onboarding.js module
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        createTeam: vi.fn(),
        createProject: vi.fn(),
        createIssue: vi.fn(),
    },
}));

const mockInitApp = vi.fn().mockResolvedValue(undefined);
vi.mock('./init.js', () => ({
    initApp: (...args) => mockInitApp(...args),
}));

vi.mock('./event-delegation.js', () => {
    globalThis.__onboardingActions = globalThis.__onboardingActions || {};
    return {
        registerActions: (actions) => {
            Object.assign(globalThis.__onboardingActions, actions);
        },
    };
});

import { api } from './api.js';
import {
    hasCompletedOnboarding,
    markOnboardingComplete,
    showOnboarding,
    hideOnboarding,
    resetOnboarding,
} from './onboarding.js';

beforeEach(() => {
    vi.clearAllMocks();
    mockInitApp.mockClear();
    localStorage.clear();
    document.body.innerHTML = '<div id="app"></div>';
    // Clean up any existing overlay
    hideOnboarding();
});

describe('hasCompletedOnboarding', () => {
    it('returns false when not set', () => {
        expect(hasCompletedOnboarding()).toBe(false);
    });

    it('returns true when set', () => {
        localStorage.setItem('chaotic_onboarding_complete', 'true');
        expect(hasCompletedOnboarding()).toBe(true);
    });

    it('returns false for non-true values', () => {
        localStorage.setItem('chaotic_onboarding_complete', 'false');
        expect(hasCompletedOnboarding()).toBe(false);
    });
});

describe('markOnboardingComplete', () => {
    it('sets localStorage flag', () => {
        markOnboardingComplete();
        expect(localStorage.getItem('chaotic_onboarding_complete')).toBe('true');
    });
});

describe('showOnboarding', () => {
    it('creates overlay with welcome step', () => {
        showOnboarding();
        const overlay = document.getElementById('onboarding-overlay');
        expect(overlay).toBeTruthy();
        expect(overlay.innerHTML).toContain('Welcome to Chaotic');
    });

    it('shows tour mode when specified', () => {
        showOnboarding(true);
        const overlay = document.getElementById('onboarding-overlay');
        expect(overlay.innerHTML).toContain('Welcome Back');
    });
});

describe('hideOnboarding', () => {
    it('removes the overlay', () => {
        showOnboarding();
        expect(document.getElementById('onboarding-overlay')).toBeTruthy();
        hideOnboarding();
        expect(document.getElementById('onboarding-overlay')).toBeNull();
    });

    it('does nothing when no overlay exists', () => {
        hideOnboarding(); // should not throw
    });
});

describe('resetOnboarding', () => {
    it('clears localStorage and shows tour', () => {
        localStorage.setItem('chaotic_onboarding_complete', 'true');
        resetOnboarding();
        expect(localStorage.getItem('chaotic_onboarding_complete')).toBeNull();
        const overlay = document.getElementById('onboarding-overlay');
        expect(overlay).toBeTruthy();
        // Tour mode starts with "Welcome Back"
        expect(overlay.innerHTML).toContain('Welcome Back');
    });
});

describe('onboarding navigation', () => {
    it('onboarding-next advances to next step', () => {
        showOnboarding();
        const overlay = document.getElementById('onboarding-overlay');
        expect(overlay.innerHTML).toContain('Welcome to Chaotic');

        globalThis.__onboardingActions['onboarding-next']({ preventDefault: vi.fn() });
        expect(overlay.innerHTML).toContain('Create Your Team');
    });

    it('onboarding-skip marks complete and hides', () => {
        showOnboarding();
        globalThis.__onboardingActions['onboarding-skip']({ preventDefault: vi.fn() });
        expect(hasCompletedOnboarding()).toBe(true);
        expect(document.getElementById('onboarding-overlay')).toBeNull();
        expect(mockInitApp).toHaveBeenCalled();
    });

    it('onboarding-finish marks complete and hides', () => {
        showOnboarding();
        globalThis.__onboardingActions['onboarding-finish']({ preventDefault: vi.fn() });
        expect(hasCompletedOnboarding()).toBe(true);
        expect(document.getElementById('onboarding-overlay')).toBeNull();
        expect(mockInitApp).toHaveBeenCalled();
    });
});

describe('onboarding team creation', () => {
    it('creates team and advances to project step', async () => {
        api.createTeam.mockResolvedValue({ id: 't1', name: 'Engineering', key: 'ENG' });

        showOnboarding();
        globalThis.__onboardingActions['onboarding-next']({ preventDefault: vi.fn() }); // Go to team step

        document.getElementById('onboarding-team-name').value = 'Engineering';
        document.getElementById('onboarding-team-key').value = 'ENG';

        await globalThis.__onboardingActions['onboarding-create-team']({ preventDefault: vi.fn() });

        expect(api.createTeam).toHaveBeenCalledWith({ name: 'Engineering', key: 'ENG' });
        const overlay = document.getElementById('onboarding-overlay');
        expect(overlay.innerHTML).toContain('Create Your First Project');
    });

    it('shows error on team creation failure', async () => {
        api.createTeam.mockRejectedValue(new Error('Team key already taken'));

        showOnboarding();
        globalThis.__onboardingActions['onboarding-next']({ preventDefault: vi.fn() });

        document.getElementById('onboarding-team-name').value = 'Eng';
        document.getElementById('onboarding-team-key').value = 'ENG';

        await globalThis.__onboardingActions['onboarding-create-team']({ preventDefault: vi.fn() });

        const error = document.getElementById('onboarding-team-error');
        expect(error.textContent).toBe('Team key already taken');
        expect(error.classList.contains('hidden')).toBe(false);
    });
});

describe('onboarding project creation', () => {
    it('creates project and advances to issue step', async () => {
        api.createTeam.mockResolvedValue({ id: 't1', name: 'Eng', key: 'ENG' });
        api.createProject.mockResolvedValue({ id: 'p1', name: 'Backend', key: 'BE' });

        showOnboarding();
        globalThis.__onboardingActions['onboarding-next']({ preventDefault: vi.fn() }); // team step

        document.getElementById('onboarding-team-name').value = 'Eng';
        document.getElementById('onboarding-team-key').value = 'ENG';
        await globalThis.__onboardingActions['onboarding-create-team']({ preventDefault: vi.fn() });

        document.getElementById('onboarding-project-name').value = 'Backend';
        document.getElementById('onboarding-project-key').value = 'BE';
        await globalThis.__onboardingActions['onboarding-create-project']({ preventDefault: vi.fn() });

        expect(api.createProject).toHaveBeenCalledWith('t1', { name: 'Backend', key: 'BE' });
        expect(document.getElementById('onboarding-overlay').innerHTML).toContain('Create Your First Issue');
    });
});

describe('onboarding issue creation', () => {
    it('creates issue and shows completion step', async () => {
        api.createTeam.mockResolvedValue({ id: 't1', name: 'Eng', key: 'ENG' });
        api.createProject.mockResolvedValue({ id: 'p1', name: 'Backend', key: 'BE' });
        api.createIssue.mockResolvedValue({ id: 'i1', identifier: 'ENG-1', title: 'Setup CI' });

        showOnboarding();
        globalThis.__onboardingActions['onboarding-next']({ preventDefault: vi.fn() });

        document.getElementById('onboarding-team-name').value = 'Eng';
        document.getElementById('onboarding-team-key').value = 'ENG';
        await globalThis.__onboardingActions['onboarding-create-team']({ preventDefault: vi.fn() });

        document.getElementById('onboarding-project-name').value = 'Backend';
        document.getElementById('onboarding-project-key').value = 'BE';
        await globalThis.__onboardingActions['onboarding-create-project']({ preventDefault: vi.fn() });

        document.getElementById('onboarding-issue-title').value = 'Setup CI';
        await globalThis.__onboardingActions['onboarding-create-issue']({ preventDefault: vi.fn() });

        expect(api.createIssue).toHaveBeenCalledWith('p1', { title: 'Setup CI' });
        const overlay = document.getElementById('onboarding-overlay');
        expect(overlay.innerHTML).toContain("You're all set");
        expect(overlay.innerHTML).toContain('Eng (ENG)');
        expect(overlay.innerHTML).toContain('Backend (BE)');
        expect(overlay.innerHTML).toContain('ENG-1 - Setup CI');
    });
});
