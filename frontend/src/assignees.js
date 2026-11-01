/**
 * Assignees module - Assignee management and formatting (CHT-1033)
 *
 * Extracted from app.js to decouple assignee logic from the main application module.
 */

import { escapeHtml, escapeAttr } from './utils.js';

let assignees = [];

function normalizeMemberAssignee(member) {
    const name = member.user_name || member.name || member.user_email || member.email || 'Unknown';
    return {
        id: member.user_id || member.id,
        name,
        email: member.user_email || member.email || null,
        is_agent: false,
        parent_user_id: null,
        parent_user_name: null,
    };
}

function normalizeAgentAssignee(agent) {
    return {
        id: agent.id,
        name: agent.name,
        email: null,
        is_agent: true,
        parent_user_id: agent.parent_user_id || null,
        parent_user_name: agent.parent_user_name || null,
        avatar_url: agent.avatar_url || null,
        kind: agent.kind || null,
        registered_by_id: agent.registered_by_id || null,
        idle: agent.idle === true,
    };
}

/**
 * Build the assignees list from team members and agents.
 * @param {Function} getMembers - Returns current team members
 * @param {Function} getAgents - Returns current team agents
 */
export function buildAssignees(getMembers, getAgents) {
    const memberAssignees = getMembers().map(normalizeMemberAssignee);
    const agentAssignees = getAgents().map(normalizeAgentAssignee);
    assignees = [...memberAssignees, ...agentAssignees];
}

export function getAssigneeById(assigneeId) {
    if (!assigneeId) return null;
    return assignees.find(a => a.id === assigneeId) || null;
}

export function formatAssigneeName(assignee) {
    if (!assignee) return null;
    if (assignee.is_agent) {
        return assignee.name || 'Agent';
    }
    return assignee.name || assignee.email || 'User';
}

export function formatAssigneeOptionLabel(assignee, indentAgent = false) {
    const base = escapeHtml(assignee.name || assignee.email || 'Unknown');
    if (!assignee.is_agent) {
        return base;
    }
    const parent = assignee.parent_user_name ? ` (${escapeHtml(assignee.parent_user_name)})` : ' (agent)';
    // `indentAgent`: false, true (under its person) or 2 (a session
    // identity under its registrar, CHT-1501).
    const depth = indentAgent === true ? 1 : Number(indentAgent) || 0;
    const prefix = depth ? `${'&nbsp;&nbsp;'.repeat(depth)}- ` : '';
    return `${prefix}${base}${parent}`;
}

/**
 * The assignee picker's rows: each member, then the agents they hold
 * (indented), each agent followed by the session identities it registered
 * (indent 2, CHT-1501); agents whose holder is not a member come last.
 * Idle session identities are left out unless `includeIdle`, or unless one
 * is `keepId` (the current selection, so a picker still shows it). They
 * stay in the assignee list itself, so an issue already assigned to one
 * still shows its name.
 * @param {{includeIdle?: boolean, keepId?: string|null}} [opts]
 */
export function getAssigneeOptionList({ includeIdle = false, keepId = null } = {}) {
    const shown = assignees.filter(a => includeIdle || !a.idle || a.id === keepId);
    const memberAssignees = shown.filter(a => !a.is_agent);
    const memberIds = new Set(memberAssignees.map(m => m.id));
    const agents = shown.filter(a => a.is_agent);
    const agentIds = new Set(agents.map(a => a.id));
    const byName = (a, b) => a.name.localeCompare(b.name);
    const underRegistrar = a => a.registered_by_id && agentIds.has(a.registered_by_id);

    const sessionsByRegistrar = new Map();
    const agentsByParent = new Map();
    agents.forEach(agent => {
        const [map, key] = underRegistrar(agent)
            ? [sessionsByRegistrar, agent.registered_by_id]
            : [agentsByParent, agent.parent_user_id];
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(agent);
    });

    const options = [];
    const pushAgent = (agent, indent) => {
        options.push({ assignee: agent, indent });
        const sessions = sessionsByRegistrar.get(agent.id) || [];
        sessions.sort(byName).forEach(s => options.push({ assignee: s, indent: 2 }));
    };
    memberAssignees.forEach(member => {
        options.push({ assignee: member, indent: false });
        (agentsByParent.get(member.id) || []).sort(byName).forEach(agent => pushAgent(agent, true));
    });

    const orphanAgents = agents.filter(a => !underRegistrar(a) && !memberIds.has(a.parent_user_id));
    orphanAgents.sort(byName).forEach(agent => pushAgent(agent, false));

    return options;
}

/**
 * Rebuild the assignee filter's options, keeping its selection (and the
 * selection's option even when it is an idle session identity).
 * @param {{keepId?: string|null}} [opts] - an id to keep listed besides
 *   the current selection, and select (CHT-1501)
 */
export function updateAssigneeFilter({ keepId = null } = {}) {
    const assigneeFilter = document.getElementById('assignee-filter');
    if (!assigneeFilter) return;

    const currentSelection = keepId || assigneeFilter.value;

    let options = `
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;

    getAssigneeOptionList({ keepId: currentSelection }).forEach(({ assignee, indent }) => {
        options += `<option value="${escapeAttr(assignee.id)}">${formatAssigneeOptionLabel(assignee, indent)}</option>`;
    });

    assigneeFilter.innerHTML = options;

    if (currentSelection) {
        assigneeFilter.value = currentSelection;
    }
}

/**
 * Select `assigneeId` in the assignee filter, as a `?assignee=` link asks.
 * An idle session identity has no option until asked for, so add it
 * first: setting a <select> to a value it lacks silently clears it
 * (CHT-1501).
 * @param {string} assigneeId
 */
export function selectAssigneeFilter(assigneeId) {
    const assigneeFilter = document.getElementById('assignee-filter');
    if (!assigneeFilter || !assigneeId) return;
    const listed = Array.from(assigneeFilter.options).some(o => o.value === assigneeId);
    if (!listed && getAssigneeById(assigneeId)) {
        updateAssigneeFilter({ keepId: assigneeId });
    }
    assigneeFilter.value = assigneeId;
}

/**
 * Reset assignees state. Used by tests for isolation.
 */
export function resetAssignees() {
    assignees = [];
}
