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
    initAttachmentImages, _resetAttachmentsForTest, setupAttachmentDrop, uploadRefusal,
    handleAuxClick, MAX_UPLOAD_BYTES, _timing,
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

    it('drops data-* from content, so a comment cannot plant a working control', () => {
        const html = renderCommentContent([
            `<button data-action="delete-attachment" data-attachment-id="${ID}" data-filename="old">Show more</button>`,
            '<label>Logs<input type="file" data-action="pick-attachments" data-issue-id="other"></label>',
            '<button data-action="approve-ritual" data-ritual-id="r1">Looks good</button>',
            `<img data-attachment-id="${ID2}" data-attachment-state="loaded">`,
            '',
            `![shot.png](${PATH})`,
        ].join('\n'));
        const div = document.createElement('div');
        div.innerHTML = html;
        expect(div.querySelectorAll('[data-action]:not(img.attachment-inline)')).toHaveLength(0);
        expect(div.querySelectorAll('[data-attachment-state], [data-ritual-id], [data-issue-id]')).toHaveLength(0);
        // What the app adds after sanitising is still there.
        const marked = div.querySelectorAll('img.attachment-inline');
        expect(marked).toHaveLength(1);
        expect(marked[0].dataset.attachmentId).toBe(ID);
        expect(marked[0].dataset.action).toBe('open-attachment');
    });

    it('an inline image is a labelled control; inside a link, the link is', () => {
        const div = document.createElement('div');
        div.innerHTML = renderCommentContent(`![shot.png](${PATH})\n\n[![wrapped.png](${PATH})](${PATH})`);
        const [alone, wrapped] = div.querySelectorAll('img');
        expect(alone.getAttribute('role')).toBe('button');
        expect(alone.getAttribute('aria-label')).toBe('View shot.png');
        expect(alone.getAttribute('tabindex')).toBe('0');
        expect(wrapped.hasAttribute('data-action')).toBe(false);
        expect(wrapped.hasAttribute('tabindex')).toBe(false);
        expect(wrapped.dataset.attachmentId).toBe(ID);
        const link = wrapped.closest('a');
        expect(link.dataset.action).toBe('open-attachment');
        expect(link.dataset.attachmentRef).toBe(ID);
    });

    it('still links issue ids and mentions', () => {
        const html = renderCommentContent(`CHT-1 @sam ![a](${PATH})`);
        expect(html).toContain('href="/issue/CHT-1"');
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

    it('marks an empty list so it can hide, but not a failed one (CHT-2093)', () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], { userId: 'u1' });
        expect(document.getElementById('issue-attachments').classList.contains('is-empty')).toBe(true);
        document.body.innerHTML = renderAttachmentsSection('i1', null, { userId: 'u1' });
        expect(document.getElementById('issue-attachments').classList.contains('is-empty')).toBe(false);
        document.body.innerHTML = renderAttachmentsSection('i1', [png], { userId: 'u1' });
        expect(document.getElementById('issue-attachments').classList.contains('is-empty')).toBe(false);
    });

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

describe('the strip keeps focus and its live region', () => {
    const tile = (id, name) => ({ id, issue_id: 'i1', uploader_id: 'u1', uploader_name: 'Sam', filename: name, content_type: 'application/pdf', size: 10, created_at: new Date().toISOString() });
    const ID3 = '9b2e5a3c-1d4f-4e6a-8b7c-0a1b2c3d4e5f';

    beforeEach(() => vi.spyOn(window, 'confirm').mockReturnValue(true));

    it('after a delete, focus moves to the next tile, then the previous, then the heading', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [tile(ID, 'a.pdf'), tile(ID2, 'b.pdf'), tile(ID3, 'c.pdf')], { userId: 'u1' });
        const status = document.querySelector('.attachments-status');
        api.deleteAttachment.mockResolvedValue(null);
        await deleteAttachment(ID2, 'b.pdf');
        expect(document.activeElement.dataset.attachmentId).toBe(ID3);
        expect(document.querySelector('.attachments-status')).toBe(status);
        expect(status.textContent).toBe('b.pdf deleted');
        await deleteAttachment(ID3, 'c.pdf');
        expect(document.activeElement.dataset.attachmentId).toBe(ID);
        await deleteAttachment(ID, 'a.pdf');
        expect(document.activeElement.id).toBe('attachments-heading');
        expect(document.querySelector('.section-count').textContent).toBe('');
    });

    it('an upload keeps the input (and its focus) and speaks through the same live region', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], { userId: 'u1' });
        const input = document.querySelector('input[type=file]');
        const status = document.querySelector('.attachments-status');
        input.focus();
        const said = [];
        new MutationObserver(() => said.push(status.textContent)).observe(status, { childList: true, characterData: true, subtree: true });
        api.uploadAttachment.mockResolvedValue(tile(ID, 'a.pdf'));
        await uploadAttachments('i1', [new File(['%PDF'], 'a.pdf', { type: 'application/pdf' })]);
        await flush();
        expect(document.querySelector('input[type=file]')).toBe(input);
        expect(document.activeElement).toBe(input);
        expect(document.querySelector('.attachments-status')).toBe(status);
        expect(said).toContain('Uploading a.pdf…');
        expect(status.textContent).toBe('1 file attached');
        expect(document.querySelector('.section-count').textContent).toBe('1');
    });
});

