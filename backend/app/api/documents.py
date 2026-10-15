"""Document API routes."""
from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import (
    CurrentUser, accessible_project_ids, can_read_team_data,
)
from app.api.visibility import (
    can_see_label, can_see_project, not_found, project_filter_in_team_or_none, team_hidden,
    visible_document, visible_issue, visible_project_in_team, visible_sprint,
)
from app.api.issues import ensure_utc, issues_to_responses
from app.schemas.document import (
    DocumentCreate,
    DocumentUpdate,
    DocumentResponse,
    DocumentCommentCreate,
    DocumentCommentUpdate,
    DocumentCommentCreated,
    DocumentCommentResponse,
    DocumentLinkedResponse,
    DocumentRevisionListItem,
    DocumentRevisionResponse,
    LabelAddedResponse,
)
from app.schemas.issue import IssueResponse, LabelResponse
from app.services.document_service import DocumentService
from app.services.principals import fill_principals
from app.websocket import broadcast_comment_event, broadcast_document_event, broadcast_document_left_project
from app.services.team_service import TeamService
from app.services.sprint_service import SprintService
from app.services.project_service import ProjectService

router = APIRouter()


def get_author_name(doc, override: str | None = None) -> str | None:
    """Get author name, preferring explicit override if provided."""
    if override is not None:
        return override
    author = doc.author
    if author:
        return author.name
    return None


def build_document_response(doc, author_name: str | None = None) -> DocumentResponse:
    """Build a DocumentResponse with author_name from a Document model."""
    return DocumentResponse(
        id=doc.id,
        team_id=doc.team_id,
        author_id=doc.author_id,
        author_name=get_author_name(doc, author_name),
        project_id=doc.project_id,
        sprint_id=doc.sprint_id,
        title=doc.title,
        content=doc.content,
        icon=doc.icon,
        created_at=ensure_utc(doc.created_at),
        updated_at=ensure_utc(doc.updated_at),
        labels=[
            LabelResponse(
                id=label.id,
                team_id=label.team_id,
                name=label.name,
                color=label.color,
                description=label.description,
                created_at=ensure_utc(label.created_at),
            )
            for label in (doc.labels or [])
        ],
    )


async def _visible_sprint_or_400(current_user, sprint_id: str):
    """A sprint named in a document body: missing, or in a project the
    caller cannot see, is the same 400 (CHT-1785)."""
    sprint = await SprintService().get_by_id(sprint_id)
    project = await ProjectService().get_by_id(sprint.project_id) if sprint else None
    if not await can_see_project(current_user, project):
        raise not_found("Sprint not found", status.HTTP_400_BAD_REQUEST)
    return sprint


@writes
async def create_document(
    team_id: str,
    document_in: DocumentCreate,
    current_user: CurrentUser,
) -> DocumentResponse:
    """Create a new document.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``POST /teams/{team_id}/documents`` in nested.py.
    """
    document_service = DocumentService()

    # Authorize at the project level when the doc is project-scoped, so a
    # project-scoped agent can create docs in its own project —
    # can_read_team_data always rejects such agents (CHT-1273, CHT-1780).
    #
    # The body's project is pinned to the URL-path team in the same step
    # (CHT-1807): a project-scoped agent sees its own project whichever
    # team the URL names, so without the pin it could land a doc in
    # another team (CHT-1273 review CRITICAL). A project that is missing,
    # out of sight (CHT-1785) or of another team is the same 400.
    if document_in.project_id:
        await visible_project_in_team(
            current_user, document_in.project_id, team_id,
            detail="Project not found in this team", status_code=status.HTTP_400_BAD_REQUEST,
        )
    elif not await can_read_team_data(current_user, team_id):
        raise team_hidden()

    # Agents must include an emoji icon (CHT-631)
    if current_user.is_agent and not document_in.icon:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Documents created by agents must include an emoji icon (--icon)",
        )

    # Validate sprint belongs to document's project
    if document_in.sprint_id:
        sprint = await _visible_sprint_or_400(current_user, document_in.sprint_id)
        if document_in.project_id and sprint.project_id != document_in.project_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sprint must belong to the document's project",
            )

    document = await document_service.create(document_in, team_id, current_user.id)
    response = await fill_principals(build_document_response(document, author_name=current_user.name))
    await broadcast_document_event(team_id, "created", response.model_dump(mode="json"), project_id=document.project_id)
    return response


