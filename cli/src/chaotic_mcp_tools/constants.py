"""Value lists shared by every tool signature (and by the CLI's own
``issue`` commands, which import them from here so there is exactly one
copy)."""
from __future__ import annotations

from typing import Literal

ISSUE_TYPES = ["task", "bug", "feature", "chore", "docs", "tech_debt", "refactor", "epic"]
ISSUE_TYPE_ALIASES = {
    "feat": "feature",
    "improvement": "feature",
    "doc": "docs",
    "debt": "tech_debt",
    "techdebt": "tech_debt",
    "tech-debt": "tech_debt",
}

STATUS_VALUES = Literal["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
PRIORITY_VALUES = Literal["no_priority", "low", "medium", "high", "urgent"]
SORT_FIELDS = Literal["created", "updated", "priority", "status", "title", "estimate"]
SORT_ORDER = Literal["asc", "desc"]
RELATION_TYPES = Literal["blocks", "relates_to", "duplicates"]
SPRINT_STATUS_VALUES = Literal["planned", "active", "completed"]

# The one HTTP-only parameter. Present on a tool's schema only when the
# bound backend's Capabilities.team_param is True (registry.bind).
TEAM_FIELD_DESC = (
    "Team id, key, or name (only needed to disambiguate when this API "
    "key's user has access to more than one team). Defaults to this API "
    "key's only accessible team, if there's exactly one."
)
