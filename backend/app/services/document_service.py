"""Document service for document management."""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.document import Document, DocumentComment, DocumentActivity, DocumentActivityType, document_issues, document_labels
from app.models.issue import Issue, Label
from app.models.project import Project
from app.schemas.document import DocumentCreate, DocumentUpdate, DocumentCommentCreate, DocumentCommentUpdate


class DocumentService:
    """Service for document operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

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
        activity = DocumentActivity(
            activity_type=activity_type,
            team_id=team_id,
            user_id=user_id,
            document_id=document_id,
            document_title=document_title,
            document_icon=document_icon,
        )
        self.db.add(activity)

    async def create(
        self, document_in: DocumentCreate, team_id: str, author_id: str
    ) -> Document:
        """Create a new document."""
        document = Document(
            team_id=team_id,
            author_id=author_id,
            title=document_in.title,
            content=document_in.content,
            icon=document_in.icon,
            project_id=document_in.project_id,
            sprint_id=document_in.sprint_id,
        )
        self.db.add(document)
        await self.db.flush()  # Get the document ID

        # Log activity (CHT-639)
        await self._log_activity(
            DocumentActivityType.CREATED,
            team_id,
            author_id,
            document_id=document.id,
            document_title=document.title,
            document_icon=document.icon,
        )

        await self.db.commit()

        # Reload with labels eagerly loaded to avoid lazy loading issues
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(Document.id == document.id)
        )
        return result.scalar_one()

    async def get_by_id(self, document_id: str) -> Document | None:
        """Get document by ID."""
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(Document.id == document_id)
        )
        return result.scalar_one_or_none()

    async def update(
        self, document: Document, document_in: DocumentUpdate, user_id: str
    ) -> Document:
        """Update a document."""
        update_data = document_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(document, field, value)

        # Log activity (CHT-639)
        await self._log_activity(
            DocumentActivityType.UPDATED,
            document.team_id,
            user_id,
            document_id=document.id,
            document_title=document.title,
            document_icon=document.icon,
        )

        await self.db.commit()

        # Reload with labels eagerly loaded to avoid lazy loading issues
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(Document.id == document.id)
        )
        return result.scalar_one()

    async def delete(self, document: Document, user_id: str) -> None:
        """Delete a document."""
        # Log activity before deletion (CHT-639)
        # Store title/icon since document will be deleted
        await self._log_activity(
            DocumentActivityType.DELETED,
            document.team_id,
            user_id,
            document_id=None,  # Will be cascade deleted
            document_title=document.title,
            document_icon=document.icon,
        )
        await self.db.delete(document)
        await self.db.commit()

    async def list_by_team(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[Document]:
        """List documents for a team."""
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(Document.team_id == team_id)
            .order_by(Document.updated_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def list_by_project(
        self, project_id: str, skip: int = 0, limit: int = 100
    ) -> list[Document]:
        """List documents for a project."""
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(Document.project_id == project_id)
            .order_by(Document.updated_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def list_by_sprint(
        self, sprint_id: str, skip: int = 0, limit: int = 100
    ) -> list[Document]:
        """List documents for a sprint."""
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(Document.sprint_id == sprint_id)
            .order_by(Document.updated_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def search(
        self, team_id: str, query: str, skip: int = 0, limit: int = 100
    ) -> list[Document]:
        """Search documents by title."""
        result = await self.db.execute(
            select(Document)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(
                Document.team_id == team_id,
                Document.title.ilike(f"%{query}%"),
            )
            .order_by(Document.updated_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_linked_issues(self, document_id: str) -> list[Issue]:
        """Get issues linked to a document."""
        result = await self.db.execute(
            select(Issue)
            .join(document_issues, Issue.id == document_issues.c.issue_id)
            .options(
                selectinload(Issue.creator),
                selectinload(Issue.labels),
            )
            .where(document_issues.c.document_id == document_id)
            .order_by(Issue.updated_at.desc())
        )
        return list(result.scalars().all())

    async def link_issue(self, document_id: str, issue_id: str) -> None:
        """Link a document to an issue.

        Raises:
            ValueError: If the document and issue belong to different teams.
        """
        # Verify document and issue belong to the same team
        doc_result = await self.db.execute(
            select(Document.team_id).where(Document.id == document_id)
        )
        doc_team_id = doc_result.scalar_one_or_none()

        issue_team_result = await self.db.execute(
            select(Project.team_id)
            .join(Issue, Issue.project_id == Project.id)
            .where(Issue.id == issue_id)
        )
        issue_team_id = issue_team_result.scalar_one_or_none()

        if doc_team_id is None or issue_team_id is None:
            raise ValueError("Document or issue not found")

        if doc_team_id != issue_team_id:
            raise ValueError("Cannot link document and issue from different teams")

        # Check if already linked
        existing = await self.db.execute(
            select(document_issues).where(
                document_issues.c.document_id == document_id,
                document_issues.c.issue_id == issue_id,
            )
        )
        if existing.first():
            return  # Already linked

        await self.db.execute(
            document_issues.insert().values(
                document_id=document_id,
                issue_id=issue_id,
            )
        )
        await self.db.commit()

    async def unlink_issue(self, document_id: str, issue_id: str) -> None:
        """Unlink a document from an issue."""
        await self.db.execute(
            document_issues.delete().where(
                document_issues.c.document_id == document_id,
                document_issues.c.issue_id == issue_id,
            )
        )
        await self.db.commit()

    async def get_linked_documents_for_issue(self, issue_id: str) -> list[Document]:
        """Get documents linked to an issue."""
        result = await self.db.execute(
            select(Document)
            .join(document_issues, Document.id == document_issues.c.document_id)
            .options(selectinload(Document.author), selectinload(Document.labels))
            .where(document_issues.c.issue_id == issue_id)
            .order_by(Document.updated_at.desc())
        )
        return list(result.scalars().all())

    # Label methods
    async def get_label_by_id(self, label_id: str) -> Label | None:
        """Get label by ID."""
        result = await self.db.execute(
            select(Label).where(Label.id == label_id)
        )
        return result.scalar_one_or_none()

    async def add_label(self, document_id: str, label_id: str) -> None:
        """Add a label to a document."""
        # Check if already linked
        existing = await self.db.execute(
            select(document_labels).where(
                document_labels.c.document_id == document_id,
                document_labels.c.label_id == label_id,
            )
        )
        if existing.first():
            return  # Already linked

        await self.db.execute(
            document_labels.insert().values(
                document_id=document_id,
                label_id=label_id,
            )
        )
        await self.db.commit()

    async def remove_label(self, document_id: str, label_id: str) -> None:
        """Remove a label from a document."""
        await self.db.execute(
            document_labels.delete().where(
                document_labels.c.document_id == document_id,
                document_labels.c.label_id == label_id,
            )
        )
        await self.db.commit()

    # Comment methods
    async def create_comment(
        self, document_id: str, comment_in: DocumentCommentCreate, author_id: str
    ) -> DocumentComment:
        """Create a comment on a document."""
        # Get the document to access team_id for activity logging
        document = await self.get_by_id(document_id)

        comment = DocumentComment(
            document_id=document_id,
            author_id=author_id,
            content=comment_in.content,
        )
        self.db.add(comment)

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

        await self.db.commit()
        await self.db.refresh(comment)
        return comment

    async def get_comment_by_id(self, comment_id: str) -> DocumentComment | None:
        """Get comment by ID."""
        result = await self.db.execute(
            select(DocumentComment)
            .options(selectinload(DocumentComment.author))
            .where(DocumentComment.id == comment_id)
        )
        return result.scalar_one_or_none()

    async def update_comment(
        self, comment: DocumentComment, comment_in: DocumentCommentUpdate
    ) -> DocumentComment:
        """Update a comment."""
        comment.content = comment_in.content
        await self.db.commit()
        # Re-fetch with author relationship loaded
        return await self.get_comment_by_id(comment.id)

    async def delete_comment(self, comment: DocumentComment) -> None:
        """Delete a comment."""
        await self.db.delete(comment)
        await self.db.commit()

    async def list_comments(
        self, document_id: str, skip: int = 0, limit: int = 100
    ) -> list[DocumentComment]:
        """List comments for a document."""
        result = await self.db.execute(
            select(DocumentComment)
            .options(selectinload(DocumentComment.author))
            .where(DocumentComment.document_id == document_id)
            .order_by(DocumentComment.created_at.asc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def list_team_activities(
        self, team_id: str, skip: int = 0, limit: int = 50
    ) -> list[DocumentActivity]:
        """List document activities for a team."""
        from app.models.user import User
        result = await self.db.execute(
            select(DocumentActivity)
            .options(
                selectinload(DocumentActivity.document),
                selectinload(DocumentActivity.user),
            )
            .where(DocumentActivity.team_id == team_id)
            .order_by(DocumentActivity.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())
