"""add_document_issues_link_table

Revision ID: 0575cf8b5f84
Revises: 455834f8c857
Create Date: 2026-02-08 13:15:23.924870

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0575cf8b5f84'
down_revision: Union[str, Sequence[str], None] = '455834f8c857'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create document_issues association table."""
    op.create_table(
        'document_issues',
        sa.Column('document_id', sa.String(length=36), nullable=False),
        sa.Column('issue_id', sa.String(length=36), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['document_id'], ['documents.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['issue_id'], ['issues.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('document_id', 'issue_id')
    )


def downgrade() -> None:
    """Drop document_issues table."""
    op.drop_table('document_issues')
