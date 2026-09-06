"""The ``Backend`` Protocol: everything a tool body may ask of the world.

Two implementations exist -- ``cli.mcp_backend.RestBackend`` (REST via
``cli.client.Client``, context from the CLI profile) and
``app.mcp_server.backend.InProcessBackend`` (``app.api`` in process,
context from the caller's API key) -- and the bodies in ``tools/`` are
written against this interface only, so a behaviour divergence between
the two MCP servers is impossible by construction (CHT-1374).

Conventions every implementation keeps:

* Every method is ``async``. Bodies are coroutines because mcp 2.x
  dispatches ``def`` handlers to worker threads and ``async def`` ones on
  the event loop; one kind, everywhere.
* Data methods return **wire-form JSON**: plain dicts/lists, enums as
  their ``.value``, exactly what a REST client sees after
  ``response_model``. The in-process adapter ``model_dump(mode="json")``s
  at its edge (ADR-0005); the REST adapter already has dicts.
* Failures are raised as the three exceptions in ``errors.py`` --
  ``ToolInputError`` (caller can fix), ``BackendError`` (the data source
  refused/failed; keeps the structured detail and status), and
  ``TransportError`` (could not reach it). Nothing else escapes an
  adapter method; the shared boundary in ``registry.py`` turns those into
  the ADR-0006 envelope.
* Scope resolution is where the two sides legitimately differ ("where
  does context come from"), so it lives behind methods too. The
  ``team`` argument every scope method takes is the HTTP-only
  disambiguator; the REST adapter ignores it (a CLI profile has one
  team) and its tool schemas do not advertise it
  (``Capabilities.team_param``).
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class Capabilities:
    """What a backend can do that changes the tool *schemas*.

    ``team_param``: the tools that scope by team expose an optional
    ``team`` parameter. True for an API-key-authenticated server whose
    user may belong to several teams; False for the stdio server, whose
    profile has exactly one.
    """

    team_param: bool = False


class Backend(Protocol):
    capabilities: Capabilities

    # -- scope / context -------------------------------------------------

    async def resolve_team(self, team: str | None) -> str:
        """The team id a team-wide tool should act on. Raises
        ToolInputError when there is none, or when ``team`` is given and
        not accessible / ambiguous."""

    async def resolve_project(self, project: str | None, team: str | None) -> tuple[str, str]:
        """``(project_id, team_id)`` for a project-scoped tool. A project
        MUST result: an explicit ``project`` is resolved (id, key, or
        name), otherwise the backend's default project is used; no
        default -> ToolInputError."""

    async def optional_project(self, project: str | None, team: str | None) -> tuple[str | None, str]:
        """Like resolve_project, but the backend's notion of a default
        project may be *absent*: ``(None, team_id)`` then means "the whole
        team". The stdio side returns None when the profile has no
        current project; the HTTP side has no profile, so it behaves
        exactly like resolve_project."""

    async def team_for_project(self, project_id: str) -> str:
        """The team that owns a project (for label/assignee lookups keyed
        off an issue's project)."""

    async def resolve_assignee(self, value: str, team_id: str) -> str:
        """'me', a user/agent id, a name or an email -> user id."""

    async def resolve_sprint(self, value: str, project_id: str) -> str:
        """'current', 'next', a name, a number, an id or id prefix -> sprint id."""

    async def resolve_document(self, value: str) -> str:
        """An exact id, an id prefix, or an exact title -> document id."""

    async def me_id(self) -> str:
        """The calling user's id."""

    # -- issues ------------------------------------------------------------

    async def get_issue(self, identifier: str) -> dict: ...

    async def list_issues(
        self,
        *,
        project_id: str | None,
        team_id: str | None,
        statuses: list[str] | None,
        priorities: list[str] | None,
        assignee_id: str | None,
        label: str | None,
        search: str | None,
        sprint_id: str | None,
        parent_id: str | None,
        limit: int,
        sort_by: str,
        order: str,
        skip: int | None = None,
    ) -> list: ...

    async def list_ready_issues(
        self, *, project_id: str | None, team_id: str | None,
        mine: bool, include_assigned: bool, limit: int,
    ) -> list: ...

    async def create_issue(
        self, project_id: str, *, title: str, description: str | None, status: str,
        priority: str, issue_type: str, estimate: int | None, parent_id: str | None,
    ) -> dict: ...

    async def update_issue(self, issue_id: str, **fields) -> dict:
        """Only the passed ``fields`` change. Wire-form values (status/
        priority as strings, ``sprint_id=None`` to unschedule,
        ``assignee_id=None`` to unassign)."""

    async def create_comment(self, issue_id: str, content: str) -> dict: ...

    async def list_comments(self, issue_id: str, limit: int) -> list: ...

    async def list_sub_issues(self, issue_id: str, limit: int) -> list: ...

    async def list_relations(self, issue_id: str) -> list: ...

    async def create_relation(self, issue_id: str, related_issue_id: str, relation_type: str) -> dict: ...

    async def delete_relation(self, issue_id: str, relation_id: str) -> None: ...

    async def add_label(self, issue_id: str, label_id: str) -> None: ...

    async def remove_label(self, issue_id: str, label_id: str) -> None: ...

    async def list_labels(self, team_id: str, limit: int) -> list: ...

    # -- documents --------------------------------------------------------

    async def list_documents(
        self, team_id: str, *, project_id: str | None, search: str | None, limit: int,
    ) -> list: ...

    async def get_document(self, document_id: str) -> dict: ...

    async def list_document_comments(self, document_id: str) -> list: ...

    async def list_document_issues(self, document_id: str) -> list: ...

    async def create_document(
        self, team_id: str, *, title: str, content: str | None, icon: str | None,
        project_id: str | None,
    ) -> dict: ...

    async def update_document(self, document_id: str, **fields) -> dict: ...

    async def link_document(self, document_id: str, issue_id: str) -> None: ...

    async def unlink_document(self, document_id: str, issue_id: str) -> None: ...

    # -- sprints ------------------------------------------------------------

    async def get_current_sprint(self, project_id: str) -> dict: ...

    async def list_sprints(self, project_id: str, status: str | None) -> list: ...

    async def get_sprint(self, sprint_id: str) -> dict: ...

    async def close_sprint(self, sprint_id: str) -> dict: ...

    async def list_transactions(self, sprint_id: str) -> list: ...

    # -- rituals ------------------------------------------------------------

    async def list_rituals(self, project_id: str, include_inactive: bool = False) -> list: ...

    async def get_limbo_status(self, project_id: str) -> dict: ...

    async def attest_ritual(self, ritual_id: str, project_id: str, note: str | None) -> dict: ...

    async def complete_gate_ritual(self, ritual_id: str, project_id: str, note: str | None) -> dict: ...

    async def get_pending_issue_rituals(self, issue_id: str) -> dict: ...

    async def attest_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str | None) -> dict: ...

    async def complete_gate_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str | None) -> dict: ...

    # -- projects / activity ------------------------------------------------

    async def list_projects(self, team_id: str, limit: int) -> list: ...

    async def get_project(self, project_id: str) -> dict: ...

    async def list_activities(self, team_id: str, *, limit: int, project_id: str | None) -> list: ...
