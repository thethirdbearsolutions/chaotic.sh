import { describe, it, expect, afterEach } from 'vitest';
import { marked } from 'marked';
import { createEditor, getMarkdown, roundTripsCleanly, COMMANDS, activeMarks } from './tiptap-editor.js';

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
