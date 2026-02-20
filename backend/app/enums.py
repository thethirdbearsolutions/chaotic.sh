"""Pure enum definitions shared across the codebase.

These are str/Enum subclasses with NO framework dependencies.
Extracted from app/models/*.py to decouple from SQLAlchemy model files.
"""
from enum import Enum


# --- Issue enums ---

class IssueStatus(str, Enum):
    """Issue status."""
    BACKLOG = "backlog"
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    IN_REVIEW = "in_review"
    DONE = "done"
    CANCELED = "canceled"


class IssuePriority(str, Enum):
    """Issue priority."""
    NO_PRIORITY = "no_priority"
    URGENT = "urgent"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class IssueType(str, Enum):
    """Issue type."""
    TASK = "task"
    BUG = "bug"
    FEATURE = "feature"
    CHORE = "chore"
    DOCS = "docs"
    TECH_DEBT = "tech_debt"
    EPIC = "epic"


class IssueRelationType(str, Enum):
    """Type of relationship between issues."""
    BLOCKS = "blocks"
    RELATES_TO = "relates_to"
    DUPLICATES = "duplicates"


class ActivityType(str, Enum):
    """Type of activity."""
    CREATED = "created"
    UPDATED = "updated"
    STATUS_CHANGED = "status_changed"
    PRIORITY_CHANGED = "priority_changed"
    ASSIGNED = "assigned"
    UNASSIGNED = "unassigned"
    COMMENTED = "commented"
    LABELED = "labeled"
    UNLABELED = "unlabeled"
    MOVED_TO_SPRINT = "moved_to_sprint"
    REMOVED_FROM_SPRINT = "removed_from_sprint"
    RITUAL_ATTESTED = "ritual_attested"


# --- Sprint enums ---

class SprintStatus(str, Enum):
    """Sprint status."""
    PLANNED = "planned"
    ACTIVE = "active"
    COMPLETED = "completed"


# --- Ritual enums ---

class RitualTrigger(str, Enum):
    """When a ritual is required."""
    EVERY_SPRINT = "every_sprint"  # Required every sprint close
    TICKET_CLOSE = "ticket_close"  # Required when closing a ticket
    TICKET_CLAIM = "ticket_claim"  # Required when claiming a ticket (→ in_progress)


class ApprovalMode(str, Enum):
    """How ritual attestation is approved."""
    AUTO = "auto"        # Agent attestation clears immediately
    REVIEW = "review"    # Human must approve attestation
    GATE = "gate"        # Human must perform (agent cannot attest)


class SelectionMode(str, Enum):
    """How rituals in a group are selected."""
    RANDOM_ONE = "random_one"      # Pick one ritual randomly (weighted)
    ROUND_ROBIN = "round_robin"    # Rotate through rituals per sprint
    PERCENTAGE = "percentage"      # Each ritual has independent X% chance


# --- Document enums ---

class DocumentActivityType(str, Enum):
    """Type of document activity."""
    CREATED = "doc_created"
    UPDATED = "doc_updated"
    DELETED = "doc_deleted"
    COMMENTED = "doc_commented"


# --- Team enums ---

class TeamRole(str, Enum):
    """Team member roles."""
    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"


class InvitationStatus(str, Enum):
    """Invitation status."""
    PENDING = "pending"
    ACCEPTED = "accepted"
    DECLINED = "declined"
    EXPIRED = "expired"


# --- Project enums ---

class EstimateScale(str, Enum):
    """Available estimation scales for projects."""
    FIBONACCI = "fibonacci"           # 1, 2, 3, 5, 8, 13, 21
    LINEAR = "linear"                 # 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    POWERS_OF_2 = "powers_of_2"       # 1, 2, 4, 8, 16, 32, 64
    TSHIRT = "tshirt"                 # XS, S, M, L, XL (stored as 1, 2, 3, 5, 8)


class UnestimatedHandling(str, Enum):
    """How to handle unestimated issues for sprint budget."""
    DEFAULT_ONE_POINT = "default_one_point"      # Count as 1 point
    BLOCK_UNTIL_ESTIMATED = "block_until_estimated"  # Block completion


# --- Ticket limbo enums ---

class LimboType(str, Enum):
    """Type of limbo - what action was blocked."""
    CLAIM = "claim"  # User tried to move ticket to in_progress
    CLOSE = "close"  # User tried to move ticket to done/cancelled
