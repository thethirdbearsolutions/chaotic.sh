"""add_document_activities_table

Revision ID: fc93d63e0308
Revises: b14817817a8e
Create Date: 2026-02-10 10:05:11.323051

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fc93d63e0308'
down_revision: Union[str, Sequence[str], None] = 'b14817817a8e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'document_activities',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('document_id', sa.String(36), sa.ForeignKey('documents.id', ondelete='CASCADE'), nullable=True),
        sa.Column('team_id', sa.String(36), sa.ForeignKey('teams.id', ondelete='CASCADE'), nullable=False),
        sa.Column('user_id', sa.String(36), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('activity_type', sa.String(20), nullable=False),
        sa.Column('document_title', sa.String(500), nullable=True),
        sa.Column('document_icon', sa.String(50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('CURRENT_TIMESTAMP')),
    )
    op.create_index('idx_document_activities_team', 'document_activities', ['team_id'])
    op.create_index('idx_document_activities_created', 'document_activities', ['created_at'])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('idx_document_activities_created', table_name='document_activities')
    op.drop_index('idx_document_activities_team', table_name='document_activities')
    op.drop_table('document_activities')
