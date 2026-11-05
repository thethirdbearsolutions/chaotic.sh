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
 * in the textarea instead of being rewritten.
 *
 * If the bundle fails to load, the textarea simply stays.
 */

import { getComposerMode, setComposerMode } from './storage.js';
import { mentionSuggestions } from './mention-autocomplete.js';
import { renderCommentContent } from './rich-text.js';

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

let bundlePromise = null;

/**
 * The editor bundle's URL, with its own content hash as `?v=` (the page
 * stamps it on the chaotic-version meta tag), so it is cached for good
 * and busted exactly when it changes. No hash ('dev', the Vite dev page):
 * no `?v=`, and the server revalidates.
 */
export function editorBundleUrl() {
    const meta = document.querySelector('meta[name="chaotic-version"]');
    const version = meta ? meta.getAttribute('data-editor') : '';
    const usable = version && version !== 'dev' && version !== 'missing';
    return `/static/js/editor.bundle.js${usable ? `?v=${encodeURIComponent(version)}` : ''}`;
}

/** Load editor.bundle.js once; resolves to its exports, or rejects. */
export function loadEditorBundle() {
    if (window.ChaoticEditor) return Promise.resolve(window.ChaoticEditor);
    if (bundlePromise) return bundlePromise;
    bundlePromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = editorBundleUrl();
        script.async = true;
        script.onload = () => (window.ChaoticEditor ? resolve(window.ChaoticEditor) : reject(new Error('editor bundle loaded without exports')));
        script.onerror = () => reject(new Error('editor bundle failed to load'));
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
 */
export function attachRichComposer(textareaId, { signal, mentionContext = {}, placeholder = '' } = {}) {
    const textarea = document.getElementById(textareaId);
    if (!textarea || textarea.dataset.richComposer === 'true') return null;
    textarea.dataset.richComposer = 'true';
    const form = textarea.closest('form');

    const state = {
        textarea,
        editor: null,
        api: null,
        wrapper: null,
        toolbar: null,
        mode: 'markdown', // until the editor is up
        syncing: false,
        destroyed: false,
    };
    composers.set(textareaId, state);

    const toolbar = document.createElement('div');
    toolbar.className = 'rich-composer-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Formatting');
    toolbar.innerHTML = `${TOOLS.map(([name, label]) =>
        `<button type="button" class="rich-tool" data-tool="${name}" title="${label}" aria-label="${label}" aria-pressed="false">${ICONS[name]}</button>`).join('')}
        <span class="rich-tool-spacer"></span>
        <button type="button" class="rich-tool rich-mode-toggle" data-tool="mode" aria-pressed="false" title="Write raw markdown">Markdown</button>`;
    // Keep focus (and the selection) in the editor when a tool is clicked.
    toolbar.addEventListener('mousedown', (e) => { if (e.target.closest('.rich-tool')) e.preventDefault(); }, { signal });
    toolbar.addEventListener('click', (e) => {
        const btn = e.target.closest('.rich-tool');
        if (!btn) return;
        if (btn.dataset.tool === 'mode') { setMode(state, state.mode === 'rich' ? 'markdown' : 'rich', { focus: true }); return; }
        if (!state.editor) return;
        if (btn.dataset.tool === 'link') {
            const current = state.editor.getAttributes('link').href || '';
            const href = window.prompt('Link URL (leave empty to remove the link)', current);
            if (href === null) return;
            state.api.COMMANDS.link(state.editor, href.trim());
        } else {
            state.api.COMMANDS[btn.dataset.tool](state.editor);
        }
        refreshToolbar(state);
    }, { signal });
    textarea.insertAdjacentElement('afterend', toolbar);
    state.toolbar = toolbar;
    form?.classList.add('has-rich-composer');

    const start = () => {
        if (state.editor || state.destroyed || getComposerMode() === 'markdown') return;
        loadEditorBundle().then((api) => {
            if (state.destroyed || state.editor) return;
            mount(state, api, { mentionContext, placeholder: placeholder || textarea.getAttribute('placeholder') || '', form });
            // Only take focus when the person was in the box waiting for it.
            setMode(state, 'rich', { focus: document.activeElement === textarea });
        }).catch(() => { /* the textarea stays; nothing is lost */ });
    };

    // Already loaded on an earlier visit: mount now, so there is no flash
    // of the plain box. Otherwise wait for the person to come to it.
    if (window.ChaoticEditor) start();
    else textarea.addEventListener('focus', start, { signal });
    form?.addEventListener('focusin', () => form.classList.add('composer-active'), { signal });
    form?.addEventListener('focusout', (e) => {
        if (!form.contains(e.relatedTarget) && !textarea.value) form.classList.remove('composer-active');
    }, { signal });

    // A write from outside (quote-reply, a restored draft) arrives as an
    // input event on the hidden textarea.
    textarea.addEventListener('input', () => {
        if (state.syncing || state.mode !== 'rich' || !state.editor) return;
        if (!state.api.roundTripsCleanly(state.editor, textarea.value, renderCommentContent)) {
            setMode(state, 'markdown', { focus: true, remember: false });
            return;
        }
        state.editor.commands.setContent(textarea.value, { contentType: 'markdown', emitUpdate: false });
        state.editor.commands.focus('end');
        state.wrapper.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }, { signal });

    signal?.addEventListener('abort', () => destroy(textareaId, state));
    return state;
}

