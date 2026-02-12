"""add_conditions_to_rituals

Revision ID: ed5141f34b17
Revises: 6dffd55cbfb4
Create Date: 2026-02-08 09:42:06.314194

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ed5141f34b17'
down_revision: Union[str, Sequence[str], None] = '6dffd55cbfb4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add conditions column to rituals table."""
    op.add_column('rituals', sa.Column('conditions', sa.Text(), nullable=True))


def downgrade() -> None:
    """Remove conditions column from rituals table."""
    op.drop_column('rituals', 'conditions')
