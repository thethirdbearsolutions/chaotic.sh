/**
 * Attachments on the issue page (CHT-1996): the Attachments strip, inline
 * images in comments and descriptions, upload, open and delete.
 *
 * Attachment bytes are served only with a credential. The web app holds a
 * bearer token, not a cookie, so every image is fetched with the token
 * (api.fetchAttachmentContent, which only ever builds
 * /api/attachments/<id>/content) and shown through a blob: URL. Which
 * references get that treatment is decided in attachment-refs.js.
 *
 * Blob URLs: one per attachment, shared by every <img> showing it, and
 * revoked as soon as no element in the document shows that attachment
 * (a re-render, another issue, a closed preview). A MutationObserver on
 * the document both loads new references wherever markdown is rendered
 * (comments, descriptions, the editor preview, epics, documents) and
 * releases the ones that left.
 *
 * Only PNG, JPEG, GIF and WebP are ever shown inline. Anything else (PDF,
 * text) is a link that downloads the file.
 */

import { api } from './api.js';
import { ATTACHMENT_ID_RE } from './attachment-refs.js';
import { escapeHtml, escapeAttr, formatTimeAgo } from './utils.js';
import { registerActions } from './event-delegation.js';
import { showModal, showToast, showApiError } from './ui.js';

export const INLINE_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

const ICON = {
    file: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    clip: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
    remove: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
};

// What the strip knows about each attachment it listed: id -> response.
// Lets an inline reference to a PDF become a link without fetching it.
const known = new Map();

// id -> { promise, url, type }: one fetch and one blob URL per attachment.
const blobs = new Map();

/** Remember attachments a list returned (their types and names). */
export function rememberAttachments(list) {
    for (const a of list || []) {
        if (a && ATTACHMENT_ID_RE.test(a.id)) known.set(a.id, a);
    }
}

function mediaType(type) {
    return String(type || '').split(';')[0].trim().toLowerCase();
}

/**
 * Fetch an attachment once and, when it is an inline image type, make
 * its blob URL. Resolves to the cache entry ({url: null} for any other
 * type: those bytes are dropped, not kept).
 */
function load(id) {
    let entry = blobs.get(id);
    if (entry) return entry.promise;
    entry = { promise: null, url: null, type: null };
    blobs.set(id, entry);
    entry.promise = api.fetchAttachmentContent(id).then((blob) => {
        entry.type = mediaType(blob.type);
        // Released while it loaded (nothing shows it any more): no URL.
        if (blobs.get(id) === entry && INLINE_IMAGE_TYPES.has(entry.type)) {
            entry.url = URL.createObjectURL(blob);
        }
        return entry;
    });
    entry.promise.catch(() => {
        // A failure is not cached: the next render asks again.
        if (blobs.get(id) === entry) blobs.delete(id);
    });
    return entry.promise;
}

function forget(id) {
    const entry = blobs.get(id);
    if (entry?.url) URL.revokeObjectURL(entry.url);
    blobs.delete(id);
}

/**
 * Revoke the blob URL of every attachment no <img> in the document shows
 * any more.
 */
export function releaseUnused() {
    for (const id of [...blobs.keys()]) {
        // ids are validated against ATTACHMENT_ID_RE, so safe in a selector.
        if (!document.querySelector(`img[data-attachment-id="${id}"]`)) forget(id);
    }
}

function attachmentPath(id) {
    return `/api/attachments/${id}/content`;
}

function downloadLink(id, name) {
    const link = document.createElement('a');
    link.className = 'attachment-link';
    link.href = attachmentPath(id);
    link.setAttribute('data-action', 'open-attachment');
    link.setAttribute('data-attachment-ref', id);
    if (name) link.setAttribute('data-filename', name);
    link.innerHTML = ICON.clip;
    link.append(` ${name || 'Download attachment'}`);
    return link;
}

