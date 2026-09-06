"""Record, for the migration replay, the schema that 0005-0016 built by
hand (CHT-1410; the `limbo_type` column type is CHT-1412).

`oxyde makemigrations` does not read the database. It replays the
migration chain in memory to learn what the schema *should* be and diffs
that against the models. Migrations 0005 through 0016 are hand-written
`ctx.execute(...)` SQL (each says why), and the replay ignores raw SQL,
so its picture of the schema stopped at 0004: on a clean checkout
makemigrations proposed 51 operations that re-create five existing
tables, re-add columns 0011-0016 already added, and so on. Nobody could
use the tool, and every schema change since has had to be hand-written,
which is the loop this closes.

This migration executes nothing. On a real database (`oxyde migrate`)
`upgrade` returns at once: the schema is already what the calls below
describe, made by the raw SQL of the migrations before it. In the
replay (`oxyde makemigrations`, and the state pass `oxyde migrate` runs
after each migration) the context is in "collect" mode, where `execute`
is a no-op and the declarative calls only record structure; there the
calls run and bring the recorded schema up to the models, so the diff
is empty. tests/test_migration_state.py holds it there: a schema change
now goes through makemigrations again, or records its state the same
way.

The calls are exactly what makemigrations generated for the drift
(`--name record_hand_written_schema`), in its order. Read them as
bookkeeping, not as changes:

* create_table / add_column / drop_column / create_index / alter_column:
  what 0005-0016 did in SQL. The `alter_column` on `ticket_limbo.
  limbo_type` records the DbEnum type the model has carried since
  CHT-1353 (0001 recorded the column as a plain str: CHT-1412).
* drop_foreign_key (33) and drop_index (2): the Oxyde version that
  wrote 0001 recorded a foreign-key entry per relation and an index per
  indexed column; the version in use records neither (relations are
  read from the models directly), so the replayed state carries entries
  the extractor never produces and they have to be dropped from the
  *record* for the diff to close. The database keeps every constraint
  and index it has.

The ordering constraint is the replay's: these calls only touch the
in-memory state, so nothing here can fail against a database, and the
downgrade is likewise a no-op (a record cannot be un-recorded; rolling
back further than this migration is unsupported anyway, see 0005).

Created: 2026-09-06
"""

depends_on = "0016_sprint_dates_are_outputs"


def _recording(ctx) -> bool:
    """True in the replay (collect mode), False against a database."""
    return getattr(ctx, "_mode", "execute") == "collect"


def upgrade(ctx):
    """Nothing to execute; see the module docstring."""
    if not _recording(ctx):
        return
    _record_state(ctx)


def downgrade(ctx):
    """Nothing to execute: the schema this records was made by 0005-0016
    and is theirs to revert."""


