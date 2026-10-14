"""Ritual API routes."""
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, check_user_project_access
from app.schemas.ritual import (
    _coerce_enum,
    RitualCreate,
    RitualUpdate,
    RitualResponse,
    RitualAttestationCreate,
    RitualAttestationResponse,
    RitualAttestationHistoryItem,
    LimboStatusResponse,
    PendingRitualResponse,
    CompletedRitualResponse,
    TicketRitualsStatusResponse,
    RitualGroupCreate,
    RitualGroupUpdate,
    RitualGroupResponse,
    PendingGateIssueResponse,
    PendingApprovalIssueResponse,
    LimboClearedResponse,
    TicketLimboClearedResponse,
    RitualRejectCreate,
    RitualRejectionResponse,
)
from app.oxyde_models.ritual import OxydeRitualRejection
from app.services.issue_service import IssueService
from app.services.ritual_service import (
    NothingToRejectError,
    RitualAlreadyResolvedError,
    RitualService,
)
from app.services.project_service import ProjectService
from app.services.team_service import TeamService
from app.services.sprint_service import SprintService
from app.enums import ApprovalMode, RitualTrigger, ActivityType
from app.services.principals import fill_principals, load_principals
from app.websocket import broadcast_attestation_event

router = APIRouter()
logger = logging.getLogger(__name__)


def _attestation_response(att) -> RitualAttestationResponse:
    """The attestation without its principals; ``fill_principals`` sets
    attester/approver and their names, once for a whole response."""
    return RitualAttestationResponse(
        id=att.id,
        ritual_id=att.ritual_id,
        sprint_id=att.sprint_id,
        issue_id=att.issue_id,
        attested_by=att.attested_by,
        attested_at=att.attested_at,
        note=att.note,
        artifact_ref=att.artifact_ref,
        approved_by=att.approved_by,
        approved_at=att.approved_at,
    )


async def _build_attestation_response(att) -> RitualAttestationResponse:
    """One attestation with its principals loaded (CHT-1500): two queries
    for attester and approver together."""
    return await fill_principals(_attestation_response(att))


async def pending_ritual_responses(issue_id: str | None, rituals) -> list[PendingRitualResponse]:
    """One PendingRitualResponse per ritual, with its attestation state for
    `issue_id` (None when the issue does not exist yet, e.g. a create
    refused as in_progress/done). The same rows get_pending_ticket_rituals
    returns; the claim/close refusal payloads in app/api/issues.py reuse
    them so a caller can tell "attest this" from "attested, awaiting a
    human" from the 409 alone (CHT-1360)."""
    ritual_service = RitualService()
    rows = []
    for ritual in rituals:
        att = await ritual_service.get_issue_attestation(ritual.id, issue_id) if issue_id else None
        rejection = await ritual_service.latest_rejection(ritual.id, issue_id) if issue_id else None
        rows.append(PendingRitualResponse(
            id=ritual.id,
            name=ritual.name,
            prompt=ritual.prompt,
            trigger=ritual.trigger,
            approval_mode=ritual.approval_mode,
            note_required=ritual.note_required,
            artifact=ritual.artifact,
            conditions=ritual.conditions,
            attestation=_attestation_response(att) if att else None,
            last_rejection=_rejection_response(rejection, ritual) if rejection else None,
        ))
    return await fill_principals(rows)


@writes
async def create_ritual(
    project_id: str,
    ritual_in: RitualCreate,
    current_user: CurrentUser,
) -> RitualResponse:
    """Create a new ritual for a project.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``POST /projects/{project_id}/rituals`` in nested.py.
    """
    project_service = ProjectService()
    team_service = TeamService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create rituals",
        )

    try:
        ritual = await ritual_service.create(ritual_in, project_id)
        return RitualResponse.model_validate(ritual)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@reads
async def list_rituals(
    project_id: str,
    current_user: CurrentUser,
    include_inactive: bool = False,
    skip: int = 0,
    limit: int = 1000,
) -> list[RitualResponse]:
    """List rituals for a project.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``GET /projects/{project_id}/rituals`` in nested.py.
    """
    project_service = ProjectService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    rituals = await ritual_service.list_by_project(project_id, include_inactive=include_inactive)
    return [RitualResponse.model_validate(r) for r in rituals[skip:skip + limit]]


