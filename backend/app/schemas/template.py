"""Template schemas (CHT-1259).

The template body is a versioned document with an extensible ``sections``
map::

    {"version": 1, "sections": {"rituals": [...], "settings": {...}}}

``TemplateBody`` validates the sections it knows about (``rituals``,
``settings``) strictly, and passes through unknown sections untouched --
they survive round trips (create -> export -> import -> apply) and only
produce a warning at apply time, never a crash. That's the forward-compat
slot for planned sections like "hooks" (CHT-1263, deferred).
"""
import json
import re
from pydantic import BaseModel, ConfigDict, Field, field_validator
from app.enums import (
    ApprovalMode,
    EstimateScale,
    RitualTrigger,
    UnestimatedHandling,
)
from app.schemas.ritual import _coerce_enum
from app.utils import DateTimeUTC

TEMPLATE_BODY_VERSION = 1

# Sections this code knows how to validate and apply. Anything else in
# the sections map is carried through untouched with a warning.
KNOWN_SECTIONS = {"rituals", "settings"}

_NAME_RE = re.compile(r"^[a-zA-Z0-9_]([a-zA-Z0-9_-]*[a-zA-Z0-9_])?$")


def validate_template_name(v: str) -> str:
    """Template names follow the same shape as ritual names: alphanumeric/
    underscore at the ends, hyphens allowed in the middle. Keeps them safe
    as CLI arguments and filenames."""
    if not _NAME_RE.match(v):
        raise ValueError(
            "Template name must start and end with alphanumeric characters or "
            "underscores. May contain hyphens in the middle. No spaces or "
            "special characters allowed."
        )
    if len(v) > 100:
        raise ValueError("Template name must be at most 100 characters")
    return v


class TemplateRitual(BaseModel):
    """One ritual inside a template's ``rituals`` section.

    Deliberately the portable subset of a ritual: no ids, no group
    membership (groups reference project-local rows), no conditions.
    """

    name: str = Field(min_length=1, max_length=100)
    prompt: str = Field(min_length=1)
    trigger: RitualTrigger = RitualTrigger.EVERY_SPRINT
    approval_mode: ApprovalMode = ApprovalMode.AUTO
    note_required: bool = True
    is_active: bool = True

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        # Same rule as RitualCreate.validate_name -- these names become
        # rituals verbatim on apply.
        if not _NAME_RE.match(v):
            raise ValueError(
                "Ritual name must start and end with alphanumeric characters or "
                "underscores. May contain hyphens in the middle. No spaces or "
                "special characters allowed."
            )
        return v

    @field_validator("trigger", mode="before")
    @classmethod
    def coerce_trigger(cls, v):
        return _coerce_enum(RitualTrigger, v)

    @field_validator("approval_mode", mode="before")
    @classmethod
    def coerce_approval_mode(cls, v):
        return _coerce_enum(ApprovalMode, v)


class TemplateSettings(BaseModel):
    """The project-settings section of a template.

    All fields optional: a template pins only the keys present in its
    stored settings dict, and apply only touches the pinned ones
    (presence-of-key semantics -- see TemplateBody.validate_sections).

    ``default_sprint_budget`` is the one setting whose null is
    meaningful: ``default_sprint_budget: null`` pins "unlimited" (PR #220
    review finding 1). For every other setting a null is rejected at
    create/import time rather than silently dropped.
    """

    estimate_scale: EstimateScale | None = None
    unestimated_handling: UnestimatedHandling | None = None
    default_sprint_budget: int | None = Field(default=None, ge=1)
    human_rituals_required: bool | None = None
    require_estimate_on_claim: bool | None = None

    @field_validator("estimate_scale", mode="before")
    @classmethod
    def coerce_estimate_scale(cls, v):
        if v is None:
            return None
        return _coerce_enum(EstimateScale, v)

    @field_validator("unestimated_handling", mode="before")
    @classmethod
    def coerce_unestimated_handling(cls, v):
        if v is None:
            return None
        return _coerce_enum(UnestimatedHandling, v)


