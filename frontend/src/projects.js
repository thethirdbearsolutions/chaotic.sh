/**
 * Projects module for Chaotic frontend
 * Handles project loading, creation, editing, and settings
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, sanitizeColor } from './utils.js';
import { showModal, closeModal, showToast } from './ui.js';
import { getSavedProject, setSavedProject } from './storage.js';
import { getCurrentTeam, getCurrentProject, setCurrentProject, subscribe } from './state.js';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';
import { registerActions } from './event-delegation.js';
import { navigateTo } from './router.js';
import { renderMarkdown } from './gate-approvals.js';
import { renderConditionBuilder, collectConditions } from './rituals.js';

// Module state
let projects = [];

// Callback for when rituals change (set by rituals-view)
let _onRitualsChangedCallback = null;

// All project filter DOM element IDs
const PROJECT_FILTER_IDS = [
  'project-filter',
  'board-project-filter',
  'sprint-project-filter',
  'epics-project-filter',
  'doc-project-filter',
  'dashboard-project-filter',
  'rituals-project-filter',
];

// Central subscriber: sync DOM selects + localStorage when currentProject changes
subscribe((key, newValue) => {
  if (key !== 'currentProject') return;

  // Persist to localStorage
  if (newValue) {
    setSavedProject(newValue);
  }

  // Sync all DOM selects
  PROJECT_FILTER_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = newValue || '';
  });

  // Update URL
  updateUrlWithProject(newValue || '');
});

// Estimate scale definitions
const ESTIMATE_SCALES = {
  fibonacci: [
    { value: null, label: 'No estimate' },
    { value: 1, label: '1 point' },
    { value: 2, label: '2 points' },
    { value: 3, label: '3 points' },
    { value: 5, label: '5 points' },
    { value: 8, label: '8 points' },
    { value: 13, label: '13 points' },
    { value: 21, label: '21 points' },
  ],
  linear: [
    { value: null, label: 'No estimate' },
    { value: 1, label: '1 point' },
    { value: 2, label: '2 points' },
    { value: 3, label: '3 points' },
    { value: 4, label: '4 points' },
    { value: 5, label: '5 points' },
    { value: 6, label: '6 points' },
    { value: 7, label: '7 points' },
    { value: 8, label: '8 points' },
    { value: 9, label: '9 points' },
    { value: 10, label: '10 points' },
  ],
  powers_of_2: [
    { value: null, label: 'No estimate' },
    { value: 1, label: '1 point' },
    { value: 2, label: '2 points' },
    { value: 4, label: '4 points' },
    { value: 8, label: '8 points' },
    { value: 16, label: '16 points' },
    { value: 32, label: '32 points' },
    { value: 64, label: '64 points' },
  ],
  tshirt: [
    { value: null, label: 'No estimate' },
    { value: 1, label: 'XS' },
    { value: 2, label: 'S' },
    { value: 3, label: 'M' },
    { value: 5, label: 'L' },
    { value: 8, label: 'XL' },
  ],
};

/**
 * Set the callback to be called when rituals change.
 * Used by rituals-view to register its refresh function.
 * @param {Function|null} callback
 */
export function setOnRitualsChanged(callback) {
  _onRitualsChangedCallback = callback;
}

/**
 * Get current projects list
 * @returns {Array} Current projects
 */
export function getProjects() {
  return projects;
}

/**
 * Set projects list (for external updates)
 * @param {Array} newProjects - New projects list
 */
export function setProjects(newProjects) {
  projects = newProjects;
}

/**
 * Get estimate options for a project
 * @param {string} projectId - Project ID
 * @returns {Array} Estimate options
 */
export function getEstimateOptions(projectId) {
  const project = projects.find((p) => p.id === projectId);
  const scale = project?.estimate_scale || 'fibonacci';
  return ESTIMATE_SCALES[scale] || ESTIMATE_SCALES.fibonacci;
}

/**
 * Format an estimate value for display
 * @param {number|null} value - Estimate value
 * @param {string} projectId - Project ID
 * @returns {string} Formatted estimate
 */
export function formatEstimate(value, projectId) {
  if (!value) return 'No estimate';
  const options = getEstimateOptions(projectId);
  const option = options.find((o) => o.value === value);
  return option ? option.label : `${value} points`;
}

/**
 * Get a hint about the estimate scale for a project
 * @param {string} projectId - Project ID
 * @returns {string} Scale hint text
 */