@router.get("/history", response_model=list[RitualAttestationHistoryItem])
@reads
async def list_attestation_history(
    project_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
):
    """List attestation history for a project."""
    project_service = ProjectService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    rows = await ritual_service.list_attestation_history(project_id, skip, limit)

    return await fill_principals([
        _rejection_history_item(att) if isinstance(att, OxydeRitualRejection) else RitualAttestationHistoryItem(
            id=att.id,
            ritual_name=att.ritual.name if att.ritual else "Unknown",
            ritual_trigger=(att.ritual.trigger.value if isinstance(att.ritual.trigger, RitualTrigger) else RitualTrigger[att.ritual.trigger].value) if att.ritual else "unknown",
            approval_mode=(att.ritual.approval_mode.value if isinstance(att.ritual.approval_mode, ApprovalMode) else ApprovalMode[att.ritual.approval_mode].value) if att.ritual else "unknown",
            sprint_id=att.sprint_id,
            sprint_name=att.sprint.name if att.sprint else None,
            issue_id=att.issue_id,
            issue_identifier=att.issue.identifier if att.issue else None,
            attested_by_name=att.attester.name if att.attester else "Unknown",
            attested_at=att.attested_at,
            note=att.note,
            approved_by_name=att.approver.name if att.approver else None,
            approved_at=att.approved_at,
            attested_by=att.attested_by,
            approved_by=att.approved_by,
        )
        for att in rows
    ])


def _rejection_history_item(rej) -> RitualAttestationHistoryItem:
    """A rejection as a history row (CHT-1606): what was sent back (the
    attestation, or for a GATE the request), and who rejected it and why."""
    ritual = rej.ritual
    return RitualAttestationHistoryItem(
        id=rej.id,
        ritual_name=ritual.name if ritual else "Unknown",
        # A joined row may carry the stored name rather than the member,
        # as the attestation rows above allow for.
        ritual_trigger=_coerce_enum(RitualTrigger, ritual.trigger).value if ritual else "unknown",
        approval_mode=_coerce_enum(ApprovalMode, ritual.approval_mode).value if ritual else "unknown",
        issue_id=rej.issue_id,
        issue_identifier=rej.issue.identifier if rej.issue else None,
        attested_by_name=rej.attester.name if rej.attester else "Unknown",
        attested_at=rej.attested_at or rej.rejected_at,
        note=rej.attestation_note,
        attested_by=rej.attested_by_id,
        rejected_by=rej.rejected_by_id,
        rejected_by_name=rej.rejecter.name if rej.rejecter else None,
        rejected_at=rej.rejected_at,
        rejection_note=rej.note,
    )


@router.get("/limbo", response_model=LimboStatusResponse)
@reads
async def get_limbo_status(
    project_id: str,
    current_user: CurrentUser,
) -> LimboStatusResponse:
    """Check if project is in limbo and get pending rituals."""
    project_service = ProjectService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    in_limbo, limbo_sprint, pending = await ritual_service.check_limbo(project_id)

    # Build pending ritual responses with attestation status
    pending_responses = []
    for ritual in pending:
        attestation = None
        if limbo_sprint:
            att = await ritual_service.get_attestation(ritual.id, limbo_sprint.id)
            if att:
                attestation = _attestation_response(att)

        pending_responses.append(PendingRitualResponse(
            id=ritual.id,
            name=ritual.name,
            prompt=ritual.prompt,
            trigger=ritual.trigger,
            approval_mode=ritual.approval_mode,
            note_required=ritual.note_required,
            artifact=ritual.artifact,
            conditions=ritual.conditions,
            attestation=attestation,
        ))

    # Get completed rituals with attestation details
    all_rituals = await ritual_service.list_by_project(project_id)

    sprint_rituals = [r for r in all_rituals if r.trigger == RitualTrigger.EVERY_SPRINT]
    pending_ids = {r.id for r in pending}
    completed_rituals = [r for r in sprint_rituals if r.id not in pending_ids]

    completed_responses = []
    for ritual in completed_rituals:
        if limbo_sprint:
            att = await ritual_service.get_attestation(ritual.id, limbo_sprint.id)
            if att:
                completed_responses.append(CompletedRitualResponse(
                    id=ritual.id,
                    project_id=ritual.project_id,
                    name=ritual.name,
                    prompt=ritual.prompt,
                    trigger=ritual.trigger,
                    approval_mode=ritual.approval_mode,
                    created_at=ritual.created_at,
                    updated_at=ritual.updated_at,
                    attestation=_attestation_response(att),
                ))

    await fill_principals([pending_responses, completed_responses])
    return LimboStatusResponse(
        in_limbo=in_limbo,
        sprint_id=limbo_sprint.id if limbo_sprint else None,
        pending_rituals=pending_responses,
        completed_rituals=completed_responses,
    )


