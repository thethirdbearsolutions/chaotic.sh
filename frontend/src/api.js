/**
 * API client for Chaotic backend
 */

const API_BASE = '/api';

export class ApiClient {
    constructor() {
        try {
            this.token = localStorage.getItem('chaotic_token');
        } catch (e) {
            // Handle localStorage errors (private browsing, quota exceeded, etc.)
            console.warn('Failed to access localStorage:', e);
            this.token = null;
        }
    }

    setToken(token) {
        this.token = token;
        try {
            if (token) {
                localStorage.setItem('chaotic_token', token);
            } else {
                localStorage.removeItem('chaotic_token');
            }
        } catch (e) {
            // Handle localStorage errors (quota exceeded, private browsing, etc.)
            console.warn('Failed to persist token to localStorage:', e);
            // Token is still set in memory, so requests will work for this session
        }
    }

    getToken() {
        return this.token;
    }

    async request(method, path, data = null) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options = {
            method,
            headers,
        };

        if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE}${path}`, options);

        if (response.status === 204) {
            return null;
        }

        let result;
        try {
            result = await response.json();
        } catch {
            const contentType = response.headers.get('content-type') || 'unknown';
            if (!response.ok) {
                throw new Error(`Request failed (${response.status})`);
            }
            throw new Error(`Invalid response from server (expected JSON, got ${contentType})`);
        }

        if (!response.ok) {
            const detail = typeof result.detail === 'string' ? result.detail : 'An error occurred';
            throw new Error(detail);
        }

        return result;
    }

    // Auth
    async signup(name, email, password) {
        return this.request('POST', '/auth/signup', { name, email, password });
    }

    async login(email, password) {
        const result = await this.request('POST', '/auth/login', { email, password });
        this.setToken(result.access_token);
        return result;
    }

    async getMe() {
        return this.request('GET', '/auth/me');
    }

    logout() {
        this.setToken(null);
    }

    // Users
    async getUser(userId) {
        return this.request('GET', `/users/${userId}`);
    }

    async updateMe(data) {
        return this.request('PATCH', '/users/me', data);
    }

    // Teams
    async createTeam(data) {
        return this.request('POST', '/teams', data);
    }

    async getMyTeams() {
        return this.request('GET', '/teams');
    }

    async getTeam(teamId) {
        return this.request('GET', `/teams/${teamId}`);
    }

    async updateTeam(teamId, data) {
        return this.request('PATCH', `/teams/${teamId}`, data);
    }

    async deleteTeam(teamId) {
        return this.request('DELETE', `/teams/${teamId}`);
    }

    // Team Members
    async getTeamMembers(teamId) {
        return this.request('GET', `/teams/${teamId}/members`);
    }

    async updateMemberRole(teamId, userId, role) {
        return this.request('PATCH', `/teams/${teamId}/members/${userId}?role=${role}`);
    }

    async removeMember(teamId, userId) {
        return this.request('DELETE', `/teams/${teamId}/members/${userId}`);
    }

    // Team Invitations
    async createInvitation(teamId, email, role = 'member') {
        return this.request('POST', `/teams/${teamId}/invitations`, { email, role });
    }

    async getTeamInvitations(teamId) {
        return this.request('GET', `/teams/${teamId}/invitations`);
    }

    async acceptInvitation(token) {
        return this.request('POST', `/teams/invitations/${token}/accept`);
    }

    async deleteInvitation(teamId, invitationId) {
        return this.request('DELETE', `/teams/${teamId}/invitations/${invitationId}`);
    }

    // Projects
    async createProject(teamId, data) {
        return this.request('POST', `/projects?team_id=${teamId}`, data);
    }

    async getProjects(teamId) {
        return this.request('GET', `/projects?team_id=${teamId}`);
    }

    async getProject(projectId) {
        return this.request('GET', `/projects/${projectId}`);
    }

    async updateProject(projectId, data) {
        return this.request('PATCH', `/projects/${projectId}`, data);
    }

    async deleteProject(projectId) {
        return this.request('DELETE', `/projects/${projectId}`);
    }

    // Issues
    async createIssue(projectId, data) {
        return this.request('POST', `/issues?project_id=${projectId}`, data);
    }

    async getIssues(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') return;
            if (Array.isArray(value)) {
                value.forEach(v => queryParams.append(key, v));
            } else {
                queryParams.append(key, value);
            }
        });
        return this.request('GET', `/issues?${queryParams.toString()}`);
    }

    async searchIssues(teamId, query, projectId = null, skip = 0, limit = 50) {
        let url = `/issues/search?team_id=${teamId}&q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
        if (projectId) {
            url += `&project_id=${projectId}`;
        }
        return this.request('GET', url);
    }

    async getTeamIssues(teamId, params = {}) {
        const queryParams = new URLSearchParams({ team_id: teamId });
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') return;
            if (Array.isArray(value)) {
                value.forEach(v => queryParams.append(key, v));
            } else {
                queryParams.append(key, value);
            }
        });
        return this.request('GET', `/issues?${queryParams.toString()}`);
    }

    async getIssue(issueId) {
        return this.request('GET', `/issues/${issueId}`);
    }

    async getIssueByIdentifier(identifier) {
        return this.request('GET', `/issues/identifier/${identifier}`);
    }

    async updateIssue(issueId, data) {
        return this.request('PATCH', `/issues/${issueId}`, data);
    }

    async deleteIssue(issueId) {
        return this.request('DELETE', `/issues/${issueId}`);
    }

    // Comments
    async createComment(issueId, content) {
        return this.request('POST', `/issues/${issueId}/comments`, { content });
    }

    async getComments(issueId) {
        return this.request('GET', `/issues/${issueId}/comments`);
    }

    async updateComment(issueId, commentId, content) {
        return this.request('PATCH', `/issues/${issueId}/comments/${commentId}`, { content });
    }

    async deleteComment(issueId, commentId) {
        return this.request('DELETE', `/issues/${issueId}/comments/${commentId}`);
    }

    async getActivities(issueId, skip = 0, limit = 50) {
        return this.request('GET', `/issues/${issueId}/activities?skip=${skip}&limit=${limit}`);
    }

    async getTeamActivities(teamId, skip = 0, limit = 20) {
        return this.request('GET', `/issues/activities?team_id=${teamId}&skip=${skip}&limit=${limit}`);
    }

    async getSubIssues(issueId) {
        return this.request('GET', `/issues/${issueId}/sub-issues`);
    }

    // Issue Relations
    async getRelations(issueId) {
        return this.request('GET', `/issues/${issueId}/relations`);
    }

    async createRelation(issueId, relatedIssueId, relationType = 'blocks') {
        return this.request('POST', `/issues/${issueId}/relations`, {
            related_issue_id: relatedIssueId,
            relation_type: relationType,
        });
    }

    async deleteRelation(issueId, relationId) {
        return this.request('DELETE', `/issues/${issueId}/relations/${relationId}`);
    }

    // Sprints (note: manual creation removed in CHT-588, sprints use cadence system)
    async getSprints(projectId, status = null) {
        let url = `/sprints?project_id=${projectId}`;
        if (status) url += `&sprint_status=${status}`;
        return this.request('GET', url);
    }

    async getSprint(sprintId) {
        return this.request('GET', `/sprints/${sprintId}`);
    }

    async updateSprint(sprintId, data) {
        return this.request('PATCH', `/sprints/${sprintId}`, data);
    }

    async closeSprint(sprintId) {
        return this.request('POST', `/sprints/${sprintId}/close`);
    }

    async getCurrentSprint(projectId) {
        return this.request('GET', `/sprints/current?project_id=${projectId}`);
    }

    async getSprintTransactions(sprintId) {
        return this.request('GET', `/sprints/${sprintId}/transactions`);
    }

    // Rituals
    async createRitual(projectId, data) {
        return this.request('POST', `/rituals?project_id=${projectId}`, data);
    }

    async getRituals(projectId) {
        return this.request('GET', `/rituals?project_id=${projectId}`);
    }

    async getRitual(ritualId) {
        return this.request('GET', `/rituals/${ritualId}`);
    }

    async updateRitual(ritualId, data) {
        return this.request('PATCH', `/rituals/${ritualId}`, data);
    }

    async deleteRitual(ritualId) {
        return this.request('DELETE', `/rituals/${ritualId}`);
    }

    async getLimboStatus(projectId) {
        return this.request('GET', `/rituals/limbo?project_id=${projectId}`);
    }

    async getPendingGates(projectId) {
        return this.request('GET', `/rituals/pending-gates?project_id=${projectId}`);
    }

    async getPendingApprovals(projectId) {
        return this.request('GET', `/rituals/pending-approvals?project_id=${projectId}`);
    }

    async attestRitual(ritualId, projectId, note = null) {
        const data = {};
        if (note) data.note = note;
        return this.request('POST', `/rituals/${ritualId}/attest?project_id=${projectId}`, data);
    }

    async approveAttestation(ritualId, projectId) {
        return this.request('POST', `/rituals/${ritualId}/approve?project_id=${projectId}`, {});
    }

    async completeGateRitual(ritualId, projectId, note = null) {
        const data = {};
        if (note) data.note = note;
        return this.request('POST', `/rituals/${ritualId}/complete?project_id=${projectId}`, data);
    }

    // Ritual Groups
    async getRitualGroups(projectId) {
        return this.request('GET', `/rituals/groups?project_id=${projectId}`);
    }

    async createRitualGroup(projectId, data) {
        return this.request('POST', `/rituals/groups?project_id=${projectId}`, data);
    }

    async updateRitualGroup(groupId, data) {
        return this.request('PATCH', `/rituals/groups/${groupId}`, data);
    }

    async deleteRitualGroup(groupId) {
        return this.request('DELETE', `/rituals/groups/${groupId}`);
    }

    // Ticket-close rituals
    async getTicketRitualsStatus(issueId) {
        return this.request('GET', `/rituals/issue/${issueId}/pending`);
    }

    async attestTicketRitual(ritualId, issueId, note = null) {
        const data = {};
        if (note) data.note = note;
        return this.request('POST', `/rituals/${ritualId}/attest-issue/${issueId}`, data);
    }

    async completeTicketGateRitual(ritualId, issueId, note = null) {
        const data = {};
        if (note) data.note = note;
        return this.request('POST', `/rituals/${ritualId}/complete-issue/${issueId}`, data);
    }

    async approveTicketRitual(ritualId, issueId) {
        return this.request('POST', `/rituals/${ritualId}/approve-issue/${issueId}`, {});
    }

    // Documents
    async createDocument(teamId, data) {
        return this.request('POST', `/documents?team_id=${teamId}`, data);
    }

    async getDocuments(teamId, projectId = null, search = null, sprintId = null) {
        let url = `/documents?team_id=${teamId}`;
        if (projectId) url += `&project_id=${projectId}`;
        if (sprintId) url += `&sprint_id=${sprintId}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return this.request('GET', url);
    }

    async getDocument(documentId) {
        return this.request('GET', `/documents/${documentId}`);
    }

    async updateDocument(documentId, data) {
        return this.request('PATCH', `/documents/${documentId}`, data);
    }

    async deleteDocument(documentId) {
        return this.request('DELETE', `/documents/${documentId}`);
    }

    // Document-Issue Links
    async getDocumentIssues(documentId) {
        return this.request('GET', `/documents/${documentId}/issues`);
    }

    async linkDocumentToIssue(documentId, issueId) {
        return this.request('POST', `/documents/${documentId}/issues/${issueId}`);
    }

    async unlinkDocumentFromIssue(documentId, issueId) {
        return this.request('DELETE', `/documents/${documentId}/issues/${issueId}`);
    }

    async getIssueDocuments(issueId) {
        return this.request('GET', `/issues/${issueId}/documents`);
    }

    // Document Comments
    async getDocumentComments(documentId) {
        return this.request('GET', `/documents/${documentId}/comments`);
    }

    async createDocumentComment(documentId, content) {
        return this.request('POST', `/documents/${documentId}/comments`, { content });
    }

    async updateDocumentComment(documentId, commentId, content) {
        return this.request('PATCH', `/documents/${documentId}/comments/${commentId}`, { content });
    }

    async deleteDocumentComment(documentId, commentId) {
        return this.request('DELETE', `/documents/${documentId}/comments/${commentId}`);
    }

    // Document Labels
    async getDocumentLabels(documentId) {
        return this.request('GET', `/documents/${documentId}/labels`);
    }

    async addLabelToDocument(documentId, labelId) {
        return this.request('POST', `/documents/${documentId}/labels/${labelId}`);
    }

    async removeLabelFromDocument(documentId, labelId) {
        return this.request('DELETE', `/documents/${documentId}/labels/${labelId}`);
    }

    // Labels
    async createLabel(teamId, data) {
        return this.request('POST', `/labels?team_id=${teamId}`, data);
    }

    async getLabels(teamId) {
        return this.request('GET', `/labels?team_id=${teamId}`);
    }

    async getLabel(labelId) {
        return this.request('GET', `/labels/${labelId}`);
    }

    async updateLabel(labelId, data) {
        return this.request('PATCH', `/labels/${labelId}`, data);
    }

    async deleteLabel(labelId) {
        return this.request('DELETE', `/labels/${labelId}`);
    }

    // API Keys
    async createApiKey(name) {
        return this.request('POST', '/api-keys', { name });
    }

    async getApiKeys() {
        return this.request('GET', '/api-keys');
    }

    async revokeApiKey(keyId) {
        return this.request('DELETE', `/api-keys/${keyId}`);
    }

    // Agents
    async createTeamAgent(teamId, name, avatarUrl = null) {
        return this.request('POST', `/teams/${teamId}/agents`, { name, avatar_url: avatarUrl });
    }

    async createProjectAgent(projectId, name, avatarUrl = null) {
        return this.request('POST', `/projects/${projectId}/agents`, { name, avatar_url: avatarUrl });
    }

    async getTeamAgents(teamId) {
        return this.request('GET', `/teams/${teamId}/agents`);
    }

    async getAgent(agentId) {
        return this.request('GET', `/agents/${agentId}`);
    }

    async updateAgent(agentId, data) {
        return this.request('PATCH', `/agents/${agentId}`, data);
    }

    async deleteAgent(agentId) {
        return this.request('DELETE', `/agents/${agentId}`);
    }
}

// Create and export the singleton instance
export const api = new ApiClient();

// Also attach to window for backward compatibility with inline event handlers
window.api = api;
