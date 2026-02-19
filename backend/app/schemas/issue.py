"""Issue schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, model_validator
from app.models.issue import IssueStatus, IssuePriority, IssueType, ActivityType, IssueRelationType
from app.utils import DateTimeUTC


class IssueCreate(BaseModel):
    """Schema for creating an issue."""

    title: str = Field(min_length=1, max_length=500)
    description: str | None = None
    status: IssueStatus = IssueStatus.BACKLOG
    priority: IssuePriority = IssuePriority.NO_PRIORITY
    issue_type: IssueType = IssueType.TASK
    estimate: int | None = Field(None, ge=0, le=100)
    assignee_id: str | None = None
    sprint_id: str | None = None
    parent_id: str | None = None
    due_date: datetime | None = None
    label_ids: list[str] = []


class IssueUpdate(BaseModel):
    """Schema for updating an issue."""

    title: str | None = None
    description: str | None = None
    status: IssueStatus | None = None
    priority: IssuePriority | None = None
    issue_type: IssueType | None = None
    estimate: int | None = Field(None, ge=0, le=100)
    assignee_id: str | None = None
    sprint_id: str | None = None
    parent_id: str | None = None
    due_date: datetime | None = None
    label_ids: list[str] | None = None


class IssueResponse(BaseModel):
    """Schema for issue response."""

    id: str
    project_id: str
    identifier: str
    number: int
    title: str
    description: str | None
    status: IssueStatus
    priority: IssuePriority
    issue_type: IssueType
    estimate: int | None
    assignee_id: str | None
    creator_id: str
    creator_name: str | None = None
    sprint_id: str | None
    parent_id: str | None
    due_date: DateTimeUTC | None
    completed_at: DateTimeUTC | None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    labels: list["LabelResponse"] = []

    model_config = ConfigDict(from_attributes=True)


class IssueCommentCreate(BaseModel):
    """Schema for creating a comment."""

    content: str = Field(min_length=1)


class IssueCommentUpdate(BaseModel):
    """Schema for updating a comment."""

    content: str = Field(min_length=1)


class IssueCommentResponse(BaseModel):
    """Schema for comment response."""

    id: str
    issue_id: str
    author_id: str
    author_name: str | None = None
    content: str
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class LabelCreate(BaseModel):
    """Schema for creating a label."""

    name: str = Field(min_length=1, max_length=100)
    color: str = "#6366f1"
    description: str | None = None


class LabelUpdate(BaseModel):
    """Schema for updating a label."""

    name: str | None = None
    color: str | None = None
    description: str | None = None


class LabelResponse(BaseModel):
    """Schema for label response."""

    id: str
    team_id: str
    name: str
    color: str
    description: str | None
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class IssueActivityResponse(BaseModel):
    """Schema for activity response."""

    id: str
    issue_id: str
    user_id: str
    user_name: str | None = None
    user_email: str | None = None
    activity_type: ActivityType
    field_name: str | None
    old_value: str | None
    new_value: str | None
    sprint_name: str | None = None  # For moved_to_sprint activities
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class IssueActivityFeedResponse(BaseModel):
    """Schema for team activity feed response.

    Supports both issue activities and document activities (CHT-639).
    For issue activities: issue_id, issue_identifier, issue_title are set.
    For document activities: document_id, document_title, document_icon are set.
    """

    id: str
    # Issue-specific fields (optional for document activities)
    issue_id: str | None = None
    issue_identifier: str | None = None
    issue_title: str | None = None
    # Document-specific fields (optional for issue activities) - CHT-639
    document_id: str | None = None
    document_title: str | None = None
    document_icon: str | None = None
    # Common fields
    user_id: str
    user_name: str | None = None
    user_email: str | None = None
    activity_type: str  # Changed to str to support both ActivityType and DocumentActivityType
    field_name: str | None = None
    old_value: str | None = None
    new_value: str | None = None
    sprint_name: str | None = None  # For moved_to_sprint activities
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class IssueRelationCreate(BaseModel):
    """Schema for creating an issue relation."""

    related_issue_id: str
    relation_type: IssueRelationType = IssueRelationType.BLOCKS


class IssueRelationResponse(BaseModel):
    """Schema for issue relation response."""

    id: str
    issue_id: str
    related_issue_id: str
    relation_type: IssueRelationType
    created_at: DateTimeUTC
    # Include basic info about the related issue
    related_issue_identifier: str | None = None
    related_issue_title: str | None = None
    related_issue_status: IssueStatus | None = None

    model_config = ConfigDict(from_attributes=True)


class AddLabelRequest(BaseModel):
    """Schema for adding a label to an issue."""

    label_id: str


class IssueBatchUpdate(BaseModel):
    """Schema for batch-updating multiple issues.

    Only safe fields are supported (no status/assignee/sprint changes, which
    need validation via the single-issue update endpoint).
    """

    issue_ids: list[str] = Field(min_length=1, max_length=200)
    priority: IssuePriority | None = None
    estimate: int | None = Field(None, ge=0, le=100)
    # Replace all labels on matched issues
    label_ids: list[str] | None = None
    # Add labels to matched issues (without removing existing)
    add_label_ids: list[str] | None = None

    @model_validator(mode="after")
    def check_label_fields_exclusive(self):
        if self.label_ids is not None and self.add_label_ids is not None:
            raise ValueError("Cannot specify both label_ids and add_label_ids")
        return self


# Update forward reference
IssueResponse.model_rebuild()
