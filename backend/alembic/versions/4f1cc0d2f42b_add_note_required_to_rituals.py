"""add_note_required_to_rituals

Adds note_required column to rituals table. Defaults to True to enforce
mindful attestations - users must explain what they actually did.

Revision ID: 4f1cc0d2f42b
Revises: 8e1e79d3a6d5
Create Date: 2026-02-04 10:03:51.471933

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4f1cc0d2f42b'
down_revision: Union[str, Sequence[str], None] = '8e1e79d3a6d5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add note_required column to rituals table."""
    op.add_column('rituals', sa.Column('note_required', sa.Boolean(), nullable=False, server_default='1'))


def downgrade() -> None:
    """Remove note_required column from rituals table."""
    op.drop_column('rituals', 'note_required')
