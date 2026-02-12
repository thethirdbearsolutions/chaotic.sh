"""add_unique_constraints_to_ritual_attestations

Revision ID: 5b459328f575
Revises: d1d63abfec45
Create Date: 2026-02-10 21:36:38.317708

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5b459328f575'
down_revision: Union[str, Sequence[str], None] = 'd1d63abfec45'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add unique constraints to prevent duplicate attestations (CHT-136).

    Uses batch mode for SQLite compatibility.
    """
    # Drop old partial unique indexes if they exist
    try:
        op.drop_index('uix_attestation_ritual_issue', table_name='ritual_attestations')
    except Exception:
        pass  # Index may not exist
    try:
        op.drop_index('uix_attestation_ritual_sprint', table_name='ritual_attestations')
    except Exception:
        pass  # Index may not exist

    # Use batch mode for SQLite compatibility
    with op.batch_alter_table('ritual_attestations', schema=None) as batch_op:
        # For ticket-close rituals: prevent duplicate (ritual_id, issue_id)
        batch_op.create_unique_constraint('uq_attestation_ritual_issue', ['ritual_id', 'issue_id'])
        # For sprint rituals: prevent duplicate (ritual_id, sprint_id)
        batch_op.create_unique_constraint('uq_attestation_ritual_sprint', ['ritual_id', 'sprint_id'])


def downgrade() -> None:
    """Remove unique constraints."""
    with op.batch_alter_table('ritual_attestations', schema=None) as batch_op:
        batch_op.drop_constraint('uq_attestation_ritual_sprint', type_='unique')
        batch_op.drop_constraint('uq_attestation_ritual_issue', type_='unique')
