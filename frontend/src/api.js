/**
 * API client for Chaotic backend
 */

import { getToken, setToken as persistToken } from './storage.js';
import { clearSnapshot } from './boot-cache.js';

const API_BASE = '/api';

export class ApiClient {
    constructor() {
        this.token = getToken();
    }

    setToken(token) {
        this.token = token;
        persistToken(token);
    }

    getToken() {
        return this.token;
    }

    async request(method, path, data = null) {
        const headers = {
            'Content-Type': 'application/json',
            // The web app is always a human interacting in real time, so it is
            // always "interactive" for the CHT-1302 ritual/estimate exemption
            // (browsers have no TTY; the CLI derives this from isatty instead).
            // Without this, every web user would be gated like an agent.
            'X-Chaotic-Interactive': '1',
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

        let response;
        try {
            response = await fetch(`${API_BASE}${path}`, options);
        } catch (networkError) {
            // CHT-1224: fetch() itself throwing (offline, DNS failure, CORS,
            // timeout) previously propagated as the browser's raw, generic
            // TypeError with no .status — showApiError then displayed it
            // verbatim as if it were an app-level error, and app.js's
            // bootstrap couldn't distinguish it from a real 401 (see
            // logout-on-any-getMe()-failure fix in app.js). Normalize to a
            // friendly message with no .status, so callers can tell "network
            // down" apart from "server said no" (which always has .status).
            const error = new Error('Network error - check your connection');
            error.isNetworkError = true;
            error.cause = networkError;
            throw error;
        }

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
            let detail;
            if (typeof result.detail === 'string') {
                detail = result.detail;
            } else if (result.detail && typeof result.detail === 'object' && result.detail.message) {
                detail = result.detail.message;
            } else {
                detail = 'An error occurred';
            }
            const error = new Error(detail);
            error.status = response.status;
            error.detail = result.detail;
            throw error;
        }

        return result;
    }

    // Auth
    async signup(name, email, password) {
        return this.request('POST', '/auth/signup', { name, email, password });
    }

    async login(email, password) {
        // client: 'web' marks this as the web app's own login, which OAuth
        // consent requires; the CLI never sends it (CHT-1519).
        const result = await this.request('POST', '/auth/login', { email, password, client: 'web' });
        this.setToken(result.access_token);
        return result;
    }

    async getMe() {
        return this.request('GET', '/auth/me');
    }

    // Email verification by mailed code (CHT-1790). With SMTP configured,
    // accepting an invitation requires a verified address.
    async requestEmailVerification() {
        return this.request('POST', '/auth/email-verification');
    }

    async confirmEmailVerification(code) {
        return this.request('POST', '/auth/email-verification/confirm', { code });
    }

    // OAuth consent (CHT-1519)
    async getOAuthRequest(requestId) {
        return this.request('GET', `/oauth/requests/${encodeURIComponent(requestId)}`);
    }

    async approveOAuthRequest(requestId, choice) {
        return this.request('POST', `/oauth/requests/${encodeURIComponent(requestId)}/approve`, choice);
    }

    async denyOAuthRequest(requestId) {
        return this.request('POST', `/oauth/requests/${encodeURIComponent(requestId)}/deny`, {});
    }

