/**
 * Revision history viewer for documents and issue descriptions.
 *
 * Generic over entity type: callers specify whether the target is a
 * "document" or "issue" via the entityType param. Server-side endpoints
 * differ in shape (full snapshot includes `content` for docs and
 * `description` for issues), but the viewer normalizes both into a
 * single `body` field internally.
 *
 * The viewer reuses the shared modal (#modal-overlay / #modal-content /
 * showModal()). It manages its own internal state for the selected
 * version(s) and re-renders into the modal body on each interaction.
 */

import { api } from './api.js';
import { escapeHtml, formatTimeAgo } from './utils.js';
import { showModal, showApiError, closeModal } from './ui.js';
import { renderMarkdown } from './gate-approvals.js';
import { registerActions } from './event-delegation.js';

// Entity-type adapters paper over the doc-vs-issue differences in
// endpoint name and snapshot field. Add a third entity here when the
// next one (comment bodies?) comes along.
const ADAPTERS = {
  document: {
    listLabel: 'Document history',
    bodyField: 'content',
    fetchList: (id) => api.getDocumentRevisions(id),
    fetchOne: (id, version) => api.getDocumentRevision(id, version),
  },
  issue: {
    listLabel: 'Description history',
    bodyField: 'description',
    fetchList: (id) => api.getIssueDescriptionRevisions(id),
    fetchOne: (id, version) => api.getIssueDescriptionRevision(id, version),
  },
};

// Module-scoped state for the currently-open viewer. Reset each time
// the modal closes via the data-action="close-revision-viewer" path
// (or any other close trigger that fires closeModal()).
let state = null;

/**
 * Entry point: load the revision list and render the viewer modal.
 * @param {'document'|'issue'} entityType
 * @param {string} entityId
 */
export async function showRevisionHistory(entityType, entityId) {
  const adapter = ADAPTERS[entityType];
  if (!adapter) {
    showApiError(new Error(`Unknown entity type: ${entityType}`));
    return;
  }

  let revisions;
  try {
    revisions = await adapter.fetchList(entityId);
  } catch (e) {
    showApiError(e);
    return;
  }

  state = {
    entityType,
    entityId,
    adapter,
    revisions, // newest-first
    cache: new Map(), // version -> full snapshot
    mode: 'view', // 'view' | 'compare'
    viewVersion: revisions[0]?.version ?? null,
    compareFromVersion: null,
    compareToVersion: null,
  };

  // Preload the latest snapshot so the initial render shows content
  // immediately instead of flashing a loading state.
  if (state.viewVersion != null) {
    try {
      const snap = await adapter.fetchOne(entityId, state.viewVersion);
      state.cache.set(state.viewVersion, snap);
    } catch (e) {
      showApiError(e);
    }
  }

  document.getElementById('modal-title').textContent = adapter.listLabel;
  document.querySelector('.modal')?.classList.add('modal-wide');
  renderViewer();
  showModal();
}

function renderViewer() {
  const content = document.getElementById('modal-content');
  if (!content || !state) return;

  if (state.revisions.length === 0) {
    content.innerHTML = '<p class="text-muted">No revisions yet.</p>';
    return;
  }

  const sidebarHtml = renderRevisionList();
  const panelHtml = state.mode === 'compare' ? renderComparePanel() : renderViewPanel();

  content.innerHTML = `
    <div class="revision-viewer">
      <aside class="revision-list">${sidebarHtml}</aside>
      <div class="revision-panel">${panelHtml}</div>
    </div>
  `;
}

function renderRevisionList() {
  const items = state.revisions.map((rev) => {
    const isSelected = state.mode === 'view'
      ? rev.version === state.viewVersion
      : rev.version === state.compareFromVersion || rev.version === state.compareToVersion;
    const compareTag =
      state.mode === 'compare'
        ? rev.version === state.compareFromVersion
          ? ' <span class="rev-tag">from</span>'
          : rev.version === state.compareToVersion
            ? ' <span class="rev-tag">to</span>'
            : ''
        : '';
    return `
      <button
        class="revision-list-item${isSelected ? ' is-selected' : ''}"
        data-action="select-revision-version"
        data-version="${rev.version}"
      >
        <div class="revision-version">v${rev.version}${compareTag}</div>
        <div class="revision-meta">
          <span class="revision-author">${escapeHtml(rev.author_name || 'Unknown')}</span>
          <span class="revision-time">${formatTimeAgo(rev.created_at)}</span>
        </div>
      </button>
    `;
  }).join('');

  const compareToggleLabel = state.mode === 'compare' ? 'Exit compare' : 'Compare versions';
  return `
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${compareToggleLabel}
      </button>
    </div>
    <div class="revision-list-items">${items}</div>
  `;
}

