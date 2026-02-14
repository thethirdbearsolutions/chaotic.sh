"""Budget transaction schemas."""
from datetime import datetime
from pydantic import BaseModel
from app.utils import DateTimeUTC


class BudgetTransactionResponse(BaseModel):
    """Response schema for budget transactions."""
    id: str
    sprint_id: str
    issue_id: str | None
    user_id: str | None
    points: int
    tokens: int | None  # Token cost (if tracked)
    created_at: DateTimeUTC
    # Denormalized fields for historical accuracy
    issue_identifier: str
    issue_title: str
    sprint_name: str

    model_config = {"from_attributes": True}
