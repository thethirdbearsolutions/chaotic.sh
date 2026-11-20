/**
 * Document references in markdown (CHT-2120).
 *
 * A document has no short key the way an issue has CHT-123, only an id,
 * so a reference is an ordinary markdown link to the document's page:
 * `[Release plan](/document/<id>)`. It needs nothing new from the server,
 * renders as a link in the CLI and anywhere else markdown is read, and
 * keeps pointing at the document when its title changes.
 *
 * Nobody types an id, so `[[` offers the team's documents by title and
 * inserts the link (the textarea autocomplete and the rich editor share
 * the query and the inserted text). Rendered links to a document open in
 * the app; see markDocumentLinks.
 */

import { api } from './api.js';
import { getCurrentTeam } from './state.js';

/**
 * `[[` and what follows it up to the caret: a title search. No brackets
 * or newline in the query, so a closed `[[x]]` or a line break ends it.
 * Group 1 is the query.
 */
export const DOC_REF_TRIGGER = /\[\[([^[\]\n]{0,80})$/;

/** The path a reference points at. */
export function documentHref(id) {
    return `/document/${encodeURIComponent(id)}`;
}

/**
 * A title made safe to sit between `[` and `]`: a bracket would end the
 * link text early and a backslash would escape the next character. A line
 * break would end the link altogether.
 */
export function escapeLinkText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim().replace(/[\\[\]]/g, '\\$&');
}

/** The markdown a reference inserts. */
export function docRefMarkdown(doc) {
    return `[${escapeLinkText(doc.title) || 'Untitled'}](${documentHref(doc.id)})`;
}

/**
 * The document id a link points at, or null. Relative `/document/<id>`
 * and this app's own absolute URL both count (a URL copied from the
 * address bar is the other natural way to refer to a document); another
 * host's does not, since it is another server's document.
 * @param {string} href - the link's href attribute as written
 * @param {string} [origin] - this app's origin
 */
export function documentIdFromHref(href, origin = globalThis.location?.origin) {
    if (!href || typeof href !== 'string') return null;
    let url;
    try {
        url = new URL(href, origin || 'http://localhost');
    } catch {
        return null;
    }
    if (origin && url.origin !== origin) return null;
    // Not a protocol-relative or other-scheme href that happened to resolve here.
    if (!/^(\/|https?:\/\/)/i.test(href) || href.startsWith('//')) return null;
    const match = url.pathname.match(/^\/document\/([^/]+)\/?$/);
    if (!match) return null;
    try {
        return decodeURIComponent(match[1]);
    } catch {
        return null;
    }
}

/**
 * Make each link to a document in rendered markdown open it in the app:
 * the same action the issue page's linked-documents list uses, so a plain
 * click stays in the app and Cmd/Ctrl+click opens a new tab. Runs after
 * sanitising, which strips every data-* the content brought.
 * @param {DocumentFragment|Element} root
 */
export function markDocumentLinks(root) {
    for (const a of root.querySelectorAll('a[href]')) {
        const id = documentIdFromHref(a.getAttribute('href'));
        if (!id) continue;
        a.classList.add('doc-link');
        a.dataset.action = 'open-linked-document';
        a.dataset.documentId = id;
    }
}

const SUGGESTION_LIMIT = 6;

/**
 * Documents matching what follows `[[`, best few first, as
 * `{id, title, icon}`. Searches the server, so documents the documents
 * page has not loaded are found too. An empty query lists the most recent.
 * Never throws: a failed search offers nothing.
 * @param {string} query
 * @returns {Promise<Array<{id: string, title: string, icon: string|null}>>}
 */
export async function docRefSuggestions(query) {
    const team = getCurrentTeam();
    if (!team) return [];
    const q = (query || '').trim();
    try {
        const docs = await api.getDocuments(team.id, null, q || null, null, SUGGESTION_LIMIT);
        return (Array.isArray(docs) ? docs : [])
            .slice(0, SUGGESTION_LIMIT)
            .map(d => ({ id: d.id, title: d.title || 'Untitled', icon: d.icon || null }));
    } catch {
        return [];
    }
}