@router.get("/pending-gates", response_model=list[PendingGateIssueResponse])
@reads
async def get_issues_with_pending_gates(
    project_id: str,
    current_user: CurrentUser,
):
    """Get all issues with pending GATE rituals."""
    project_service = ProjectService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    issues = await ritual_service.get_issues_with_pending_gates(project_id)
    return [PendingGateIssueResponse(**issue) for issue in issues]


@router.get("/pending-approvals", response_model=list[PendingApprovalIssueResponse])
@reads
async def get_issues_with_pending_approvals(
    project_id: str,
    current_user: CurrentUser,
):
    """Get all issues with pending approvals (GATE + REVIEW rituals)."""
    project_service = ProjectService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    issues = await ritual_service.get_issues_with_pending_approvals(project_id)
    return [PendingApprovalIssueResponse(**issue) for issue in issues]


@router.post("/force-clear-limbo", response_model=LimboClearedResponse, status_code=status.HTTP_200_OK)
@writes
async def force_clear_limbo(
    project_id: str,
    current_user: CurrentUser,
):
    """Force-clear limbo without completing rituals (admin only)."""
    project_service = ProjectService()
    team_service = TeamService()
    ritual_service = RitualService()
    sprint_service = SprintService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    is_admin = await team_service.is_team_admin(project.team_id, current_user.id)
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can force-clear limbo",
        )

    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo",
        )

    await sprint_service.complete_limbo(limbo_sprint)

    new_active = await sprint_service.get_current_sprint(project_id)

    return {
        "message": "Limbo cleared successfully",
        "next_sprint_name": new_active.name if new_active else None,
    }


@router.post("/force-clear-ticket-limbo", response_model=TicketLimboClearedResponse, status_code=status.HTTP_200_OK)
@writes
async def force_clear_ticket_limbo(
    issue_id: str,
    current_user: CurrentUser,
):
    """Force-clear ticket-level limbo for a specific issue (admin only)."""
    from app.oxyde_models.issue import (
        OxydeTicketLimbo, OxydeTicketLimboBlocker,
    )

    issue_service = IssueService()
    team_service = TeamService()

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project_service = ProjectService()
    project = await project_service.get_by_id(issue.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    is_admin = await team_service.is_team_admin(project.team_id, current_user.id)
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can force-clear limbo",
        )

    limbo_records = await OxydeTicketLimbo.objects.filter(
        issue_id=issue_id,
        cleared_at=None,
    ).all()

    if not limbo_records:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Issue has no pending ticket limbo",
        )

    from app.oxyde_models.issue import OxydeIssueActivity
    from app.websocket import broadcast_activity_event
    from app.db.transactions import atomic

    now = datetime.now(timezone.utc)
    canceled_payloads = []
    # All-or-nothing: clear blockers, parent intents, AND audit rows in
    # a single transaction. A mid-loop failure (DB error, FK violation,
    # etc.) rolls everything back so the admin can retry without
    # leaving a half-canceled state.
    async with atomic():
        for limbo in limbo_records:
            blockers = await OxydeTicketLimboBlocker.objects.filter(
                limbo_id=limbo.id, resolved_at=None,
            ).all()
            for blocker in blockers:
                blocker.resolved_at = now
                blocker.resolved_by_id = current_user.id
                await blocker.save(update_fields={"resolved_at", "resolved_by_id"})
            limbo.cleared_at = now
            limbo.cleared_by_id = current_user.id
            await limbo.save(update_fields={"cleared_at", "cleared_by_id"})

            # Force-clear is "scrub" semantics: emit INTENT_CANCELED
            # rather than firing the auto-transition. The user must
            # re-attempt the claim/close, but the await primitive can
            # wake on the cancel.
            limbo_type_value = limbo.limbo_type.value
            await OxydeIssueActivity.objects.create(
                issue_id=issue_id,
                user_id=current_user.id,
                activity_type=ActivityType.INTENT_CANCELED,
                new_value=limbo_type_value,
            )
            canceled_payloads.append({
                "issue_id": issue_id,
                "issue_identifier": issue.identifier,
                "limbo_type": limbo_type_value,
                "user_id": current_user.id,
                "intent_initiator_id": limbo.requested_by_id,
            })

    # Broadcast outside the per-row loop and outside any transaction;
    # one event per canceled intent.
    for payload in canceled_payloads:
        try:
            await broadcast_activity_event(
                project.team_id,
                ActivityType.INTENT_CANCELED.value,
                payload,
            )
        except Exception:
            pass

    # Nothing on the ticket waits on a decision now: settle the gate and
    # review inbox entries, so a syncing client drops them (CHT-1607).
    try:
        from app.services.inbox_service import InboxService
        await InboxService().resolve_for_issue(issue_id, decisions_only=True)
    except Exception:
        logger.exception("Failed to resolve inbox entries after force-clear issue=%s", issue_id)

    return {
        "message": f"Cleared {len(limbo_records)} ticket limbo record(s)",
        "cleared_count": len(limbo_records),
    }


