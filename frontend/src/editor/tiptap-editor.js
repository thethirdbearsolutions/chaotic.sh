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
import { Paragraph } from '@tiptap/extension-paragraph';
import { Markdown } from '@tiptap/markdown';
import { TaskList, TaskItem } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import { Placeholder } from '@tiptap/extensions';
import Suggestion, { exitSuggestion } from '@tiptap/suggestion';

/**
 * What the app checks before using this bundle. A tab opened before a
 * deploy can load a newer editor bundle than its app bundle expects;
 * bump this when createEditor's contract changes.
 */
export const API_VERSION = 1;

/** The editor's markdown, without the trailing blank lines it adds after blocks. */
export function getMarkdown(editor) {
    return editor.getMarkdown().replace(/\s+$/, '');
}

/**
 * Whether `markdown` survives a trip through the editor: true when what
 * the editor writes back renders the same as what came in. Writing style
 * may change (`snake\_case`, padded tables); meaning may not. `render`
 * is the app's markdown renderer, so the comparison is exactly what a
 * reader of the posted comment would see. Anything that throws counts
 * as not clean.
 */
export function roundTripsCleanly(editor, markdown, render) {
    const input = (markdown || '').replace(/\s+$/, '');
    if (!input) return true;
    const before = editor.getJSON();
    try {
        editor.commands.setContent(input, { contentType: 'markdown', emitUpdate: false });
        const out = getMarkdown(editor);
        return normalizeHtml(render(out)) === normalizeHtml(render(input));
    } catch {
        return false;
    } finally {
        try {
            editor.commands.setContent(before, { emitUpdate: false });
        } catch {
            // The editor keeps whatever it had; the caller treats this as not clean.
        }
    }
}

/** Whitespace between and inside tags is noise, except inside <pre>. */
function normalizeHtml(html) {
    return String(html)
        .split(/(<pre[\s\S]*?<\/pre>)/)
        .map((part, i) => (i % 2 ? part : part.replace(/>\s+</g, '><').replace(/\s+/g, ' ')))
        .join('')
        .trim();
}

// ---------------------------------------------------------------------------
// Markdown out: write text so it renders as what the person typed.
// ---------------------------------------------------------------------------

// Words whose characters must reach the renderer as typed: a URL or email
// (an escaped `_` ends up in the href) and an @handle (the server reads
// `@first\_last` as `@first`).
const PROTECTED = /(?:https?:\/\/|www\.)[^\s<]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+|(?<![A-Za-z0-9_`])@[A-Za-z0-9._-]+/g;

/**
 * Escape a text node for markdown. Inline syntax characters are
 * backslash-escaped outside protected words; `<` and `&` only where they
 * could start a tag or an entity, so `a < b` and `R&D` stay readable in
 * the stored markdown.
 */
export function escapeText(text) {
    let out = '';
    let last = 0;
    for (const m of text.matchAll(PROTECTED)) {
        out += escapePlain(text.slice(last, m.index)) + m[0];
        last = m.index + m[0].length;
    }
    return out + escapePlain(text.slice(last));
}

function escapePlain(s) {
    return s
        .replace(/&(?=#?[A-Za-z0-9]+;)/g, '&amp;')
        .replace(/<(?=[A-Za-z/!?])/g, '&lt;')
        .replace(/([\\`*_[\]~])/g, '\\$1');
}

/**
 * Keep the start of each line of a paragraph from being read as block
 * syntax: a heading, a list item, a quote, a rule or a setext underline,
 * or indentation (four spaces make a code block, where every escape shows
 * literally). Leading spaces become no-break spaces, which markdown does
 * not count as indentation and which still show.
 */
export function escapeLineStarts(md) {
    return md.split('\n').map((line) => {
        let l = line.replace(/^[ \t]+/, (ws) => ws.replace(/\t/g, '    ').replace(/ /g, '\u00a0'));
        if (/^#{1,6}(\s|$)/.test(l) || /^[-+>](\s|$)/.test(l) || /^>/.test(l) || /^(=+|-{2,})\s*$/.test(l) || /^-{3,}/.test(l)) {
            l = `\\${l}`;
        } else {
            l = l.replace(/^(\d{1,9})([.)])(\s|$)/, '$1\\$2$3');
        }
        return l;
    }).join('\n');
}

const SafeParagraph = Paragraph.extend({
    renderMarkdown(node, h, ctx) {
        return escapeLineStarts(Paragraph.config.renderMarkdown(node, h, ctx));
    },
});

/** Route text-node escaping through escapeText (code stays as typed). */
function installTextEscaping(editor) {
    const manager = editor.markdown;
    if (!manager) return;
    manager.encodeTextForMarkdown = function encodeTextForMarkdown(text, node, parentNode) {
        const inCode = (parentNode?.type != null && this.codeTypes.has(parentNode.type))
            || (node.marks || []).some(m => this.codeTypes.has(typeof m === 'string' ? m : m.type));
        return inCode ? text : escapeText(text);
    };
}

