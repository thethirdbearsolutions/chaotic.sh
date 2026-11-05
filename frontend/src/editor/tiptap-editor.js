/**
 * Rich-text comment editor (CHT-2028), built on Tiptap.
 *
 * Markdown stays the storage format: the editor parses markdown in and
 * writes markdown out, so the API, the CLI and every other reader are
 * unchanged. This module is its own bundle (editor.bundle.js), loaded the
 * first time a composer is focused, so it imports nothing from the app:
 * the app hands it everything it needs (mention candidates, callbacks).
 */

import { Editor, Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import { TaskList, TaskItem } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import { Placeholder } from '@tiptap/extensions';
import Suggestion from '@tiptap/suggestion';

/** The editor's markdown, without the trailing blank lines it adds after blocks. */
export function getMarkdown(editor) {
    return editor.getMarkdown().replace(/\s+$/, '');
}

/**
 * Whether `markdown` survives a trip through the editor: true when what
 * the editor writes back renders the same as what came in. Writing style
 * may change (`snake\_case`, padded tables); meaning may not. `render`
 * is the app's markdown renderer, so the comparison is exactly what a
 * reader of the posted comment would see.
 */
export function roundTripsCleanly(editor, markdown, render) {
    if (!markdown) return true;
    const before = editor.getJSON();
    try {
        editor.commands.setContent(markdown, { contentType: 'markdown', emitUpdate: false });
        const out = getMarkdown(editor);
        return normalizeHtml(render(out)) === normalizeHtml(render(markdown));
    } finally {
        editor.commands.setContent(before, { emitUpdate: false });
    }
}

function normalizeHtml(html) {
    return String(html).replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
}

/**
 * @mention suggestions. Inserts plain `@handle ` text, never a node, so
 * the markdown is exactly what the textarea produced and the server's
 * mention parsing needs no change. No suggestions inside code, matching
 * the server, which ignores mentions there (CHT-1272).
 */
function mentionExtension(getItems) {
    return Extension.create({
        name: 'chaoticMention',
        addProseMirrorPlugins() {
            return [Suggestion({
                editor: this.editor,
                char: '@',
                allow: ({ state, range }) => {
                    const $from = state.doc.resolve(range.from);
                    if ($from.parent.type.spec.code) return false;
                    return !state.doc.rangeHasMark(range.from, Math.min(range.to, state.doc.content.size), state.schema.marks.code)
                        && !(state.storedMarks || $from.marks()).some(m => m.type.name === 'code');
                },
                items: ({ query }) => getItems(query),
                command: ({ editor, range, props }) => {
                    editor.chain().focus().insertContentAt(range, `@${props.handle} `).run();
                },
                render: mentionPopup,
            })];
        },
    });
}

/** The suggestion list: a small listbox under the caret. */
function mentionPopup() {
    let el = null;
    let items = [];
    let selected = 0;
    let pick = null;

    const draw = () => {
        if (!el) return;
        el.innerHTML = '';
        el.hidden = items.length === 0;
        items.forEach((item, i) => {
            const row = document.createElement('div');
            row.className = `mention-suggestion${i === selected ? ' selected' : ''}`;
            row.setAttribute('role', 'option');
            row.setAttribute('aria-selected', String(i === selected));
            const name = document.createElement('span');
            name.className = 'mention-name';
            name.textContent = item.name;
            if (item.isAgent) {
                const kind = document.createElement('span');
                kind.className = 'mention-kind';
                kind.textContent = 'agent';
                name.append(' ', kind);
            }
            const handle = document.createElement('span');
            handle.className = 'mention-handle';
            handle.textContent = `@${item.handle}`;
            row.append(name, handle);
            row.addEventListener('mousedown', (e) => { e.preventDefault(); pick(item); });
            el.appendChild(row);
        });
    };
    const place = (clientRect) => {
        const rect = clientRect && clientRect();
        if (!el || !rect) return;
        el.style.left = `${Math.round(rect.left + window.scrollX)}px`;
        el.style.top = `${Math.round(rect.bottom + window.scrollY + 4)}px`;
    };

    return {
        onStart(props) {
            el = document.createElement('div');
            el.className = 'mention-suggestions rich-mention-suggestions';
            el.setAttribute('role', 'listbox');
            document.body.appendChild(el);
            items = props.items;
            selected = 0;
            pick = props.command;
            draw();
            place(props.clientRect);
        },
        onUpdate(props) {
            items = props.items;
            selected = Math.min(selected, Math.max(items.length - 1, 0));
            pick = props.command;
            draw();
            place(props.clientRect);
        },
        onKeyDown({ event }) {
            if (!items.length) return false;
            if (event.key === 'ArrowDown') { selected = (selected + 1) % items.length; draw(); return true; }
            if (event.key === 'ArrowUp') { selected = (selected - 1 + items.length) % items.length; draw(); return true; }
            if (event.key === 'Enter' || event.key === 'Tab') { pick(items[selected]); return true; }
            if (event.key === 'Escape') { items = []; draw(); return true; }
            return false;
        },
        onExit() {
            if (el) el.remove();
            el = null;
        },
    };
}

/**
 * Submit on Cmd/Ctrl+Enter, blur on Escape. Escape is left alone while a
 * suggestion list is open: Suggestion handles it first.
 */
function keysExtension({ onSubmit, onEscape }) {
    return Extension.create({
        name: 'chaoticKeys',
        addKeyboardShortcuts() {
            return {
                'Mod-Enter': () => { if (onSubmit) onSubmit(); return true; },
                Escape: () => { if (onEscape) onEscape(); return Boolean(onEscape); },
            };
        },
    });
}

/**
 * @param {Object} opts
 * @param {HTMLElement} opts.element - where the editor mounts
 * @param {string} [opts.markdown] - initial content
 * @param {string} [opts.placeholder]
 * @param {(markdown: string) => void} [opts.onUpdate]
 * @param {() => void} [opts.onSubmit]
 * @param {() => void} [opts.onEscape]
 * @param {(query: string) => Array<{handle: string, name: string}>} [opts.getMentionItems]
 * @returns {Editor}
 */
export function createEditor({ element, markdown = '', placeholder = '', onUpdate, onSubmit, onEscape, getMentionItems, onFocus, onBlur }) {
    const extensions = [
        StarterKit.configure({
            link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer nofollow' } },
            // Headings in a comment are rare; keep them, but small.
            heading: { levels: [1, 2, 3] },
            underline: false,
        }),
        TaskList,
        TaskItem.configure({ nested: true }),
        TableKit,
        Placeholder.configure({ placeholder }),
        Markdown,
        keysExtension({ onSubmit, onEscape }),
    ];
    if (getMentionItems) extensions.push(mentionExtension(getMentionItems));

    const editor = new Editor({
        element,
        extensions,
        content: markdown || '',
        contentType: 'markdown',
        editorProps: {
            attributes: {
                class: 'rich-editor-content markdown-body',
                role: 'textbox',
                'aria-multiline': 'true',
                'aria-label': placeholder || 'Comment',
            },
        },
        onUpdate: ({ editor: ed }) => { if (onUpdate) onUpdate(getMarkdown(ed)); },
        onFocus: () => { if (onFocus) onFocus(); },
        onBlur: () => { if (onBlur) onBlur(); },
    });
    return editor;
}

/** Toolbar commands, by name, so the app's buttons stay data. */
export const COMMANDS = {
    bold: (ed) => ed.chain().focus().toggleBold().run(),
    italic: (ed) => ed.chain().focus().toggleItalic().run(),
    code: (ed) => ed.chain().focus().toggleCode().run(),
    bulletList: (ed) => ed.chain().focus().toggleBulletList().run(),
    orderedList: (ed) => ed.chain().focus().toggleOrderedList().run(),
    blockquote: (ed) => ed.chain().focus().toggleBlockquote().run(),
    codeBlock: (ed) => ed.chain().focus().toggleCodeBlock().run(),
    link: (ed, href) => {
        const chain = ed.chain().focus().extendMarkRange('link');
        return href ? chain.setLink({ href }).run() : chain.unsetLink().run();
    },
};

/** Which toolbar buttons are on at the caret. */
export function activeMarks(editor) {
    return {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        code: editor.isActive('code'),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        blockquote: editor.isActive('blockquote'),
        codeBlock: editor.isActive('codeBlock'),
        link: editor.isActive('link'),
    };
}