@router.get("/issue/{issue_id}/pending", response_model=TicketRitualsStatusResponse)
@reads
async def get_pending_ticket_rituals(
    issue_id: str,
    current_user: CurrentUser,
) -> TicketRitualsStatusResponse:
    """Get pending ticket-level rituals (both close and claim) for an issue."""
    issue_service = IssueService()
    project_service = ProjectService()
    ritual_service = RitualService()

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    close_rituals = await ritual_service.get_pending_ticket_rituals(issue.project_id, issue_id)
    claim_rituals = await ritual_service.get_pending_claim_rituals(issue.project_id, issue_id)
    pending = close_rituals + claim_rituals

    pending_responses = await pending_ritual_responses(issue_id, pending)

    # Get completed rituals
    all_rituals = await ritual_service.list_by_project(issue.project_id)

    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    ticket_rituals = [r for r in all_rituals if r.trigger in ticket_triggers]
    pending_ids = {r.id for r in pending}
    completed_rituals = [r for r in ticket_rituals if r.id not in pending_ids]

    completed_responses = []
    for ritual in completed_rituals:
        att = await ritual_service.get_issue_attestation(ritual.id, issue_id)
        if att:
            completed_responses.append(CompletedRitualResponse(
                id=ritual.id,
                project_id=ritual.project_id,
                name=ritual.name,
                prompt=ritual.prompt,
                trigger=ritual.trigger,
                approval_mode=ritual.approval_mode,
                created_at=ritual.created_at,
                updated_at=ritual.updated_at,
                attestation=_attestation_response(att),
            ))

    await fill_principals(completed_responses)
    return TicketRitualsStatusResponse(
        issue_id=issue_id,
        pending_rituals=pending_responses,
        completed_rituals=completed_responses,
    )


