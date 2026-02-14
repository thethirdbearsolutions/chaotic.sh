import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getProjects,
  setProjects,
  getEstimateOptions,
  formatEstimate,
  getEstimateScaleHint,
  loadProjects,
  updateProjectFilters,
  getSavedProjectId,
  setGlobalProjectSelection,
  renderProjects,
  viewProject,
  showCreateProjectModal,
  handleCreateProject,
  showEditProjectModal,
  handleUpdateProject,
  confirmDeleteProject,
  viewProjectSettings,
  switchProjectSettingsTab,
  saveProjectSettingsGeneral,
  clearProjectSettingsState,
  showCreateProjectRitualModal,
  handleCreateProjectRitual,
  showEditProjectRitualModal,
  deleteProjectRitual,
} from './projects.js';
import { api } from './api.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getProjects: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
    getRituals: vi.fn(),
    createRitual: vi.fn(),
    updateRitual: vi.fn(),
    deleteRitual: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
}));

describe('getProjects / setProjects', () => {
  afterEach(() => {
    setProjects([]);
  });

  it('returns empty array initially', () => {
    expect(getProjects()).toEqual([]);
  });

  it('allows setting projects externally', () => {
    const newProjects = [{ id: 'proj-1', name: 'Test' }];
    setProjects(newProjects);
    expect(getProjects()).toEqual(newProjects);
  });
});

describe('getEstimateOptions', () => {
  afterEach(() => {
    setProjects([]);
  });

  it('returns fibonacci scale by default', () => {
    setProjects([{ id: 'proj-1', name: 'Test' }]);
    const options = getEstimateOptions('proj-1');
    expect(options.some((o) => o.value === 5)).toBe(true);
    expect(options.some((o) => o.value === 8)).toBe(true);
  });

  it('returns configured scale for project', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'linear' }]);
    const options = getEstimateOptions('proj-1');
    expect(options.some((o) => o.value === 10)).toBe(true);
  });

  it('returns tshirt scale when configured', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'tshirt' }]);
    const options = getEstimateOptions('proj-1');
    expect(options.some((o) => o.label === 'XS')).toBe(true);
    expect(options.some((o) => o.label === 'XL')).toBe(true);
  });

  it('returns powers_of_2 scale when configured', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'powers_of_2' }]);
    const options = getEstimateOptions('proj-1');
    expect(options.some((o) => o.value === 16)).toBe(true);
    expect(options.some((o) => o.value === 32)).toBe(true);
  });

  it('falls back to fibonacci for unknown project', () => {
    const options = getEstimateOptions('unknown');
    expect(options.some((o) => o.value === 5)).toBe(true);
  });
});

describe('formatEstimate', () => {
  afterEach(() => {
    setProjects([]);
  });

  it('returns "No estimate" for null value', () => {
    expect(formatEstimate(null, 'proj-1')).toBe('No estimate');
  });

  it('returns "No estimate" for 0 value', () => {
    expect(formatEstimate(0, 'proj-1')).toBe('No estimate');
  });

  it('formats fibonacci estimate correctly', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'fibonacci' }]);
    expect(formatEstimate(5, 'proj-1')).toBe('5 points');
  });

  it('formats tshirt estimate correctly', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'tshirt' }]);
    expect(formatEstimate(1, 'proj-1')).toBe('XS');
    expect(formatEstimate(5, 'proj-1')).toBe('L');
  });

  it('falls back to generic format for unknown values', () => {
    setProjects([{ id: 'proj-1', name: 'Test' }]);
    expect(formatEstimate(100, 'proj-1')).toBe('100 points');
  });
});

describe('getEstimateScaleHint', () => {
  afterEach(() => {
    setProjects([]);
  });

  it('returns fibonacci hint', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'fibonacci' }]);
    const hint = getEstimateScaleHint('proj-1');
    expect(hint).toContain('Fibonacci');
    expect(hint).toContain('1, 2, 3, 5, 8, 13, 21');
  });

  it('returns tshirt hint with mappings', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'tshirt' }]);
    const hint = getEstimateScaleHint('proj-1');
    expect(hint).toContain('t-shirt');
    expect(hint).toContain('XS=1pt');
  });

  it('returns linear hint', () => {
    setProjects([{ id: 'proj-1', name: 'Test', estimate_scale: 'linear' }]);
    const hint = getEstimateScaleHint('proj-1');
    expect(hint).toContain('Linear');
  });
});