function renderViewPanel() {
  const version = state.viewVersion;
  if (version == null) return '<p class="text-muted">Pick a version.</p>';

  const snap = state.cache.get(version);
  if (!snap) {
    // Snapshot not loaded yet; selectRevision() will populate the
    // cache then re-render.
    return '<p class="text-muted">Loading…</p>';
  }

  const titleLine = snap.title
    ? `<h3 class="revision-snapshot-title">${escapeHtml(snap.title)}</h3>`
    : '';
  const body = snap[state.adapter.bodyField] || '';
  const rendered = body
    ? `<div class="markdown-body">${renderMarkdown(body)}</div>`
    : '<p class="text-muted">(empty)</p>';

  return `
    <div class="revision-panel-header">
      <div>
        <strong>v${snap.version}</strong>
        <span class="text-muted"> &middot; ${escapeHtml(snap.author_name || 'Unknown')} &middot; ${formatTimeAgo(snap.created_at)}</span>
      </div>
    </div>
    ${titleLine}
    ${rendered}
  `;
}

function renderComparePanel() {
  const fromV = state.compareFromVersion;
  const toV = state.compareToVersion;

  if (fromV == null || toV == null) {
    return `
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${fromV != null ? `<br>From: v${fromV}` : ''}
        ${toV != null ? `<br>To: v${toV}` : ''}
      </p>
    `;
  }

  const fromSnap = state.cache.get(fromV);
  const toSnap = state.cache.get(toV);
  if (!fromSnap || !toSnap) {
    return '<p class="text-muted">Loading…</p>';
  }

  // Diff on the body field. We don't diff titles separately — when a
  // title changes the user can see it via View mode on either version.
  const fromBody = fromSnap[state.adapter.bodyField] || '';
  const toBody = toSnap[state.adapter.bodyField] || '';
  const diffHtml = renderUnifiedDiff(fromBody, toBody);

  return `
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${fromV}</strong> &rarr; <strong>v${toV}</strong>
      </div>
    </div>
    ${diffHtml}
  `;
}

/**
 * Compute a line-level unified diff using LCS and render it as
 * marked-up HTML. Hand-rolled to avoid adding a npm dep for a feature
 * we expect to need rarely; if we ever want word-level granularity or
 * better hunk grouping, swap in the `diff` package.
 *
 * @param {string} a - left-hand text ("from")
 * @param {string} b - right-hand text ("to")
 * @returns {string} HTML
 */
function renderUnifiedDiff(a, b) {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const ops = diffLines(aLines, bLines);

  if (ops.every((op) => op.type === 'equal')) {
    return '<p class="text-muted">No changes.</p>';
  }

  const rows = ops.map((op) => {
    if (op.type === 'equal') {
      return op.lines.map((l) => `<div class="diff-line diff-context">${escapeHtml(l) || '&nbsp;'}</div>`).join('');
    }
    if (op.type === 'add') {
      return op.lines.map((l) => `<div class="diff-line diff-add">+ ${escapeHtml(l) || '&nbsp;'}</div>`).join('');
    }
    if (op.type === 'del') {
      return op.lines.map((l) => `<div class="diff-line diff-del">- ${escapeHtml(l) || '&nbsp;'}</div>`).join('');
    }
    return '';
  }).join('');

  return `<div class="revision-diff">${rows}</div>`;
}

/**
 * Classic Hunt-McIlroy LCS line diff. O(N*M) memory & time — fine for
 * the doc/description sizes we expect (kilobytes, not megabytes). If
 * we ever push that, switch to Myers or just hand off to jsdiff.
 *
 * @param {string[]} a
 * @param {string[]} b
 * @returns {Array<{type: 'equal'|'add'|'del', lines: string[]}>}
 */
