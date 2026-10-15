"""API client for CLI."""
import sys
import httpx
from urllib.parse import quote, urlencode
from cli.config import get_api_url, get_token, get_api_key
from cli import session_identity
from cli.principals import principal_label


class APIError(Exception):
    """API error with message. `status_code` is the HTTP response status
    when the error originated from a server response, or None when the
    error is local (network failure, malformed response, etc.). Callers
    that need to distinguish transient (5xx/429) from non-transient
    (4xx) failures should branch on `status_code`.
    """

    def __init__(self, message: str, status_code: int | None = None, detail=None):
        super().__init__(message)
        self.status_code = status_code
        # The server's raw `detail` (dict for governance errors, list for
        # validation errors, str otherwise), kept so callers that speak to
        # machines (the MCP server, CHT-1350) can forward the structure the
        # human-readable `message` flattens.
        self.detail = detail


class Client:
    """API client."""

    @staticmethod
    def _configured_credential() -> str | None:
        """The profile's credential: the API key, else the login token."""
        return get_api_key() or get_token()

    def _headers(self, credential: str | None = None) -> dict:
        """Get request headers.

        Reads config on each call to support profile switching.
        `credential` overrides the configured one (a session identity's
        key, CHT-1499).
        """
        headers = {"Content-Type": "application/json"}
        # Prefer API key over JWT token
        credential = credential or self._configured_credential()
        if credential:
            headers["Authorization"] = f"Bearer {credential}"
        # Signals whether this invocation is an interactive (TTY) session,
        # as opposed to an agent or other non-interactive automation. Used
        # by the backend to require both a human account AND an interactive
        # caller for the ritual/estimate exemption (CHT-1302).
        interactive = sys.stdin.isatty() and sys.stdout.isatty()
        headers["X-Chaotic-Interactive"] = "1" if interactive else "0"
        return headers

    @staticmethod
    def _session_error(exc: session_identity.SessionIdentityError) -> "APIError":
        return APIError(str(exc), status_code=exc.status_code, detail=exc.detail)

    def _session_key(self, ref: str, credential: str | None, api_url: str, failed_key: str | None = None) -> str:
        try:
            return session_identity.session_key(ref, credential, api_url, failed_key=failed_key)
        except session_identity.SessionIdentityError as exc:
            raise self._session_error(exc) from exc

    @staticmethod
    def _with_query(path: str, **params) -> str:
        """`path` with the params that are not None as a query string, so a
        list method's `skip`/`limit` (and any other optional filter) is
        sent only when the caller set it and the server default applies
        otherwise (CHT-1383). A bool is sent as `true`/`false`, the form
        the API's query flags use; everything else as urlencode renders it."""
        rendered = {
            k: (str(v).lower() if isinstance(v, bool) else v)
            for k, v in params.items() if v is not None
        }
        query = urlencode(rendered)
        return f"{path}?{query}" if query else path

    def _request(
        self, method: str, path: str, data: dict = None, *, as_configured: bool = False,
    ) -> dict | None:
        """Make API request.

        With session identity on (CHT-1499) the request is sent with this
        Claude Code session's own key, registered on first use, and a 401
        for that key re-registers once. `as_configured` sends the
        configured credential itself (`agent register`, which is the
        registrar's own call).
        """
        ref = credential = None
        if not as_configured:
            try:
                ref = session_identity.active_ref()
                if ref:
                    credential, api_url = session_identity.registrar_settings()
            except session_identity.SessionIdentityError as exc:
                raise self._session_error(exc) from exc
        if not ref:
            api_url = get_api_url()
        url = f"{api_url}{path}"
        key = self._session_key(ref, credential, api_url) if ref else None
        with httpx.Client() as client:
            send = getattr(client, method.lower())

            def _send(credential):
                kwargs = {"headers": self._headers(credential)}
                if data is not None:
                    kwargs["json"] = data
                return send(url, **kwargs)

            response = _send(key)
            if ref and response.status_code == 401:
                # Expired or revoked: register again, once.
                key = self._session_key(ref, credential, api_url, failed_key=key)
                response = _send(key)

            if response.status_code == 204:
                return None

            # Handle empty response bodies (some endpoints return 200 with no body)
            if not response.content or not response.content.strip():
                if response.is_success:
                    return None
                raise APIError(
                    f"Server returned {response.status_code} with no body",
                    status_code=response.status_code,
                )

            try:
                result = response.json()
            except Exception:
                if response.is_success:
                    return None
                raise APIError(
                    f"Server returned {response.status_code} with non-JSON body",
                    status_code=response.status_code,
                )

            if not response.is_success:
                detail = result.get("detail", "Unknown error")
                raise APIError(
                    self._format_error(detail),
                    status_code=response.status_code,
                    detail=detail,
                )

            return result

    def _format_error(self, detail) -> str:
        """Format an API error detail into a user-friendly message."""
        if isinstance(detail, list):
            return self._format_validation_errors(detail)

        if not isinstance(detail, dict):
            return str(detail)

        if "pending_rituals" in detail and "issue_id" in detail:
            return self._format_ticket_ritual_error(detail)
        if "pending_rituals" in detail:
            return self._format_limbo_error(detail)
        if "arrears_by" in detail:
            return self._format_arrears_error(detail)
        return detail.get("message", str(detail))

    @staticmethod
    def _switch_hint(detail: dict) -> str:
        """The `team use` / `project use` steps that make a refused project
        current, or "" when it already is.

        Project keys are unique only within a team, and identifier lookups
        span every team the caller belongs to, so a refusal can name a
        project the current team does not hold, or holds a different
        project under the same key (CHT-1270 review).
        """
        from cli.config import get_current_project, get_current_team

        steps = []
        team_id = detail.get("team_id")
        if team_id and team_id != get_current_team():
            steps.append(f"`chaotic team use {team_id}`")
        if detail.get("project_id") != get_current_project():
            steps.append(f"`chaotic project use {detail['project_key']}`")
        return " then ".join(steps)

    @classmethod
    def _format_arrears_error(cls, detail: dict) -> str:
        """Name the project that is over budget, and the close that fixes it.

        Arrears is keyed on the refused ticket's project, which need not be
        the current one; a bare `chaotic sprint close` then closes some
        other project's sprint, and repeating it never helps (CHT-1270).
        The remedy names the sprint by id, so a second agent running the
        same advice gets "Can only close an active sprint" instead of
        closing the fresh sprint the first one just started.
        Servers before CHT-1270 send no project_key; keep the old advice.
        """
        key = detail.get("project_key")
        if not key:
            return "Sprint is in arrears. Run `chaotic sprint close` to resolve, then complete rituals with `chaotic ritual pending`."
        name = detail.get("sprint_name") or "The active sprint"
        spent, budget = detail.get("points_spent"), detail.get("budget")
        figures = f" ({spent}/{budget} points)" if spent is not None and budget is not None else ""
        sprint_ref = f" {detail['sprint_id']}" if detail.get("sprint_id") else ""
        close = f"`chaotic sprint close{sprint_ref} --project {key}`"
        switch = cls._switch_hint(detail)
        if "team use" in switch:
            # Another team: --project KEY would resolve in the current team.
            close = f"{switch}, then `chaotic sprint close{sprint_ref}`"
        return (
            f"{name} in project {key} is in arrears{figures}. "
            f"Run {close} to resolve: one close starts a fresh sprint. "
            f"If it enters limbo instead, complete that project's rituals with `chaotic ritual pending`"
            + (f" (after {switch})." if switch else ".")
        )

    @classmethod
    def _format_limbo_error(cls, detail: dict) -> str:
        """Name the project whose sprint is in limbo (CHT-1270): `ritual
        pending` reads the current project, which may be another one."""
        key = detail.get("project_key")
        if not key:
            return "Sprint is in limbo. Run `chaotic ritual pending` to see what to do next."
        switch = cls._switch_hint(detail)
        run = f"{switch}, then `chaotic ritual pending`" if switch else "`chaotic ritual pending`"
        return f"Sprint in project {key} is in limbo. Run {run} to see what to do next."

    def _format_validation_errors(self, detail: list) -> str:
        """Format a list of FastAPI/pydantic validation errors (422 body)
        readably, as `<field>: <message>` lines.

        Deliberately reads only `loc`/`msg` off each error and never
        touches `input`/`ctx`/`value` -- even though the backend's
        RequestValidationError handler already strips those, this stays
        value-blind so a too-short password (or any other field value)
        can never end up dumped to the terminal from here either.
        """
        if not detail:
            return "Validation error."

        lines = []
        for error in detail:
            if not isinstance(error, dict) or "msg" not in error:
                lines.append(str(error))
                continue
            loc = error.get("loc", [])
            field = ".".join(
                str(part) for part in loc if part not in ("body", "query", "path", "header")
            )
            if not field:
                field = ".".join(str(part) for part in loc)
            lines.append(f"{field}: {error['msg']}" if field else str(error["msg"]))
        return "\n".join(lines)

    def _format_ticket_ritual_error(self, detail: dict) -> str:
        """Format a ticket ritual error with actionable hint."""
        issue_id = detail.get("issue_id", "")
        pending = detail.get("pending_rituals", [])

        if not pending:
            return "Ticket has pending rituals."

        # Since CHT-1360 each row carries its attestation state and approval
        # mode: an attested ritual awaiting a human's approval is reported as
        # such rather than as something to attest again, and a GATE ritual
        # (human-completion only; attesting it is refused) gets the
        # `ritual complete` hint instead of the `ritual attest` one.
        def _is_dict(r):
            return isinstance(r, dict)

        awaiting = [r for r in pending if _is_dict(r) and r.get("attestation")]
        gate = [r for r in pending if _is_dict(r) and not r.get("attestation") and r.get("approval_mode") == "gate"]
        todo = [r for r in pending if r not in awaiting and r not in gate]

        # The server lists the rejections this refusal is about, including
        # one this very attempt answered by asking again (already marked
        # superseded on the row, but its reason is the point of the retry).
        listed = {
            x.get("ritual_id"): x for x in (detail.get("rejections") or []) if _is_dict(x)
        }

        def _rejected(r) -> str | None:
            """The rejection's line (CHT-1606): a human sent this ritual
            back; the reason is what to fix before trying again."""
            if not _is_dict(r):
                return None
            rej = r.get("last_rejection") or {}
            if r.get("id") in listed:
                x = listed[r.get("id")]
                by = principal_label(rej.get("rejecter"), x.get("rejected_by_name")) or "a human"
                again = " (asked again; the approvers were notified)" if x.get("asked_again") else ""
                return f"  Rejected by {by}: {x.get('note', '')}{again}"
            if not rej or rej.get("superseded_at"):
                return None
            by = principal_label(rej.get("rejecter"), rej.get("rejected_by_name")) or "a human"
            return f"  Rejected by {by}: {rej.get('note', '')}"

        lines = []
        for r in awaiting:
            att = r.get("attestation") or {}
            by = principal_label(att.get("attester"), att.get("attested_by_name") or att.get("attested_by"))
            mode = r.get("approval_mode")
            who = f" by {by}" if by else ""
            how = f" ({mode})" if mode else ""
            lines.append(f"Attested{who}, awaiting human approval{how}: {r.get('name', 'unknown')}")
        for r in gate:
            name = r.get("name", "unknown")
            lines.append(f"Gate ritual (human completion only): {name}")
            if _rejected(r):
                lines.append(_rejected(r))
            lines.append(f"  A human runs: chaotic ritual complete {name} --ticket {issue_id}")

        if todo:
            # Only show the first unattested ritual — subsequent ones are
            # revealed after the first is attested, to avoid overwhelming
            # the user.
            r = todo[0]
            if isinstance(r, dict):
                name = r.get("name", "unknown")
                prompt = r.get("prompt", "")
                lines.append(f"Pending ritual: {name}")
                if prompt:
                    lines.append(f"  {prompt}")
                if _rejected(r):
                    lines.append(_rejected(r))
                lines.append(
                    f"\nUsage: chaotic ritual attest {name} --ticket {issue_id} --note \"your note here\""
                )
            else:
                lines.append(f"Pending ritual: {r}")
                lines.append(
                    f"\nUsage: chaotic ritual attest {r} --ticket {issue_id} --note \"your note here\""
                )
            if len(todo) > 1:
                lines.append(f"\n({len(todo) - 1} more ritual(s) pending after this one)")
        else:
            lines.append(
                "\nNothing more to attest -- a human must approve/complete the ritual(s) above "
                "before this transition can proceed."
            )

        return "\n".join(lines)

    # Auth
    def signup(self, name: str, email: str, password: str) -> dict:
        return self._request("POST", "/auth/signup", {"name": name, "email": email, "password": password})

    def login(self, email: str, password: str) -> dict:
        return self._request("POST", "/auth/login", {"email": email, "password": password})

    def get_me(self, *, as_configured: bool = False) -> dict:
        return self._request("GET", "/auth/me", as_configured=as_configured)

    # Email verification (CHT-1790)
    def request_email_verification(self) -> dict:
        return self._request("POST", "/auth/email-verification")

    def confirm_email_verification(self, code: str) -> dict:
        return self._request("POST", "/auth/email-verification/confirm", {"code": code})

    # Users (CHT-1383)
    def get_user(self, user_id: str) -> dict:
        return self._request("GET", f"/users/{user_id}")

    def update_me(self, **kwargs) -> dict:
        return self._request("PATCH", "/users/me", kwargs)

    def delete_me(self):
        return self._request("DELETE", "/users/me")

    # API keys
    def list_api_keys(self, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query("/api-keys", skip=skip, limit=limit))

    def create_api_key(self, name: str, expires_at: str | None = None) -> dict:
        data = {"name": name}
        if expires_at:
            data["expires_at"] = expires_at
        return self._request("POST", "/api-keys", data)

    def revoke_api_key(self, api_key_id: str):
        return self._request("DELETE", f"/api-keys/{api_key_id}")

    # Connected apps: your own OAuth connections (CHT-1523)
    def list_connections(self) -> list:
        return self._request("GET", "/oauth/connections")

    def revoke_connection(self, connection_id: str):
        return self._request("DELETE", f"/oauth/connections/{connection_id}")

    # Teams
    def create_team(self, name: str, key: str, description: str = None) -> dict:
        data = {"name": name, "key": key}
        if description:
            data["description"] = description
        return self._request("POST", "/teams", data)

    def get_teams(self, *, as_configured: bool = False) -> list:
        return self._request("GET", "/teams", as_configured=as_configured)

    def get_team(self, team_id: str) -> dict:
        return self._request("GET", f"/teams/{team_id}")

    def update_team(self, team_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/teams/{team_id}", kwargs)

    def delete_team(self, team_id: str):
        return self._request("DELETE", f"/teams/{team_id}")

    # Team members
    def get_team_members(self, team_id: str, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/teams/{team_id}/members", skip=skip, limit=limit))

    def remove_member(self, team_id: str, user_id: str):
        return self._request("DELETE", f"/teams/{team_id}/members/{user_id}")

    def update_member_role(self, team_id: str, user_id: str, role: str) -> dict:
        return self._request("PATCH", f"/teams/{team_id}/members/{user_id}", {"role": role})

    # Invitations
    def invite_member(self, team_id: str, email: str, role: str = "member") -> dict:
        return self._request("POST", f"/teams/{team_id}/invitations", {"email": email, "role": role})

    def get_invitations(self, team_id: str, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/teams/{team_id}/invitations", skip=skip, limit=limit))

    def accept_invitation(self, token: str, code: str | None = None) -> dict:
        path = f"/teams/invitations/{quote(token, safe='')}/accept"
        if code is None:
            return self._request("POST", path)
        return self._request("POST", path, {"code": code})

    def delete_invitation(self, team_id: str, invitation_id: str):
        return self._request("DELETE", f"/teams/{team_id}/invitations/{invitation_id}")

    def issue_invitation_verification_code(self, team_id: str, invitation_id: str) -> dict:
        return self._request(
            "POST", f"/teams/{team_id}/invitations/{quote(invitation_id, safe='')}/verification-code",
        )

    # Projects
    def create_project(self, team_id: str, name: str, key: str, **kwargs) -> dict:
        # CHT-1223: team_id moved from a query param to the URL path.
        data = {"name": name, "key": key, **kwargs}
        return self._request("POST", f"/teams/{team_id}/projects", data)

    def get_projects(self, team_id: str, limit: int | None = None, skip: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/teams/{team_id}/projects", skip=skip, limit=limit))

    def get_project(self, project_id: str) -> dict:
        return self._request("GET", f"/projects/{project_id}")

    def get_version(self) -> dict:
        """GET /api/version: git sha, app version, MCP toolset fingerprint
        and tool count (unauthenticated deploy metadata, CHT-1294)."""
        return self._request("GET", "/version")

    def update_project(self, project_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/projects/{project_id}", kwargs)

    def delete_project(self, project_id: str):
        return self._request("DELETE", f"/projects/{project_id}")

    # Issues
    def create_issue(self, project_id: str, title: str, **kwargs) -> dict:
        # CHT-1223: project_id moved from a query param to the URL path.
        data = {"title": title, **kwargs}
        return self._request("POST", f"/projects/{project_id}/issues", data)

    def get_issues(self, project_id: str = None, sprint_id: str = None, assignee_id: str = None, status: str = None, priority: str = None, limit: int = None, parent_id: str = None, sort_by: str = None, order: str = None, label: str = None, search: str = None, issue_type: str = None, skip: int = None, exclude_label: str = None, exclude_status: str = None, exclude_priority: str = None, exclude_assignee_id: str = None, exclude_issue_type: str = None, team_id: str = None) -> list:
        params = {}
        if project_id:
            params["project_id"] = project_id
        if team_id:
            params["team_id"] = team_id
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

        # Exclude filters — comma-separated, repeated query params.
        def _append_multi(key, raw):
            nonlocal query
            if not raw:
                return
            values = [v.strip() for v in raw.split(",") if v.strip()]
            joined = "&".join([f"{key}={quote(v)}" for v in values])
            if joined:
                query = f"{query}&{joined}" if query else joined

        _append_multi("exclude_label", exclude_label)
        _append_multi("exclude_status", exclude_status)
        _append_multi("exclude_priority", exclude_priority)
        _append_multi("exclude_assignee_id", exclude_assignee_id)
        _append_multi("exclude_issue_type", exclude_issue_type)

        return self._request("GET", f"/issues?{query}")

    def get_issue(self, issue_id: str) -> dict:
        return self._request("GET", f"/issues/{issue_id}")

    def get_ready_issues(
        self, project_id: str = None, team_id: str = None,
        mine: bool = False, include_assigned: bool = False, limit: int = None,
    ) -> list:
        """CHT-1245: 'what can I start right now'. Path-nested per the
        CHT-1223 convention -- new endpoint, no flat query-param route.
        """
        if project_id:
            path = f"/projects/{project_id}/issues/ready"
        elif team_id:
            path = f"/teams/{team_id}/issues/ready"
        else:
            raise ValueError("Must provide project_id or team_id")
        params = {}
        if mine:
            params["mine"] = "true"
        if include_assigned:
            params["include_assigned"] = "true"
        if limit is not None:
            params["limit"] = limit
        query = urlencode(params)
        return self._request("GET", f"{path}?{query}" if query else path)

    def query_issues(
        self, project_id: str = None, team_id: str = None, where: str = None,
        filter_json: str = None, order: str = None, skip: int = None, limit: int = None,
    ) -> dict:
        """Run an issue query (CHT-1718): ``where`` text and/or the
        ``filter`` structure as JSON. Returns the response envelope
        (``issues``, ``total``, normalized ``query``/``where``/``order``)."""
        if project_id:
            path = f"/projects/{project_id}/issues/query"
        elif team_id:
            path = f"/teams/{team_id}/issues/query"
        else:
            raise ValueError("Must provide project_id or team_id")
        params = {}
        if where:
            params["where"] = where
        if filter_json:
            params["filter"] = filter_json
        if order:
            params["order"] = order
        if skip:
            params["skip"] = skip
        if limit is not None:
            params["limit"] = limit
        query = urlencode(params)
        return self._request("GET", f"{path}?{query}" if query else path)

    def get_issue_by_identifier(self, identifier: str) -> dict:
        return self._request("GET", f"/issues/identifier/{identifier}")

    def search_issues(
        self, team_id: str, query: str, project_id: str = None, limit: int = None, status: str = None,
        skip: int | None = None,
    ) -> list:
        url = f"/issues/search?team_id={team_id}&q={quote(query)}"
        if project_id:
            url += f"&project_id={project_id}"
        if limit:
            url += f"&limit={limit}"
        if status:
            url += f"&issue_status={quote(status)}"
        if skip is not None:
            url += f"&skip={skip}"
        return self._request("GET", url)

    def update_issue(self, issue_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/issues/{issue_id}", kwargs)

    def batch_update_issues(self, issue_ids: list[str], **fields) -> list:
        """POST /issues/batch-update: the safe fields (priority, estimate,
        label_ids, add_label_ids) on up to 200 issues at once (CHT-1383).
        Status, assignee and sprint changes go through update_issue."""
        return self._request("POST", "/issues/batch-update", {"issue_ids": issue_ids, **fields})

    def delete_issue(self, issue_id: str):
        return self._request("DELETE", f"/issues/{issue_id}")

    # Description revisions
    def get_issue_description_revisions(
        self, issue_id: str, limit: int | None = None, skip: int | None = None,
    ) -> list:
        return self._request(
            "GET", self._with_query(f"/issues/{issue_id}/description-revisions", skip=skip, limit=limit),
        )

    def get_issue_description_revision(self, issue_id: str, version: int) -> dict:
        return self._request("GET", f"/issues/{issue_id}/description-revisions/{version}")

    # Sub-issues
    def get_sub_issues(self, issue_id: str, limit: int | None = None, skip: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/issues/{issue_id}/sub-issues", skip=skip, limit=limit))

    # Relations
    def get_relations(self, issue_id: str, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/issues/{issue_id}/relations", skip=skip, limit=limit))

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

    def get_comments(self, issue_id: str, limit: int | None = None, skip: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/issues/{issue_id}/comments", skip=skip, limit=limit))

    def update_comment(self, issue_id: str, comment_id: str, content: str) -> dict:
        return self._request("PATCH", f"/issues/{issue_id}/comments/{comment_id}", {"content": content})

    def delete_comment(self, issue_id: str, comment_id: str):
        return self._request("DELETE", f"/issues/{issue_id}/comments/{comment_id}")

    # Activities
    def get_issue_activities(self, issue_id: str, skip: int | None = None, limit: int | None = None) -> list:
        """The activity log of one issue (CHT-1383)."""
        return self._request("GET", self._with_query(f"/issues/{issue_id}/activities", skip=skip, limit=limit))

    def get_team_activities(
        self, team_id: str, skip: int = 0, limit: int = 20,
        project_id: str | None = None,
    ) -> list:
        query: dict = {"team_id": team_id, "skip": skip, "limit": limit}
        if project_id is not None:
            query["project_id"] = project_id
        params = urlencode(query)
        return self._request("GET", f"/issues/activities?{params}")

    # Comments (team-wide)
    def get_team_comments(self, team_id: str, skip: int = 0, limit: int = 50) -> list:
        params = urlencode({"team_id": team_id, "skip": skip, "limit": limit})
        return self._request("GET", f"/issues/comments?{params}")

    # Sprints
    def get_sprints(
        self, project_id: str, status: str = None, skip: int | None = None, limit: int | None = None,
    ) -> list:
        # CHT-1223: project_id moved from a query param to the URL path.
        return self._request("GET", self._with_query(
            f"/projects/{project_id}/sprints", sprint_status=status or None, skip=skip, limit=limit,
        ))

    def create_sprint(self, project_id: str, name: str, **kwargs) -> dict:
        data = {"name": name, **kwargs}
        return self._request("POST", f"/projects/{project_id}/sprints", data)

    def get_sprint(self, sprint_id: str) -> dict:
        return self._request("GET", f"/sprints/{sprint_id}")

    def update_sprint(self, sprint_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/sprints/{sprint_id}", kwargs)

    def close_sprint(self, sprint_id: str) -> dict:
        return self._request("POST", f"/sprints/{sprint_id}/close")

    def get_sprint_transactions(self, sprint_id: str, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/sprints/{sprint_id}/transactions", skip=skip, limit=limit))

    # Documents
    def create_document(self, team_id: str, title: str, **kwargs) -> dict:
        # CHT-1223: team_id moved from a query param to the URL path.
        data = {"title": title, **kwargs}
        return self._request("POST", f"/teams/{team_id}/documents", data)

    def get_documents(
        self, team_id: str, project_id: str = None, sprint_id: str = None, search: str = None,
        limit: int | None = None, skip: int | None = None,
    ) -> list:
        return self._request("GET", self._with_query(
            f"/teams/{team_id}/documents",
            project_id=project_id or None, sprint_id=sprint_id or None, search=search or None,
            skip=skip, limit=limit,
        ))

    def get_document(self, document_id: str) -> dict:
        return self._request("GET", f"/documents/{document_id}")

    def update_document(self, document_id: str, **kwargs) -> dict:
        return self._request("PATCH", f"/documents/{document_id}", kwargs)

    def delete_document(self, document_id: str):
        return self._request("DELETE", f"/documents/{document_id}")

    # Document revisions
    def get_document_revisions(
        self, document_id: str, limit: int | None = None, skip: int | None = None,
    ) -> list:
        return self._request("GET", self._with_query(f"/documents/{document_id}/revisions", skip=skip, limit=limit))

    def get_document_revision(self, document_id: str, version: int) -> dict:
        return self._request("GET", f"/documents/{document_id}/revisions/{version}")

    # Document-Issue Links
    def get_document_issues(self, document_id: str) -> list:
        return self._request("GET", f"/documents/{document_id}/issues")

    def link_document_to_issue(self, document_id: str, issue_id: str) -> dict:
        return self._request("POST", f"/documents/{document_id}/issues/{issue_id}")

    def unlink_document_from_issue(self, document_id: str, issue_id: str):
        return self._request("DELETE", f"/documents/{document_id}/issues/{issue_id}")

    def get_document_comments(self, document_id: str, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/documents/{document_id}/comments", skip=skip, limit=limit))

    def create_document_comment(self, document_id: str, content: str) -> dict:
        return self._request("POST", f"/documents/{document_id}/comments", {"content": content})

    def update_document_comment(self, document_id: str, comment_id: str, content: str) -> dict:
        return self._request("PATCH", f"/documents/{document_id}/comments/{comment_id}", {"content": content})

    def delete_document_comment(self, document_id: str, comment_id: str):
        return self._request("DELETE", f"/documents/{document_id}/comments/{comment_id}")

    def get_issue_documents(self, issue_id: str) -> list:
        return self._request("GET", f"/issues/{issue_id}/documents")

    # Document labels (CHT-1383)
    def get_document_labels(self, document_id: str) -> list:
        return self._request("GET", f"/documents/{document_id}/labels")

    def add_label_to_document(self, document_id: str, label_id: str) -> dict:
        return self._request("POST", f"/documents/{document_id}/labels/{label_id}")

    def remove_label_from_document(self, document_id: str, label_id: str):
        return self._request("DELETE", f"/documents/{document_id}/labels/{label_id}")

    # Labels
    def create_label(self, team_id: str, name: str, **kwargs) -> dict:
        # CHT-1223: team_id moved from a query param to the URL path.
        data = {"name": name, **kwargs}
        return self._request("POST", f"/teams/{team_id}/labels", data)

    def get_labels(self, team_id: str, limit: int | None = None, skip: int | None = None) -> list:
        return self._request("GET", self._with_query(f"/teams/{team_id}/labels", skip=skip, limit=limit))

    def get_label(self, label_id: str) -> dict:
        return self._request("GET", f"/labels/{label_id}")

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

    def get_rituals(
        self, project_id: str, include_inactive: bool = False,
        skip: int | None = None, limit: int | None = None,
    ) -> list:
        # CHT-1223: project_id moved from a query param to the URL path.
        return self._request("GET", self._with_query(
            f"/projects/{project_id}/rituals",
            include_inactive=True if include_inactive else None, skip=skip, limit=limit,
        ))

    def get_ritual_history(self, project_id: str, skip: int = 0, limit: int = 50) -> list:
        return self._request("GET", f"/rituals/history?project_id={project_id}&skip={skip}&limit={limit}")

    def get_limbo_status(self, project_id: str) -> dict:
        return self._request("GET", f"/rituals/limbo?project_id={project_id}")

    def get_pending_gates(self, project_id: str) -> list:
        """A project's issues with an open GATE ritual awaiting a human (CHT-1383)."""
        return self._request("GET", f"/rituals/pending-gates?project_id={project_id}")

    def force_clear_limbo(self, project_id: str) -> dict:
        return self._request("POST", f"/rituals/force-clear-limbo?project_id={project_id}", {})

    def force_clear_ticket_limbo(self, issue_id: str) -> dict:
        return self._request("POST", f"/rituals/force-clear-ticket-limbo?issue_id={issue_id}", {})

    def create_ritual(self, project_id: str, name: str, prompt: str, **kwargs) -> dict:
        # CHT-1223: project_id moved from a query param to the URL path.
        data = {"name": name, "prompt": prompt, **kwargs}
        return self._request("POST", f"/projects/{project_id}/rituals", data)

    def update_ritual(self, ritual_id: str, **kwargs) -> dict:
        """Update a ritual. Accepts prompt, name, approval_mode, trigger,
        artifact (None unsets it: it is the one field where null is a value)."""
        data = {k: v for k, v in kwargs.items() if v is not None or k == "artifact"}
        return self._request("PATCH", f"/rituals/{ritual_id}", data)

    def delete_ritual(self, ritual_id: str) -> None:
        """Delete (deactivate) a ritual."""
        self._request("DELETE", f"/rituals/{ritual_id}")

    @staticmethod
    def _attestation_body(note: str | None, document_id: str | None, url: str | None) -> dict:
        """The attestation request body: the note and, for a ritual that
        declares an artifact, the document id or URL it binds to (CHT-1359)."""
        data = {}
        if note:
            data["note"] = note
        if document_id:
            data["document_id"] = document_id
        if url:
            data["url"] = url
        return data

    def attest_ritual(
        self, ritual_id: str, project_id: str, note: str = None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return self._request(
            "POST", f"/rituals/{ritual_id}/attest?project_id={project_id}",
            self._attestation_body(note, document_id, url),
        )

    def approve_ritual(self, ritual_id: str, project_id: str) -> dict:
        return self._request("POST", f"/rituals/{ritual_id}/approve?project_id={project_id}", {})

    def complete_gate_ritual(
        self, ritual_id: str, project_id: str, note: str = None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return self._request(
            "POST", f"/rituals/{ritual_id}/complete?project_id={project_id}",
            self._attestation_body(note, document_id, url),
        )

    def get_pending_issue_rituals(self, issue_id: str) -> dict:
        return self._request("GET", f"/rituals/issue/{issue_id}/pending")

    def attest_ritual_for_issue(
        self, ritual_id: str, issue_id: str, note: str = None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return self._request(
            "POST", f"/rituals/{ritual_id}/attest-issue/{issue_id}",
            self._attestation_body(note, document_id, url),
        )

    def complete_gate_ritual_for_issue(
        self, ritual_id: str, issue_id: str, note: str = None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return self._request(
            "POST", f"/rituals/{ritual_id}/complete-issue/{issue_id}",
            self._attestation_body(note, document_id, url),
        )

    def reject_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str) -> dict:
        """Send a ticket's GATE request or REVIEW attestation back with a
        reason (CHT-1606). Human team admins only, like approve."""
        return self._request("POST", f"/rituals/{ritual_id}/reject-issue/{issue_id}", {"note": note})

    # Ritual Groups
    def get_ritual_groups(self, project_id: str, skip: int | None = None, limit: int | None = None) -> list:
        return self._request("GET", self._with_query("/rituals/groups", project_id=project_id, skip=skip, limit=limit))

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
    @staticmethod
    def _agent_body(name: str, can_register: bool) -> dict:
        # `can_register` only when asked for, so the body stays what an
        # older server accepts (CHT-1600).
        return {"name": name, "can_register": True} if can_register else {"name": name}

    def create_team_agent(self, team_id: str, name: str, can_register: bool = False) -> dict:
        """Create a team-scoped agent (a registrar with `can_register`)."""
        return self._request("POST", f"/teams/{team_id}/agents", self._agent_body(name, can_register))

    def create_project_agent(self, project_id: str, name: str, can_register: bool = False) -> dict:
        """Create a project-scoped agent (a registrar with `can_register`)."""
        return self._request("POST", f"/projects/{project_id}/agents", self._agent_body(name, can_register))

    def register_agent(self, external_ref: str, **kwargs) -> dict:
        """Get or create the session identity this registrar knows by
        `external_ref` and mint it a fresh expiring key (CHT-1498).
        kwargs: name, project_id, team_id (a person's call only).

        Always sent with the configured credential, never a session
        identity's key: the caller is the registrar (CHT-1499)."""
        body = {"external_ref": external_ref, **{k: v for k, v in kwargs.items() if v is not None}}
        return self._request("POST", "/agents/register", body, as_configured=True)

    def get_team_agents(self, team_id: str, hide_idle: bool | None = None) -> list:
        """List a team's agents. Every caller that resolves a name or id
        wants them all; `hide_idle` leaves out idle session identities
        (CHT-1501), which only `agent list` asks for."""
        return self._request("GET", self._with_query(f"/teams/{team_id}/agents", hide_idle=hide_idle or None))

    def get_agent(self, agent_id: str) -> dict:
        """Get agent by ID."""
        return self._request("GET", f"/agents/{agent_id}")

    def update_agent(self, agent_id: str, **kwargs) -> dict:
        """Update an agent's name, avatar or `can_register` (registrar)."""
        return self._request("PATCH", f"/agents/{agent_id}", kwargs)

    def delete_agent(self, agent_id: str):
        """Delete an agent."""
        return self._request("DELETE", f"/agents/{agent_id}")

    def deactivate_agent(self, agent_id: str) -> dict:
        """Deactivate an agent: revoke its keys, keep its authored work."""
        return self._request("POST", f"/agents/{agent_id}/deactivate")

    def reactivate_agent(self, agent_id: str) -> dict:
        """Reactivate a deactivated agent (its old keys stay revoked)."""
        return self._request("POST", f"/agents/{agent_id}/reactivate")

    def create_agent_key(self, agent_id: str) -> dict:
        """Mint a new API key for an existing agent."""
        return self._request("POST", f"/agents/{agent_id}/keys")

    def list_agent_keys(self, agent_id: str) -> list:
        """Every key that signs in as the agent, active or revoked."""
        return self._request("GET", f"/agents/{agent_id}/keys")

    # Inbox (CHT-1250)
    def get_inbox(
        self, team_id: str | None, unread: bool = False, skip: int = 0, limit: int = 50,
    ) -> list:
        """List the current user's inbox entries (every team when team_id is None)."""
        params = {"skip": skip, "limit": limit}
        if team_id is not None:
            params["team_id"] = team_id
        if unread:
            params["unread"] = "true"
        query = urlencode(params)
        return self._request("GET", f"/inbox?{query}")

    def get_inbox_unread_count(self, team_id: str) -> dict:
        return self._request("GET", f"/inbox/unread-count?team_id={team_id}")

    def mark_inbox_read(self, entry_id: str) -> dict:
        return self._request("POST", f"/inbox/{entry_id}/read", {})

    def archive_inbox_entry(self, entry_id: str) -> dict:
        return self._request("POST", f"/inbox/{entry_id}/archive", {})

    def mark_all_inbox_read(self, team_id: str | None = None) -> dict:
        path = "/inbox/mark-all-read"
        if team_id is not None:
            path += f"?team_id={team_id}"
        return self._request("POST", path, {})

    # Templates (CHT-1259)
    def create_template(
        self, team_id: str, name: str, body: dict, description: str | None = None,
    ) -> dict:
        """Create a template from an explicit body (the import path)."""
        data = {"name": name, "body": body}
        if description:
            data["description"] = description
        return self._request("POST", f"/teams/{team_id}/templates", data)

    def create_template_from_project(
        self, team_id: str, name: str, project_id: str, description: str | None = None,
    ) -> dict:
        """Create a template by snapshotting a project's rituals + settings."""
        data = {"name": name, "project_id": project_id}
        if description:
            data["description"] = description
        return self._request("POST", f"/teams/{team_id}/templates/from-project", data)

    def get_templates(self, team_id: str) -> list:
        return self._request("GET", f"/teams/{team_id}/templates")

    def get_template(self, template_id: str) -> dict:
        return self._request("GET", f"/templates/{template_id}")

    def delete_template(self, template_id: str) -> None:
        self._request("DELETE", f"/templates/{template_id}")

    def apply_template(
        self,
        template_id: str,
        project_id: str,
        update_rituals: list | None = None,
        update_all: bool = False,
        dry_run: bool = False,
    ) -> dict:
        """Apply a template to a project; returns the structured change report."""
        data = {
            "project_id": project_id,
            "update_rituals": update_rituals or [],
            "update_all": update_all,
            "dry_run": dry_run,
        }
        return self._request("POST", f"/templates/{template_id}/apply", data)


client = Client()