describe('checks before an upload', () => {
    const big = () => {
        const f = new File(['x'], 'big.pdf', { type: 'application/pdf' });
        Object.defineProperty(f, 'size', { value: MAX_UPLOAD_BYTES + 1 });
        return f;
    };

    it.each([
        ['over the limit', big(), /big\.pdf is 10\.0 MB; the limit is 10\.0 MB/],
        ['an SVG', new File(['<svg/>'], 'logo.svg', { type: 'image/svg+xml' }), /only PNG, JPEG, GIF, WebP, PDF or plain text/],
        ['a HEIC photo', new File(['x'], 'photo.heic', { type: 'image/heic' }), /can't be attached/],
        ['a video', new File(['x'], 'clip.mp4', { type: 'video/mp4' }), /can't be attached/],
        ['an archive', new File(['x'], 'logs.zip', { type: 'application/zip' }), /can't be attached/],
        ['a folder', new File([], 'photos', { type: '' }), /photos is empty or a folder/],
    ])('refuses %s without sending it', async (_label, file, message) => {
        expect(uploadRefusal(file)).toMatch(message);
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        expect(await uploadAttachments('i1', [file])).toBe(0);
        expect(api.uploadAttachment).not.toHaveBeenCalled();
        expect(showToast).toHaveBeenCalledWith(expect.stringMatching(message), 'error');
    });

    it.each([
        ['shot.png', 'image/png'], ['run.log', ''], ['notes.md', 'text/markdown'], ['trace.json', 'application/json'],
        ['config.yaml', 'application/x-yaml'], ['run.sh', 'application/x-sh'], ['main.py', 'text/x-python'],
        ['notes.xml', 'application/xml'], ['page.html', 'text/html'], ['data.bin', 'application/octet-stream'],
        ['report.pdf', 'application/pdf'],
    ])('sends %s (%s): the server, which reads the bytes, judges it', (name, type) => {
        // Any UTF-8 text is accepted by the server whatever it is called,
        // so no text-like type is refused here (`chaotic issue attach`
        // uploads the same files).
        expect(uploadRefusal(new File(['a'], name, { type }))).toBeNull();
    });

    it('the picker hides nothing the server would take', () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        expect(document.querySelector('input[type=file]').hasAttribute('accept')).toBe(false);
    });

    it('does not send a large body twice after a lost answer', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        const f = new File(['x'], 'scan.pdf', { type: 'application/pdf' });
        Object.defineProperty(f, 'size', { value: 5 * 1024 * 1024 });
        api.uploadAttachment.mockRejectedValue(Object.assign(new Error('net'), { isNetworkError: true }));
        api.getAttachments.mockResolvedValue([]);
        await uploadAttachments('i1', [f]);
        expect(api.uploadAttachment).toHaveBeenCalledTimes(1);
        // No answer: the list is asked again rather than reporting a failure.
        expect(api.getAttachments).toHaveBeenCalledWith('i1');
    });
});

describe('a resend that finds the first send still in progress (409 in flight)', () => {
    const inFlight = () => Object.assign(new Error('still being done'), { status: 409, detail: { error_code: 'idempotency_in_flight' } });
    const png = { id: ID, issue_id: 'i1', uploader_id: 'u1', filename: 'shot.png', content_type: 'image/png', size: 4, created_at: new Date().toISOString() };
    let saved;
    beforeEach(() => { saved = { ..._timing }; _timing.inFlightRetryMs = 0; });
    afterEach(() => Object.assign(_timing, saved));

    it('asks again under the same key and shows the file', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        api.uploadAttachment
            .mockRejectedValueOnce(Object.assign(new Error('net'), { isNetworkError: true }))
            .mockRejectedValueOnce(inFlight())
            .mockResolvedValueOnce(png);
        expect(await uploadAttachments('i1', [new File(['a'], 'shot.png', { type: 'image/png' })])).toBe(1);
        const keys = new Set(api.uploadAttachment.mock.calls.map(c => c[2].idempotencyKey));
        expect(api.uploadAttachment).toHaveBeenCalledTimes(3);
        expect(keys.size).toBe(1);
        expect(document.querySelectorAll('.attachment-item')).toHaveLength(1);
        expect(showApiError).not.toHaveBeenCalled();
    });

    it('still in flight after the tries: re-lists instead of reporting a failure', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        api.uploadAttachment
            .mockRejectedValueOnce(Object.assign(new Error('net'), { isNetworkError: true }))
            .mockRejectedValue(inFlight());
        api.getAttachments.mockResolvedValue([png]);
        await uploadAttachments('i1', [new File(['a'], 'shot.png', { type: 'image/png' })]);
        expect(showApiError).not.toHaveBeenCalled();
        expect(api.getAttachments).toHaveBeenCalledWith('i1');
        expect(document.querySelectorAll('.attachment-item')).toHaveLength(1);
    });

    it('a list that failed to load is asked again after an upload', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', null, {});
        api.uploadAttachment.mockResolvedValue(png);
        api.getAttachments.mockResolvedValue([png]);
        await uploadAttachments('i1', [new File(['a'], 'shot.png', { type: 'image/png' })]);
        expect(document.querySelector('.attachments-hint')).toBeNull();
        expect(document.querySelectorAll('.attachment-item')).toHaveLength(1);
    });

    it('a batch reports only on its own issue\'s strip, not on the one opened meanwhile', async () => {
        document.body.innerHTML = renderAttachmentsSection('A', [], {});
        let release;
        api.uploadAttachment.mockImplementation(() => new Promise(r => { release = () => r({ ...png, issue_id: 'A' }); }));
        const run = uploadAttachments('A', [new File(['a'], 'shot.png', { type: 'image/png' })]);
        await flush();
        // The user opens issue B while A's upload runs.
        document.body.innerHTML = renderAttachmentsSection('B', [], {});
        const statusB = document.querySelector('.attachments-status');
        release();
        await run;
        expect(statusB.textContent).toBe('');
        expect(document.querySelectorAll('.attachment-item')).toHaveLength(0);
        expect(document.querySelector('.attachments-hint')).not.toBeNull();
    });

    it('two drops run one after the other', async () => {
        document.body.innerHTML = renderAttachmentsSection('i1', [], {});
        const order = [];
        api.uploadAttachment.mockImplementation(async (_i, file) => {
            order.push(`start ${file.name}`);
            await flush();
            order.push(`end ${file.name}`);
            return { ...png, id: file.name === 'a.png' ? ID : ID2, filename: file.name };
        });
        await Promise.all([
            uploadAttachments('i1', [new File(['a'], 'a.png', { type: 'image/png' })]),
            uploadAttachments('i1', [new File(['b'], 'b.png', { type: 'image/png' })]),
        ]);
        expect(order).toEqual(['start a.png', 'end a.png', 'start b.png', 'end b.png']);
    });
});

