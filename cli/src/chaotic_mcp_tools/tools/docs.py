"""Document tools."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import TEAM_FIELD_DESC
from ..errors import ToolInputError
from ..shapes import COMPACT_DOCUMENT_FIELDS, DETAIL_DOC_DESC, listing


async def doc_list(
    backend: Backend,
    search: Annotated[str | None, Field(description="Search documents by title.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to scope to. Defaults to the current project.")
    ] = None,
    all_projects: Annotated[
        bool,
        Field(description="List every document in the team instead of just the current/given project.")
    ] = False,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    limit: Annotated[int, Field(description="Maximum number of documents to return.", ge=1, le=500)] = 50,
    detail: Annotated[bool, Field(description=DETAIL_DOC_DESC)] = False,
) -> dict:
    """List documents (project-scoped by default, team-wide with all_projects=true).

    Compact rows plus `count` and `truncated`; detail=true for full rows.
    """
    if all_projects and not project:
        project_id = None
        team_id = await backend.resolve_team(team)
    else:
        project_id, team_id = await backend.optional_project(project, team)
    documents = await backend.list_documents(team_id, project_id=project_id, search=search, limit=limit + 1)
    return listing("documents", documents, limit, COMPACT_DOCUMENT_FIELDS, detail)


async def doc_view(
    backend: Backend,
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
) -> dict:
    """Show a document's content, comments, and linked issues."""
    resolved_id = await backend.resolve_document(document_id)
    d = dict(await backend.get_document(resolved_id))
    d["comments"] = list(await backend.list_document_comments(d["id"]) or [])
    d["linked_issues"] = list(await backend.list_document_issues(d["id"]) or [])
    return d


async def doc_revisions(
    backend: Backend,
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    limit: Annotated[int, Field(description="Maximum number of revisions to return.", ge=1, le=500)] = 20,
) -> dict:
    """List a document's revision history, newest first (CHT-1335).

    Every doc_update that changes the title or content snapshots the
    PREVIOUS text as a revision, so this is what you check before
    overwriting a document you did not write, and how you recover text
    you clobbered. Rows are light (version, title, author, created_at);
    doc_revision fetches one snapshot's full content.
    """
    resolved_id = await backend.resolve_document(document_id)
    rows = await backend.list_document_revisions(resolved_id, limit=limit + 1)
    return listing("revisions", rows, limit, (), True)


async def doc_revision(
    backend: Backend,
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    version: Annotated[int, Field(description="Revision version number, from doc_revisions.", ge=1)],
) -> dict:
    """Fetch one revision snapshot of a document: its full title and content at that version."""
    resolved_id = await backend.resolve_document(document_id)
    return await backend.get_document_revision(resolved_id, version)


async def doc_create(
    backend: Backend,
    title: Annotated[str, Field(description="Document title.")],
    content: Annotated[str | None, Field(description="Document body (markdown).")] = None,
    icon: Annotated[str | None, Field(description="Emoji or short icon label for the document.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to attach to. Omit for the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    is_global: Annotated[
        bool,
        Field(description="Create as a global/team-wide document instead of project-scoped.")
    ] = False,
) -> dict:
    """Create a new document."""
    if is_global and not project:
        project_id = None
        team_id = await backend.resolve_team(team)
    else:
        project_id, team_id = await backend.optional_project(project, team)
    return await backend.create_document(
        team_id, title=title, content=content, icon=icon, project_id=project_id,
    )


async def doc_update(
    backend: Backend,
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    title: Annotated[str | None, Field(description="New document title. Omit to leave unchanged.")] = None,
    content: Annotated[
        str | None,
        Field(description="New document body (markdown). Omit to leave unchanged.")
    ] = None,
    icon: Annotated[
        str | None,
        Field(description="New emoji or short icon label. Omit to leave unchanged.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Move the document to this project (id, key, or name).")
    ] = None,
    is_global: Annotated[
        bool,
        Field(description="Make the document global/team-wide by detaching it from its project.")
    ] = False,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Update a document's title, content, icon, or project.

    Only the fields you pass are changed; omitted ones are left alone.
    Editing the title or content appends a new revision snapshot, so the
    prior version stays readable in the document's history -- an edit
    never destroys what it replaced.
    """
    resolved_id = await backend.resolve_document(document_id)

    fields: dict = {}
    if title is not None:
        fields["title"] = title
    if content is not None:
        fields["content"] = content
    if icon is not None:
        fields["icon"] = icon
    if project and is_global:
        raise ToolInputError(
            "Pass either `project` (move to that project) or `is_global` "
            "(detach from any project), not both."
        )
    if project:
        # `team` is needed here and nowhere else in this tool: the document
        # itself is found by resolve_document (which already spans every
        # team the caller can reach), but naming a DESTINATION project needs
        # a team to disambiguate against (CHT-1351).
        project_id, _ = await backend.resolve_project(project, team)
        fields["project_id"] = project_id
    elif is_global:
        fields["project_id"] = None

    if not fields:
        raise ToolInputError(
            "No updates provided. Pass at least one of: title, content, "
            "icon, project, is_global."
        )

    return await backend.update_document(resolved_id, **fields)


async def doc_link(
    backend: Backend,
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    identifier: Annotated[str, Field(description="Issue identifier to link to, e.g. CHT-123.")],
) -> dict:
    """Link a document to an issue.

    The link shows up in doc_view's `linked_issues`. Linking a pair
    that's already linked is a no-op rather than an error.
    """
    resolved_id = await backend.resolve_document(document_id)
    iss = await backend.get_issue(identifier)
    await backend.link_document(resolved_id, iss["id"])
    return {
        "linked": True,
        "document_id": resolved_id,
        "issue_id": iss["id"],
        "identifier": identifier,
    }


async def doc_unlink(
    backend: Backend,
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    identifier: Annotated[str, Field(description="Issue identifier to unlink, e.g. CHT-123.")],
) -> dict:
    """Remove the link between a document and an issue.

    Removes only the association -- neither the document nor the issue
    is deleted.
    """
    resolved_id = await backend.resolve_document(document_id)
    iss = await backend.get_issue(identifier)
    await backend.unlink_document(resolved_id, iss["id"])
    return {
        "unlinked": True,
        "document_id": resolved_id,
        "issue_id": iss["id"],
        "identifier": identifier,
    }
