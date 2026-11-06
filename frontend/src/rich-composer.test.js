import './editor/jsdom-layout.js';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('./mention-autocomplete.js', () => ({
    mentionSuggestions: (q) => [{ handle: 'sam', name: 'Sam Example', isAgent: false }].filter(m => m.handle.startsWith(q)),
}));
vi.mock('./ui.js', () => ({ showToast: vi.fn() }));
vi.mock('./rich-text.js', async () => {
    const { marked } = await import('marked');
    return { renderCommentContent: (md) => marked.parse(md || '') };
});

import * as editorBundle from './editor/tiptap-editor.js';
import { attachRichComposer, focusComposer, isRichComposerBusy, editorBundleUrl, loadEditorBundle, captureComposerFocus } from './rich-composer.js';
import { showToast } from './ui.js';
import { setComposerMode } from './storage.js';

const tick = () => new Promise(r => setTimeout(r, 0));

function renderForm(value = '') {
    document.body.innerHTML = `
        <meta name="chaotic-version" content="abc" data-bundle="b1" data-editor="abc12345">
        <form class="comment-form">
            <textarea id="new-comment" placeholder="Write a comment..."></textarea>
            <button type="submit">Comment</button>
        </form>`;
    const textarea = document.getElementById('new-comment');
    textarea.value = value;
    return textarea;
}

let controller;
beforeEach(() => {
    localStorage.clear();
    window.ChaoticEditor = editorBundle;
    controller = new AbortController();
});
afterEach(() => {
    controller.abort();
    delete window.ChaoticEditor;
    document.body.innerHTML = '';
});

describe('editorBundleUrl', () => {
    it('carries the editor bundle\'s own hash', () => {
        renderForm();
        expect(editorBundleUrl()).toBe('/static/js/editor.bundle.js?v=abc12345');
    });

    it('has no query without a hash', () => {
        document.body.innerHTML = '';
        expect(editorBundleUrl()).toBe('/static/js/editor.bundle.js');
        document.body.innerHTML = '<meta name="chaotic-version" data-editor="dev">';
        expect(editorBundleUrl()).toBe('/static/js/editor.bundle.js');
    });
});

describe('loadEditorBundle', () => {
    it('resolves at once when the bundle is already on the page', async () => {
        await expect(loadEditorBundle()).resolves.toBe(editorBundle);
    });

    it('rejects when the script fails, and tries again next time', async () => {
        delete window.ChaoticEditor;
        renderForm();
        const first = loadEditorBundle();
        const script = document.head.querySelector('script[src*="editor.bundle.js"]');
        script.onerror();
        await expect(first).rejects.toThrow('failed to load');
        const second = loadEditorBundle();
        expect(second).not.toBe(first);
        document.head.querySelectorAll('script[src*="editor.bundle.js"]').forEach(s => s.onload && (window.ChaoticEditor = editorBundle, s.onload()));
        await expect(second).resolves.toBe(editorBundle);
    });
});

