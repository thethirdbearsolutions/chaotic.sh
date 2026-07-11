"""Authentication API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token
from app.services.user_service import UserService
from app.utils.security import create_access_token

router = APIRouter()


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_in: UserCreate):
    """Register a new user."""
    user_service = UserService()

    existing_user = await user_service.get_by_email(user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = await user_service.create(user_in)
    return user


@router.post("/login", response_model=Token)
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

    access_token = create_access_token(data={"sub": user.id})
    return Token(access_token=access_token)


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: CurrentUser):
    """Get current user info."""
    parent_user_name = None
    if current_user.is_agent and current_user.parent_user_id:
        user_service = UserService()
        parent_user = await user_service.get_by_id(current_user.parent_user_id)
        parent_user_name = parent_user.name if parent_user else None

    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        avatar_url=current_user.avatar_url,
        is_active=current_user.is_active,
        is_agent=current_user.is_agent,
        parent_user_name=parent_user_name,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at,
    )