@router.post("/{ritual_id}/attest-issue/{issue_id}", response_model=RitualAttestationResponse)
@writes
async def attest_ritual_for_issue(
    ritual_id: str,
    issue_id: str,
    attestation_in: RitualAttestationCreate,
    current_user: CurrentUser,
) -> RitualAttestationResponse:
    """Attest to a ticket-close ritual for an issue."""
    ritual_service = RitualService()
    issue_service = IssueService()
    project_service = ProjectService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    if ritual.project_id != issue.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this issue's project",
        )

    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    if ritual.trigger not in ticket_triggers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a ticket-level ritual (must be TICKET_CLOSE or TICKET_CLAIM)",
        )

    if ritual.approval_mode == ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ritual '{ritual.name}' requires human completion (gate mode). Use the complete endpoint.",
        )

    if ritual.note_required and not (attestation_in.note and attestation_in.note.strip()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attestation requires a note. This ritual asks: \"{ritual.prompt}\"",
        )

    try:
        # CHT-1200: attest_for_issue() itself broadcasts 'ritual_attested'
        # (CHT-1187 moved this into the service layer so internal callers
        # are observable too) -- an API-layer 'attested' broadcast here
        # would double-fire for every HTTP attest. Do not re-add one.
        attestation = await ritual_service.attest_for_issue(
            ritual=ritual,
            issue_id=issue_id,
            user_id=current_user.id,
            note=attestation_in.note,
            document_id=attestation_in.document_id,
            url=attestation_in.url,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return await _build_attestation_response(attestation)


@router.post("/{ritual_id}/complete-issue/{issue_id}", response_model=RitualAttestationResponse)
@writes
async def complete_gate_ritual_for_issue(
    ritual_id: str,
    issue_id: str,
    attestation_in: RitualAttestationCreate,
    current_user: CurrentUser,
) -> RitualAttestationResponse:
    """Complete a GATE mode ticket-close ritual (human-only)."""
    ritual_service = RitualService()
    issue_service = IssueService()
    project_service = ProjectService()
    team_service = TeamService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can complete GATE mode rituals",
        )

    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="GATE rituals require human completion. Agent users cannot complete GATE mode rituals.",
        )

    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    if ritual.trigger not in ticket_triggers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a ticket-level ritual (must be TICKET_CLOSE or TICKET_CLAIM)",
        )

    if ritual.project_id != issue.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this issue's project",
        )

    if ritual.approval_mode != ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a GATE mode ritual. Use 'chaotic ritual attest' instead.",
        )

    try:
        attestation = await ritual_service.complete_gate_ritual_for_issue(
            ritual=ritual,
            issue_id=issue_id,
            user_id=current_user.id,
            note=attestation_in.note,
            document_id=attestation_in.document_id,
            url=attestation_in.url,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    try:
        await broadcast_attestation_event(
            project.team_id, "completed",
            {"ritual_id": ritual_id, "issue_id": issue_id},
        )
    except Exception:
        pass

    return await _build_attestation_response(attestation)


async def _human_ritual_decider(ritual_id: str, issue_id: str, current_user, verb: str):
    """The checks approve and reject share (CHT-1606), so the two can
    never drift apart: the ritual, issue and project exist, the caller is
    a team admin and a human, and the ritual is a ticket-level ritual of
    the issue's project. Returns (ritual, issue, project)."""
    ritual_service = RitualService()
    issue_service = IssueService()
    project_service = ProjectService()
    team_service = TeamService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Only admins can {verb} attestations",
        )

    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Agents cannot {verb} attestations. A human admin must {verb}.",
        )

    if ritual.project_id != issue.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this issue's project",
        )

    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    if ritual.trigger not in ticket_triggers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a ticket-level ritual (must be TICKET_CLOSE or TICKET_CLAIM)",
        )

    return ritual, issue, project


async def _already_resolved(resolution: str, resolved_by: str | None, resolved_at) -> HTTPException:
    """The 409 for approving or rejecting a gate/review someone already
    decided (CHT-1606): who decided it and when, so a client acting on a
    stale notification can say so instead of failing blankly."""
    principals = await load_principals([resolved_by])
    who = principals.get(resolved_by) if resolved_by else None
    when = resolved_at.isoformat() if resolved_at else None
    by = f" by {who.name}" if who else ""
    at = f" at {when}" if when else ""
    return HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail={
            "error_code": "ritual_already_resolved",
            "message": f"Already {resolution}{by}{at}.",
            "resolution": resolution,
            "resolved_by": resolved_by,
            "resolved_by_name": who.name if who else None,
            "resolved_at": when,
        },
    )


