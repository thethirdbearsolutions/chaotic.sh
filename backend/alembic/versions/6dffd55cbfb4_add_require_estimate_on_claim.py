"""add require_estimate_on_claim

Revision ID: 6dffd55cbfb4
Revises: bb8f9b0c37fa
Create Date: 2026-02-05 23:24:24.180699

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6dffd55cbfb4'
down_revision: Union[str, Sequence[str], None] = 'bb8f9b0c37fa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        'projects',
        sa.Column(
            'require_estimate_on_claim',
            sa.Boolean(),
            nullable=False,
            server_default=sa.text('0'),
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('projects', 'require_estimate_on_claim')