function unavailable(error, name) {
    const span = document.createElement('span');
    span.className = 'attachment-unavailable';
    const why = error?.status === 410 ? 'file no longer stored'
        : (error?.status === 404 ? 'not found' : 'could not be loaded');
    span.textContent = `${name || 'Attachment'}: ${why}`;
    return span;
}

/**
 * Load every attachment <img> under `root` that has not been loaded yet.
 * @param {ParentNode} [root]
 */
export function hydrateAttachments(root = document) {
    const imgs = root.querySelectorAll('img[data-attachment-id]:not([data-attachment-state])');
    for (const img of imgs) {
        const id = img.getAttribute('data-attachment-id');
        if (!ATTACHMENT_ID_RE.test(id)) {
            img.setAttribute('data-attachment-state', 'invalid');
            continue;
        }
        const name = img.getAttribute('alt') || known.get(id)?.filename || '';
        const listed = known.get(id);
        if (listed && !INLINE_IMAGE_TYPES.has(mediaType(listed.content_type))) {
            // Never inline: a link, without fetching the file.
            img.replaceWith(downloadLink(id, listed.filename || name));
            continue;
        }
        img.setAttribute('data-attachment-state', 'loading');
        load(id).then((entry) => {
            if (entry.url) {
                img.src = entry.url;
                img.setAttribute('data-attachment-state', 'loaded');
            } else if (img.isConnected) {
                img.replaceWith(downloadLink(id, name));
            }
        }, (error) => {
            img.setAttribute('data-attachment-state', 'failed');
            if (img.isConnected && !img.closest('.attachment-thumb')) img.replaceWith(unavailable(error, name));
        }).finally(scheduleSweep);
    }
}

let sweepScheduled = false;
function scheduleSweep() {
    if (sweepScheduled) return;
    sweepScheduled = true;
    queueMicrotask(() => {
        sweepScheduled = false;
        // The page may be gone by then (a test environment torn down).
        if (typeof document === 'undefined') return;
        hydrateAttachments(document);
        releaseUnused();
    });
}

let observer = null;
/** Start loading and releasing attachment images as the page changes. */
export function initAttachmentImages() {
    if (observer || typeof MutationObserver === 'undefined' || !document.body) return;
    observer = new MutationObserver(scheduleSweep);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('auxclick', handleAuxClick);
    scheduleSweep();
}

/** For tests: forget every cached file and stop observing. */
export function _resetAttachmentsForTest() {
    observer?.disconnect();
    observer = null;
    document.removeEventListener('auxclick', handleAuxClick);
    viewerWatch?.disconnect();
    viewerWatch = null;
    uploadChain = Promise.resolve();
    for (const id of [...blobs.keys()]) forget(id);
    known.clear();
    current = null;
}

// ---------------------------------------------------------------------------
// Open and download
// ---------------------------------------------------------------------------

