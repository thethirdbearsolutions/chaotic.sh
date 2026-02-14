"""make_attested_by_nullable

Revision ID: 423ad59a1cca
Revises: ed94663ad743
Create Date: 2026-02-14 09:13:33.405241

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '423ad59a1cca'
down_revision: Union[str, Sequence[str], None] = 'ed94663ad743'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with op.batch_alter_table('ritual_attestations') as batch_op:
        batch_op.alter_column('attested_by',
                   existing_type=sa.VARCHAR(length=36),
                   nullable=True)


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('ritual_attestations') as batch_op:
        batch_op.alter_column('attested_by',
                   existing_type=sa.VARCHAR(length=36),
                   nullable=False)
