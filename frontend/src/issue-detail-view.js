/**
 * Issue detail view module - Issue detail rendering (CHT-668)
 * Extracted from app.js for testability
 */

// Module state
let ticketRitualsCollapsed = true;
let currentTicketRituals = null;

// Dependencies injected from app.js
let deps = {
    api: null,
    getCurrentView: () => 'my-issues',
    showToast: () => {},
    showModal: () => {},
    closeModal: () => {},
    navigateTo: () => {},
    getProjects: () => [],
    getMembers: () => [],
    getAssigneeById: () => null,
    formatAssigneeName: (a) => a?.name || '',
    formatStatus: (s) => s,
    formatPriority: (p) => p,
    formatIssueType: (t) => t || 'task',
    formatEstimate: (e) => e || 'None',
    formatTimeAgo: () => '',
    getStatusIcon: () => '',
    getPriorityIcon: () => '',
    renderMarkdown: (content) => content,
    renderAvatar: () => '',
    escapeHtml: (text) => text,
    escapeAttr: (text) => text,
    escapeJsString: (text) => text,
    sanitizeColor: (c) => c || '#888',
    showDetailDropdown: () => {},
    setupMentionAutocomplete: () => {},
    renderTicketRitualActions: () => '',
};

/**
 * Set dependencies for this module
 * @param {Object} dependencies - Object containing required dependencies
 */
export function setDependencies(dependencies) {
    deps = { ...deps, ...dependencies };
}

/**
 * Get ticketRitualsCollapsed state
 * @returns {boolean}
 */
export function getTicketRitualsCollapsed() {
    return ticketRitualsCollapsed;
}

/**
 * Set ticketRitualsCollapsed state
 * @param {boolean} collapsed
 */
export function setTicketRitualsCollapsed(collapsed) {
    ticketRitualsCollapsed = collapsed;
}

/**
 * Get current ticket rituals
 * @returns {Object|null}
 */
export function getCurrentTicketRituals() {
    return currentTicketRituals;
}

/**
 * Set current ticket rituals
 * @param {Object|null} rituals
 */
export function setCurrentTicketRituals(rituals) {
    currentTicketRituals = rituals;
}

/**
 * Get activity icon for activity type
 * @param {string} type - Activity type
 * @returns {string} Emoji icon
 */
export function getActivityIcon(type) {
    const icons = {
        'created': '✨',
        'updated': '✏️',
        'status_changed': '🔄',
        'priority_changed': '⚡',
        'assigned': '👤',
        'unassigned': '👤',
        'commented': '💬',
        'labeled': '🏷️',
        'unlabeled': '🏷️',
        'moved_to_sprint': '🏃',
        'removed_from_sprint': '🏃',
        // Document activities (CHT-639)
        'doc_created': '📄',
        'doc_updated': '📝',
        'doc_deleted': '🗑️',
        'doc_commented': '💬',
        // Ritual activities (CHT-673)
        'ritual_attested': '✅',
    };
    return icons[type] || '•';
}

/**
 * Format activity actor name
 * @param {Object} activity - Activity object
 * @returns {string} Actor name
 */
export function formatActivityActor(activity) {
    return activity.user_name || activity.user_email || 'Unknown';
}

/**
 * Format activity text for display
 * @param {Object} activity - Activity object
 * @returns {string} Formatted HTML text
 */