describe('loadProjects', () => {
  beforeEach(() => {
    document.body.innerHTML = '<select id="project-filter"></select>';
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('returns early if no currentTeam', async () => {
    delete window.currentTeam;
    await loadProjects();
    expect(api.getProjects).not.toHaveBeenCalled();
  });

  it('fetches projects and updates filters', async () => {
    const projects = [{ id: 'proj-1', name: 'Test Project' }];
    api.getProjects.mockResolvedValue(projects);
    await loadProjects();
    expect(api.getProjects).toHaveBeenCalledWith('team-1');
    const filter = document.getElementById('project-filter');
    expect(filter.innerHTML).toContain('Test Project');
  });
});

describe('updateProjectFilters', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <select id="project-filter"></select>
      <select id="sprint-project-filter"></select>
      <select id="board-project-filter"></select>
    `;
    // Mock localStorage
    const store = {};
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => store[key] || null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      store[key] = value;
    });
  });

  afterEach(() => {
    setProjects([]);
    vi.restoreAllMocks();
  });

  it('updates all filter dropdowns', () => {
    setProjects([{ id: 'proj-1', name: 'Project 1' }, { id: 'proj-2', name: 'Project 2' }]);
    updateProjectFilters();
    const filter = document.getElementById('project-filter');
    expect(filter.innerHTML).toContain('Project 1');
    expect(filter.innerHTML).toContain('Project 2');
    expect(filter.innerHTML).toContain('All Projects');
  });

  it('escapes project names for XSS prevention', () => {
    setProjects([{ id: 'proj-1', name: '<script>xss</script>' }]);
    updateProjectFilters();
    const filter = document.getElementById('project-filter');
    expect(filter.innerHTML).not.toContain('<script>xss</script>');
    expect(filter.innerHTML).toContain('&lt;script&gt;');
  });

  it('selects first project by default', () => {
    setProjects([{ id: 'proj-1', name: 'First' }, { id: 'proj-2', name: 'Second' }]);
    updateProjectFilters();
    expect(document.getElementById('project-filter').value).toBe('proj-1');
  });
});

describe('getSavedProjectId', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('saved-proj-id');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns saved project ID from localStorage', () => {
    expect(getSavedProjectId()).toBe('saved-proj-id');
  });
});

describe('setGlobalProjectSelection', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <select id="project-filter"><option value="proj-1">P1</option></select>
      <select id="board-project-filter"><option value="proj-1">P1</option></select>
      <select id="sprint-project-filter"><option value="proj-1">P1</option></select>
    `;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does nothing for empty projectId', () => {
    setGlobalProjectSelection('');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('saves to localStorage and updates all selectors', () => {
    setGlobalProjectSelection('proj-1');
    expect(localStorage.setItem).toHaveBeenCalledWith('chaotic_last_project', 'proj-1');
    expect(document.getElementById('project-filter').value).toBe('proj-1');
    expect(document.getElementById('board-project-filter').value).toBe('proj-1');
    expect(document.getElementById('sprint-project-filter').value).toBe('proj-1');
  });
});

describe('renderProjects', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="projects-list"></div>';
  });

  afterEach(() => {
    setProjects([]);
  });

  it('shows empty state when no projects', () => {
    setProjects([]);
    renderProjects();
    const list = document.getElementById('projects-list');
    expect(list.innerHTML).toContain('No projects yet');
  });

  it('renders project cards', () => {
    setProjects([{ id: 'proj-1', name: 'Test Project', key: 'TP', color: '#6366f1', description: 'A test', issue_count: 5 }]);
    renderProjects();
    const list = document.getElementById('projects-list');
    expect(list.innerHTML).toContain('Test Project');
    expect(list.innerHTML).toContain('TP');
    expect(list.innerHTML).toContain('5 issues');
  });

  it('escapes project name and description for XSS prevention', () => {
    setProjects([{ id: 'proj-1', name: '<script>xss</script>', key: 'TP', color: '#6366f1', description: '<img onerror=alert(1)>', issue_count: 0 }]);
    renderProjects();
    const list = document.getElementById('projects-list');
    // Verify escaped versions are present
    expect(list.innerHTML).toContain('&lt;script&gt;xss&lt;/script&gt;');
    expect(list.innerHTML).toContain('&lt;img onerror=alert(1)&gt;');
    // Verify no actual script or img elements were created
    expect(list.querySelector('script')).toBeNull();
    // Only check that no img with onerror was created (there may be SVG icons)
    const imgs = list.querySelectorAll('img');
    imgs.forEach(img => {
      expect(img.getAttribute('onerror')).toBeNull();
    });
  });
});

