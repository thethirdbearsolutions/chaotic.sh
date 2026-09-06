"""``RestBackend`` -- the stdio MCP server's ``Backend`` (CHT-1374).

Implements ``chaotic_mcp_tools.Backend`` over ``cli.client.Client``: every
data method is one REST call, every scope method is the CLI's own
resolver (``cli.main.resolve_project_id`` and friends) or profile getter
(``get_current_team``/``get_current_project``). Auth/context therefore
comes from the exact same CHAOTIC_PROFILE / CHAOTIC_HOME / config.json
resolution the CLI itself uses; whatever ``chaotic status`` reports is
what the MCP server sees.

Two mechanics worth knowing:

* **Late binding to ``cli.main``.** Like every ``cli.commands.*`` module,
  this one reaches the client and the resolvers through
  ``sys.modules['cli.main']`` at call time, not at import time --
  ``cli.main`` is only fully initialised once the CLI has started, and
  the test suite patches attributes on that module object.
* **Sync client, async protocol.** ``Client`` is synchronous httpx and
  every CLI command depends on it staying that way; the tool bodies are
  coroutines (mcp 2.x runs ``async def`` handlers on the event loop and
  ``def`` ones on worker threads -- one kind, everywhere). ``_call``
  bridges the two with ``anyio.to_thread.run_sync`` so a slow request
  never blocks the server's event loop, and translates the client's
  failure modes into the shared exception types the tool boundary
  understands: ``APIError`` -> ``BackendError`` (structured detail and
  status preserved), ``click.ClickException`` from a resolver ->
  ``ToolInputError``, httpx transport failures -> ``TransportError`` with
  the same actionable sentences the CLI's ``handle_error`` prints.
"""
from __future__ import annotations

import functools
import sys

import anyio
import click
import httpx

from chaotic_mcp_tools import BackendError, Capabilities, ToolInputError, TransportError

from .client import APIError


def _main():
    """Late-bind to cli.main (mirrors every other commands/*.py module)."""
    return sys.modules['cli.main']


