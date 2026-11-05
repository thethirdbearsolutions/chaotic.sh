import './jsdom-layout.js';
import { describe, it, expect, afterEach } from 'vitest';
import { marked } from 'marked';
import { createEditor, getMarkdown, roundTripsCleanly, COMMANDS, activeMarks } from './tiptap-editor.js';

// jsdom has no ClipboardEvent; ProseMirror's pasteText makes one.
if (typeof globalThis.ClipboardEvent === 'undefined') {
    globalThis.ClipboardEvent = class ClipboardEvent extends Event {
        constructor(type, init = {}) { super(type, init); this.clipboardData = init.clipboardData || null; }
    };
}

let editor;
const mount = (opts = {}) => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    editor = createEditor({ element, ...opts });
    return editor;
};
afterEach(() => {
    if (editor) editor.destroy();
    editor = null;
    document.body.innerHTML = '';
});

const render = (md) => marked.parse(md);

describe('markdown in and out', () => {
    it.each([
        'Plain paragraph.\n\nSecond with **bold**, *italic*, `code` and a [link](https://example.com).',
        '- one\n- two\n  - nested\n- three',
        '1. first\n2. second',
        '> quoted line\n> second quoted\n\nafter',
        '```python\ndef f():\n    return 1\n```',
        'Hey @sam can you look? Also @agent-1.',
        'line one\nline two',
        '# Heading\n\ntext',
        '- [ ] task\n- [x] done',
    ])('keeps %j as written', (md) => {
        expect(getMarkdown(mount({ markdown: md }))).toBe(md);
    });

    it('keeps a table', () => {
        const md = '| a | b |\n|---|---|\n| 1 | 2 |';
        const out = getMarkdown(mount({ markdown: md }));
        const norm = (h) => h.replace(/>\s+</g, '><').trim();
        expect(norm(render(out))).toBe(norm(render(md)));
    });

    it('reports markdown on every change, without trailing blank lines', () => {
        const seen = [];
        const ed = mount({ onUpdate: (md) => seen.push(md) });
        ed.commands.setContent('- a\n- b', { contentType: 'markdown' });
        expect(seen.at(-1)).toBe('- a\n- b');
    });
});

describe('roundTripsCleanly', () => {
    it('accepts changes of writing style that render the same', () => {
        const ed = mount();
        expect(roundTripsCleanly(ed, 'snake_case_word', render)).toBe(true);
        expect(roundTripsCleanly(ed, '| a | b |\n|---|---|\n| 1 | 2 |', render)).toBe(true);
    });

    it('rejects markdown whose meaning would change', () => {
        const ed = mount();
        // Raw HTML the editor cannot hold is dropped or rewritten.
        expect(roundTripsCleanly(ed, 'see <details><summary>x</summary>y</details>', render)).toBe(false);
    });

    it('leaves the editor content as it was', () => {
        const ed = mount({ markdown: 'keep me' });
        roundTripsCleanly(ed, '# other', render);
        expect(getMarkdown(ed)).toBe('keep me');
    });

    it('treats empty input as clean', () => {
        expect(roundTripsCleanly(mount(), '', render)).toBe(true);
    });
});

describe('toolbar commands', () => {
    it('bold toggles a mark on the selection', () => {
        const ed = mount({ markdown: 'word' });
        ed.commands.selectAll();
        COMMANDS.bold(ed);
        expect(getMarkdown(ed)).toBe('**word**');
        expect(activeMarks(ed).bold).toBe(true);
    });

    it('link sets and clears', () => {
        const ed = mount({ markdown: 'site' });
        ed.commands.selectAll();
        COMMANDS.link(ed, 'https://example.com');
        expect(getMarkdown(ed)).toBe('[site](https://example.com)');
        ed.commands.selectAll();
        COMMANDS.link(ed, '');
        expect(getMarkdown(ed)).toBe('site');
    });

    it('bullet list and quote wrap the paragraph', () => {
        const ed = mount({ markdown: 'item' });
        COMMANDS.bulletList(ed);
        expect(getMarkdown(ed)).toBe('- item');
        COMMANDS.bulletList(ed);
        COMMANDS.blockquote(ed);
        expect(getMarkdown(ed)).toBe('> item');
    });
});

