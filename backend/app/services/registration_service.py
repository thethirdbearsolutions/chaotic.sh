"""Agent self-registration (CHT-1498, thin slice S2 of CHT-1428).

A *registrar* is an agent with ``can_register`` (kind service), made once
by a human for a harness or a machine, or a human calling for themself.
It gets or creates the *session identity* it knows by ``external_ref``
(``claude-code:session:<id>``) and mints that identity a fresh,
expiring key. A session identity is an ordinary agent, so scope checks,
gates, leases, the inbox and deactivation all apply to it unchanged.

Who answers for what (ADR-0008): the new key's holder is the holder of
the key the registrar called with (for a human, the human). That human
also becomes the identity's owner (``parent_user_id``). So a session
identity dies with its human exactly as any agent key does (CHT-1508,
CHT-1510): leaving the team revokes the keys they hold and sign-in
refuses an agent key whose holder is no longer a member.

The rules, each enforced here and tested in tests/test_agent_register.py:

1. Caller: a human team member, or an active registrar whose key's
   holder is an active member of its team. A registered identity can
   never register (one level).
2. Scope: at most the registrar's. ``project_id`` may narrow a
   team-scoped registrar; anything wider is a 403 naming the limit.
3. Idempotent on (team, external_ref): the same registrar gets the same
   identity back (renamed if asked); another registrar, or an agent not
   registered by this caller, gets 409; a deactivated identity gets 409.
4. Every call mints a new key named ``session <ref>`` expiring after
   ``agent_session_key_ttl_seconds`` and revokes the identity's others.
5. Caps (429): active identities per registrar, registrations per
   rolling hour per registrar (rotations count).
8. A name equal to a human team member's name is refused.

Rule 6 (registrars are register-only) is a request-path check in
``app.api.deps`` and the MCP backend; rule 7 (deactivating a registrar
retires its identities) is in ``AgentService.deactivate``.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone

from oxyde import IntegrityError, atomic

from app.config import get_settings
from app.enums import AgentKind
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.agent import AgentRegister
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService
from app.utils.datetimes import ensure_utc

logger = logging.getLogger(__name__)


class RegistrationRefused(Exception):
    """A registration the rules refuse. Carries the HTTP status, a stable
    `error_code` and a sentence; the route turns it into the structured
    detail every governance refusal uses (ADR-0006)."""

    def __init__(self, status_code: int, error_code: str, message: str, **extra):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code
        self.message = message
        self.extra = extra
        self.headers: dict[str, str] | None = None

    def detail(self) -> dict:
        return {"error_code": self.error_code, "message": self.message, **self.extra}


@dataclass
class Registration:
    agent: OxydeUser
    created: bool
    full_key: str
    api_key: OxydeAPIKey
    revoked_keys: int = 0
    extra: dict = field(default_factory=dict)


def _norm(name: str) -> str:
    return " ".join(name.split()).casefold()


class RegistrationService:
    async def register(
        self, caller: OxydeUser, calling_key: OxydeAPIKey | None, req: AgentRegister,
    ) -> Registration:
        """Get or create the identity, mint its key. Raises
        RegistrationRefused for anything the rules refuse."""
        try:
            return await self._register(caller, calling_key, req)
        except IntegrityError:
            # Lost a race to create the same (team, external_ref): the row
            # exists now, so the second attempt takes the get path.
            return await self._register(caller, calling_key, req)

    async def _register(
        self, caller: OxydeUser, calling_key: OxydeAPIKey | None, req: AgentRegister,
    ) -> Registration:
        settings = get_settings()
        async with atomic():
            team_id, project_id, holder_id = await self._authorize(caller, calling_key, req)

            existing = await self._find(team_id, req.external_ref)
            if existing is not None:
                self._check_adoptable(existing, caller, req, project_id)
            else:
                await self._check_identity_cap(caller, settings.registrar_max_active_identities)
            await self._check_rate(caller, settings.registrar_max_registrations_per_hour)

            name = req.name or (existing.name if existing else self._default_name(caller, req.external_ref))
            if existing is None or (req.name and req.name != existing.name):
                await self._check_name(team_id, name)

            if existing is None:
                agent = await OxydeUser.objects.create(
                    email=f"session-{_ref_slug(req.external_ref)}-{_rand()}@agent.local",
                    hashed_password="",
                    name=name,
                    is_agent=True,
                    kind=AgentKind.SESSION,
                    parent_user_id=holder_id,
                    agent_team_id=team_id,
                    agent_project_id=project_id,
                    external_ref=req.external_ref,
                    registered_by_id=caller.id,
                    can_register=False,
                )
                created, revoked = True, 0
            else:
                agent = existing
                if name != agent.name:
                    agent.name = name
                    agent.updated_at = datetime.now(timezone.utc)
                    await agent.save(update_fields={"name", "updated_at"})
                revoked = await OxydeAPIKey.objects.filter(
                    principal_user_id=agent.id, is_active=True,
                ).update(is_active=False)
                created = False

            expires_at = datetime.now(timezone.utc) + timedelta(seconds=settings.agent_session_key_ttl_seconds)
            api_key, full_key = await APIKeyService().create(
                agent.id,
                APIKeyCreate(name=f"session {req.external_ref}", expires_at=expires_at),
                holder_user_id=holder_id,
            )

        agent = await OxydeUser.objects.join("parent_user").filter(id=agent.id).first()
        # No activity table covers agents (CHT-1509); this line and
        # registered_by_id are the audit trail for the slice.
        logger.info(
            "identity %s (%s, ref %s) %s by %s (%s); key %s held by %s, %d prior key(s) revoked",
            agent.id, agent.name, req.external_ref, "registered" if created else "re-registered",
            caller.id, caller.name, api_key.key_prefix, holder_id, revoked,
        )
        return Registration(agent=agent, created=created, full_key=full_key, api_key=api_key, revoked_keys=revoked)

    async def _find(self, team_id: str, external_ref: str) -> OxydeUser | None:
        return await OxydeUser.objects.filter(agent_team_id=team_id, external_ref=external_ref).first()

    # -- rule 1 and 2: who may register, and into what scope -----------------

    async def _authorize(
        self, caller: OxydeUser, calling_key: OxydeAPIKey | None, req: AgentRegister,
    ) -> tuple[str, str | None, str]:
        """(team_id, project_id, holder_id) for the new identity's scope
        and key, or RegistrationRefused."""
        if caller.registered_by_id is not None or caller.kind == AgentKind.SESSION:
            raise RegistrationRefused(
                403, "registered_identity_cannot_register",
                "A registered identity cannot register identities: registration is one level deep.",
            )

        project = None
        if req.project_id is not None:
            project = await OxydeProject.objects.get_or_none(id=req.project_id)
            if project is None:
                raise RegistrationRefused(404, "project_not_found", "Project not found.")

        if caller.is_agent:
            if not caller.can_register:
                raise RegistrationRefused(
                    403, "not_a_registrar",
                    "This agent cannot register identities. Its creator or a team admin can make it a "
                    "registrar (PATCH /api/agents/{id} with can_register=true).",
                )
            if calling_key is None or not calling_key.holder_user_id:
                raise RegistrationRefused(
                    403, "registrar_key_required", "A registrar registers with one of its own API keys.",
                )
            holder_id = calling_key.holder_user_id
            team_id = caller.agent_team_id
            if req.team_id is not None and req.team_id != team_id:
                raise RegistrationRefused(
                    403, "scope_exceeds_registrar",
                    f"This registrar is limited to team {team_id}; it cannot register into team {req.team_id}.",
                )
            if caller.agent_project_id:
                if project is not None and project.id != caller.agent_project_id:
                    raise RegistrationRefused(
                        403, "scope_exceeds_registrar",
                        f"This registrar is limited to project {caller.agent_project_id}; "
                        f"it cannot register into project {project.id}.",
                    )
                project_id = caller.agent_project_id
            else:
                if project is not None and project.team_id != team_id:
                    raise RegistrationRefused(
                        403, "scope_exceeds_registrar",
                        f"This registrar is limited to team {team_id}; project {project.id} is in another team.",
                    )
                project_id = project.id if project is not None else None
        else:
            holder_id = caller.id
            if project is not None:
                if req.team_id is not None and req.team_id != project.team_id:
                    raise RegistrationRefused(
                        422, "tool_input", f"Project {project.id} is not in team {req.team_id}.",
                    )
                team_id = project.team_id
            elif req.team_id is not None:
                team_id = req.team_id
            else:
                raise RegistrationRefused(
                    422, "tool_input", "A person registering an identity must name a team_id or a project_id.",
                )
            project_id = project.id if project is not None else None

        # The human who will answer for the identity's key must be an
        # active member of its team now, in this transaction: for an
        # agent registrar sign-in already checked, but a removal can
        # commit in between (CHT-1508), and a person must belong to the
        # team they register into.
        holder = await OxydeUser.objects.get_or_none(id=holder_id)
        member = await OxydeTeamMember.objects.filter(team_id=team_id, user_id=holder_id).first()
        if holder is None or not holder.is_active or holder.is_agent or member is None:
            if caller.is_agent:
                raise RegistrationRefused(
                    403, "registrar_holder_not_member",
                    "The person who holds this registrar's key is no longer an active member of its team.",
                )
            raise RegistrationRefused(403, "not_a_member", f"Not a member of team {team_id}.")
        return team_id, project_id, holder_id

    # -- rule 3: idempotency --------------------------------------------------

    def _check_adoptable(self, existing: OxydeUser, caller: OxydeUser, req: AgentRegister, project_id) -> None:
        if not existing.is_agent or existing.registered_by_id != caller.id:
            # Another registrar's identity, or an agent made by hand: never
            # re-adopted, whatever the caller can otherwise do.
            raise RegistrationRefused(
                409, "external_ref_taken",
                f"external_ref {req.external_ref!r} already names an identity this caller did not register.",
            )
        if not existing.is_active:
            raise RegistrationRefused(
                409, "identity_deactivated",
                f"The identity registered as {req.external_ref!r} is deactivated. Its creator or a team admin "
                f"can reactivate it (POST /api/agents/{existing.id}/reactivate); registration will not.",
                agent_id=existing.id,
            )
        if req.project_id is not None and project_id != existing.agent_project_id:
            raise RegistrationRefused(
                409, "identity_scope_mismatch",
                f"The identity registered as {req.external_ref!r} is scoped to "
                f"{'project ' + existing.agent_project_id if existing.agent_project_id else 'the whole team'}; "
                "an identity's scope does not change on re-registration.",
                agent_id=existing.id,
            )

    # -- rule 5: caps ---------------------------------------------------------

    async def _check_identity_cap(self, caller: OxydeUser, limit: int) -> None:
        active = await OxydeUser.objects.filter(registered_by_id=caller.id, is_active=True).count()
        if active >= limit:
            raise RegistrationRefused(
                429, "registrar_identity_cap",
                f"This registrar already has {active} active identities (limit {limit}). Deactivate idle ones "
                "or raise REGISTRAR_MAX_ACTIVE_IDENTITIES.",
                limit=limit,
            )

    async def _check_rate(self, caller: OxydeUser, limit: int) -> None:
        identity_ids = [
            row["id"] if isinstance(row, dict) else row.id
            for row in await OxydeUser.objects.filter(registered_by_id=caller.id).values("id").all()
        ]
        if not identity_ids:
            return
        now = datetime.now(timezone.utc)
        window = now - timedelta(hours=1)
        recent = await OxydeAPIKey.objects.filter(
            principal_user_id__in=identity_ids, created_at__gte=window,
        ).order_by("created_at").values("created_at").all()
        if len(recent) >= limit:
            # The window frees a slot when its oldest registration ages out.
            oldest = recent[len(recent) - limit]
            oldest_at = ensure_utc(oldest["created_at"] if isinstance(oldest, dict) else oldest.created_at)
            retry_after = max(1, int((oldest_at + timedelta(hours=1) - now).total_seconds()) + 1)
            refused = RegistrationRefused(
                429, "registrar_rate_limited",
                f"This registrar made {len(recent)} registrations in the last hour (limit {limit}). "
                f"Retry in {retry_after} seconds, or raise REGISTRAR_MAX_REGISTRATIONS_PER_HOUR.",
                limit=limit, retry_after_seconds=retry_after,
            )
            refused.headers = {"Retry-After": str(retry_after)}
            raise refused

    # -- rule 8: names --------------------------------------------------------

    async def _check_name(self, team_id: str, name: str) -> None:
        member_ids = [m.user_id for m in await OxydeTeamMember.objects.filter(team_id=team_id).all()]
        if not member_ids:  # pragma: no cover - every caller is (or is held by) a member
            return
        people = await OxydeUser.objects.filter(id__in=member_ids, is_agent=False).values("name").all()
        wanted = _norm(name)
        if any(_norm(p["name"] if isinstance(p, dict) else p.name) == wanted for p in people):
            raise RegistrationRefused(
                422, "name_matches_member",
                f"{name!r} is the name of a person in this team; an identity may not share it.",
            )

    @staticmethod
    def _default_name(caller: OxydeUser, external_ref: str) -> str:
        return f"{caller.name} · {external_ref[-8:]}"[:255]


def _ref_slug(ref: str) -> str:
    return "".join(c if c.isalnum() else "-" for c in ref[-24:]).strip("-").lower() or "ref"


def _rand() -> str:
    import uuid

    return uuid.uuid4().hex[:12]
