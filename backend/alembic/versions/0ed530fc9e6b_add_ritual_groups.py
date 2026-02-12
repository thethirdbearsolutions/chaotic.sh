"""add_ritual_groups

Revision ID: 0ed530fc9e6b
Revises: 3b0a527088de
Create Date: 2026-02-08 14:48:28.260046

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0ed530fc9e6b'
down_revision: Union[str, Sequence[str], None] = '3b0a527088de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create ritual_groups table if it doesn't exist (for new installations)
    # Using raw SQL for IF NOT EXISTS compatibility
    op.execute("""
        CREATE TABLE IF NOT EXISTS ritual_groups (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            project_id VARCHAR(36) NOT NULL,
            name VARCHAR(100) NOT NULL,
            selection_mode VARCHAR(11) NOT NULL,
            last_selected_ritual_id VARCHAR(36),
            created_at DATETIME NOT NULL,
            FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
            FOREIGN KEY(last_selected_ritual_id) REFERENCES rituals(id) ON DELETE SET NULL
        )
    """)

    # Add columns to rituals table (may already exist in some installations)
    # Check if columns exist before adding to handle partial migrations
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    columns = [c['name'] for c in inspector.get_columns('rituals')]

    if 'group_id' not in columns:
        op.add_column('rituals', sa.Column('group_id', sa.String(length=36), nullable=True))
    if 'weight' not in columns:
        op.add_column('rituals', sa.Column('weight', sa.Float(), server_default='1.0', nullable=False))
    if 'percentage' not in columns:
        op.add_column('rituals', sa.Column('percentage', sa.Float(), nullable=True))
    # Note: Foreign key constraint will be enforced at application level for SQLite
    # PostgreSQL deployments can add the constraint separately


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('rituals', 'percentage')
    op.drop_column('rituals', 'weight')
    op.drop_column('rituals', 'group_id')
    op.drop_table('ritual_groups')
