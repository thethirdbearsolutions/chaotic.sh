/**
 * Rich comment composer (CHT-2028).
 *
 * Puts the Tiptap editor (editor.bundle.js, loaded on first focus) over a
 * comment textarea. The textarea stays in the page, hidden, and holds the
 * current markdown at all times, so everything that already reads or
 * writes it keeps working: submit, draft persistence, quote-reply. A
 * write from outside (quote-reply sets `.value` and fires `input`) is
 * carried into the editor.
 *
 * "Markdown" on the toolbar swaps back to the plain textarea, with its
 * existing @mention autocomplete. The choice is remembered. Markdown the
 * editor would change the meaning of (raw HTML it can't hold, say) opens
 * in the textarea instead of being rewritten, and says so.
 *
 * If the bundle fails to load, the textarea simply stays.
 */

import { getComposerMode, setComposerMode } from './storage.js';
import { mentionSuggestions } from './mention-autocomplete.js';
import { renderCommentContent } from './rich-text.js';
import { showToast } from './ui.js';

/** The editor bundle's API_VERSION this app bundle was written against. */
const EDITOR_API_VERSION = 1;

const ICONS = {
    bold: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',
    italic: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',
    code: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
    bulletList: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',
    blockquote: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>',
};
const TOOLS = [
    ['bold', 'Bold'], ['italic', 'Italic'], ['code', 'Code'], ['link', 'Link'],
    ['bulletList', 'Bulleted list'], ['blockquote', 'Quote'],
];
export const KEEPS_MARKDOWN = 'This comment uses markdown the editor would change, so it stays as markdown.';

let bundlePromise = null;

/**
 * The editor bundle's URL, with its own content hash as `?v=` (the page
 * stamps it on the chaotic-version meta tag), so it is cached for good
 * and busted exactly when it changes. Without a usable hash the URL has
 * no `?v=` and the server revalidates.
 */
export function editorBundleUrl() {
    const meta = document.querySelector('meta[name="chaotic-version"]');
    const version = meta ? meta.getAttribute('data-editor') : '';
    const usable = Boolean(version) && /^[0-9a-f]{8}$/.test(version);
    return `/static/js/editor.bundle.js${usable ? `?v=${version}` : ''}`;
}

function usableApi(api) {
    return api && api.API_VERSION === EDITOR_API_VERSION ? api : null;
}

/** Load editor.bundle.js once; resolves to its exports, or rejects. */
export function loadEditorBundle() {
    const ready = usableApi(window.ChaoticEditor);
    if (ready) return Promise.resolve(ready);
    if (bundlePromise) return bundlePromise;
    // The Vite dev page has no built bundle to fetch; load the source.
    // (A production build drops this branch.)
    if (import.meta.env.MODE === 'development') {
        bundlePromise = import('./editor/main.js').then(() => usableApi(window.ChaoticEditor));
        return bundlePromise;
    }
    bundlePromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = editorBundleUrl();
        script.async = true;
        script.onload = () => {
            const api = usableApi(window.ChaoticEditor);
            if (api) resolve(api);
            else reject(new Error('editor bundle is a different version'));
        };
        script.onerror = () => {
            script.remove();
            reject(new Error('editor bundle failed to load'));
        };
        document.head.appendChild(script);
    }).then((api) => {
        // From here window.ChaoticEditor answers.
        bundlePromise = null;
        return api;
    }, (e) => {
        // A later focus may try again (a flaky network, a deploy mid-load).
        bundlePromise = null;
        throw e;
    });
    return bundlePromise;
}

// One composer per textarea id; replaced when the view re-renders.
const composers = new Map();

/**
 * @param {string} textareaId
 * @param {Object} opts
 * @param {AbortSignal} opts.signal - the view's lifetime; aborting destroys the editor
 * @param {{projectId?: string|null}} [opts.mentionContext]
 * @param {string} [opts.placeholder]
 * @param {{from: number, to: number}|null} [opts.restore] - focus the editor with this
 *   selection once it is up (a background refresh replaced the previous one)
 */