describe('attachRichComposer', () => {
    it('mounts over the textarea, which stays as the hidden source of truth', async () => {
        const textarea = renderForm('**hi**');
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(document.querySelector('.rich-editor-content')).not.toBeNull();
        expect(textarea.hidden).toBe(true);
        expect(document.querySelector('.rich-editor-content strong').textContent).toBe('hi');
        expect(textarea.value).toBe('**hi**');
    });

    it('writes markdown to the textarea and fires input, so drafts save', async () => {
        const textarea = renderForm();
        const seen = [];
        textarea.addEventListener('input', () => seen.push(textarea.value));
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        state.editor.commands.insertContent('hello');
        expect(textarea.value).toBe('hello');
        expect(seen.at(-1)).toBe('hello');
    });

    it('carries an outside write (quote-reply) into the editor', async () => {
        const textarea = renderForm();
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        textarea.value = '> quoted\n\n';
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        expect(state.editor.getHTML()).toContain('<blockquote>');
        expect(textarea.hidden).toBe(true);
    });

    it('opens markdown the editor would change in the textarea, untouched', async () => {
        const md = 'see <details><summary>x</summary>y</details>';
        const textarea = renderForm(md);
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(textarea.hidden).toBe(false);
        expect(textarea.value).toBe(md);
        expect(document.querySelector('.rich-composer').hidden).toBe(true);
    });

    it('stays a textarea when the person chose markdown', async () => {
        setComposerMode('markdown');
        const textarea = renderForm('x');
        attachRichComposer('new-comment', { signal: controller.signal });
        textarea.dispatchEvent(new Event('focus'));
        await tick();
        expect(document.querySelector('.rich-editor-content')).toBeNull();
        expect(textarea.hidden).toBe(false);
    });

    it('the Markdown toggle swaps both ways and keeps the text', async () => {
        const textarea = renderForm('*a*');
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        const toggle = document.querySelector('.rich-mode-toggle');
        toggle.click();
        expect(textarea.hidden).toBe(false);
        expect(toggle.getAttribute('aria-pressed')).toBe('true');
        textarea.value = '**b**';
        toggle.click();
        expect(textarea.hidden).toBe(true);
        expect(state.editor.getHTML()).toContain('<strong>b</strong>');
    });

    it('a toolbar button formats the selection', async () => {
        const textarea = renderForm('word');
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        state.editor.commands.selectAll();
        document.querySelector('.icon-btn[data-tool="bold"]').click();
        expect(textarea.value).toBe('**word**');
        expect(document.querySelector('.icon-btn[data-tool="bold"]').getAttribute('aria-pressed')).toBe('true');
    });

    it('Cmd/Ctrl+Enter submits the form', async () => {
        renderForm('x');
        const form = document.querySelector('form');
        const submit = vi.fn((e) => e.preventDefault());
        form.addEventListener('submit', submit);
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        state.editor.view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true, cancelable: true }));
        expect(submit).toHaveBeenCalled();
    });

    it('is torn down with the view', async () => {
        renderForm();
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        const destroy = vi.spyOn(state.editor, 'destroy');
        controller.abort();
        expect(destroy).toHaveBeenCalled();
        expect(focusComposer('new-comment')).toBe(true); // falls back to the textarea
    });

    it('attaches once per textarea', () => {
        renderForm();
        expect(attachRichComposer('new-comment', { signal: controller.signal })).not.toBeNull();
        expect(attachRichComposer('new-comment', { signal: controller.signal })).toBeNull();
    });

    it('leaves the textarea alone when the bundle cannot load', async () => {
        delete window.ChaoticEditor;
        const textarea = renderForm('draft');
        attachRichComposer('new-comment', { signal: controller.signal });
        textarea.dispatchEvent(new Event('focus'));
        document.head.querySelector('script[src*="editor.bundle.js"]').onerror();
        await tick();
        expect(textarea.hidden).toBe(false);
        expect(textarea.value).toBe('draft');
    });
});

describe('focusComposer and isRichComposerBusy', () => {
    it('focuses the editor when it is up', async () => {
        renderForm();
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(focusComposer('new-comment')).toBe(true);
        // Tiptap focuses on the next frame.
        await new Promise(r => setTimeout(r, 50));
        expect(document.activeElement).toBe(state.editor.view.dom);
    });

    it('is busy while the mention list is open', async () => {
        renderForm();
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(isRichComposerBusy()).toBe(false);
        state.editor.commands.focus();
        state.editor.commands.insertContent('@s');
        await new Promise(r => setTimeout(r, 50));
        expect(document.querySelector('.rich-mention-suggestions')).not.toBeNull();
        expect(isRichComposerBusy()).toBe(true);
    });
});