@router.post("/{ritual_id}/approve-issue/{issue_id}", response_model=RitualAttestationResponse)
@writes
async def approve_issue_attestation(
    ritual_id: str,
    issue_id: str,
    current_user: CurrentUser,
) -> RitualAttestationResponse:
    """Approve a ticket-close ritual attestation (for REVIEW mode)."""
    ritual_service = RitualService()
    ritual, _issue, _project = await _human_ritual_decider(ritual_id, issue_id, current_user, "approve")

    if ritual.approval_mode != ApprovalMode.REVIEW:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a REVIEW mode ritual. Only REVIEW mode attestations need approval.",
        )

    attestation = await ritual_service.get_issue_attestation(ritual.id, issue_id)
    if not attestation:
        rejected = await ritual_service.outstanding_rejection(ritual.id, issue_id)
        if rejected:
            raise await _already_resolved("rejected", rejected.rejected_by_id, rejected.rejected_at)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No attestation found for this ritual",
        )

    if attestation.approved_at:
        raise await _already_resolved("approved", attestation.approved_by, attestation.approved_at)

    try:
        # Same duplicate-broadcast shape as CHT-1200 (attest): approve_for_issue()
        # already broadcasts 'ritual_approved' internally, so an API-layer
        # 'approved' broadcast here would double-fire for every HTTP approve.
        attestation = await ritual_service.approve_for_issue(attestation, current_user.id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return await _build_attestation_response(attestation)


async def _build_rejection_response(rejection, ritual) -> RitualRejectionResponse:
    """One rejection with its principals loaded."""
    return await fill_principals(_rejection_response(rejection, ritual))


def _rejection_response(rejection, ritual) -> RitualRejectionResponse:
    return RitualRejectionResponse(
        id=rejection.id,
        ritual_id=rejection.ritual_id,
        issue_id=rejection.issue_id,
        approval_mode=ritual.approval_mode,
        attested_by=rejection.attested_by_id,
        attested_at=rejection.attested_at,
        attestation_note=rejection.attestation_note,
        artifact_ref=rejection.artifact_ref,
        rejected_by=rejection.rejected_by_id,
        rejected_at=rejection.rejected_at,
        note=rejection.note,
        superseded_at=rejection.superseded_at,
    )


@router.post("/{ritual_id}/reject-issue/{issue_id}", response_model=RitualRejectionResponse)
@writes
async def reject_issue_attestation(
    ritual_id: str,
    issue_id: str,
    reject_in: RitualRejectCreate,
    current_user: CurrentUser,
) -> RitualRejectionResponse:
    """Reject a ticket-level GATE request or REVIEW attestation, with a
    required reason (CHT-1606). Same permission as approve: a human team
    admin.

    The gate stays pending and the ticket does not move. A REVIEW
    attestation is withdrawn, so the agent attests again; a GATE request
    stays open until the requester asks again. The reason reaches the
    attester (and its owner) in the inbox, the issue's activity, and the
    ritual's pending view. 409 when it was already approved or rejected,
    404 when nothing is waiting.
    """
    ritual, _issue, _project = await _human_ritual_decider(ritual_id, issue_id, current_user, "reject")

    if ritual.approval_mode not in (ApprovalMode.GATE, ApprovalMode.REVIEW):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a GATE or REVIEW mode ritual. Only those wait on a human.",
        )

    try:
        rejection = await RitualService().reject_for_issue(
            ritual, issue_id, current_user.id, reject_in.note,
        )
    except RitualAlreadyResolvedError as e:
        raise await _already_resolved(e.resolution, e.resolved_by, e.resolved_at)
    except NothingToRejectError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return await _build_rejection_response(rejection, ritual)


# ============================================================================
# Ritual Group Endpoints
# ============================================================================


def _group_response(group) -> RitualGroupResponse:
    """RitualGroupResponse for a group row that carries its active members
    (`group.rituals`, attached by the service's group loaders)."""
    response = RitualGroupResponse.model_validate(group)
    response.triggers = sorted({r.trigger.value for r in getattr(group, "rituals", None) or []})
    return response


@router.post("/groups", response_model=RitualGroupResponse, status_code=status.HTTP_201_CREATED)
@writes
async def create_ritual_group(
    project_id: str,
    group_in: RitualGroupCreate,
    current_user: CurrentUser,
):
    """Create a new ritual group for a project."""
    project_service = ProjectService()
    team_service = TeamService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create ritual groups",
        )

    try:
        group = await ritual_service.create_group(group_in, project_id)
        return _group_response(group)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/groups", response_model=list[RitualGroupResponse])