export function attachRichComposer(textareaId, { signal, mentionContext = {}, placeholder = '', restore = null } = {}) {
    const textarea = document.getElementById(textareaId);
    if (!textarea || textarea.dataset.richComposer === 'true') return null;
    textarea.dataset.richComposer = 'true';
    const form = textarea.closest('form');

    const state = {
        textarea,
        form,
        editor: null,
        api: null,
        wrapper: null,
        toolbar: null,
        note: null,
        mode: 'markdown', // until the editor is up
        syncing: false,
        composing: false,
        pendingApi: null,
        destroyed: false,
        mentionContext,
        placeholder: placeholder || textarea.getAttribute('placeholder') || '',
        start: null,
    };
    composers.set(textareaId, state);

    buildToolbar(state, signal);

    textarea.addEventListener('compositionstart', () => { state.composing = true; }, { signal });
    textarea.addEventListener('compositionend', () => {
        state.composing = false;
        if (state.pendingApi) {
            const api = state.pendingApi;
            state.pendingApi = null;
            mountAndShow(state, api, { focus: document.activeElement === textarea });
        }
    }, { signal });

    // Mount when the bundle is here: at once if an earlier visit loaded
    // it, so there is no flash of the plain box; otherwise on first focus.
    state.start = ({ focus = false, restoreTo = null } = {}) => {
        if (state.editor || state.destroyed || getComposerMode() === 'markdown') return;
        const ready = usableApi(window.ChaoticEditor);
        if (ready) {
            mountAndShow(state, ready, { focus, restore: restoreTo });
            return;
        }
        loadEditorBundle().then((api) => {
            if (state.destroyed || state.editor || !api) return;
            // Never swap the box out from under an IME composition.
            if (state.composing) { state.pendingApi = api; return; }
            mountAndShow(state, api, { focus: focus || document.activeElement === textarea });
        }).catch(() => { /* the textarea stays; nothing is lost */ });
    };
    textarea.addEventListener('focus', () => state.start(), { signal });
    setMode(state, 'markdown', { remember: false });
    if (usableApi(window.ChaoticEditor)) state.start({ restoreTo: restore });

    form?.addEventListener('focusin', () => form.classList.add('composer-active'), { signal });
    form?.addEventListener('focusout', (e) => {
        if (!form.contains(e.relatedTarget) && !textarea.value) form.classList.remove('composer-active');
    }, { signal });
    if (restore) form?.classList.add('composer-active');

    // A write from outside (quote-reply, a restored draft) arrives as an
    // input event on the hidden textarea.
    textarea.addEventListener('input', () => {
        if (state.syncing || state.mode !== 'rich' || !state.editor) return;
        if (!state.api.roundTripsCleanly(state.editor, textarea.value, renderCommentContent)) {
            showMarkdown(state, { focus: true, refused: true });
            return;
        }
        state.editor.commands.setContent(textarea.value, { contentType: 'markdown', emitUpdate: false });
        state.editor.commands.focus('end');
        state.wrapper.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }, { signal });

    signal?.addEventListener('abort', () => destroy(textareaId, state));
    return state;
}

