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
//
// DRAFT POLICY across the two description-editing surfaces (single source
// of truth for the behavior parity — both call sites point here):
//
// - The inline editor (issue-detail-view.js editDescription) and the
//   'Edit all fields' modal (issue-edit.js showEditIssueModal) share this
//   one storage slot per issue by design: an edit abandoned in one surface
//   is recoverable from the other.
// - Inline editor: always loads the draft into the textarea; if basedOn is
//   unknown (legacy) or differs from the live server description, an inline
//   warning is shown. Loading is safe there because the user explicitly
//   entered description-editing mode and is looking at the text.
// - Modal: only prefills the draft when basedOn matches the live server
//   description exactly, with a visible "restored draft" notice (never
//   silently). On mismatch/legacy it does NOT prefill — the field keeps the
//   server description and a warning points at the inline editor — because
//   the modal's failure mode is worse: a user editing an unrelated field
//   (title, status) would silently commit a stale forgotten draft on save.
// - Both surfaces clear the draft on successful save; the inline editor's
//   confirmed Cancel deletes it too.

/** Parse the new-format `{draft, basedOn}` payload, or null if not one. */
function parseDraftPayload(raw) {
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && typeof parsed.draft === 'string') {
            return parsed;
        }
        return null;
    } catch {
        return null;
    }
}

export function getDescriptionDraft(issueId) {
    const raw = get(`description_draft_${issueId}`);
    if (!raw) return null;
    const parsed = parseDraftPayload(raw);
    if (parsed) return parsed.draft;
    // Legacy plain-string draft (pre-CHT-1214). Includes legacy content that
    // happens to be valid JSON of the wrong shape (a pasted object/array,
    // `123`, `true`, a quoted string) — anything that isn't the exact
    // {draft: string} payload IS the draft text, not a payload.
    return raw;
}

/**
 * The description snapshot a draft was captured against, or null if unknown
 * (no draft, or a legacy pre-CHT-1214 plain-string draft).
 */
export function getDescriptionDraftBase(issueId) {
    const raw = get(`description_draft_${issueId}`);
    if (!raw) return null;
    const parsed = parseDraftPayload(raw);
    return parsed && typeof parsed.basedOn === 'string' ? parsed.basedOn : null;
}

export function setDescriptionDraft(issueId, content, basedOn = '') {
    if (content) {
        set(`description_draft_${issueId}`, JSON.stringify({ draft: content, basedOn }));
    } else {
        remove(`description_draft_${issueId}`);
    }
}

// --- Document drafts (CHT-1213) ---
//
// Covers the create-document modal and the edit-document modal — CHT-1041
// only wired draft persistence for issue creation/description/comments and
// explicitly left documents out. Comment drafts on a document reuse
// getCommentDraft/setCommentDraft above unchanged (already keyed by id, and
// a document id can't collide with an issue id).
//
// The create-modal draft is a single slot ('new') since only one
// create-document modal can be open at a time (mirrors
// create_issue_title/create_issue_description above). The edit-modal draft
// is keyed per document id.
//
// Stored as `{draft: {title, content, icon}, basedOn}` following the
// DRAFT POLICY block above (PR #210 review finding 1): the edit modal is
// exactly the surface the policy calls dangerous — a user opening it to
// tweak an unrelated field (project, sprint) would otherwise silently
// commit a forgotten stale draft with zero signal. So the edit modal only
// prefills when basedOn matches the live server fields, and never silently;
// on mismatch it warns and keeps the server content, leaving the stored
// draft untouched. The CREATE modal has no server content to clobber, so it
// prefills freely (basedOn stays null there). Document comment drafts stay
// basedOn-less on purpose — parity with issue comment drafts, where the
// textarea is always visibly on-page and starts empty, so there's no server
// content a restore could overwrite.

/** Parse the `{draft, basedOn}` payload, or null if not one. */
function parseDocumentDraftPayload(raw) {
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.draft && typeof parsed.draft === 'object') {
            return parsed;
        }
        return null;
    } catch {
        return null;
    }
}

export function getDocumentDraft(key) {
    const raw = get(`document_draft_${key}`);
    if (!raw) return null;
    return parseDocumentDraftPayload(raw)?.draft ?? null;
}

/**
 * The `{title, content, icon}` server snapshot an edit-modal draft was
 * captured against, or null if unknown (no draft, or a create-modal draft,
 * which has no server content).
 */
export function getDocumentDraftBase(key) {
    const raw = get(`document_draft_${key}`);
    if (!raw) return null;
    const parsed = parseDocumentDraftPayload(raw);
    return (parsed && parsed.basedOn && typeof parsed.basedOn === 'object') ? parsed.basedOn : null;
}

export function setDocumentDraft(key, draft, basedOn = null) {
    if (draft && (draft.title || draft.content || draft.icon)) {
        set(`document_draft_${key}`, JSON.stringify({ draft, basedOn }));
    } else {
        remove(`document_draft_${key}`);
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
