"""Manual migration: normalize stored datetime text to oxyde 0.7 format.

Oxyde 0.3.1 stored datetimes as '2026-02-19 18:17:39.823056+00:00'
(space separator, UTC offset suffix); oxyde 0.7.1 stores
'2026-02-19 18:17:39.823056' (naive UTC). Other historical writers
(alembic-era SQLAlchemy, raw isoformat() params) may have left
'T'-separated or 'Z'-suffixed variants. These are TEXT columns, so any
format mix breaks bytewise SQL ORDER BY and equality — normalize every
datetime column once so all rows use the naive space-separated form
0.7.1 writes. All stored values are UTC, so dropping the offset loses
nothing.

Created: 2026-07-05
"""

depends_on = "0005_ticket_limbo_intent_blockers"

# Every datetime column, per table, as of migration 0005 / oxyde 0.7 upgrade
# (derived from app.oxyde_models field metadata; frozen here on purpose).
DATETIME_COLUMNS = {
    "api_keys": ["created_at", "last_used_at", "expires_at"],
    "budget_transactions": ["created_at"],
    "document_activities": ["created_at"],
    "document_comments": ["created_at", "updated_at"],
    "document_issues": ["created_at"],
    "documents": ["created_at", "updated_at"],
    "issue_activities": ["created_at"],
    "issue_comments": ["created_at", "updated_at"],
    "issue_relations": ["created_at"],
    "issues": ["due_date", "completed_at", "created_at", "updated_at"],
    "labels": ["created_at"],
    "projects": ["created_at", "updated_at"],
    "ritual_attestations": ["attested_at", "approved_at"],
    "ritual_groups": ["created_at"],
    "rituals": ["created_at", "updated_at"],
    "sprints": ["start_date", "end_date", "created_at", "updated_at"],
    "team_invitations": ["created_at", "expires_at"],
    "team_members": ["joined_at"],
    "teams": ["created_at", "updated_at"],
    "ticket_limbo": ["requested_at", "cleared_at"],
    "ticket_limbo_blockers": ["resolved_at"],
    "users": ["created_at", "updated_at"],
}


def upgrade(ctx):
    """Apply migration."""
    for table, columns in DATETIME_COLUMNS.items():
        for col in columns:
            # 'T' separator -> space; strip UTC suffixes (+00:00 / Z).
            # rtrim('Z') is safe: a trailing Z can only be the UTC
            # designator in these ISO-8601 strings.
            ctx.execute(f"""
                UPDATE {table}
                SET {col} = rtrim(replace(replace({col}, 'T', ' '), '+00:00', ''), 'Z')
                WHERE {col} LIKE '%+00:00'
                   OR {col} LIKE '%Z'
                   OR {col} LIKE '____-__-__T%'
            """)


def downgrade(ctx):
    """Revert migration."""
    # Normalization is lossless (all values were UTC) and the old mixed
    # formats are not worth reconstructing.
    pass
