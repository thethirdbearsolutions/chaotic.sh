import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({ api: { getDocuments: vi.fn() } }));
vi.mock('./state.js', () => ({ getCurrentTeam: vi.fn(() => ({ id: 'team-1' })) }));

import { api } from './api.js';
import { getCurrentTeam } from './state.js';
import {
    DOC_REF_TRIGGER, documentHref, escapeLinkText, docRefMarkdown,
    documentIdFromHref, markDocumentLinks, docRefSuggestions,
} from './doc-refs.js';
import { renderDescriptionContent, renderCommentContent } from './rich-text.js';

const ORIGIN = window.location.origin;
const ID = '3f2a91c0-1b2c-4d5e-8f90-123456789abc';

describe('DOC_REF_TRIGGER', () => {
    const query = (text) => (text.match(DOC_REF_TRIGGER) || [])[1];

    it('takes what follows [[ up to the caret, spaces included', () => {
        expect(query('See [[release pl')).toBe('release pl');
        expect(query('[[')).toBe('');
    });

    it('ends at a closing bracket or a new line', () => {
        expect(query('See [[done]] and')).toBeUndefined();
        expect(query('[[first line\nsecond')).toBeUndefined();
    });
});

describe('docRefMarkdown', () => {
    it('links the title to the document page', () => {
        expect(docRefMarkdown({ id: ID, title: 'Release plan' })).toBe(`[Release plan](/document/${ID})`);
    });

    it('escapes what would end the link text, and folds line breaks', () => {
        expect(escapeLinkText('a [draft] \\ v2\nnotes')).toBe('a \\[draft\\] \\\\ v2 notes');
    });

    it('escapes inline markdown and HTML, so the title renders as typed', () => {
        expect(escapeLinkText('*a* _b_ `c` ~~d~~ <b>e</b> ![f] & g|h')).toBe(
            '\\*a\\* \\_b\\_ \\`c\\` \\~\\~d\\~\\~ \\<b\\>e\\</b\\> \\!\\[f\\] \\& g\\|h');
        expect(docRefMarkdown({ id: ID, title: 'Q3 [draft]' })).toBe(`[Q3 \\[draft\\]](/document/${ID})`);
    });

    it('names an untitled document', () => {
        expect(docRefMarkdown({ id: ID, title: '' })).toBe(`[Untitled](/document/${ID})`);
    });

    it('encodes the id into the path', () => {
        expect(documentHref('a/b')).toBe('/document/a%2Fb');
    });
});

describe('documentIdFromHref', () => {
    it('reads a relative document link', () => {
        expect(documentIdFromHref(`/document/${ID}`, ORIGIN)).toBe(ID);
        expect(documentIdFromHref(`/document/${ID}/`, ORIGIN)).toBe(ID);
    });

    it('reads this app\'s own absolute URL, query and hash aside', () => {
        expect(documentIdFromHref(`${ORIGIN}/document/${ID}?tab=1#top`, ORIGIN)).toBe(ID);
    });

    it('ignores another server\'s document', () => {
        expect(documentIdFromHref(`https://elsewhere.example/document/${ID}`, ORIGIN)).toBeNull();
        expect(documentIdFromHref(`//elsewhere.example/document/${ID}`, ORIGIN)).toBeNull();
    });

    it('ignores other pages and other schemes', () => {
        expect(documentIdFromHref('/issue/CHT-1', ORIGIN)).toBeNull();
        expect(documentIdFromHref(`/document/${ID}/edit`, ORIGIN)).toBeNull();
        expect(documentIdFromHref(`document/${ID}`, ORIGIN)).toBeNull();
        expect(documentIdFromHref('/documents', ORIGIN)).toBeNull();
        expect(documentIdFromHref('mailto:a@example.com', ORIGIN)).toBeNull();
        expect(documentIdFromHref('', ORIGIN)).toBeNull();
        expect(documentIdFromHref(null, ORIGIN)).toBeNull();
    });

    it('takes only an id, so an encoded path cannot steer the fetch', () => {
        expect(documentIdFromHref('/document/..%2Fusers%2Fme', ORIGIN)).toBeNull();
        expect(documentIdFromHref('/document/a%2Fb', ORIGIN)).toBeNull();
        expect(documentIdFromHref('/document/%2E%2E', ORIGIN)).toBeNull();
        expect(documentIdFromHref('/document/d1', ORIGIN)).toBe('d1');
    });

    it('survives a malformed escape', () => {
        expect(documentIdFromHref('/document/%E0%A4%A', ORIGIN)).toBeNull();
    });
});

