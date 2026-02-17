"""Document API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import DbSession, CurrentUser, check_user_team_access, check_user_project_access
from app.api.issues import ensure_utc
from app.schemas.document import (
    DocumentCreate,
    DocumentUpdate,
    DocumentResponse,
    DocumentCommentCreate,
    DocumentCommentUpdate,
    DocumentCommentResponse,
)
from app.schemas.issue import IssueResponse, LabelResponse
from app.services.document_service import DocumentService
from app.websocket import broadcast_comment_event
from app.services.team_service import TeamService
from app.services.sprint_service import SprintService
from app.services.issue_service import IssueService
from app.services.project_service import ProjectService
from app.models.document import Document

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


@router.post("", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_document(
    team_id: str,
    document_in: DocumentCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a new document."""
    document_service = DocumentService(db)

    if not await check_user_team_access(db, current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    # Agents must include an emoji icon (CHT-631)
    if current_user.is_agent and not document_in.icon:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Documents created by agents must include an emoji icon (--icon)",
        )

    # Validate sprint belongs to document's project
    if document_in.sprint_id:
        sprint_service = SprintService(db)
        sprint = await sprint_service.get_by_id(document_in.sprint_id)
        if not sprint:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sprint not found",
            )
        if document_in.project_id and sprint.project_id != document_in.project_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sprint must belong to the document's project",
            )

    document = await document_service.create(document_in, team_id, current_user.id)
    return build_document_response(document, author_name=current_user.name)


@router.get("", response_model=list[DocumentResponse])
async def list_documents(
    team_id: str,
    db: DbSession,
    current_user: CurrentUser,
    project_id: str | None = None,
    sprint_id: str | None = None,
    search: str | None = None,
    skip: int = 0,
    limit: int = 100,
):
    """List documents for a team."""
    document_service = DocumentService(db)

    if not await check_user_team_access(db, current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    # Check project access if filtering by project
    if project_id:
        if not await check_user_project_access(db, current_user, project_id, team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this project",
            )

    # Check sprint access if filtering by sprint
    if sprint_id:
        sprint_service = SprintService(db)
        sprint = await sprint_service.get_by_id(sprint_id)
        if not sprint:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sprint not found",
            )
        if not await check_user_project_access(db, current_user, sprint.project_id, team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this sprint",
            )

    documents = await document_service.list_filtered(
        team_id=team_id,
        project_id=project_id,
        sprint_id=sprint_id,
        search=search,
        skip=skip,
        limit=limit,
    )

    return [build_document_response(doc) for doc in documents]


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: str, db: DbSession, current_user: CurrentUser):
    """Get document by ID."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # For documents with a project, check project access; otherwise team access
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )

    return build_document_response(document)


@router.patch("/{document_id}", response_model=DocumentResponse)
async def update_document(
    document_id: str,
    document_in: DocumentUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Update a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # For documents with a project, check project access; otherwise team access
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )

    # Check access to target project if moving document to a different project
    if document_in.project_id is not None and document_in.project_id != document.project_id:
        if document_in.project_id:  # Moving to a specific project (not making global)
            if not await check_user_project_access(db, current_user, document_in.project_id, document.team_id):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Not authorized for target project",
                )

    # Validate sprint belongs to document's project
    target_sprint_id = document_in.sprint_id if document_in.sprint_id is not None else document.sprint_id
    target_project_id = document_in.project_id if document_in.project_id is not None else document.project_id
    if target_sprint_id:
        sprint_service = SprintService(db)
        sprint = await sprint_service.get_by_id(target_sprint_id)
        if not sprint:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sprint not found",
            )
        if target_project_id and sprint.project_id != target_project_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sprint must belong to the document's project",
            )

    document = await document_service.update(document, document_in, current_user.id)
    return build_document_response(document)


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(document_id: str, db: DbSession, current_user: CurrentUser):
    """Delete a document."""
    document_service = DocumentService(db)
    team_service = TeamService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Only author or team admin can delete
    is_admin = await team_service.is_team_admin(document.team_id, current_user.id)
    if document.author_id != current_user.id and not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only author or admin can delete document",
        )

    await document_service.delete(document, current_user.id)


@router.get("/{document_id}/issues", response_model=list[IssueResponse])
async def get_document_issues(document_id: str, db: DbSession, current_user: CurrentUser):
    """Get issues linked to a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check access to document
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )

    issues = await document_service.get_linked_issues(document_id)
    return [
        IssueResponse(
            id=issue.id,
            project_id=issue.project_id,
            identifier=issue.identifier,
            number=issue.number,
            title=issue.title,
            description=issue.description,
            status=issue.status,
            priority=issue.priority,
            issue_type=issue.issue_type,
            estimate=issue.estimate,
            assignee_id=issue.assignee_id,
            creator_id=issue.creator_id,
            creator_name=issue.creator.name if issue.creator else None,
            sprint_id=issue.sprint_id,
            parent_id=issue.parent_id,
            due_date=ensure_utc(issue.due_date),
            completed_at=ensure_utc(issue.completed_at),
            created_at=ensure_utc(issue.created_at),
            updated_at=ensure_utc(issue.updated_at),
            labels=[LabelResponse(id=l.id, team_id=l.team_id, name=l.name, color=l.color, description=l.description, created_at=l.created_at) for l in issue.labels],
        )
        for issue in issues
    ]