describe('drag and drop', () => {
    let controller;
    const drag = (type, target, { files = [], types = ['Files'], relatedTarget = null } = {}) => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'dataTransfer', { value: { types, files, dropEffect: 'none' } });
        Object.defineProperty(event, 'relatedTarget', { value: relatedTarget });
        target.dispatchEvent(event);
        return event;
    };

    beforeEach(() => {
        document.body.innerHTML = `<aside id="side"></aside><div class="detail-main"><p id="inside"></p>${renderAttachmentsSection('i1', [], {})}</div>`;
        controller = new AbortController();
        setupAttachmentDrop(document.querySelector('.detail-main'), 'i1', controller.signal);
        api.uploadAttachment.mockResolvedValue({ id: ID, issue_id: 'i1', filename: 'a.png', content_type: 'image/png', size: 1, created_at: new Date().toISOString() });
    });
    afterEach(() => controller.abort());

    it('a file dragged over the column highlights the strip and can drop', () => {
        const event = drag('dragover', document.getElementById('inside'));
        expect(event.defaultPrevented).toBe(true);
        expect(document.getElementById('issue-attachments').classList.contains('is-dragover')).toBe(true);
        drag('dragleave', document.querySelector('.detail-main'), { relatedTarget: document.getElementById('side') });
        expect(document.getElementById('issue-attachments').classList.contains('is-dragover')).toBe(false);
    });

    it('a drag of text, not files, is left alone', () => {
        const event = drag('dragover', document.getElementById('inside'), { types: ['text/plain'] });
        expect(event.defaultPrevented).toBe(false);
        expect(document.getElementById('issue-attachments').classList.contains('is-dragover')).toBe(false);
    });

    it('a drop uploads the files and clears the highlight', async () => {
        drag('dragover', document.getElementById('inside'));
        const file = new File(['a'], 'a.png', { type: 'image/png' });
        const event = drag('drop', document.getElementById('inside'), { files: [file] });
        expect(event.defaultPrevented).toBe(true);
        expect(document.getElementById('issue-attachments').classList.contains('is-dragover')).toBe(false);
        await flush();
        expect(api.uploadAttachment).toHaveBeenCalledWith('i1', file, expect.any(Object));
    });

    it('a drop outside the column is refused, not opened by the browser', async () => {
        const event = drag('drop', document.getElementById('side'), { files: [new File(['a'], 'a.png', { type: 'image/png' })] });
        expect(event.defaultPrevented).toBe(true);
        await flush();
        expect(api.uploadAttachment).not.toHaveBeenCalled();
    });

    it('never refuses a drop onto a file input, or one another target already took', () => {
        document.getElementById('side').innerHTML = '<input type="file" id="photo"><div id="zone2"></div>';
        expect(drag('drop', document.getElementById('photo')).defaultPrevented).toBe(false);
        const zone2 = document.getElementById('zone2');
        zone2.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
        const over = new Event('dragover', { bubbles: true, cancelable: true });
        const dt = { types: ['Files'], files: [], dropEffect: 'none' };
        Object.defineProperty(over, 'dataTransfer', { value: dt });
        zone2.dispatchEvent(over);
        expect(dt.dropEffect).toBe('copy');
    });

    it('the page-wide guard goes once the issue page is left', () => {
        // Navigating away hides the detail view; it is not torn down.
        document.querySelector('.detail-main').classList.add('hidden');
        expect(drag('drop', document.getElementById('side'), { files: [new File(['a'], 'a.png')] }).defaultPrevented).toBe(false);
        // And it does not come back when the view shows again (the next
        // render sets up its own).
        document.querySelector('.detail-main').classList.remove('hidden');
        expect(drag('drop', document.getElementById('side'), { files: [new File(['a'], 'a.png')] }).defaultPrevented).toBe(false);
    });

    it('the listeners go with the page', () => {
        controller.abort();
        const event = drag('dragover', document.getElementById('inside'));
        expect(event.defaultPrevented).toBe(false);
    });
});