def _record_state(ctx):
    ctx.create_table(
        "ticket_limbo_blockers",
        fields=[
            {
                'name': 'id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': True,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'limbo_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'ritual_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'resolved_at',
                'python_type': 'datetime',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'resolved_by_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            }
        ],
    )
    ctx.create_table(
        "templates",
        fields=[
            {
                'name': 'id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': True,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'team_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'name',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'description',
                'python_type': 'str',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'body',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'created_at',
                'python_type': 'datetime',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'updated_at',
                'python_type': 'datetime',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            }
        ],
        indexes=[
            {
                'name': 'templates_team_id_name_idx',
                'fields': [
                    'team_id',
                    'name'
                ],
                'unique': True,
                'method': None
            }
        ],
    )
    ctx.create_table(
        "issue_description_revisions",
        fields=[
            {
                'name': 'id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': True,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'issue_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'version',
                'python_type': 'int',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'description',
                'python_type': 'str',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'created_at',
                'python_type': 'datetime',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'author_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            }
        ],
        indexes=[
            {
                'name': 'uq_issue_description_revisions_issue_version',
                'fields': [
                    'issue_id',
                    'version'
                ],
                'unique': True,
                'method': None
            }
        ],
        foreign_keys=[
            {
                'name': 'fk_issue_description_revisions_author_id',
                'columns': [
                    'author_id'
                ],
                'ref_table': 'users',
                'ref_columns': [
                    'id'
                ],
                'on_delete': 'SET NULL',
                'on_update': 'CASCADE'
            }
        ],
    )
    ctx.create_table(
        "document_revisions",
        fields=[
            {
                'name': 'id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': True,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'document_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'version',
                'python_type': 'int',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'title',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'content',
                'python_type': 'str',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'created_at',
                'python_type': 'datetime',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'author_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': True,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            }
        ],
        indexes=[
            {
                'name': 'uq_document_revisions_doc_version',
                'fields': [
                    'document_id',
                    'version'
                ],
                'unique': True,
                'method': None
            }
        ],
        foreign_keys=[
            {
                'name': 'fk_document_revisions_author_id',
                'columns': [
                    'author_id'
                ],
                'ref_table': 'users',
                'ref_columns': [
                    'id'
                ],
                'on_delete': 'SET NULL',
                'on_update': 'CASCADE'
            }
        ],
    )
    ctx.create_table(
        "document_issues",
        fields=[
            {
                'name': 'document_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': True,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'issue_id',
                'python_type': 'str',
                'db_type': None,
                'nullable': False,
                'primary_key': True,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            },
            {
                'name': 'created_at',
                'python_type': 'datetime',
                'db_type': None,
                'nullable': False,
                'primary_key': False,
                'unique': False,
                'default': None,
                'auto_increment': False,
                'max_length': None,
                'max_digits': None,
                'decimal_places': None
            }
        ],
    )
    ctx.drop_foreign_key("team_invitations", "fk_team_invitations_team_id")
    ctx.drop_column("ticket_limbo", "ritual_id")
    ctx.alter_column("ticket_limbo", "limbo_type", type='limbotype', python_type='limbotype')
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_issue_id")
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_ritual_id")
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_requested_by_id")
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_cleared_by_id")
    ctx.drop_foreign_key("api_keys", "fk_api_keys_user_id")
    ctx.drop_foreign_key("api_keys", "fk_api_keys_agent_user_id")
    ctx.drop_foreign_key("rituals", "fk_rituals_project_id")
    ctx.add_column("inbox_entries", {
    'name': 'archived_at',
    'python_type': 'datetime',
    'db_type': None,
    'nullable': True,
    'primary_key': False,
    'unique': False,
    'default': None,
    'auto_increment': False,
    'max_length': None,
    'max_digits': None,
    'decimal_places': None
})
    ctx.drop_index("inbox_entries", "inbox_entries_recipient_user_id_idx")
    ctx.drop_index("inbox_entries", "inbox_entries_team_id_idx")
    ctx.drop_foreign_key("document_comments", "fk_document_comments_document_id")
    ctx.drop_foreign_key("document_activities", "fk_document_activities_team_id")
    ctx.add_column("sprints", {
    'name': 'activated_at',
    'python_type': 'datetime',
    'db_type': None,
    'nullable': True,
    'primary_key': False,
    'unique': False,
    'default': None,
    'auto_increment': False,
    'max_length': None,
    'max_digits': None,
    'decimal_places': None
})
    ctx.add_column("sprints", {
    'name': 'closed_at',
    'python_type': 'datetime',
    'db_type': None,
    'nullable': True,
    'primary_key': False,
    'unique': False,
    'default': None,
    'auto_increment': False,
    'max_length': None,
    'max_digits': None,
    'decimal_places': None
})
    ctx.drop_column("sprints", "start_date")
    ctx.drop_column("sprints", "end_date")
    ctx.drop_column("sprints", "token_budget")
    ctx.drop_column("sprints", "tokens_spent")
    ctx.drop_foreign_key("sprints", "fk_sprints_project_id")
    ctx.drop_foreign_key("labels", "fk_labels_team_id")
    ctx.drop_foreign_key("documents", "fk_documents_team_id")
    ctx.drop_foreign_key("documents", "fk_documents_project_id")
    ctx.drop_foreign_key("documents", "fk_documents_sprint_id")
    ctx.add_column("issues", {
    'name': 'lease_expires_at',
    'python_type': 'datetime',
    'db_type': None,
    'nullable': True,
    'primary_key': False,
    'unique': False,
    'default': None,
    'auto_increment': False,
    'max_length': None,
    'max_digits': None,
    'decimal_places': None
})
    ctx.create_index("issues", {
    'name': 'ix_issues_lease_expires_at',
    'fields': [
        'lease_expires_at'
    ],
    'unique': False,
    'method': None,
    'where': 'lease_expires_at IS NOT NULL'
})
    ctx.drop_foreign_key("issues", "fk_issues_project_id")
    ctx.drop_foreign_key("issues", "fk_issues_assignee_id")
    ctx.drop_foreign_key("issues", "fk_issues_sprint_id")
    ctx.drop_foreign_key("issues", "fk_issues_parent_id")
    ctx.drop_foreign_key("budget_transactions", "fk_budget_transactions_sprint_id")
    ctx.drop_foreign_key("budget_transactions", "fk_budget_transactions_issue_id")
    ctx.drop_foreign_key("budget_transactions", "fk_budget_transactions_user_id")
    ctx.drop_foreign_key("ritual_groups", "fk_ritual_groups_project_id")
    ctx.drop_foreign_key("issue_comments", "fk_issue_comments_issue_id")
    ctx.drop_foreign_key("issue_relations", "fk_issue_relations_issue_id")
    ctx.drop_foreign_key("issue_relations", "fk_issue_relations_related_issue_id")
    ctx.drop_foreign_key("users", "fk_users_agent_team_id")
    ctx.drop_foreign_key("users", "fk_users_agent_project_id")
    ctx.drop_foreign_key("ritual_attestations", "fk_ritual_attestations_attested_by")
    ctx.drop_foreign_key("ritual_attestations", "fk_ritual_attestations_approved_by")
    ctx.drop_foreign_key("projects", "fk_projects_team_id")
    ctx.drop_foreign_key("projects", "fk_projects_lead_id")
    ctx.drop_foreign_key("team_members", "fk_team_members_team_id")