class TemplateBody(BaseModel):
    """The whole body document. ``sections`` is an open map: known keys
    are validated by ``validated_rituals()``/``validated_settings()``,
    unknown keys ride along (see module docstring)."""

    version: int = TEMPLATE_BODY_VERSION
    sections: dict = Field(default_factory=dict)

    @field_validator("version")
    @classmethod
    def validate_version(cls, v: int) -> int:
        if v != TEMPLATE_BODY_VERSION:
            raise ValueError(
                f"Unsupported template body version {v}; this build understands "
                f"version {TEMPLATE_BODY_VERSION}."
            )
        return v

    @field_validator("sections")
    @classmethod
    def validate_sections(cls, v: dict) -> dict:
        if not isinstance(v, dict):
            raise ValueError("Template sections must be a mapping")
        # Validate known sections strictly now, so a malformed template
        # fails at create/import time, not at apply time.
        if "rituals" in v:
            if not isinstance(v["rituals"], list):
                raise ValueError("Template section 'rituals' must be a list")
            v["rituals"] = [
                TemplateRitual.model_validate(r).model_dump(mode="json")
                for r in v["rituals"]
            ]
            # Duplicate names would create-then-conflict against
            # themselves at apply time and make per-name update approval
            # ambiguous (PR #220 review finding 2). Fail here instead.
            names = [r["name"] for r in v["rituals"]]
            dupes = sorted({n for n in names if names.count(n) > 1})
            if dupes:
                raise ValueError(
                    f"Duplicate ritual name(s) in template: {', '.join(dupes)}. "
                    f"Ritual names must be unique within a template."
                )
        if "settings" in v:
            if not isinstance(v["settings"], dict):
                raise ValueError("Template section 'settings' must be a mapping")
            # Presence-of-key = pinned. A null is only meaningful for
            # default_sprint_budget (pins "unlimited"); for anything else
            # it would previously be dropped silently (PR #220 review
            # finding 1) -- reject it loudly instead.
            null_keys = sorted(
                k for k, val in v["settings"].items()
                if val is None and k != "default_sprint_budget"
            )
            if null_keys:
                raise ValueError(
                    f"Setting(s) {', '.join(null_keys)} cannot be null; omit "
                    f"the key to leave the setting unpinned. (Only "
                    f"default_sprint_budget accepts null, meaning 'unlimited'.)"
                )
            # exclude_unset (not exclude_none): keeps a pinned
            # default_sprint_budget: null in the stored body.
            v["settings"] = TemplateSettings.model_validate(
                v["settings"]
            ).model_dump(mode="json", exclude_unset=True)
        return v

    def unknown_sections(self) -> list[str]:
        """Section keys this build doesn't understand (forward compat)."""
        return sorted(set(self.sections) - KNOWN_SECTIONS)

    def rituals(self) -> list[TemplateRitual]:
        return [TemplateRitual.model_validate(r) for r in self.sections.get("rituals", [])]

    def settings(self) -> TemplateSettings:
        return TemplateSettings.model_validate(self.sections.get("settings", {}))

    def pinned_settings(self) -> set[str]:
        """Setting keys this template pins (presence-of-key semantics --
        includes a pinned ``default_sprint_budget: null``)."""
        stored = self.sections.get("settings", {})
        return set(stored) & set(TemplateSettings.model_fields)


class TemplateCreate(BaseModel):
    """Schema for creating a template from an explicit body (import path,
    and the snapshot path once the service has built the body)."""

    name: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=1000)
    body: TemplateBody

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        return validate_template_name(v)


class TemplateSnapshotRequest(BaseModel):
    """Schema for creating a template by snapshotting a project."""

    name: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=1000)
    project_id: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        return validate_template_name(v)


class TemplateResponse(BaseModel):
    """Schema for template response."""

    id: str
    team_id: str
    name: str
    description: str | None = None
    body: TemplateBody
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)

    @field_validator("body", mode="before")
    @classmethod
    def parse_body(cls, v):
        """Parse the stored JSON string into a TemplateBody."""
        if isinstance(v, str):
            return json.loads(v)
        return v


class TemplateApplyRequest(BaseModel):
    """Schema for applying a template to a project."""

    project_id: str
    # Ritual names (subset of the template's rituals) the caller has
    # approved for update when they already exist with different fields.
    # Missing rituals are always created; rituals not listed here that
    # would need an update are reported as skipped. The CLI drives its
    # per-change prompt loop with this via a dry_run pass first.
    update_rituals: list[str] = Field(default_factory=list)
    update_all: bool = False  # --yes: update every same-named ritual that differs
    dry_run: bool = False


class RitualChange(BaseModel):
    """One ritual-level line item in an apply report."""

    name: str
    action: str  # "create" | "update" | "unchanged" | "skipped"
    fields_changed: list[str] = Field(default_factory=list)


class SettingChange(BaseModel):
    """One settings-level line item in an apply report."""

    field: str
    action: str  # "set" | "unchanged"
    old_value: str | int | bool | None = None
    new_value: str | int | bool | None = None


class TemplateApplyReport(BaseModel):
    """Structured change report for an apply (or dry run)."""

    template: str
    project_id: str
    project_key: str
    dry_run: bool
    rituals: list[RitualChange]
    settings: list[SettingChange]
    warnings: list[str] = Field(default_factory=list)