describe('viewProject', () => {
  beforeEach(() => {
    document.body.innerHTML = '<select id="project-filter"><option value="proj-1">P1</option></select>';
    window.navigateTo = vi.fn();
  });

  afterEach(() => {
    delete window.navigateTo;
  });

  it('sets project filter and navigates to issues', () => {
    viewProject('proj-1');
    expect(document.getElementById('project-filter').value).toBe('proj-1');
    expect(window.navigateTo).toHaveBeenCalledWith('issues');
  });
});

describe('showCreateProjectModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
  });

  it('sets modal title', () => {
    showCreateProjectModal();
    expect(document.getElementById('modal-title').textContent).toBe('Create Project');
  });

  it('renders form with required fields', () => {
    showCreateProjectModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('project-name');
    expect(content.innerHTML).toContain('project-key');
    expect(content.innerHTML).toContain('project-description');
    expect(content.innerHTML).toContain('project-color');
    expect(content.innerHTML).toContain('project-estimate-scale');
    expect(content.innerHTML).toContain('project-human-rituals-required');
  });
});

describe('handleCreateProject', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="project-name" value="New Project">
      <input id="project-key" value="np">
      <textarea id="project-description">Desc</textarea>
      <input type="color" id="project-color" value="#6366f1">
      <select id="project-estimate-scale"><option value="fibonacci">F</option></select>
      <input type="checkbox" id="project-human-rituals-required">
      <div id="projects-list"></div>
      <select id="project-filter"></select>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.createProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([]);
    await handleCreateProject(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('sends correct data with uppercase key', async () => {
    const event = { preventDefault: vi.fn() };
    api.createProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([]);
    await handleCreateProject(event);
    expect(api.createProject).toHaveBeenCalledWith('team-1', {
      name: 'New Project',
      key: 'NP',
      description: 'Desc',
      color: '#6366f1',
      estimate_scale: 'fibonacci',
      human_rituals_required: false,
    });
  });
});

describe('showEditProjectModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
  });

  afterEach(() => {
    setProjects([]);
  });

  it('returns early if project not found', () => {
    setProjects([]);
    showEditProjectModal('unknown');
    expect(document.getElementById('modal-title').textContent).toBe('');
  });

  it('sets modal title and populates form', () => {
    setProjects([{ id: 'proj-1', name: 'Test', key: 'TP', color: '#6366f1', description: 'Desc', estimate_scale: 'fibonacci', human_rituals_required: true }]);
    showEditProjectModal('proj-1');
    expect(document.getElementById('modal-title').textContent).toBe('Edit Project');
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('Test');
    expect(content.innerHTML).toContain('TP');
  });

  it('escapes project values in form', () => {
    setProjects([{ id: 'proj-1', name: '<script>xss</script>', key: 'TP', color: '#6366f1', description: '<img onerror=alert(1)>', estimate_scale: 'fibonacci' }]);
    showEditProjectModal('proj-1');
    const content = document.getElementById('modal-content');
    // Form values should be properly set as text
    const nameInput = document.getElementById('project-name');
    const descTextarea = document.getElementById('project-description');
    expect(nameInput.value).toBe('<script>xss</script>');
    expect(descTextarea.value).toBe('<img onerror=alert(1)>');
    // Verify no script or img elements were created
    expect(content.querySelector('script')).toBeNull();
    expect(content.querySelector('img')).toBeNull();
  });
});