function buildToolbar(state, signal) {
    const { textarea, form } = state;
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar rich-composer-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Formatting');
    toolbar.innerHTML = `${TOOLS.map(([name, label]) =>
        `<button type="button" class="icon-btn" data-tool="${name}" title="${label}" aria-label="${label}" aria-pressed="false" tabindex="-1">${ICONS[name]}</button>`).join('')}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;
    const note = document.createElement('div');
    note.className = 'rich-composer-note';
    note.setAttribute('role', 'status');
    note.hidden = true;

    // Keep focus (and the selection) in the editor when a tool is clicked.
    toolbar.addEventListener('mousedown', (e) => { if (e.target.closest('button')) e.preventDefault(); }, { signal });
    toolbar.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-tool]');
        if (!btn) return;
        if (btn.dataset.tool === 'mode') {
            if (state.mode === 'rich') showMarkdown(state, { focus: true, remember: true });
            else showRich(state, { focus: true });
            return;
        }
        if (!state.editor || state.mode !== 'rich') return;
        if (btn.dataset.tool === 'link') {
            const current = state.editor.getAttributes('link').href || '';
            const href = window.prompt('Link URL (leave empty to remove the link)', current);
            if (href === null) { state.editor.commands.focus(); return; }
            if (!state.api.COMMANDS.link(state.editor, href)) {
                showToast('That link can’t be added. Use an http, https or mailto address.', 'error');
            }
        } else {
            state.api.COMMANDS[btn.dataset.tool](state.editor);
        }
        refreshToolbar(state);
    }, { signal });
    // One tab stop for the row; arrow keys move along it.
    toolbar.addEventListener('keydown', (e) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        const buttons = [...toolbar.querySelectorAll('button')].filter(b => !b.disabled && !b.hidden);
        const i = buttons.indexOf(document.activeElement);
        if (i < 0 || !buttons.length) return;
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1
            : (i + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
        buttons.forEach(b => { b.tabIndex = -1; });
        buttons[next].tabIndex = 0;
        buttons[next].focus();
    }, { signal });

    // In the box's footer, before the send button, when the form has one
    // (CHT-2093); otherwise after the Comment button. Either way the tab
    // order matches what you see.
    const foot = form?.querySelector('.comment-box-foot');
    if (foot) {
        foot.prepend(toolbar);
        form.append(note);
        form.classList.add('has-rich-composer');
    } else if (form) {
        form.append(toolbar, note);
        form.classList.add('has-rich-composer');
    } else {
        textarea.insertAdjacentElement('afterend', toolbar);
        toolbar.insertAdjacentElement('afterend', note);
    }
    state.toolbar = toolbar;
    state.note = note;
}

/** Mount the editor (if it can be) and show it, if the markdown allows. */
function mountAndShow(state, api, { focus = false, restore = null } = {}) {
    if (!mount(state, api)) return;
    showRich(state, { focus: focus || Boolean(restore), remember: false });
    if (restore && state.mode === 'rich') restoreSelection(state, restore);
}

function mount(state, api) {
    const { textarea, form } = state;
    const wrapper = document.createElement('div');
    wrapper.className = 'rich-composer';
    wrapper.hidden = true;
    textarea.insertAdjacentElement('beforebegin', wrapper);
    try {
        state.editor = api.createEditor({
            element: wrapper,
            markdown: '',
            placeholder: state.placeholder,
            getMentionItems: (q) => mentionSuggestions(q, state.mentionContext),
            onUpdate: (md) => {
                state.syncing = true;
                textarea.value = md;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                state.syncing = false;
                refreshToolbar(state);
            },
            onSubmit: () => form?.requestSubmit(),
            onEscape: () => state.editor.commands.blur(),
        });
    } catch {
        wrapper.remove();
        state.editor = null;
        return false;
    }
    state.wrapper = wrapper;
    state.api = api;
    state.editor.on('selectionUpdate', () => refreshToolbar(state));
    return true;
}

/**
 * Show the formatted editor, mounting it first if it isn't yet. Only when
 * the current markdown survives the editor; otherwise the textarea stays
 * and the note says why.
 */
function showRich(state, { focus = false, remember = true } = {}) {
    if (remember) setComposerMode('rich');
    if (!state.editor) {
        // Markdown was the saved choice, or the bundle is still coming.
        state.start({ focus });
        return;
    }
    if (!state.api.roundTripsCleanly(state.editor, state.textarea.value, renderCommentContent)) {
        showMarkdown(state, { focus, refused: true });
        return;
    }
    state.editor.commands.setContent(state.textarea.value || '', { contentType: 'markdown', emitUpdate: false });
    setMode(state, 'rich', { focus });
}

function showMarkdown(state, { focus = false, remember = false, refused = false } = {}) {
    if (remember) setComposerMode('markdown');
    setMode(state, 'markdown', { focus, refused });
}

function setMode(state, mode, { focus = false, refused = false } = {}) {
    const { textarea, editor, wrapper, toolbar, note } = state;
    const rich = mode === 'rich' && Boolean(editor);
    state.mode = rich ? 'rich' : 'markdown';
    textarea.hidden = rich;
    if (wrapper) wrapper.hidden = !rich;
    toolbar.classList.toggle('markdown-mode', !rich);
    const toggle = toolbar.querySelector('.rich-mode-toggle');
    toggle.setAttribute('aria-pressed', String(!rich));
    toggle.title = rich ? 'Write raw markdown' : 'Back to the formatted editor';
    note.hidden = !refused;
    note.textContent = refused ? KEEPS_MARKDOWN : '';
    if (focus) {
        if (rich) editor.commands.focus('end');
        else { textarea.focus(); textarea.setSelectionRange(textarea.value.length, textarea.value.length); }
    }
    refreshToolbar(state);
}

function refreshToolbar(state) {
    if (!state.toolbar) return;
    const rich = Boolean(state.editor) && state.mode === 'rich';
    const active = rich ? state.api.activeMarks(state.editor) : {};
    state.toolbar.querySelectorAll('.icon-btn[data-tool]').forEach((btn) => {
        const on = Boolean(active[btn.dataset.tool]);
        btn.setAttribute('aria-pressed', String(on));
        btn.classList.toggle('is-active', on);
        btn.disabled = !rich;
        btn.hidden = !rich;
    });
    // The roving tab stop must sit on a button that can take focus.
    const buttons = [...state.toolbar.querySelectorAll('button')];
    const usable = buttons.filter(b => !b.disabled && !b.hidden);
    if (!usable.some(b => b.tabIndex === 0)) {
        buttons.forEach(b => { b.tabIndex = -1; });
        (usable[0] || buttons.at(-1)).tabIndex = 0;
    }
}

function restoreSelection(state, { from, to }) {
    const size = state.editor.state.doc.content.size;
    const clamp = (n) => Math.max(1, Math.min(n, size));
    try {
        state.editor.chain().focus().setTextSelection({ from: clamp(from), to: clamp(to) }).run();
    } catch {
        state.editor.commands.focus('end');
    }
}

function destroy(textareaId, state) {
    state.destroyed = true;
    if (state.editor) state.editor.destroy();
    state.editor = null;
    document.querySelectorAll('.rich-mention-suggestions').forEach(el => el.remove());
    if (composers.get(textareaId) === state) composers.delete(textareaId);
}

/** Focus the comment box, rich or plain (the 'c' shortcut). */
export function focusComposer(textareaId) {
    const state = composers.get(textareaId);
    if (state && state.editor && state.mode === 'rich') {
        state.editor.commands.focus('end');
        state.wrapper.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
        return true;
    }
    const textarea = document.getElementById(textareaId);
    if (!textarea) return false;
    textarea.focus();
    textarea.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    return true;
}

/**
 * Where the caret is in the rich editor, if it has focus, so a re-render
 * can put it back (`attachRichComposer`'s `restore`). Null otherwise.
 */
export function captureComposerFocus(textareaId) {
    const state = composers.get(textareaId);
    if (!state || !state.editor || state.mode !== 'rich' || !state.editor.isFocused) return null;
    const { from, to } = state.editor.state.selection;
    return { from, to };
}

/**
 * True while a refresh would interrupt typing in the rich editor: an IME
 * composition, or the @mention list open in a focused editor.
 */
export function isRichComposerBusy() {
    for (const state of composers.values()) {
        if (!state.editor) continue;
        if (state.editor.view.composing) return true;
        if (state.editor.isFocused && document.querySelector('.rich-mention-suggestions:not([hidden])')) return true;
    }
    return false;
}