export function formatActivityText(activity) {
    // Strip enum prefixes like "IssueStatus." or "IssuePriority."
    const cleanValue = (val) => {
        if (!val) return '';
        return val.replace(/^(IssueStatus\.|IssuePriority\.)/, '').toLowerCase();
    };

    const fieldLabels = {
        'status': 'status',
        'priority': 'priority',
        'assignee_id': 'assignee',
        'sprint_id': 'sprint',
        'title': 'title',
        'description': 'description',
        'estimate': 'estimate',
    };

    switch (activity.activity_type) {
        case 'created':
            return 'Created issue';
        case 'commented': {
            const preview = activity.new_value
                ? deps.escapeHtml(activity.new_value.substring(0, 200)) + (activity.new_value.length > 200 ? '...' : '')
                : '';
            return preview
                ? `<a href="#comments-section" class="activity-comment-link" title="${preview}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`
                : 'Added a comment';
        }
        case 'status_changed':
            return `Changed status from <strong>${deps.formatStatus(cleanValue(activity.old_value))}</strong> to <strong>${deps.formatStatus(cleanValue(activity.new_value))}</strong>`;
        case 'priority_changed':
            return `Changed priority from <strong>${deps.formatPriority(cleanValue(activity.old_value))}</strong> to <strong>${deps.formatPriority(cleanValue(activity.new_value))}</strong>`;
        case 'assigned':
            return `Assigned to someone`;
        case 'unassigned':
            return `Removed assignee`;
        case 'moved_to_sprint':
            if (activity.sprint_name) {
                return `Moved to sprint <strong>${deps.escapeHtml(activity.sprint_name)}</strong>`;
            }
            return `Moved to sprint`;
        case 'removed_from_sprint':
            if (activity.sprint_name) {
                return `Removed from sprint <strong>${deps.escapeHtml(activity.sprint_name)}</strong>`;
            }
            return `Removed from sprint`;
        // Document activities (CHT-639)
        case 'doc_created':
            return 'Created document';
        case 'doc_updated':
            return 'Updated document';
        case 'doc_deleted':
            return 'Deleted document';
        case 'doc_commented':
            return 'Commented on document';
        // Ritual activities (CHT-673)
        case 'ritual_attested': {
            const ritualName = deps.escapeHtml(activity.field_name || 'ritual');
            const notePreview = activity.new_value
                ? deps.escapeHtml(activity.new_value.substring(0, 200)) + (activity.new_value.length > 200 ? '...' : '')
                : '';
            return notePreview
                ? `<span class="activity-attestation-link" title="${notePreview}">Attested to <strong>${ritualName}</strong></span>`
                : `Attested to <strong>${ritualName}</strong>`;
        }
        case 'updated':
            // Generic update - show field if available
            if (activity.field_name) {
                const field = fieldLabels[activity.field_name] || deps.escapeHtml(activity.field_name);
                return `Updated ${field}`;
            }
            return 'Updated issue';
        default:
            // Fallback for unknown activity types
            if (activity.field_name) {
                const field = fieldLabels[activity.field_name] || deps.escapeHtml(activity.field_name);
                return `Updated ${field}`;
            }
            return 'Updated issue';
    }
}

/**
 * Process text nodes in an element with a callback
 * @param {Element} element - DOM element
 * @param {Function} callback - Function to call on each text node
 */
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
            link.href = `#/issue/${issueId}`;
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
        link.href = `#/issue/${issueId}`;
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
 * Render comment content with markdown and issue links
 * @param {string} content - Comment content
 * @returns {string} Rendered HTML
 */
export function renderCommentContent(content) {
    if (!content) return '';
    // SECURITY: Render markdown first (with DOMPurify sanitization)
    // Then safely process the DOM to add issue links and mentions
    const sanitizedHtml = deps.renderMarkdown(content);

    // Parse the sanitized HTML into a DOM for safe manipulation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHtml;

    // Walk through text nodes only and apply transformations
    processTextNodes(tempDiv, addIssueLinksAndMentions);

    return tempDiv.innerHTML;
}

/**
 * Render description content with markdown and issue links
 * @param {string} content - Description content
 * @returns {string} Rendered HTML
 */
export function renderDescriptionContent(content) {
    // Same as renderCommentContent but for descriptions (issue refs only, no mentions)
    if (!content) return '';
    const sanitizedHtml = deps.renderMarkdown(content);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHtml;

    processTextNodes(tempDiv, addIssueLinks);

    return tempDiv.innerHTML;
}