@reads
async def list_documents(
    team_id: str,
    current_user: CurrentUser,
    project_id: str | None = None,
    sprint_id: str | None = None,
    search: str | None = None,
    skip: int = 0,
    limit: int = 100,
) -> list[DocumentResponse]:
    """List documents for a team.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``GET /teams/{team_id}/documents`` in nested.py
    (project_id/sprint_id/search/skip/limit remain query filters there).
    """
    limit = min(limit, 10000)
    document_service = DocumentService()

    # A project filter is the project-confined path: project access is
    # enough, and a project the caller sees in another team lists nothing
    # (CHT-1807 pins it here rather than leaving it to list_filtered's
    # team filter). Without one the listing is team-wide, which a
    # project-scoped agent may not read (CHT-1780). A sprint filter alone
    # does not confine: a team-level document may carry any sprint.
    if project_id:
        project = await project_filter_in_team_or_none(current_user, project_id, team_id)
        if project is None:
            return []
    elif not await can_read_team_data(current_user, team_id):
        raise team_hidden()

    # Check sprint access if filtering by sprint
    # (a sprint the caller cannot see answers like a missing one, CHT-1785)
    if sprint_id:
        await visible_sprint(current_user, sprint_id)

    documents = await document_service.list_filtered(
        team_id=team_id,
        project_id=project_id,
        sprint_id=sprint_id,
        search=search,
        skip=skip,
        limit=limit,
    )

    return await fill_principals([build_document_response(doc) for doc in documents])


@router.get("/{document_id}", response_model=DocumentResponse)
@reads
async def get_document(document_id: str, current_user: CurrentUser) -> DocumentResponse:
    """Get document by ID."""

    # A document the caller cannot see answers like a missing one (CHT-1785).
    document = await visible_document(current_user, document_id)

    return await fill_principals(build_document_response(document))


@router.patch("/{document_id}", response_model=DocumentResponse)
@writes
async def update_document(
    document_id: str,
    document_in: DocumentUpdate,
    current_user: CurrentUser,
) -> DocumentResponse:
    """Update a document."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    document = await visible_document(current_user, document_id)

    # Check access to the target if moving the document (CHT-1780). An
    # explicit null -- what the CLI and MCP send for "make it team-level"
    # -- or "" makes the document team-level, which needs team access: a
    # project-scoped agent could otherwise publish its project's document
    # to the whole team. "" is normalised to null; it used to reach the
    # foreign key and fail as a 500. A project must be in the document's
    # team.
    if "project_id" in document_in.model_fields_set:
        if document_in.project_id == "":
            document_in.project_id = None
        if document_in.project_id != document.project_id:
            if document_in.project_id:
                # One the caller cannot see answers like a missing one
                # (CHT-1785).
                await visible_project_in_team(
                    current_user, document_in.project_id, document.team_id,
                    detail="Project not found in this team", status_code=status.HTTP_400_BAD_REQUEST,
                )
            elif not await can_read_team_data(current_user, document.team_id):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Not authorized to make this document team-level",
                )

    # Validate sprint belongs to document's project
    target_sprint_id = document_in.sprint_id if document_in.sprint_id is not None else document.sprint_id
    target_project_id = document_in.project_id if document_in.project_id is not None else document.project_id
    if target_sprint_id:
        sprint = await _visible_sprint_or_400(current_user, target_sprint_id)
        if target_project_id and sprint.project_id != target_project_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sprint must belong to the document's project",
            )

    old_project_id = document.project_id
    document = await document_service.update(document, document_in, current_user.id)
    response = await fill_principals(build_document_response(document))
    if old_project_id is not None and old_project_id != document.project_id:
        # Moved out of a project: the sockets confined to it drop it
        # (CHT-1840); the "updated" below reaches its new readers.
        await broadcast_document_left_project(
            document.team_id, {"id": document.id, "title": document.title}, project_id=old_project_id,
        )
    await broadcast_document_event(document.team_id, "updated", response.model_dump(mode="json"), project_id=document.project_id)
    return response


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_document(document_id: str, current_user: CurrentUser):
    """Delete a document."""
    document_service = DocumentService()
    team_service = TeamService()

    # Same access rule as reading it: project access for a project's
    # document, team access for a team-level one (CHT-1780). Out of scope
    # answers like missing (CHT-1785); the author/admin rule below is a 403.
    document = await visible_document(current_user, document_id)

    # Only author or team admin can delete
    is_admin = await team_service.is_team_admin(document.team_id, current_user.id)
    if document.author_id != current_user.id and not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only author or admin can delete document",
        )

    team_id = document.team_id
    document_data = {"id": document.id, "title": document.title}
    await document_service.delete(document, current_user.id)
    await broadcast_document_event(team_id, "deleted", document_data, project_id=document.project_id)


@router.get("/{document_id}/issues", response_model=list[IssueResponse])
@reads
async def get_document_issues(document_id: str, current_user: CurrentUser) -> list[IssueResponse]:
    """Get issues linked to a document."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    await visible_document(current_user, document_id)

    # A link does not grant access: only issues in projects this caller
    # can read (CHT-1780).
    linked = await document_service.get_linked_issues(document_id)
    allowed = await accessible_project_ids(current_user, [i.project_id for i in linked])
    issues = [i for i in linked if i.project_id in allowed]
    # Through the shared builder (CHT-1371): a hand-rolled IssueResponse
    # here had already drifted (no lease_expires_at) and missed the
    # resolved companions.
    return await issues_to_responses(issues)