describe('keys', () => {
    const press = (ed, init) => {
        const ev = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
        ed.view.dom.dispatchEvent(ev);
        return ev;
    };

    it('Cmd/Ctrl+Enter submits', () => {
        let submitted = 0;
        const ed = mount({ onSubmit: () => { submitted += 1; } });
        press(ed, { key: 'Enter', ctrlKey: true });
        press(ed, { key: 'Enter', metaKey: true });
        expect(submitted).toBeGreaterThanOrEqual(1);
    });

    it('Escape calls onEscape', () => {
        let escaped = 0;
        const ed = mount({ onEscape: () => { escaped += 1; } });
        press(ed, { key: 'Escape' });
        expect(escaped).toBe(1);
    });
});

describe('mentions', () => {
    const people = [{ handle: 'sam', name: 'Sam Example' }, { handle: 'sasha', name: 'Sasha Example' }];
    const getMentionItems = (q) => people.filter(p => p.handle.startsWith(q.toLowerCase()));

    it('offers matches after @ and inserts plain @handle text', async () => {
        const ed = mount({ getMentionItems });
        ed.commands.focus();
        ed.commands.insertContent('hi @sa');
        await new Promise(r => setTimeout(r, 0));
        const list = document.querySelector('.rich-mention-suggestions');
        expect(list).not.toBeNull();
        expect([...list.querySelectorAll('.mention-handle')].map(n => n.textContent)).toEqual(['@sam', '@sasha']);
        list.querySelector('.mention-suggestion').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        expect(getMarkdown(ed)).toBe('hi @sam');
        expect(document.querySelector('.rich-mention-suggestions')).toBeNull();
    });

    it('offers nothing inside inline code', async () => {
        const ed = mount({ getMentionItems, markdown: '' });
        ed.commands.focus();
        ed.commands.toggleCode();
        ed.commands.insertContent('@sa');
        await new Promise(r => setTimeout(r, 0));
        expect(document.querySelector('.rich-mention-suggestions')).toBeNull();
    });

    it('offers nothing inside a code block', async () => {
        const ed = mount({ getMentionItems });
        ed.commands.focus();
        ed.commands.setCodeBlock();
        ed.commands.insertContent('@sa');
        await new Promise(r => setTimeout(r, 0));
        expect(document.querySelector('.rich-mention-suggestions')).toBeNull();
    });
});

// What a reader of the posted comment sees, as text.
const shown = (md) => {
    const div = document.createElement('div');
    div.innerHTML = render(md);
    return div;
};

