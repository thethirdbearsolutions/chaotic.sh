"""Document service for document management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone
from oxyde import atomic, execute_raw
from app.oxyde_models.document import (
    OxydeDocument,
    OxydeDocumentComment,
    OxydeDocumentActivity,
    OxydeDocumentIssue,
    OxydeDocumentLabel,
)
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.label import OxydeLabel
from app.models.document import DocumentActivityType
from app.schemas.document import DocumentCreate, DocumentUpdate, DocumentCommentCreate, DocumentCommentUpdate

# Type aliases for API compatibility
Document = OxydeDocument
DocumentComment = OxydeDocumentComment
DocumentActivity = OxydeDocumentActivity


class DocumentService:
    """Service for document operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def _log_activity(
        self,
        activity_type: DocumentActivityType,
        team_id: str,
        user_id: str,
        document_id: str | None = None,
        document_title: str | None = None,
        document_icon: str | None = None,
    ) -> None:
        """Log a document activity."""
        await OxydeDocumentActivity.objects.create(
            activity_type=activity_type.name if hasattr(activity_type, 'name') and hasattr(activity_type, 'value') else activity_type,
            team_id=team_id,
            user_id=user_id,
            document_id=document_id,
            document_title=document_title,
            document_icon=document_icon,
        )

    async def create(
        self, document_in: DocumentCreate, team_id: str, author_id: str
    ) -> OxydeDocument:
        """Create a new document."""
        async with atomic():
            document = await OxydeDocument.objects.create(
                team_id=team_id,
                author_id=author_id,
                title=document_in.title,
                content=document_in.content,
                icon=document_in.icon,
                project_id=document_in.project_id,
                sprint_id=document_in.sprint_id,
            )

            # Log activity (CHT-639)
            await self._log_activity(
                DocumentActivityType.CREATED,
                team_id,
                author_id,
                document_id=document.id,
                document_title=document.title,
                document_icon=document.icon,
            )

        await document.refresh()
        return await self.get_by_id(document.id)

    async def get_by_id(self, document_id: str) -> OxydeDocument | None:
        """Get document by ID."""
        return await OxydeDocument.objects.filter(
            id=document_id
        ).join("author").prefetch("labels").first()

    async def update(
        self, document: OxydeDocument, document_in: DocumentUpdate, user_id: str
    ) -> OxydeDocument:
        """Update a document."""
        update_data = document_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(document, field, value)
        document.updated_at = datetime.now(timezone.utc)

        async with atomic():
            await document.save(update_fields=set(update_data.keys()) | {"updated_at"})

            # Log activity (CHT-639)
            await self._log_activity(
                DocumentActivityType.UPDATED,
                document.team_id,
                user_id,
                document_id=document.id,
                document_title=document.title,
                document_icon=document.icon,
            )

        await document.refresh()
        return await self.get_by_id(document.id)

    async def delete(self, document: OxydeDocument, user_id: str) -> None:
        """Delete a document."""
        async with atomic():
            # Log activity before deletion (CHT-639)
            await self._log_activity(
                DocumentActivityType.DELETED,
                document.team_id,
                user_id,
                document_id=None,  # Will be cascade deleted
                document_title=document.title,
                document_icon=document.icon,
            )
            # Manual cascade: delete child records
            await OxydeDocumentComment.objects.filter(document_id=document.id).delete()
            await OxydeDocumentIssue.objects.filter(document_id=document.id).delete()
            await OxydeDocumentLabel.objects.filter(document_id=document.id).delete()
            await OxydeDocumentActivity.objects.filter(document_id=document.id).delete()
            await document.delete()

    async def list_by_team(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeDocument]:
        """List documents for a team."""
        return await OxydeDocument.objects.filter(
            team_id=team_id
        ).join("author").prefetch("labels").order_by("-updated_at").offset(skip).limit(limit).all()

    async def list_by_project(
        self, project_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeDocument]:
        """List documents for a project."""
        return await OxydeDocument.objects.filter(
            project_id=project_id
        ).join("author").prefetch("labels").order_by("-updated_at").offset(skip).limit(limit).all()

    async def list_by_sprint(
        self, sprint_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeDocument]:
        """List documents for a sprint."""
        return await OxydeDocument.objects.filter(
            sprint_id=sprint_id
        ).join("author").prefetch("labels").order_by("-updated_at").offset(skip).limit(limit).all()

    async def search(
        self, team_id: str, query: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeDocument]:
        """Search documents by title."""
        return await OxydeDocument.objects.filter(
            team_id=team_id, title__icontains=query
        ).join("author").prefetch("labels").order_by("-updated_at").offset(skip).limit(limit).all()

    async def list_filtered(
        self,
        team_id: str,
        project_id: str | None = None,
        sprint_id: str | None = None,
        search: str | None = None,
        skip: int = 0,
        limit: int = 100,
    ) -> list[OxydeDocument]:
        """List documents with composable filters (CHT-973)."""
        qs = OxydeDocument.objects.filter(team_id=team_id)
        if project_id:
            qs = qs.filter(project_id=project_id)
        if sprint_id:
            qs = qs.filter(sprint_id=sprint_id)
        if search:
            qs = qs.filter(title__icontains=search)
        return await qs.join("author").prefetch("labels").order_by("-updated_at").offset(skip).limit(limit).all()

    async def get_linked_issues(self, document_id: str) -> list:
        """Get issues linked to a document.

        Returns raw dicts from the issues table with creator/labels loaded.
        This stays as raw SQL since Issue is not yet ported to Oxyde.
        """
        # Get linked issue IDs
        links = await OxydeDocumentIssue.objects.filter(document_id=document_id).all()
        if not links:
            return []

        issue_ids = [link.issue_id for link in links]
        placeholders = ",".join("?" for _ in issue_ids)

        # Fetch issues via raw SQL (not ported to Oxyde yet)
        rows = await execute_raw(
            f"SELECT * FROM issues WHERE id IN ({placeholders}) ORDER BY updated_at DESC",
            issue_ids,
        )

        # Batch-load creators
        creator_ids = list({row.get("creator_id") for row in rows if row.get("creator_id")})
        if creator_ids:
            creators = await OxydeUser.objects.filter(id__in=creator_ids).all()
            creator_map = {c.id: c for c in creators}
        else:
            creator_map = {}

        # Batch-load labels via issue_labels junction
        all_label_rows = await execute_raw(
            f"SELECT issue_id, label_id FROM issue_labels WHERE issue_id IN ({placeholders})",
            issue_ids,
        )
        # Group label IDs by issue
        issue_label_ids: dict[str, list[str]] = {}
        all_label_id_set = set()
        for lr in all_label_rows:
            issue_label_ids.setdefault(lr["issue_id"], []).append(lr["label_id"])
            all_label_id_set.add(lr["label_id"])

        if all_label_id_set:
            labels = await OxydeLabel.objects.filter(id__in=list(all_label_id_set)).all()
            label_map = {l.id: l for l in labels}
        else:
            label_map = {}

        # Build minimal issue-like objects
        issues = []
        for row in rows:
            issue = _DictObj(row)
            issue.creator = creator_map.get(row.get("creator_id"))
            lid_list = issue_label_ids.get(row["id"], [])
            issue.labels = [label_map[lid] for lid in lid_list if lid in label_map]
            issues.append(issue)

        return issues

    async def link_issue(self, document_id: str, issue_id: str) -> None:
        """Link a document to an issue."""
        # Verify document and issue belong to the same team
        doc = await OxydeDocument.objects.get_or_none(id=document_id)
        if not doc:
            raise ValueError("Document or issue not found")

        issue_rows = await execute_raw(
            "SELECT p.team_id FROM issues i JOIN projects p ON i.project_id = p.id WHERE i.id = ?",
            [issue_id],
        )
        if not issue_rows:
            raise ValueError("Document or issue not found")

        if doc.team_id != issue_rows[0]["team_id"]:
            raise ValueError("Cannot link document and issue from different teams")

        # Check if already linked
        existing = await OxydeDocumentIssue.objects.filter(
            document_id=document_id, issue_id=issue_id
        ).first()
        if existing:
            return  # Already linked

        await OxydeDocumentIssue.objects.create(
            document_id=document_id,
            issue_id=issue_id,
        )

    async def unlink_issue(self, document_id: str, issue_id: str) -> None:
        """Unlink a document from an issue."""
        await OxydeDocumentIssue.objects.filter(
            document_id=document_id, issue_id=issue_id
        ).delete()

    async def get_linked_documents_for_issue(self, issue_id: str) -> list[OxydeDocument]:
        """Get documents linked to an issue."""
        links = await OxydeDocumentIssue.objects.filter(issue_id=issue_id).all()
        if not links:
            return []
        doc_ids = [link.document_id for link in links]
        return await OxydeDocument.objects.filter(
            id__in=doc_ids
        ).join("author").prefetch("labels").order_by("-updated_at").all()

    # Label methods
    async def get_label_by_id(self, label_id: str) -> OxydeLabel | None:
        """Get label by ID."""
        return await OxydeLabel.objects.get_or_none(id=label_id)

    async def add_label(self, document_id: str, label_id: str) -> None:
        """Add a label to a document."""
        existing = await OxydeDocumentLabel.objects.filter(
            document_id=document_id, label_id=label_id
        ).first()
        if existing:
            return  # Already linked

        await OxydeDocumentLabel.objects.create(
            document_id=document_id,
            label_id=label_id,
        )

    async def remove_label(self, document_id: str, label_id: str) -> None:
        """Remove a label from a document."""
        await OxydeDocumentLabel.objects.filter(
            document_id=document_id, label_id=label_id
        ).delete()

    # Comment methods
    async def create_comment(
        self, document_id: str, comment_in: DocumentCommentCreate, author_id: str
    ) -> OxydeDocumentComment:
        """Create a comment on a document."""
        # Get the document to access team_id for activity logging
        document = await self.get_by_id(document_id)

        async with atomic():
            comment = await OxydeDocumentComment.objects.create(
                document_id=document_id,
                author_id=author_id,
                content=comment_in.content,
            )

            # Log activity (CHT-677)
            if document:
                await self._log_activity(
                    DocumentActivityType.COMMENTED,
                    document.team_id,
                    author_id,
                    document_id=document.id,
                    document_title=document.title,
                    document_icon=document.icon,
                )

        await comment.refresh()
        return await self.get_comment_by_id(comment.id)

    async def get_comment_by_id(self, comment_id: str) -> OxydeDocumentComment | None:
        """Get comment by ID."""
        return await OxydeDocumentComment.objects.filter(
            id=comment_id
        ).join("author").first()

    async def update_comment(
        self, comment: OxydeDocumentComment, comment_in: DocumentCommentUpdate
    ) -> OxydeDocumentComment:
        """Update a comment."""
        comment.content = comment_in.content
        comment.updated_at = datetime.now(timezone.utc)
        await comment.save(update_fields={"content", "updated_at"})
        await comment.refresh()
        # Re-fetch with author
        return await self.get_comment_by_id(comment.id)

    async def delete_comment(self, comment: OxydeDocumentComment) -> None:
        """Delete a comment."""
        await comment.delete()

    async def list_comments(
        self, document_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeDocumentComment]:
        """List comments for a document."""
        return await OxydeDocumentComment.objects.filter(
            document_id=document_id
        ).join("author").order_by("created_at").offset(skip).limit(limit).all()

    async def list_team_activities(
        self, team_id: str, skip: int = 0, limit: int = 50
    ) -> list[OxydeDocumentActivity]:
        """List document activities for a team."""
        return await OxydeDocumentActivity.objects.filter(
            team_id=team_id
        ).join("user", "document").order_by("-created_at").offset(skip).limit(limit).all()


class _DictObj:
    """Minimal object wrapper for raw SQL dicts to support attribute access."""

    def __init__(self, data: dict):
        for key, value in data.items():
            setattr(self, key, value)
