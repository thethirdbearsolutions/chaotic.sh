"""API client for CLI."""
import httpx
from urllib.parse import quote, urlencode
from cli.config import get_api_url, get_token, get_api_key


class APIError(Exception):
    """API error with message."""
    pass


class Client:
    """API client."""

    def _headers(self) -> dict:
        """Get request headers.

        Reads config on each call to support profile switching.
        """
        headers = {"Content-Type": "application/json"}
        # Prefer API key over JWT token
        api_key = get_api_key()
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"
        else:
            token = get_token()
            if token:
                headers["Authorization"] = f"Bearer {token}"
        return headers

    def _request(self, method: str, path: str, data: dict = None) -> dict | None:
        """Make API request."""
        url = f"{get_api_url()}{path}"
        with httpx.Client() as client:
            send = getattr(client, method.lower())
            kwargs = {"headers": self._headers()}
            if data is not None:
                kwargs["json"] = data
            response = send(url, **kwargs)

            if response.status_code == 204:
                return None

            # Handle empty response bodies (some endpoints return 200 with no body)
            if not response.content or not response.content.strip():
                if response.is_success:
                    return None
                raise APIError(f"Server returned {response.status_code} with no body")

            try:
                result = response.json()
            except Exception:
                if response.is_success:
                    return None
                raise APIError(f"Server returned {response.status_code} with non-JSON body")

            if not response.is_success:
                detail = result.get("detail", "Unknown error")
                raise APIError(self._format_error(detail))

            return result

    def _format_error(self, detail) -> str:
        """Format an API error detail into a user-friendly message."""
        if not isinstance(detail, dict):
            return str(detail)

        if "pending_rituals" in detail and "issue_id" in detail:
            return self._format_ticket_ritual_error(detail)
        if "pending_rituals" in detail:
            return "Sprint is in limbo. Run `chaotic ritual pending` to see what to do next."
        if "arrears_by" in detail:
            return "Sprint is in arrears. Run `chaotic sprint close` to resolve, then complete rituals with `chaotic ritual pending`."
        return detail.get("message", str(detail))

    def _format_ticket_ritual_error(self, detail: dict) -> str:
        """Format a ticket ritual error with actionable hint."""
        issue_id = detail.get("issue_id", "")
        pending = detail.get("pending_rituals", [])

        if not pending:
            return "Ticket has pending rituals."

        # Only show the first pending ritual — subsequent ones are revealed
        # after the first is attested, to avoid overwhelming the user.
        r = pending[0]
        lines = []
        if isinstance(r, dict):
            name = r.get("name", "unknown")
            prompt = r.get("prompt", "")
            lines.append(f"Pending ritual: {name}")
            if prompt:
                lines.append(f"  {prompt}")
            lines.append(
                f"\nUsage: chaotic ritual attest {name} --ticket {issue_id} --note \"your note here\""
            )
        else:
            lines.append(f"Pending ritual: {r}")
            lines.append(
                f"\nUsage: chaotic ritual attest {r} --ticket {issue_id} --note \"your note here\""
            )

        if len(pending) > 1:
            lines.append(f"\n({len(pending) - 1} more ritual(s) pending after this one)")

        return "\n".join(lines)

    # Auth
    def signup(self, name: str, email: str, password: str) -> dict:
        return self._request("POST", "/auth/signup", {"name": name, "email": email, "password": password})

    def login(self, email: str, password: str) -> dict:
        return self._request("POST", "/auth/login", {"email": email, "password": password})

    def get_me(self) -> dict:
        return self._request("GET", "/auth/me")

    # API keys
    def list_api_keys(self) -> list:
        return self._request("GET", "/api-keys")

    def create_api_key(self, name: str) -> dict:
        return self._request("POST", "/api-keys", {"name": name})

    def revoke_api_key(self, api_key_id: str):
        return self._request("DELETE", f"/api-keys/{api_key_id}")

    # Teams
    def create_team(self, name: str, key: str, description: str = None) -> dict:
        data = {"name": name, "key": key}
        if description:
            data["description"] = description
        return self._request("POST", "/teams", data)

    def get_teams(self) -> list:
        return self._request("GET", "/teams")

    def get_team(self, team_id: str) -> dict:
        return self._request("GET", f"/teams/{team_id}")

    def update_team(self, team_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/teams/{team_id}", kwargs)

    def delete_team(self, team_id: str):
        return self._request("DELETE", f"/teams/{team_id}")

    # Team members
    def get_team_members(self, team_id: str) -> list:
        return self._request("GET", f"/teams/{team_id}/members")

    def remove_member(self, team_id: str, user_id: str):
        return self._request("DELETE", f"/teams/{team_id}/members/{user_id}")

    # Invitations
    def invite_member(self, team_id: str, email: str, role: str = "member") -> dict:
        return self._request("POST", f"/teams/{team_id}/invitations", {"email": email, "role": role})

    def get_invitations(self, team_id: str) -> list:
        return self._request("GET", f"/teams/{team_id}/invitations")

    def accept_invitation(self, token: str) -> dict:
        return self._request("POST", f"/teams/invitations/{token}/accept")

    def delete_invitation(self, team_id: str, invitation_id: str):
        return self._request("DELETE", f"/teams/{team_id}/invitations/{invitation_id}")

    # Projects
    def create_project(self, team_id: str, name: str, key: str, **kwargs) -> dict:
        data = {"name": name, "key": key, **kwargs}
        return self._request("POST", f"/projects?team_id={team_id}", data)

    def get_projects(self, team_id: str) -> list:
        return self._request("GET", f"/projects?team_id={team_id}")

    def get_project(self, project_id: str) -> dict:
        return self._request("GET", f"/projects/{project_id}")

    def update_project(self, project_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/projects/{project_id}", kwargs)

    def delete_project(self, project_id: str):
        return self._request("DELETE", f"/projects/{project_id}")

    # Issues
    def create_issue(self, project_id: str, title: str, **kwargs) -> dict:
        data = {"title": title, **kwargs}
        return self._request("POST", f"/issues?project_id={project_id}", data)

    def get_issues(self, project_id: str = None, sprint_id: str = None, assignee_id: str = None, status: str = None, priority: str = None, limit: int = None, parent_id: str = None, sort_by: str = None, order: str = None, label: str = None, search: str = None, issue_type: str = None, skip: int = None) -> list:
        params = {}
        if project_id:
            params["project_id"] = project_id
        if sprint_id:
            params["sprint_id"] = sprint_id
        if assignee_id:
            params["assignee_id"] = assignee_id
        if limit:
            params["limit"] = limit
        if parent_id:
            params["parent_id"] = parent_id
        if sort_by:
            params["sort_by"] = sort_by
        if order:
            params["order"] = order
        if search:
            params["search"] = search
        if issue_type:
            params["issue_type"] = issue_type
        if skip:
            params["skip"] = skip

        # Build base query with urlencode for single params
        query = urlencode(params) if params else ""

        # Handle comma-separated status values (CHT-502)
        if status:
            status_values = [s.strip() for s in status.split(",")]
            status_params = "&".join([f"status={quote(s)}" for s in status_values])
            query = f"{query}&{status_params}" if query else status_params

        # Handle comma-separated priority values
        if priority:
            priority_values = [p.strip() for p in priority.split(",")]
            priority_params = "&".join([f"priority={quote(p)}" for p in priority_values])
            query = f"{query}&{priority_params}" if query else priority_params

        # Handle comma-separated label values (CHT-696)
        if label:
            label_values = [l.strip() for l in label.split(",")]
            label_params = "&".join([f"label={quote(l)}" for l in label_values])
            query = f"{query}&{label_params}" if query else label_params

        return self._request("GET", f"/issues?{query}")

    def get_issue(self, issue_id: str) -> dict:
        return self._request("GET", f"/issues/{issue_id}")

    def get_issue_by_identifier(self, identifier: str) -> dict:
        return self._request("GET", f"/issues/identifier/{identifier}")

    def search_issues(self, team_id: str, query: str, project_id: str = None, limit: int = None) -> list:
        url = f"/issues/search?team_id={team_id}&q={quote(query)}"
        if project_id:
            url += f"&project_id={project_id}"
        if limit:
            url += f"&limit={limit}"
        return self._request("GET", url)

    def update_issue(self, issue_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/issues/{issue_id}", kwargs)

    def delete_issue(self, issue_id: str):
        return self._request("DELETE", f"/issues/{issue_id}")

    # Sub-issues
    def get_sub_issues(self, issue_id: str) -> list:
        return self._request("GET", f"/issues/{issue_id}/sub-issues")

    # Relations
    def get_relations(self, issue_id: str) -> list:
        return self._request("GET", f"/issues/{issue_id}/relations")

    def create_relation(self, issue_id: str, related_issue_id: str, relation_type: str = "blocks") -> dict:
        return self._request("POST", f"/issues/{issue_id}/relations", {
            "related_issue_id": related_issue_id,
            "relation_type": relation_type
        })

    def delete_relation(self, issue_id: str, relation_id: str):
        return self._request("DELETE", f"/issues/{issue_id}/relations/{relation_id}")

    # Comments
    def create_comment(self, issue_id: str, content: str) -> dict:
        return self._request("POST", f"/issues/{issue_id}/comments", {"content": content})

    def get_comments(self, issue_id: str) -> list:
        return self._request("GET", f"/issues/{issue_id}/comments")

    def delete_comment(self, issue_id: str, comment_id: str):
        return self._request("DELETE", f"/issues/{issue_id}/comments/{comment_id}")

    # Sprints
    def get_sprints(self, project_id: str, status: str = None) -> list:
        url = f"/sprints?project_id={project_id}"
        if status:
            url += f"&sprint_status={status}"
        return self._request("GET", url)

    def get_sprint(self, sprint_id: str) -> dict:
        return self._request("GET", f"/sprints/{sprint_id}")

    def update_sprint(self, sprint_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/sprints/{sprint_id}", kwargs)

    def close_sprint(self, sprint_id: str) -> dict:
        return self._request("POST", f"/sprints/{sprint_id}/close")

    # Documents
    def create_document(self, team_id: str, title: str, **kwargs) -> dict:
        data = {"title": title, **kwargs}
        return self._request("POST", f"/documents?team_id={team_id}", data)

    def get_documents(self, team_id: str, project_id: str = None, sprint_id: str = None, search: str = None, limit: int = None) -> list:
        url = f"/documents?team_id={team_id}"
        if project_id:
            url += f"&project_id={project_id}"
        if sprint_id:
            url += f"&sprint_id={sprint_id}"
        if search:
            url += f"&search={search}"
        if limit is not None:
            url += f"&limit={limit}"
        return self._request("GET", url)

    def get_document(self, document_id: str) -> dict:
        return self._request("GET", f"/documents/{document_id}")

    def update_document(self, document_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/documents/{document_id}", kwargs)

    def delete_document(self, document_id: str):
        return self._request("DELETE", f"/documents/{document_id}")

    # Document-Issue Links
    def get_document_issues(self, document_id: str) -> list:
        return self._request("GET", f"/documents/{document_id}/issues")

    def link_document_to_issue(self, document_id: str, issue_id: str) -> dict:
        return self._request("POST", f"/documents/{document_id}/issues/{issue_id}")

    def unlink_document_from_issue(self, document_id: str, issue_id: str):
        return self._request("DELETE", f"/documents/{document_id}/issues/{issue_id}")

    def get_document_comments(self, document_id: str) -> list:
        return self._request("GET", f"/documents/{document_id}/comments")

    def create_document_comment(self, document_id: str, content: str) -> dict:
        return self._request("POST", f"/documents/{document_id}/comments", {"content": content})

    def get_issue_documents(self, issue_id: str) -> list:
        return self._request("GET", f"/issues/{issue_id}/documents")

    # Labels
    def create_label(self, team_id: str, name: str, **kwargs) -> dict:
        data = {"name": name, **kwargs}
        return self._request("POST", f"/labels?team_id={team_id}", data)

    def get_labels(self, team_id: str) -> list:
        return self._request("GET", f"/labels?team_id={team_id}")

    def update_label(self, label_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/labels/{label_id}", kwargs)

    def delete_label(self, label_id: str):
        return self._request("DELETE", f"/labels/{label_id}")

    def add_label_to_issue(self, issue_id: str, label_id: str) -> dict:
        """Add a label to an issue."""
        return self._request("POST", f"/issues/{issue_id}/labels", {"label_id": label_id})

    def remove_label_from_issue(self, issue_id: str, label_id: str) -> dict:
        """Remove a label from an issue."""
        return self._request("DELETE", f"/issues/{issue_id}/labels/{label_id}")

    # Rituals
    def get_ritual(self, ritual_id: str) -> dict:
        return self._request("GET", f"/rituals/{ritual_id}")

    def get_pending_approvals(self, project_id: str) -> list:
        return self._request("GET", f"/rituals/pending-approvals?project_id={project_id}")

    def approve_issue_attestation(self, ritual_id: str, issue_id: str) -> dict:
        return self._request("POST", f"/rituals/{ritual_id}/approve-issue/{issue_id}", {})

    def get_rituals(self, project_id: str, include_inactive: bool = False) -> list:
        url = f"/rituals?project_id={project_id}"
        if include_inactive:
            url += "&include_inactive=true"
        return self._request("GET", url)

    def get_ritual_history(self, project_id: str, skip: int = 0, limit: int = 50) -> list:
        return self._request("GET", f"/rituals/history?project_id={project_id}&skip={skip}&limit={limit}")

    def get_limbo_status(self, project_id: str) -> dict:
        return self._request("GET", f"/rituals/limbo?project_id={project_id}")

    def force_clear_limbo(self, project_id: str) -> dict:
        return self._request("POST", f"/rituals/force-clear-limbo?project_id={project_id}", {})

    def force_clear_ticket_limbo(self, issue_id: str) -> dict:
        return self._request("POST", f"/rituals/force-clear-ticket-limbo?issue_id={issue_id}", {})

    def create_ritual(self, project_id: str, name: str, prompt: str, **kwargs) -> dict:
        data = {"name": name, "prompt": prompt, **kwargs}
        return self._request("POST", f"/rituals?project_id={project_id}", data)

    def update_ritual(self, ritual_id: str, **kwargs) -> dict:
        """Update a ritual. Accepts prompt, name, approval_mode, trigger."""
        data = {k: v for k, v in kwargs.items() if v is not None}
        return self._request("PATCH", f"/rituals/{ritual_id}", data)

    def delete_ritual(self, ritual_id: str) -> None:
        """Delete (deactivate) a ritual."""
        self._request("DELETE", f"/rituals/{ritual_id}")

    def attest_ritual(self, ritual_id: str, project_id: str, note: str = None) -> dict:
        data = {}
        if note:
            data["note"] = note
        return self._request("POST", f"/rituals/{ritual_id}/attest?project_id={project_id}", data)

    def approve_ritual(self, ritual_id: str, project_id: str) -> dict:
        return self._request("POST", f"/rituals/{ritual_id}/approve?project_id={project_id}", {})

    def complete_gate_ritual(self, ritual_id: str, project_id: str, note: str = None) -> dict:
        data = {}
        if note:
            data["note"] = note
        return self._request("POST", f"/rituals/{ritual_id}/complete?project_id={project_id}", data)

    def get_pending_issue_rituals(self, issue_id: str) -> dict:
        return self._request("GET", f"/rituals/issue/{issue_id}/pending")

    def attest_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str = None) -> dict:
        data = {}
        if note:
            data["note"] = note
        return self._request("POST", f"/rituals/{ritual_id}/attest-issue/{issue_id}", data)

    def complete_gate_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str = None) -> dict:
        data = {}
        if note:
            data["note"] = note
        return self._request("POST", f"/rituals/{ritual_id}/complete-issue/{issue_id}", data)

    # Ritual Groups
    def get_ritual_groups(self, project_id: str) -> list:
        return self._request("GET", f"/rituals/groups?project_id={project_id}")

    def get_ritual_group(self, group_id: str) -> dict:
        return self._request("GET", f"/rituals/groups/{group_id}")

    def create_ritual_group(self, project_id: str, name: str, selection_mode: str = "random_one") -> dict:
        data = {"name": name, "selection_mode": selection_mode}
        return self._request("POST", f"/rituals/groups?project_id={project_id}", data)

    def update_ritual_group(self, group_id: str, **kwargs) -> dict:
        data = {k: v for k, v in kwargs.items() if v is not None}
        return self._request("PATCH", f"/rituals/groups/{group_id}", data)

    def delete_ritual_group(self, group_id: str) -> None:
        self._request("DELETE", f"/rituals/groups/{group_id}")

    def get_current_sprint(self, project_id: str) -> dict:
        return self._request("GET", f"/sprints/current?project_id={project_id}")

    # Agents
    def create_team_agent(self, team_id: str, name: str) -> dict:
        """Create a team-scoped agent."""
        return self._request("POST", f"/teams/{team_id}/agents", {"name": name})

    def create_project_agent(self, project_id: str, name: str) -> dict:
        """Create a project-scoped agent."""
        return self._request("POST", f"/projects/{project_id}/agents", {"name": name})

    def get_team_agents(self, team_id: str) -> list:
        """List all agents for a team."""
        return self._request("GET", f"/teams/{team_id}/agents")

    def get_agent(self, agent_id: str) -> dict:
        """Get agent by ID."""
        return self._request("GET", f"/agents/{agent_id}")

    def update_agent(self, agent_id: str, **kwargs) -> dict:
        """Update an agent's name or avatar."""
        return self._request("PATCH", f"/agents/{agent_id}", kwargs)

    def delete_agent(self, agent_id: str):
        """Delete an agent."""
        return self._request("DELETE", f"/agents/{agent_id}")


client = Client()