describe('PR #534 review fixes', () => {
    it('C1: a re-render puts the caret back in the editor', async () => {
        renderForm('hello world');
        const first = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        first.editor.commands.focus();
        first.editor.commands.setTextSelection(3);
        await new Promise(r => setTimeout(r, 50));
        const snap = captureComposerFocus('new-comment');
        expect(snap).toEqual({ from: 3, to: 3 });

        // The view re-renders: old composer torn down, new textarea with the draft.
        controller.abort();
        controller = new AbortController();
        renderForm('hello world');
        const second = attachRichComposer('new-comment', { signal: controller.signal, restore: snap });
        expect(second.editor).not.toBeNull(); // mounted at once: the bundle is loaded
        await new Promise(r => setTimeout(r, 50));
        expect(document.activeElement).toBe(second.editor.view.dom);
        expect(second.editor.state.selection.from).toBe(3);
        expect(document.querySelector('form').classList.contains('composer-active')).toBe(true);
    });

    it('C1: nothing to restore when the editor does not have focus', async () => {
        renderForm('x');
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(captureComposerFocus('new-comment')).toBeNull();
    });

    it('I3: the toggle mounts the editor when markdown was the saved choice', async () => {
        setComposerMode('markdown');
        const textarea = renderForm('**b**');
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(state.editor).toBeNull();
        const toggle = document.querySelector('.rich-mode-toggle');
        expect(toggle.getAttribute('aria-pressed')).toBe('true');
        expect([...document.querySelectorAll('.icon-btn')].every(b => b.disabled && b.hidden)).toBe(true);
        toggle.click();
        await tick();
        expect(state.editor).not.toBeNull();
        expect(textarea.hidden).toBe(true);
        expect(toggle.getAttribute('aria-pressed')).toBe('false');
        expect(state.editor.getHTML()).toContain('<strong>b</strong>');
    });

    it('says why a comment stays as markdown', async () => {
        renderForm('see <details><summary>x</summary>y</details>');
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        const note = document.querySelector('.rich-composer-note');
        expect(note.hidden).toBe(false);
        expect(note.getAttribute('role')).toBe('status');
        expect(note.textContent).toMatch(/stays as markdown/);
    });

    it('a failed load takes its script tag back out', async () => {
        delete window.ChaoticEditor;
        renderForm();
        const p = loadEditorBundle();
        const script = document.head.querySelector('script[src*="editor.bundle.js"]');
        script.onerror();
        await expect(p).rejects.toThrow();
        expect(document.head.querySelector('script[src*="editor.bundle.js"]')).toBeNull();
    });

    it('refuses an editor bundle of another version', async () => {
        window.ChaoticEditor = { ...editorBundle, API_VERSION: 999 };
        const textarea = renderForm('x');
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        expect(textarea.hidden).toBe(false);
        expect(document.querySelector('.rich-editor-content')).toBeNull();
    });

    it('puts the toolbar after the Comment button, with one tab stop', async () => {
        renderForm();
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        const form = document.querySelector('form');
        const kids = [...form.children].map(el => el.tagName === 'BUTTON' ? 'submit' : el.className.split(' ')[0]);
        expect(kids.indexOf('submit')).toBeLessThan(kids.indexOf('toolbar'));
        const stops = [...document.querySelectorAll('.toolbar button')].filter(b => b.tabIndex === 0);
        expect(stops).toHaveLength(1);
    });

    it('puts the toolbar in the comment box footer, before send, when there is one (CHT-2093)', async () => {
        document.body.innerHTML = `
            <meta name="chaotic-version" content="abc" data-bundle="b1" data-editor="abc12345">
            <form class="comment-form">
                <div class="comment-box">
                    <textarea id="new-comment"></textarea>
                    <div class="comment-box-foot"><button type="submit">Send</button></div>
                </div>
            </form>`;
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        const foot = document.querySelector('.comment-box-foot');
        expect(foot.firstElementChild.classList.contains('toolbar')).toBe(true);
        expect(foot.lastElementChild.type).toBe('submit');
        expect(document.querySelector('form > .rich-composer-note')).not.toBeNull();
    });

    it('arrow keys move along the toolbar', async () => {
        renderForm();
        attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        const [bold, italic] = document.querySelectorAll('.toolbar .icon-btn');
        bold.focus();
        bold.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        expect(document.activeElement).toBe(italic);
        expect(italic.tabIndex).toBe(0);
        expect(bold.tabIndex).toBe(-1);
    });

    it('a refused link says so', async () => {
        const toast = vi.spyOn(window, 'prompt').mockReturnValue('javascript:alert(1)');
        renderForm('x');
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        state.editor.commands.selectAll();
        document.querySelector('.icon-btn[data-tool="link"]').click();
        expect(showToast).toHaveBeenCalledWith(expect.stringMatching(/can’t be added/), 'error');
        toast.mockRestore();
    });

    it('the mention list does not hold off refreshes once the editor has lost focus', async () => {
        renderForm();
        const state = attachRichComposer('new-comment', { signal: controller.signal });
        await tick();
        state.editor.commands.focus();
        state.editor.commands.insertContent('@s');
        await new Promise(r => setTimeout(r, 50));
        expect(isRichComposerBusy()).toBe(true);
        state.editor.commands.blur();
        state.editor.view.dom.blur();
        await new Promise(r => setTimeout(r, 20));
        expect(isRichComposerBusy()).toBe(false);
    });
});