describe('keyboard, middle click and the viewer', () => {
    it('Enter on a linked attachment image opens it with the token, not the raw address', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        const div = document.createElement('div');
        div.innerHTML = renderCommentContent(`[![w.png](${PATH})](${PATH})`);
        document.body.appendChild(div);
        const link = div.querySelector('a');
        const click = { type: 'click', preventDefault: vi.fn() };
        actions['open-attachment'](click, link.dataset, link);
        expect(click.preventDefault).toHaveBeenCalled();
        await flush();
        expect(api.fetchAttachmentContent).toHaveBeenCalledWith(ID);
        expect(showModal).toHaveBeenCalled();
    });

    it('a middle click on an attachment link opens it here', async () => {
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        document.body.innerHTML += `<p><a href="${PATH}" class="attachment-link" data-action="open-attachment" data-attachment-ref="${ID}">s</a></p>`;
        const event = new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 });
        document.querySelector('a.attachment-link').dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
        handleAuxClick({ button: 1, target: document.querySelector('a.attachment-link'), preventDefault: () => { event.handled = true; } });
        expect(event.handled).toBe(true);
        initAttachmentImages();
        const second = new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 });
        document.querySelector('a.attachment-link').dispatchEvent(second);
        expect(second.defaultPrevented).toBe(true);
    });

    it('the viewer takes focus, and drops its image (and URL) when the modal closes', async () => {
        document.body.innerHTML = '<div id="modal-overlay" class="modal-overlay hidden"><div class="modal"><h3 id="modal-title"></h3><div id="modal-content"></div></div></div>';
        showModal.mockImplementation(() => document.getElementById('modal-overlay').classList.remove('hidden'));
        api.fetchAttachmentContent.mockResolvedValue(pngBlob());
        await openAttachment(ID, { filename: 'shot.png', contentType: 'image/png' });
        await flush();
        expect(document.activeElement.textContent).toBe('Download');
        expect(document.querySelector('#modal-content img').getAttribute('src')).toBe('blob:test/1');
        document.getElementById('modal-overlay').classList.add('hidden');
        await flush();
        expect(document.querySelector('#modal-content .attachment-viewer')).toBeNull();
        expect(revoked).toEqual(['blob:test/1']);
        showModal.mockReset();
    });
});

describe('formatFileSize', () => {
    it.each([[0, '0 B'], [512, '512 B'], [1536, '1.5 KB'], [20480, '20 KB'], [10 * 1024 * 1024, '10.0 MB']])('%d -> %s', (n, s) => {
        expect(formatFileSize(n)).toBe(s);
    });
});
