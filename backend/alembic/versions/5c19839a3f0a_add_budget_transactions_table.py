"""add_budget_transactions_table

Revision ID: 5c19839a3f0a
Revises: 945e85d5b957
Create Date: 2026-02-09 12:33:18.904163

CHT-401: Adds budget_transactions table for tracking effort spent on issues.
This creates a permanent audit trail of points deducted from sprint budgets.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5c19839a3f0a'
down_revision: Union[str, Sequence[str], None] = '945e85d5b957'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create budget_transactions table."""
    op.create_table(
        'budget_transactions',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('sprint_id', sa.String(36), sa.ForeignKey('sprints.id', ondelete='CASCADE'), nullable=False),
        sa.Column('issue_id', sa.String(36), sa.ForeignKey('issues.id', ondelete='SET NULL'), nullable=True),
        sa.Column('user_id', sa.String(36), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('points', sa.Integer, nullable=False),
        sa.Column('created_at', sa.DateTime, server_default=sa.func.now()),
        # Denormalized for historical accuracy
        sa.Column('issue_identifier', sa.String(20), nullable=False),
        sa.Column('issue_title', sa.String(500), nullable=False),
        sa.Column('sprint_name', sa.String(255), nullable=False),
    )

    # Index for querying transactions by sprint
    op.create_index('idx_budget_transactions_sprint', 'budget_transactions', ['sprint_id'])


def downgrade() -> None:
    """Drop budget_transactions table."""
    op.drop_index('idx_budget_transactions_sprint', table_name='budget_transactions')
    op.drop_table('budget_transactions')
