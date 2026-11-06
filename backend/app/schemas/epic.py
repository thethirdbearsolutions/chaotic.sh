"""Epic progress (CHT-1902): the Epics view's one batch read."""
from pydantic import BaseModel, field_validator

from app.enums import ApprovalMode, IssuePriority, IssueStatus, SprintStatus
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


class EpicPerson(BaseModel):
    """Who a ticket is assigned to, as the Epics list names them."""

    id: str
    name: str
    is_agent: bool = False


class EpicTicket(BaseModel):
    """One ticket under an epic, as the Epics list shows it (CHT-2043):
    an in-flight one, or the one that shipped last."""

    identifier: str
    title: str
    status: IssueStatus
    assignee: EpicPerson | None = None
    updated_at: DateTimeUTC | None = None
    completed_at: DateTimeUTC | None = None

    @field_validator("status", mode="before")
    @classmethod
    def coerce_status(cls, v):
        return _coerce_enum(IssueStatus, v)


class AwaitingHuman(BaseModel):
    """A ticket ritual that only a person can clear (CHT-2043): a REVIEW
    attestation waiting for approval, or a GATE a person has to
    complete. The same set the ritual approvals banner reads."""

    ritual_name: str
    approval_mode: ApprovalMode
    identifier: str
    title: str
    since: DateTimeUTC | None = None
    requested_by_name: str | None = None

    @field_validator("approval_mode", mode="before")
    @classmethod
    def coerce_mode(cls, v):
        return _coerce_enum(ApprovalMode, v)


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
    # The epic's own assignee: the person or agent who owns the goal.
    owner: EpicPerson | None = None
    # What the Epics list reads per goal (CHT-2043). in_flight is the
    # epic's in-progress and in-review tickets, most recently updated
    # first, at most IN_FLIGHT_LIMIT of in_flight_count.
    in_flight: list[EpicTicket] = []
    in_flight_count: int = 0
    last_shipped: EpicTicket | None = None
    # The newest update to the epic or any ticket under it.
    last_activity_at: DateTimeUTC | None = None
    completed_at: DateTimeUTC | None = None
    awaiting_human: list[AwaitingHuman] = []
    # The nearest epic above this one, in scope: the goal it serves
    # (CHT-2095). Its counts stay its own; the list rolls them up.
    parent_epic_id: str | None = None

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
    awaiting_human: list[AwaitingHuman] = []


class EpicProgressResponse(BaseModel):
    epics: list[EpicProgress]
    untracked: list[UntrackedProgress]
    sprint_window: int
