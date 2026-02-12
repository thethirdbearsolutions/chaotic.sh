"""add_sprint_id_to_documents

Revision ID: 455834f8c857
Revises: ed5141f34b17
Create Date: 2026-02-08 12:14:39.242229

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '455834f8c857'
down_revision: Union[str, Sequence[str], None] = 'ed5141f34b17'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # SQLite requires batch mode for adding foreign keys
    with op.batch_alter_table('documents', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sprint_id', sa.String(length=36), nullable=True))
        batch_op.create_foreign_key('fk_documents_sprint_id', 'sprints', ['sprint_id'], ['id'], ondelete='SET NULL')


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('documents', schema=None) as batch_op:
        batch_op.drop_constraint('fk_documents_sprint_id', type_='foreignkey')
        batch_op.drop_column('sprint_id')
