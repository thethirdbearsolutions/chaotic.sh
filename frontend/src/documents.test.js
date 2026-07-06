import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setCurrentTeam, setState, setCurrentView } from './state.js';
import {
  getDocuments,
  loadDocuments,
  fetchDocumentsForCurrentProject,
  renderDocuments,
  viewDocument,
  showCreateDocumentModal,
  handleCreateDocument,
  showEditDocumentModal,
  handleUpdateDocument,
  deleteDocument,
  refreshDocumentsListIfActive,
  refreshDocumentDetailIfViewing,
  handleRemoteDocumentDeleted,
  handleBulkMove,
  bulkDeleteDocuments,
  enterSelectionMode,
  toggleDocSelection,
} from './documents.js';
import { api } from './api.js';
import { showToast } from './ui.js';
import { getDocumentDraft, getDocumentDraftBase, setDocumentDraft, getCommentDraft, setCommentDraft } from './storage.js';
import { registerActions } from './event-delegation.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getDocuments: vi.fn(),
    getDocument: vi.fn(),
    getDocumentComments: vi.fn().mockResolvedValue([]),
    getDocumentIssues: vi.fn().mockResolvedValue([]),
    getSprint: vi.fn(),
    createDocument: vi.fn(),
    updateDocument: vi.fn(),
    deleteDocument: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
}));

// Mock event-delegation.js
vi.mock('./event-delegation.js', () => ({
  registerActions: vi.fn(),
}));

// Mock router.js
const mockNavigateTo = vi.fn();
const mockSaveScrollPosition = vi.fn();
vi.mock('./router.js', () => ({
  navigateTo: (...args) => mockNavigateTo(...args),
  saveScrollPosition: (...args) => mockSaveScrollPosition(...args),
}));

// Mock projects.js
vi.mock('./projects.js', () => ({
  getProjects: vi.fn(() => []),
  getSavedProjectId: vi.fn(() => ''),
}));

// Mock gate-approvals.js
vi.mock('./gate-approvals.js', () => ({
  renderMarkdown: vi.fn((c) => c),
}));

// Mock mention-autocomplete.js and quote-comment.js (CHT-1213) — documents.js
// now wires both onto its comment box, but the wiring itself (not these
// modules' own logic, which has its own test files) is what's under test here.
const mockSetupMentionAutocomplete = vi.fn();
vi.mock('./mention-autocomplete.js', () => ({
  setupMentionAutocomplete: (...args) => mockSetupMentionAutocomplete(...args),
}));
const mockSetupQuoteComment = vi.fn();
const mockQuoteSelectionIntoComment = vi.fn(() => false);
vi.mock('./quote-comment.js', () => ({
  setupQuoteComment: (...args) => mockSetupQuoteComment(...args),
  quoteSelectionIntoComment: (...args) => mockQuoteSelectionIntoComment(...args),
}));

// Combine every registerActions({...}) call documents.js made at import time
// into one lookup, so tests can invoke a delegated handler directly (CHT-1213
// — mirrors the pattern already used in issue-detail-view.test.js).
const documentActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

describe('getDocuments', () => {
  it('returns empty array initially', () => {
    expect(getDocuments()).toEqual([]);
  });
});

describe('loadDocuments', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="documents-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns early if no teamId provided and no currentTeam', async () => {
    setCurrentTeam(null);
    await loadDocuments();
    expect(api.getDocuments).not.toHaveBeenCalled();
  });

  it('uses provided teamId', async () => {
    api.getDocuments.mockResolvedValue([]);
    await loadDocuments('team-2');
    expect(api.getDocuments).toHaveBeenCalledWith('team-2', null);
  });

  it('falls back to window.currentTeam.id', async () => {
    api.getDocuments.mockResolvedValue([]);
    await loadDocuments();
    expect(api.getDocuments).toHaveBeenCalledWith('team-1', null);
  });

  it('uses currentProject from state if available', async () => {
    setState('currentProject', 'proj-1');
    api.getDocuments.mockResolvedValue([]);
    await loadDocuments();
    expect(api.getDocuments).toHaveBeenCalledWith('team-1', 'proj-1');
    setState('currentProject', null);
  });

  it('renders documents after loading', async () => {
    const docs = [
      { id: 'doc-1', title: 'Test Doc', content: 'Content here', updated_at: '2024-01-01' },
    ];
    api.getDocuments.mockResolvedValue(docs);
    await loadDocuments('team-1');
    expect(document.getElementById('documents-list').innerHTML).toContain('Test Doc');
  });

  // CHT-1224: was `errEl.innerHTML = ''` on failure — worse than the
  // skeleton it replaced, since the list area just went blank with no
  // message, indistinguishable from a team with zero documents.
  it('renders a persistent error + Retry cta instead of blanking the list on failure', async () => {
    api.getDocuments.mockRejectedValue(new Error('boom'));
    await loadDocuments('team-1');
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('Failed to load documents');
    expect(list.innerHTML).toContain('data-action="retry-load-documents"');
  });

  it('wires the retry-load-documents action to re-run loadDocuments() for the last-loaded team', async () => {
    api.getDocuments.mockRejectedValue(new Error('boom'));
    await loadDocuments('team-1');

    api.getDocuments.mockResolvedValue([]);
    await documentActions['retry-load-documents']();

    expect(api.getDocuments).toHaveBeenLastCalledWith('team-1', null);
  });
});

