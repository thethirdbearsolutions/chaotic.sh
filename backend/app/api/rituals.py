"""Ritual API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import DbSession, CurrentUser, check_user_project_access
from app.schemas.ritual import (
    RitualCreate,
    RitualUpdate,
    RitualResponse,
    RitualAttestationCreate,
    RitualAttestationResponse,
    LimboStatusResponse,
    PendingRitualResponse,
    CompletedRitualResponse,
    TicketRitualsStatusResponse,
    RitualGroupCreate,
    RitualGroupUpdate,
    RitualGroupResponse,
    PendingGateIssueResponse,
)
from app.services.issue_service import IssueService
from app.services.ritual_service import RitualService
from app.services.project_service import ProjectService
from app.services.team_service import TeamService
from app.services.sprint_service import SprintService
from app.models.ritual import ApprovalMode

router = APIRouter()


@router.post("", response_model=RitualResponse, status_code=status.HTTP_201_CREATED)
async def create_ritual(
    project_id: str,
    ritual_in: RitualCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a new ritual for a project."""
    project_service = ProjectService(db)
    team_service = TeamService(db)
    ritual_service = RitualService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Only admins can create rituals
    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create rituals",
        )

    try:
        ritual = await ritual_service.create(ritual_in, project_id)
        return ritual
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("", response_model=list[RitualResponse])
async def list_rituals(
    project_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """List rituals for a project."""
    project_service = ProjectService(db)
    ritual_service = RitualService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(db, current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    rituals = await ritual_service.list_by_project(project_id)
    return rituals


@router.get("/limbo", response_model=LimboStatusResponse)
async def get_limbo_status(
    project_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Check if project is in limbo and get pending rituals."""
    project_service = ProjectService(db)
    ritual_service = RitualService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(db, current_user, project_id, project.team_id):
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
                attestation = RitualAttestationResponse.model_validate(att)

        pending_responses.append(PendingRitualResponse(
            id=ritual.id,
            name=ritual.name,
            prompt=ritual.prompt,
            trigger=ritual.trigger,
            approval_mode=ritual.approval_mode,
            note_required=ritual.note_required,
            conditions=ritual.conditions,
            attestation=attestation,
        ))

    # Get completed rituals with attestation details
    all_rituals = await ritual_service.list_by_project(project_id)
    from app.models.ritual import RitualTrigger
    sprint_rituals = [r for r in all_rituals if r.trigger == RitualTrigger.EVERY_SPRINT]
    pending_ids = {r.id for r in pending}
    completed_rituals = [r for r in sprint_rituals if r.id not in pending_ids]

    # Build completed ritual responses with attestation details
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
                    attestation=RitualAttestationResponse.model_validate(att),
                ))

    return LimboStatusResponse(
        in_limbo=in_limbo,
        sprint_id=limbo_sprint.id if limbo_sprint else None,
        pending_rituals=pending_responses,
        completed_rituals=completed_responses,
    )


@router.get("/pending-gates", response_model=list[PendingGateIssueResponse])
async def get_issues_with_pending_gates(
    project_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Get all issues with pending GATE rituals.

    Returns issues that have pending GATE rituals (claim or close type)
    that require human approval. This helps humans find tickets that
    need their manual intervention.
    """
    project_service = ProjectService(db)
    ritual_service = RitualService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(db, current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    issues = await ritual_service.get_issues_with_pending_gates(project_id)
    return [PendingGateIssueResponse(**issue) for issue in issues]


@router.post("/force-clear-limbo", status_code=status.HTTP_200_OK)
async def force_clear_limbo(
    project_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Force-clear limbo without completing rituals (admin only).

    This allows admins to skip rituals if the team decides to abort a limbo cycle.
    The sprint will be completed and the next sprint activated without attestations.
    """
    project_service = ProjectService(db)
    team_service = TeamService(db)
    ritual_service = RitualService(db)
    sprint_service = SprintService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Check user is admin
    is_admin = await team_service.is_team_admin(project.team_id, current_user.id)
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can force-clear limbo",
        )

    # Check project is in limbo
    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo",
        )

    # Force-clear by calling complete_limbo directly
    await sprint_service.complete_limbo(limbo_sprint)

    # Get the new active sprint for the response
    new_active = await sprint_service.get_current_sprint(project_id)

    return {
        "message": "Limbo cleared successfully",
        "next_sprint_name": new_active.name if new_active else None,
    }


@router.get("/issue/{issue_id}/pending", response_model=TicketRitualsStatusResponse)
async def get_pending_ticket_rituals(
    issue_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Get pending ticket-level rituals (both close and claim) for an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)
    ritual_service = RitualService(db)

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

    if not await check_user_project_access(db, current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    # Get both ticket-close and ticket-claim rituals
    close_rituals = await ritual_service.get_pending_ticket_rituals(issue.project_id, issue_id)
    claim_rituals = await ritual_service.get_pending_claim_rituals(issue.project_id, issue_id)
    pending = close_rituals + claim_rituals

    # Helper to build attestation response with user names
    def build_attestation_response(att):
        if not att:
            return None
        return RitualAttestationResponse(
            id=att.id,
            ritual_id=att.ritual_id,
            sprint_id=att.sprint_id,
            issue_id=att.issue_id,
            attested_by=att.attested_by,
            attested_by_name=att.attester.name if att.attester else None,
            attested_at=att.attested_at,
            note=att.note,
            approved_by=att.approved_by,
            approved_by_name=att.approver.name if att.approver else None,
            approved_at=att.approved_at,
        )

    # Build pending ritual responses with attestation status
    pending_responses = []
    for ritual in pending:
        att = await ritual_service.get_issue_attestation(ritual.id, issue_id)
        pending_responses.append(PendingRitualResponse(
            id=ritual.id,
            name=ritual.name,
            prompt=ritual.prompt,
            trigger=ritual.trigger,
            approval_mode=ritual.approval_mode,
            note_required=ritual.note_required,
            conditions=ritual.conditions,
            attestation=build_attestation_response(att),
        ))

    # Get completed rituals (attested and approved for this issue)
    all_rituals = await ritual_service.list_by_project(issue.project_id)
    from app.models.ritual import RitualTrigger
    # Include both TICKET_CLOSE and TICKET_CLAIM rituals
    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    ticket_rituals = [r for r in all_rituals if r.trigger in ticket_triggers]
    pending_ids = {r.id for r in pending}
    completed_rituals = [r for r in ticket_rituals if r.id not in pending_ids]

    # Build completed ritual responses with attestation details
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
                attestation=build_attestation_response(att),
            ))

    return TicketRitualsStatusResponse(
        issue_id=issue_id,
        pending_rituals=pending_responses,
        completed_rituals=completed_responses,
    )


@router.post("/{ritual_id}/attest-issue/{issue_id}", response_model=RitualAttestationResponse)
async def attest_ritual_for_issue(
    ritual_id: str,
    issue_id: str,
    attestation_in: RitualAttestationCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Attest to a ticket-close ritual for an issue.

    For AUTO mode: attestation clears immediately.
    For REVIEW mode: attestation is pending human approval.
    For GATE mode: returns error (use complete endpoint).
    """
    ritual_service = RitualService(db)
    issue_service = IssueService(db)
    project_service = ProjectService(db)

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

    if not await check_user_project_access(db, current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    # Check ritual belongs to this project
    if ritual.project_id != issue.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this issue's project",
        )

    # Check ritual is a ticket-level type (TICKET_CLOSE or TICKET_CLAIM)
    from app.models.ritual import RitualTrigger
    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    if ritual.trigger not in ticket_triggers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a ticket-level ritual (must be TICKET_CLOSE or TICKET_CLAIM)",
        )

    # Check if GATE mode
    if ritual.approval_mode == ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ritual '{ritual.name}' requires human completion (gate mode). Use the complete endpoint.",
        )

    # Check if note is required (reject empty/whitespace-only notes)
    if ritual.note_required and not (attestation_in.note and attestation_in.note.strip()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attestation requires a note. This ritual asks: \"{ritual.prompt}\"",
        )

    try:
        attestation = await ritual_service.attest_for_issue(
            ritual=ritual,
            issue_id=issue_id,
            user_id=current_user.id,
            note=attestation_in.note,
        )
        return attestation
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/{ritual_id}/complete-issue/{issue_id}", response_model=RitualAttestationResponse)
async def complete_gate_ritual_for_issue(
    ritual_id: str,
    issue_id: str,
    attestation_in: RitualAttestationCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Complete a GATE mode ticket-close ritual (human-only).

    Only admins can complete GATE mode rituals.
    This creates an attestation that is immediately approved.
    """
    ritual_service = RitualService(db)
    issue_service = IssueService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

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

    # GATE rituals require human completion - reject agent users
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="GATE rituals require human completion. Agent users cannot complete GATE mode rituals.",
        )

    # Check ritual is a ticket-level type (TICKET_CLOSE or TICKET_CLAIM)
    from app.models.ritual import RitualTrigger
    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    if ritual.trigger not in ticket_triggers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a ticket-level ritual (must be TICKET_CLOSE or TICKET_CLAIM)",
        )

    # Check ritual belongs to this project
    if ritual.project_id != issue.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this issue's project",
        )

    # Check ritual is GATE mode
    if ritual.approval_mode != ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a GATE mode ritual. Use attest-issue instead.",
        )

    # GATE mode rituals don't require notes - human approval is the attestation
    # (note_required only applies to AUTO and REVIEW modes)

    attestation = await ritual_service.complete_gate_ritual_for_issue(
        ritual=ritual,
        issue_id=issue_id,
        user_id=current_user.id,
        note=attestation_in.note,
    )
    return attestation


@router.post("/{ritual_id}/approve-issue/{issue_id}", response_model=RitualAttestationResponse)
async def approve_issue_attestation(
    ritual_id: str,
    issue_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Approve a ticket-close ritual attestation (for REVIEW mode).

    Only admins can approve attestations.
    """
    ritual_service = RitualService(db)
    issue_service = IssueService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

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
            detail="Only admins can approve attestations",
        )

    # Check ritual belongs to this project
    if ritual.project_id != issue.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this issue's project",
        )

    # Check ritual is a ticket-level type (TICKET_CLOSE or TICKET_CLAIM)
    from app.models.ritual import RitualTrigger
    ticket_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
    if ritual.trigger not in ticket_triggers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a ticket-level ritual (must be TICKET_CLOSE or TICKET_CLAIM)",
        )

    # Check ritual is REVIEW mode (AUTO mode auto-approves, GATE mode uses complete endpoint)
    if ritual.approval_mode != ApprovalMode.REVIEW:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a REVIEW mode ritual. Only REVIEW mode attestations need approval.",
        )

    # Get the attestation
    attestation = await ritual_service.get_issue_attestation(ritual.id, issue_id)
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

    attestation = await ritual_service.approve_for_issue(attestation, current_user.id)
    return attestation