@router.post("/{document_id}/issues/{issue_id}", response_model=DocumentLinkedResponse, status_code=status.HTTP_201_CREATED)
@writes
async def link_document_to_issue(
    document_id: str, issue_id: str, current_user: CurrentUser
) -> DocumentLinkedResponse:
    """Link a document to an issue."""
    document_service = DocumentService()

    # Both must be visible to the caller, each answering like a missing
    # row when it is not (CHT-1785). Both visible but in different teams
    # (a person in both) stays a 403.
    document = await visible_document(current_user, document_id)
    issue, issue_project = await visible_issue(current_user, issue_id)
    if issue_project.team_id != document.team_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Document and issue must be in the same team",
        )

    try:
        await document_service.link_issue(document_id, issue_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return DocumentLinkedResponse(message="Document linked to issue")


@router.delete("/{document_id}/issues/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def unlink_document_from_issue(
    document_id: str, issue_id: str, current_user: CurrentUser
) -> None:
    """Unlink a document from an issue."""
    document_service = DocumentService()

    # Both must be visible to the caller, each answering like a missing
    # row when it is not (CHT-1785). Both visible but in different teams
    # (a person in both) stays a 403.
    document = await visible_document(current_user, document_id)
    issue, issue_project = await visible_issue(current_user, issue_id)
    if issue_project.team_id != document.team_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Document and issue must be in the same team",
        )

    await document_service.unlink_issue(document_id, issue_id)


# ============================================================================
# Document Labels
# ============================================================================


@router.get("/{document_id}/labels", response_model=list[LabelResponse])
@reads
async def get_document_labels(document_id: str, current_user: CurrentUser):
    """Get labels for a document."""

    # A document the caller cannot see answers like a missing one (CHT-1785).
    document = await visible_document(current_user, document_id)

    return [
        LabelResponse(
            id=label.id,
            team_id=label.team_id,
            name=label.name,
            color=label.color,
            description=label.description,
            created_at=ensure_utc(label.created_at),
        )
        for label in (document.labels or [])
    ]


@router.post("/{document_id}/labels/{label_id}", response_model=LabelAddedResponse, status_code=status.HTTP_201_CREATED)
@writes
async def add_label_to_document(
    document_id: str, label_id: str, current_user: CurrentUser
):
    """Add a label to a document."""
    document_service = DocumentService()

    # Each answers like a missing row when the caller cannot see it
    # (CHT-1785): the document by its read rule, the label by its team.
    document = await visible_document(current_user, document_id)
    label = await document_service.get_label_by_id(label_id)
    if not await can_see_label(current_user, label):
        raise not_found("Label not found")

    # Check that label belongs to the same team as the document
    if label.team_id != document.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label must belong to the same team as the document",
        )

    await document_service.add_label(document_id, label_id)
    return {"message": "Label added to document"}