// CHT-1224: documents.js:281-327 — fetchDocumentsForCurrentProject() (used
// on project-filter change) didn't even clear the skeleton on failure, and
// only fired a self-dismissing toast.
describe('fetchDocumentsForCurrentProject', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="documents-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('renders a persistent error + Retry cta on failure', async () => {
    api.getDocuments.mockResolvedValue([]);
    await loadDocuments('team-1'); // establishes currentTeamId

    api.getDocuments.mockRejectedValue(new Error('boom'));
    await fetchDocumentsForCurrentProject();

    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('Failed to load documents');
    expect(list.innerHTML).toContain('data-action="retry-load-documents"');
  });
});

describe('renderDocuments', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="documents-list"></div>';
  });

  it('returns early if documents-list element not found', () => {
    document.body.innerHTML = '';
    // Should not throw
    renderDocuments();
  });

  it('renders empty state when no documents', async () => {
    api.getDocuments.mockResolvedValue([]);
    setCurrentTeam({ id: 'team-1' });
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('No documents yet');
    setCurrentTeam(null);
  });

  it('renders documents with escaped HTML', async () => {
    const docs = [
      { id: 'doc-1', title: '<script>xss</script>', content: 'Test', updated_at: '2024-01-01' },
    ];
    api.getDocuments.mockResolvedValue(docs);
    setCurrentTeam({ id: 'team-1' });
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).not.toContain('<script>');
    expect(list.innerHTML).toContain('&lt;script&gt;');
    setCurrentTeam(null);
  });

  it('uses default icon when none provided', async () => {
    const docs = [{ id: 'doc-1', title: 'Test', content: null, updated_at: '2024-01-01' }];
    api.getDocuments.mockResolvedValue(docs);
    setCurrentTeam({ id: 'team-1' });
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('📄');
    setCurrentTeam(null);
  });

  it('truncates long content in preview', async () => {
    const longContent = 'A'.repeat(150);
    const docs = [{ id: 'doc-1', title: 'Test', content: longContent, updated_at: '2024-01-01' }];
    api.getDocuments.mockResolvedValue(docs);
    setCurrentTeam({ id: 'team-1' });
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('...');
    setCurrentTeam(null);
  });
});