class RestBackend:
    capabilities = Capabilities(team_param=False)

    # -- plumbing ---------------------------------------------------------

    @staticmethod
    def _client():
        return _main().client

    @staticmethod
    def _require_auth() -> None:
        m = _main()
        if not m.get_token() and not m.get_api_key():
            raise ToolInputError(
                "Not authenticated. Run 'chaotic auth login' or 'chaotic auth set-key' "
                "first, or 'chaotic quickstart' to get set up."
            )

    def _require_team(self) -> str:
        self._require_auth()
        team_id = _main().get_current_team()
        if not team_id:
            raise ToolInputError(
                "No team selected. Run 'chaotic team list' to see available teams, "
                "or 'chaotic quickstart' if you don't have one yet."
            )
        return team_id

    async def _call(self, fn, *args, **kwargs):
        """Run a blocking client/resolver call off the event loop and
        translate its failures."""
        self._require_auth()
        try:
            return await anyio.to_thread.run_sync(functools.partial(fn, *args, **kwargs))
        except APIError as e:
            raise BackendError(str(e), e.status_code, getattr(e, "detail", None)) from e
        except click.ClickException as e:
            raise ToolInputError(e.format_message()) from e
        except httpx.ConnectError as e:
            raise TransportError(
                f"Could not connect to server at {_main().get_api_url()}. Is the server running?",
                "connect_error",
            ) from e
        except httpx.TimeoutException as e:
            raise TransportError(
                "Request timed out. The server may be overloaded or unreachable.", "timeout",
            ) from e
        except httpx.HTTPError as e:
            raise TransportError(f"Network error: {e}", "network_error") from e

    # -- scope / context ----------------------------------------------------

    async def resolve_team(self, team: str | None) -> str:
        # `team` is the HTTP-only disambiguator; a CLI profile has one team.
        return self._require_team()

    async def resolve_project(self, project: str | None, team: str | None) -> tuple[str, str]:
        team_id = self._require_team()
        if project:
            return await self._call(_main().resolve_project_id, project), team_id
        project_id = _main().get_current_project()
        if not project_id:
            raise ToolInputError(
                "No project selected. Pass `project` explicitly, or run "
                "'chaotic project use <project_id>' in the CLI first."
            )
        return project_id, team_id

    async def optional_project(self, project: str | None, team: str | None) -> tuple[str | None, str]:
        team_id = self._require_team()
        if project:
            return await self._call(_main().resolve_project_id, project), team_id
        return _main().get_current_project(), team_id

    async def team_for_project(self, project_id: str | None) -> str:
        # The profile's team is the only team this server can see.
        return self._require_team()

    async def resolve_assignee(self, value: str, team_id: str) -> str:
        return await self._call(_main().resolve_assignee_id, value)

    async def resolve_sprint(self, value: str, project_id: str) -> str:
        return await self._call(_main().resolve_sprint_id, value, project_id)

    async def resolve_document(self, value: str) -> str:
        team_id = self._require_team()
        return await self._call(_main().resolve_document_id, value, team_id)

    async def me_id(self) -> str:
        return (await self._call(self._client().get_me))["id"]

    # -- issues --------------------------------------------------------------

    async def get_issue(self, identifier: str) -> dict:
        return await self._call(self._client().get_issue_by_identifier, identifier)

    async def list_issues(
        self, *, project_id, team_id, statuses, priorities, assignee_id, label, search,
        sprint_id, parent_id, limit, sort_by, order, skip=None,
    ) -> list:
        kwargs = dict(
            project_id=project_id,
            team_id=team_id,
            status=",".join(statuses) if statuses else None,
            priority=",".join(priorities) if priorities else None,
            assignee_id=assignee_id,
            label=label,
            search=search,
            sprint_id=sprint_id,
            parent_id=parent_id,
            limit=limit,
            sort_by=sort_by,
            order=order,
        )
        if skip is not None:
            kwargs["skip"] = skip
        return await self._call(self._client().get_issues, **kwargs)

    async def list_ready_issues(self, *, project_id, team_id, mine, include_assigned, limit) -> list:
        return await self._call(
            self._client().get_ready_issues,
            project_id=project_id, team_id=team_id, mine=mine,
            include_assigned=include_assigned, limit=limit,
        )

    async def create_issue(
        self, project_id, *, title, description, status, priority, issue_type, estimate, parent_id,
    ) -> dict:
        data = {
            "description": description,
            "status": status,
            "priority": priority,
            "issue_type": issue_type,
        }
        if estimate is not None:
            data["estimate"] = estimate
        if parent_id:
            data["parent_id"] = parent_id
        return await self._call(self._client().create_issue, project_id, title, **data)

    async def update_issue(self, issue_id: str, **fields) -> dict:
        return await self._call(self._client().update_issue, issue_id, **fields)

    async def create_comment(self, issue_id: str, content: str) -> dict:
        return await self._call(self._client().create_comment, issue_id, content)

    async def list_comments(self, issue_id: str, limit: int) -> list:
        return await self._call(self._client().get_comments, issue_id, limit=limit)

    async def list_sub_issues(self, issue_id: str, limit: int) -> list:
        return await self._call(self._client().get_sub_issues, issue_id, limit=limit)

    async def list_relations(self, issue_id: str) -> list:
        return await self._call(self._client().get_relations, issue_id)

    async def create_relation(self, issue_id: str, related_issue_id: str, relation_type: str) -> dict:
        return await self._call(self._client().create_relation, issue_id, related_issue_id, relation_type)

    async def delete_relation(self, issue_id: str, relation_id: str) -> None:
        await self._call(self._client().delete_relation, issue_id, relation_id)

    async def add_label(self, issue_id: str, label_id: str) -> None:
        await self._call(self._client().add_label_to_issue, issue_id, label_id)

    async def remove_label(self, issue_id: str, label_id: str) -> None:
        await self._call(self._client().remove_label_from_issue, issue_id, label_id)

    async def list_labels(self, team_id: str, limit: int) -> list:
        return await self._call(self._client().get_labels, team_id, limit=limit)

    # -- documents ----------------------------------------------------------

    async def list_documents(self, team_id: str, *, project_id, search, limit) -> list:
        return await self._call(
            self._client().get_documents, team_id, project_id=project_id, search=search, limit=limit,
        )

    async def get_document(self, document_id: str) -> dict:
        return await self._call(self._client().get_document, document_id)

    async def list_document_comments(self, document_id: str) -> list:
        return await self._call(self._client().get_document_comments, document_id)

    async def list_document_issues(self, document_id: str) -> list:
        return await self._call(self._client().get_document_issues, document_id)

    async def create_document(self, team_id: str, *, title, content, icon, project_id) -> dict:
        return await self._call(
            self._client().create_document, team_id, title,
            content=content, icon=icon, project_id=project_id,
        )

    async def update_document(self, document_id: str, **fields) -> dict:
        return await self._call(self._client().update_document, document_id, **fields)

    async def link_document(self, document_id: str, issue_id: str) -> None:
        await self._call(self._client().link_document_to_issue, document_id, issue_id)

    async def unlink_document(self, document_id: str, issue_id: str) -> None:
        await self._call(self._client().unlink_document_from_issue, document_id, issue_id)

    # -- sprints --------------------------------------------------------------

    async def get_current_sprint(self, project_id: str) -> dict:
        return await self._call(self._client().get_current_sprint, project_id)

    async def list_sprints(self, project_id: str, status: str | None) -> list:
        return await self._call(self._client().get_sprints, project_id, status=status)

    async def get_sprint(self, sprint_id: str) -> dict:
        return await self._call(self._client().get_sprint, sprint_id)

    async def close_sprint(self, sprint_id: str) -> dict:
        return await self._call(self._client().close_sprint, sprint_id)

    async def list_transactions(self, sprint_id: str) -> list:
        return await self._call(self._client().get_sprint_transactions, sprint_id)

    # -- rituals --------------------------------------------------------------

    async def list_rituals(self, project_id: str, include_inactive: bool = False) -> list:
        if include_inactive:
            return await self._call(self._client().get_rituals, project_id, include_inactive=True)
        return await self._call(self._client().get_rituals, project_id)

    async def get_limbo_status(self, project_id: str) -> dict:
        return await self._call(self._client().get_limbo_status, project_id)

    async def attest_ritual(
        self, ritual_id: str, project_id: str, note: str | None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return await self._call(
            self._client().attest_ritual, ritual_id, project_id, note, document_id=document_id, url=url,
        )

    async def complete_gate_ritual(
        self, ritual_id: str, project_id: str, note: str | None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return await self._call(
            self._client().complete_gate_ritual, ritual_id, project_id, note, document_id=document_id, url=url,
        )

    async def get_pending_issue_rituals(self, issue_id: str) -> dict:
        return await self._call(self._client().get_pending_issue_rituals, issue_id)

    async def attest_ritual_for_issue(
        self, ritual_id: str, issue_id: str, note: str | None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return await self._call(
            self._client().attest_ritual_for_issue, ritual_id, issue_id, note, document_id=document_id, url=url,
        )

    async def complete_gate_ritual_for_issue(
        self, ritual_id: str, issue_id: str, note: str | None,
        document_id: str | None = None, url: str | None = None,
    ) -> dict:
        return await self._call(
            self._client().complete_gate_ritual_for_issue, ritual_id, issue_id, note,
            document_id=document_id, url=url,
        )

    # -- projects / activity ----------------------------------------------------

    async def list_projects(self, team_id: str, limit: int) -> list:
        return await self._call(self._client().get_projects, team_id, limit=limit)

    async def server_info(self) -> dict:
        # /api/version needs no credential, but this goes through _call
        # like every other tool so an unconfigured profile fails the same
        # way everywhere (one error shape, CHT-1401); `chaotic system
        # status` is the credential-free way to ask the same question.
        return await self._call(self._client().get_version)

    async def get_project(self, project_id: str) -> dict:
        return await self._call(self._client().get_project, project_id)

    # -- revision history (CHT-1335) ------------------------------------------

    async def list_document_revisions(self, document_id: str, *, limit: int) -> list:
        return list(await self._call(self._client().get_document_revisions, document_id, limit=limit) or [])

    async def get_document_revision(self, document_id: str, version: int) -> dict:
        return await self._call(self._client().get_document_revision, document_id, version)

    async def list_issue_description_revisions(self, issue_id: str, *, limit: int) -> list:
        return list(await self._call(self._client().get_issue_description_revisions, issue_id, limit=limit) or [])

    async def get_issue_description_revision(self, issue_id: str, version: int) -> dict:
        return await self._call(self._client().get_issue_description_revision, issue_id, version)

    # -- inbox (CHT-1338) ------------------------------------------------------

    async def list_inbox(self, team_id: str | None, *, unread: bool, limit: int) -> list:
        return await self._call(self._client().get_inbox, team_id, unread=unread, limit=limit)

    async def mark_inbox_read(self, entry_id: str) -> dict:
        return await self._call(self._client().mark_inbox_read, entry_id)

    async def mark_all_inbox_read(self, team_id: str | None) -> dict:
        return await self._call(self._client().mark_all_inbox_read, team_id)

    async def list_activities(self, team_id: str, *, limit: int, project_id) -> list:
        return await self._call(
            self._client().get_team_activities, team_id, limit=limit, project_id=project_id,
        )