@router.post("/{document_id}/issues/{issue_id}", status_code=status.HTTP_201_CREATED)
async def link_document_to_issue(
    document_id: str, issue_id: str, db: DbSession, current_user: CurrentUser
):
    """Link a document to an issue."""
    document_service = DocumentService(db)
    issue_service = IssueService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    # Check access to document
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

    # Check access to issue (must be on same team via project)
    project_service = ProjectService(db)
    issue_project = await project_service.get_by_id(issue.project_id)
    if not issue_project or issue_project.team_id != document.team_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Document and issue must be in the same team",
        )
    if not await check_user_project_access(db, current_user, issue.project_id, issue_project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized for this issue",
        )

    await document_service.link_issue(document_id, issue_id)
    return {"message": "Document linked to issue"}


@router.delete("/{document_id}/issues/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
async def unlink_document_from_issue(
    document_id: str, issue_id: str, db: DbSession, current_user: CurrentUser
):
    """Unlink a document from an issue."""
    document_service = DocumentService(db)
    issue_service = IssueService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    # Check access to document
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

    # Check access to issue
    project_service = ProjectService(db)
    issue_project = await project_service.get_by_id(issue.project_id)
    if not await check_user_project_access(db, current_user, issue.project_id, issue_project.team_id if issue_project else document.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized for this issue",
        )

    await document_service.unlink_issue(document_id, issue_id)


# ============================================================================
# Document Labels
# ============================================================================


@router.get("/{document_id}/labels", response_model=list[LabelResponse])
async def get_document_labels(document_id: str, db: DbSession, current_user: CurrentUser):
    """Get labels for a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check access to document
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this team",
            )

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


@router.post("/{document_id}/labels/{label_id}", status_code=status.HTTP_201_CREATED)
async def add_label_to_document(
    document_id: str, label_id: str, db: DbSession, current_user: CurrentUser
):
    """Add a label to a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    label = await document_service.get_label_by_id(label_id)
    if not label:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Label not found",
        )

    # Check access to document
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

    # Check that label belongs to the same team as the document
    if label.team_id != document.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label must belong to the same team as the document",
        )

    await document_service.add_label(document_id, label_id)
    return {"message": "Label added to document"}


@router.delete("/{document_id}/labels/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_label_from_document(
    document_id: str, label_id: str, db: DbSession, current_user: CurrentUser
):
    """Remove a label from a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check access to document
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

    await document_service.remove_label(document_id, label_id)


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


@router.post("/{document_id}/comments", response_model=DocumentCommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    document_id: str,
    comment_in: DocumentCommentCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a comment on a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check document access
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

    comment = await document_service.create_comment(document_id, comment_in, current_user.id)
    response = build_comment_response(comment, author_name=current_user.name)

    # Broadcast real-time update
    await broadcast_comment_event(document.team_id, "created", response.model_dump(mode="json"))

    return response


@router.get("/{document_id}/comments", response_model=list[DocumentCommentResponse])
async def list_comments(
    document_id: str,
    db: DbSession,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """List comments for a document."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check document access
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

    comments = await document_service.list_comments(document_id, skip, limit)
    return [build_comment_response(comment) for comment in comments]


@router.patch("/{document_id}/comments/{comment_id}", response_model=DocumentCommentResponse)
async def update_comment(
    document_id: str,
    comment_id: str,
    comment_in: DocumentCommentUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Update a comment."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check document access
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

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
    response = build_comment_response(comment)

    # Broadcast real-time update
    await broadcast_comment_event(document.team_id, "updated", response.model_dump(mode="json"))

    return response


@router.delete("/{document_id}/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    document_id: str,
    comment_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Delete a comment."""
    document_service = DocumentService(db)

    document = await document_service.get_by_id(document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    # Check document access
    if document.project_id:
        if not await check_user_project_access(db, current_user, document.project_id, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )
    else:
        if not await check_user_team_access(db, current_user, document.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized for this document",
            )

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
        {"id": comment.id, "document_id": document_id}
    )
