"""Epic progress (CHT-1902): the Epics view's one batch read."""
from pydantic import BaseModel, field_validator

from app.enums import IssuePriority, IssueStatus, SprintStatus
from app.schemas.issue import _coerce_enum
from app.utils import DateTimeUTC


class SprintTick(BaseModel):
    """What one sprint closed toward one goal. Sprints are the clock:
    each sprint close is a progress tick per epic (CLAUDE.md, "Sprint &
    Budget Model")."""

    sprint_id: str
    name: str
    status: SprintStatus
    activated_at: DateTimeUTC | None = None
    closed_at: DateTimeUTC | None = None
    closed: int = 0
    points: int = 0

    @field_validator("status", mode="before")
    @classmethod
    def coerce_status(cls, v):
        return _coerce_enum(SprintStatus, v)


class ChildCounts(BaseModel):
    """An epic's tickets by status: every issue whose nearest epic
    ancestor it is, nested sub-issues included."""

    total: int = 0
    backlog: int = 0
    todo: int = 0
    in_progress: int = 0
    in_review: int = 0
    done: int = 0
    canceled: int = 0

    @property
    def open(self) -> int:
        return self.backlog + self.todo + self.in_progress + self.in_review


class EpicProgress(BaseModel):
    id: str
    identifier: str
    title: str
    status: IssueStatus
    status_pinned: bool = False
    priority: IssuePriority
    estimate: int | None = None
    project_id: str
    project_key: str
    children: ChildCounts
    open_children: int
    # Estimate points, 1 for an unestimated ticket (the budget's rule);
    # canceled tickets count toward neither.
    points_total: int
    points_done: int
    # Tickets closed while the project's current sprint was active, each
    # once however often it was reopened, toward their nearest epic.
    closed_this_sprint: int
    points_this_sprint: int
    # The project's most recent sprints, oldest first, the active one last.
    sprints: list[SprintTick]

    @field_validator("status", mode="before")
    @classmethod
    def coerce_status(cls, v):
        return _coerce_enum(IssueStatus, v)

    @field_validator("priority", mode="before")
    @classmethod
    def coerce_priority(cls, v):
        return _coerce_enum(IssuePriority, v)


class UntrackedProgress(BaseModel):
    """Per project, the work that belongs to no epic: the gap that
    require_epic_on_close and a default epic close (CHT-1900)."""

    project_id: str
    project_key: str
    open: int
    closed_this_sprint: int
    points_this_sprint: int
    sprints: list[SprintTick]


class EpicProgressResponse(BaseModel):
    epics: list[EpicProgress]
    untracked: list[UntrackedProgress]
    sprint_window: int
