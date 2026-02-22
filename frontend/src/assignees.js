/**
 * Assignees module - Assignee management and formatting (CHT-1033)
 *
 * Extracted from app.js to decouple assignee logic from the main application module.
 */

import { escapeHtml } from './utils.js';

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
    const prefix = indentAgent ? '&nbsp;&nbsp;- ' : '';
    return `${prefix}${base}${parent}`;
}

export function getAssigneeOptionList() {
    const memberAssignees = assignees.filter(a => !a.is_agent);
    const agentsByParent = new Map();
    const memberIds = new Set(memberAssignees.map(m => m.id));

    assignees.filter(a => a.is_agent).forEach(agent => {
        const parentId = agent.parent_user_id;
        if (!agentsByParent.has(parentId)) {
            agentsByParent.set(parentId, []);
        }
        agentsByParent.get(parentId).push(agent);
    });

    const options = [];
    memberAssignees.forEach(member => {
        options.push({ assignee: member, indent: false });
        const children = agentsByParent.get(member.id) || [];
        children.sort((a, b) => a.name.localeCompare(b.name));
        children.forEach(agent => options.push({ assignee: agent, indent: true }));
    });

    const orphanAgents = assignees.filter(a => a.is_agent && !memberIds.has(a.parent_user_id));
    orphanAgents.sort((a, b) => a.name.localeCompare(b.name));
    orphanAgents.forEach(agent => options.push({ assignee: agent, indent: false }));

    return options;
}

export function updateAssigneeFilter() {
    const assigneeFilter = document.getElementById('assignee-filter');
    if (!assigneeFilter) return;

    const currentSelection = assigneeFilter.value;

    let options = `
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;

    getAssigneeOptionList().forEach(({ assignee, indent }) => {
        options += `<option value="${assignee.id}">${formatAssigneeOptionLabel(assignee, indent)}</option>`;
    });

    assigneeFilter.innerHTML = options;

    if (currentSelection) {
        assigneeFilter.value = currentSelection;
    }
}

/**
 * Reset assignees state. Used by tests for isolation.
 */
export function resetAssignees() {
    assignees = [];
}
