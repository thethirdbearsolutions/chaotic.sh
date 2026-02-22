/**
 * Documents module for Chaotic frontend
 * Handles document list, view, create, edit, delete
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, sanitizeColor, formatTimeAgo } from './utils.js';
import { showModal, closeModal, showToast } from './ui.js';
import { getDocViewMode, setDocViewMode as persistDocViewMode } from './storage.js';
import { getCurrentTeam, setSelectedDocIndex } from './state.js';
import { registerActions } from './event-delegation.js';
import { getProjects, getSavedProjectId } from './projects.js';
import { renderMarkdown } from './gate-approvals.js';
import { marked } from 'marked';
import { navigateTo } from './router.js';

/**
 * Strip markdown syntax from text for plain preview display
 */
function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^#{1,6}\s+/gm, '')  // Headers
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // Bold
    .replace(/\*([^*]+)\*/g, '$1')  // Italic
    .replace(/__([^_]+)__/g, '$1')  // Bold alt
    .replace(/_([^_]+)_/g, '$1')  // Italic alt
    .replace(/`([^`]+)`/g, '$1')  // Inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Links
    .replace(/^[-*+]\s+/gm, '')  // Unordered lists
    .replace(/^\d+\.\s+/gm, '')  // Ordered lists
    .replace(/^>\s+/gm, '')  // Blockquotes
    .replace(/\n+/g, ' ')  // Collapse newlines
    .trim();
}

// Module state
let documents = [];  // Raw documents from API
let filteredDocs = [];  // After search/filter/sort
let currentTeamId = null;  // Team ID for fetching
let selectedDocIds = new Set();
let currentViewMode = 'list';  // 'list' or 'grid'
let isSelectionMode = false;  // Selection mode for bulk operations
let searchDebounceTimer = null;  // Debounce timer for search

// Initialize view mode from storage
const savedViewMode = getDocViewMode();
if (savedViewMode === 'list' || savedViewMode === 'grid') {
  currentViewMode = savedViewMode;
}

/**
 * Set document view mode (list or grid)
 * @param {string} mode - 'list' or 'grid'
 */
export function setDocViewMode(mode) {
  if (mode !== 'list' && mode !== 'grid') return;
  currentViewMode = mode;

  // Exit selection mode when switching to grid
  if (mode === 'grid' && isSelectionMode) {
    exitSelectionMode();
  }

  // Persist preference
  persistDocViewMode(mode);

  // Update toggle button states
  const listBtn = document.getElementById('doc-view-list');
  const gridBtn = document.getElementById('doc-view-grid');
  if (listBtn && gridBtn) {
    listBtn.classList.toggle('active', mode === 'list');
    gridBtn.classList.toggle('active', mode === 'grid');
  }

  // Update select button visibility (only in list mode)
  const selectBtn = document.getElementById('doc-select-btn');
  if (selectBtn) {
    selectBtn.classList.toggle('hidden', mode === 'grid');
  }

  // Re-render with new mode
  filterDocuments();
}

/**
 * Enter selection mode for bulk operations
 */
export function enterSelectionMode() {
  if (currentViewMode !== 'list') return;
  isSelectionMode = true;
  selectedDocIds.clear();

  // Update UI
  const selectBtn = document.getElementById('doc-select-btn');
  if (selectBtn) {
    selectBtn.textContent = 'Cancel';
    selectBtn.dataset.action = 'exit-selection-mode';
  }

  // Re-render to show checkboxes
  filterDocuments();
  updateBulkActionsBar();
}

/**
 * Exit selection mode
 */
export function exitSelectionMode() {
  isSelectionMode = false;
  selectedDocIds.clear();

  // Update UI
  const selectBtn = document.getElementById('doc-select-btn');
  if (selectBtn) {
    selectBtn.textContent = 'Select';
    selectBtn.dataset.action = 'enter-selection-mode';
  }

  // Re-render to hide checkboxes
  filterDocuments();
  updateBulkActionsBar();
}

/**
 * Debounce search input (300ms delay)
 */
export function debounceDocSearch() {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
  searchDebounceTimer = setTimeout(() => {
    filterDocuments();
  }, 300);
}

/**
 * Clear document search
 */
export function clearDocSearch() {
  const searchInput = document.getElementById('doc-search');
  if (searchInput) {
    searchInput.value = '';
  }
  filterDocuments();
}

/**
 * Clear document project filter (re-fetches from server)
 */
export async function clearDocProjectFilter() {
  const projectFilter = document.getElementById('doc-project-filter');
  if (projectFilter) {
    projectFilter.value = '';
  }
  await onDocProjectFilterChange();
}

/**
 * Clear all document filters (re-fetches from server)
 */
export async function clearAllDocFilters() {
  const searchInput = document.getElementById('doc-search');
  const projectFilter = document.getElementById('doc-project-filter');
  if (searchInput) {
    searchInput.value = '';
  }
  if (projectFilter) {
    projectFilter.value = '';
  }
  await onDocProjectFilterChange();
}

/**
 * Update filter chips row based on current filters
 */
function updateDocFilterChips() {
  const chipsRow = document.getElementById('doc-filter-chips');
  if (!chipsRow) return;

  const searchTerm = document.getElementById('doc-search')?.value || '';
  const projectFilter = document.getElementById('doc-project-filter')?.value || '';

  const chips = [];

  if (searchTerm) {
    chips.push(`<span class="filter-chip">Search: "${escapeHtml(searchTerm)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`);
  }

  if (projectFilter) {
    const projectSelect = document.getElementById('doc-project-filter');
    const projectName = projectSelect?.options[projectSelect.selectedIndex]?.text || 'Project';
    chips.push(`<span class="filter-chip">Project: ${escapeHtml(projectName)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`);
  }

  if (chips.length > 0) {
    let html = chips.join(' ');
    if (chips.length > 1) {
      html += ` <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>`;
    }
    chipsRow.innerHTML = html;
    chipsRow.classList.remove('hidden');
  } else {
    chipsRow.innerHTML = '';
    chipsRow.classList.add('hidden');
  }
}