describe('viewDocument', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view"></div>
      <div id="document-detail-view" class="hidden">
        <div id="document-detail-content"></div>
      </div>
    `;
    vi.clearAllMocks();
    // Mock history.pushState
    vi.spyOn(history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and displays document', async () => {
    const doc = { id: 'doc-1', title: 'Test Doc', content: '# Hello', updated_at: '2024-01-01' };
    api.getDocument.mockResolvedValue(doc);
    window.renderMarkdown = (c) => `<p>${c}</p>`;

    await viewDocument('doc-1');

    expect(api.getDocument).toHaveBeenCalledWith('doc-1');
    const content = document.getElementById('document-detail-content');
    expect(content.innerHTML).toContain('Test Doc');
    delete window.renderMarkdown;
  });

  it('updates browser history by default', async () => {
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
    await viewDocument('doc-1');
    expect(history.pushState).toHaveBeenCalledWith({ documentId: 'doc-1' }, '', '/document/doc-1');
  });

  it('does not update history when pushHistory=false', async () => {
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
    await viewDocument('doc-1', false);
    expect(history.pushState).not.toHaveBeenCalled();
  });

  it('escapes document title for XSS prevention', async () => {
    const doc = { id: 'doc-1', title: '<img onerror=alert(1)>', content: null, updated_at: '2024-01-01' };
    api.getDocument.mockResolvedValue(doc);
    await viewDocument('doc-1');
    const content = document.getElementById('document-detail-content');
    // Check that the title is rendered as text, not as HTML elements
    const titleEl = content.querySelector('.issue-detail-title');
    expect(titleEl.textContent).toBe('<img onerror=alert(1)>');
    // Verify no img element was created
    expect(content.querySelector('img')).toBeNull();
  });

  // CHT-1224: documents.js:750-757 (sprint lookup), 786-800 (linked issues) —
  // both used to silently ignore failures, rendering the same markup as the
  // genuinely-empty case.
  describe('sidebar lookup failures', () => {
    it('logs and renders a distinct marker when the linked-issues lookup fails, instead of "None"', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentIssues.mockRejectedValue(new Error('boom'));

      await viewDocument('doc-1');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load linked issues:', expect.any(Error));
      const content = document.getElementById('document-detail-content');
      expect(content.innerHTML).toContain("Couldn't load linked issues");
      consoleErrorSpy.mockRestore();
    });

    it('logs and renders a distinct marker when the sprint-name lookup fails, instead of omitting the row', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      api.getDocument.mockResolvedValue({
        id: 'doc-1', title: 'Test', updated_at: '2024-01-01',
        project_id: 'proj-1', sprint_id: 'sprint-1',
      });
      api.getSprint.mockRejectedValue(new Error('boom'));

      await viewDocument('doc-1');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load sprint name:', expect.any(Error));
      const content = document.getElementById('document-detail-content');
      expect(content.innerHTML).toContain('Sprint');
      expect(content.innerHTML).toContain("Couldn't load");
      consoleErrorSpy.mockRestore();
    });
  });

  // CHT-1211 item 1: scroll position must be saved before pushState
  describe('scroll position', () => {
    beforeEach(() => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      mockSaveScrollPosition.mockClear();
    });

    it('saves scroll position when pushHistory is true (default)', async () => {
      await viewDocument('doc-1');
      expect(mockSaveScrollPosition).toHaveBeenCalled();
    });

    it('does not save scroll position when pushHistory=false', async () => {
      await viewDocument('doc-1', false);
      expect(mockSaveScrollPosition).not.toHaveBeenCalled();
    });

    // CHT-1211 review #4: must run synchronously before the first await —
    // proven by it firing even when the fetch rejects.
    it('saves scroll position before the fetch (still saved on fetch failure)', async () => {
      api.getDocument.mockRejectedValue(new Error('slow network died'));
      try {
        await viewDocument('doc-1');
      } catch {
        // viewDocument may rethrow; the assertion below is what matters
      }
      expect(mockSaveScrollPosition).toHaveBeenCalled();
    });
  });

  // CHT-1211 item 3/4: document detail 'Back' was hardcoded to 'documents'
  // instead of computing backView from getCurrentView() — a dead end when a
  // document is opened from inside a Sprint's Documents tab.
  describe('Back button target', () => {
    beforeEach(() => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
    });

    afterEach(() => {
      setState('currentView', 'my-issues');
    });

    it('defaults to documents when there is no current view', async () => {
      setState('currentView', null);
      await viewDocument('doc-1');

      const backBtn = document.querySelector('#document-detail-content [data-action="navigate-to"]');
      expect(backBtn.dataset.view).toBe('documents');
    });

    it('returns to the view the document was opened from (e.g. a sprint)', async () => {
      setState('currentView', 'sprint');
      await viewDocument('doc-1');

      const backBtn = document.querySelector('#document-detail-content [data-action="navigate-to"]');
      expect(backBtn.dataset.view).toBe('sprint');
    });
  });
});

describe('showCreateDocumentModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
  });

  it('sets modal title', () => {
    showCreateDocumentModal();
    expect(document.getElementById('modal-title').textContent).toBe('Create Document');
  });

  it('renders form with required fields', () => {
    showCreateDocumentModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('doc-title');
    expect(content.innerHTML).toContain('doc-content');
    expect(content.innerHTML).toContain('doc-icon');
  });
});

describe('handleCreateDocument', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="doc-title" value="New Doc">
      <select id="doc-project"><option value="">Global</option><option value="proj-1" selected>Project 1</option></select>
      <select id="doc-sprint"><option value="">None</option><option value="sprint-1" selected>Sprint 1</option></select>
      <textarea id="doc-content">Content here</textarea>
      <input id="doc-icon" value="📝">
      <div id="documents-list"></div>
    `;
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.createDocument.mockResolvedValue({});
    api.getDocuments.mockResolvedValue([]);
    await handleCreateDocument(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('sends correct data to API', async () => {
    const event = { preventDefault: vi.fn() };
    api.createDocument.mockResolvedValue({});
    api.getDocuments.mockResolvedValue([]);
    await handleCreateDocument(event);
    expect(api.createDocument).toHaveBeenCalledWith('team-1', {
      title: 'New Doc',
      content: 'Content here',
      icon: '📝',
      project_id: 'proj-1',
      sprint_id: 'sprint-1',
    });
  });

  it('sends null icon when empty', async () => {
    document.getElementById('doc-icon').value = '';
    const event = { preventDefault: vi.fn() };
    api.createDocument.mockResolvedValue({});
    api.getDocuments.mockResolvedValue([]);
    await handleCreateDocument(event);
    expect(api.createDocument).toHaveBeenCalledWith('team-1', {
      title: 'New Doc',
      content: 'Content here',
      icon: null,
      project_id: 'proj-1',
      sprint_id: 'sprint-1',
    });
  });
});

