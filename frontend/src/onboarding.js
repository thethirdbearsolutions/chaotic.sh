/**
 * Onboarding overlay for new users
 * Shows a multi-step wizard when user has no teams after login.
 */

/* global api */

let onboardingOverlay = null;
let currentStep = 0;
let createdTeam = null;
let createdProject = null;
let createdIssue = null;
let tourMode = false;

export function hasCompletedOnboarding() {
    try {
        return localStorage.getItem('chaotic_onboarding_complete') === 'true';
    } catch {
        return false;
    }
}

export function markOnboardingComplete() {
    try {
        localStorage.setItem('chaotic_onboarding_complete', 'true');
    } catch {
        // Private browsing or quota exceeded — onboarding may re-show next time
    }
}

function suggestKey(name) {
    const words = name.trim().toUpperCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '';
    if (words.length === 1) return words[0].substring(0, 4);
    return words.slice(0, 4).map(w => w[0]).join('');
}

function createOverlay() {
    if (onboardingOverlay) return;

    onboardingOverlay = document.createElement('div');
    onboardingOverlay.id = 'onboarding-overlay';
    onboardingOverlay.className = 'onboarding-overlay';
    document.getElementById('app').appendChild(onboardingOverlay);
}

function renderStep() {
    if (!onboardingOverlay) return;

    const steps = tourMode ? getTourSteps() : getSetupSteps();
    const step = steps[currentStep];

    const progressDots = steps.map((_, i) =>
        `<span class="onboarding-dot${i === currentStep ? ' active' : ''}${i < currentStep ? ' completed' : ''}"></span>`
    ).join('');

    onboardingOverlay.innerHTML = `
        <div class="onboarding-container">
            <div class="onboarding-progress">${progressDots}</div>
            <div class="onboarding-step">
                ${step.html}
            </div>
        </div>
    `;

    if (step.onMount) step.onMount();
}

