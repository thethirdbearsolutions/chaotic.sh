"""add_human_rituals_required_to_project

Revision ID: 450198422d4c
Revises: 4f1cc0d2f42b
Create Date: 2026-02-04 11:03:22.387611

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '450198422d4c'
down_revision: Union[str, Sequence[str], None] = '4f1cc0d2f42b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add human_rituals_required column with default False (humans can skip rituals)
    op.add_column('projects', sa.Column('human_rituals_required', sa.Boolean(), nullable=False, server_default=sa.text('0')))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('projects', 'human_rituals_required')