describe('showEditDocumentModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    vi.clearAllMocks();
  });

  it('fetches document and populates form', async () => {
    const doc = { id: 'doc-1', title: 'Existing Doc', content: 'Old content', icon: '📄' };
    api.getDocument.mockResolvedValue(doc);
    await showEditDocumentModal('doc-1');
    expect(document.getElementById('modal-title').textContent).toBe('Edit Document');
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('Existing Doc');
    expect(content.innerHTML).toContain('Old content');
  });

  it('escapes document values in form', async () => {
    const doc = { id: 'doc-1', title: '<script>xss</script>', content: '<img onerror=alert(1)>', icon: '' };
    api.getDocument.mockResolvedValue(doc);
    await showEditDocumentModal('doc-1');
    // Values should be properly set in form fields as text
    const titleInput = document.getElementById('edit-doc-title');
    const contentTextarea = document.getElementById('edit-doc-content');
    expect(titleInput.value).toBe('<script>xss</script>');
    expect(contentTextarea.value).toBe('<img onerror=alert(1)>');
    // Verify no script or img elements were created in the modal
    const content = document.getElementById('modal-content');
    expect(content.querySelector('script')).toBeNull();
  });
});

describe('handleUpdateDocument', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="edit-doc-title" value="Updated Title">
      <select id="edit-doc-project"><option value="">Global</option><option value="proj-1" selected>Project 1</option></select>
      <select id="edit-doc-sprint"><option value="">None</option><option value="sprint-2" selected>Sprint 2</option></select>
      <textarea id="edit-doc-content">Updated content</textarea>
      <input id="edit-doc-icon" value="📝">
      <div class="view"></div>
      <div id="document-detail-view" class="hidden">
        <div id="document-detail-content"></div>
      </div>
    `;
    vi.clearAllMocks();
    vi.spyOn(history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.updateDocument.mockResolvedValue({});
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Updated', updated_at: '2024-01-01' });
    await handleUpdateDocument(event, 'doc-1');
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('sends correct data to API', async () => {
    const event = { preventDefault: vi.fn() };
    api.updateDocument.mockResolvedValue({});
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Updated', updated_at: '2024-01-01' });
    await handleUpdateDocument(event, 'doc-1');
    expect(api.updateDocument).toHaveBeenCalledWith('doc-1', {
      title: 'Updated Title',
      content: 'Updated content',
      icon: '📝',
      project_id: 'proj-1',
      sprint_id: 'sprint-2',
    });
  });
});

describe('deleteDocument', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="documents-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    // Mock confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    setCurrentTeam(null);
    vi.restoreAllMocks();
  });

  it('prompts for confirmation', async () => {
    api.deleteDocument.mockResolvedValue({});
    api.getDocuments.mockResolvedValue([]);
    await deleteDocument('doc-1');
    expect(window.confirm).toHaveBeenCalled();
  });

  it('does nothing if user cancels', async () => {
    window.confirm.mockReturnValue(false);
    await deleteDocument('doc-1');
    expect(api.deleteDocument).not.toHaveBeenCalled();
  });

  it('deletes document and navigates to list', async () => {
    api.deleteDocument.mockResolvedValue({});
    api.getDocuments.mockResolvedValue([]);
    await deleteDocument('doc-1');
    expect(api.deleteDocument).toHaveBeenCalledWith('doc-1');
    expect(mockNavigateTo).toHaveBeenCalledWith('documents');
  });
});

// CHT-1213: doc-edit polish — comment box Cmd/Ctrl+Enter, draft persistence,
// @mention autocomplete, quote-and-comment, keyboard prev/next, auto-linked
// issue IDs, and a visible+retryable comments-fetch failure. All of these
// already existed on the issue detail view; documents had none of them.
describe('viewDocument (CHT-1213 polish)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view"></div>
      <div id="document-detail-view" class="hidden">
        <div id="document-detail-content"></div>
      </div>
    `;
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe('comment form', () => {
    it('shows a platform-aware Cmd/Ctrl+Enter hint in the placeholder', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      const textarea = document.getElementById('new-doc-comment');
      expect(textarea.placeholder).toMatch(/Enter to submit/);
    });

    it('submits the form on Cmd/Ctrl+Enter', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      const textarea = document.getElementById('new-doc-comment');
      const form = textarea.closest('form');
      const requestSubmitSpy = vi.spyOn(form, 'requestSubmit').mockImplementation(() => {});
      textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true, cancelable: true }));
      expect(requestSubmitSpy).toHaveBeenCalled();
    });

    it('restores a saved comment draft on open', async () => {
      setCommentDraft('doc-1', 'an abandoned comment');
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      expect(document.getElementById('new-doc-comment').value).toBe('an abandoned comment');
    });

    it('saves the comment draft on input', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      const textarea = document.getElementById('new-doc-comment');
      textarea.value = 'typing a comment';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      expect(getCommentDraft('doc-1')).toBe('typing a comment');
    });

    it('wires up @mention autocomplete on the comment textarea', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      expect(mockSetupMentionAutocomplete).toHaveBeenCalledWith('new-doc-comment', 'doc-mention-suggestions');
    });
  });

  describe('quote-and-comment', () => {
    it('wires up setupQuoteComment against the document container/textarea', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      expect(mockSetupQuoteComment).toHaveBeenCalledWith(expect.objectContaining({
        containerId: 'document-detail-content',
        textareaId: 'new-doc-comment',
      }));
    });

    it('Cmd/Ctrl+Shift+. triggers quoteSelectionIntoComment targeting the doc comment box', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '.', ctrlKey: true, shiftKey: true, bubbles: true, cancelable: true }));
      expect(mockQuoteSelectionIntoComment).toHaveBeenCalledWith('new-doc-comment');
    });
  });

  describe('keyboard prev/next', () => {
    beforeEach(async () => {
      api.getDocument.mockImplementation((id) => Promise.resolve({ id, title: `Doc ${id}`, updated_at: '2024-01-01' }));
      api.getDocumentComments.mockResolvedValue([]);
      // Populate the module's documents list so prev/next resolve (CHT-1095's
      // existing computation, keyed off getDocuments()).
      setCurrentTeam({ id: 'team-1' });
      api.getDocuments.mockResolvedValue([
        { id: 'doc-1', title: 'Doc 1', updated_at: '2024-01-01' },
        { id: 'doc-2', title: 'Doc 2', updated_at: '2024-01-01' },
        { id: 'doc-3', title: 'Doc 3', updated_at: '2024-01-01' },
      ]);
      await loadDocuments('team-1');
    });

    afterEach(() => {
      setCurrentTeam(null);
    });

    it('ArrowRight navigates to the next document', async () => {
      await viewDocument('doc-2');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
      // Let the resulting viewDocument('doc-3') promise settle
      await Promise.resolve();
      await Promise.resolve();
      expect(api.getDocument).toHaveBeenCalledWith('doc-3');
    });

    it('ArrowLeft navigates to the previous document', async () => {
      await viewDocument('doc-2');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
      await Promise.resolve();
      await Promise.resolve();
      expect(api.getDocument).toHaveBeenCalledWith('doc-1');
    });

    it('does not navigate when focus is in a text input', async () => {
      await viewDocument('doc-2');
      api.getDocument.mockClear();
      const textarea = document.getElementById('new-doc-comment');
      textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
      await Promise.resolve();
      expect(api.getDocument).not.toHaveBeenCalled();
    });
  });

  describe('comments-fetch failure', () => {
    it('shows an inline error with a Retry action instead of silently omitting the section', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockRejectedValue(new Error('network down'));
      await viewDocument('doc-1');
      const content = document.getElementById('document-detail-content');
      expect(content.querySelector('.comments-error')).toBeTruthy();
      const retryBtn = content.querySelector('[data-action="retry-document-comments"]');
      expect(retryBtn).toBeTruthy();
      expect(retryBtn.dataset.documentId).toBe('doc-1');
    });

    it('retry re-loads the document detail view', async () => {
      const retryAction = documentActions['retry-document-comments'];
      expect(retryAction).toBeTypeOf('function');
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      api.getDocument.mockClear();
      await retryAction(null, { documentId: 'doc-1' });
      expect(api.getDocument).toHaveBeenCalledWith('doc-1');
    });

    it('still renders the comment list normally when the fetch succeeds', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([{ id: 'c1', author_name: 'Alice', content: 'Hi', created_at: '2024-01-01' }]);
      await viewDocument('doc-1');
      const content = document.getElementById('document-detail-content');
      expect(content.querySelector('.comments-error')).toBeNull();
      expect(content.textContent).toContain('Alice');
    });
  });

  describe('auto-linked issue IDs', () => {
    it('links a bare issue ID in the document body', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', content: 'see CHT-402 for context', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      const body = document.querySelector('.document-content');
      const link = body.querySelector('a.issue-link');
      expect(link).toBeTruthy();
      expect(link.textContent).toBe('CHT-402');
    });

    it('links a bare issue ID in a document comment', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([{ id: 'c1', author_name: 'Alice', content: 'blocked by CHT-11', created_at: '2024-01-01' }]);
      await viewDocument('doc-1');
      const commentBody = document.querySelector('.comment-content');
      const link = commentBody.querySelector('a.issue-link');
      expect(link).toBeTruthy();
      expect(link.textContent).toBe('CHT-11');
    });
  });
});