describe('markdown out renders as what was typed (PR #534 review C2, I1, I2)', () => {
    const typed = (text) => {
        const ed = mount();
        ed.commands.focus();
        ed.view.pasteText(text);
        return getMarkdown(ed);
    };

    it('a pasted plain-text traceback keeps its text and does not become a code block', () => {
        const tb = 'Traceback (most recent call last):\n    File "app/main.py", line 3, in <module>\n      foo_bar()\nValueError: bad value';
        const md = typed(tb);
        const out = shown(md);
        expect(out.querySelector('pre, code')).toBeNull();
        expect(out.querySelector('a')).toBeNull(); // main.py is not a link
        const text = out.textContent.replace(/\u00a0/g, ' ');
        expect(text).toContain('File "app/main.py", line 3, in <module>');
        expect(text).toContain('foo_bar()');
        expect(text).not.toMatch(/\\_|&lt;/);
    });

    it.each([
        ['1. not a list', 'ol'],
        ['+ not a list', 'ul'],
        ['- not a list', 'ul'],
        ['# not a heading', 'h1'],
        ['> not a quote', 'blockquote'],
        ['---', 'hr'],
    ])('a line starting %j stays text', (line, tag) => {
        const ed = mount();
        ed.commands.focus();
        ed.commands.insertContent([{ type: 'text', text: line }]);
        const out = shown(getMarkdown(ed));
        expect(out.querySelector(tag)).toBeNull();
        expect(out.textContent.trim()).toBe(line);
    });

    it('text after a hard break is not read as block syntax', () => {
        const ed = mount();
        ed.commands.focus();
        ed.commands.insertContent([{ type: 'text', text: 'Title' }, { type: 'hardBreak' }, { type: 'text', text: '---' }]);
        expect(shown(getMarkdown(ed)).querySelector('h2, hr')).toBeNull();
        ed.commands.setContent('');
        ed.commands.insertContent([{ type: 'text', text: 'steps' }, { type: 'hardBreak' }, { type: 'text', text: '1. next' }]);
        expect(shown(getMarkdown(ed)).querySelector('ol')).toBeNull();
    });

    it('a handle with an underscore is written as typed, so the server reads it', () => {
        const ed = mount({ markdown: 'ping @first_last and @a.b-c' });
        expect(getMarkdown(ed)).toBe('ping @first_last and @a.b-c');
    });

    it('a bare URL or email at the end keeps its underscores', () => {
        const ed = mount();
        ed.commands.focus();
        ed.view.pasteText('see https://github.com/a/b_c_d/x_y');
        let md = getMarkdown(ed);
        expect(md).not.toContain('\\_');
        expect(shown(md).querySelector('a').getAttribute('href')).toBe('https://github.com/a/b_c_d/x_y');
        ed.commands.setContent('');
        ed.commands.insertContent([{ type: 'text', text: 'mail a_b@example.com' }]);
        md = getMarkdown(ed);
        expect(md).toBe('mail a_b@example.com');
    });

    it('still escapes emphasis characters in ordinary text', () => {
        const ed = mount();
        ed.commands.insertContent([{ type: 'text', text: 'a *literal* star and [brackets]' }]);
        expect(shown(getMarkdown(ed)).querySelector('em')).toBeNull();
        expect(shown(getMarkdown(ed)).textContent.trim()).toBe('a *literal* star and [brackets]');
    });

    it('leaves < and & readable when they cannot start a tag or entity', () => {
        const ed = mount();
        ed.commands.insertContent([{ type: 'text', text: 'a < b && R&D, but <b>not bold</b> &amp;' }]);
        const md = getMarkdown(ed);
        expect(md.startsWith('a < b && R&D')).toBe(true);
        expect(shown(md).querySelector('b')).toBeNull();
        expect(shown(md).textContent.trim()).toBe('a < b && R&D, but <b>not bold</b> &amp;');
    });

    it('keeps a code span as typed', () => {
        expect(getMarkdown(mount({ markdown: 'run `foo_bar(*a)`' }))).toBe('run `foo_bar(*a)`');
    });
});

describe('roundTripsCleanly edge cases (PR #534 review)', () => {
    it('accepts trailing whitespace', () => {
        expect(roundTripsCleanly(mount(), 'I think ', render)).toBe(true);
    });

    it('counts a throw as not clean, and keeps the editor content', () => {
        const ed = mount({ markdown: 'keep' });
        const boom = () => { throw new Error('boom'); };
        expect(roundTripsCleanly(ed, 'x', boom)).toBe(false);
        expect(getMarkdown(ed)).toBe('keep');
    });
});

describe('link command (PR #534 review minor 4)', () => {
    it('inserts the URL as a link when nothing is selected', () => {
        const ed = mount();
        ed.commands.focus();
        expect(COMMANDS.link(ed, 'https://example.com/a b')).toBe(true);
        expect(getMarkdown(ed)).toBe('[https://example.com/a%20b](https://example.com/a%20b)');
    });

    it('refuses scripts and data URLs', () => {
        const ed = mount({ markdown: 'x' });
        ed.commands.selectAll();
        expect(COMMANDS.link(ed, 'javascript:alert(1)')).toBe(false);
        expect(COMMANDS.link(ed, 'data:text/html,hi')).toBe(false);
        expect(getMarkdown(ed)).toBe('x');
    });
});

describe('mention list and blur (PR #534 review I4)', () => {
    it('closes when the editor loses focus', async () => {
        const people = [{ handle: 'sam', name: 'Sam Example' }];
        const ed = mount({ getMentionItems: (q) => people.filter(p => p.handle.startsWith(q)) });
        ed.commands.focus();
        ed.commands.insertContent('@s');
        await new Promise(r => setTimeout(r, 0));
        expect(document.querySelector('.rich-mention-suggestions')).not.toBeNull();
        expect(ed.view.dom.getAttribute('aria-expanded')).toBe('true');
        expect(ed.view.dom.getAttribute('aria-activedescendant')).toMatch(/-opt-0$/);
        ed.commands.blur();
        ed.view.dom.dispatchEvent(new FocusEvent('blur'));
        await new Promise(r => setTimeout(r, 0));
        expect(document.querySelector('.rich-mention-suggestions')).toBeNull();
    });
});
