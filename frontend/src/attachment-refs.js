/**
 * Attachment references in rendered markdown (CHT-1996).
 *
 * A comment shows an attached image as
 * `![shot.png](/api/attachments/<id>/content)`. Those bytes are served
 * only with a credential, and the web app has a bearer token, not a
 * cookie, so a plain <img src> cannot load them. This module only marks
 * such references in sanitized HTML; attachments.js fetches them with the
 * token and swaps in blob: URLs.
 *
 * SECURITY: the token must reach only this server's attachment route. A
 * reference counts only when it resolves to this origin with a path of
 * exactly /api/attachments/<uuid>/content (no query, no fragment). Every
 * other `![](url)` is left as it was and never sees the token. Marking
 * also removes the src, so the browser does not request the URL without
 * the token (a 401 and a broken image).
 *
 * No imports: rich-text.js depends on this, and it must not pull the API
 * client or the UI into every markdown render.
 */

// An attachment id as the server issues them (a UUID, lower-case).
export const ATTACHMENT_ID_RE = /^[0-9a-f-]{36}$/;
export const ATTACHMENT_CONTENT_RE = /^\/api\/attachments\/([0-9a-f-]{36})\/content$/;

/**
 * The attachment id a URL names, or null when it is anything but this
 * origin's /api/attachments/<id>/content.
 * @param {string|null} url
 * @returns {string|null}
 */
export function attachmentIdFromUrl(url) {
    if (typeof url !== 'string' || url === '') return null;
    const origin = window.location.origin;
    let parsed;
    try {
        parsed = new URL(url, origin);
    } catch {
        return null;
    }
    if (parsed.origin !== origin || parsed.search !== '' || parsed.hash !== '') return null;
    if (parsed.username || parsed.password) return null;
    const match = ATTACHMENT_CONTENT_RE.exec(parsed.pathname);
    return match ? match[1] : null;
}

/**
 * Mark the attachment images and links under `root` (sanitized markup,
 * not yet in the page). An image loses its src and gets
 * data-attachment-id, for attachments.js to load; a link keeps its href
 * and opens or downloads the file with the token when clicked.
 * @param {ParentNode} root
 */
export function markAttachmentRefs(root) {
    for (const img of root.querySelectorAll('img[src]')) {
        const id = attachmentIdFromUrl(img.getAttribute('src'));
        if (!id) continue;
        img.removeAttribute('src');
        img.removeAttribute('srcset');
        img.setAttribute('data-attachment-id', id);
        img.setAttribute('data-action', 'open-attachment');
        img.setAttribute('tabindex', '0');
        img.classList.add('attachment-inline');
    }
    for (const link of root.querySelectorAll('a[href]')) {
        const id = attachmentIdFromUrl(link.getAttribute('href'));
        if (!id) continue;
        link.setAttribute('data-attachment-ref', id);
        // A link around an inline image: the image opens it.
        if (!link.querySelector('img[data-attachment-id]')) {
            link.setAttribute('data-action', 'open-attachment');
        }
        link.classList.add('attachment-link');
    }
}