describe('handleUpdateProject', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="project-name" value="Updated Project">
      <textarea id="project-description">Updated desc</textarea>
      <input type="color" id="project-color" value="#ff0000">
      <select id="project-estimate-scale"><option value="linear" selected>L</option></select>
      <input type="checkbox" id="project-human-rituals-required" checked>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    setProjects([{ id: 'proj-1', name: 'Old' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.updateProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([]);
    await handleUpdateProject(event, 'proj-1');
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('sends correct data to API', async () => {
    const event = { preventDefault: vi.fn() };
    api.updateProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([]);
    await handleUpdateProject(event, 'proj-1');
    expect(api.updateProject).toHaveBeenCalledWith('proj-1', {
      name: 'Updated Project',
      description: 'Updated desc',
      color: '#ff0000',
      estimate_scale: 'linear',
      human_rituals_required: true,
    });
  });
});

describe('confirmDeleteProject', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="projects-list"></div>
      <select id="project-filter"></select>
    `;
    vi.clearAllMocks();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    window.currentTeam = { id: 'team-1' };
    setProjects([{ id: 'proj-1', name: 'Test Project' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
    vi.restoreAllMocks();
  });

  it('returns early if project not found', async () => {
    await confirmDeleteProject('unknown');
    expect(window.confirm).not.toHaveBeenCalled();
  });

  it('prompts for confirmation with project name', async () => {
    api.deleteProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([]);
    await confirmDeleteProject('proj-1');
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "Test Project"? This will delete all issues in this project.'
    );
  });

  it('does nothing if user cancels', async () => {
    window.confirm.mockReturnValue(false);
    await confirmDeleteProject('proj-1');
    expect(api.deleteProject).not.toHaveBeenCalled();
  });

  it('deletes project on confirmation', async () => {
    api.deleteProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([]);
    await confirmDeleteProject('proj-1');
    expect(api.deleteProject).toHaveBeenCalledWith('proj-1');
  });
});

// ============================================================================
// Project Settings Page Tests
// ============================================================================

describe('viewProjectSettings', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view" id="projects-view"></div>
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Project Settings</h2>
        <input id="ps-name">
        <input id="ps-key">
        <textarea id="ps-description"></textarea>
        <input type="color" id="ps-color">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <button class="settings-tab" data-tab="rules"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
        <div id="project-settings-tab-rules" class="settings-tab-content hidden"></div>
      </div>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.navigateTo = vi.fn();
    window.history.pushState = vi.fn();
    setProjects([{
      id: 'proj-1',
      name: 'Test Project',
      key: 'TST',
      description: 'A test project',
      color: '#ff0000',
      estimate_scale: 'fibonacci',
      human_rituals_required: true,
      require_estimate_on_claim: false,
    }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    delete window.navigateTo;
    setProjects([]);
  });

  it('populates form fields with project data', async () => {
    await viewProjectSettings('proj-1');
    expect(document.getElementById('ps-name').value).toBe('Test Project');
    expect(document.getElementById('ps-key').value).toBe('TST');
    expect(document.getElementById('ps-description').value).toBe('A test project');
  });

  it('updates page title with project name', async () => {
    await viewProjectSettings('proj-1');
    expect(document.getElementById('project-settings-title').textContent).toBe('Test Project Settings');
  });

  it('shows project settings view', async () => {
    await viewProjectSettings('proj-1');
    expect(document.getElementById('project-settings-view').classList.contains('hidden')).toBe(false);
  });

  it('navigates away for unknown project', async () => {
    await viewProjectSettings('unknown');
    expect(window.navigateTo).toHaveBeenCalledWith('projects');
  });
});

describe('switchProjectSettingsTab', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="settings-tab active" data-tab="general"></button>
      <button class="settings-tab" data-tab="rules"></button>
      <button class="settings-tab" data-tab="sprint-rituals"></button>
      <button class="settings-tab" data-tab="close-rituals"></button>
      <button class="settings-tab" data-tab="claim-rituals"></button>
      <div id="project-settings-tab-general" class="settings-tab-content"></div>
      <div id="project-settings-tab-rules" class="settings-tab-content hidden"></div>
      <div id="project-settings-tab-sprint-rituals" class="settings-tab-content hidden"></div>
      <div id="project-settings-tab-close-rituals" class="settings-tab-content hidden"></div>
      <div id="project-settings-tab-claim-rituals" class="settings-tab-content hidden"></div>
      <div id="ps-sprint-rituals-list"></div>
      <div id="ps-close-rituals-list"></div>
      <div id="ps-claim-rituals-list"></div>
    `;
  });

  it('activates the selected tab', () => {
    switchProjectSettingsTab('rules');
    expect(document.querySelector('[data-tab="rules"]').classList.contains('active')).toBe(true);
    expect(document.querySelector('[data-tab="general"]').classList.contains('active')).toBe(false);
  });

  it('shows the selected tab content', () => {
    switchProjectSettingsTab('rules');
    expect(document.getElementById('project-settings-tab-rules').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('project-settings-tab-general').classList.contains('hidden')).toBe(true);
  });

  it('defaults to general tab for invalid tab name', () => {
    switchProjectSettingsTab('invalid');
    expect(document.querySelector('[data-tab="general"]').classList.contains('active')).toBe(true);
    expect(document.getElementById('project-settings-tab-general').classList.contains('hidden')).toBe(false);
  });

  it('activates sprint rituals tab', () => {
    switchProjectSettingsTab('sprint-rituals');
    expect(document.querySelector('[data-tab="sprint-rituals"]').classList.contains('active')).toBe(true);
    expect(document.getElementById('project-settings-tab-sprint-rituals').classList.contains('hidden')).toBe(false);
  });

  it('activates close rituals tab', () => {
    switchProjectSettingsTab('close-rituals');
    expect(document.querySelector('[data-tab="close-rituals"]').classList.contains('active')).toBe(true);
    expect(document.getElementById('project-settings-tab-close-rituals').classList.contains('hidden')).toBe(false);
  });

  it('activates claim rituals tab', () => {
    switchProjectSettingsTab('claim-rituals');
    expect(document.querySelector('[data-tab="claim-rituals"]').classList.contains('active')).toBe(true);
    expect(document.getElementById('project-settings-tab-claim-rituals').classList.contains('hidden')).toBe(false);
  });
});