/**
 * Handle click on description content
 * @param {Event} event - Click event
 * @param {string} issueId - Issue ID
 */
export function handleDescriptionClick(event, issueId) {
    // Don't open edit modal if clicking on a link
    const target = event.target;
    if (target.tagName === 'A' || target.closest('a')) {
        return; // Let the link handle the click
    }
    // Call editDescription from app.js via window
    if (window.editDescription) {
        window.editDescription(issueId);
    }
}

/**
 * Toggle a collapsible section (activity, comments)
 * @param {string} sectionName - 'activity' or 'comments'
 */
export function toggleSection(sectionName) {
    const section = document.getElementById(`${sectionName}-section`);
    if (!section) return;
    const content = section.querySelector('.section-collapsible-content');
    const toggleIcon = section.querySelector('.section-toggle-icon');
    if (content) {
        content.classList.toggle('collapsed');
    }
    if (toggleIcon) {
        toggleIcon.classList.toggle('rotated');
    }
}

/**
 * Toggle ticket rituals section collapsed state
 */
export function toggleTicketRituals() {
    ticketRitualsCollapsed = !ticketRitualsCollapsed;
    const container = document.getElementById('ticket-rituals-section');
    if (!container) return;
    const content = container.querySelector('.ticket-rituals-content');
    const toggleIcon = container.querySelector('.section-toggle-icon');
    if (content) {
        content.classList.toggle('collapsed', ticketRitualsCollapsed);
    }
    if (toggleIcon) {
        toggleIcon.classList.toggle('rotated', ticketRitualsCollapsed);
    }
}

/**
 * Load ticket rituals for an issue
 * @param {string} issueId - Issue ID
 */
export async function loadTicketRituals(issueId) {
    try {
        currentTicketRituals = await deps.api.getTicketRitualsStatus(issueId);
        renderTicketRituals(issueId);
    } catch (e) {
        console.error('Failed to load ticket rituals:', e);
        currentTicketRituals = null;
    }
}

/**
 * Render ticket rituals section
 * @param {string} issueId - Issue ID
 */
