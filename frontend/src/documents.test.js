import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getDocuments,
  loadDocuments,
  renderDocuments,
  viewDocument,
  showCreateDocumentModal,
  handleCreateDocument,
  showEditDocumentModal,
  handleUpdateDocument,
  deleteDocument,
} from './documents.js';
import { api } from './api.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getDocuments: vi.fn(),
    getDocument: vi.fn(),
    createDocument: vi.fn(),
    updateDocument: vi.fn(),
    deleteDocument: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
}));

describe('getDocuments', () => {
  it('returns empty array initially', () => {
    expect(getDocuments()).toEqual([]);
  });
});

describe('loadDocuments', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="documents-list"></div>';
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
  });

  afterEach(() => {
    delete window.currentTeam;
  });

  it('returns early if no teamId provided and no currentTeam', async () => {
    delete window.currentTeam;
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

  it('uses doc-project-filter value if available', async () => {
    document.body.innerHTML = `
      <div id="documents-list"></div>
      <select id="doc-project-filter"><option value="proj-1" selected>Project 1</option></select>
    `;
    api.getDocuments.mockResolvedValue([]);
    await loadDocuments();
    expect(api.getDocuments).toHaveBeenCalledWith('team-1', 'proj-1');
  });

  it('renders documents after loading', async () => {
    const docs = [
      { id: 'doc-1', title: 'Test Doc', content: 'Content here', updated_at: '2024-01-01' },
    ];
    api.getDocuments.mockResolvedValue(docs);
    await loadDocuments('team-1');
    expect(document.getElementById('documents-list').innerHTML).toContain('Test Doc');
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
    window.currentTeam = { id: 'team-1' };
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('No documents yet');
    delete window.currentTeam;
  });

  it('renders documents with escaped HTML', async () => {
    const docs = [
      { id: 'doc-1', title: '<script>xss</script>', content: 'Test', updated_at: '2024-01-01' },
    ];
    api.getDocuments.mockResolvedValue(docs);
    window.currentTeam = { id: 'team-1' };
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).not.toContain('<script>');
    expect(list.innerHTML).toContain('&lt;script&gt;');
    delete window.currentTeam;
  });

  it('uses default icon when none provided', async () => {
    const docs = [{ id: 'doc-1', title: 'Test', content: null, updated_at: '2024-01-01' }];
    api.getDocuments.mockResolvedValue(docs);
    window.currentTeam = { id: 'team-1' };
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('📄');
    delete window.currentTeam;
  });

  it('truncates long content in preview', async () => {
    const longContent = 'A'.repeat(150);
    const docs = [{ id: 'doc-1', title: 'Test', content: longContent, updated_at: '2024-01-01' }];
    api.getDocuments.mockResolvedValue(docs);
    window.currentTeam = { id: 'team-1' };
    await loadDocuments();
    const list = document.getElementById('documents-list');
    expect(list.innerHTML).toContain('...');
    delete window.currentTeam;
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
    const titleEl = content.querySelector('.document-title');
    expect(titleEl.textContent).toBe('<img onerror=alert(1)>');
    // Verify no img element was created
    expect(content.querySelector('img')).toBeNull();
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
    window.currentTeam = { id: 'team-1' };
  });

  afterEach(() => {
    delete window.currentTeam;
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
    window.currentTeam = { id: 'team-1' };
    window.navigateTo = vi.fn();
    // Mock confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    delete window.currentTeam;
    delete window.navigateTo;
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
    expect(window.navigateTo).toHaveBeenCalledWith('documents');
  });
});