# ============================================================================
# Ritual Group Endpoints
# NOTE: These must be defined BEFORE /{ritual_id} routes to avoid shadowing
# ============================================================================


@router.post("/groups", response_model=RitualGroupResponse, status_code=status.HTTP_201_CREATED)
async def create_ritual_group(
    project_id: str,
    group_in: RitualGroupCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a new ritual group for a project.

    Groups allow configuring selection modes for sets of rituals:
    - RANDOM_ONE: Pick one ritual randomly (weighted by weight field)
    - ROUND_ROBIN: Rotate through rituals per sprint
    - PERCENTAGE: Each ritual has independent X% chance of appearing
    """
    project_service = ProjectService(db)
    team_service = TeamService(db)
    ritual_service = RitualService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Only admins can create groups
    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create ritual groups",
        )

    try:
        group = await ritual_service.create_group(group_in, project_id)
        return group
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/groups", response_model=list[RitualGroupResponse])
async def list_ritual_groups(
    project_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """List ritual groups for a project."""
    project_service = ProjectService(db)
    ritual_service = RitualService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(db, current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    groups = await ritual_service.list_groups_by_project(project_id)
    return groups


@router.get("/groups/{group_id}", response_model=RitualGroupResponse)
async def get_ritual_group(
    group_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Get a ritual group by ID."""
    ritual_service = RitualService(db)
    project_service = ProjectService(db)

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

    if not await check_user_project_access(db, current_user, group.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return group


@router.patch("/groups/{group_id}", response_model=RitualGroupResponse)
async def update_ritual_group(
    group_id: str,
    group_in: RitualGroupUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Update a ritual group."""
    ritual_service = RitualService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

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
    return group


@router.delete("/groups/{group_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ritual_group(
    group_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Delete a ritual group.

    Rituals in the group will be ungrouped (not deleted).
    """
    ritual_service = RitualService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

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
async def get_ritual(
    ritual_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Get ritual by ID."""
    ritual_service = RitualService(db)
    project_service = ProjectService(db)

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

    if not await check_user_project_access(db, current_user, ritual.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return ritual


@router.patch("/{ritual_id}", response_model=RitualResponse)
async def update_ritual(
    ritual_id: str,
    ritual_in: RitualUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Update a ritual."""
    ritual_service = RitualService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

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
async def delete_ritual(
    ritual_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Delete a ritual.

    If the project is in limbo and this was the last pending ritual,
    limbo will be cleared.
    """
    ritual_service = RitualService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

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

    await ritual_service.delete(ritual)

    # Check if deleting this ritual clears limbo
    await ritual_service.maybe_clear_limbo_for_project(project_id)


@router.post("/{ritual_id}/attest", response_model=RitualAttestationResponse)
async def attest_ritual(
    ritual_id: str,
    project_id: str,
    attestation_in: RitualAttestationCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Attest to a ritual for the current limbo sprint.

    For AUTO mode: attestation clears immediately.
    For REVIEW mode: attestation is pending human approval.
    For GATE mode: returns error (use web UI).
    """
    ritual_service = RitualService(db)
    project_service = ProjectService(db)

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(db, current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    # Check project is in limbo
    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo. No rituals to attest.",
        )

    # Check ritual belongs to this project
    if ritual.project_id != project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this project",
        )

    # Check ritual is a sprint-level type (EVERY_SPRINT)
    from app.models.ritual import RitualTrigger
    if ritual.trigger != RitualTrigger.EVERY_SPRINT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a sprint-level ritual (must be EVERY_SPRINT)",
        )

    # Check if GATE mode
    if ritual.approval_mode == ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ritual '{ritual.name}' requires human completion (gate mode). Use the complete endpoint.",
        )

    # Check if note is required (reject empty/whitespace-only notes)
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
        )
        return attestation
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/{ritual_id}/approve", response_model=RitualAttestationResponse)
async def approve_attestation(
    ritual_id: str,
    project_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Approve a ritual attestation (for REVIEW/GATE modes).

    Only admins can approve attestations.
    """
    ritual_service = RitualService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    project = await project_service.get_by_id(project_id)
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

    # Check project is in limbo
    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo",
        )

    # Get the attestation
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

    attestation = await ritual_service.approve(attestation, current_user.id)
    return attestation


@router.post("/{ritual_id}/complete", response_model=RitualAttestationResponse)
async def complete_gate_ritual(
    ritual_id: str,
    project_id: str,
    attestation_in: RitualAttestationCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Complete a GATE mode ritual (human-only).

    Only admins can complete GATE mode rituals.
    This creates an attestation that is immediately approved.
    """
    ritual_service = RitualService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

    ritual = await ritual_service.get_by_id(ritual_id)
    if not ritual:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ritual not found",
        )

    project = await project_service.get_by_id(project_id)
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

    # GATE rituals require human completion - reject agent users
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="GATE rituals require human completion. Agent users cannot complete GATE mode rituals.",
        )

    # Check project is in limbo
    in_limbo, limbo_sprint, _ = await ritual_service.check_limbo(project_id)
    if not in_limbo or not limbo_sprint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project is not in limbo",
        )

    # Check ritual belongs to this project
    if ritual.project_id != project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual does not belong to this project",
        )

    # Check ritual is a sprint-level type (EVERY_SPRINT)
    from app.models.ritual import RitualTrigger
    if ritual.trigger != RitualTrigger.EVERY_SPRINT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ritual is not a sprint-level ritual (must be EVERY_SPRINT)",
        )

    # Check ritual is GATE mode
    if ritual.approval_mode != ApprovalMode.GATE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ritual '{ritual.name}' is not a GATE mode ritual. Use attest instead.",
        )

    # GATE mode rituals don't require notes - human approval is the attestation
    # (note_required only applies to AUTO and REVIEW modes)

    attestation = await ritual_service.complete_gate_ritual(
        ritual=ritual,
        sprint_id=limbo_sprint.id,
        user_id=current_user.id,
        note=attestation_in.note,
    )
    return attestation
