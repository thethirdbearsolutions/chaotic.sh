"""Template service (CHT-1259).

Templates are named, portable snapshots of (rituals + project settings)
scoped to a team. Snapshot captures a project's active rituals (name,
prompt, trigger, approval mode, note_required, is_active) and its
settings (estimate scale, unestimated handling, default sprint budget,
human_rituals_required, require_estimate_on_claim).

Apply semantics (idempotent by design):
  * rituals missing from the project are created;
  * same-named rituals whose template fields differ are updated only
    when the caller opted in (per-name via ``update_rituals`` or
    globally via ``update_all``) -- otherwise reported as "skipped";
  * rituals in the project but NOT in the template are never touched,
    let alone deleted;
  * settings pinned by the template are set; unpinned settings are
    left alone.

Running apply twice with the same inputs is a no-op the second time:
every line item comes back "unchanged".

Unknown body sections (e.g. a future "hooks" section, CHT-1263) produce
a warning in the apply report and are otherwise ignored -- forward
compat, never a crash.
"""
import json
from contextlib import AsyncExitStack
from datetime import datetime, timezone

from oxyde import IntegrityError, atomic

from app.oxyde_models.project import OxydeProject
from app.oxyde_models.ritual import OxydeRitual
from app.oxyde_models.template import OxydeTemplate
from app.schemas.ritual import RitualCreate, RitualUpdate
from app.schemas.template import (
    RitualChange,
    SettingChange,
    TemplateApplyReport,
    TemplateBody,
    TemplateCreate,
    TemplateRitual,
    TemplateSettings,
)
from app.services.ritual_service import RitualService

# Ritual fields a template pins. group/conditions/weight/percentage are
# deliberately not part of the portable snapshot (they reference
# project-local rows or per-project tuning).
_RITUAL_FIELDS = ("prompt", "trigger", "approval_mode", "note_required", "is_active")

# Project settings a template pins.
_SETTINGS_FIELDS = (
    "estimate_scale",
    "unestimated_handling",
    "default_sprint_budget",
    "human_rituals_required",
    "require_estimate_on_claim",
)


def _enum_value(v):
    """Normalize enum-or-string to the enum's value for comparison/report."""
    return v.value if hasattr(v, "value") else v


