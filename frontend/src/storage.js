/**
 * Centralized localStorage access with namespaced keys (CHT-1054).
 *
 * All localStorage keys are prefixed with "chaotic_" and accessed
 * through typed helpers so the key strings live in one place.
 */

const PREFIX = 'chaotic_';

function get(key) {
    try {
        return localStorage.getItem(PREFIX + key);
    } catch {
        return null;
    }
}

function set(key, value) {
    try {
        localStorage.setItem(PREFIX + key, value);
    } catch {
        // Quota exceeded or private browsing — silently ignore
    }
}

function remove(key) {
    try {
        localStorage.removeItem(PREFIX + key);
    } catch {
        // Ignore
    }
}

// --- Auth ---

export function getToken() {
    return get('token');
}

export function setToken(token) {
    if (token) {
        set('token', token);
    } else {
        remove('token');
    }
}

// --- Theme ---

export function getTheme() {
    return get('theme');
}

export function setTheme(theme) {
    set('theme', theme);
}

// --- Project ---

export function getSavedProject() {
    return get('last_project');
}

export function setSavedProject(projectId) {
    set('last_project', projectId);
}

// --- Onboarding ---

export function isOnboardingComplete() {
    return get('onboarding_complete') === 'true';
}

export function setOnboardingComplete() {
    set('onboarding_complete', 'true');
}

export function clearOnboarding() {
    remove('onboarding_complete');
}

// --- Issue filters (team-scoped) ---

export function getIssueFilters(teamId) {
    if (!teamId) return null;
    return get(`issues_filters_${teamId}`);
}

export function setIssueFilters(teamId, queryString) {
    if (!teamId) return;
    if (queryString) {
        set(`issues_filters_${teamId}`, queryString);
    } else {
        remove(`issues_filters_${teamId}`);
    }
}

// --- Comment drafts ---

export function getCommentDraft(issueId) {
    return get(`comment_draft_${issueId}`);
}

export function setCommentDraft(issueId, content) {
    if (content) {
        set(`comment_draft_${issueId}`, content);
    } else {
        remove(`comment_draft_${issueId}`);
    }
}

// --- Description drafts ---
//
// Stored as `{draft, basedOn}` JSON (CHT-1214) so a restored draft can be
// compared against the live server description to detect staleness — a
// draft abandoned days ago (tab closed, crash) would otherwise silently
// overwrite however many edits happened in the meantime with no warning.

export function getDescriptionDraft(issueId) {
    const raw = get(`description_draft_${issueId}`);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.draft === 'string') return parsed.draft;
        return null;
    } catch {
        // Legacy plain-string draft (pre-CHT-1214) — no snapshot to compare
        // against, so treat the whole raw value as the draft text.
        return raw;
    }
}

/**
 * The description snapshot a draft was captured against, or null if unknown
 * (no draft, or a legacy pre-CHT-1214 plain-string draft).
 */
export function getDescriptionDraftBase(issueId) {
    const raw = get(`description_draft_${issueId}`);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        return typeof parsed?.basedOn === 'string' ? parsed.basedOn : null;
    } catch {
        return null;
    }
}

export function setDescriptionDraft(issueId, content, basedOn = '') {
    if (content) {
        set(`description_draft_${issueId}`, JSON.stringify({ draft: content, basedOn }));
    } else {
        remove(`description_draft_${issueId}`);
    }
}

// --- Create issue drafts ---

export function getCreateIssueDraft() {
    return {
        title: get('create_issue_title'),
        description: get('create_issue_description'),
    };
}

export function setCreateIssueDraft(title, description) {
    if (title) set('create_issue_title', title);
    else remove('create_issue_title');
    if (description) set('create_issue_description', description);
    else remove('create_issue_description');
}

export function clearCreateIssueDraft() {
    remove('create_issue_title');
    remove('create_issue_description');
}

// --- Document view mode ---

export function getDocViewMode() {
    return get('doc_view_mode');
}

export function setDocViewMode(mode) {
    set('doc_view_mode', mode);
}

// --- Gate approvals explainer ---

export function isApprovalsExplainerDismissed() {
    return get('approvals_explainer_dismissed') === '1';
}

export function dismissApprovalsExplainer() {
    set('approvals_explainer_dismissed', '1');
}
