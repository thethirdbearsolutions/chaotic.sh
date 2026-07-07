"""Oxyde ORM Template model (CHT-1259).

A Template is a named, portable snapshot of (rituals + project settings)
for a team. ``body`` is a JSON-serialized document shaped like::

    {"version": 1, "sections": {"rituals": [...], "settings": {...}}}

``sections`` is an intentionally open map -- ``TemplateService`` validates
the sections it knows about (``rituals``, ``settings``) and passes through
anything else with a forward-compat warning rather than raising, so a
future section (e.g. a planned "hooks" section, CHT-1263 -- deferred, not
implemented here) can start appearing in exported/imported YAML before the
code that consumes it exists, without breaking older installs reading
newer bodies or vice versa.

``body`` is stored as a plain string (same str-JSON pattern as
``OxydeRitual.conditions``) rather than a nested Oxyde field, since Oxyde
has no native JSON column type here.
"""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field, Index


class OxydeTemplate(Model):
    """A saved (rituals + settings) snapshot, unique by name within a team."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    # Unique per-team (not globally) -- see Meta.indexes, same pattern as
    # OxydeLabel/OxydeProject (migration 0008). TemplateService.create()
    # catches the resulting IntegrityError on a lost create-create race.
    name: str = Field()
    description: str | None = Field(default=None)
    body: str = Field()  # JSON string: {"version": 1, "sections": {...}}
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "templates"
        indexes = [
            Index(("team_id", "name"), unique=True, name="templates_team_id_name_idx"),
        ]
