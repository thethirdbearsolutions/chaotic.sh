"""``InProcessBackend`` -- the remote MCP server's ``Backend`` (CHT-1374).

Implements ``chaotic_mcp_tools.Backend`` over ``app.api`` directly: a
hosted server obviously can't loop back through itself over HTTP, so every
data method calls the API-layer function the corresponding REST route
would have, as the user ``auth.py`` resolved from the caller's API key
(``context.current_mcp_user``). Those functions return their response
schema by construction (CHT-1348; ADR-0005), so what an adapter method
hands back after ``model_dump(mode="json")`` is exactly what an HTTP
client sees after ``response_model`` -- filtered to the schema's fields,
enums in wire form. Nothing here ever dumps an ORM row, and
tests/test_api_return_contract.py fails if an API function reachable from
this module stops declaring a schema return type.

Scope comes from ``scope.py`` (an API key's user may belong to several
teams/projects, hence the HTTP-only ``team`` parameter this backend
advertises via ``Capabilities(team_param=True)``).

Error translation happens at this edge, via ``_translated``: an
``HTTPException`` becomes a ``BackendError`` carrying the same structured
``detail`` and status a REST caller would see; a pydantic
``ValidationError`` raised while building a request schema becomes the
same value-blind 422 payload the REST handler produces. The tool bodies
and the shared boundary never see FastAPI or pydantic exceptions.
"""
from __future__ import annotations

import functools

from fastapi import HTTPException
from pydantic import ValidationError as PydanticValidationError

from chaotic_mcp_tools import BackendError, Capabilities, ToolInputError, backend_error_payload

from app.api import documents as documents_api
from app.api import inbox as inbox_api
from app.api import issues as issues_api
from app.api import labels as labels_api
from app.api import projects as projects_api
from app.api import rituals as rituals_api
from app.api import sprints as sprints_api
from app.enums import IssuePriority, IssueRelationType, IssueStatus, IssueType, SprintStatus
from app.mcp_server import scope
from app.mcp_server.context import get_current_mcp_user
from app.schemas.document import DocumentCreate, DocumentUpdate
from app.schemas.issue import (
    AddLabelRequest, IssueCommentCreate, IssueCreate, IssueRelationCreate, IssueUpdate,
)
from app.schemas.ritual import RitualAttestationCreate
from app.services.project_service import ProjectService


def translate_http_exception(e: HTTPException) -> BackendError:
    """The REST error a client would have seen, as a BackendError.
    Governance 409s carry a structured dict with `error_code` and
    `message`; string details become the message; validation lists are
    kept for the shared validation payload."""
    detail = e.detail
    message = None if isinstance(detail, (dict, list)) else str(detail)
    return BackendError(message, e.status_code, detail)


def translate_validation_error(e: PydanticValidationError) -> BackendError:
    """In-process there is no 422 handler to strip `input`; build the same
    value-blind loc/msg list the stdio side gets over REST."""
    return BackendError(
        None, 422,
        [{"loc": list(err.get("loc", ())), "msg": err.get("msg", "")} for err in e.errors()],
    )


def http_error_payload(e: HTTPException) -> dict:
    """The envelope's inner dict for an HTTPException (the two-step the
    boundary performs, exposed for tests that pin the shape)."""
    return backend_error_payload(translate_http_exception(e))


def _translated(fn):
    @functools.wraps(fn)
    async def wrapper(self, *args, **kwargs):
        try:
            return await fn(self, *args, **kwargs)
        except HTTPException as e:
            raise translate_http_exception(e) from e
        except PydanticValidationError as e:
            raise translate_validation_error(e) from e
    return wrapper


def _dump(obj):
    """Wire form: response schemas -> dicts (ADR-0005); dicts pass through
    (create_relation may return one already); None stays None."""
    if obj is None or isinstance(obj, (dict, list, str, int, float, bool)):
        return obj
    return obj.model_dump(mode="json")


def _dump_list(rows) -> list:
    return [_dump(r) for r in (rows or [])]


async def _team_id_for_project(project_id: str) -> str:
    project = await ProjectService().get_by_id(project_id)
    if not project:
        raise ToolInputError("Project not found.")
    return project.team_id


