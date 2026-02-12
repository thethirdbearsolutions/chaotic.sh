"""add_document_comments

Revision ID: 3b0a527088de
Revises: 0575cf8b5f84
Create Date: 2026-02-08 14:05:02.627932

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3b0a527088de'
down_revision: Union[str, Sequence[str], None] = '0575cf8b5f84'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create document_comments table."""
    op.create_table(
        'document_comments',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('document_id', sa.String(36), sa.ForeignKey('documents.id', ondelete='CASCADE'), nullable=False),
        sa.Column('author_id', sa.String(36), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
    )
    op.create_index('idx_document_comments_document', 'document_comments', ['document_id'])


def downgrade() -> None:
    """Drop document_comments table."""
    op.drop_index('idx_document_comments_document', table_name='document_comments')
    op.drop_table('document_comments')
