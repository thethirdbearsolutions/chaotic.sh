"""baseline

This is the baseline migration representing the initial Chaotic schema.
Tables: users, teams, team_members, team_invitations, projects, issues,
        issue_comments, issue_labels, labels, issue_relations, sprints,
        documents, api_keys, rituals, ritual_attestations

For existing databases: Run `alembic stamp head` to mark as current.
For new databases: Tables are created by SQLAlchemy create_all(), then stamp.

Revision ID: 8e1e79d3a6d5
Revises:
Create Date: 2026-02-04 09:15:06.154551

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8e1e79d3a6d5'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
