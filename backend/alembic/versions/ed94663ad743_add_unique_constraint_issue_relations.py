"""add_unique_constraint_issue_relations

Revision ID: ed94663ad743
Revises: 2975578430bf
Create Date: 2026-02-14 07:49:53.515619

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ed94663ad743'
down_revision: Union[str, Sequence[str], None] = '2975578430bf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with op.batch_alter_table('issue_relations') as batch_op:
        batch_op.create_unique_constraint('uq_issue_relation', ['issue_id', 'related_issue_id'])


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('issue_relations') as batch_op:
        batch_op.drop_constraint('uq_issue_relation', type_='unique')