function mount(state, api, { mentionContext, placeholder, form }) {
    const { textarea } = state;
    const wrapper = document.createElement('div');
    wrapper.className = 'rich-composer';
    textarea.insertAdjacentElement('beforebegin', wrapper);
    state.wrapper = wrapper;
    state.api = api;
    state.editor = api.createEditor({
        element: wrapper,
        markdown: '',
        placeholder,
        getMentionItems: (q) => mentionSuggestions(q, mentionContext),
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
    state.editor.on('selectionUpdate', () => refreshToolbar(state));
}

/**
 * Show the editor or the textarea. Going to rich mode only happens when the
 * current markdown survives the editor; otherwise the textarea stays.
 */
function setMode(state, mode, { focus = false, remember = true } = {}) {
    const { textarea, editor, wrapper, toolbar } = state;
    if (mode === 'rich') {
        if (!editor) {
            if (remember) setComposerMode('rich');
            textarea.dispatchEvent(new Event('focus'));
            return;
        }
        if (!state.api.roundTripsCleanly(editor, textarea.value, renderCommentContent)) {
            mode = 'markdown';
            toolbar.querySelector('.rich-mode-toggle').title = 'This comment uses markdown the editor would change, so it stays as markdown';
        } else {
            editor.commands.setContent(textarea.value || '', { contentType: 'markdown', emitUpdate: false });
            if (remember) setComposerMode('rich');
        }
    } else if (remember) {
        setComposerMode('markdown');
    }
    state.mode = mode;
    const rich = mode === 'rich' && editor;
    textarea.hidden = Boolean(rich);
    if (wrapper) wrapper.hidden = !rich;
    toolbar.classList.toggle('markdown-mode', !rich);
    const toggle = toolbar.querySelector('.rich-mode-toggle');
    toggle.setAttribute('aria-pressed', String(!rich));
    if (rich) toggle.title = 'Write raw markdown';
    if (focus) {
        if (rich) editor.commands.focus('end');
        else { textarea.focus(); textarea.setSelectionRange(textarea.value.length, textarea.value.length); }
    }
    refreshToolbar(state);
}

function refreshToolbar(state) {
    if (!state.toolbar) return;
    const active = state.editor && state.mode === 'rich' ? state.api.activeMarks(state.editor) : {};
    state.toolbar.querySelectorAll('.rich-tool[data-tool]:not(.rich-mode-toggle)').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(Boolean(active[btn.dataset.tool])));
        btn.disabled = state.mode !== 'rich';
    });
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
 * True while a refresh would interrupt typing in the rich editor: an IME
 * composition, or the @mention list is open.
 */
export function isRichComposerBusy() {
    for (const state of composers.values()) {
        if (state.editor && state.editor.view.composing) return true;
    }
    return Boolean(document.querySelector('.rich-mention-suggestions:not([hidden])'));
}