describe('markDocumentLinks', () => {
    it('makes a document link open in the app, and leaves other links alone', () => {
        const t = document.createElement('template');
        t.innerHTML = `<a href="/document/${ID}">Plan</a> <a href="https://example.com">x</a>`;
        markDocumentLinks(t.content);
        const [doc, other] = t.content.querySelectorAll('a');
        expect(doc.classList.contains('doc-link')).toBe(true);
        expect(doc.dataset.action).toBe('open-linked-document');
        expect(doc.dataset.documentId).toBe(ID);
        expect(doc.getAttribute('href')).toBe(`/document/${ID}`);
        expect(other.className).toBe('');
        expect(other.dataset.action).toBeUndefined();
    });

    it('takes the document chip off a link that is not a document\'s', () => {
        const t = document.createElement('template');
        t.innerHTML = '<a class="doc-link" href="https://elsewhere.example/x">x</a><a class="doc-link other">y</a>';
        markDocumentLinks(t.content);
        const [a, b] = t.content.querySelectorAll('a');
        expect(a.hasAttribute('class')).toBe(false);
        expect(b.className).toBe('other');
    });
});

describe('rendered markdown (CHT-2120)', () => {
    const render = (md) => {
        const div = document.createElement('div');
        div.innerHTML = renderDescriptionContent(md);
        return div;
    };

    it('renders a reference as a document link', () => {
        const a = render(`Spec: [Release plan](/document/${ID}) for CHT-12.`).querySelector('a.doc-link');
        expect(a.textContent).toBe('Release plan');
        expect(a.dataset.documentId).toBe(ID);
    });

    it('renders an escaped title the way it was typed', () => {
        const a = render(docRefMarkdown({ id: ID, title: 'Q3 [draft]' })).querySelector('a.doc-link');
        expect(a.textContent).toBe('Q3 [draft]');
    });

    it('keeps an issue key in the title inside the document link', () => {
        const div = render(docRefMarkdown({ id: ID, title: 'CHT-12 design' }));
        const links = div.querySelectorAll('a');
        expect(links).toHaveLength(1);
        expect(links[0].classList.contains('doc-link')).toBe(true);
        expect(links[0].textContent).toBe('CHT-12 design');
    });

    it('renders a title with markdown in it as typed', () => {
        const a = render(docRefMarkdown({ id: ID, title: '*Draft* <b>v2</b> `x`' })).querySelector('a.doc-link');
        expect(a.textContent).toBe('*Draft* <b>v2</b> `x`');
        expect(a.children).toHaveLength(0);
    });

    it('marks a pasted URL of this app\'s document', () => {
        const a = render(`${ORIGIN}/document/${ID}`).querySelector('a');
        expect(a.classList.contains('doc-link')).toBe(true);
    });

    it('does the same in comments', () => {
        const div = document.createElement('div');
        div.innerHTML = renderCommentContent(`[Plan](/document/${ID})`);
        expect(div.querySelector('a.doc-link')).not.toBeNull();
    });

    it('leaves a reference shown as code as code', () => {
        const div = render(`\`[Plan](/document/${ID})\``);
        expect(div.querySelector('a')).toBeNull();
        expect(div.querySelector('code').textContent).toBe(`[Plan](/document/${ID})`);
    });

    it('sets its own action over any the content tried to bring', () => {
        const a = render(`<a href="/document/${ID}" data-action="delete-attachment" data-attachment-id="x">Plan</a>`).querySelector('a');
        expect(a.dataset.action).toBe('open-linked-document');
        expect(a.dataset.attachmentId).toBeUndefined();
    });
});

describe('docRefSuggestions', () => {
    beforeEach(() => {
        api.getDocuments.mockReset();
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
    });

    it('searches the team\'s documents by title, a few at a time', async () => {
        api.getDocuments.mockResolvedValue([
            { id: 'd1', title: 'Release plan', icon: '📄', content: 'long' },
            { id: 'd2', title: null },
            { id: 'd3', title: '  Two\nlines ' },
            { id: 'd4', title: '   ' },
        ]);
        expect(await docRefSuggestions(' release ')).toEqual([
            { id: 'd1', title: 'Release plan', icon: '📄' },
            { id: 'd2', title: 'Untitled', icon: null },
            { id: 'd3', title: 'Two lines', icon: null },
            { id: 'd4', title: 'Untitled', icon: null },
        ]);
        expect(api.getDocuments).toHaveBeenCalledWith('team-1', null, 'release', null, 6);
    });

    it('lists recent documents for an empty query', async () => {
        api.getDocuments.mockResolvedValue([]);
        await docRefSuggestions('');
        expect(api.getDocuments).toHaveBeenCalledWith('team-1', null, null, null, 6);
    });

    it('offers nothing without a team, or when the search fails', async () => {
        getCurrentTeam.mockReturnValue(null);
        expect(await docRefSuggestions('x')).toEqual([]);
        expect(api.getDocuments).not.toHaveBeenCalled();
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        api.getDocuments.mockRejectedValue(new Error('offline'));
        expect(await docRefSuggestions('x')).toEqual([]);
    });
});
