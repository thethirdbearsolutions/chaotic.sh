import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ApiClient } from './api.js';

describe('ApiClient', () => {
  let client;
  let fetchMock;
  let localStorageMock;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    global.localStorage = localStorageMock;

    // Mock fetch
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    // Create new client instance
    client = new ApiClient();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Token Management', () => {
    describe('constructor', () => {
      it('loads token from localStorage on initialization', () => {
        localStorageMock.getItem.mockReturnValue('saved-token');
        const newClient = new ApiClient();
        expect(localStorageMock.getItem).toHaveBeenCalledWith('chaotic_token');
        expect(newClient.token).toBe('saved-token');
      });

      it('initializes with null token if localStorage is empty', () => {
        localStorageMock.getItem.mockReturnValue(null);
        const newClient = new ApiClient();
        expect(newClient.token).toBeNull();
      });
    });

    describe('setToken', () => {
      it('sets token in memory', () => {
        client.setToken('new-token');
        expect(client.token).toBe('new-token');
      });

      it('saves token to localStorage', () => {
        client.setToken('new-token');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('chaotic_token', 'new-token');
      });

      it('removes token from localStorage when set to null', () => {
        client.setToken(null);
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('chaotic_token');
      });

      it('removes token from localStorage when set to falsy value', () => {
        client.setToken('');
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('chaotic_token');
      });
    });

    describe('getToken', () => {
      it('returns the current token', () => {
        client.token = 'test-token';
        expect(client.getToken()).toBe('test-token');
      });

      it('returns null if no token is set', () => {
        client.token = null;
        expect(client.getToken()).toBeNull();
      });
    });
  });

  describe('Request Building', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    it('includes Content-Type header in all requests', async () => {
      await client.request('GET', '/test');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('includes Authorization header when token is set', async () => {
      client.setToken('test-token');
      await client.request('GET', '/test');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );
    });

    it('does not include Authorization header when no token is set', async () => {
      client.token = null;
      await client.request('GET', '/test');
      const callArgs = fetchMock.mock.calls[0][1];
      expect(callArgs.headers.Authorization).toBeUndefined();
    });

    it('uses correct base URL', async () => {
      await client.request('GET', '/users');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/users',
        expect.any(Object)
      );
    });

    it('includes request body for POST requests', async () => {
      const data = { name: 'test', value: 123 };
      await client.request('POST', '/test', data);
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(data),
        })
      );
    });

    it('includes request body for PATCH requests', async () => {
      const data = { name: 'updated' };
      await client.request('PATCH', '/test', data);
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(data),
        })
      );
    });

    it('includes request body for PUT requests', async () => {
      const data = { name: 'replaced' };
      await client.request('PUT', '/test', data);
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(data),
        })
      );
    });

    it('does not include body for GET requests', async () => {
      await client.request('GET', '/test', { ignored: 'data' });
      const callArgs = fetchMock.mock.calls[0][1];
      expect(callArgs.body).toBeUndefined();
    });

    it('does not include body for DELETE requests', async () => {
      await client.request('DELETE', '/test', { ignored: 'data' });
      const callArgs = fetchMock.mock.calls[0][1];
      expect(callArgs.body).toBeUndefined();
    });
  });

  describe('Response Handling', () => {
    it('returns parsed JSON for successful requests', async () => {
      const responseData = { id: 1, name: 'Test' };
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => responseData,
      });

      const result = await client.request('GET', '/test');
      expect(result).toEqual(responseData);
    });

    it('returns null for 204 No Content responses', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 204,
        json: async () => ({}),
      });

      const result = await client.request('DELETE', '/test');
      expect(result).toBeNull();
    });

    it('throws error with detail message for error responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ detail: 'Bad request error' }),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Bad request error');
    });

    it('throws generic error when detail is not provided', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('An error occurred');
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(client.request('GET', '/test')).rejects.toThrow('Network error');
    });

    it('handles 401 Unauthorized responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ detail: 'Unauthorized' }),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Unauthorized');
    });

    it('handles 403 Forbidden responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ detail: 'Forbidden' }),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Forbidden');
    });

    it('handles 404 Not Found responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ detail: 'Not found' }),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Not found');
    });

    it('handles 500 Internal Server Error responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ detail: 'Internal server error' }),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Internal server error');
    });

    it('handles non-JSON error responses gracefully', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
        headers: new Map([['content-type', 'text/html']]),
        json: async () => { throw new SyntaxError('Unexpected token <'); },
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Request failed (400)');
    });

    it('handles non-JSON success responses with descriptive error', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Map([['content-type', 'text/html']]),
        json: async () => { throw new SyntaxError('Unexpected token <'); },
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('Invalid response from server (expected JSON, got text/html)');
    });

    it('handles error responses where detail is an array', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({ detail: [{ loc: ['body', 'note'], msg: 'field required' }] }),
      });

      await expect(client.request('GET', '/test')).rejects.toThrow('An error occurred');
    });

    it('extracts message from object detail (e.g. 409 limbo/arrears)', async () => {
      const detail = {
        message: 'Sprint is in limbo. Complete pending rituals to continue.',
        sprint_id: 's-1',
        pending_rituals: ['run-tests'],
      };
      fetchMock.mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({ detail }),
      });

      try {
        await client.request('POST', '/test', {});
        throw new Error('should have thrown');
      } catch (e) {
        expect(e.message).toBe('Sprint is in limbo. Complete pending rituals to continue.');
        expect(e.status).toBe(409);
        expect(e.detail).toEqual(detail);
      }
    });

    it('attaches status and detail to all API errors', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ detail: 'Forbidden' }),
      });

      try {
        await client.request('GET', '/test');
        throw new Error('should have thrown');
      } catch (e) {
        expect(e.message).toBe('Forbidden');
        expect(e.status).toBe(403);
        expect(e.detail).toBe('Forbidden');
      }
    });
  });

  describe('Auth Endpoints', () => {
    describe('signup', () => {
      it('sends POST request with user data', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => ({ id: 1 }),
        });

        await client.signup('John Doe', 'john@example.com', 'password123');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/auth/signup',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              name: 'John Doe',
              email: 'john@example.com',
              password: 'password123',
            }),
          })
        );
      });
    });

    describe('login', () => {
      it('sends POST request with credentials', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => ({ access_token: 'token123' }),
        });

        await client.login('john@example.com', 'password123');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/auth/login',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              email: 'john@example.com',
              password: 'password123',
            }),
          })
        );
      });

      it('sets token after successful login', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => ({ access_token: 'token123' }),
        });

        await client.login('john@example.com', 'password123');
        expect(client.token).toBe('token123');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('chaotic_token', 'token123');
      });

      it('returns the login result', async () => {
        const loginResult = { access_token: 'token123', user: { id: 1 } };
        fetchMock.mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => loginResult,
        });

        const result = await client.login('john@example.com', 'password123');
        expect(result).toEqual(loginResult);
      });
    });

    describe('getMe', () => {
      it('sends GET request to /auth/me', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => ({ id: 1, name: 'John Doe' }),
        });

        await client.getMe();
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/auth/me',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('logout', () => {
      it('clears the token', () => {
        client.setToken('token123');
        client.logout();
        expect(client.token).toBeNull();
      });

      it('removes token from localStorage', () => {
        client.logout();
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('chaotic_token');
      });
    });
  });

  describe('Team Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getMyTeams', () => {
      it('sends GET request to /teams', async () => {
        await client.getMyTeams();
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getTeam', () => {
      it('sends GET request with team ID', async () => {
        await client.getTeam(123);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/123',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('createTeam', () => {
      it('sends POST request with team data', async () => {
        const teamData = { name: 'My Team', description: 'Test team' };
        await client.createTeam(teamData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(teamData),
          })
        );
      });
    });

    describe('updateTeam', () => {
      it('sends PATCH request with team data', async () => {
        const teamData = { name: 'Updated Team' };
        await client.updateTeam(123, teamData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/123',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(teamData),
          })
        );
      });
    });

    describe('deleteTeam', () => {
      it('sends DELETE request', async () => {
        await client.deleteTeam(123);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/123',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Issue Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getIssues', () => {
      it('sends GET request without params', async () => {
        await client.getIssues();
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues?',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });

      it('includes query parameters', async () => {
        await client.getIssues({ project_id: 1, status: 'open' });
        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringContaining('project_id=1'),
          expect.any(Object)
        );
        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringContaining('status=open'),
          expect.any(Object)
        );
      });

      it('skips null and undefined parameters', async () => {
        await client.getIssues({ project_id: 1, status: null, priority: undefined });
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('project_id=1');
        expect(url).not.toContain('status');
        expect(url).not.toContain('priority');
      });

      it('skips empty string parameters', async () => {
        await client.getIssues({ project_id: 1, status: '' });
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('project_id=1');
        expect(url).not.toContain('status');
      });

      it('handles array parameters', async () => {
        await client.getIssues({ status: ['open', 'in_progress'] });
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('status=open');
        expect(url).toContain('status=in_progress');
      });
    });

    describe('getIssue', () => {
      it('sends GET request with issue ID', async () => {
        await client.getIssue(456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getIssueByIdentifier', () => {
      it('sends GET request with issue identifier', async () => {
        await client.getIssueByIdentifier('CHT-123');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/identifier/CHT-123',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('createIssue', () => {
      it('sends POST request with issue data and project_id query param', async () => {
        const issueData = { title: 'New Issue', description: 'Test' };
        await client.createIssue(789, issueData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues?project_id=789',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(issueData),
          })
        );
      });
    });

    describe('updateIssue', () => {
      it('sends PATCH request with issue data', async () => {
        const issueData = { title: 'Updated Issue' };
        await client.updateIssue(456, issueData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(issueData),
          })
        );
      });
    });

    describe('deleteIssue', () => {
      it('sends DELETE request', async () => {
        await client.deleteIssue(456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });

    describe('searchIssues', () => {
      it('sends GET request with search query', async () => {
        await client.searchIssues(1, 'test query');
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('/api/issues/search');
        expect(url).toContain('team_id=1');
        expect(url).toContain('q=test%20query');
      });

      it('includes optional projectId parameter', async () => {
        await client.searchIssues(1, 'test', 5);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('project_id=5');
      });

      it('includes pagination parameters', async () => {
        await client.searchIssues(1, 'test', null, 10, 25);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('skip=10');
        expect(url).toContain('limit=25');
      });
    });

    describe('getTeamIssues', () => {
      it('sends GET request with team_id', async () => {
        await client.getTeamIssues(1);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('team_id=1');
      });

      it('includes additional parameters', async () => {
        await client.getTeamIssues(1, { status: 'open', priority: 'high' });
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('team_id=1');
        expect(url).toContain('status=open');
        expect(url).toContain('priority=high');
      });

      it('supports search combined with filters (CHT-406)', async () => {
        // This is the proper fix for CHT-406 - server-side search + filters
        await client.getTeamIssues(1, {
          search: 'bug',
          status: ['in_progress', 'todo'],
          priority: 'high',
          assignee_id: 'user-123'
        });
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('team_id=1');
        expect(url).toContain('search=bug');
        expect(url).toContain('status=in_progress');
        expect(url).toContain('status=todo');
        expect(url).toContain('priority=high');
        expect(url).toContain('assignee_id=user-123');
      });
    });
  });

  describe('Comment Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createComment', () => {
      it('sends POST request with comment content', async () => {
        await client.createComment(456, 'This is a comment');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/comments',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ content: 'This is a comment' }),
          })
        );
      });
    });

    describe('getComments', () => {
      it('sends GET request for issue comments', async () => {
        await client.getComments(456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/comments',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateComment', () => {
      it('sends PATCH request with updated content', async () => {
        await client.updateComment(456, 789, 'Updated comment');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/comments/789',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify({ content: 'Updated comment' }),
          })
        );
      });
    });

    describe('deleteComment', () => {
      it('sends DELETE request', async () => {
        await client.deleteComment(456, 789);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/comments/789',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Activity Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getActivities', () => {
      it('sends GET request with pagination', async () => {
        await client.getActivities(456, 10, 25);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toBe('/api/issues/456/activities?skip=10&limit=25');
      });

      it('uses default pagination values', async () => {
        await client.getActivities(456);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toBe('/api/issues/456/activities?skip=0&limit=50');
      });
    });

    describe('getTeamActivities', () => {
      it('sends GET request with team_id and pagination', async () => {
        await client.getTeamActivities(1, 5, 10);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toBe('/api/issues/activities?team_id=1&skip=5&limit=10');
      });

      it('uses default pagination values', async () => {
        await client.getTeamActivities(1);
        const url = fetchMock.mock.calls[0][0];
        expect(url).toBe('/api/issues/activities?team_id=1&skip=0&limit=20');
      });
    });
  });

  describe('Project Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createProject', () => {
      it('sends POST request with project data and team_id query param', async () => {
        const projectData = { name: 'New Project' };
        await client.createProject(1, projectData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/projects?team_id=1',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(projectData),
          })
        );
      });
    });

    describe('getProjects', () => {
      it('sends GET request with team_id query param', async () => {
        await client.getProjects(1);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/projects?team_id=1',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getProject', () => {
      it('sends GET request with project ID', async () => {
        await client.getProject(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/projects/5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateProject', () => {
      it('sends PATCH request with project data', async () => {
        const projectData = { name: 'Updated Project' };
        await client.updateProject(5, projectData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/projects/5',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(projectData),
          })
        );
      });
    });

    describe('deleteProject', () => {
      it('sends DELETE request', async () => {
        await client.deleteProject(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/projects/5',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Sprint Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getSprints', () => {
      it('sends GET request with project_id', async () => {
        await client.getSprints(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/sprints?project_id=5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });

      it('includes status filter when provided', async () => {
        await client.getSprints(5, 'active');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/sprints?project_id=5&sprint_status=active',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getSprint', () => {
      it('sends GET request for sprint by ID', async () => {
        await client.getSprint(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/sprints/10',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateSprint', () => {
      it('sends PATCH request with sprint data', async () => {
        const sprintData = { name: 'Updated Sprint' };
        await client.updateSprint(10, sprintData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/sprints/10',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(sprintData),
          })
        );
      });
    });

    describe('closeSprint', () => {
      it('sends POST request to close endpoint', async () => {
        await client.closeSprint(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/sprints/10/close',
          expect.objectContaining({
            method: 'POST',
          })
        );
      });
    });

    describe('getCurrentSprint', () => {
      it('sends GET request with project_id query param', async () => {
        await client.getCurrentSprint(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/sprints/current?project_id=5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });
  });

  describe('Ritual Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createRitual', () => {
      it('sends POST request with project_id query param', async () => {
        const ritualData = { name: 'Daily Standup', type: 'attestation' };
        await client.createRitual(5, ritualData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals?project_id=5',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(ritualData),
          })
        );
      });
    });

    describe('getRituals', () => {
      it('sends GET request with project_id', async () => {
        await client.getRituals(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals?project_id=5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getRitual', () => {
      it('sends GET request for ritual by ID', async () => {
        await client.getRitual(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateRitual', () => {
      it('sends PATCH request with ritual data', async () => {
        const ritualData = { name: 'Updated Ritual' };
        await client.updateRitual(10, ritualData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(ritualData),
          })
        );
      });
    });

    describe('deleteRitual', () => {
      it('sends DELETE request', async () => {
        await client.deleteRitual(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });

    describe('getLimboStatus', () => {
      it('sends GET request with project_id', async () => {
        await client.getLimboStatus(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/limbo?project_id=5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('attestRitual', () => {
      it('sends POST request without note', async () => {
        await client.attestRitual(10, 5, null);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/attest?project_id=5',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({}),
          })
        );
      });

      it('sends POST request with note', async () => {
        await client.attestRitual(10, 5, 'Test note');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/attest?project_id=5',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ note: 'Test note' }),
          })
        );
      });
    });

    describe('approveAttestation', () => {
      it('sends POST request with empty body', async () => {
        await client.approveAttestation(10, 5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/approve?project_id=5',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({}),
          })
        );
      });
    });

    describe('completeGateRitual', () => {
      it('sends POST request without note', async () => {
        await client.completeGateRitual(10, 5, null);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/complete?project_id=5',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({}),
          })
        );
      });

      it('sends POST request with note', async () => {
        await client.completeGateRitual(10, 5, 'Completion note');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/complete?project_id=5',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ note: 'Completion note' }),
          })
        );
      });
    });

    describe('getTicketRitualsStatus', () => {
      it('sends GET request for ticket ritual status', async () => {
        await client.getTicketRitualsStatus(456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/issue/456/pending',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('attestTicketRitual', () => {
      it('sends POST request without note', async () => {
        await client.attestTicketRitual(10, 456, null);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/attest-issue/456',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({}),
          })
        );
      });

      it('sends POST request with note', async () => {
        await client.attestTicketRitual(10, 456, 'Ticket ritual note');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/attest-issue/456',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ note: 'Ticket ritual note' }),
          })
        );
      });
    });

    describe('completeTicketGateRitual', () => {
      it('sends POST request without note', async () => {
        await client.completeTicketGateRitual(10, 456, null);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/complete-issue/456',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({}),
          })
        );
      });

      it('sends POST request with note', async () => {
        await client.completeTicketGateRitual(10, 456, 'Gate completion note');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/complete-issue/456',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ note: 'Gate completion note' }),
          })
        );
      });
    });

    describe('approveTicketRitual', () => {
      it('sends POST request with empty body', async () => {
        await client.approveTicketRitual(10, 456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/rituals/10/approve-issue/456',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({}),
          })
        );
      });
    });
  });

  describe('API Key Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createApiKey', () => {
      it('sends POST request with key name', async () => {
        await client.createApiKey('My API Key');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/api-keys',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: 'My API Key' }),
          })
        );
      });
    });

    describe('getApiKeys', () => {
      it('sends GET request', async () => {
        await client.getApiKeys();
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/api-keys',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('revokeApiKey', () => {
      it('sends DELETE request', async () => {
        await client.revokeApiKey(123);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/api-keys/123',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Agent Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createTeamAgent', () => {
      it('sends POST request without avatar_url', async () => {
        await client.createTeamAgent(1, 'Agent Name', null);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/agents',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: 'Agent Name', avatar_url: null }),
          })
        );
      });

      it('sends POST request with avatar_url', async () => {
        await client.createTeamAgent(1, 'Agent Name', 'https://example.com/avatar.png');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/agents',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              name: 'Agent Name',
              avatar_url: 'https://example.com/avatar.png',
            }),
          })
        );
      });
    });

    describe('createProjectAgent', () => {
      it('sends POST request with project ID', async () => {
        await client.createProjectAgent(5, 'Project Agent');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/projects/5/agents',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: 'Project Agent', avatar_url: null }),
          })
        );
      });
    });

    describe('getTeamAgents', () => {
      it('sends GET request with team ID', async () => {
        await client.getTeamAgents(1);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/agents',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getAgent', () => {
      it('sends GET request with agent ID', async () => {
        await client.getAgent(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/agents/10',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateAgent', () => {
      it('sends PATCH request with agent data', async () => {
        const agentData = { name: 'Updated Agent' };
        await client.updateAgent(10, agentData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/agents/10',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(agentData),
          })
        );
      });
    });

    describe('deleteAgent', () => {
      it('sends DELETE request', async () => {
        await client.deleteAgent(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/agents/10',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Team Member Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getTeamMembers', () => {
      it('sends GET request for team members', async () => {
        await client.getTeamMembers(1);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/members',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateMemberRole', () => {
      it('sends PATCH request with role query parameter', async () => {
        await client.updateMemberRole(1, 5, 'admin');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/members/5?role=admin',
          expect.objectContaining({
            method: 'PATCH',
          })
        );
      });
    });

    describe('removeMember', () => {
      it('sends DELETE request to remove member', async () => {
        await client.removeMember(1, 5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/members/5',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Team Invitation Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createInvitation', () => {
      it('sends POST request with email and default role', async () => {
        await client.createInvitation(1, 'user@example.com');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/invitations',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ email: 'user@example.com', role: 'member' }),
          })
        );
      });

      it('sends POST request with email and custom role', async () => {
        await client.createInvitation(1, 'admin@example.com', 'admin');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/invitations',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ email: 'admin@example.com', role: 'admin' }),
          })
        );
      });
    });

    describe('getTeamInvitations', () => {
      it('sends GET request for team invitations', async () => {
        await client.getTeamInvitations(1);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/invitations',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('acceptInvitation', () => {
      it('sends POST request with invitation token', async () => {
        await client.acceptInvitation('abc123token');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/invitations/abc123token/accept',
          expect.objectContaining({
            method: 'POST',
          })
        );
      });
    });

    describe('deleteInvitation', () => {
      it('sends DELETE request to remove invitation', async () => {
        await client.deleteInvitation(1, 10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/teams/1/invitations/10',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('User Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getUser', () => {
      it('sends GET request for user by ID', async () => {
        await client.getUser(5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/users/5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateMe', () => {
      it('sends PATCH request to update current user', async () => {
        const userData = { name: 'New Name', avatar_url: 'https://example.com/avatar.png' };
        await client.updateMe(userData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/users/me',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(userData),
          })
        );
      });
    });
  });

  describe('localStorage Failure Handling', () => {
    describe('constructor with localStorage errors', () => {
      it('handles localStorage.getItem throwing (private browsing mode)', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const brokenLocalStorage = {
          getItem: vi.fn(() => {
            throw new Error('QuotaExceededError');
          }),
          setItem: vi.fn(),
          removeItem: vi.fn(),
        };
        global.localStorage = brokenLocalStorage;

        // Should not throw, should handle gracefully
        const newClient = new ApiClient();
        expect(newClient.token).toBeNull();
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'Failed to access localStorage:',
          expect.any(Error)
        );
        consoleWarnSpy.mockRestore();
      });

      it('handles localStorage being null', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        global.localStorage = null;

        // Should not throw, should handle gracefully
        const newClient = new ApiClient();
        expect(newClient.token).toBeNull();
        expect(consoleWarnSpy).toHaveBeenCalled();
        consoleWarnSpy.mockRestore();
      });

      it('handles localStorage being undefined', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        global.localStorage = undefined;

        // Should not throw, should handle gracefully
        const newClient = new ApiClient();
        expect(newClient.token).toBeNull();
        expect(consoleWarnSpy).toHaveBeenCalled();
        consoleWarnSpy.mockRestore();
      });
    });

    describe('setToken with localStorage errors', () => {
      it('handles localStorage.setItem throwing (quota exceeded)', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        localStorageMock.setItem.mockImplementation(() => {
          throw new Error('QuotaExceededError');
        });

        // Should not throw, should handle gracefully and set token in memory
        client.setToken('test-token');
        expect(client.token).toBe('test-token');
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'Failed to persist token to localStorage:',
          expect.any(Error)
        );
        consoleWarnSpy.mockRestore();
      });

      it('handles localStorage.removeItem throwing', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        localStorageMock.removeItem.mockImplementation(() => {
          throw new Error('StorageError');
        });

        // Should not throw, should handle gracefully and clear token in memory
        client.setToken(null);
        expect(client.token).toBeNull();
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'Failed to persist token to localStorage:',
          expect.any(Error)
        );
        consoleWarnSpy.mockRestore();
      });

      it('still makes authenticated requests when localStorage fails', async () => {
        fetchMock.mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => ({ data: 'test' }),
        });

        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        localStorageMock.setItem.mockImplementation(() => {
          throw new Error('QuotaExceededError');
        });

        // Set token even though localStorage fails
        client.setToken('memory-only-token');

        // Token should still work for this session
        await client.request('GET', '/test');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/test',
          expect.objectContaining({
            headers: expect.objectContaining({
              'Authorization': 'Bearer memory-only-token',
            }),
          })
        );
        consoleWarnSpy.mockRestore();
      });
    });
  });

  describe('Token Validation', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    it('handles empty string token', async () => {
      client.setToken('');
      await client.request('GET', '/test');
      const callArgs = fetchMock.mock.calls[0][1];
      expect(callArgs.headers.Authorization).toBeUndefined();
    });

    it('handles token with special characters that could break Authorization header', async () => {
      client.setToken('token-with-\n-newline');
      await client.request('GET', '/test');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer token-with-\n-newline',
          }),
        })
      );
    });

    it('handles extremely long token (potential DoS)', async () => {
      const longToken = 'x'.repeat(10000);
      client.setToken(longToken);
      expect(client.token).toBe(longToken);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('chaotic_token', longToken);
    });

    it('handles token with special characters (quotes, backslashes)', async () => {
      const specialToken = 'token"with\'quotes\\and\\backslashes';
      client.setToken(specialToken);
      await client.request('GET', '/test');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${specialToken}`,
          }),
        })
      );
    });

    it('handles null bytes in token', async () => {
      const tokenWithNull = 'token\x00with\x00nulls';
      client.setToken(tokenWithNull);
      await client.request('GET', '/test');
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${tokenWithNull}`,
          }),
        })
      );
    });
  });

  describe('Security - Input Sanitization', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    it('handles XSS payload in comment content', async () => {
      const xssPayload = '<script>alert("xss")</script>';
      await client.createComment(456, xssPayload);
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/issues/456/comments',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ content: xssPayload }),
        })
      );
    });

    it('handles special characters in issue title', async () => {
      const specialTitle = '<script>alert("xss")</script> & "quotes" \' apostrophes';
      await client.createIssue(789, { title: specialTitle });
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/issues?project_id=789',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ title: specialTitle }),
        })
      );
    });

    it('handles SQL injection pattern in search query', async () => {
      const sqlInjection = "'; DROP TABLE issues; --";
      await client.searchIssues(1, sqlInjection);
      const url = fetchMock.mock.calls[0][0];
      expect(url).toContain(encodeURIComponent(sqlInjection));
    });

    it('handles path traversal attempt in identifier', async () => {
      const pathTraversal = '../../admin';
      await client.getIssueByIdentifier(pathTraversal);
      expect(fetchMock).toHaveBeenCalledWith(
        `/api/issues/identifier/${pathTraversal}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('handles unicode and emoji in issue description', async () => {
      const unicodeContent = 'Test with emoji 🚀 and unicode: \u00A9 \u2603';
      await client.createIssue(789, { description: unicodeContent });
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/issues?project_id=789',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ description: unicodeContent }),
        })
      );
    });

    it('handles null bytes in comment', async () => {
      const nullByteContent = 'Content\x00with\x00null\x00bytes';
      await client.createComment(456, nullByteContent);
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/issues/456/comments',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ content: nullByteContent }),
        })
      );
    });

    it('handles control characters in team name', async () => {
      const controlChars = 'Team\r\n\t\bName';
      await client.createTeam({ name: controlChars });
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/teams',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: controlChars }),
        })
      );
    });
  });

  describe('Issue Relation Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('getRelations', () => {
      it('sends GET request for issue relations', async () => {
        await client.getRelations(456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/relations',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('createRelation', () => {
      it('sends POST request with default relation type', async () => {
        await client.createRelation(456, 789);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/relations',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              related_issue_id: 789,
              relation_type: 'blocks',
            }),
          })
        );
      });

      it('sends POST request with custom relation type', async () => {
        await client.createRelation(456, 789, 'relates_to');
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/relations',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              related_issue_id: 789,
              relation_type: 'relates_to',
            }),
          })
        );
      });
    });

    describe('deleteRelation', () => {
      it('sends DELETE request to remove relation', async () => {
        await client.deleteRelation(456, 100);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/relations/100',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });

    describe('getSubIssues', () => {
      it('sends GET request for sub-issues', async () => {
        await client.getSubIssues(456);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/issues/456/sub-issues',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });
  });

  describe('Document Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createDocument', () => {
      it('sends POST request with team_id query param', async () => {
        const docData = { title: 'New Doc', content: 'Content' };
        await client.createDocument(1, docData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/documents?team_id=1',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(docData),
          })
        );
      });
    });

    describe('getDocuments', () => {
      it('sends GET request with team_id', async () => {
        await client.getDocuments(1);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/documents?team_id=1',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });

      it('includes projectId when provided', async () => {
        await client.getDocuments(1, 5);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/documents?team_id=1&project_id=5',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });

      it('includes search parameter when provided', async () => {
        await client.getDocuments(1, null, 'test query');
        const url = fetchMock.mock.calls[0][0];
        expect(url).toContain('team_id=1');
        expect(url).toContain('search=test%20query');
      });
    });

    describe('getDocument', () => {
      it('sends GET request for document by ID', async () => {
        await client.getDocument(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/documents/10',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateDocument', () => {
      it('sends PATCH request with document data', async () => {
        const docData = { title: 'Updated Doc' };
        await client.updateDocument(10, docData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/documents/10',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(docData),
          })
        );
      });
    });

    describe('deleteDocument', () => {
      it('sends DELETE request', async () => {
        await client.deleteDocument(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/documents/10',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });

  describe('Label Endpoints', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'test' }),
      });
    });

    describe('createLabel', () => {
      it('sends POST request with team_id query param', async () => {
        const labelData = { name: 'bug', color: 'red' };
        await client.createLabel(1, labelData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/labels?team_id=1',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(labelData),
          })
        );
      });
    });

    describe('getLabels', () => {
      it('sends GET request with team_id', async () => {
        await client.getLabels(1);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/labels?team_id=1',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('getLabel', () => {
      it('sends GET request for label by ID', async () => {
        await client.getLabel(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/labels/10',
          expect.objectContaining({
            method: 'GET',
          })
        );
      });
    });

    describe('updateLabel', () => {
      it('sends PATCH request with label data', async () => {
        const labelData = { name: 'critical', color: 'darkred' };
        await client.updateLabel(10, labelData);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/labels/10',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(labelData),
          })
        );
      });
    });

    describe('deleteLabel', () => {
      it('sends DELETE request', async () => {
        await client.deleteLabel(10);
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/labels/10',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });
  });
});
