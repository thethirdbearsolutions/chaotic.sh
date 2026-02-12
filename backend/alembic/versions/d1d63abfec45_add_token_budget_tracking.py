"""add_token_budget_tracking

Revision ID: d1d63abfec45
Revises: fc93d63e0308
Create Date: 2026-02-10 18:16:38.553208

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd1d63abfec45'
down_revision: Union[str, Sequence[str], None] = 'fc93d63e0308'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add token budget tracking fields to sprints and budget_transactions."""
    # Add token tracking columns to sprints
    op.add_column('sprints', sa.Column('token_budget', sa.Integer(), nullable=True))
    op.add_column('sprints', sa.Column('tokens_spent', sa.Integer(), nullable=False, server_default='0'))

    # Add tokens column to budget_transactions
    op.add_column('budget_transactions', sa.Column('tokens', sa.Integer(), nullable=True))


def downgrade() -> None:
    """Remove token budget tracking fields."""
    op.drop_column('budget_transactions', 'tokens')
    op.drop_column('sprints', 'tokens_spent')
    op.drop_column('sprints', 'token_budget')
