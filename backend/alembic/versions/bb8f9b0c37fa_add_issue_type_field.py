"""add_issue_type_field

Revision ID: bb8f9b0c37fa
Revises: 5794be5c2951
Create Date: 2026-02-05 15:04:25.463352

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bb8f9b0c37fa'
down_revision: Union[str, Sequence[str], None] = '5794be5c2951'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add issue_type column to issues table."""
    # SQLite doesn't support adding NOT NULL columns without defaults,
    # so add with server_default then keep it (existing rows get 'TASK')
    op.add_column('issues', sa.Column(
        'issue_type',
        sa.Enum('TASK', 'BUG', 'FEATURE', 'CHORE', 'DOCS', name='issuetype'),
        nullable=False,
        server_default='TASK',
    ))


def downgrade() -> None:
    """Remove issue_type column from issues table."""
    op.drop_column('issues', 'issue_type')