@reads
async def list_ritual_groups(
    project_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 1000,
):
    """List ritual groups for a project."""
    project_service = ProjectService()
    ritual_service = RitualService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    groups = await ritual_service.list_groups_by_project(project_id)
    return [_group_response(g) for g in groups[skip:skip + limit]]


@router.get("/groups/{group_id}", response_model=RitualGroupResponse)
@reads
async def get_ritual_group(
    group_id: str,
    current_user: CurrentUser,
):
    """Get a ritual group by ID."""
    ritual_service = RitualService()
    project_service = ProjectService()

    group = await ritual_service.get_group_by_id(group_id)
    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual group not found",
        )

    project = await project_service.get_by_id(group.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, group.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return _group_response(group)


@router.patch("/groups/{group_id}", response_model=RitualGroupResponse)
@writes
async def update_ritual_group(
    group_id: str,
    group_in: RitualGroupUpdate,
    current_user: CurrentUser,
):
    """Update a ritual group."""
    ritual_service = RitualService()
    project_service = ProjectService()
    team_service = TeamService()

    group = await ritual_service.get_group_by_id(group_id)
    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual group not found",
        )

    project = await project_service.get_by_id(group.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can update ritual groups",
        )

    group = await ritual_service.update_group(group, group_in)
    return _group_response(group)


@router.delete("/groups/{group_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_ritual_group(
    group_id: str,
    current_user: CurrentUser,
):
    """Delete a ritual group."""
    ritual_service = RitualService()
    project_service = ProjectService()
    team_service = TeamService()

    group = await ritual_service.get_group_by_id(group_id)
    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual group not found",
        )

    project = await project_service.get_by_id(group.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete ritual groups",
        )

    await ritual_service.delete_group(group)


# ============================================================================
# Individual Ritual Endpoints (parameterized routes)
# ============================================================================


