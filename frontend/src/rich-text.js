/**
 * Shared markdown post-processing: issue-ID auto-linking and @mention
 * styling for rendered comment/description content (CHT-1213).
 *
 * Extracted from issue-detail-view.js so documents.js can render its own
 * body/comment content through the same pipeline without creating a
 * documents.js -> issue-detail-view.js dependency (the two are sibling
 * detail surfaces, not layered on each other).
 */

import { renderMarkdown } from './gate-approvals.js';

/**
 * Sanitized markdown HTML (attachment references already marked by
 * renderMarkdown, CHT-1996), with issue links and @mentions. Parsed in a
 * <template>, whose content is inert: a div would fetch every <img> in it
 * at once, before the page even shows it.
 * @param {string} content
 * @returns {string}
 */
function renderRich(content) {
    // SECURITY: Render markdown first (with DOMPurify sanitization)
    // Then safely process the DOM to add issue links and mentions
    const sanitizedHtml = renderMarkdown(content);
    const template = document.createElement('template');
    template.innerHTML = sanitizedHtml;
    // Walk through text nodes only and apply transformations
    processTextNodes(template.content, addIssueLinksAndMentions);
    return template.innerHTML;
}

/**
 * Process text nodes in an element with a callback
 * @param {Element} element - DOM element
 * @param {Function} callback - Function to call on each text node
 */
/**
 * Where an issue reference points. A real path, not a `#/issue/` fragment:
 * a fragment resolves against the page it sits on, so a new tab opened from
 * it (Cmd/Ctrl+click, middle click) loaded the current page, not the issue
 * (CHT-2117).
 */
export function issueHref(identifier) {
    return `/issue/${encodeURIComponent(identifier)}`;
}

export function processTextNodes(element, callback) {
    // Walk through all child nodes, but skip code/pre elements
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip text nodes that are inside code or pre elements
                let parent = node.parentElement;
                while (parent && parent !== element) {
                    if (parent.tagName === 'CODE' || parent.tagName === 'PRE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    parent = parent.parentElement;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    const nodesToProcess = [];
    let node;
    while ((node = walker.nextNode())) {
        nodesToProcess.push(node);
    }

    // Process nodes (we collected them first to avoid issues with DOM mutation during iteration)
    nodesToProcess.forEach(textNode => {
        callback(textNode);
    });
}

/**
 * Add issue links and mentions to a text node
 * @param {Node} textNode - Text node to process
 */
export function addIssueLinksAndMentions(textNode) {
    const text = textNode.textContent;
    if (!text) return;

    // Check if we need to do any replacements
    const issuePattern = /\b([A-Z]{2,10}-\d+)\b/g;
    const mentionPattern = /(^|\s)@([a-zA-Z0-9._-]+)/g;

    const hasIssues = issuePattern.test(text);
    const hasMentions = mentionPattern.test(text);

    if (!hasIssues && !hasMentions) return;

    // Create a document fragment to hold the new nodes
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let modified = false;

    // Combined pattern to match both issues and mentions
    const combinedPattern = /\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;
    let match;

    while ((match = combinedPattern.exec(text)) !== null) {
        modified = true;

        // Add text before the match
        if (match.index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }

        if (match[1]) {
            // Issue reference
            const issueId = match[1];
            const link = document.createElement('a');
            link.href = issueHref(issueId);
            link.className = 'issue-link';
            link.textContent = issueId;
            fragment.appendChild(link);
            lastIndex = match.index + match[0].length;
        } else if (match[3]) {
            // Mention
            if (match[2]) {
                // Add the whitespace before @
                fragment.appendChild(document.createTextNode(match[2]));
            }
            const span = document.createElement('span');
            span.className = 'mention';
            span.textContent = '@' + match[3];
            fragment.appendChild(span);
            lastIndex = match.index + match[0].length;
        }
    }

    if (modified) {
        // Add remaining text
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        // Replace the text node with the fragment
        textNode.parentNode.replaceChild(fragment, textNode);
    }
}

/**
 * Add issue links to a text node (no mentions)
 * @param {Node} textNode - Text node to process
 */
export function addIssueLinks(textNode) {
    const text = textNode.textContent;
    if (!text) return;

    const issuePattern = /\b([A-Z]{2,10}-\d+)\b/g;
    if (!issuePattern.test(text)) return;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let modified = false;

    issuePattern.lastIndex = 0; // Reset after test()
    let match;

    while ((match = issuePattern.exec(text)) !== null) {
        modified = true;

        // Add text before the match
        if (match.index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }

        // Issue reference
        const issueId = match[1];
        const link = document.createElement('a');
        link.href = issueHref(issueId);
        link.className = 'issue-link';
        link.textContent = issueId;
        fragment.appendChild(link);
        lastIndex = match.index + match[0].length;
    }

    if (modified) {
        // Add remaining text
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        // Replace the text node with the fragment
        textNode.parentNode.replaceChild(fragment, textNode);
    }
}

/**
 * Render comment content with markdown, issue links, and @mentions.
 * Used by both the issue detail view's comments and document comments.
 * @param {string} content - Comment content
 * @returns {string} Rendered HTML
 */
export function renderCommentContent(content) {
    if (!content) return '';
    return renderRich(content);
}

/**
 * Render description/body content with markdown, issue links, and mentions.
 * Used for issue descriptions and document bodies.
 * @param {string} content - Description/body content
 * @returns {string} Rendered HTML
 */
export function renderDescriptionContent(content) {
    // Same as renderCommentContent — descriptions/bodies linkify @mentions too
    // (CHT-1214), matching the comment box's existing behavior instead of
    // leaving manually-typed @handles as permanent plain text.
    if (!content) return '';
    return renderRich(content);
}