export function getEstimateScaleHint(projectId) {
  const project = projects.find((p) => p.id === projectId);
  const scale = project?.estimate_scale || 'fibonacci';
  const options = (ESTIMATE_SCALES[scale] || ESTIMATE_SCALES.fibonacci).filter(
    (o) => o.value !== null
  );
  if (scale === 'tshirt') {
    const mapping = options.map((o) => `${o.label}=${o.value}pt`).join(', ');
    return `This project uses t-shirt estimates (${mapping}). Budget is in points.`;
  }
  const values = options.map((o) => o.value).join(', ');
  const scaleNames = {
    fibonacci: 'Fibonacci',
    linear: 'Linear',
    powers_of_2: 'Powers of 2',
  };
  return `${scaleNames[scale] || scale} scale: ${values}`;
}

/**
 * Load projects for the current team
 */
export async function loadProjects() {
  if (!getCurrentTeam()) return;
  try {
    projects = await api.getProjects(getCurrentTeam().id);
    updateProjectFilters();

    // Initialize currentProject: keep if valid, else URL > saved > first
    const current = getCurrentProject();
    if (current && projects.some(p => p.id === current)) return;
    const urlProject = getProjectFromUrl();
    if (urlProject && projects.some(p => p.id === urlProject)) {
      setCurrentProject(urlProject);
      return;
    }
    const saved = getSavedProject();
    if (saved && projects.some(p => p.id === saved)) {
      setCurrentProject(saved);
      return;
    }
    if (projects.length > 0) {
      setCurrentProject(projects[0].id);
    }
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Update all project filter dropdowns with current project list.
 * Populates <option> elements and syncs to currentProject state.
 */
export function updateProjectFilters() {
  const allProjectsOptions =
    '<option value="">All Projects</option>' +
    projects
      .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
      .join('');

  const selectProjectOptions =
    '<option value="">Select Project</option>' +
    projects
      .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
      .join('');

  // Views that allow "All Projects" (empty = show all)
  const allProjectsFilterIds = ['project-filter', 'doc-project-filter', 'dashboard-project-filter', 'epics-project-filter'];
  // Views that require a project selection
  const selectProjectFilterIds = ['board-project-filter', 'sprint-project-filter', 'rituals-project-filter'];

  allProjectsFilterIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = allProjectsOptions;
  });
  selectProjectFilterIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = selectProjectOptions;
  });

  // Sync all dropdowns to current project state
  const currentProjectId = getCurrentProject();
  PROJECT_FILTER_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = currentProjectId || '';
  });
}

/**
 * Get the saved project ID from storage
 * @returns {string|null} Saved project ID
 */
export function getSavedProjectId() {
  return getSavedProject();
}

/**
 * Render the projects grid
 */