describe('document draft persistence (CHT-1213)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('restores a create-modal draft on open', () => {
    setDocumentDraft('new', { title: 'Draft title', content: 'Draft content', icon: '📝' });
    showCreateDocumentModal();
    expect(document.getElementById('doc-title').value).toBe('Draft title');
    expect(document.getElementById('doc-content').value).toBe('Draft content');
    expect(document.getElementById('doc-icon').value).toBe('📝');
  });

  it('saves a create-modal draft on input', () => {
    showCreateDocumentModal();
    document.getElementById('doc-title').value = 'New title';
    document.getElementById('doc-title').dispatchEvent(new Event('input', { bubbles: true }));
    expect(getDocumentDraft('new')).toEqual(expect.objectContaining({ title: 'New title' }));
  });

  it('clears the create-modal draft after a successful create', async () => {
    setDocumentDraft('new', { title: 'Draft title' });
    document.body.innerHTML = `
      <input id="doc-title" value="Draft title">
      <select id="doc-project"><option value="" selected>Global</option></select>
      <select id="doc-sprint" disabled><option value="">Select project first</option></select>
      <textarea id="doc-content"></textarea>
      <input id="doc-icon" value="">
      <div id="documents-list"></div>
    `;
    setCurrentTeam({ id: 'team-1' });
    api.createDocument.mockResolvedValue({});
    api.getDocuments.mockResolvedValue([]);
    await handleCreateDocument({ preventDefault: vi.fn() });
    expect(getDocumentDraft('new')).toBeNull();
    setCurrentTeam(null);
  });

  // PR #210 review finding 1: the edit modal follows storage.js's DRAFT
  // POLICY — prefill only when the draft's basedOn snapshot matches the live
  // server fields, never silently; on mismatch warn and keep server content.
  describe('edit-modal restore policy', () => {
    const serverDoc = { id: 'doc-1', title: 'Existing', content: 'Server content', icon: '📄' };
    const serverBase = { title: 'Existing', content: 'Server content', icon: '📄' };

    it('prefills a draft whose basedOn matches the server content, with a visible notice', async () => {
      setDocumentDraft('doc-1', { title: 'Existing', content: 'Recovered edit', icon: '📄' }, serverBase);
      api.getDocument.mockResolvedValue(serverDoc);
      await showEditDocumentModal('doc-1');
      expect(document.getElementById('edit-doc-content').value).toBe('Recovered edit');
      const warnEl = document.getElementById('edit-doc-content-draft-warning');
      expect(warnEl.classList.contains('hidden')).toBe(false);
      expect(warnEl.textContent).toContain('Restored');
    });

    it('does NOT prefill a draft whose basedOn mismatches; warns and keeps server content', async () => {
      setDocumentDraft('doc-1', { title: 'Existing', content: 'Stale edit', icon: '📄' },
        { title: 'Existing', content: 'An older version of the content', icon: '📄' });
      api.getDocument.mockResolvedValue(serverDoc);
      await showEditDocumentModal('doc-1');
      expect(document.getElementById('edit-doc-content').value).toBe('Server content');
      const warnEl = document.getElementById('edit-doc-content-draft-warning');
      expect(warnEl.classList.contains('hidden')).toBe(false);
      expect(warnEl.textContent).toContain('not loaded');
      // The stored draft survives untouched — not silently deleted
      expect(getDocumentDraft('doc-1')).toEqual(expect.objectContaining({ content: 'Stale edit' }));
    });

    it('does NOT prefill a draft with no basedOn snapshot (treated as stale)', async () => {
      setDocumentDraft('doc-1', { content: 'Recovered edit' }); // basedOn defaults to null
      api.getDocument.mockResolvedValue(serverDoc);
      await showEditDocumentModal('doc-1');
      expect(document.getElementById('edit-doc-content').value).toBe('Server content');
      expect(document.getElementById('edit-doc-content-draft-warning').classList.contains('hidden')).toBe(false);
    });

    it('shows no warning when there is no draft at all', async () => {
      api.getDocument.mockResolvedValue(serverDoc);
      await showEditDocumentModal('doc-1');
      expect(document.getElementById('edit-doc-content').value).toBe('Server content');
      expect(document.getElementById('edit-doc-content-draft-warning').classList.contains('hidden')).toBe(true);
    });

    it('saves edit-modal drafts with the server snapshot as basedOn on input', async () => {
      api.getDocument.mockResolvedValue(serverDoc);
      await showEditDocumentModal('doc-1');
      const contentEl = document.getElementById('edit-doc-content');
      contentEl.value = 'Fresh edit';
      contentEl.dispatchEvent(new Event('input', { bubbles: true }));
      expect(getDocumentDraft('doc-1')).toEqual(expect.objectContaining({ content: 'Fresh edit' }));
      expect(getDocumentDraftBase('doc-1')).toEqual(serverBase);
    });

    it('clears the draft when the fields return to the server content', async () => {
      api.getDocument.mockResolvedValue(serverDoc);
      await showEditDocumentModal('doc-1');
      const contentEl = document.getElementById('edit-doc-content');
      contentEl.value = 'Fresh edit';
      contentEl.dispatchEvent(new Event('input', { bubbles: true }));
      expect(getDocumentDraft('doc-1')).not.toBeNull();
      contentEl.value = 'Server content';
      contentEl.dispatchEvent(new Event('input', { bubbles: true }));
      expect(getDocumentDraft('doc-1')).toBeNull();
    });
  });

  it('clears the edit-modal draft after a save that committed it', async () => {
    setDocumentDraft('doc-1', { title: 'Updated Title', content: 'Updated content', icon: '' },
      { title: 'Old', content: 'Old content', icon: '' });
    document.body.innerHTML = `
      <input id="edit-doc-title" value="Updated Title">
      <select id="edit-doc-project"><option value="" selected>Global</option></select>
      <select id="edit-doc-sprint" disabled><option value="">None</option></select>
      <textarea id="edit-doc-content">Updated content</textarea>
      <input id="edit-doc-icon" value="">
      <div class="view"></div>
      <div id="document-detail-view" class="hidden"><div id="document-detail-content"></div></div>
    `;
    vi.spyOn(history, 'pushState').mockImplementation(() => {});
    api.updateDocument.mockResolvedValue({});
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Updated', updated_at: '2024-01-01' });
    api.getDocumentComments.mockResolvedValue([]);
    await handleUpdateDocument({ preventDefault: vi.fn() }, 'doc-1');
    expect(getDocumentDraft('doc-1')).toBeNull();
    vi.restoreAllMocks();
  });

  it('a save from the no-prefill path leaves the stale draft untouched', async () => {
    // The stale draft was never loaded into the form; saving unrelated
    // changes must not delete the draft the warning just pointed at
    // (mirrors issue-edit.js's conditional clear).
    setDocumentDraft('doc-1', { title: 'Stale Title', content: 'Stale content', icon: '' },
      { title: 'Even Older', content: 'Even older content', icon: '' });
    document.body.innerHTML = `
      <input id="edit-doc-title" value="Updated Title">
      <select id="edit-doc-project"><option value="" selected>Global</option></select>
      <select id="edit-doc-sprint" disabled><option value="">None</option></select>
      <textarea id="edit-doc-content">Server content</textarea>
      <input id="edit-doc-icon" value="">
      <div class="view"></div>
      <div id="document-detail-view" class="hidden"><div id="document-detail-content"></div></div>
    `;
    vi.spyOn(history, 'pushState').mockImplementation(() => {});
    api.updateDocument.mockResolvedValue({});
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Updated', updated_at: '2024-01-01' });
    api.getDocumentComments.mockResolvedValue([]);
    await handleUpdateDocument({ preventDefault: vi.fn() }, 'doc-1');
    expect(getDocumentDraft('doc-1')).toEqual(expect.objectContaining({ content: 'Stale content' }));
    vi.restoreAllMocks();
  });
});

