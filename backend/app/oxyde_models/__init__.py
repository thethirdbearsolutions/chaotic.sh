"""Oxyde ORM models."""
# Importing app.oxyde_db at package load installs the QueryManager.create patch
# that applies Pydantic default_factory values on insert. Without this, every
# model with a defaulted non-PK column (created_at, updated_at, etc.) hits
# NOT NULL violations the moment a service calls `objects.create()`.
from app import oxyde_db as _oxyde_db  # noqa: F401

from app.oxyde_models.user import OxydeUser
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember, OxydeTeamInvitation
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.document import (
    OxydeDocument,
    OxydeDocumentComment,
    OxydeDocumentActivity,
    OxydeDocumentIssue,
    OxydeDocumentLabel,
)
from app.oxyde_models.issue import (
    OxydeIssue,
    OxydeIssueComment,
    OxydeIssueActivity,
    OxydeIssueRelation,
    OxydeIssueLabel,
    OxydeTicketLimbo,
    OxydeTicketLimboBlocker,
    OxydeBudgetTransaction,
)
from app.oxyde_models.ritual import (
    OxydeRitual,
    OxydeRitualGroup,
    OxydeRitualAttestation,
)

__all__ = [
    "OxydeUser",
    "OxydeTeam",
    "OxydeTeamMember",
    "OxydeTeamInvitation",
    "OxydeProject",
    "OxydeSprint",
    "OxydeAPIKey",
    "OxydeLabel",
    "OxydeDocument",
    "OxydeDocumentComment",
    "OxydeDocumentActivity",
    "OxydeDocumentIssue",
    "OxydeDocumentLabel",
    "OxydeIssue",
    "OxydeIssueComment",
    "OxydeIssueActivity",
    "OxydeIssueRelation",
    "OxydeIssueLabel",
    "OxydeTicketLimbo",
    "OxydeTicketLimboBlocker",
    "OxydeBudgetTransaction",
    "OxydeRitual",
    "OxydeRitualGroup",
    "OxydeRitualAttestation",
]