/**
 * Get current documents list
 * @returns {Array} Current documents
 */
export function getDocuments() {
  return documents;
}

/**
 * Filter, sort, and re-render documents based on current UI state.
 * Operates client-side on the already-loaded `documents` array.
 */
export function filterDocuments() {
  const searchTerm = document.getElementById('doc-search')?.value?.toLowerCase() || '';
  const sortBy = document.getElementById('doc-sort')?.value || 'updated_desc';

  // Update filter chips
  updateDocFilterChips();

  // Filter (client-side search for responsiveness)
  filteredDocs = documents.filter(doc => {
    if (searchTerm) {
      const titleMatch = doc.title?.toLowerCase().includes(searchTerm);
      const contentMatch = doc.content?.toLowerCase().includes(searchTerm);
      if (!titleMatch && !contentMatch) return false;
    }
    return true;
  });

  // Sort
  filteredDocs.sort((a, b) => {
    switch (sortBy) {
      case 'title_asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'title_desc':
        return (b.title || '').localeCompare(a.title || '');
      case 'updated_asc':
        return new Date(a.updated_at) - new Date(b.updated_at);
      case 'updated_desc':
      default:
        return new Date(b.updated_at) - new Date(a.updated_at);
    }
  });

  renderDocuments('', currentViewMode);
}

/**
 * Handle project filter dropdown change (CHT-970).
 * Re-fetches documents from server with new project filter, then re-renders.
 */
