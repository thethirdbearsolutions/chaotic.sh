"""add_agent_fields

Revision ID: 5794be5c2951
Revises: 450198422d4c
Create Date: 2026-02-04 11:55:58.789351

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5794be5c2951'
down_revision: Union[str, Sequence[str], None] = '450198422d4c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add agent fields to users table
    # SQLite doesn't fully support adding foreign key constraints after table creation,
    # so we just add the columns. The FK relationships are enforced at the application level.
    op.add_column('users', sa.Column('is_agent', sa.Boolean(), nullable=False, server_default=sa.text('0')))
    op.add_column('users', sa.Column('parent_user_id', sa.String(length=36), nullable=True))
    op.add_column('users', sa.Column('agent_team_id', sa.String(length=36), nullable=True))
    op.add_column('users', sa.Column('agent_project_id', sa.String(length=36), nullable=True))

    # Add agent_user_id to api_keys table
    op.add_column('api_keys', sa.Column('agent_user_id', sa.String(length=36), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    # Remove agent_user_id from api_keys
    op.drop_column('api_keys', 'agent_user_id')

    # Remove agent fields from users
    op.drop_column('users', 'agent_project_id')
    op.drop_column('users', 'agent_team_id')
    op.drop_column('users', 'parent_user_id')
    op.drop_column('users', 'is_agent')