describe('document create/edit modal Write/Preview toggle (CHT-1213)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    vi.clearAllMocks();
  });

  it('renders Write/Preview tabs and a preview pane', () => {
    showCreateDocumentModal();
    expect(document.getElementById('doc-content-tab-write')).toBeTruthy();
    expect(document.getElementById('doc-content-tab-preview')).toBeTruthy();
    expect(document.getElementById('doc-content-preview')).toBeTruthy();
  });

  it('switching to preview renders the markdown and hides the textarea', () => {
    showCreateDocumentModal();
    document.getElementById('doc-content').value = 'Some **markdown**';
    const setModeAction = documentActions['set-doc-editor-mode'];
    expect(setModeAction).toBeTypeOf('function');
    setModeAction(null, { target: 'doc-content', mode: 'preview' });

    const textarea = document.getElementById('doc-content');
    const preview = document.getElementById('doc-content-preview');
    expect(textarea.style.display).toBe('none');
    expect(preview.style.display).toBe('block');
    expect(preview.innerHTML).toContain('Some **markdown**');
  });

  it('switching back to write restores the textarea', () => {
    showCreateDocumentModal();
    const setModeAction = documentActions['set-doc-editor-mode'];
    setModeAction(null, { target: 'doc-content', mode: 'preview' });
    setModeAction(null, { target: 'doc-content', mode: 'write' });

    const textarea = document.getElementById('doc-content');
    const preview = document.getElementById('doc-content-preview');
    expect(textarea.style.display).toBe('block');
    expect(preview.style.display).toBe('none');
  });

  it('works for the edit modal with its own textarea id', async () => {
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Existing', content: 'Body text' });
    await showEditDocumentModal('doc-1');
    expect(document.getElementById('edit-doc-content-tab-write')).toBeTruthy();
    expect(document.getElementById('edit-doc-content-preview')).toBeTruthy();
  });
});

