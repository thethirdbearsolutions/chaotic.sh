"""add_unique_constraints_to_ritual_attestations

Revision ID: 945e85d5b957
Revises: 0e6fb4e88d11
Create Date: 2026-02-09 12:19:46.971083

Fixes CHT-596: Prevents race condition that creates duplicate attestations
"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '945e85d5b957'
down_revision: Union[str, Sequence[str], None] = '0e6fb4e88d11'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add unique partial indexes to prevent duplicate attestations."""
    # Unique constraint for issue attestations (ritual_id + issue_id)
    op.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uix_attestation_ritual_issue
        ON ritual_attestations(ritual_id, issue_id)
        WHERE issue_id IS NOT NULL
    """)

    # Unique constraint for sprint attestations (ritual_id + sprint_id)
    op.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uix_attestation_ritual_sprint
        ON ritual_attestations(ritual_id, sprint_id)
        WHERE sprint_id IS NOT NULL
    """)


def downgrade() -> None:
    """Remove unique indexes."""
    op.execute("DROP INDEX IF EXISTS uix_attestation_ritual_issue")
    op.execute("DROP INDEX IF EXISTS uix_attestation_ritual_sprint")
