"""add_document_labels_table

Revision ID: 8be39635b821
Revises: 5c19839a3f0a
Create Date: 2026-02-09 21:20:41.627064

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8be39635b821'
down_revision: Union[str, Sequence[str], None] = '5c19839a3f0a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'document_labels',
        sa.Column('document_id', sa.String(36), sa.ForeignKey('documents.id', ondelete='CASCADE'), primary_key=True),
        sa.Column('label_id', sa.String(36), sa.ForeignKey('labels.id', ondelete='CASCADE'), primary_key=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('document_labels')