function getSetupSteps() {
    return [
        // Step 1: Welcome
        {
            html: `
                <h2>Welcome to Chaotic!</h2>
                <p class="onboarding-subtitle">A lightweight issue tracker built for teams that ship from the command line.</p>
                <p class="onboarding-description">Let's set up your workspace. This takes about 30 seconds.</p>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Get Started</button>
                </div>
                <div class="onboarding-skip">
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `
        },
        // Step 2: Create Team
        {
            html: `
                <h2>Create Your Team</h2>
                <p class="onboarding-subtitle">Teams organize your people and projects.</p>
                <form id="onboarding-team-form" onsubmit="window._onboardingCreateTeam(event); return false;">
                    <div class="form-group">
                        <label for="onboarding-team-name">Team Name</label>
                        <input type="text" id="onboarding-team-name" class="form-input" placeholder="e.g. Engineering" required>
                    </div>
                    <div class="form-group">
                        <label for="onboarding-team-key">Team Key <span class="form-hint">(2-10 chars, used in issue IDs)</span></label>
                        <input type="text" id="onboarding-team-key" class="form-input" pattern="[A-Za-z0-9]{2,10}" style="text-transform: uppercase" placeholder="e.g. ENG" required>
                    </div>
                    <div id="onboarding-team-error" class="onboarding-error hidden"></div>
                    <div class="onboarding-actions">
                        <button type="submit" class="btn btn-primary" id="onboarding-team-submit">Create Team</button>
                    </div>
                </form>
                <div class="onboarding-skip">
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,
            onMount() {
                const nameInput = document.getElementById('onboarding-team-name');
                const keyInput = document.getElementById('onboarding-team-key');
                nameInput.addEventListener('input', () => {
                    if (!keyInput.dataset.manual) {
                        keyInput.value = suggestKey(nameInput.value);
                    }
                });
                keyInput.addEventListener('input', () => {
                    keyInput.dataset.manual = 'true';
                });
                nameInput.focus();
            }
        },
        // Step 3: Create Project
        {
            html: `
                <h2>Create Your First Project</h2>
                <p class="onboarding-subtitle">Projects group related issues. One per repo or component.</p>
                <form id="onboarding-project-form" onsubmit="window._onboardingCreateProject(event); return false;">
                    <div class="form-group">
                        <label for="onboarding-project-name">Project Name</label>
                        <input type="text" id="onboarding-project-name" class="form-input" placeholder="e.g. Backend API" required>
                    </div>
                    <div class="form-group">
                        <label for="onboarding-project-key">Project Key <span class="form-hint">(2-10 chars)</span></label>
                        <input type="text" id="onboarding-project-key" class="form-input" pattern="[A-Za-z0-9]{2,10}" style="text-transform: uppercase" placeholder="e.g. API" required>
                    </div>
                    <div id="onboarding-project-error" class="onboarding-error hidden"></div>
                    <div class="onboarding-actions">
                        <button type="submit" class="btn btn-primary" id="onboarding-project-submit">Create Project</button>
                    </div>
                </form>
                <div class="onboarding-skip">
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,
            onMount() {
                const nameInput = document.getElementById('onboarding-project-name');
                const keyInput = document.getElementById('onboarding-project-key');
                nameInput.addEventListener('input', () => {
                    if (!keyInput.dataset.manual) {
                        keyInput.value = suggestKey(nameInput.value);
                    }
                });
                keyInput.addEventListener('input', () => {
                    keyInput.dataset.manual = 'true';
                });
                nameInput.focus();
            }
        },
        // Step 4: Create First Issue
        {
            html: `
                <h2>Create Your First Issue</h2>
                <p class="onboarding-subtitle">What's the first thing your team needs to work on?</p>
                <form id="onboarding-issue-form" onsubmit="window._onboardingCreateIssue(event); return false;">
                    <div class="form-group">
                        <label for="onboarding-issue-title">Issue Title</label>
                        <input type="text" id="onboarding-issue-title" class="form-input" placeholder="e.g. Set up CI pipeline" required>
                    </div>
                    <div id="onboarding-issue-error" class="onboarding-error hidden"></div>
                    <div class="onboarding-actions">
                        <button type="submit" class="btn btn-primary" id="onboarding-issue-submit">Create Issue</button>
                    </div>
                </form>
                <div class="onboarding-skip">
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,
            onMount() {
                document.getElementById('onboarding-issue-title').focus();
            }
        },
        // Step 5: Done
        {
            html: `
                <h2>You're all set!</h2>
                <div class="onboarding-summary">
                    <div class="onboarding-summary-item">
                        <span class="onboarding-check">&#10003;</span>
                        <span>Team: <strong id="onboarding-done-team"></strong></span>
                    </div>
                    <div class="onboarding-summary-item">
                        <span class="onboarding-check">&#10003;</span>
                        <span>Project: <strong id="onboarding-done-project"></strong></span>
                    </div>
                    <div class="onboarding-summary-item">
                        <span class="onboarding-check">&#10003;</span>
                        <span>Issue: <strong id="onboarding-done-issue"></strong></span>
                    </div>
                </div>
                <div class="onboarding-tips">
                    <h3>Quick reference</h3>
                    <div class="onboarding-tip"><kbd>C</kbd> Create a new issue</div>
                    <div class="onboarding-tip"><kbd>/</kbd> Search issues</div>
                    <div class="onboarding-tip"><kbd>Cmd+K</kbd> Command palette</div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingFinish()">Go to Dashboard</button>
                </div>
            `,
            onMount() {
                const teamEl = document.getElementById('onboarding-done-team');
                const projectEl = document.getElementById('onboarding-done-project');
                const issueEl = document.getElementById('onboarding-done-issue');
                if (teamEl && createdTeam) teamEl.textContent = `${createdTeam.name} (${createdTeam.key})`;
                if (projectEl && createdProject) projectEl.textContent = `${createdProject.name} (${createdProject.key})`;
                if (issueEl && createdIssue) issueEl.textContent = `${createdIssue.identifier} - ${createdIssue.title}`;
            }
        }
    ];
}

function getTourSteps() {
    const closeLink = '<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';
    return [
        {
            html: `
                <h2>Welcome Back!</h2>
                <p class="onboarding-subtitle">Here's a quick tour of Chaotic.</p>
                <div class="onboarding-tips">
                    <h3>Your Dashboard</h3>
                    <p class="onboarding-description">The dashboard shows your assigned issues and recent activity across all projects.</p>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Next</button>
                </div>
                ${closeLink}
            `
        },
        {
            html: `
                <h2>Keyboard Shortcuts</h2>
                <p class="onboarding-subtitle">Work faster with shortcuts.</p>
                <div class="onboarding-tips">
                    <div class="onboarding-tip"><kbd>C</kbd> Create a new issue</div>
                    <div class="onboarding-tip"><kbd>/</kbd> Search issues</div>
                    <div class="onboarding-tip"><kbd>Cmd+K</kbd> Command palette</div>
                    <div class="onboarding-tip"><kbd>B</kbd> Switch to board view</div>
                    <div class="onboarding-tip"><kbd>D</kbd> Go to dashboard</div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Next</button>
                </div>
                ${closeLink}
            `
        },
        {
            html: `
                <h2>CLI Integration</h2>
                <p class="onboarding-subtitle">Manage issues from your terminal.</p>
                <div class="onboarding-tips">
                    <div class="onboarding-tip"><code>chaotic issue list</code> List issues</div>
                    <div class="onboarding-tip"><code>chaotic issue create "Title"</code> Create an issue</div>
                    <div class="onboarding-tip"><code>chaotic issue update ID --status done</code> Close an issue</div>
                    <div class="onboarding-tip"><code>chaotic status</code> Show current context</div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingFinish()">Got it!</button>
                </div>
                ${closeLink}
            `
        }
    ];
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.classList.remove('hidden');
    }
}

function clearError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = '';
        el.classList.add('hidden');
    }
}

function setButtonLoading(buttonId, loading) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.disabled = loading;
    if (loading) {
        btn.dataset.originalText = btn.textContent;
        btn.textContent = 'Creating...';
    } else if (btn.dataset.originalText) {
        btn.textContent = btn.dataset.originalText;
    }
}

// Handlers exposed on window for inline onclick
window._onboardingNext = function() {
    const steps = tourMode ? getTourSteps() : getSetupSteps();
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
};

window._onboardingSkip = function() {
    markOnboardingComplete();
    hideOnboarding();
    // Reload the app
    if (window.initApp) window.initApp();
};

window._onboardingFinish = function() {
    markOnboardingComplete();
    hideOnboarding();
    // Reload the app to pick up created team/project
    if (window.initApp) window.initApp();
};

window._onboardingCreateTeam = async function(event) {
    event.preventDefault();
    clearError('onboarding-team-error');
    setButtonLoading('onboarding-team-submit', true);

    const name = document.getElementById('onboarding-team-name').value.trim();
    const key = document.getElementById('onboarding-team-key').value.toUpperCase().trim();

    try {
        createdTeam = await api.createTeam({ name, key });
        currentStep++;
        renderStep();
    } catch (e) {
        showError('onboarding-team-error', e.message || 'Failed to create team');
        setButtonLoading('onboarding-team-submit', false);
    }
};

window._onboardingCreateProject = async function(event) {
    event.preventDefault();
    clearError('onboarding-project-error');
    setButtonLoading('onboarding-project-submit', true);

    const name = document.getElementById('onboarding-project-name').value.trim();
    const key = document.getElementById('onboarding-project-key').value.toUpperCase().trim();

    try {
        createdProject = await api.createProject(createdTeam.id, { name, key });
        currentStep++;
        renderStep();
    } catch (e) {
        showError('onboarding-project-error', e.message || 'Failed to create project');
        setButtonLoading('onboarding-project-submit', false);
    }
};

window._onboardingCreateIssue = async function(event) {
    event.preventDefault();
    clearError('onboarding-issue-error');
    setButtonLoading('onboarding-issue-submit', true);

    const title = document.getElementById('onboarding-issue-title').value.trim();

    try {
        createdIssue = await api.createIssue(createdProject.id, { title });
        currentStep++;
        renderStep();
    } catch (e) {
        showError('onboarding-issue-error', e.message || 'Failed to create issue');
        setButtonLoading('onboarding-issue-submit', false);
    }
};

export function showOnboarding(isTourMode = false) {
    tourMode = isTourMode;
    currentStep = 0;
    createdTeam = null;
    createdProject = null;
    createdIssue = null;
    createOverlay();
    renderStep();
}

export function hideOnboarding() {
    if (onboardingOverlay) {
        onboardingOverlay.remove();
        onboardingOverlay = null;
    }
}

export function resetOnboarding() {
    try { localStorage.removeItem('chaotic_onboarding_complete'); } catch { /* ignore */ }
    showOnboarding(true);
}

// Expose for window access
window.showOnboarding = showOnboarding;
window.hideOnboarding = hideOnboarding;
window.resetOnboarding = resetOnboarding;
window.hasCompletedOnboarding = hasCompletedOnboarding;