export async function onDocProjectFilterChange() {
  const teamId = currentTeamId || getCurrentTeam()?.id;
  if (!teamId) return;

  const projectFilter = document.getElementById('doc-project-filter')?.value || null;
  try {
    documents = await api.getDocuments(teamId, projectFilter);
    filterDocuments();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Load documents for the current team/project
 * @param {string} teamId - Team ID
 * @param {string} projectId - Project ID (optional, filters by project)
 */
export async function loadDocuments(teamId, projectId = null) {
  if (!teamId) {
    // Fall back to getCurrentTeam() for backward compat
    teamId = getCurrentTeam()?.id;
  }
  if (!teamId) return;

  currentTeamId = teamId;
  setSelectedDocIndex(-1);

  // Show loading skeleton (CHT-1047)
  const listEl = document.getElementById('documents-list');
  if (listEl) {
    listEl.innerHTML = Array(4).fill(0).map(() => `
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join('');
  }

  // Use project from dropdown if not explicitly specified
  if (projectId === null) {
    const docProjectFilter = document.getElementById('doc-project-filter');
    if (docProjectFilter?.value) {
      projectId = docProjectFilter.value;
    }
  }

  try {
    documents = await api.getDocuments(teamId, projectId);

    // Initialize view toggle button states
    const listBtn = document.getElementById('doc-view-list');
    const gridBtn = document.getElementById('doc-view-grid');
    if (listBtn && gridBtn) {
      listBtn.classList.toggle('active', currentViewMode === 'list');
      gridBtn.classList.toggle('active', currentViewMode === 'grid');
    }

    filterDocuments();  // Apply search/sort and render
  } catch (e) {
    // Clear skeleton on error (CHT-1047)
    const errEl = document.getElementById('documents-list');
    if (errEl) errEl.innerHTML = '';
    showToast(e.message, 'error');
  }
}

/**
 * Render labels as colored badges
 */
function renderLabelBadges(labels) {
  if (!labels || labels.length === 0) return '';
  return labels.slice(0, 2).map(label =>
    `<span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>`
  ).join(' ') + (labels.length > 2 ? ` <span class="text-muted">+${labels.length - 2}</span>` : '');
}

/**
 * Render a single document card (grid view)
 */
function renderDocumentCard(doc) {
  const labelsHtml = doc.labels && doc.labels.length > 0
    ? `<div class="grid-item-labels">${renderLabelBadges(doc.labels)}</div>`
    : '';
  return `
    <div class="grid-item" data-doc-id="${escapeAttr(doc.id)}" data-action="view-document" data-document-id="${escapeAttr(doc.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${escapeHtml(doc.icon) || '\u{1F4C4}'}
        </div>
        <div class="grid-item-title">${escapeHtml(doc.title)}</div>
      </div>
      ${labelsHtml}
      <div class="grid-item-description">${doc.content ? escapeHtml(stripMarkdown(doc.content).substring(0, 100)) + '...' : 'No content'}</div>
      <div class="grid-item-footer">
        <span>${doc.project_id ? '' : '<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${doc.sprint_id ? '<span class="badge badge-info" title="Sprint document">Sprint</span> ' : ''}${doc.author_name ? `By ${escapeHtml(doc.author_name)} \u00B7 ` : ''}Updated ${new Date(doc.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `;
}

/**
 * Render a single document as a list row
 */
function renderDocumentListItem(doc) {
  const labelsHtml = doc.labels && doc.labels.length > 0
    ? doc.labels.slice(0, 2).map(label =>
        `<span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>`
      ).join(' ') + (doc.labels.length > 2 ? ` <span class="text-muted">+${doc.labels.length - 2}</span>` : '')
    : '';

  const scopeBadges = [];
  if (!doc.project_id) {
    scopeBadges.push('<span class="badge badge-secondary badge-small">Global</span>');
  }
  if (doc.sprint_id) {
    scopeBadges.push('<span class="badge badge-info badge-small">Sprint</span>');
  }

  const snippet = doc.content ? stripMarkdown(doc.content).substring(0, 80) : 'No content';

  // Checkbox for selection mode
  const checkboxHtml = isSelectionMode
    ? `<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${escapeAttr(doc.id)}">
         <input type="checkbox" id="doc-check-${doc.id}" ${selectedDocIds.has(doc.id) ? 'checked' : ''}>
       </div>`
    : '';

  const selectedClass = isSelectionMode && selectedDocIds.has(doc.id) ? ' selected' : '';
  const actionName = isSelectionMode ? 'toggle-doc-selection' : 'view-document';

  return `
    <div class="list-item document-list-item${selectedClass}" data-action="${actionName}" data-document-id="${escapeAttr(doc.id)}" data-doc-id="${escapeAttr(doc.id)}">
      ${checkboxHtml}
      <div class="document-list-icon">${escapeHtml(doc.icon) || '\u{1F4C4}'}</div>
      <div class="document-list-main">
        <div class="document-list-title">${escapeHtml(doc.title)}</div>
        <div class="document-list-snippet text-muted">${escapeHtml(snippet)}${doc.content && doc.content.length > 80 ? '...' : ''}</div>
      </div>
      <div class="document-list-meta">
        ${labelsHtml ? `<div class="document-list-labels">${labelsHtml}</div>` : ''}
        <div class="document-list-badges">${scopeBadges.join(' ')}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${doc.author_name ? escapeHtml(doc.author_name) : ''}</span>
        <span class="text-muted">${new Date(doc.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `;
}

/**
 * Render the documents list
 * @param {string} groupBy - Group by field (project, sprint, or empty)
 * @param {string} viewMode - View mode: 'list' or 'grid'
 */
export function renderDocuments(groupBy = '', viewMode = 'list') {
  const list = document.getElementById('documents-list');
  if (!list) return;

  // Clear selection when re-rendering
  selectedDocIds.clear();
  updateBulkActionsBar();

  // Always use filteredDocs — it's the canonical set after filter/sort (CHT-971)
  const docsToRender = filteredDocs;

  if (docsToRender.length === 0) {
    const searchTerm = document.getElementById('doc-search')?.value;
    const projectFilter = document.getElementById('doc-project-filter')?.value;
    const hasFilters = searchTerm || projectFilter;
    list.innerHTML = `
      <div class="empty-state">
        <h3>${hasFilters ? 'No documents match your filters' : 'No documents yet'}</h3>
        <p>${hasFilters ? 'Try different search terms or filters' : 'Create your first document to get started'}</p>
      </div>
    `;
    return;
  }

  // Choose render function based on view mode
  const renderItem = viewMode === 'grid' ? renderDocumentCard : renderDocumentListItem;
  const containerClass = viewMode === 'grid' ? 'documents-grid' : 'documents-list-view';

  if (!groupBy) {
    // No grouping - render flat list or grid
    list.innerHTML = `<div class="${containerClass}">${docsToRender.map(renderItem).join('')}</div>`;
    return;
  }

  // Group documents
  const groups = {};
  const projects = getProjects();

  docsToRender.forEach(doc => {
    let groupKey, groupLabel;
    if (groupBy === 'project') {
      groupKey = doc.project_id || '__global__';
      if (groupKey === '__global__') {
        groupLabel = 'Global (Team-wide)';
      } else {
        const project = projects.find(p => p.id === doc.project_id);
        groupLabel = project ? project.name : 'Unknown Project';
      }
    } else if (groupBy === 'sprint') {
      groupKey = doc.sprint_id || '__no_sprint__';
      groupLabel = doc.sprint_id ? `Sprint` : 'No Sprint';
    }
    if (!groups[groupKey]) {
      groups[groupKey] = { label: groupLabel, docs: [] };
    }
    groups[groupKey].docs.push(doc);
  });

  // Render groups
  let html = '';
  for (const [_key, group] of Object.entries(groups)) {
    const groupContentClass = viewMode === 'grid' ? 'doc-group-content grid' : 'doc-group-content';
    html += `
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${escapeHtml(group.label)}</span>
          <span class="doc-group-count">${group.docs.length}</span>
        </div>
        <div class="${groupContentClass}">
          ${group.docs.map(renderItem).join('')}
        </div>
      </div>
    `;
  }
  list.innerHTML = html;
}

/**
 * Toggle document selection
 * @param {string} docId - Document ID to toggle
 */
export function toggleDocSelection(docId) {
  if (selectedDocIds.has(docId)) {
    selectedDocIds.delete(docId);
  } else {
    selectedDocIds.add(docId);
  }
  // Update checkbox state
  const checkbox = document.getElementById(`doc-check-${docId}`);
  if (checkbox) {
    checkbox.checked = selectedDocIds.has(docId);
  }
  // Update grid item selected state
  const gridItem = document.querySelector(`.grid-item[data-doc-id="${docId}"]`);
  if (gridItem) {
    gridItem.classList.toggle('selected', selectedDocIds.has(docId));
  }
  updateBulkActionsBar();
}

/**
 * Select all documents
 */
export function selectAllDocs() {
  // Only select visible (filtered) documents (CHT-972)
  filteredDocs.forEach(doc => selectedDocIds.add(doc.id));
  filteredDocs.forEach(doc => {
    const checkbox = document.getElementById(`doc-check-${doc.id}`);
    if (checkbox) checkbox.checked = true;
    const gridItem = document.querySelector(`.grid-item[data-doc-id="${doc.id}"]`);
    if (gridItem) gridItem.classList.add('selected');
  });
  updateBulkActionsBar();
}

/**
 * Clear document selection
 */
export function clearDocSelection() {
  // Clear checkboxes for all previously selected docs
  selectedDocIds.forEach(docId => {
    const checkbox = document.getElementById(`doc-check-${docId}`);
    if (checkbox) checkbox.checked = false;
    const gridItem = document.querySelector(`.grid-item[data-doc-id="${docId}"]`);
    if (gridItem) gridItem.classList.remove('selected');
  });
  selectedDocIds.clear();
  updateBulkActionsBar();
}

/**
 * Update the bulk actions bar visibility and content
 */
function updateBulkActionsBar() {
  const bar = document.getElementById('doc-bulk-actions');
  if (!bar) return;

  if (isSelectionMode) {
    bar.classList.remove('hidden');
    if (selectedDocIds.size > 0) {
      bar.innerHTML = `
        <span class="bulk-count">${selectedDocIds.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `;
    } else {
      bar.innerHTML = `
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `;
    }
  } else {
    bar.classList.add('hidden');
    bar.innerHTML = '';
  }
}

/**
 * Show modal to bulk move documents to a project
 */
export async function showBulkMoveModal() {
  if (selectedDocIds.size === 0) {
    showToast('No documents selected', 'error');
    return;
  }

  const projects = getProjects();
  const projectOptions = projects.map(p =>
    `<option value="${p.id}">${escapeHtml(p.name)}</option>`
  ).join('');

  document.getElementById('modal-title').textContent = `Move ${selectedDocIds.size} Document${selectedDocIds.size > 1 ? 's' : ''}`;
  document.getElementById('modal-content').innerHTML = `
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${projectOptions}
        </select>
      </div>
      <p class="text-muted">This will move ${selectedDocIds.size} selected document${selectedDocIds.size > 1 ? 's' : ''} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `;
  showModal();
}

/**
 * Handle bulk move form submission
 * @param {Event} event - Form submit event
 */
export async function handleBulkMove(event) {
  event.preventDefault();

  const projectId = document.getElementById('bulk-move-project').value || null;
  const docIds = Array.from(selectedDocIds);

  let successCount = 0;
  let errorCount = 0;

  for (const docId of docIds) {
    try {
      await api.updateDocument(docId, { project_id: projectId });
      successCount++;
    } catch (e) {
      console.error(`Failed to move document ${docId}:`, e);
      errorCount++;
    }
  }

  closeModal();
  clearDocSelection();

  if (errorCount === 0) {
    showToast(`Moved ${successCount} document${successCount > 1 ? 's' : ''}!`, 'success');
  } else {
    showToast(`Moved ${successCount}, failed ${errorCount}`, 'warning');
  }

  // Reload documents
  const teamId = getCurrentTeam()?.id;
  await loadDocuments(teamId);

  return false;
}

/**
 * Bulk delete selected documents
 */
export async function bulkDeleteDocuments() {
  if (selectedDocIds.size === 0) {
    showToast('No documents selected', 'error');
    return;
  }

  const count = selectedDocIds.size;
  if (!confirm(`Are you sure you want to delete ${count} document${count > 1 ? 's' : ''}? This cannot be undone.`)) {
    return;
  }

  const docIds = Array.from(selectedDocIds);
  let successCount = 0;
  let errorCount = 0;

  for (const docId of docIds) {
    try {
      await api.deleteDocument(docId);
      successCount++;
    } catch (e) {
      console.error(`Failed to delete document ${docId}:`, e);
      errorCount++;
    }
  }

  exitSelectionMode();

  if (errorCount === 0) {
    showToast(`Deleted ${successCount} document${successCount > 1 ? 's' : ''}!`, 'success');
  } else {
    showToast(`Deleted ${successCount}, failed ${errorCount}`, 'warning');
  }

  // Reload documents
  const teamId = getCurrentTeam()?.id;
  await loadDocuments(teamId);
}

/**
 * View a single document
 * @param {string} documentId - Document ID
 * @param {boolean} pushHistory - Whether to update browser history
 */
export async function viewDocument(documentId, pushHistory = true) {
  try {
    const doc = await api.getDocument(documentId);

    // Update URL
    if (pushHistory) {
      history.pushState({ documentId }, '', `/document/${documentId}`);
    }

    document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
    const detailView = document.getElementById('document-detail-view');
    detailView.classList.remove('hidden');

    // Fetch comments
    let commentsHtml = '';
    try {
      const comments = await api.getDocumentComments(doc.id);
      const commentsListHtml = comments.length === 0
        ? '<div class="comments-empty">No comments yet</div>'
        : comments.map(comment => `
            <div class="comment" data-comment-id="${escapeAttr(comment.id)}">
              <div class="comment-avatar">${comment.author_name?.charAt(0)?.toUpperCase() || 'U'}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${escapeHtml(comment.author_name || 'Unknown')}</span>
                  <span class="comment-date">${formatTimeAgo(comment.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${renderMarkdown(comment.content)}</div>
              </div>
            </div>
          `).join('');

      commentsHtml = `
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${commentsListHtml}</div>
          <form class="comment-form comment-form-sticky" data-action="add-document-comment" data-document-id="${escapeAttr(doc.id)}">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="1"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `;
    } catch (e) {
      console.error('Failed to load comments:', e);
    }

    // Look up project and sprint names
    let projectName = null;
    let sprintName = null;
    if (doc.project_id) {
      const projects = getProjects();
      const project = projects.find(p => p.id === doc.project_id);
      projectName = project ? project.name : null;

      if (doc.sprint_id) {
        try {
          const sprint = await api.getSprint(doc.sprint_id);
          sprintName = sprint ? sprint.name : null;
        } catch {
          // Sprint lookup failed, ignore
        }
      }
    }

    // Strip leading H1 from markdown if it matches the document title (avoid duplicate)
    let contentToRender = doc.content || '';
    const tokens = marked.lexer(contentToRender);
    if (doc.title && tokens.length > 0 && tokens[0].type === 'heading' && tokens[0].depth === 1
        && tokens[0].text.trim() === doc.title.trim()) {
      contentToRender = contentToRender.slice(tokens[0].raw.length).trimStart();
    }

    // Prev/next navigation (CHT-1095)
    const docList = getDocuments();
    const currentIndex = docList.findIndex(d => d.id === doc.id);
    const prevDoc = currentIndex > 0 ? docList[currentIndex - 1] : null;
    const nextDoc = currentIndex >= 0 && currentIndex < docList.length - 1 ? docList[currentIndex + 1] : null;
    const inList = currentIndex >= 0;

    // Build sidebar labels
    const sidebarLabelsHtml = doc.labels && doc.labels.length > 0
      ? doc.labels.map(label => `
          <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">
            ${escapeHtml(label.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${escapeAttr(doc.id)}" data-label-id="${escapeAttr(label.id)}" title="Remove label">&times;</button>
          </span>
        `).join('')
      : '<span class="text-muted">No Labels</span>';

    // Build sidebar linked issues
    let sidebarLinkedHtml = '<span class="text-muted">None</span>';
    try {
      const linkedIssues = await api.getDocumentIssues(doc.id);
      if (linkedIssues.length > 0) {
        sidebarLinkedHtml = linkedIssues.map(issue => `
          <div class="linked-item">
            <span class="linked-item-id">${escapeHtml(issue.identifier)}</span>
            <span class="linked-item-title">${escapeHtml(issue.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${escapeAttr(doc.id)}" data-issue-id="${escapeAttr(issue.id)}" title="Unlink">&times;</button>
          </div>
        `).join('');
      }
    } catch {
      // Silently ignore
    }

    detailView.querySelector('#document-detail-content').innerHTML = `
      <div class="issue-detail-layout">
        <div class="issue-detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="documents">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${inList ? `
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${prevDoc ? `data-action="view-document" data-document-id="${escapeAttr(prevDoc.id)}"` : 'disabled'} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${currentIndex + 1} / ${docList.length}</span>
              <button class="issue-nav-btn" ${nextDoc ? `data-action="view-document" data-document-id="${escapeAttr(nextDoc.id)}"` : 'disabled'} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            ` : ''}
            <span class="issue-detail-breadcrumb">${projectName ? escapeHtml(projectName) + ' ›' : ''} ${escapeHtml(doc.title)}</span>
          </div>

          <h1 class="issue-detail-title">${doc.icon ? escapeHtml(doc.icon) + ' ' : ''}${escapeHtml(doc.title)}</h1>

          <div class="document-content markdown-body">${contentToRender ? renderMarkdown(contentToRender) : '<p class="text-muted">No content</p>'}</div>

          ${commentsHtml}
        </div>

        <aside class="issue-detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${projectName ? escapeHtml(projectName) : '<span class="text-muted">Global</span>'}</span>
            </div>

            ${sprintName ? `
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${escapeHtml(sprintName)}</span>
            </div>
            ` : ''}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${sidebarLabelsHtml}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${escapeAttr(doc.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${escapeHtml(doc.author_name || 'Unknown')}</span>
            </div>

            <div class="property-row">
              <span class="property-label">Created</span>
              <span class="property-value-static">${new Date(doc.created_at).toLocaleDateString()}</span>
            </div>

            <div class="property-row">
              <span class="property-label">Updated</span>
              <span class="property-value-static">${new Date(doc.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div class="sidebar-section">
            <h4>Linked Issues</h4>
            <div class="sidebar-linked-issues">
              ${sidebarLinkedHtml}
            </div>
            <button class="btn btn-secondary btn-small" data-action="show-link-issue-modal" data-document-id="${escapeAttr(doc.id)}" style="margin-top: 8px;">+ Link Issue</button>
          </div>

          <div class="sidebar-section sidebar-actions">
            <div class="sidebar-overflow-menu">
              <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div class="overflow-menu-dropdown hidden">
                <button class="overflow-menu-item" data-action="show-edit-document-modal" data-document-id="${escapeAttr(doc.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit document
                </button>
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${escapeAttr(doc.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;

    // Set up overflow menu (matches issue-detail-view pattern)
    const overflowTrigger = detailView.querySelector('.sidebar-overflow-trigger');
    const overflowDropdown = detailView.querySelector('.overflow-menu-dropdown');
    if (overflowTrigger && overflowDropdown) {
      const closeOverflow = () => {
        overflowDropdown.classList.add('hidden');
        overflowTrigger.setAttribute('aria-expanded', 'false');
      };
      const toggleOverflow = () => {
        const isHidden = overflowDropdown.classList.toggle('hidden');
        overflowTrigger.setAttribute('aria-expanded', String(!isHidden));
      };
      overflowTrigger.addEventListener('click', toggleOverflow);
      document.addEventListener('click', (e) => {
        if (!overflowTrigger.contains(e.target) && !overflowDropdown.contains(e.target)) {
          closeOverflow();
        }
      });
      overflowDropdown.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeOverflow();
          overflowTrigger.focus();
        }
      });
    }
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Update sprint dropdown based on selected project
 * @param {string} selectId - The ID of the sprint select element
 * @param {string} projectId - The selected project ID
 * @param {string} selectedSprintId - Optional: pre-select this sprint
 */
async function updateSprintDropdown(selectId, projectId, selectedSprintId = null, selectActiveSprint = false) {
  const sprintSelect = document.getElementById(selectId);
  if (!sprintSelect) return;

  if (!projectId) {
    sprintSelect.innerHTML = '<option value="">Select project first</option>';
    sprintSelect.disabled = true;
    return;
  }

  try {
    const sprints = await api.getSprints(projectId);
    // If selectActiveSprint is true and no selectedSprintId provided, find the active sprint
    let sprintToSelect = selectedSprintId;
    if (selectActiveSprint && !selectedSprintId) {
      const activeSprint = sprints.find(s => s.status === 'active');
      if (activeSprint) {
        sprintToSelect = activeSprint.id;
      }
    }
    const sprintOptions = sprints.map(s =>
      `<option value="${s.id}" ${s.id === sprintToSelect ? 'selected' : ''}>${escapeHtml(s.name)}</option>`
    ).join('');
    sprintSelect.innerHTML = `<option value="">None</option>${sprintOptions}`;
    sprintSelect.disabled = false;
  } catch {
    sprintSelect.innerHTML = '<option value="">Error loading sprints</option>';
    sprintSelect.disabled = true;
  }
}

/**
 * Show the create document modal
 */
export async function showCreateDocumentModal() {
  // Get projects for dropdown
  const projects = getProjects();
  // Get current project from localStorage if available
  const currentProjectId = getSavedProjectId() || '';

  const projectOptions = projects.map(p =>
    `<option value="${p.id}" ${p.id === currentProjectId ? 'selected' : ''}>${escapeHtml(p.name)}</option>`
  ).join('');

  document.getElementById('modal-title').textContent = 'Create Document';
  document.getElementById('modal-content').innerHTML = `
    <form data-action="create-document">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="doc-sprint">
          <option value="">Global (Team-wide)</option>
          ${projectOptions}
        </select>
      </div>
      <div class="form-group">
        <label for="doc-sprint">Sprint (optional)</label>
        <select id="doc-sprint" disabled>
          <option value="">Select project first</option>
        </select>
      </div>
      <div class="form-group">
        <label for="doc-content">Content</label>
        <textarea id="doc-content" style="min-height: 200px"></textarea>
      </div>
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="\u{1F4C4}" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `;
  showModal();

  // If a project is pre-selected, load its sprints with active sprint selected
  if (currentProjectId) {
    await updateSprintDropdown('doc-sprint', currentProjectId, null, true);
  }
}

/**
 * Handle create document form submission
 * @param {Event} event - Form submit event
 */
export async function handleCreateDocument(event) {
  event.preventDefault();

  const teamId = getCurrentTeam()?.id;
  if (!teamId) {
    showToast('No team selected', 'error');
    return false;
  }

  const projectId = document.getElementById('doc-project').value || null;
  const sprintId = document.getElementById('doc-sprint').value || null;
  const data = {
    title: document.getElementById('doc-title').value,
    content: document.getElementById('doc-content').value,
    icon: document.getElementById('doc-icon').value || null,
    project_id: projectId,
    sprint_id: sprintId,
  };

  try {
    await api.createDocument(teamId, data);
    await loadDocuments(teamId);
    closeModal();
    showToast('Document created!', 'success');
  } catch (e) {
    showToast(e.message, 'error');
  }
  return false;
}

/**
 * Show the edit document modal
 * @param {string} documentId - Document ID to edit
 */
export async function showEditDocumentModal(documentId) {
  try {
    const doc = await api.getDocument(documentId);

    // Get projects for dropdown
    const projects = getProjects();
    const projectOptions = projects.map(p =>
      `<option value="${p.id}" ${p.id === doc.project_id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`
    ).join('');

    document.getElementById('modal-title').textContent = 'Edit Document';
    document.getElementById('modal-content').innerHTML = `
      <form data-action="update-document" data-document-id="${escapeAttr(documentId)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${escapeAttr(doc.title)}" required>
        </div>
        <div class="form-group">
          <label for="edit-doc-project">Project</label>
          <select id="edit-doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="edit-doc-sprint">
            <option value="" ${!doc.project_id ? 'selected' : ''}>Global (Team-wide)</option>
            ${projectOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-sprint">Sprint (optional)</label>
          <select id="edit-doc-sprint" ${!doc.project_id ? 'disabled' : ''}>
            <option value="">${!doc.project_id ? 'Select project first' : 'None'}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-content">Content</label>
          <textarea id="edit-doc-content" style="min-height: 200px">${escapeHtml(doc.content || '')}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${escapeAttr(doc.icon || '')}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `;
    showModal();

    // Load sprints for current project if document has one
    if (doc.project_id) {
      await updateSprintDropdown('edit-doc-sprint', doc.project_id, doc.sprint_id);
    }
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Handle update document form submission
 * @param {Event} event - Form submit event
 * @param {string} documentId - Document ID to update
 */
export async function handleUpdateDocument(event, documentId) {
  event.preventDefault();

  const projectId = document.getElementById('edit-doc-project').value || null;
  const sprintId = document.getElementById('edit-doc-sprint').value || null;
  const data = {
    title: document.getElementById('edit-doc-title').value,
    content: document.getElementById('edit-doc-content').value,
    icon: document.getElementById('edit-doc-icon').value || null,
    project_id: projectId,
    sprint_id: sprintId,
  };

  try {
    await api.updateDocument(documentId, data);
    closeModal();
    await viewDocument(documentId);
    showToast('Document updated!', 'success');
  } catch (e) {
    showToast(e.message, 'error');
  }
  return false;
}

/**
 * Delete a document
 * @param {string} documentId - Document ID to delete
 */
export async function deleteDocument(documentId) {
  if (!confirm('Are you sure you want to delete this document?')) return;

  try {
    await api.deleteDocument(documentId);
    const teamId = getCurrentTeam()?.id;
    await loadDocuments(teamId);
    navigateTo('documents');
    showToast('Document deleted!', 'success');
  } catch (e) {
    showToast(e.message, 'error');
  }
}

// Window-exposed wrapper for sprint dropdown update
function updateDocSprintDropdown(selectId, projectId) {
  updateSprintDropdown(selectId, projectId);
}

/**
 * Show modal to link a document to an issue
 * @param {string} documentId - Document ID to link
 */
export async function showLinkIssueModal(documentId) {
  document.getElementById('modal-title').textContent = 'Link Issue';
  document.getElementById('modal-content').innerHTML = `
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${escapeAttr(documentId)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `;
  showModal();
}

/**
 * Search issues for linking
 * @param {string} query - Search query
 * @param {string} documentId - Document ID to link to
 */
async function searchIssuesToLink(query, documentId) {
  const resultsDiv = document.getElementById('link-issue-results');
  if (!query || query.length < 2) {
    resultsDiv.innerHTML = '<p class="empty-state-small">Enter a search term to find issues</p>';
    return;
  }

  try {
    const teamId = getCurrentTeam()?.id;
    const issues = await api.searchIssues(teamId, query);
    if (issues.length === 0) {
      resultsDiv.innerHTML = '<p class="empty-state-small">No issues found</p>';
      return;
    }

    resultsDiv.innerHTML = issues.map(issue => `
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${escapeAttr(documentId)}" data-issue-id="${escapeAttr(issue.id)}">
        <span class="link-result-id">${escapeHtml(issue.identifier)}</span>
        <span class="link-result-title">${escapeHtml(issue.title)}</span>
      </div>
    `).join('');
  } catch {
    resultsDiv.innerHTML = '<p class="empty-state-small error">Error searching issues</p>';
  }
}

/**
 * Link a document to an issue
 * @param {string} documentId - Document ID
 * @param {string} issueId - Issue ID
 */
async function linkToIssue(documentId, issueId) {
  try {
    await api.linkDocumentToIssue(documentId, issueId);
    closeModal();
    showToast('Issue linked!', 'success');
    await viewDocument(documentId, false);
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Unlink a document from an issue
 * @param {string} documentId - Document ID
 * @param {string} issueId - Issue ID
 */
export async function unlinkDocumentFromIssue(documentId, issueId) {
  if (!confirm('Unlink this issue from the document?')) return;

  try {
    await api.unlinkDocumentFromIssue(documentId, issueId);
    showToast('Issue unlinked!', 'success');
    await viewDocument(documentId, false);
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Handle adding a comment to a document
 * @param {Event} event - Form submit event
 * @param {string} documentId - Document ID
 */
let docCommentSubmitting = false;

export async function handleAddDocumentComment(event, documentId) {
  event.preventDefault();
  if (docCommentSubmitting) return false;

  const textarea = document.getElementById('new-doc-comment');
  const content = textarea.value.trim();

  if (!content) {
    showToast('Please enter a comment', 'error');
    return false;
  }

  docCommentSubmitting = true;
  try {
    await api.createDocumentComment(documentId, content);
    textarea.value = '';
    showToast('Comment added!', 'success');
    await viewDocument(documentId, false);
  } catch (e) {
    showToast(e.message, 'error');
  } finally {
    docCommentSubmitting = false;
  }

  return false;
}

/**
 * Show modal to add a label to a document
 * @param {string} documentId - Document ID
 */
export async function showAddLabelToDocModal(documentId) {
  const teamId = getCurrentTeam()?.id;
  if (!teamId) {
    showToast('No team selected', 'error');
    return;
  }

  try {
    const labels = await api.getLabels(teamId);
    if (labels.length === 0) {
      document.getElementById('modal-title').textContent = 'Add Label';
      document.getElementById('modal-content').innerHTML = `
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `;
      showModal();
      return;
    }

    const labelItems = labels.map(label => `
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${escapeAttr(documentId)}" data-label-id="${escapeAttr(label.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${sanitizeColor(label.color)}; color: white;">${escapeHtml(label.name)}</span>
        ${label.description ? `<span class="text-muted">${escapeHtml(label.description)}</span>` : ''}
      </div>
    `).join('');

    document.getElementById('modal-title').textContent = 'Add Label';
    document.getElementById('modal-content').innerHTML = `
      <div class="label-select-list">${labelItems}</div>
    `;
    showModal();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Add a label to a document
 * @param {string} documentId - Document ID
 * @param {string} labelId - Label ID
 */
async function addLabelToDoc(documentId, labelId) {
  try {
    await api.addLabelToDocument(documentId, labelId);
    closeModal();
    showToast('Label added!', 'success');
    await viewDocument(documentId, false);
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Remove a label from a document
 * @param {string} documentId - Document ID
 * @param {string} labelId - Label ID
 */
async function removeLabelFromDoc(documentId, labelId) {
  try {
    await api.removeLabelFromDocument(documentId, labelId);
    showToast('Label removed!', 'success');
    await viewDocument(documentId, false);
  } catch (e) {
    showToast(e.message, 'error');
  }
}

// ============================================================================
// Event delegation actions
// ============================================================================

registerActions({
    'view-document': (event, data) => {
        event.preventDefault();
        viewDocument(data.documentId);
    },
    'toggle-doc-selection': (event, data) => {
        event.stopPropagation();
        toggleDocSelection(data.docId);
    },
    'clear-doc-search': () => {
        clearDocSearch();
    },
    'clear-doc-project-filter': () => {
        clearDocProjectFilter();
    },
    'clear-all-doc-filters': () => {
        clearAllDocFilters();
    },
    'show-bulk-move-modal': () => {
        showBulkMoveModal();
    },
    'bulk-delete-documents': () => {
        bulkDeleteDocuments();
    },
    'select-all-docs': () => {
        selectAllDocs();
    },
    'clear-doc-selection': () => {
        clearDocSelection();
    },
    'exit-selection-mode': () => {
        exitSelectionMode();
    },
    'enter-selection-mode': () => {
        enterSelectionMode();
    },
    'handle-bulk-move': (event) => {
        handleBulkMove(event);
    },
    'unlink-document-issue': (_event, data) => {
        unlinkDocumentFromIssue(data.documentId, data.issueId);
    },
    'show-link-issue-modal': (_event, data) => {
        showLinkIssueModal(data.documentId);
    },
    'add-document-comment': (event, data) => {
        handleAddDocumentComment(event, data.documentId);
    },
    'remove-label-from-doc': (_event, data) => {
        removeLabelFromDoc(data.documentId, data.labelId);
    },
    'show-add-label-to-doc-modal': (_event, data) => {
        showAddLabelToDocModal(data.documentId);
    },
    'show-edit-document-modal': (_event, data) => {
        showEditDocumentModal(data.documentId);
    },
    'delete-document': (_event, data) => {
        deleteDocument(data.documentId);
    },
    'create-document': (event) => {
        handleCreateDocument(event);
    },
    'update-doc-sprint-dropdown': (_event, data, target) => {
        updateDocSprintDropdown(data.sprintSelect, target.value);
    },
    'update-document': (event, data) => {
        handleUpdateDocument(event, data.documentId);
    },
    'search-issues-to-link': (_event, data, target) => {
        searchIssuesToLink(target.value, data.documentId);
    },
    'link-to-issue': (_event, data) => {
        linkToIssue(data.documentId, data.issueId);
    },
    'add-label-to-doc': (_event, data) => {
        addLabelToDoc(data.documentId, data.labelId);
    },
});

