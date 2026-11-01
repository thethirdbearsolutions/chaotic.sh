"""Authentication API routes."""
from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, NotAppSession
from app.schemas.user import (
    EmailChange,
    EmailVerificationConfirm,
    EmailVerificationSent,
    Token,
    UserCreate,
    UserLogin,
    UserResponse,
)
from app.services.email_verification_service import EmailVerificationService, VerificationRefused
from app.services.user_service import EmailChangeRefused, EmailTakenError, UserService
from app.utils.security import WEB_LOGIN, WEB_LOGIN_CLAIM, create_access_token

router = APIRouter()


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@writes
async def signup(user_in: UserCreate):
    """Register a new user."""
    user_service = UserService()

    # Ignoring case (CHT-1790): addresses differing only in case would
    # share one email-verification limit, so one could lock the other out.
    # The database enforces it too (users.email_folded is unique, CHT-1804):
    # of two signups racing for one address, the second fails its INSERT
    # and gets the same answer here.
    if await user_service.find_by_email_ignoring_case(user_in.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    try:
        user = await user_service.create(user_in)
    except EmailTakenError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        ) from None
    return user


@router.post("/login", response_model=Token)
@writes
async def login(user_in: UserLogin):
    """Login and get access token."""
    user_service = UserService()

    user = await user_service.authenticate(user_in.email, user_in.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    claims = {"sub": user.id}
    if user_in.client == "web":
        claims[WEB_LOGIN_CLAIM] = WEB_LOGIN
    access_token = create_access_token(data=claims)
    return Token(access_token=access_token)


@router.get("/me", response_model=UserResponse)
@reads
async def get_me(current_user: CurrentUser):
    """Get current user info."""
    parent_user_name, registered_by_name = await UserService().related_names(current_user)

    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        avatar_url=current_user.avatar_url,
        bio=current_user.bio,
        pronouns=current_user.pronouns,
        tagline=current_user.tagline,
        is_active=current_user.is_active,
        is_agent=current_user.is_agent,
        parent_user_name=parent_user_name,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at,
        email_verified_at=current_user.email_verified_at,
        kind=current_user.kind,
        external_ref=current_user.external_ref,
        registered_by_id=current_user.registered_by_id,
        registered_by_name=registered_by_name,
        can_register=current_user.can_register,
        agent_team_id=current_user.agent_team_id,
        agent_project_id=current_user.agent_project_id,
    )


HUMAN_REQUIRED = {
    "error_code": "human_required",
    "message": "Email verification is for people; an agent has no mailbox to verify.",
}


def _refusal(refused: VerificationRefused) -> HTTPException:
    return HTTPException(status_code=refused.status_code, detail=refused.detail(), headers=refused.headers)


def _require_person(user) -> None:
    if user.is_agent:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(HUMAN_REQUIRED))


@router.post("/email-verification", response_model=EmailVerificationSent, status_code=status.HTTP_202_ACCEPTED)
@writes
async def request_email_verification(
    current_user: CurrentUser, _app_session: NotAppSession,
) -> EmailVerificationSent:
    """Mail a six-digit code to the signed-in person's address (CHT-1790).

    Confirm it with ``POST /api/auth/email-verification/confirm`` within
    15 minutes. A new code retires any older one. At most one code a
    minute and five an hour (429 ``email_verification_rate_limited``,
    with Retry-After). 409 ``email_already_verified`` once verified;
    409 ``email_verification_unavailable`` when the server has no SMTP
    (then invitations do not require a verified address); 502
    ``email_send_failed`` when the mail relay failed. People only: an
    agent gets 403 ``human_required``.
    """
    _require_person(current_user)
    try:
        row = await EmailVerificationService().request_code(current_user)
    except VerificationRefused as refused:
        raise _refusal(refused) from refused
    return EmailVerificationSent(email=current_user.email, expires_at=row.expires_at)


@router.post("/email", response_model=UserResponse)
@writes
async def change_email(
    body: EmailChange, current_user: CurrentUser, _app_session: NotAppSession,
) -> UserResponse:
    """Change the signed-in person's own address (CHT-1827), confirmed
    with their password, and return the account.

    The address is then unverified (``email_verified_at`` null): verify
    the new one with ``POST /api/auth/email-verification``. Codes sent
    for the old address stop working, and with SMTP configured a notice
    goes to the old address. Sessions and API keys stay valid.

    400 ``email_change_refused`` for a wrong password and for an address
    another account holds, ignoring case: one answer for both. 400
    ``email_unchanged`` when it is the account's address already. 429
    ``email_change_rate_limited`` past five tries an hour or three
    changes a day. People with a password only: an agent gets 403
    ``human_required``.
    """
    try:
        user = await UserService().change_email(current_user, body.email, body.password)
    except EmailChangeRefused as refused:
        raise HTTPException(
            status_code=refused.status_code, detail=refused.detail(), headers=refused.headers,
        ) from refused
    return UserResponse.model_validate(user)


@router.post("/email-verification/confirm", response_model=UserResponse)
@writes
async def confirm_email_verification(
    body: EmailVerificationConfirm, current_user: CurrentUser, _app_session: NotAppSession,
) -> UserResponse:
    """Confirm the code from the verification email (CHT-1790) and
    return the account, now with ``email_verified_at`` set.

    A wrong, expired, superseded or used-up code (five tries per code)
    all get the same 400 ``invalid_verification_code``. 409
    ``email_already_verified`` once verified. People only: an agent gets
    403 ``human_required``.
    """
    _require_person(current_user)
    try:
        user = await EmailVerificationService().confirm(current_user, body.code)
    except VerificationRefused as refused:
        raise _refusal(refused) from refused
    return UserResponse.model_validate(user)