/** Save an attachment's bytes as a file, fetched with the token. */
export async function downloadAttachment(id, filename) {
    try {
        const blob = await api.fetchAttachmentContent(id);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'attachment';
        link.rel = 'noopener';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();
        // Long enough for the browser to start the download.
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (e) {
        showApiError('download attachment', e);
    }
}

// Watches the modal overlay while the viewer is open, to drop the viewer
// (and so its blob URL) as soon as the modal closes.
let viewerWatch = null;

function clearViewerOnClose() {
    viewerWatch?.disconnect();
    viewerWatch = null;
    const overlay = document.getElementById('modal-overlay');
    if (!overlay || typeof MutationObserver === 'undefined') return;
    viewerWatch = new MutationObserver(() => {
        if (!overlay.classList.contains('hidden')) return;
        viewerWatch.disconnect();
        viewerWatch = null;
        document.querySelector('#modal-content .attachment-viewer')?.remove();
        releaseUnused();
    });
    viewerWatch.observe(overlay, { attributes: true, attributeFilter: ['class'] });
}

function showViewer(id, filename) {
    document.getElementById('modal-title').textContent = filename || 'Attachment';
    document.getElementById('modal-content').innerHTML = `
        <figure class="attachment-viewer">
            <img data-attachment-id="${escapeAttr(id)}" alt="${escapeAttr(filename || '')}">
            <figcaption class="attachment-viewer-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-action="download-attachment" data-attachment-id="${escapeAttr(id)}" data-filename="${escapeAttr(filename || '')}">Download</button>
            </figcaption>
        </figure>`;
    document.querySelector('.modal')?.classList.add('modal-wide');
    showModal();
    clearViewerOnClose();
    // showModal focuses the first input, and the viewer has none.
    document.querySelector('#modal-content .attachment-viewer-actions button')?.focus();
    hydrateAttachments(document.getElementById('modal-content'));
}

/**
 * Open an attachment: an image in the viewer, anything else downloaded.
 * @param {string} id
 * @param {{filename?: string, contentType?: string}} [hint]
 */
export async function openAttachment(id, { filename = '', contentType = '' } = {}) {
    if (!ATTACHMENT_ID_RE.test(id || '')) return;
    const listed = known.get(id);
    const name = filename || listed?.filename || '';
    let type = mediaType(contentType || listed?.content_type);
    if (!type) {
        try {
            type = (await load(id)).type;
        } catch (e) {
            showApiError('open attachment', e);
            return;
        }
    }
    if (INLINE_IMAGE_TYPES.has(type)) showViewer(id, name);
    else downloadAttachment(id, name);
}

// ---------------------------------------------------------------------------
// The Attachments strip
// ---------------------------------------------------------------------------

// The strip on screen: { issueId, attachments, userId, isAdmin, failed }.
let current = null;

export function formatFileSize(bytes) {
    const n = Number(bytes) || 0;
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function canDelete(attachment, { userId, isAdmin }) {
    // isAdmin null: not known here, so offer it and let the server decide.
    return isAdmin !== false || (!!userId && attachment.uploader_id === userId);
}

function renderItem(a, who) {
    const image = INLINE_IMAGE_TYPES.has(mediaType(a.content_type));
    const name = a.filename || 'attachment';
    const meta = [formatFileSize(a.size), a.uploader_name || 'Unknown', formatTimeAgo(a.created_at)]
        .filter(Boolean).map(escapeHtml).join(' · ');
    return `
        <li class="attachment-item">
            <button type="button" class="attachment-open" data-action="open-attachment" data-attachment-id="${escapeAttr(a.id)}" data-filename="${escapeAttr(name)}" data-content-type="${escapeAttr(a.content_type || '')}" title="${image ? 'View' : 'Download'} ${escapeAttr(name)}">
                <span class="attachment-thumb">${image ? `<img data-attachment-id="${escapeAttr(a.id)}" alt="">` : ICON.file}</span>
                <span class="attachment-name">${escapeHtml(name)}</span>
                <span class="attachment-meta">${meta}</span>
            </button>
            ${canDelete(a, who) ? `<button type="button" class="attachment-delete" data-action="delete-attachment" data-attachment-id="${escapeAttr(a.id)}" data-filename="${escapeAttr(name)}" title="Delete" aria-label="Delete ${escapeAttr(name)}">${ICON.remove}</button>` : ''}
        </li>`;
}

// Checked here first so a file the server would refuse is not sent at
// all, and the reason is plain. The server stays the authority: it takes
// PNG, JPEG, GIF, WebP, PDF and any UTF-8 text, judged by the bytes, not
// the name (JSON, YAML, scripts, logs). So only what can never be one of
// those is refused here; any other type goes for the server to judge.
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const NEVER_ACCEPTED = /^(image\/|video\/|audio\/|font\/)|^application\/(zip|gzip|x-gzip|x-tar|x-7z-compressed|x-rar-compressed|vnd\.rar|x-bzip2|x-xz|java-archive|vnd\.android\.package-archive|x-msdownload|wasm)$/;
// A lost answer is resent with the same key, but not a large body: a
// browser streaming one when the server refuses it often reports a reset.
const RESEND_MAX_BYTES = 2 * 1024 * 1024;

/**
 * Why a file cannot be attached, or null when it can be sent.
 * @param {File} file
 * @returns {string|null}
 */
export function uploadRefusal(file) {
    const name = file?.name || 'file';
    const type = mediaType(file?.type);
    if (!file || (file.size === 0 && !type)) return `${name} is empty or a folder`;
    if (file.size > MAX_UPLOAD_BYTES) {
        return `${name} is ${formatFileSize(file.size)}; the limit is ${formatFileSize(MAX_UPLOAD_BYTES)}`;
    }
    if (type && !INLINE_IMAGE_TYPES.has(type) && NEVER_ACCEPTED.test(type)) {
        return `${name} can't be attached: only PNG, JPEG, GIF, WebP, PDF or plain text`;
    }
    return null;
}

const HINT_EMPTY = 'Drop files here, or use Add. PNG, JPEG, GIF, WebP, PDF or text, up to 10 MB.';

function renderBody(attachments, who) {
    if (attachments === null) return '<p class="attachments-hint">Attachments could not be loaded.</p>';
    if (!attachments.length) return `<p class="attachments-hint">${HINT_EMPTY}</p>`;
    return `<ul class="attachment-grid">${attachments.map(a => renderItem(a, who)).join('')}</ul>`;
}

/**
 * The Attachments section of the issue page.
 * @param {string} issueId
 * @param {Array|null} attachments - null when the list could not be loaded
 * @param {{userId?: string, isAdmin?: boolean|null}} [who] - isAdmin null:
 *   unknown (an issue of another team), so Delete is offered and the server decides
 */
export function renderAttachmentsSection(issueId, attachments, { userId = null, isAdmin = false } = {}) {
    current = { issueId, attachments: attachments ? [...attachments] : null, userId, isAdmin };
    rememberAttachments(attachments || []);
    const count = attachments?.length || 0;
    return `
        <section class="attachments${Array.isArray(attachments) && !count ? ' is-empty' : ''}" id="issue-attachments" aria-label="Attachments" data-issue-id="${escapeAttr(issueId)}">
            <div class="related-head">
                <h3 id="attachments-heading" tabindex="-1">Attachments <span class="section-count">${count || ''}</span></h3>
                <label class="ticket-gate-text-btn attachments-add">
                    + Add
                    <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${escapeAttr(issueId)}" aria-label="Attach files">
                </label>
            </div>
            <div class="attachments-status" role="status" aria-live="polite"></div>
            <div class="attachments-body">${renderBody(current.attachments, { userId, isAdmin })}</div>
        </section>`;
}

/** The strip on screen, if it is `issueId`'s. */
function strip(issueId) {
    const section = document.getElementById('issue-attachments');
    return section && current && current.issueId === issueId && section.dataset.issueId === issueId ? section : null;
}

/** Say something in `issueId`'s live region, which stays in place. */
function setStatus(issueId, text) {
    const status = strip(issueId)?.querySelector('.attachments-status');
    if (status) status.textContent = text;
}

/** Redraw `issueId`'s list only: the heading, Add and the live region stay. */
function refreshList(issueId) {
    const section = strip(issueId);
    if (!section) return;
    const { attachments, userId, isAdmin } = current;
    section.querySelector('.section-count').textContent = attachments?.length ? String(attachments.length) : '';
    // An empty strip shows nothing but its live region (CHT-2093); a failed
    // list (null) stays visible so its notice is seen.
    section.classList.toggle('is-empty', Array.isArray(attachments) && attachments.length === 0);
    const body = section.querySelector('.attachments-body');
    body.innerHTML = renderBody(attachments, { userId, isAdmin });
    hydrateAttachments(body);
}

function uuid4() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    // randomUUID needs a secure context; a server reached over plain http
    // on a LAN is not one. getRandomValues works everywhere.
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// How long to wait before asking again about a write still in progress,
// and how many times (tests shorten the wait).
export const _timing = { inFlightRetryMs: 1000, inFlightTries: 3 };

const inFlight = (e) => e?.detail?.error_code === 'idempotency_in_flight';

async function uploadOne(issueId, file) {
    const idempotencyKey = uuid4();
    const send = () => api.uploadAttachment(issueId, file, { idempotencyKey });
    try {
        return await send();
    } catch (e) {
        // No answer: it may have been stored. The same key resends safely,
        // but a large body is not sent twice.
        if (!e?.isNetworkError || file.size > RESEND_MAX_BYTES) throw e;
    }
    // The resend can find the first send still being stored (409
    // in-flight): its answer comes shortly, under the same key.
    for (let tries = 1; ; tries++) {
        try {
            return await send();
        } catch (e) {
            if (!inFlight(e) || tries >= _timing.inFlightTries) throw e;
            await wait(_timing.inFlightRetryMs);
        }
    }
}

async function relist(issueId) {
    try {
        const list = await api.getAttachments(issueId);
        rememberAttachments(list);
        if (current?.issueId === issueId) current.attachments = [...list];
        return list;
    } catch {
        return null;
    }
}

// Uploads run one batch after another, so two drops never interleave or
// clear each other's status.
let uploadChain = Promise.resolve();

/**
 * Upload files to an issue one at a time, then show them in the strip.
 * @param {string} issueId
 * @param {FileList|File[]} files
 * @returns {Promise<number>} how many were attached
 */
export function uploadAttachments(issueId, files) {
    const queue = [...(files || [])];
    const run = uploadChain.then(() => uploadBatch(issueId, queue));
    uploadChain = run.catch(() => 0);
    return run;
}

async function uploadBatch(issueId, queue) {
    if (!queue.length) return 0;
    let attached = 0;
    let unsure = false;
    for (const [i, file] of queue.entries()) {
        const refusal = uploadRefusal(file);
        if (refusal) {
            showToast(refusal, 'error');
            continue;
        }
        setStatus(issueId, queue.length > 1 ? `Uploading ${file.name} (${i + 1} of ${queue.length})…` : `Uploading ${file.name}…`);
        try {
            const attachment = await uploadOne(issueId, file);
            attached += 1;
            rememberAttachments([attachment]);
            if (current?.issueId === issueId && current.attachments) {
                current.attachments = [...current.attachments.filter(a => a.id !== attachment.id), attachment];
            }
        } catch (e) {
            if (e?.isNetworkError || inFlight(e)) {
                // It may be stored after all: the list will tell.
                unsure = true;
                showToast(`${file.name} may not have been attached; the list shows what was`, 'error');
            } else {
                showApiError(`attach ${file.name}`, e);
            }
        }
    }
    // A list that failed to load, or an upload with no answer: ask again.
    if (current?.issueId === issueId && (unsure || (attached && current.attachments === null))) {
        await relist(issueId);
    }
    refreshList(issueId);
    setStatus(issueId, attached ? (attached === 1 ? '1 file attached' : `${attached} files attached`) : '');
    if (attached) showToast(attached === 1 ? 'File attached' : `${attached} files attached`, 'success');
    return attached;
}

export async function deleteAttachment(id, filename) {
    if (!ATTACHMENT_ID_RE.test(id || '')) return false;
    if (!confirm(`Delete ${filename || 'this attachment'}? Comments that show it will show it as missing.`)) return false;
    try {
        await api.deleteAttachment(id);
    } catch (e) {
        showApiError('delete attachment', e);
        return false;
    }
    known.delete(id);
    const issueId = current?.issueId;
    // Where focus goes once the tile is gone: the next tile, else the
    // previous one, else the heading.
    const list = current?.attachments || [];
    const index = list.findIndex(a => a.id === id);
    if (current?.attachments) current.attachments = list.filter(a => a.id !== id);
    refreshList(issueId);
    const section = strip(issueId);
    if (section) {
        const left = current.attachments || [];
        const next = left[Math.min(Math.max(index, 0), left.length - 1)];
        const target = next
            ? section.querySelector(`.attachment-open[data-attachment-id="${next.id}"]`)
            : section.querySelector('#attachments-heading');
        target?.focus();
        setStatus(issueId, `${filename || 'Attachment'} deleted`);
    }
    // Inline copies of it stay as they are until the next render; the
    // cached URL goes once nothing shows it.
    showToast('Attachment deleted', 'success');
    return true;
}

/**
 * Accept files dropped anywhere on `zone` (the issue page's main column).
 * A file dropped anywhere else on the page is refused, never opened by
 * the browser in place of the app.
 * @param {Element} zone
 * @param {string} issueId
 * @param {AbortSignal} signal
 */
export function setupAttachmentDrop(zone, issueId, signal) {
    if (!zone) return;
    const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes('Files');
    const mark = (on) => document.getElementById('issue-attachments')?.classList.toggle('is-dragover', on);
    zone.addEventListener('dragover', (e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        mark(true);
    }, { signal });
    zone.addEventListener('dragleave', (e) => {
        if (e.relatedTarget && zone.contains(e.relatedTarget)) return;
        mark(false);
    }, { signal });
    zone.addEventListener('drop', (e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        mark(false);
        uploadAttachments(issueId, e.dataTransfer.files);
    }, { signal });
    // Elsewhere on the issue page, refuse a file so the browser does not
    // open it in place of the app. Only while that page shows: the guard
    // removes itself once it is left, and it never overrides a file input
    // or a drop target that took the drag first.
    const guard = new AbortController();
    signal?.addEventListener('abort', () => guard.abort(), { once: true });
    const onPage = () => zone.isConnected && !zone.closest('.hidden');
    for (const type of ['dragover', 'drop']) {
        document.addEventListener(type, (e) => {
            if (!onPage()) {
                guard.abort();
                return;
            }
            if (!hasFiles(e) || e.defaultPrevented || zone.contains(e.target)) return;
            if (e.target?.closest?.('input[type="file"]')) return;
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'none';
            if (type === 'drop') mark(false);
        }, { signal: guard.signal });
    }
}

// Act on a click, or on Enter/Space on an element with no click of its
// own (an inline image). Enter on a link or a button also fires a click,
// and a drag over the page reaches these handlers too: neither counts.
const activated = (event, target) => event.type === 'click'
    || (event.type === 'keydown' && target.tagName !== 'A' && target.tagName !== 'BUTTON');

function openFrom(target) {
    openAttachment(target.dataset.attachmentId || target.dataset.attachmentRef, {
        filename: target.dataset.filename || target.getAttribute('alt') || '',
        contentType: target.dataset.contentType || '',
    });
}

/**
 * A middle click on an attachment link would open its address in a new
 * tab without the token (a 401 page): open it here instead.
 * @param {MouseEvent} event
 */
export function handleAuxClick(event) {
    if (event.button !== 1) return;
    const target = event.target?.closest?.('[data-action="open-attachment"]');
    if (!target) return;
    event.preventDefault();
    openFrom(target);
}

registerActions({
    'open-attachment': (event, data, target) => {
        if (!activated(event, target)) return;
        // Every activation, a modified click too: the link's own address
        // would open without the token and answer 401.
        event.preventDefault();
        openFrom(target);
    },
    'download-attachment': (event, data, target) => {
        if (!activated(event, target)) return;
        downloadAttachment(data.attachmentId, data.filename);
    },
    'delete-attachment': (event, data, target) => {
        if (!activated(event, target)) return;
        deleteAttachment(data.attachmentId, data.filename);
    },
    'pick-attachments': (event, data, target) => {
        if (event.type !== 'change') return;
        const files = [...(target.files || [])];
        target.value = '';
        uploadAttachments(data.issueId, files);
    },
});
