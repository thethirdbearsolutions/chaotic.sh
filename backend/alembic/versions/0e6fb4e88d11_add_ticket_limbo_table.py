"""add_ticket_limbo_table

Revision ID: 0e6fb4e88d11
Revises: 0ed530fc9e6b
Create Date: 2026-02-08 17:20:16.759833

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0e6fb4e88d11'
down_revision: Union[str, Sequence[str], None] = '0ed530fc9e6b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'ticket_limbo',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('issue_id', sa.String(36), sa.ForeignKey('issues.id', ondelete='CASCADE'), nullable=False),
        sa.Column('ritual_id', sa.String(36), sa.ForeignKey('rituals.id', ondelete='CASCADE'), nullable=False),
        sa.Column('limbo_type', sa.Enum('CLAIM', 'CLOSE', name='limbotype'), nullable=False),
        sa.Column('requested_by_id', sa.String(36), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('requested_at', sa.DateTime(), nullable=False),
        sa.Column('cleared_at', sa.DateTime(), nullable=True),
        sa.Column('cleared_by_id', sa.String(36), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
    )
    op.create_index('ix_ticket_limbo_issue_id', 'ticket_limbo', ['issue_id'])
    op.create_index('ix_ticket_limbo_ritual_id', 'ticket_limbo', ['ritual_id'])
    op.create_index('ix_ticket_limbo_cleared_at', 'ticket_limbo', ['cleared_at'])
    # Composite index for pending gates queries
    op.create_index('ix_ticket_limbo_issue_cleared', 'ticket_limbo', ['issue_id', 'cleared_at'])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_ticket_limbo_issue_cleared', table_name='ticket_limbo')
    op.drop_index('ix_ticket_limbo_cleared_at', table_name='ticket_limbo')
    op.drop_index('ix_ticket_limbo_ritual_id', table_name='ticket_limbo')
    op.drop_index('ix_ticket_limbo_issue_id', table_name='ticket_limbo')
    op.drop_table('ticket_limbo')