describe('saveProjectSettingsGeneral', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Old Settings</h2>
        <input id="ps-name" value="New Name">
        <input id="ps-key" disabled>
        <textarea id="ps-description">New desc</textarea>
        <input type="color" id="ps-color" value="#00ff00">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <button class="settings-tab" data-tab="rules"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
        <div id="project-settings-tab-rules" class="settings-tab-content hidden"></div>
      </div>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.history.pushState = vi.fn();
    setProjects([{ id: 'proj-1', name: 'Old', key: 'OLD' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('validates that name is required', async () => {
    await viewProjectSettings('proj-1');
    document.getElementById('ps-name').value = '   ';
    await saveProjectSettingsGeneral();
    expect(api.updateProject).not.toHaveBeenCalled();
  });

  it('sends correct data to API', async () => {
    api.updateProject.mockResolvedValue({});
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'New Name', key: 'OLD' }]);
    await viewProjectSettings('proj-1');
    document.getElementById('ps-name').value = 'New Name';
    document.getElementById('ps-description').value = 'New desc';
    document.getElementById('ps-color').value = '#00ff00';
    await saveProjectSettingsGeneral();
    expect(api.updateProject).toHaveBeenCalledWith('proj-1', {
      name: 'New Name',
      description: 'New desc',
      color: '#00ff00',
    });
  });
});

describe('clearProjectSettingsState', () => {
  it('clears state without error', () => {
    expect(() => clearProjectSettingsState()).not.toThrow();
  });
});

describe('showCreateProjectRitualModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Settings</h2>
        <input id="ps-name" value="">
        <input id="ps-key" disabled>
        <textarea id="ps-description"></textarea>
        <input type="color" id="ps-color" value="#6366f1">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <button class="settings-tab" data-tab="rules"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
        <div id="project-settings-tab-rules" class="settings-tab-content hidden"></div>
      </div>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
      <h3 id="modal-title"></h3>
      <div id="modal-content"></div>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.history.pushState = vi.fn();
    setProjects([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('does nothing if no project is selected', () => {
    showCreateProjectRitualModal('every_sprint');
    expect(document.getElementById('modal-title').textContent).toBe('');
  });

  it('shows modal with preset trigger for sprint', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    await viewProjectSettings('proj-1');
    showCreateProjectRitualModal('every_sprint');
    expect(document.getElementById('modal-title').textContent).toBe('Create Ritual');
    const content = document.getElementById('modal-content').innerHTML;
    expect(content).toContain('value="every_sprint" selected');
  });

  it('shows modal with preset trigger for ticket_close', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    await viewProjectSettings('proj-1');
    showCreateProjectRitualModal('ticket_close');
    const content = document.getElementById('modal-content').innerHTML;
    expect(content).toContain('value="ticket_close" selected');
  });

  it('shows modal with preset trigger for ticket_claim', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    await viewProjectSettings('proj-1');
    showCreateProjectRitualModal('ticket_claim');
    const content = document.getElementById('modal-content').innerHTML;
    expect(content).toContain('value="ticket_claim" selected');
  });
});