@router.get("/{ritual_id}", response_model=RitualResponse)
@reads
async def get_ritual(
    ritual_id: str,
    current_user: CurrentUser,
):
    """Get ritual by ID."""
    ritual_service = RitualService()
    project_service = ProjectService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    project = await project_service.get_by_id(ritual.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, ritual.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return ritual


@router.patch("/{ritual_id}", response_model=RitualResponse)
@writes
async def update_ritual(
    ritual_id: str,
    ritual_in: RitualUpdate,
    current_user: CurrentUser,
):
    """Update a ritual."""
    ritual_service = RitualService()
    project_service = ProjectService()
    team_service = TeamService()

    ritual = await ritual_service.get_by_id(ritual_id, include_inactive=True)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    project = await project_service.get_by_id(ritual.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can update rituals",
        )

    try:
        ritual = await ritual_service.update(ritual, ritual_in)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    return ritual


@router.delete("/{ritual_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_ritual(
    ritual_id: str,
    current_user: CurrentUser,
):
    """Delete a ritual."""
    ritual_service = RitualService()
    project_service = ProjectService()
    team_service = TeamService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    project = await project_service.get_by_id(ritual.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete rituals",
        )

    project_id = ritual.project_id

    await ritual_service.delete(ritual, deleted_by_id=current_user.id)

    await ritual_service.maybe_clear_limbo_for_project(project_id)


@router.post("/{ritual_id}/attest", response_model=RitualAttestationResponse)
@writes
async def attest_ritual(
    ritual_id: str,
    attestation_in: RitualAttestationCreate,
    current_user: CurrentUser,
    project_id: str | None = None,
) -> RitualAttestationResponse:
    """Attest to a ritual for the current limbo sprint.

    ``project_id`` is optional (CHT-1223): the ritual-scoped variants of
    this action (attest-issue/complete-issue) already derive project
    scope from the ritual/issue rather than requiring a redundant query
    param, and ``ritual.project_id`` is the same value this endpoint
    validates ``project_id`` against immediately below -- so it's safe
    to fall back to it when omitted. Existing callers that still pass
    ``?project_id=`` keep working unchanged.
    """
    ritual_service = RitualService()
    project_service = ProjectService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    resolved_project_id = project_id if project_id is not None else ritual.project_id

    project = await project_service.get_by_id(resolved_project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, resolved_project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(resolved_project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Project is not in limbo. Sprint-level rituals (EVERY_SPRINT) "
                "are only attestable after the sprint has been closed -- run "
                "`chaotic sprint close` first to enter limbo, then attest. "
                "(CHT-1276: this order is intentional -- see docs/VISION.md.)"
            ),
        )

    if ritual.project_id != resolved_project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this project",
        )

    if ritual.trigger != RitualTrigger.EVERY_SPRINT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a sprint-level ritual (must be EVERY_SPRINT)",
        )

    if ritual.approval_mode == ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ritual '{ritual.name}' requires human completion (gate mode). Use the complete endpoint.",
        )

    if ritual.note_required and not (attestation_in.note and attestation_in.note.strip()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attestation requires a note. This ritual asks: \"{ritual.prompt}\"",
        )

    try:
        attestation = await ritual_service.attest(
            ritual=ritual,
            sprint_id=limbo_sprint.id,
            user_id=current_user.id,
            note=attestation_in.note,
            document_id=attestation_in.document_id,
            url=attestation_in.url,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    # Outside the try: pydantic's ValidationError is a ValueError, and a
    # schema-construction failure is a server bug, not a 400.
    return await _build_attestation_response(attestation)


@router.post("/{ritual_id}/approve", response_model=RitualAttestationResponse)
@writes
async def approve_attestation(
    ritual_id: str,
    current_user: CurrentUser,
    project_id: str | None = None,
) -> RitualAttestationResponse:
    """Approve a ritual attestation (for REVIEW/GATE modes).

    ``project_id`` is optional (CHT-1223) -- derived from the ritual when
    omitted, matching attest_ritual/complete_gate_ritual. Existing
    ``?project_id=`` callers keep working unchanged.
    """
    ritual_service = RitualService()
    project_service = ProjectService()
    team_service = TeamService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    resolved_project_id = project_id if project_id is not None else ritual.project_id

    project = await project_service.get_by_id(resolved_project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can approve attestations",
        )

    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot approve attestations. A human admin must approve.",
        )

    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(resolved_project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo",
        )

    attestation = await ritual_service.get_attestation(ritual.id, limbo_sprint.id)
    if not attestation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No attestation found for this ritual",
        )

    if attestation.approved_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Attestation already approved",
        )

    try:
        attestation = await ritual_service.approve(attestation, current_user.id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    return await _build_attestation_response(attestation)


@router.post("/{ritual_id}/complete", response_model=RitualAttestationResponse)
@writes
async def complete_gate_ritual(
    ritual_id: str,
    attestation_in: RitualAttestationCreate,
    current_user: CurrentUser,
    project_id: str | None = None,
) -> RitualAttestationResponse:
    """Complete a GATE mode ritual (human-only).

    ``project_id`` is optional (CHT-1223) -- derived from the ritual when
    omitted, matching attest_ritual/approve_attestation. Existing
    ``?project_id=`` callers keep working unchanged.
    """
    ritual_service = RitualService()
    project_service = ProjectService()
    team_service = TeamService()

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    resolved_project_id = project_id if project_id is not None else ritual.project_id

    project = await project_service.get_by_id(resolved_project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can complete GATE mode rituals",
        )

    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="GATE rituals require human completion. Agent users cannot complete GATE mode rituals.",
        )

    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(resolved_project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo",
        )

    if ritual.project_id != resolved_project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this project",
        )

    if ritual.trigger != RitualTrigger.EVERY_SPRINT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a sprint-level ritual (must be EVERY_SPRINT)",
        )

    if ritual.approval_mode != ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a GATE mode ritual. Use attest instead.",
        )

    try:
        attestation = await ritual_service.complete_gate_ritual(
            ritual=ritual,
            sprint_id=limbo_sprint.id,
            user_id=current_user.id,
            note=attestation_in.note,
            document_id=attestation_in.document_id,
            url=attestation_in.url,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    return await _build_attestation_response(attestation)