    logout() {
        this.setToken(null);
        // What the boot cache holds is this user's data (CHT-1972).
        clearSnapshot();
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
        // CHT-1223: role is sent in the body -- the server no longer
        // accepts it as a query param.
        return this.request('PATCH', `/teams/${teamId}/members/${userId}`, { role });
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

    // Public preview for the /invite/<token> page (CHT-1265): works signed out.
    async getInvitation(token) {
        return this.request('GET', `/teams/invitations/${encodeURIComponent(token)}`);
    }

    // code (CHT-1828): one a team admin issued for this invitation, for
    // an account whose verification email never arrives.
    async acceptInvitation(token, code) {
        const path = `/teams/invitations/${encodeURIComponent(token)}/accept`;
        if (code === undefined) return this.request('POST', path);
        return this.request('POST', path, { code });
    }

    async deleteInvitation(teamId, invitationId) {
        return this.request('DELETE', `/teams/${teamId}/invitations/${invitationId}`);
    }

    // CHT-1828: a verification code for the invited address's account,
    // for an admin to hand over when the server's mail is failing.
    async issueInvitationVerificationCode(teamId, invitationId) {
        return this.request(
            'POST',
            `/teams/${teamId}/invitations/${encodeURIComponent(invitationId)}/verification-code`,
        );
    }

    // Projects
    async createProject(teamId, data) {
        // CHT-1223: team_id moved from a query param to the URL path.
        return this.request('POST', `/teams/${teamId}/projects`, data);
    }

    async getProjects(teamId) {
        return this.request('GET', `/teams/${teamId}/projects`);
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
        // CHT-1223: project_id moved from a query param to the URL path.
        return this.request('POST', `/projects/${projectId}/issues`, data);
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

    /**
     * Run an issue query (CHT-1718, used by the /query page, CHT-1810).
     * Exactly one of projectId/teamId picks the scope. `where` is the text
     * form, `filter` the structure (an object, sent as JSON); the server
     * ANDs them. Returns {query, where, order, total, skip, limit, issues}.
     */
    async queryIssues({ projectId = null, teamId = null, where = null, filter = null, order = null, skip = 0, limit = 100 } = {}) {
        let path;
        if (projectId) {
            path = `/projects/${encodeURIComponent(projectId)}/issues/query`;
        } else if (teamId) {
            path = `/teams/${encodeURIComponent(teamId)}/issues/query`;
        } else {
            throw new Error('queryIssues needs a projectId or a teamId');
        }
        const params = new URLSearchParams();
        if (where !== null && where !== undefined && where !== '') params.set('where', where);
        if (filter) params.set('filter', typeof filter === 'string' ? filter : JSON.stringify(filter));
        if (order) params.set('order', order);
        params.set('skip', String(skip));
        params.set('limit', String(limit));
        return this.request('GET', `${path}?${params.toString()}`);
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

    async getIssueDescriptionRevisions(issueId) {
        return this.request('GET', `/issues/${issueId}/description-revisions`);
    }

    async getIssueDescriptionRevision(issueId, version) {
        return this.request('GET', `/issues/${issueId}/description-revisions/${version}`);
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

    async getTeamActivities(teamId, skip = 0, limit = 20, { projectId } = {}) {
        let url = `/issues/activities?team_id=${teamId}&skip=${skip}&limit=${limit}`;
        if (projectId) url += `&project_id=${projectId}`;
        return this.request('GET', url);
    }

    // Epics view (CHT-1902): every epic with its progress, in one read.
    async getProjectEpicProgress(projectId) {
        return this.request('GET', `/projects/${projectId}/epics`);
    }

    async getTeamEpicProgress(teamId) {
        return this.request('GET', `/teams/${teamId}/epics`);
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
        // CHT-1223: project_id moved from a query param to the URL path.
        let url = `/projects/${projectId}/sprints`;
        if (status) url += `?sprint_status=${status}`;
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
        // CHT-1223: project_id moved from a query param to the URL path.
        return this.request('POST', `/projects/${projectId}/rituals`, data);
    }

    async getRituals(projectId) {
        return this.request('GET', `/projects/${projectId}/rituals`);
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

    // `artifact` is the document id or URL a ritual with `artifact` set
    // binds its attestation to: `{ document_id }` or `{ url }` (CHT-1359).
    attestationBody(note, artifact) {
        const data = {};
        if (note) data.note = note;
        if (artifact && artifact.document_id) data.document_id = artifact.document_id;
        if (artifact && artifact.url) data.url = artifact.url;
        return data;
    }

    async attestRitual(ritualId, projectId, note = null, artifact = null) {
        return this.request(
            'POST', `/rituals/${ritualId}/attest?project_id=${projectId}`, this.attestationBody(note, artifact),
        );
    }

    async approveAttestation(ritualId, projectId) {
        return this.request('POST', `/rituals/${ritualId}/approve?project_id=${projectId}`, {});
    }

    async completeGateRitual(ritualId, projectId, note = null, artifact = null) {
        return this.request(
            'POST', `/rituals/${ritualId}/complete?project_id=${projectId}`, this.attestationBody(note, artifact),
        );
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

    async attestTicketRitual(ritualId, issueId, note = null, artifact = null) {
        return this.request(
            'POST', `/rituals/${ritualId}/attest-issue/${issueId}`, this.attestationBody(note, artifact),
        );
    }

    async completeTicketGateRitual(ritualId, issueId, note = null, artifact = null) {
        return this.request(
            'POST', `/rituals/${ritualId}/complete-issue/${issueId}`, this.attestationBody(note, artifact),
        );
    }

    async approveTicketRitual(ritualId, issueId) {
        return this.request('POST', `/rituals/${ritualId}/approve-issue/${issueId}`, {});
    }

    // CHT-1606: send a ticket's GATE request or REVIEW attestation back.
    // The reason is required; the gate stays pending.
    async rejectTicketRitual(ritualId, issueId, note) {
        return this.request('POST', `/rituals/${ritualId}/reject-issue/${issueId}`, { note });
    }

    // Documents
    async createDocument(teamId, data) {
        // CHT-1223: team_id moved from a query param to the URL path.
        return this.request('POST', `/teams/${teamId}/documents`, data);
    }

    async getDocuments(teamId, projectId = null, search = null, sprintId = null) {
        let url = `/teams/${teamId}/documents`;
        const params = [];
        if (projectId) params.push(`project_id=${projectId}`);
        if (sprintId) params.push(`sprint_id=${sprintId}`);
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (params.length) url += `?${params.join('&')}`;
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

    async getDocumentRevisions(documentId) {
        return this.request('GET', `/documents/${documentId}/revisions`);
    }

    async getDocumentRevision(documentId, version) {
        return this.request('GET', `/documents/${documentId}/revisions/${version}`);
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
        // CHT-1223: team_id moved from a query param to the URL path.
        return this.request('POST', `/teams/${teamId}/labels`, data);
    }

    async getLabels(teamId) {
        return this.request('GET', `/teams/${teamId}/labels`);
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

    // Connected apps: your own OAuth connections (CHT-1523)
    async getConnections() {
        return this.request('GET', '/oauth/connections');
    }

    async revokeConnection(connectionId) {
        return this.request('DELETE', `/oauth/connections/${encodeURIComponent(connectionId)}`);
    }

    // Push devices (CHT-1604)
    async getPushDevices() {
        return this.request('GET', '/push/devices');
    }

    async deletePushDevice(installationId) {
        return this.request('DELETE', `/push/devices/${encodeURIComponent(installationId)}`);
    }

    // Agents
    // canRegister: make it a registrar (CHT-1600). Sent only when true,
    // so the body stays what an older server accepts.
    async createTeamAgent(teamId, name, avatarUrl = null, canRegister = false) {
        const body = { name, avatar_url: avatarUrl };
        if (canRegister) body.can_register = true;
        return this.request('POST', `/teams/${teamId}/agents`, body);
    }

    async createProjectAgent(projectId, name, avatarUrl = null, canRegister = false) {
        const body = { name, avatar_url: avatarUrl };
        if (canRegister) body.can_register = true;
        return this.request('POST', `/projects/${projectId}/agents`, body);
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

    async createAgentKey(agentId) {
        return this.request('POST', `/agents/${agentId}/keys`);
    }

    // Inbox (CHT-1250)
    async getInbox(teamId, { unread = false, skip = 0, limit = 50 } = {}) {
        const params = new URLSearchParams({ team_id: teamId, skip, limit });
        if (unread) params.set('unread', 'true');
        return this.request('GET', `/inbox?${params.toString()}`);
    }

    async getInboxUnreadCount(teamId) {
        return this.request('GET', `/inbox/unread-count?team_id=${teamId}`);
    }

    async markInboxRead(entryId) {
        return this.request('POST', `/inbox/${entryId}/read`, {});
    }

    async archiveInbox(entryId) {
        return this.request('POST', `/inbox/${entryId}/archive`, {});
    }

    async markAllInboxRead(teamId) {
        return this.request('POST', `/inbox/mark-all-read?team_id=${teamId}`, {});
    }
}

// Create and export the singleton instance
export const api = new ApiClient();

