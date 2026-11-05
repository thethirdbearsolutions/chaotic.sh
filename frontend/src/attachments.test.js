/**
 * Attachments on the issue page (CHT-1996): which references get the
 * token, the blob loader and its revocation, the strip, upload and delete.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        fetchAttachmentContent: vi.fn(),
        uploadAttachment: vi.fn(),
        deleteAttachment: vi.fn(),
        getAttachments: vi.fn(),
    },
}));
vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
    showToast: vi.fn(),
    showApiError: vi.fn(),
}));
vi.mock('./event-delegation.js', () => ({ registerActions: vi.fn() }));

import { api } from './api.js';
import { showApiError, showModal, showToast } from './ui.js';
import { registerActions } from './event-delegation.js';
import { attachmentIdFromUrl, markAttachmentRefs } from './attachment-refs.js';
import { renderCommentContent, renderDescriptionContent } from './rich-text.js';
import { renderMarkdown } from './gate-approvals.js';
import {
    hydrateAttachments, releaseUnused, renderAttachmentsSection, uploadAttachments,
    deleteAttachment, openAttachment, formatFileSize, rememberAttachments,
    initAttachmentImages, _resetAttachmentsForTest,
} from './attachments.js';

const actions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

const ID = '0f8fad5b-d9cb-469f-a165-70867728950e';
const ID2 = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const PATH = `/api/attachments/${ID}/content`;

const flush = () => new Promise(resolve => setTimeout(resolve, 0));
const pngBlob = () => new Blob([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], { type: 'image/png' });

let created;
let revoked;

beforeEach(() => {
    _resetAttachmentsForTest();
    document.body.innerHTML = '<div id="modal-title"></div><div id="modal-content"></div>';
    vi.clearAllMocks();
    created = [];
    revoked = [];
    let n = 0;
    URL.createObjectURL = vi.fn(() => { const url = `blob:test/${++n}`; created.push(url); return url; });
    URL.revokeObjectURL = vi.fn(url => revoked.push(url));
});

afterEach(() => {
    _resetAttachmentsForTest();
});

describe('attachmentIdFromUrl: who gets the token', () => {
    it('takes this server\'s attachment content path', () => {
        expect(attachmentIdFromUrl(PATH)).toBe(ID);
        expect(attachmentIdFromUrl(`${window.location.origin}${PATH}`)).toBe(ID);
    });

    it.each([
        ['another origin', `https://example.com${PATH}`],
        ['a protocol-relative URL', `//example.com${PATH}`],
        ['a backslash host', `\\\\example.com${PATH}`],
        ['a query', `${PATH}?x=1`],
        ['a fragment', `${PATH}#x`],
        ['a different route', `/api/attachments/${ID}`],
        ['a path that climbs', `/api/attachments/${ID}/content/../../users/me`],
        ['an encoded id', `/api/attachments/%30f8fad5b-d9cb-469f-a165-70867728950e/content`],
        ['an upper-case id', `/api/attachments/${ID.toUpperCase()}/content`],
        ['a short id', '/api/attachments/abc/content'],
        ['a prefix', `/x/api/attachments/${ID}/content`],
        ['credentials', `${window.location.protocol}//u:p@${window.location.host}${PATH}`],
        ['a data URL', 'data:image/png;base64,AAAA'],
        ['javascript', 'javascript:alert(1)'],
        ['empty', ''],
        ['null', null],
    ])('refuses %s', (_label, url) => {
        expect(attachmentIdFromUrl(url)).toBeNull();
    });
});

describe('markAttachmentRefs', () => {
    it('takes the src off an attachment image and leaves other images alone', () => {
        const t = document.createElement('template');
        t.innerHTML = `<p><img src="${PATH}" alt="shot.png"><img src="https://example.com${PATH}" alt="ext"></p>`;
        markAttachmentRefs(t.content);
        const [mine, ext] = t.content.querySelectorAll('img');
        expect(mine.hasAttribute('src')).toBe(false);
        expect(mine.dataset.attachmentId).toBe(ID);
        expect(mine.dataset.action).toBe('open-attachment');
        expect(ext.getAttribute('src')).toBe(`https://example.com${PATH}`);
        expect(ext.dataset.attachmentId).toBeUndefined();
    });

    it('makes an attachment link open with the token', () => {
        const t = document.createElement('template');
        t.innerHTML = `<a href="${PATH}">report.pdf</a> <a href="https://example.com/">x</a>`;
        markAttachmentRefs(t.content);
        const [mine, other] = t.content.querySelectorAll('a');
        expect(mine.dataset.attachmentRef).toBe(ID);
        expect(mine.dataset.action).toBe('open-attachment');
        expect(other.dataset.action).toBeUndefined();
    });
});

describe('rendered markdown', () => {
    it('a comment\'s attachment image arrives without a src, marked for loading', () => {
        const html = renderCommentContent(`Fixed, see ![shot.png](${PATH})`);
        const div = document.createElement('div');
        div.innerHTML = html;
        const img = div.querySelector('img');
        expect(img.hasAttribute('src')).toBe(false);
        expect(img.getAttribute('data-attachment-id')).toBe(ID);
        expect(img.getAttribute('alt')).toBe('shot.png');
    });

    it('an external image keeps its src and gets no attachment marking', () => {
        const html = renderDescriptionContent('![x](https://example.com/x.png)');
        expect(html).toContain('src="https://example.com/x.png"');
        expect(html).not.toContain('data-attachment-id');
    });

    it('every markdown surface marks them, not only comments (revisions, notes, prompts)', () => {
        const html = renderMarkdown(`![a](${PATH}) [b](${PATH})`);
        expect(html).not.toContain(`src="${PATH}"`);
        expect(html).toContain(`data-attachment-id="${ID}"`);
        expect(html).toContain(`data-attachment-ref="${ID}"`);
    });

    it('still links issue ids and mentions', () => {
        const html = renderCommentContent(`CHT-1 @sam ![a](${PATH})`);
        expect(html).toContain('href="#/issue/CHT-1"');
        expect(html).toContain('class="mention"');
    });
});

describe('hydrateAttachments', () => {
    it('loads an image with the token into a blob URL', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        document.body.innerHTML += `<img data-attachment-id="${ID}" alt="shot.png">`;
        hydrateAttachments();
        await flush();
        const img = document.querySelector('img');
        expect(api.fetchAttachmentContent).toHaveBeenCalledWith(ID);
        expect(img.getAttribute('src')).toBe('blob:test/1');
        expect(img.dataset.attachmentState).toBe('loaded');
    });

    it('fetches once for two copies of one attachment and shares the URL', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        document.body.innerHTML += `<img data-attachment-id="${ID}"><img data-attachment-id="${ID}">`;
        hydrateAttachments();
        await flush();
        expect(api.fetchAttachmentContent).toHaveBeenCalledTimes(1);
        const srcs = [...document.querySelectorAll('img')].map(i => i.getAttribute('src'));
        expect(srcs).toEqual(['blob:test/1', 'blob:test/1']);
    });

    it('never shows a non-image inline: a listed PDF becomes a link without a fetch', () => {
        rememberAttachments([{ id: ID, content_type: 'application/pdf', filename: 'report.pdf' }]);
        document.body.innerHTML += `<p><img data-attachment-id="${ID}" alt="report.pdf"></p>`;
        hydrateAttachments();
        expect(api.fetchAttachmentContent).not.toHaveBeenCalled();
        expect(document.querySelector('img')).toBeNull();
        const link = document.querySelector('a.attachment-link');
        expect(link.dataset.attachmentRef).toBe(ID);
        expect(link.textContent).toContain('report.pdf');
    });

    it('an unlisted file that turns out to be text becomes a link, with no blob URL', async () => {
        api.fetchAttachmentContent.mockResolvedValue(new Blob(['hi'], { type: 'text/plain; charset=utf-8' }));
        document.body.innerHTML += `<p><img data-attachment-id="${ID}" alt="log.txt"></p>`;
        hydrateAttachments();
        await flush();
        expect(URL.createObjectURL).not.toHaveBeenCalled();
        expect(document.querySelector('img')).toBeNull();
        expect(document.querySelector('a.attachment-link').textContent).toContain('log.txt');
    });

    it('a missing file says so instead of a broken image', async () => {
        api.fetchAttachmentContent.mockRejectedValue(Object.assign(new Error('gone'), { status: 410 }));
        document.body.innerHTML += `<p><img data-attachment-id="${ID}" alt="shot.png"></p>`;
        hydrateAttachments();
        await flush();
        expect(document.querySelector('.attachment-unavailable').textContent).toBe('shot.png: file no longer stored');
    });

    it('a failed load is not cached: the next render asks again', async () => {
        api.fetchAttachmentContent.mockRejectedValueOnce(new Error('offline')).mockResolvedValue(pngBlob());
        document.body.innerHTML += `<p><img data-attachment-id="${ID}"></p>`;
        hydrateAttachments();
        await flush();
        document.body.innerHTML += `<p><img data-attachment-id="${ID}"></p>`;
        hydrateAttachments();
        await flush();
        expect(api.fetchAttachmentContent).toHaveBeenCalledTimes(2);
        expect(document.querySelector('img').getAttribute('src')).toBe('blob:test/1');
    });

    it('ignores an id that is not an attachment id', () => {
        document.body.innerHTML += '<img data-attachment-id="../../users/me">';
        hydrateAttachments();
        expect(api.fetchAttachmentContent).not.toHaveBeenCalled();
    });
});

describe('releasing blob URLs', () => {
    it('revokes a URL once nothing on the page shows it', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        document.body.innerHTML += `<div id="a"><img data-attachment-id="${ID}"></div><div id="b"><img data-attachment-id="${ID}"></div>`;
        hydrateAttachments();
        await flush();
        document.getElementById('a').remove();
        releaseUnused();
        expect(revoked).toEqual([]);
        document.getElementById('b').remove();
        releaseUnused();
        expect(revoked).toEqual(['blob:test/1']);
    });

    it('a load that finishes after its image left makes no URL', async () => {
        let resolve;
        api.fetchAttachmentContent.mockReturnValue(new Promise(r => { resolve = r; }));
        document.body.innerHTML += `<div id="a"><img data-attachment-id="${ID}"></div>`;
        hydrateAttachments();
        document.getElementById('a').remove();
        releaseUnused();
        resolve(pngBlob());
        await flush();
        expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('the observer loads new references and releases removed ones', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        initAttachmentImages();
        const host = document.createElement('div');
        host.innerHTML = renderCommentContent(`![s](${PATH})`);
        document.body.appendChild(host);
        await flush();
        await flush();
        expect(host.querySelector('img').getAttribute('src')).toBe('blob:test/1');
        host.innerHTML = '<p>re-rendered</p>';
        await flush();
        expect(revoked).toEqual(['blob:test/1']);
    });
});

describe('the Attachments strip', () => {
    const png = { id: ID, issue_id: 'i1', uploader_id: 'u1', uploader_name: 'Sam', filename: 'shot.png', content_type: 'image/png', size: 2048, created_at: new Date().toISOString() };
    const pdf = { id: ID2, issue_id: 'i1', uploader_id: 'u2', uploader_name: 'Ana', filename: 'report.pdf', content_type: 'application/pdf', size: 3 * 1024 * 1024, created_at: new Date().toISOString() };

    it('shows name, size, uploader and time; an image gets a thumbnail', () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [png, pdf], { userId: 'u1' });
        const items = document.querySelectorAll('.attachment-item');
        expect(items).toHaveLength(2);
        expect(items[0].querySelector('.attachment-name').textContent).toBe('shot.png');
        expect(items[0].querySelector('.attachment-meta').textContent).toMatch(/^2\.0 KB · Sam · /);
        expect(items[0].querySelector('.attachment-thumb img').dataset.attachmentId).toBe(ID);
        expect(items[1].querySelector('.attachment-thumb img')).toBeNull();
        expect(items[1].querySelector('.attachment-meta').textContent).toContain('3.0 MB');
        expect(document.querySelector('h3 .section-count').textContent).toBe('2');
    });

    it('offers delete to the uploader, and to an admin for everything', () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [png, pdf], { userId: 'u1' });
        expect([...document.querySelectorAll('.attachment-delete')].map(b => b.dataset.attachmentId)).toEqual([ID]);
        document.body.innerHTML = renderAttachmentsSection('i1', [png, pdf], { userId: 'u9', isAdmin: true });
        expect(document.querySelectorAll('.attachment-delete')).toHaveLength(2);
        document.body.innerHTML = renderAttachmentsSection('i1', [png, pdf], { userId: null });
        expect(document.querySelectorAll('.attachment-delete')).toHaveLength(0);
    });

    it('escapes file and uploader names', () => {
        const evil = { ...png, filename: '<img src=x onerror=alert(1)>.png', uploader_name: '<b>x</b>' };
        document.body.innerHTML = renderAttachmentsSection('i1', [evil], {});
        expect(document.querySelectorAll('img[onerror]')).toHaveLength(0);
        expect(document.querySelector('.attachment-name').textContent).toBe(evil.filename);
    });

    it('says when the list could not be loaded, and invites a drop when empty', () => {
        document.body.innerHTML = renderAttachmentsSection('i1', null, {});
        expect(document.querySelector('.attachments-hint').textContent).toMatch(/could not be loaded/);
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        expect(document.querySelector('.attachments-hint').textContent).toMatch(/Drop files here/);
    });

    it('uploads each file with its own Idempotency-Key and shows it', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], { userId: 'u1' });
        api.uploadAttachment.mockImplementation(async (_issue, file) => ({ ...png, id: file.name === 'a.png' ? ID : ID2, filename: file.name }));
        const files = [new File(['a'], 'a.png'), new File(['b'], 'b.png')];
        expect(await uploadAttachments('i1', files)).toBe(2);
        const keys = api.uploadAttachment.mock.calls.map(c => c[2].idempotencyKey);
        expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
        expect(keys[0]).not.toBe(keys[1]);
        expect([...document.querySelectorAll('.attachment-name')].map(n => n.textContent)).toEqual(['a.png', 'b.png']);
        expect(showToast).toHaveBeenCalledWith('2 files attached', 'success');
    });

    it('resends after a lost answer with the same key, and only then', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        api.uploadAttachment
            .mockRejectedValueOnce(Object.assign(new Error('net'), { isNetworkError: true }))
            .mockResolvedValueOnce(png);
        await uploadAttachments('i1', [new File(['a'], 'shot.png')]);
        const [first, second] = api.uploadAttachment.mock.calls;
        expect(second[2].idempotencyKey).toBe(first[2].idempotencyKey);

        api.uploadAttachment.mockReset().mockRejectedValue(Object.assign(new Error('Unsupported'), { status: 415 }));
        await uploadAttachments('i1', [new File(['a'], 'x.svg')]);
        expect(api.uploadAttachment).toHaveBeenCalledTimes(1);
        expect(showApiError).toHaveBeenCalledWith('attach x.svg', expect.any(Error));
    });

    it('a refused file does not stop the next one', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        api.uploadAttachment
            .mockRejectedValueOnce(Object.assign(new Error('too large'), { status: 413 }))
            .mockResolvedValueOnce(png);
        expect(await uploadAttachments('i1', [new File(['a'], 'big.png'), new File(['b'], 'shot.png')])).toBe(1);
        expect(document.querySelectorAll('.attachment-item')).toHaveLength(1);
    });

    it('deletes after a confirm and drops it from the strip', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [png, pdf], { isAdmin: true });
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        api.deleteAttachment.mockResolvedValue(null);
        expect(await deleteAttachment(ID, 'shot.png')).toBe(true);
        expect(api.deleteAttachment).toHaveBeenCalledWith(ID);
        expect([...document.querySelectorAll('.attachment-name')].map(n => n.textContent)).toEqual(['report.pdf']);
    });

    it('a cancelled confirm deletes nothing', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(false);
        expect(await deleteAttachment(ID, 'shot.png')).toBe(false);
        expect(api.deleteAttachment).not.toHaveBeenCalled();
    });

    it('the file input uploads what was picked, on change only', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        api.uploadAttachment.mockResolvedValue(png);
        const input = document.querySelector('input[type=file]');
        const file = new File(['a'], 'shot.png');
        Object.defineProperty(input, 'files', { value: [file], configurable: true });
        actions['pick-attachments']({ type: 'click' }, input.dataset, input);
        expect(api.uploadAttachment).not.toHaveBeenCalled();
        actions['pick-attachments']({ type: 'change' }, input.dataset, input);
        await flush();
        expect(api.uploadAttachment).toHaveBeenCalledWith('i1', file, expect.any(Object));
    });
});

describe('opening an attachment', () => {
    it('shows an image in the viewer', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        await openAttachment(ID, { filename: 'shot.png', contentType: 'image/png' });
        expect(showModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('shot.png');
        await flush();
        expect(document.querySelector('#modal-content img').getAttribute('src')).toBe('blob:test/1');
    });

    it('downloads anything else, with the token, under its name', async () => {
        api.fetchAttachmentContent.mockResolvedValue(new Blob(['%PDF'], { type: 'application/pdf' }));
        const clicked = [];
        vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () { clicked.push(this.download); });
        await openAttachment(ID, { filename: 'report.pdf', contentType: 'application/pdf' });
        await flush();
        expect(showModal).not.toHaveBeenCalled();
        expect(clicked).toEqual(['report.pdf']);
    });

    it('a click on a marked link is taken over; a drag over it is not', () => {
        const link = document.createElement('a');
        link.setAttribute('data-attachment-ref', ID);
        const prevent = vi.fn();
        actions['open-attachment']({ type: 'dragover', preventDefault: prevent }, link.dataset, link);
        expect(prevent).not.toHaveBeenCalled();
        actions['open-attachment']({ type: 'keydown', preventDefault: prevent }, link.dataset, link);
        expect(prevent).not.toHaveBeenCalled();
        actions['open-attachment']({ type: 'click', preventDefault: prevent }, link.dataset, link);
        expect(prevent).toHaveBeenCalled();
    });
});

describe('formatFileSize', () => {
    it.each([[0, '0 B'], [512, '512 B'], [1536, '1.5 KB'], [20480, '20 KB'], [10 * 1024 * 1024, '10.0 MB']])('%d -> %s', (n, s) => {
        expect(formatFileSize(n)).toBe(s);
    });
});