// ---------------------------------------------------------------------------
// @mentions
// ---------------------------------------------------------------------------

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
                    editor.chain().focus().insertContentAt(range, [{ type: 'text', text: `@${props.handle} ` }]).run();
                },
                render: () => mentionPopup(this.editor),
            })];
        },
        onBlur() {
            // The list belongs to the caret; leaving the box closes it, as
            // the textarea's list does.
            if (!this.editor.isDestroyed) exitSuggestion(this.editor.view);
        },
    });
}

let popupSeq = 0;

/** The suggestion list: a listbox at the caret, kept on screen. */
function mentionPopup(editor) {
    let el = null;
    let items = [];
    let selected = 0;
    let pick = null;
    let clientRect = null;
    const id = `rich-mention-list-${++popupSeq}`;
    const dom = editor.view.dom;

    const optionId = (i) => `${id}-opt-${i}`;
    const draw = () => {
        if (!el) return;
        el.innerHTML = '';
        el.hidden = items.length === 0;
        items.forEach((item, i) => {
            const row = document.createElement('div');
            row.id = optionId(i);
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
        const open = items.length > 0;
        dom.setAttribute('aria-expanded', String(open));
        if (open) dom.setAttribute('aria-activedescendant', optionId(selected));
        else dom.removeAttribute('aria-activedescendant');
    };
    // Fixed to the viewport: below the caret when it fits, else above it
    // (the composer sits at the bottom of the screen), never off the edge.
    const place = () => {
        const rect = clientRect && clientRect();
        if (!el || !rect || el.hidden) return;
        const gap = 4;
        const margin = 8;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const below = rect.bottom + gap + h <= window.innerHeight - margin;
        const top = below ? rect.bottom + gap : Math.max(margin, rect.top - gap - h);
        const left = Math.min(Math.max(margin, rect.left), Math.max(margin, window.innerWidth - w - margin));
        el.style.top = `${Math.round(top)}px`;
        el.style.left = `${Math.round(left)}px`;
    };
    const onScroll = () => place();

    return {
        onStart(props) {
            el = document.createElement('div');
            el.id = id;
            el.className = 'mention-suggestions rich-mention-suggestions';
            el.setAttribute('role', 'listbox');
            el.setAttribute('aria-label', 'People to mention');
            document.body.appendChild(el);
            dom.setAttribute('aria-controls', id);
            dom.setAttribute('aria-autocomplete', 'list');
            items = props.items;
            selected = 0;
            pick = props.command;
            clientRect = props.clientRect;
            draw();
            place();
            window.addEventListener('scroll', onScroll, true);
            window.addEventListener('resize', onScroll);
        },
        onUpdate(props) {
            items = props.items;
            selected = Math.min(selected, Math.max(items.length - 1, 0));
            pick = props.command;
            clientRect = props.clientRect;
            draw();
            place();
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
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onScroll);
            if (el) el.remove();
            el = null;
            dom.removeAttribute('aria-controls');
            dom.removeAttribute('aria-activedescendant');
            dom.setAttribute('aria-expanded', 'false');
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

// Autolink only what is unmistakably a link: a scheme, or www. Bare
// `main.py` or `config.yaml` stays text.
const shouldAutoLink = (url) => /^(https?:\/\/|mailto:|www\.)/i.test(url);

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
            paragraph: false,
            link: {
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                shouldAutoLink,
                HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
            },
            heading: { levels: [1, 2, 3] },
            underline: false,
        }),
        SafeParagraph,
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
    installTextEscaping(editor);
    if (markdown) editor.commands.setContent(markdown, { contentType: 'markdown', emitUpdate: false });
    return editor;
}

/**
 * A URL as the person typed it, made safe to sit in `[text](url)`: spaces
 * and parentheses would end the link early.
 */
function cleanHref(href) {
    return href.trim().replace(/\s/g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
}

/** http(s), mailto, or a relative link; nothing that runs or embeds. */
export function isSafeHref(url) {
    const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(url);
    return !scheme || ['http', 'https', 'mailto'].includes(scheme[1].toLowerCase());
}

/** Toolbar commands, by name, so the app's buttons stay data. Each returns whether it applied. */
export const COMMANDS = {
    bold: (ed) => ed.chain().focus().toggleBold().run(),
    italic: (ed) => ed.chain().focus().toggleItalic().run(),
    code: (ed) => ed.chain().focus().toggleCode().run(),
    bulletList: (ed) => ed.chain().focus().toggleBulletList().run(),
    orderedList: (ed) => ed.chain().focus().toggleOrderedList().run(),
    blockquote: (ed) => ed.chain().focus().toggleBlockquote().run(),
    codeBlock: (ed) => ed.chain().focus().toggleCodeBlock().run(),
    /**
     * Link the selection, or the link at the caret. With nothing selected
     * and no link there, insert the URL itself as a link. An empty href
     * removes the link. False when the URL is refused (javascript:, data:).
     */
    link: (ed, href) => {
        const url = cleanHref(href || '');
        if (!url) return ed.chain().focus().extendMarkRange('link').unsetLink().run();
        if (!isSafeHref(url)) return false;
        if (!ed.isActive('link') && ed.state.selection.empty) {
            return ed.chain().focus()
                .insertContent([{ type: 'text', text: url, marks: [{ type: 'link', attrs: { href: url } }] }])
                .unsetMark('link')
                .run();
        }
        return ed.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
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