class TemplateService:
    """Service for template operations."""

    async def create(self, template_in: TemplateCreate, team_id: str) -> OxydeTemplate:
        """Create a template from an explicit, already-validated body."""
        existing = await self.get_by_name(team_id, template_in.name)
        if existing:
            raise ValueError(
                f"A template named '{template_in.name}' already exists in this team"
            )
        try:
            template = await OxydeTemplate.objects.create(
                team_id=team_id,
                name=template_in.name,
                description=template_in.description,
                body=json.dumps(template_in.body.model_dump(mode="json")),
            )
        except IntegrityError:
            # Lost a create-create race; the unique (team_id, name) index
            # (migration 0013) backstops the check above. Surface it as the
            # same duplicate-name error the check would have raised.
            raise ValueError(
                f"A template named '{template_in.name}' already exists in this team"
            )
        return template

    async def snapshot_project(
        self, name: str, project: OxydeProject, description: str | None = None
    ) -> TemplateCreate:
        """Build a TemplateCreate by snapshotting a project's rituals and
        settings. Caller passes the result to ``create()``."""
        rituals = await RitualService().list_by_project(project.id)
        body = TemplateBody(
            version=1,
            sections={
                "rituals": [
                    TemplateRitual(
                        name=r.name,
                        prompt=r.prompt,
                        trigger=r.trigger,
                        approval_mode=r.approval_mode,
                        note_required=r.note_required,
                        is_active=r.is_active,
                    ).model_dump(mode="json")
                    for r in rituals
                ],
                # exclude_unset (not exclude_none): all five settings are
                # passed explicitly, so all five are pinned -- including
                # default_sprint_budget: null when the project's budget is
                # unlimited (PR #220 review finding 1; an unlimited budget
                # used to fall out of the snapshot silently).
                "settings": TemplateSettings(
                    estimate_scale=project.estimate_scale,
                    unestimated_handling=project.unestimated_handling,
                    default_sprint_budget=project.default_sprint_budget,
                    human_rituals_required=project.human_rituals_required,
                    require_estimate_on_claim=project.require_estimate_on_claim,
                ).model_dump(mode="json", exclude_unset=True),
            },
        )
        return TemplateCreate(name=name, description=description, body=body)

    async def get_by_id(self, template_id: str) -> OxydeTemplate | None:
        return await OxydeTemplate.objects.get_or_none(id=template_id)

    async def get_by_name(self, team_id: str, name: str) -> OxydeTemplate | None:
        return await OxydeTemplate.objects.filter(team_id=team_id, name=name).first()

    async def list_by_team(self, team_id: str) -> list[OxydeTemplate]:
        return await OxydeTemplate.objects.filter(team_id=team_id).order_by("name").all()

    async def delete(self, template: OxydeTemplate) -> None:
        await template.delete()

    # ------------------------------------------------------------------
    # Apply
    # ------------------------------------------------------------------

    async def apply(
        self,
        template: OxydeTemplate,
        project: OxydeProject,
        update_rituals: list[str] | None = None,
        update_all: bool = False,
        dry_run: bool = False,
    ) -> TemplateApplyReport:
        """Apply a template to a project. See module docstring for the
        idempotency contract. ``dry_run=True`` computes the same report
        without writing anything.

        Non-dry-run writes run in one transaction (PR #220 review
        finding 6): a mid-loop failure rolls back the whole apply
        instead of leaving a partially-applied template.
        """
        body = TemplateBody.model_validate(json.loads(template.body))
        approved = set(update_rituals or [])

        warnings = [
            f"Template contains section '{s}' this server version doesn't "
            f"understand; it was ignored. Upgrade to use it."
            for s in body.unknown_sections()
        ]

        ritual_service = RitualService()
        ritual_changes: list[RitualChange] = []
        setting_changes: list[SettingChange] = []

        async with AsyncExitStack() as stack:
            if not dry_run:
                await stack.enter_async_context(atomic())

            for t_ritual in body.rituals():
                existing = await ritual_service.get_by_name(
                    project.id, t_ritual.name, include_inactive=True
                )
                if existing is None:
                    if not dry_run:
                        await ritual_service.create(
                            RitualCreate(
                                name=t_ritual.name,
                                prompt=t_ritual.prompt,
                                trigger=t_ritual.trigger,
                                approval_mode=t_ritual.approval_mode,
                                note_required=t_ritual.note_required,
                            ),
                            project.id,
                        )
                        if not t_ritual.is_active:
                            # Template snapshots can carry inactive rituals;
                            # honor that on create (rare, but round-trip exact).
                            created = await ritual_service.get_by_name(
                                project.id, t_ritual.name
                            )
                            if created is None:
                                # We created this row two statements ago; a
                                # miss means something deleted it mid-apply.
                                # Fail loud (PR #220 review finding 3) --
                                # silently proceeding would leave an ACTIVE
                                # ritual the template says is inactive.
                                raise RuntimeError(
                                    f"Ritual '{t_ritual.name}' vanished "
                                    f"mid-apply; concurrent modification? "
                                    f"Re-run the apply."
                                )
                            await ritual_service.update(
                                created, RitualUpdate(is_active=False)
                            )
                    ritual_changes.append(RitualChange(name=t_ritual.name, action="create"))
                    continue

                diff = self._diff_ritual(existing, t_ritual)
                if not diff:
                    ritual_changes.append(
                        RitualChange(name=t_ritual.name, action="unchanged")
                    )
                    continue

                if update_all or t_ritual.name in approved:
                    if not dry_run:
                        await ritual_service.update(
                            existing,
                            RitualUpdate(
                                **{f: getattr(t_ritual, f) for f in diff}
                            ),
                        )
                    ritual_changes.append(
                        RitualChange(
                            name=t_ritual.name, action="update", fields_changed=diff
                        )
                    )
                else:
                    ritual_changes.append(
                        RitualChange(
                            name=t_ritual.name, action="skipped", fields_changed=diff
                        )
                    )

            settings = body.settings()
            # Presence-of-key = pinned (PR #220 review finding 1): a stored
            # ``default_sprint_budget: null`` pins "unlimited" rather than
            # falling out of the template.
            pinned = body.pinned_settings()
            # Coerce the project's current values through the same validators
            # as the template's (DB enum fields can surface as name-strings
            # like "FIBONACCI" depending on fetch path; compare apples to
            # apples). default_sprint_budget is read straight off the project
            # since its None is a real value, not "unset".
            current = TemplateSettings(
                estimate_scale=project.estimate_scale,
                unestimated_handling=project.unestimated_handling,
                human_rituals_required=project.human_rituals_required,
                require_estimate_on_claim=project.require_estimate_on_claim,
            )
            to_set: dict = {}
            for field in _SETTINGS_FIELDS:
                if field not in pinned:
                    continue
                if field == "default_sprint_budget":
                    old = project.default_sprint_budget
                else:
                    old = getattr(current, field)
                new = getattr(settings, field)
                if _enum_value(old) == _enum_value(new):
                    setting_changes.append(
                        SettingChange(
                            field=field, action="unchanged",
                            old_value=_enum_value(old), new_value=_enum_value(new),
                        )
                    )
                else:
                    to_set[field] = new
                    setting_changes.append(
                        SettingChange(
                            field=field, action="set",
                            old_value=_enum_value(old), new_value=_enum_value(new),
                        )
                    )

            if to_set and not dry_run:
                for field, value in to_set.items():
                    setattr(project, field, value)
                project.updated_at = datetime.now(timezone.utc)
                await project.save(update_fields=set(to_set) | {"updated_at"})

        return TemplateApplyReport(
            template=template.name,
            project_id=project.id,
            project_key=project.key,
            dry_run=dry_run,
            rituals=ritual_changes,
            settings=setting_changes,
            warnings=warnings,
        )

    @staticmethod
    def _diff_ritual(existing: OxydeRitual, t_ritual: TemplateRitual) -> list[str]:
        """Names of template-pinned fields whose values differ.

        The existing ritual's enum fields are coerced through the same
        TemplateRitual validators as the template's (DB enum fields can
        surface as name-strings like "EVERY_SPRINT" depending on fetch
        path), so the comparison is enum-to-enum.
        """
        existing_t = TemplateRitual(
            name=existing.name,
            prompt=existing.prompt,
            trigger=existing.trigger,
            approval_mode=existing.approval_mode,
            note_required=existing.note_required,
            is_active=existing.is_active,
        )
        return [
            f for f in _RITUAL_FIELDS
            if getattr(existing_t, f) != getattr(t_ritual, f)
        ]