describe('handleCreateProjectRitual', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Settings</h2>
        <input id="ps-name" value="">
        <input id="ps-key" disabled>
        <textarea id="ps-description"></textarea>
        <input type="color" id="ps-color" value="#6366f1">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
      </div>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
      <h3 id="modal-title"></h3>
      <div id="modal-content"></div>
      <div id="ps-sprint-rituals-list"></div>
      <div id="ps-close-rituals-list"></div>
      <div id="ps-claim-rituals-list"></div>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.history.pushState = vi.fn();
    setProjects([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('creates ritual and reloads list', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.createRitual.mockResolvedValue({ id: 'ritual-1' });
    api.getRituals.mockResolvedValue([]);
    api.getRitualGroups = vi.fn().mockResolvedValue([]);

    await viewProjectSettings('proj-1');
    await showCreateProjectRitualModal('every_sprint');

    document.getElementById('ritual-name').value = 'test-ritual';
    document.getElementById('ritual-prompt').value = 'Did you test?';
    document.getElementById('ritual-trigger').value = 'every_sprint';
    document.getElementById('ritual-mode').value = 'auto';

    const event = { preventDefault: vi.fn() };
    await handleCreateProjectRitual(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(api.createRitual).toHaveBeenCalledWith('proj-1', {
      name: 'test-ritual',
      prompt: 'Did you test?',
      trigger: 'every_sprint',
      approval_mode: 'auto',
      note_required: true,
      conditions: null,
    });
  });
});

describe('showEditProjectRitualModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Settings</h2>
        <input id="ps-name" value="">
        <input id="ps-key" disabled>
        <textarea id="ps-description"></textarea>
        <input type="color" id="ps-color" value="#6366f1">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
      </div>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
      <h3 id="modal-title"></h3>
      <div id="modal-content"></div>
      <div id="ps-sprint-rituals-list"></div>
      <div id="ps-close-rituals-list"></div>
      <div id="ps-claim-rituals-list"></div>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.history.pushState = vi.fn();
    setProjects([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
  });

  it('does nothing if ritual not found', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.getRituals.mockResolvedValue([]);

    await viewProjectSettings('proj-1');
    switchProjectSettingsTab('sprint-rituals');
    await new Promise((r) => setTimeout(r, 0)); // Wait for ritual load

    showEditProjectRitualModal('unknown');
    expect(document.getElementById('modal-title').textContent).toBe('');
  });

  it('shows modal with ritual data', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.getRituals.mockResolvedValue([
      { id: 'ritual-1', name: 'test-ritual', prompt: 'Did you test?', trigger: 'every_sprint', approval_mode: 'auto' },
    ]);
    api.getRitualGroups = vi.fn().mockResolvedValue([]);

    await viewProjectSettings('proj-1');
    switchProjectSettingsTab('sprint-rituals');
    await new Promise((r) => setTimeout(r, 0)); // Wait for ritual load

    await showEditProjectRitualModal('ritual-1');
    expect(document.getElementById('modal-title').textContent).toBe('Edit Ritual');
    const content = document.getElementById('modal-content').innerHTML;
    expect(content).toContain('test-ritual');
    expect(content).toContain('Did you test?');
  });
});

describe('deleteProjectRitual', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Settings</h2>
        <input id="ps-name" value="">
        <input id="ps-key" disabled>
        <textarea id="ps-description"></textarea>
        <input type="color" id="ps-color" value="#6366f1">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
      </div>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
      <div id="ps-sprint-rituals-list"></div>
      <div id="ps-close-rituals-list"></div>
      <div id="ps-claim-rituals-list"></div>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.history.pushState = vi.fn();
    window.confirm = vi.fn(() => true);
    setProjects([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
  });

  afterEach(() => {
    delete window.currentTeam;
    delete window.confirm;
    setProjects([]);
  });

  it('does nothing if user cancels', async () => {
    window.confirm = vi.fn(() => false);
    await deleteProjectRitual('ritual-1', 'test-ritual');
    expect(api.deleteRitual).not.toHaveBeenCalled();
  });

  it('deletes ritual and reloads list', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.deleteRitual.mockResolvedValue({});
    api.getRituals.mockResolvedValue([]);

    await viewProjectSettings('proj-1');
    await deleteProjectRitual('ritual-1', 'test-ritual');

    expect(api.deleteRitual).toHaveBeenCalledWith('ritual-1');
  });
});