describe('refreshDocumentsListIfActive / refreshDocumentDetailIfViewing (CHT-1213)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view"></div>
      <div id="documents-list"></div>
      <div id="document-detail-view" class="hidden">
        <div id="document-detail-content"></div>
      </div>
    `;
    vi.clearAllMocks();
    vi.spyOn(history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    setCurrentView('my-issues');
    setCurrentTeam(null);
  });

  it('refreshDocumentsListIfActive re-fetches when the documents view is active', () => {
    setCurrentTeam({ id: 'team-1' });
    setCurrentView('documents');
    api.getDocuments.mockResolvedValue([]);
    refreshDocumentsListIfActive();
    expect(api.getDocuments).toHaveBeenCalled();
  });

  it('refreshDocumentsListIfActive does nothing on a different view', () => {
    setCurrentTeam({ id: 'team-1' });
    setCurrentView('issues');
    api.getDocuments.mockClear();
    refreshDocumentsListIfActive();
    expect(api.getDocuments).not.toHaveBeenCalled();
  });

  // Opening a document from the list calls viewDocument() directly rather
  // than navigateTo(), so getCurrentView() stays 'documents' the whole time
  // a detail view covers the (hidden) list — without a visibility check,
  // every document/comment websocket event would needlessly re-fetch and
  // rebuild the hidden list underneath the open detail view.
  it('refreshDocumentsListIfActive does nothing while a document detail view is open', async () => {
    setCurrentTeam({ id: 'team-1' });
    setCurrentView('documents');
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
    api.getDocumentComments.mockResolvedValue([]);
    await viewDocument('doc-1');

    api.getDocuments.mockClear();
    refreshDocumentsListIfActive();
    expect(api.getDocuments).not.toHaveBeenCalled();
  });

  it('refreshDocumentDetailIfViewing refreshes only the currently-open document', async () => {
    api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
    api.getDocumentComments.mockResolvedValue([]);
    await viewDocument('doc-1');
    api.getDocument.mockClear();

    refreshDocumentDetailIfViewing('doc-2'); // a different document
    await Promise.resolve();
    expect(api.getDocument).not.toHaveBeenCalled();

    refreshDocumentDetailIfViewing('doc-1'); // the one that's open
    await Promise.resolve();
    expect(api.getDocument).toHaveBeenCalledWith('doc-1');
  });

  it('refreshDocumentDetailIfViewing does nothing when no document detail is open', () => {
    api.getDocument.mockClear();
    refreshDocumentDetailIfViewing('doc-1');
    expect(api.getDocument).not.toHaveBeenCalled();
  });

  // CHT-1213 review finding: refreshDocumentDetailIfViewing() would 404
  // trying to re-fetch a just-deleted document — navigate away instead,
  // mirroring ws-handlers.js's handleIssueDeleted.
  describe('handleRemoteDocumentDeleted', () => {
    it('navigates away with a toast when the deleted document is the one open', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');

      handleRemoteDocumentDeleted('doc-1', 'Test');

      expect(showToast).toHaveBeenCalledWith(expect.stringContaining('Test'), 'warning');
      expect(mockNavigateTo).toHaveBeenCalledWith('documents');
    });

    it('does nothing when the deleted document is not the one open', async () => {
      api.getDocument.mockResolvedValue({ id: 'doc-1', title: 'Test', updated_at: '2024-01-01' });
      api.getDocumentComments.mockResolvedValue([]);
      await viewDocument('doc-1');
      mockNavigateTo.mockClear();

      handleRemoteDocumentDeleted('doc-2', 'Some Other Doc');

      expect(mockNavigateTo).not.toHaveBeenCalled();
    });

    it('does nothing when no document detail is open', () => {
      handleRemoteDocumentDeleted('doc-1', 'Test');
      expect(mockNavigateTo).not.toHaveBeenCalled();
    });
  });
});

// CHT-1224: documents.js:615-648 (handleBulkMove), 653-689 (bulkDeleteDocuments)
// — per-document errors were only console.error'd, and the summary toast was
// just "Moved N, failed M" / "Deleted N, failed M" with no indication which
// documents failed.
describe('bulk actions identify failed documents (CHT-1224)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="documents-list"></div>
      <div id="doc-select-btn"></div>
      <div id="doc-bulk-actions" class="hidden"></div>
      <select id="bulk-move-project"><option value="proj-2">Project 2</option></select>
    `;
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    setCurrentTeam(null);
    vi.restoreAllMocks();
  });

  async function selectDocs(docs) {
    api.getDocuments.mockResolvedValue(docs);
    await loadDocuments('team-1');
    enterSelectionMode();
    docs.forEach(d => toggleDocSelection(d.id));
  }

  it('handleBulkMove: names the failed document titles in the warning toast', async () => {
    const docs = [
      { id: 'doc-1', title: 'Doc A', updated_at: '2024-01-01' },
      { id: 'doc-2', title: 'Doc B', updated_at: '2024-01-01' },
    ];
    await selectDocs(docs);

    api.updateDocument.mockImplementation((docId) =>
      docId === 'doc-2' ? Promise.reject(new Error('boom')) : Promise.resolve({})
    );
    api.getDocuments.mockResolvedValue(docs);

    const event = { preventDefault: vi.fn() };
    await handleBulkMove(event);

    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('Doc B'), 'warning');
    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('Moved 1'), 'warning');
  });

  it('bulkDeleteDocuments: names the failed document titles in the warning toast', async () => {
    const docs = [
      { id: 'doc-1', title: 'Doc A', updated_at: '2024-01-01' },
      { id: 'doc-2', title: 'Doc B', updated_at: '2024-01-01' },
    ];
    await selectDocs(docs);

    api.deleteDocument.mockImplementation((docId) =>
      docId === 'doc-1' ? Promise.reject(new Error('boom')) : Promise.resolve({})
    );
    api.getDocuments.mockResolvedValue(docs);

    await bulkDeleteDocuments();

    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('Doc A'), 'warning');
    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('Deleted 1'), 'warning');
  });
});