export function renderProjects() {
  const list = document.getElementById('projects-list');
  if (projects.length === 0) {
    list.innerHTML = `
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;
    return;
  }

  list.innerHTML = projects
    .map(
      (project) => `
        <div class="grid-item" data-action="view-project" data-project-id="${escapeAttr(project.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${sanitizeColor(project.color)}20; color: ${sanitizeColor(project.color)}">
                    ${escapeHtml(project.icon || project.key.charAt(0))}
                </div>
                <div class="grid-item-title">${escapeHtml(project.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${escapeAttr(project.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${escapeHtml(project.description || 'No description')}</div>
            <div class="grid-item-footer">
                <span>${project.key}</span>
                <span>•</span>
                <span>${project.issue_count} issues</span>
            </div>
        </div>
    `
    )
    .join('');
}

/**
 * View a project's issues
 * @param {string} projectId - Project ID
 */
export function viewProject(projectId) {
  setCurrentProject(projectId);
  navigateTo('issues');
}

/**
 * Show the create project modal
 */
export function showCreateProjectModal() {
  document.getElementById('modal-title').textContent = 'Create Project';
  document.getElementById('modal-content').innerHTML = `
        <form data-action="create-project">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key (2-10 uppercase letters/numbers)</label>
                <input type="text" id="project-key" pattern="[A-Z0-9]{2,10}" required
                    style="text-transform: uppercase">
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description"></textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="#6366f1">
            </div>
            <div class="form-group">
                <label for="project-estimate-scale">Estimate Scale</label>
                <select id="project-estimate-scale">
                    <option value="fibonacci">Fibonacci (1, 2, 3, 5, 8, 13, 21)</option>
                    <option value="linear">Linear (1-10)</option>
                    <option value="powers_of_2">Powers of 2 (1, 2, 4, 8, 16, 32, 64)</option>
                    <option value="tshirt">T-Shirt (XS, S, M, L, XL)</option>
                </select>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="project-human-rituals-required">
                    Require humans to complete rituals
                </label>
                <small class="form-hint">When unchecked, humans can close tickets without completing rituals</small>
            </div>
            <button type="submit" class="btn btn-primary">Create Project</button>
        </form>
    `;
  showModal();
}

/**
 * Handle create project form submission
 * @param {Event} event - Form submit event
 */
export async function handleCreateProject(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('project-name').value,
    key: document.getElementById('project-key').value.toUpperCase(),
    description: document.getElementById('project-description').value,
    color: document.getElementById('project-color').value,
    estimate_scale: document.getElementById('project-estimate-scale').value,
    human_rituals_required: document.getElementById(
      'project-human-rituals-required'
    ).checked,
  };

  try {
    await api.createProject(getCurrentTeam().id, data);
    await loadProjects();
    renderProjects();
    closeModal();
    showToast('Project created!', 'success');
  } catch (e) {
    showToast(`Failed to create project: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Show the edit project modal
 * @param {string} projectId - Project ID to edit
 */
export function showEditProjectModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const scaleOptions = [
    { value: 'fibonacci', label: 'Fibonacci (1, 2, 3, 5, 8, 13, 21)' },
    { value: 'linear', label: 'Linear (1-10)' },
    { value: 'powers_of_2', label: 'Powers of 2 (1, 2, 4, 8, 16, 32, 64)' },
    { value: 'tshirt', label: 'T-Shirt (XS, S, M, L, XL)' },
  ];

  document.getElementById('modal-title').textContent = 'Edit Project';
  document.getElementById('modal-content').innerHTML = `
        <form data-action="update-project" data-project-id="${escapeAttr(project.id)}">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${escapeAttr(project.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${project.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${escapeHtml(project.description || '')}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${sanitizeColor(project.color)}">
            </div>
            <div class="form-group">
                <label for="project-estimate-scale">Estimate Scale</label>
                <select id="project-estimate-scale">
                    ${scaleOptions
                      .map(
                        (opt) => `
                        <option value="${opt.value}" ${project.estimate_scale === opt.value ? 'selected' : ''}>${opt.label}</option>
                    `
                      )
                      .join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="project-human-rituals-required" ${project.human_rituals_required ? 'checked' : ''}>
                    Require humans to complete rituals
                </label>
                <small class="form-hint">When unchecked, humans can close tickets without completing rituals (agents must still complete rituals)</small>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-danger-outline" data-action="confirm-delete-project" data-project-id="${escapeAttr(project.id)}">Delete Project</button>
            </div>
        </form>
    `;
  showModal();
}

/**
 * Handle update project form submission
 * @param {Event} event - Form submit event
 * @param {string} projectId - Project ID to update
 */
export async function handleUpdateProject(event, projectId) {
  event.preventDefault();
  const data = {
    name: document.getElementById('project-name').value,
    description: document.getElementById('project-description').value,
    color: document.getElementById('project-color').value,
    estimate_scale: document.getElementById('project-estimate-scale').value,
    human_rituals_required: document.getElementById(
      'project-human-rituals-required'
    ).checked,
  };

  try {
    await api.updateProject(projectId, data);
    await loadProjects();
    renderProjects();
    closeModal();
    showToast('Project updated!', 'success');
  } catch (e) {
    showToast(`Failed to update project: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Confirm and delete a project
 * @param {string} projectId - Project ID to delete
 */
export async function confirmDeleteProject(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  if (
    confirm(
      `Are you sure you want to delete "${project.name}"? This will delete all issues in this project.`
    )
  ) {
    try {
      await api.deleteProject(projectId);
      await loadProjects();
      renderProjects();
      closeModal();
      showToast('Project deleted', 'success');
    } catch (e) {
      showToast(`Failed to delete project: ${e.message}`, 'error');
    }
  }
}

// ============================================================================
// Project Settings Page
// ============================================================================

// Current project being edited in the settings page
let currentSettingsProjectId = null;

/**
 * Navigate to and load the project settings page
 * @param {string} projectId - Project ID
 */
export async function viewProjectSettings(projectId) {
  currentSettingsProjectId = projectId;

  // Ensure projects are loaded
  if (projects.length === 0) {
    await loadProjects();
  }

  const project = projects.find(p => p.id === projectId);
  if (!project) {
    showToast('Project not found', 'error');
    navigateTo('projects');
    return;
  }

  // Update page title
  document.getElementById('project-settings-title').textContent = `${project.name} Settings`;

  // Populate General tab
  document.getElementById('ps-name').value = project.name || '';
  document.getElementById('ps-key').value = project.key || '';
  document.getElementById('ps-description').value = project.description || '';
  document.getElementById('ps-color').value = project.color || '#6366f1';

  // Populate Rules tab
  document.getElementById('ps-estimate-scale').value = project.estimate_scale || 'fibonacci';
  document.getElementById('ps-default-sprint-budget').value = project.default_sprint_budget || '';
  document.getElementById('ps-unestimated-handling').value = project.unestimated_handling || 'default_one_point';
  document.getElementById('ps-human-rituals-required').checked = project.human_rituals_required === true;
  document.getElementById('ps-require-estimate-on-claim').checked = project.require_estimate_on_claim === true;

  // Show the view
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById('project-settings-view').classList.remove('hidden');

  // Activate first tab
  switchProjectSettingsTab('general');

  // Update URL
  window.history.pushState({}, '', `/projects/${encodeURIComponent(projectId)}/settings`);
}

/**
 * Switch between project settings tabs
 * @param {string} tabName - Tab name ('general', 'rules', 'sprint-rituals', 'close-rituals', 'claim-rituals')
 */
export function switchProjectSettingsTab(tabName) {
  // Validate tab name, fallback to 'general'
  const validTabs = ['general', 'rules', 'sprint-rituals', 'close-rituals', 'claim-rituals'];
  if (!validTabs.includes(tabName)) {
    tabName = 'general';
  }

  // Update tab buttons
  document.querySelectorAll('.settings-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  // Update tab content
  document.querySelectorAll('.settings-tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  const tabContent = document.getElementById(`project-settings-tab-${tabName}`);
  if (tabContent) {
    tabContent.classList.remove('hidden');
  }

  // Load rituals when switching to a ritual tab
  if (tabName.endsWith('-rituals') && (!projectRituals || projectRituals.length === 0)) {
    loadProjectSettingsRituals();
  }
}

/**
 * Clear project settings state when navigating away
 */
export function clearProjectSettingsState() {
  currentSettingsProjectId = null;
  projectRituals = [];
}

/**
 * Set the current settings project ID (used by rituals view to reuse CRUD functions)
 */
export function setCurrentSettingsProjectId(projectId) {
  currentSettingsProjectId = projectId;
}

/**
 * Get the current project rituals array
 */
export function getProjectRituals() {
  return projectRituals;
}

/**
 * Save general settings (name, description, color)
 */
export async function saveProjectSettingsGeneral() {
  if (!currentSettingsProjectId) return;

  const name = document.getElementById('ps-name').value.trim();
  if (!name) {
    showToast('Project name is required', 'error');
    return;
  }

  const data = {
    name: name,
    description: document.getElementById('ps-description').value,
    color: document.getElementById('ps-color').value,
  };

  try {
    await api.updateProject(currentSettingsProjectId, data);
    await loadProjects(); // Refresh project list
    showToast('Settings saved', 'success');

    // Update page title with new name
    const project = projects.find(p => p.id === currentSettingsProjectId);
    if (project) {
      document.getElementById('project-settings-title').textContent = `${project.name} Settings`;
    }
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Save rules settings (estimate scale, ritual requirements)
 */
export async function saveProjectSettingsRules() {
  if (!currentSettingsProjectId) return;

  const budgetInput = document.getElementById('ps-default-sprint-budget').value;
  const defaultSprintBudget = budgetInput ? parseInt(budgetInput) : null;

  const data = {
    estimate_scale: document.getElementById('ps-estimate-scale').value,
    default_sprint_budget: defaultSprintBudget,
    unestimated_handling: document.getElementById('ps-unestimated-handling').value,
    human_rituals_required: document.getElementById('ps-human-rituals-required').checked,
    require_estimate_on_claim: document.getElementById('ps-require-estimate-on-claim').checked,
  };

  try {
    await api.updateProject(currentSettingsProjectId, data);
    await loadProjects(); // Refresh project list
    showToast('Settings saved', 'success');
  } catch (e) {
    showToast(`Failed to save settings: ${e.message}`, 'error');
  }
}

// ============================================================================
// Project Settings - Rituals
// ============================================================================

// Rituals for the current project settings page
let projectRituals = [];

/**
 * Load rituals for the current project settings page
 */
export async function loadProjectSettingsRituals() {
  if (!currentSettingsProjectId) return;

  try {
    projectRituals = await api.getRituals(currentSettingsProjectId);
    renderProjectSettingsRituals();
    // Notify rituals view if active (for CRUD operations triggered from modals)
    if (typeof _onRitualsChangedCallback === 'function') {
      _onRitualsChangedCallback();
    }
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Render rituals in all three ritual tab containers
 */
function renderProjectSettingsRituals() {
  // Skip if project settings containers aren't in the DOM (e.g., on the rituals view)
  if (!document.getElementById('ps-sprint-rituals-list')) return;

  const sprintRituals = projectRituals.filter(r => !r.trigger || r.trigger === 'every_sprint');
  const closeRituals = projectRituals.filter(r => r.trigger === 'ticket_close');
  const claimRituals = projectRituals.filter(r => r.trigger === 'ticket_claim');

  renderRitualList('ps-sprint-rituals-list', sprintRituals, 'sprint');
  renderRitualList('ps-close-rituals-list', closeRituals, 'close');
  renderRitualList('ps-claim-rituals-list', claimRituals, 'claim');
}

/**
 * Render a list of rituals into a container
 * @param {string} containerId - Container element ID
 * @param {Array} rituals - Rituals to render
 * @param {string} type - Ritual type for empty message
 */
export function renderRitualList(containerId, rituals, type) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (rituals.length === 0) {
    const typeLabels = {
      sprint: 'sprint close',
      close: 'ticket close',
      claim: 'ticket claim',
    };
    container.innerHTML = `<p class="empty-state">No ${typeLabels[type]} rituals configured.</p>`;
    return;
  }

  const approvalModeClass = (mode) => escapeAttr(mode || 'auto');
  container.innerHTML = rituals.map(ritual => {
    let groupBadge = '';
    if (ritual.group_name) {
      const extraInfo = ritual.weight != null && ritual.weight !== 1 ? ` w:${ritual.weight}` :
                        ritual.percentage != null ? ` ${ritual.percentage}%` : '';
      groupBadge = `<span class="badge badge-ritual-group">${escapeHtml(ritual.group_name)}${extraInfo}</span>`;
    }
    return `
    <div class="ritual-item mode-${approvalModeClass(ritual.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${escapeHtml(ritual.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${renderMarkdown(ritual.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${approvalModeClass(ritual.approval_mode)}">${escapeHtml(ritual.approval_mode || 'auto')}</span>
          ${groupBadge}
          ${!ritual.group_name && ritual.approval_mode === 'auto' ? 'Agent clears immediately' : ''}
          ${!ritual.group_name && ritual.approval_mode === 'review' ? 'Requires human approval' : ''}
          ${!ritual.group_name && ritual.approval_mode === 'gate' ? 'Human only' : ''}
          ${ritual.note_required === false ? '<span class="badge badge-no-note">no note</span>' : ''}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${escapeAttr(ritual.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-ritual-name="${escapeAttr(ritual.name)}">Delete</button>
      </div>
    </div>
  `;
  }).join('');
}

/**
 * Show modal to create a ritual with preset trigger
 * @param {string} triggerType - Trigger type to preset
 */
export async function showCreateProjectRitualModal(triggerType) {
  if (!currentSettingsProjectId) return;

  // Load ritual groups for the dropdown
  let groups = [];
  try {
    groups = await api.getRitualGroups(currentSettingsProjectId);
  } catch { /* ignore */ }

  document.getElementById('modal-title').textContent = 'Create Ritual';
  document.getElementById('modal-content').innerHTML = `
    <form data-action="create-project-ritual">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" placeholder="e.g., run-tests, update-docs" required>
        <p class="form-help">Short identifier for the ritual.</p>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" placeholder="e.g., Did you run the test suite and verify all tests pass?" required></textarea>
        <p class="form-help">What the agent should consider/do.</p>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" data-action="toggle-ritual-conditions">
          <option value="every_sprint" ${triggerType === 'every_sprint' ? 'selected' : ''}>Every Sprint - Required when sprint closes</option>
          <option value="ticket_close" ${triggerType === 'ticket_close' ? 'selected' : ''}>Ticket Close - Required when closing a ticket</option>
          <option value="ticket_claim" ${triggerType === 'ticket_claim' ? 'selected' : ''}>Ticket Claim - Required when claiming a ticket</option>
        </select>
        <p class="form-help">When this ritual is required.</p>
      </div>
      <div class="form-group">
        <label for="ritual-mode">Approval Mode</label>
        <select id="ritual-mode">
          <option value="auto">Auto - Agent clears immediately</option>
          <option value="review">Review - Requires human approval</option>
          <option value="gate">Gate - Human only (agent cannot attest)</option>
        </select>
        <p class="form-help">How attestations are approved.</p>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="ritual-note-required" checked>
          Require note on attestation
        </label>
        <p class="form-help">When checked, agents must provide a note when attesting.</p>
      </div>
      <div class="form-group">
        <label for="ritual-group">Group</label>
        <select id="ritual-group" data-action="ritual-group-change">
          <option value="">None (always required)</option>
          ${groups.map(g => `<option value="${escapeAttr(g.id)}" data-mode="${escapeAttr(g.selection_mode)}">${escapeHtml(g.name)} (${escapeHtml(g.selection_mode)})</option>`).join('')}
          <option value="__create__">+ Create Group...</option>
        </select>
        <p class="form-help">Group rituals for random/round-robin/percentage selection.</p>
      </div>
      <div id="ritual-group-create-inline" class="form-group hidden">
        <div style="display: flex; gap: 8px; align-items: end;">
          <div style="flex: 1;">
            <label for="ritual-new-group-name">Group Name</label>
            <input type="text" id="ritual-new-group-name" placeholder="e.g., review-checks">
          </div>
          <div>
            <label for="ritual-new-group-mode">Mode</label>
            <select id="ritual-new-group-mode">
              <option value="random_one">Random One</option>
              <option value="round_robin">Round Robin</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
      </div>
      <div id="ritual-weight-group" class="form-group hidden">
        <label for="ritual-weight">Weight</label>
        <input type="number" id="ritual-weight" value="1" min="0" step="0.1">
        <p class="form-help">Relative weight for random selection (higher = more likely).</p>
      </div>
      <div id="ritual-percentage-group" class="form-group hidden">
        <label for="ritual-percentage">Percentage (%)</label>
        <input type="number" id="ritual-percentage" value="" min="0" max="100" step="1" placeholder="e.g., 50">
        <p class="form-help">Independent chance this ritual is required each time (0-100).</p>
      </div>
      <div id="ritual-conditions-section"${triggerType === 'every_sprint' ? ' style="display: none;"' : ''}>
        ${renderConditionBuilder(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `;
  showModal();
}

/**
 * Handle group dropdown change in ritual create/edit modals.
 * Shows/hides the inline create form and weight/percentage fields.
 */
/**
 * Show/hide the condition builder based on trigger type (CHT-764).
 * Conditions only apply to ticket-level rituals, not sprint rituals.
 */
export function toggleRitualConditions() {
  const trigger = document.getElementById('ritual-trigger')?.value;
  const section = document.getElementById('ritual-conditions-section');
  if (section) {
    section.style.display = (trigger === 'every_sprint') ? 'none' : '';
  }
}

export function onRitualGroupChange() {
  const select = document.getElementById('ritual-group');
  const createInline = document.getElementById('ritual-group-create-inline');
  const weightGroup = document.getElementById('ritual-weight-group');
  const percentageGroup = document.getElementById('ritual-percentage-group');

  if (select.value === '__create__') {
    createInline.classList.remove('hidden');
    weightGroup.classList.add('hidden');
    percentageGroup.classList.add('hidden');
  } else {
    createInline.classList.add('hidden');
    if (select.value) {
      const selectedOption = select.options[select.selectedIndex];
      const mode = selectedOption.dataset.mode;
      weightGroup.classList.toggle('hidden', mode !== 'random_one');
      percentageGroup.classList.toggle('hidden', mode !== 'percentage');
    } else {
      weightGroup.classList.add('hidden');
      percentageGroup.classList.add('hidden');
    }
  }
}

/**
 * Resolve the group_id from the modal form, creating inline group if needed.
 * @returns {Promise<string|null>} group_id or null
 */
async function resolveRitualGroupId() {
  const select = document.getElementById('ritual-group');
  if (select.value === '__create__') {
    const name = document.getElementById('ritual-new-group-name').value.trim();
    if (!name) {
      showToast('Group name is required', 'error');
      throw new Error('Group name required');
    }
    const mode = document.getElementById('ritual-new-group-mode').value;
    const group = await api.createRitualGroup(currentSettingsProjectId, { name, selection_mode: mode });
    return group.id;
  }
  return select.value || null;
}

/**
 * Handle create ritual form submission from project settings
 * @param {Event} event - Form submit event
 */
export async function handleCreateProjectRitual(event) {
  event.preventDefault();

  let conditions;
  try {
    conditions = collectConditions();
  } catch {
    return false;
  }

  let groupId;
  try {
    groupId = await resolveRitualGroupId();
  } catch {
    return false;
  }

  const data = {
    name: document.getElementById('ritual-name').value,
    prompt: document.getElementById('ritual-prompt').value,
    trigger: document.getElementById('ritual-trigger').value,
    approval_mode: document.getElementById('ritual-mode').value,
    note_required: document.getElementById('ritual-note-required').checked,
    conditions: conditions,
  };

  if (groupId) {
    data.group_id = groupId;
    const weightEl = document.getElementById('ritual-weight');
    const percentageEl = document.getElementById('ritual-percentage');
    if (!document.getElementById('ritual-weight-group').classList.contains('hidden') && weightEl.value) {
      data.weight = parseFloat(weightEl.value);
    }
    if (!document.getElementById('ritual-percentage-group').classList.contains('hidden') && percentageEl.value) {
      data.percentage = parseFloat(percentageEl.value);
    }
  }

  try {
    await api.createRitual(currentSettingsProjectId, data);
    await loadProjectSettingsRituals();
    closeModal();
    showToast('Ritual created!', 'success');
  } catch (e) {
    showToast(`Failed to create ritual: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Show modal to edit a ritual from project settings
 * @param {string} ritualId - Ritual ID to edit
 */
export async function showEditProjectRitualModal(ritualId) {
  const ritual = projectRituals.find(r => r.id === ritualId);
  if (!ritual) return;

  // Load ritual groups for the dropdown
  let groups = [];
  try {
    groups = await api.getRitualGroups(currentSettingsProjectId);
  } catch { /* ignore */ }

  const selectedGroup = groups.find(g => g.id === ritual.group_id);
  const showWeight = selectedGroup && selectedGroup.selection_mode === 'random_one';
  const showPercentage = selectedGroup && selectedGroup.selection_mode === 'percentage';

  document.getElementById('modal-title').textContent = 'Edit Ritual';
  document.getElementById('modal-content').innerHTML = `
    <form data-action="update-project-ritual" data-ritual-id="${escapeAttr(ritualId)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${escapeAttr(ritual.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${escapeHtml(ritual.prompt)}</textarea>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" data-action="toggle-ritual-conditions">
          <option value="every_sprint" ${!ritual.trigger || ritual.trigger === 'every_sprint' ? 'selected' : ''}>Every Sprint - Required when sprint closes</option>
          <option value="ticket_close" ${ritual.trigger === 'ticket_close' ? 'selected' : ''}>Ticket Close - Required when closing a ticket</option>
          <option value="ticket_claim" ${ritual.trigger === 'ticket_claim' ? 'selected' : ''}>Ticket Claim - Required when claiming a ticket</option>
        </select>
      </div>
      <div class="form-group">
        <label for="ritual-mode">Approval Mode</label>
        <select id="ritual-mode">
          <option value="auto" ${ritual.approval_mode === 'auto' ? 'selected' : ''}>Auto - Agent clears immediately</option>
          <option value="review" ${ritual.approval_mode === 'review' ? 'selected' : ''}>Review - Requires human approval</option>
          <option value="gate" ${ritual.approval_mode === 'gate' ? 'selected' : ''}>Gate - Human only</option>
        </select>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="ritual-note-required" ${ritual.note_required !== false ? 'checked' : ''}>
          Require note on attestation
        </label>
        <p class="form-help">When checked, agents must provide a note when attesting.</p>
      </div>
      <div class="form-group">
        <label for="ritual-group">Group</label>
        <select id="ritual-group" data-action="ritual-group-change">
          <option value="">None (always required)</option>
          ${groups.map(g => `<option value="${escapeAttr(g.id)}" data-mode="${escapeAttr(g.selection_mode)}" ${ritual.group_id === g.id ? 'selected' : ''}>${escapeHtml(g.name)} (${escapeHtml(g.selection_mode)})</option>`).join('')}
          <option value="__create__">+ Create Group...</option>
        </select>
      </div>
      <div id="ritual-group-create-inline" class="form-group hidden">
        <div style="display: flex; gap: 8px; align-items: end;">
          <div style="flex: 1;">
            <label for="ritual-new-group-name">Group Name</label>
            <input type="text" id="ritual-new-group-name" placeholder="e.g., review-checks">
          </div>
          <div>
            <label for="ritual-new-group-mode">Mode</label>
            <select id="ritual-new-group-mode">
              <option value="random_one">Random One</option>
              <option value="round_robin">Round Robin</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>
      </div>
      <div id="ritual-weight-group" class="form-group ${showWeight ? '' : 'hidden'}">
        <label for="ritual-weight">Weight</label>
        <input type="number" id="ritual-weight" value="${ritual.weight || 1}" min="0" step="0.1">
        <p class="form-help">Relative weight for random selection (higher = more likely).</p>
      </div>
      <div id="ritual-percentage-group" class="form-group ${showPercentage ? '' : 'hidden'}">
        <label for="ritual-percentage">Percentage (%)</label>
        <input type="number" id="ritual-percentage" value="${ritual.percentage != null ? ritual.percentage : ''}" min="0" max="100" step="1" placeholder="e.g., 50">
        <p class="form-help">Independent chance this ritual is required each time (0-100).</p>
      </div>
      <div id="ritual-conditions-section"${!ritual.trigger || ritual.trigger === 'every_sprint' ? ' style="display: none;"' : ''}>
        ${renderConditionBuilder(ritual.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `;
  showModal();
}

/**
 * Handle update ritual form submission from project settings
 * @param {Event} event - Form submit event
 * @param {string} ritualId - Ritual ID to update
 */
export async function handleUpdateProjectRitual(event, ritualId) {
  event.preventDefault();

  let conditions;
  try {
    conditions = collectConditions();
  } catch {
    return false;
  }

  let groupId;
  try {
    groupId = await resolveRitualGroupId();
  } catch {
    return false;
  }

  const data = {
    name: document.getElementById('ritual-name').value,
    prompt: document.getElementById('ritual-prompt').value,
    trigger: document.getElementById('ritual-trigger').value,
    approval_mode: document.getElementById('ritual-mode').value,
    note_required: document.getElementById('ritual-note-required').checked,
    conditions: conditions,
    group_id: groupId || '',  // empty string removes from group
  };

  if (groupId) {
    const weightEl = document.getElementById('ritual-weight');
    const percentageEl = document.getElementById('ritual-percentage');
    if (!document.getElementById('ritual-weight-group').classList.contains('hidden') && weightEl.value) {
      data.weight = parseFloat(weightEl.value);
    }
    if (!document.getElementById('ritual-percentage-group').classList.contains('hidden') && percentageEl.value) {
      data.percentage = parseFloat(percentageEl.value);
    }
  }

  try {
    await api.updateRitual(ritualId, data);
    await loadProjectSettingsRituals();
    closeModal();
    showToast('Ritual updated!', 'success');
  } catch (e) {
    showToast(`Failed to update ritual: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Delete a ritual from project settings
 * @param {string} ritualId - Ritual ID to delete
 * @param {string} ritualName - Ritual name for confirmation
 */
export async function deleteProjectRitual(ritualId, ritualName) {
  if (!confirm(`Delete ritual "${ritualName}"? This cannot be undone.`)) return;

  try {
    await api.deleteRitual(ritualId);
    await loadProjectSettingsRituals();
    showToast('Ritual deleted', 'success');
  } catch (e) {
    showToast(`Failed to delete ritual: ${e.message}`, 'error');
  }
}

// ========================================
// Event Delegation Actions
// ========================================

registerActions({
  'view-project': (event, dataset) => {
    viewProject(dataset.projectId);
  },
  'view-project-settings': (event, dataset) => {
    event.stopPropagation();
    viewProjectSettings(dataset.projectId);
  },
  'create-project': (event) => {
    handleCreateProject(event);
  },
  'update-project': (event, dataset) => {
    handleUpdateProject(event, dataset.projectId);
  },
  'confirm-delete-project': (event, dataset) => {
    confirmDeleteProject(dataset.projectId);
  },
  'edit-project-ritual': (event, dataset) => {
    showEditProjectRitualModal(dataset.ritualId);
  },
  'delete-project-ritual': (event, dataset) => {
    deleteProjectRitual(dataset.ritualId, dataset.ritualName);
  },
  'create-project-ritual': (event) => {
    handleCreateProjectRitual(event);
  },
  'update-project-ritual': (event, dataset) => {
    handleUpdateProjectRitual(event, dataset.ritualId);
  },
  'toggle-ritual-conditions': () => {
    toggleRitualConditions();
  },
  'ritual-group-change': () => {
    onRitualGroupChange();
  },
});