describe('ritual XSS prevention', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="view hidden" id="project-settings-view">
        <h2 id="project-settings-title">Settings</h2>
        <input id="ps-name" value="">
        <input id="ps-key" disabled>
        <textarea id="ps-description"></textarea>
        <input type="color" id="ps-color" value="#6366f1">
        <select id="ps-estimate-scale"></select>
        <input type="number" id="ps-default-sprint-budget">
        <input type="checkbox" id="ps-human-rituals-required">
        <input type="checkbox" id="ps-require-estimate-on-claim">
        <button class="settings-tab active" data-tab="general"></button>
        <button class="settings-tab" data-tab="sprint-rituals"></button>
        <div id="project-settings-tab-general" class="settings-tab-content"></div>
        <div id="project-settings-tab-sprint-rituals" class="settings-tab-content hidden"></div>
      </div>
      <div id="projects-list"></div>
      <select id="project-filter"></select>
      <div id="ps-sprint-rituals-list"></div>
      <div id="ps-close-rituals-list"></div>
      <div id="ps-claim-rituals-list"></div>
    `;
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.history.pushState = vi.fn();
    setProjects([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    clearProjectSettingsState(); // Reset module state
  });

  afterEach(() => {
    delete window.currentTeam;
    setProjects([]);
    clearProjectSettingsState();
  });

  it('escapes ritual name for XSS prevention', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.getRituals.mockResolvedValue([{
      id: 'r1',
      name: '<script>alert("xss")</script>',
      prompt: 'Test prompt',
      trigger: 'every_sprint',
      approval_mode: 'auto',
    }]);

    await viewProjectSettings('proj-1');
    switchProjectSettingsTab('sprint-rituals');
    await new Promise((r) => setTimeout(r, 10)); // Wait for async ritual load

    const nameEl = document.querySelector('.ritual-item-name');
    expect(nameEl).not.toBeNull();
    // The textContent should be the raw script text (not executed)
    expect(nameEl.textContent).toBe('<script>alert("xss")</script>');
    // The innerHTML should have the entity-encoded version
    expect(nameEl.innerHTML).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
  });

  it('escapes ritual prompt for XSS prevention', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.getRituals.mockResolvedValue([{
      id: 'r1',
      name: 'test',
      prompt: '<img onerror="alert(1)" src="x">',
      trigger: 'every_sprint',
      approval_mode: 'auto',
    }]);

    await viewProjectSettings('proj-1');
    switchProjectSettingsTab('sprint-rituals');
    await new Promise((r) => setTimeout(r, 10));

    const promptEl = document.querySelector('.ritual-item-prompt');
    expect(promptEl).not.toBeNull();
    // The textContent should be the raw XSS attempt (not executed)
    expect(promptEl.textContent).toBe('<img onerror="alert(1)" src="x">');
    // innerHTML should have entity-encoded angle brackets
    expect(promptEl.innerHTML).toContain('&lt;img');
    expect(promptEl.innerHTML).not.toContain('<img');
  });

  it('ritual buttons are rendered with data attributes', async () => {
    api.getProjects.mockResolvedValue([{ id: 'proj-1', name: 'Test', key: 'TEST' }]);
    api.getRituals.mockResolvedValue([{
      id: 'r1',
      name: 'test-ritual',
      prompt: 'Test prompt',
      trigger: 'every_sprint',
      approval_mode: 'auto',
    }]);

    await viewProjectSettings('proj-1');
    switchProjectSettingsTab('sprint-rituals');
    await new Promise((r) => setTimeout(r, 10));

    const editBtn = document.querySelector('.ritual-item-actions button');
    expect(editBtn).not.toBeNull();
    expect(editBtn.getAttribute('onclick')).toContain('showEditProjectRitualModal');

    const deleteBtn = document.querySelector('.ritual-item-actions button.btn-danger');
    expect(deleteBtn).not.toBeNull();
    expect(deleteBtn.dataset.ritualId).toBe('r1');
    expect(deleteBtn.dataset.ritualName).toBe('test-ritual');
  });
});