export function renderTicketRituals(issueId) {
    const container = document.getElementById('ticket-rituals-section');
    if (!container) return;

    if (!currentTicketRituals) {
        container.classList.add('hidden');
        return;
    }

    const { pending_rituals, completed_rituals } = currentTicketRituals;

    // Hide section if no ticket-level rituals configured
    if (pending_rituals.length === 0 && completed_rituals.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');

    // Auto-expand if there are pending gate rituals - they require immediate attention
    const hasPendingGateRituals = pending_rituals.some(r => r.approval_mode === 'gate');
    if (hasPendingGateRituals) {
        ticketRitualsCollapsed = false;
    }

    const content = container.querySelector('.ticket-rituals-content');
    if (!content) return;

    content.classList.toggle('collapsed', ticketRitualsCollapsed);
    const toggleIcon = container.querySelector('.section-toggle-icon');
    if (toggleIcon) {
        toggleIcon.classList.toggle('rotated', ticketRitualsCollapsed);
    }

    // Determine the right warning message based on ritual triggers
    const hasCloseRituals = pending_rituals.some(r => r.trigger === 'ticket_close');
    const hasClaimRituals = pending_rituals.some(r => r.trigger === 'ticket_claim');
    let warningMessage = '⚠️ Complete these rituals:';
    if (hasCloseRituals && hasClaimRituals) {
        warningMessage = '⚠️ Pending rituals (claim before starting, close before completing):';
    } else if (hasClaimRituals) {
        warningMessage = '⚠️ Complete these rituals before claiming this ticket:';
    } else if (hasCloseRituals) {
        warningMessage = '⚠️ Complete these rituals before closing this ticket:';
    }

    content.innerHTML = `
        ${pending_rituals.length > 0 ? `
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${warningMessage}</p>
                ${pending_rituals.map(r => `
                    <div class="ticket-ritual-item pending">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">○</span>
                            <span class="ticket-ritual-name">${deps.escapeHtml(r.name)}</span>
                            <span class="badge badge-trigger-${r.trigger || 'ticket_close'}">${r.trigger === 'ticket_claim' ? 'claim' : 'close'}</span>
                            <span class="badge badge-ritual-${r.approval_mode || 'auto'}">${r.approval_mode || 'auto'}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${r.prompt ? deps.renderMarkdown(r.prompt) : ''}</div>
                        <div class="ticket-ritual-actions">
                            ${deps.renderTicketRitualActions(r, issueId)}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        ${completed_rituals.length > 0 ? `
            <div class="ticket-rituals-completed">
                ${completed_rituals.map(r => `
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${deps.escapeHtml(r.name)}</span>
                        </div>
                        ${r.attestation ? `
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${deps.escapeHtml(r.attestation.attested_by_name || 'Unknown')}</span>
                                <span class="attestation-time">${deps.formatTimeAgo(r.attestation.attested_at)}</span>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

/**
 * View issue by path (identifier or ID)
 * @param {string} identifier - Issue identifier or ID
 */
export async function viewIssueByPath(identifier) {
    try {
        // Try to fetch by identifier first, then by ID
        let issue;
        if (identifier.includes('-')) {
            issue = await deps.api.getIssueByIdentifier(identifier);
        } else {
            issue = await deps.api.getIssue(identifier);
        }
        if (issue) {
            await viewIssue(issue.id, false);
        } else {
            deps.navigateTo('my-issues', false);
        }
    } catch {
        deps.navigateTo('my-issues', false);
    }
}

/**
 * View issue detail
 * @param {string} issueId - Issue ID
 * @param {boolean} pushHistory - Whether to push to browser history
 */
export async function viewIssue(issueId, pushHistory = true) {
    try {
        ticketRitualsCollapsed = true;
        const [issue, comments, activities, subIssues, relations, ritualStatus] = await Promise.all([
            deps.api.getIssue(issueId),
            deps.api.getComments(issueId),
            deps.api.getActivities(issueId),
            deps.api.getSubIssues(issueId),
            deps.api.getRelations(issueId),
            deps.api.getTicketRitualsStatus(issueId).catch(() => ({ pending_rituals: [], completed_rituals: [] })),
        ]);

        // Extract attestation notes from completed rituals and merge with comments
        const attestationNotes = (ritualStatus.completed_rituals || [])
            .filter(r => r.attestation && r.attestation.note)
            .map(r => ({
                id: `attestation-${r.attestation.id}`,
                author_name: r.attestation.attested_by_name || 'Unknown',
                content: r.attestation.note,
                created_at: r.attestation.attested_at,
                is_attestation: true,
                ritual_name: r.name,
            }));

        // Combine and sort chronologically
        const allComments = [...comments, ...attestationNotes].sort((a, b) =>
            new Date(a.created_at) - new Date(b.created_at)
        );

        // Fetch parent issue and sprints in parallel (both depend on issue data)
        const secondaryFetches = [
            issue.parent_id ? deps.api.getIssue(issue.parent_id) : Promise.resolve(null),
            deps.api.getSprints(issue.project_id).catch(e => { console.error('Failed to load sprints:', e); return []; }),
        ];
        const [parentIssue, projectSprints] = await Promise.all(secondaryFetches);

        // Separate relations by type
        const blockingIssues = relations.filter(r => r.relation_type === 'blocks' && r.direction === 'outgoing');
        const blockedByIssues = relations.filter(r => r.relation_type === 'blocked_by' || (r.relation_type === 'blocks' && r.direction === 'incoming'));
        const relatedIssues = relations.filter(r => r.relation_type === 'relates_to');

        // Update URL
        if (pushHistory) {
            history.pushState({ issueId, view: deps.getCurrentView() }, '', `/issue/${issue.identifier}`);
        }

        // Store current issue for inline editing
        window.currentDetailIssue = issue;
        window.currentDetailSprints = projectSprints;

        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const detailView = document.getElementById('issue-detail-view');
        detailView.classList.remove('hidden');

        const backView = deps.getCurrentView() || 'my-issues';
        const project = deps.getProjects().find(p => p.id === issue.project_id);
        const assignee = issue.assignee_id ? deps.getAssigneeById(issue.assignee_id) : null;
        const assigneeName = assignee ? deps.formatAssigneeName(assignee) : null;
        const currentSprint = issue.sprint_id ? projectSprints.find(s => s.id === issue.sprint_id) : null;

        detailView.querySelector('#issue-detail-content').innerHTML = `
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${backView}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${project ? deps.escapeHtml(project.name) : 'Project'} › ${deps.escapeHtml(issue.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${deps.escapeHtml(issue.title)}</h1>

                    ${parentIssue ? `
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(parentIssue.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${deps.escapeJsString(parentIssue.id)}'); }">${parentIssue.identifier}: ${deps.escapeHtml(parentIssue.title)}</a>
                    </div>
                    ` : ''}

                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body ${!issue.description ? 'empty' : ''}" onclick="handleDescriptionClick(event, '${deps.escapeJsString(issue.id)}')">
                            ${issue.description ? renderDescriptionContent(issue.description) : '<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${deps.escapeJsString(issue.id)}', '${deps.escapeJsString(issue.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${subIssues.length === 0 ? `
                                <div class="sub-issues-empty">No sub-issues</div>
                            ` : subIssues.map(subIssue => `
                                <div class="sub-issue-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${deps.escapeJsString(subIssue.id)}'); } else { window.open('/issue/${encodeURIComponent(subIssue.identifier)}', '_blank'); }">
                                    <span class="sub-issue-status">${deps.getStatusIcon(subIssue.status)}</span>
                                    <span class="sub-issue-id">${subIssue.identifier}</span>
                                    <span class="sub-issue-title">${deps.escapeHtml(subIssue.title)}</span>
                                    ${subIssue.estimate ? `<span class="sub-issue-estimate">${subIssue.estimate}pts</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${deps.escapeJsString(issue.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${blockingIssues.length === 0 && blockedByIssues.length === 0 && relatedIssues.length === 0 ? `
                                <div class="relations-empty">No relations</div>
                            ` : ''}
                            ${blockedByIssues.length > 0 ? `
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${blockedByIssues.map(rel => `
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${deps.getStatusIcon(rel.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(rel.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${deps.escapeJsString(rel.related_issue_id)}'); }" class="relation-link">${rel.related_issue_identifier}</a>
                                            <span class="relation-title">${deps.escapeHtml(rel.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${deps.escapeJsString(issue.id)}', '${deps.escapeJsString(rel.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${blockingIssues.length > 0 ? `
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${blockingIssues.map(rel => `
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${deps.getStatusIcon(rel.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(rel.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${deps.escapeJsString(rel.related_issue_id)}'); }" class="relation-link">${rel.related_issue_identifier}</a>
                                            <span class="relation-title">${deps.escapeHtml(rel.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${deps.escapeJsString(issue.id)}', '${deps.escapeJsString(rel.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${relatedIssues.length > 0 ? `
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${relatedIssues.map(rel => `
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${deps.getStatusIcon(rel.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(rel.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${deps.escapeJsString(rel.related_issue_id)}'); }" class="relation-link">${rel.related_issue_identifier}</a>
                                            <span class="relation-title">${deps.escapeHtml(rel.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${deps.escapeJsString(issue.id)}', '${deps.escapeJsString(rel.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div id="ticket-rituals-section" class="issue-detail-section hidden">
                        <div class="section-header section-header-collapsible" onclick="toggleTicketRituals()">
                            <h3>Ticket Rituals</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle ticket rituals">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="ticket-rituals-content collapsed">
                            <!-- Populated by loadTicketRituals -->
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" onclick="toggleSection('activity')">
                            <h3>Activity</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content">
                            ${activities.length === 0 ? `
                                <div class="activity-empty">No activity yet</div>
                            ` : activities.map(activity => `
                                <div class="activity-item">
                                    <div class="activity-icon">${getActivityIcon(activity.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${formatActivityText(activity)}</span>
                                        <span class="activity-actor">by ${deps.escapeHtml(formatActivityActor(activity))}</span>
                                        <span class="activity-time">${deps.formatTimeAgo(activity.created_at)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" onclick="toggleSection('comments')">
                            <h3>Comments</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${allComments.length === 0 ? `
                                <div class="comments-empty">No comments yet</div>
                            ` : allComments.map(comment => `
                                <div class="comment ${comment.is_attestation ? 'comment-attestation' : ''}">
                                    <div class="comment-avatar ${comment.is_attestation ? 'avatar-attestation' : ''}">${comment.is_attestation ? '✓' : (comment.author_name || 'U').charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${deps.escapeHtml(comment.author_name || 'User')}</span>
                                            ${comment.is_attestation ? `<span class="comment-ritual-badge">Ritual: ${deps.escapeHtml(comment.ritual_name)}</span>` : ''}
                                            <span class="comment-date">${deps.formatTimeAgo(comment.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${renderCommentContent(comment.content)}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <form class="comment-form" onsubmit="return handleAddComment(event, '${deps.escapeJsString(issue.id)}')">
                            <textarea id="new-comment" placeholder="Write a comment..." rows="3"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" onclick="showDetailDropdown(event, 'status', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${deps.getStatusIcon(issue.status)}
                                <span>${deps.formatStatus(issue.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'priority', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${deps.getPriorityIcon(issue.priority)}
                                <span>${deps.formatPriority(issue.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'type', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${issue.issue_type || 'task'}">${deps.formatIssueType(issue.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'assignee', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${assigneeName ? `${deps.renderAvatar(assignee, 'avatar-small')}<span>${deps.escapeHtml(assigneeName)}</span>` : `<span class="text-muted">Unassigned</span>`}
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'sprint', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${currentSprint ? deps.escapeHtml(currentSprint.name) : '<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" onclick="showDetailDropdown(event, 'labels', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${issue.labels && issue.labels.length > 0
                                    ? issue.labels.map(label => `
                                        <span class="issue-label" style="background: ${deps.sanitizeColor(label.color)}20; color: ${deps.sanitizeColor(label.color)}">${deps.escapeHtml(label.name)}</span>
                                    `).join('')
                                    : '<span class="text-muted">No Labels</span>'
                                }
                            </button>
                        </div>

                        ${project ? `
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${deps.escapeHtml(project.name)}</span>
                        </div>
                        ` : ''}

                        <div class="property-row" onclick="showDetailDropdown(event, 'estimate', '${deps.escapeJsString(issue.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${deps.formatEstimate(issue.estimate, issue.project_id)}</span>
                            </button>
                        </div>

                        ${issue.due_date ? `
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(issue.due_date).toLocaleDateString()}</span>
                        </div>
                        ` : ''}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${deps.escapeHtml(issue.creator_name || 'Unknown')}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(issue.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <button class="btn btn-secondary btn-block" onclick="showEditIssueModal('${deps.escapeJsString(issue.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Edit Issue
                        </button>
                        <button class="btn btn-danger-outline btn-block" onclick="deleteIssue('${deps.escapeJsString(issue.id)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            Delete
                        </button>
                    </div>
                </aside>
            </div>
        `;

        // Load ticket rituals (if any configured)
        loadTicketRituals(issue.id);
        deps.setupMentionAutocomplete();
    } catch (e) {
        deps.showToast(`Failed to load issue: ${e.message}`, 'error');
    }
}


// ============================================================================
// Issue Detail Actions (CHT-666)
// Extracted from app.js: comments, description editing, relations
// ============================================================================

/**
 * Add a comment to an issue.
 */
export async function handleAddComment(event, issueId) {
    event.preventDefault();
    const content = document.getElementById('new-comment').value;

    try {
        await deps.api.createComment(issueId, content);
        await viewIssue(issueId);
        deps.showToast('Comment added!', 'success');
    } catch (e) {
        deps.showToast(`Failed to add comment: ${e.message}`, 'error');
    }
    return false;
}

/**
 * Open description edit modal.
 */
export async function editDescription(issueId) {
    const issue = window.currentDetailIssue || await deps.api.getIssue(issueId);

    document.getElementById('modal-title').textContent = 'Edit Description';
    document.getElementById('modal-content').innerHTML = `
        <form onsubmit="return handleUpdateDescription(event, '${deps.escapeJsString(issueId)}')">
            <div class="form-group description-editor">
                <div class="editor-tabs">
                    <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                    <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
                </div>
                <textarea id="edit-description" rows="10" placeholder="Add a description...">${deps.escapeHtml(issue.description || '')}</textarea>
                <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    `;
    deps.showModal();
    const textarea = document.getElementById('edit-description');
    textarea.addEventListener('input', () => {
        const preview = document.getElementById('edit-description-preview');
        if (preview && preview.style.display !== 'none') {
            updateDescriptionPreview();
        }
    });
    textarea.focus();
}

function updateDescriptionPreview() {
    const textarea = document.getElementById('edit-description');
    const preview = document.getElementById('edit-description-preview');
    if (!textarea || !preview) return;
    const value = textarea.value.trim();
    preview.innerHTML = value
        ? renderDescriptionContent(value)
        : '<span class="text-muted">Nothing to preview.</span>';
}

/**
 * Switch description editor between write and preview modes.
 */
export function setDescriptionEditorMode(mode) {
    const writeTab = document.getElementById('edit-description-tab-write');
    const previewTab = document.getElementById('edit-description-tab-preview');
    const textarea = document.getElementById('edit-description');
    const preview = document.getElementById('edit-description-preview');
    if (!writeTab || !previewTab || !textarea || !preview) return;

    const isPreview = mode === 'preview';
    writeTab.classList.toggle('active', !isPreview);
    previewTab.classList.toggle('active', isPreview);
    textarea.style.display = isPreview ? 'none' : 'block';
    preview.style.display = isPreview ? 'block' : 'none';

    if (isPreview) {
        updateDescriptionPreview();
    } else {
        textarea.focus();
    }
}

/**
 * Save updated description.
 */
export async function handleUpdateDescription(event, issueId) {
    event.preventDefault();

    try {
        const descEl = document.getElementById('edit-description');
        if (!descEl) {
            throw new Error('Description field not found');
        }
        const description = descEl.value;
        await deps.api.updateIssue(issueId, { description });
        deps.closeModal();
        deps.showToast('Description updated', 'success');
        viewIssue(issueId, false);
    } catch (e) {
        deps.showToast(`Failed to update description: ${e.message}`, 'error');
    }
    return false;
}

/**
 * Show modal to add a relation to an issue.
 */
export function showAddRelationModal(issueId) {
    document.getElementById('modal-title').textContent = 'Add Relation';
    document.getElementById('modal-content').innerHTML = `
        <form onsubmit="return handleAddRelation(event, '${deps.escapeJsString(issueId)}')">
            <div class="form-group">
                <label for="relation-type">Relation Type</label>
                <select id="relation-type" required>
                    <option value="blocks">Blocks</option>
                    <option value="blocked_by">Blocked by</option>
                    <option value="relates_to">Relates to</option>
                </select>
            </div>
            <div class="form-group">
                <label for="relation-issue-search">Search Issues</label>
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${deps.escapeJsString(issueId)}')">
                <input type="hidden" id="selected-related-issue-id">
            </div>
            <div id="relation-search-results" class="link-results">
                <p class="empty-state-small">Enter a search term to find issues</p>
            </div>
            <div id="selected-issue-display" class="selected-issue-display" style="display: none;">
                <span class="selected-issue-label">Selected:</span>
                <span id="selected-issue-info"></span>
                <button type="button" class="btn btn-danger btn-tiny" onclick="clearSelectedRelation()">×</button>
            </div>
            <button type="submit" class="btn btn-primary" id="add-relation-btn" disabled>Add Relation</button>
        </form>
    `;
    deps.showModal();
    document.getElementById('relation-issue-search').focus();
}

/**
 * Search for issues to add as a relation.
 */
export async function searchIssuesToRelate(query, currentIssueId) {
    const resultsDiv = document.getElementById('relation-search-results');
    if (!query || query.length < 2) {
        resultsDiv.innerHTML = '<p class="empty-state-small">Enter a search term to find issues</p>';
        return;
    }

    try {
        const teamId = window.currentTeam?.id;
        const issues = await deps.api.searchIssues(teamId, query);
        const filteredIssues = issues.filter(issue => issue.id !== currentIssueId);

        if (filteredIssues.length === 0) {
            resultsDiv.innerHTML = '<p class="empty-state-small">No issues found</p>';
            return;
        }

        resultsDiv.innerHTML = filteredIssues.map(issue => `
            <div class="link-result-item" onclick="selectIssueForRelation('${deps.escapeJsString(issue.id)}', '${deps.escapeJsString(issue.identifier)}', '${deps.escapeJsString(issue.title)}')">
                <span class="link-result-id">${deps.escapeHtml(issue.identifier)}</span>
                <span class="link-result-title">${deps.escapeHtml(issue.title)}</span>
            </div>
        `).join('');
    } catch {
        resultsDiv.innerHTML = '<p class="empty-state-small error">Error searching issues</p>';
    }
}

/**
 * Select an issue from relation search results.
 */
export function selectIssueForRelation(issueId, identifier, title) {
    document.getElementById('selected-related-issue-id').value = issueId;
    document.getElementById('selected-issue-info').textContent = `${identifier}: ${title}`;
    document.getElementById('selected-issue-display').style.display = 'flex';
    document.getElementById('relation-search-results').style.display = 'none';
    document.getElementById('relation-issue-search').value = identifier;
    document.getElementById('add-relation-btn').disabled = false;
}

/**
 * Clear the selected relation issue.
 */
export function clearSelectedRelation() {
    document.getElementById('selected-related-issue-id').value = '';
    document.getElementById('selected-issue-display').style.display = 'none';
    document.getElementById('relation-search-results').style.display = 'block';
    document.getElementById('relation-issue-search').value = '';
    document.getElementById('add-relation-btn').disabled = true;
    document.getElementById('relation-issue-search').focus();
}

/**
 * Add a relation between two issues.
 */
export async function handleAddRelation(event, issueId) {
    event.preventDefault();
    const relationType = document.getElementById('relation-type').value;
    const relatedIssueId = document.getElementById('selected-related-issue-id').value;

    if (!relatedIssueId) {
        deps.showToast('Please select an issue', 'error');
        return false;
    }

    try {
        if (relationType === 'blocked_by') {
            await deps.api.createRelation(relatedIssueId, issueId, 'blocks');
        } else {
            await deps.api.createRelation(issueId, relatedIssueId, relationType);
        }

        deps.closeModal();
        deps.showToast('Relation added', 'success');
        viewIssue(issueId);
    } catch (e) {
        deps.showToast(`Failed to add relation: ${e.message}`, 'error');
    }
    return false;
}

/**
 * Delete a relation from an issue.
 */
export async function deleteRelation(issueId, relationId) {
    try {
        await deps.api.deleteRelation(issueId, relationId);
        deps.showToast('Relation removed', 'success');
        viewIssue(issueId);
    } catch (e) {
        deps.showToast(`Failed to remove relation: ${e.message}`, 'error');
    }
}