@router.delete("/{document_id}/labels/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def remove_label_from_document(
    document_id: str, label_id: str, current_user: CurrentUser
):
    """Remove a label from a document."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    await visible_document(current_user, document_id)

    await document_service.remove_label(document_id, label_id)


# ============================================================================
# Document Revisions
# ============================================================================


def _revision_author_name(rev) -> str | None:
    author = getattr(rev, "author", None)
    return author.name if author else None


@router.get("/{document_id}/revisions", response_model=list[DocumentRevisionListItem])
@reads
async def list_document_revisions(
    document_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[DocumentRevisionListItem]:
    """List revision history for a document, newest first."""
    limit = min(limit, 10000)
    document_service = DocumentService()

    await visible_document(current_user, document_id)

    revisions = await document_service.list_revisions(document_id, skip, limit)
    return await fill_principals([
        DocumentRevisionListItem(
            id=rev.id,
            document_id=rev.document_id,
            version=rev.version,
            title=rev.title,
            author_id=rev.author_id,
            author_name=_revision_author_name(rev),
            created_at=ensure_utc(rev.created_at),
        )
        for rev in revisions
    ])


@router.get("/{document_id}/revisions/{version}", response_model=DocumentRevisionResponse)
@reads
async def get_document_revision(
    document_id: str,
    version: int,
    current_user: CurrentUser,
) -> DocumentRevisionResponse:
    """Get a single revision snapshot by version number."""
    document_service = DocumentService()

    await visible_document(current_user, document_id)

    rev = await document_service.get_revision(document_id, version)
    if not rev:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Revision not found",
        )

    return await fill_principals(DocumentRevisionResponse(
        id=rev.id,
        document_id=rev.document_id,
        version=rev.version,
        title=rev.title,
        content=rev.content,
        author_id=rev.author_id,
        author_name=_revision_author_name(rev),
        created_at=ensure_utc(rev.created_at),
    ))


# ============================================================================
# Document Comments
# ============================================================================


def build_comment_response(comment, author_name: str | None = None) -> DocumentCommentResponse:
    """Build a DocumentCommentResponse with author_name."""
    return DocumentCommentResponse(
        id=comment.id,
        document_id=comment.document_id,
        author_id=comment.author_id,
        author_name=author_name if author_name is not None else (comment.author and comment.author.name),
        content=comment.content,
        created_at=ensure_utc(comment.created_at),
        updated_at=ensure_utc(comment.updated_at),
    )


@router.post("/{document_id}/comments", response_model=DocumentCommentCreated, status_code=status.HTTP_201_CREATED)
@writes
async def create_comment(
    document_id: str,
    comment_in: DocumentCommentCreate,
    current_user: CurrentUser,
) -> DocumentCommentCreated:
    """Create a comment on a document. `warnings` names each @handle that
    reached nobody (CHT-1735)."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    document = await visible_document(current_user, document_id)

    warnings: list[str] = []
    comment = await document_service.create_comment(document_id, comment_in, current_user.id, warnings=warnings)
    response = await fill_principals(DocumentCommentCreated(
        **build_comment_response(comment, author_name=current_user.name).model_dump(), warnings=warnings,
    ))

    # Broadcast real-time update (the warnings are the author's alone)
    await broadcast_comment_event(
        document.team_id, "created", response.model_dump(mode="json", exclude={"warnings"}),
        project_id=document.project_id,
    )

    return response


@router.get("/{document_id}/comments", response_model=list[DocumentCommentResponse])
@reads
async def list_comments(
    document_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[DocumentCommentResponse]:
    """List comments for a document."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    await visible_document(current_user, document_id)

    comments = await document_service.list_comments(document_id, skip, limit)
    return await fill_principals([build_comment_response(comment) for comment in comments])


@router.patch("/{document_id}/comments/{comment_id}", response_model=DocumentCommentResponse)
@writes
async def update_comment(
    document_id: str,
    comment_id: str,
    comment_in: DocumentCommentUpdate,
    current_user: CurrentUser,
):
    """Update a comment."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    document = await visible_document(current_user, document_id)

    comment = await document_service.get_comment_by_id(comment_id)
    if not comment or comment.document_id != document_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )

    # Only the author can update their comment
    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the author can update this comment",
        )

    comment = await document_service.update_comment(comment, comment_in)
    response = await fill_principals(build_comment_response(comment))

    # Broadcast real-time update
    await broadcast_comment_event(document.team_id, "updated", response.model_dump(mode="json"), project_id=document.project_id)

    return response


@router.delete("/{document_id}/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_comment(
    document_id: str,
    comment_id: str,
    current_user: CurrentUser,
):
    """Delete a comment."""
    document_service = DocumentService()

    # A document the caller cannot see answers like a missing one (CHT-1785).
    document = await visible_document(current_user, document_id)

    comment = await document_service.get_comment_by_id(comment_id)
    if not comment or comment.document_id != document_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )

    # Only the author can delete their comment
    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the author can delete this comment",
        )

    await document_service.delete_comment(comment)

    # Broadcast real-time update
    await broadcast_comment_event(
        document.team_id,
        "deleted",
        {"id": comment.id, "document_id": document_id},
        project_id=document.project_id,
    )