function diffLines(a, b) {
  const n = a.length;
  const m = b.length;
  // dp[i][j] = LCS length of a[i:] and b[j:]
  const dp = Array(n + 1).fill(null).map(() => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i] === b[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const ops = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      pushOp(ops, 'equal', a[i]);
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      pushOp(ops, 'del', a[i]);
      i++;
    } else {
      pushOp(ops, 'add', b[j]);
      j++;
    }
  }
  while (i < n) { pushOp(ops, 'del', a[i++]); }
  while (j < m) { pushOp(ops, 'add', b[j++]); }
  return ops;
}

function pushOp(ops, type, line) {
  const last = ops[ops.length - 1];
  if (last && last.type === type) {
    last.lines.push(line);
  } else {
    ops.push({ type, lines: [line] });
  }
}

async function selectRevision(version) {
  if (!state) return;
  // Make sure the snapshot is cached before we re-render.
  if (!state.cache.has(version)) {
    try {
      const snap = await state.adapter.fetchOne(state.entityId, version);
      state.cache.set(version, snap);
    } catch (e) {
      showApiError(e);
      return;
    }
  }

  if (state.mode === 'view') {
    state.viewVersion = version;
  } else {
    // Compare mode: first click sets `from`, second click sets `to`,
    // subsequent clicks reassign `to` so the user can drag a range
    // around without exiting compare mode.
    if (state.compareFromVersion == null) {
      state.compareFromVersion = version;
    } else if (state.compareToVersion == null && version !== state.compareFromVersion) {
      // Order versions: smaller version is "from", larger is "to"
      // so the diff direction matches chronology.
      if (version < state.compareFromVersion) {
        state.compareToVersion = state.compareFromVersion;
        state.compareFromVersion = version;
      } else {
        state.compareToVersion = version;
      }
    } else {
      // Both set — replace the "to" with the new pick (treat it as
      // the user adjusting the right side of the comparison).
      if (version < state.compareFromVersion) {
        state.compareToVersion = state.compareFromVersion;
        state.compareFromVersion = version;
      } else if (version !== state.compareFromVersion) {
        state.compareToVersion = version;
      }
    }
  }
  renderViewer();
}

function toggleCompare() {
  if (!state) return;
  if (state.mode === 'view') {
    state.mode = 'compare';
    // Seed compare with the currently-viewed version on the right and
    // its immediate predecessor on the left, when possible. Common
    // case: "show me what changed in the latest edit."
    const viewing = state.viewVersion;
    const idx = state.revisions.findIndex((r) => r.version === viewing);
    if (idx >= 0 && idx + 1 < state.revisions.length) {
      const prev = state.revisions[idx + 1].version; // older than current
      state.compareFromVersion = prev;
      state.compareToVersion = viewing;
    } else {
      state.compareFromVersion = viewing;
      state.compareToVersion = null;
    }
    // Best-effort preload so the first render isn't a loading flash.
    const toLoad = [state.compareFromVersion, state.compareToVersion].filter(
      (v) => v != null && !state.cache.has(v),
    );
    Promise.all(toLoad.map((v) => state.adapter.fetchOne(state.entityId, v).then((snap) => {
      state.cache.set(v, snap);
    }).catch(() => { /* swallow; renderComparePanel will show loading */ })))
      .then(() => renderViewer());
  } else {
    state.mode = 'view';
    state.compareFromVersion = null;
    state.compareToVersion = null;
  }
  renderViewer();
}

registerActions({
  'show-document-revisions': (_event, data) => {
    showRevisionHistory('document', data.documentId);
  },
  'show-issue-description-revisions': (_event, data) => {
    showRevisionHistory('issue', data.issueId);
  },
  'select-revision-version': (_event, data) => {
    selectRevision(Number(data.version));
  },
  'toggle-revision-compare': () => {
    toggleCompare();
  },
  'close-revision-viewer': () => {
    state = null;
    closeModal();
  },
});

// Exposed for tests.
export const _internals = { diffLines, renderUnifiedDiff };