async def _resolve_document_id(user, document_id: str) -> str:
    """Resolve an exact document id, or fuzzy-match an id-prefix/exact
    title across every team this API key's user can access -- the
    in-process counterpart of the CLI's ``resolve_document_id``.
    """
    from app.services.document_service import DocumentService
    from app.services.team_service import TeamService

    doc_service = DocumentService()
    exact = await doc_service.get_by_id(document_id)
    if exact:
        return exact.id

    if user.is_agent:
        team_ids = [user.agent_team_id] if user.agent_team_id else []
        if not team_ids and user.agent_project_id:
            team_id = await _team_id_for_project(user.agent_project_id)
            team_ids = [team_id]
    else:
        team_ids = [t.id for t in await TeamService().get_user_teams(user.id)]

    candidates = []
    lowered = document_id.lower()
    for team_id in team_ids:
        for doc in await doc_service.list_by_team(team_id, limit=1000):
            if doc.id.startswith(document_id) or doc.title.lower() == lowered:
                candidates.append(doc)

    if len(candidates) == 1:
        return candidates[0].id
    if not candidates:
        raise ToolInputError(f"No document found matching '{document_id}'.")
    raise ToolInputError(f"Multiple documents match '{document_id}'; pass the exact document id.")


class InProcessBackend:
    capabilities = Capabilities(team_param=True)

    @property
    def _user(self):
        return get_current_mcp_user()

    # -- scope / context ----------------------------------------------------

    async def resolve_team(self, team: str | None) -> str:
        return await scope.resolve_team(self._user, team)

    async def resolve_project(self, project: str | None, team: str | None) -> tuple[str, str]:
        return await scope.resolve_project(self._user, project, team)

    async def optional_project(self, project: str | None, team: str | None) -> tuple[str | None, str]:
        # No profile to fall back on: the default project is the single
        # accessible one, or the caller is asked to pass `project`.
        return await scope.resolve_project(self._user, project, team)

    async def team_for_project(self, project_id: str) -> str:
        return await _team_id_for_project(project_id)

    async def resolve_assignee(self, value: str, team_id: str) -> str:
        return await scope.resolve_assignee(self._user, team_id, value)

    async def resolve_sprint(self, value: str, project_id: str) -> str:
        return await scope.resolve_sprint(project_id, value)

    async def resolve_document(self, value: str) -> str:
        return await _resolve_document_id(self._user, value)

    async def me_id(self) -> str:
        return self._user.id

    # -- issues --------------------------------------------------------------

    @_translated
    async def get_issue(self, identifier: str) -> dict:
        return _dump(await issues_api.get_issue_by_identifier(identifier, self._user))

    @_translated
    async def list_issues(
        self, *, project_id, team_id, statuses, priorities, assignee_id, label, search,
        sprint_id, parent_id, limit, sort_by, order, skip=None,
    ) -> list:
        extra = {} if skip is None else {"skip": skip}
        rows = await issues_api.list_issues(
            current_user=self._user,
            project_id=project_id,
            team_id=team_id,
            statuses=[IssueStatus(s) for s in statuses] if statuses else None,
            priorities=[IssuePriority(p) for p in priorities] if priorities else None,
            assignee_id=assignee_id,
            labels=[label] if label else None,
            search=search,
            sprint_id=sprint_id,
            parent_id=parent_id,
            limit=limit,
            sort_by=sort_by,
            order=order,
            **extra,
        )
        return _dump_list(rows)

    @_translated
    async def list_ready_issues(self, *, project_id, team_id, mine, include_assigned, limit) -> list:
        rows = await issues_api.list_ready_issues(
            current_user=self._user,
            project_id=project_id,
            team_id=team_id,
            mine=mine,
            include_assigned=include_assigned,
            limit=limit,
        )
        return _dump_list(rows)

    @_translated
    async def create_issue(
        self, project_id, *, title, description, status, priority, issue_type, estimate, parent_id,
    ) -> dict:
        issue_in = IssueCreate(
            title=title,
            description=description,
            status=IssueStatus(status),
            priority=IssuePriority(priority),
            issue_type=IssueType(issue_type),
            estimate=estimate,
            parent_id=parent_id,
        )
        created = await issues_api.create_issue(project_id=project_id, issue_in=issue_in, current_user=self._user)
        return _dump(created)

    @_translated
    async def update_issue(self, issue_id: str, **fields) -> dict:
        # Build with only the caller's fields set: the service keys off
        # model_dump(exclude_unset=True).
        if "status" in fields:
            fields["status"] = IssueStatus(fields["status"])
        if "priority" in fields:
            fields["priority"] = IssuePriority(fields["priority"])
        updated = await issues_api.update_issue(
            issue_id=issue_id, issue_in=IssueUpdate(**fields), current_user=self._user,
        )
        return _dump(updated)

    @_translated
    async def create_comment(self, issue_id: str, content: str) -> dict:
        comment = await issues_api.create_comment(
            issue_id=issue_id, comment_in=IssueCommentCreate(content=content), current_user=self._user,
        )
        return _dump(comment)

    @_translated
    async def list_comments(self, issue_id: str, limit: int) -> list:
        return _dump_list(await issues_api.list_comments(issue_id, self._user, limit=limit))

    @_translated
    async def list_sub_issues(self, issue_id: str, limit: int) -> list:
        return _dump_list(await issues_api.list_sub_issues(issue_id, self._user, limit=limit))

    @_translated
    async def list_relations(self, issue_id: str) -> list:
        return _dump_list(await issues_api.list_relations(issue_id=issue_id, current_user=self._user))

    @_translated
    async def create_relation(self, issue_id: str, related_issue_id: str, relation_type: str) -> dict:
        created = await issues_api.create_relation(
            issue_id=issue_id,
            relation_in=IssueRelationCreate(
                related_issue_id=related_issue_id,
                relation_type=IssueRelationType(relation_type),
            ),
            current_user=self._user,
        )
        return _dump(created)

    @_translated
    async def delete_relation(self, issue_id: str, relation_id: str) -> None:
        await issues_api.delete_relation(issue_id=issue_id, relation_id=relation_id, current_user=self._user)

    @_translated
    async def add_label(self, issue_id: str, label_id: str) -> None:
        await issues_api.add_label_to_issue(
            issue_id=issue_id, body=AddLabelRequest(label_id=label_id), current_user=self._user,
        )

    @_translated
    async def remove_label(self, issue_id: str, label_id: str) -> None:
        await issues_api.remove_label_from_issue(issue_id=issue_id, label_id=label_id, current_user=self._user)

    @_translated
    async def list_labels(self, team_id: str, limit: int) -> list:
        return _dump_list(await labels_api.list_labels(team_id=team_id, current_user=self._user, limit=limit))

    # -- documents ----------------------------------------------------------

    @_translated
    async def list_documents(self, team_id: str, *, project_id, search, limit) -> list:
        rows = await documents_api.list_documents(
            team_id=team_id, current_user=self._user, project_id=project_id, search=search, limit=limit,
        )
        return _dump_list(rows)

    @_translated
    async def get_document(self, document_id: str) -> dict:
        return _dump(await documents_api.get_document(document_id, self._user))

    @_translated
    async def list_document_comments(self, document_id: str) -> list:
        return _dump_list(await documents_api.list_comments(document_id, self._user))

    @_translated
    async def list_document_issues(self, document_id: str) -> list:
        return _dump_list(await documents_api.get_document_issues(document_id, self._user))

    @_translated
    async def create_document(self, team_id: str, *, title, content, icon, project_id) -> dict:
        document_in = DocumentCreate(title=title, content=content, icon=icon, project_id=project_id)
        created = await documents_api.create_document(
            team_id=team_id, document_in=document_in, current_user=self._user,
        )
        return _dump(created)

    @_translated
    async def update_document(self, document_id: str, **fields) -> dict:
        # Only the caller's fields set: DocumentService.update() keys off
        # model_dump(exclude_unset=True), and that same dict decides
        # whether the edit snapshots a new revision.
        updated = await documents_api.update_document(
            document_id=document_id, document_in=DocumentUpdate(**fields), current_user=self._user,
        )
        return _dump(updated)

    @_translated
    async def link_document(self, document_id: str, issue_id: str) -> None:
        await documents_api.link_document_to_issue(
            document_id=document_id, issue_id=issue_id, current_user=self._user,
        )

    @_translated
    async def unlink_document(self, document_id: str, issue_id: str) -> None:
        await documents_api.unlink_document_from_issue(
            document_id=document_id, issue_id=issue_id, current_user=self._user,
        )

    # -- sprints --------------------------------------------------------------

    @_translated
    async def get_current_sprint(self, project_id: str) -> dict:
        return _dump(await sprints_api.get_current_sprint(project_id=project_id, current_user=self._user))

    @_translated
    async def list_sprints(self, project_id: str, status: str | None) -> list:
        rows = await sprints_api.list_sprints(
            project_id=project_id,
            current_user=self._user,
            sprint_status=SprintStatus(status) if status else None,
        )
        return _dump_list(rows)

    @_translated
    async def get_sprint(self, sprint_id: str) -> dict:
        return _dump(await sprints_api.get_sprint(sprint_id=sprint_id, current_user=self._user))

    @_translated
    async def close_sprint(self, sprint_id: str) -> dict:
        return _dump(await sprints_api.close_sprint(sprint_id=sprint_id, current_user=self._user))

    @_translated
    async def list_transactions(self, sprint_id: str) -> list:
        return _dump_list(await sprints_api.list_transactions(sprint_id=sprint_id, current_user=self._user))

    # -- rituals --------------------------------------------------------------

    @_translated
    async def list_rituals(self, project_id: str, include_inactive: bool = False) -> list:
        rows = await rituals_api.list_rituals(
            project_id=project_id, current_user=self._user, include_inactive=include_inactive,
        )
        return _dump_list(rows)

    @_translated
    async def get_limbo_status(self, project_id: str) -> dict:
        status = await rituals_api.get_limbo_status(project_id=project_id, current_user=self._user)
        return _dump(status) if status else {}

    @_translated
    async def attest_ritual(self, ritual_id: str, project_id: str, note: str | None) -> dict:
        result = await rituals_api.attest_ritual(
            ritual_id=ritual_id, attestation_in=RitualAttestationCreate(note=note),
            current_user=self._user, project_id=project_id,
        )
        return _dump(result)

    @_translated
    async def complete_gate_ritual(self, ritual_id: str, project_id: str, note: str | None) -> dict:
        result = await rituals_api.complete_gate_ritual(
            ritual_id=ritual_id, attestation_in=RitualAttestationCreate(note=note),
            current_user=self._user, project_id=project_id,
        )
        return _dump(result)

    @_translated
    async def get_pending_issue_rituals(self, issue_id: str) -> dict:
        return _dump(await rituals_api.get_pending_ticket_rituals(issue_id=issue_id, current_user=self._user))

    @_translated
    async def attest_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str | None) -> dict:
        result = await rituals_api.attest_ritual_for_issue(
            ritual_id=ritual_id, issue_id=issue_id,
            attestation_in=RitualAttestationCreate(note=note), current_user=self._user,
        )
        return _dump(result)

    @_translated
    async def complete_gate_ritual_for_issue(self, ritual_id: str, issue_id: str, note: str | None) -> dict:
        result = await rituals_api.complete_gate_ritual_for_issue(
            ritual_id=ritual_id, issue_id=issue_id,
            attestation_in=RitualAttestationCreate(note=note), current_user=self._user,
        )
        return _dump(result)

    # -- projects / activity ----------------------------------------------------

    @_translated
    async def list_projects(self, team_id: str, limit: int) -> list:
        return _dump_list(await projects_api.list_projects(team_id=team_id, current_user=self._user, limit=limit))

    @_translated
    async def get_project(self, project_id: str) -> dict:
        return _dump(await projects_api.get_project(project_id=project_id, current_user=self._user))

    # -- revision history (CHT-1335) ------------------------------------------

    @_translated
    async def list_document_revisions(self, document_id: str, *, limit: int) -> list:
        return _dump_list(await documents_api.list_document_revisions(
            document_id=document_id, current_user=self._user, skip=0, limit=limit,
        ))

    @_translated
    async def get_document_revision(self, document_id: str, version: int) -> dict:
        return _dump(await documents_api.get_document_revision(
            document_id=document_id, version=version, current_user=self._user,
        ))

    @_translated
    async def list_issue_description_revisions(self, issue_id: str, *, limit: int) -> list:
        return _dump_list(await issues_api.list_description_revisions(
            issue_id=issue_id, current_user=self._user, skip=0, limit=limit,
        ))

    @_translated
    async def get_issue_description_revision(self, issue_id: str, version: int) -> dict:
        return _dump(await issues_api.get_description_revision(
            issue_id=issue_id, version=version, current_user=self._user,
        ))

    # -- inbox (CHT-1338) ------------------------------------------------------

    @_translated
    async def list_inbox(self, team_id: str, *, unread: bool, limit: int) -> list:
        return _dump_list(await inbox_api.list_inbox(
            current_user=self._user, team_id=team_id, unread=unread, skip=0, limit=limit,
        ))

    @_translated
    async def mark_inbox_read(self, entry_id: str) -> dict:
        return _dump(await inbox_api.mark_inbox_read(entry_id=entry_id, current_user=self._user))

    @_translated
    async def mark_all_inbox_read(self, team_id: str) -> dict:
        return _dump(await inbox_api.mark_all_inbox_read(current_user=self._user, team_id=team_id))

    @_translated
    async def list_activities(self, team_id: str, *, limit: int, project_id) -> list:
        rows = await issues_api.list_team_activities(
            team_id=team_id, current_user=self._user, limit=limit, project_id=project_id,
        )
        return _dump_list(rows)
