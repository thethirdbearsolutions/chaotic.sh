"""Record, for the migration replay, the schema the migrations before this
one built where the replay could not see it (CHT-1410; the `limbo_type`
column type is CHT-1412).

`oxyde makemigrations` does not read the database. It replays the
migration chain in memory to learn what the schema *should* be and diffs
that against the models. Three things kept the replayed record behind
the models: the raw `ctx.execute` SQL most migrations since 0005 are
written in is invisible to the replay (0012 is declarative, and 0001
itself created `document_issues` in raw SQL); Oxyde's extractor reports
no index for a `db_index=True` field, so indexes migrations created by
hand were never modelled; and it reports no foreign key for a column the
models type as a bare `str`, `db_on_delete=` or not, while 0001 recorded
one per relation. On a clean checkout makemigrations proposed 51
operations that re-created five existing tables, re-added columns
0011-0016 had added, and so on: nobody could use the tool, and every
schema change since had to be hand-written, which is the loop this
closes.

This migration executes nothing. On a real database (`oxyde migrate`)
`upgrade` returns at once: the schema is already what the calls below
describe. In the replay (`oxyde makemigrations`, and the state pass
`oxyde migrate` runs after each migration) the context is in "collect"
mode, where `execute` is a no-op and the declarative calls only record
structure; there the calls run and bring the recorded schema up to the
models, so the diff is empty. tests/test_migration_state.py holds it
there, and holds the record's indexes equal to a database's built from
the chain: a schema change now goes through makemigrations again, or
records its state the same way.

The calls are what makemigrations generated for the drift (`--name
record_hand_written_schema_state`), in its order, once the indexes the
migrations had created by hand were declared on the models. Read them
as bookkeeping, not as changes:

* create_table (5) / add_column (4) / drop_column (5) / create_index
  (5): what the raw SQL of 0001-0016 did. The indexes are the partial
  and unique ones from 0001, 0004, 0005 and 0011, now in the models'
  `Meta.indexes` under their existing names so a table rebuild keeps
  them; 0012's two `inbox_entries` indexes were declarative and stay
  recorded.
* alter_column (1): `ticket_limbo.limbo_type` is the DbEnum the model
  has carried since CHT-1353; 0001 recorded it as a plain str
  (CHT-1412).
* drop_foreign_key (33): constraints 0001 recorded for columns the
  models type as `str`. The extractor never reports those, so they have
  to leave the *record* for the diff to close. The database keeps every
  constraint it has; the record says what the models say, and a
  generated migration will not add or drop a foreign key on SQLite in
  any case.

Nothing here can fail against a database, and the downgrade is likewise
a no-op: the schema this records was made by the migrations before it
and is theirs to revert. `oxyde sqlmigrate` cannot render this migration
(a state-only migration has no SQL to show).

Created: 2026-09-06
"""

depends_on = "0016_sprint_dates_are_outputs"


def _recording(ctx) -> bool:
    """True in the replay (collect mode), False against a database. A
    context without `_mode` (a future Oxyde) reads as a database, so the
    fallback is to record nothing and let the replay test fail loudly."""
    return getattr(ctx, "_mode", "execute") == "collect"


def upgrade(ctx):
    """Nothing to execute; see the module docstring."""
    if not _recording(ctx):
        return
    _record_state(ctx)


def downgrade(ctx):
    """Nothing to execute: the schema this records was made by the
    migrations before it and is theirs to revert."""


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
        indexes=[
            {
                'name': 'uq_ticket_limbo_blocker',
                'fields': [
                    'limbo_id',
                    'ritual_id'
                ],
                'unique': True,
                'method': None
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
    ctx.drop_foreign_key("projects", "fk_projects_team_id")
    ctx.drop_foreign_key("projects", "fk_projects_lead_id")
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
    ctx.drop_foreign_key("team_members", "fk_team_members_team_id")
    ctx.drop_foreign_key("team_invitations", "fk_team_invitations_team_id")
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
    ctx.drop_foreign_key("issue_comments", "fk_issue_comments_issue_id")
    ctx.drop_foreign_key("api_keys", "fk_api_keys_user_id")
    ctx.drop_foreign_key("api_keys", "fk_api_keys_agent_user_id")
    ctx.drop_column("ticket_limbo", "ritual_id")
    ctx.alter_column("ticket_limbo", "limbo_type", type='limbotype', python_type='limbotype')
    ctx.create_index("ticket_limbo", {
    'name': 'uq_ticket_limbo_open_intent',
    'fields': [
        'issue_id',
        'limbo_type'
    ],
    'unique': True,
    'method': None,
    'where': 'cleared_at IS NULL'
})
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_issue_id")
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_ritual_id")
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_requested_by_id")
    ctx.drop_foreign_key("ticket_limbo", "fk_ticket_limbo_cleared_by_id")
    ctx.drop_foreign_key("budget_transactions", "fk_budget_transactions_sprint_id")
    ctx.drop_foreign_key("budget_transactions", "fk_budget_transactions_issue_id")
    ctx.drop_foreign_key("budget_transactions", "fk_budget_transactions_user_id")
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
    ctx.drop_foreign_key("ritual_groups", "fk_ritual_groups_project_id")
    ctx.drop_foreign_key("document_comments", "fk_document_comments_document_id")
    ctx.drop_foreign_key("document_activities", "fk_document_activities_team_id")
    ctx.drop_foreign_key("documents", "fk_documents_team_id")
    ctx.drop_foreign_key("documents", "fk_documents_project_id")
    ctx.drop_foreign_key("documents", "fk_documents_sprint_id")
    ctx.drop_foreign_key("rituals", "fk_rituals_project_id")
    ctx.drop_foreign_key("users", "fk_users_agent_team_id")
    ctx.drop_foreign_key("users", "fk_users_agent_project_id")
    ctx.create_index("issue_relations", {
    'name': 'uq_issue_relation',
    'fields': [
        'issue_id',
        'related_issue_id'
    ],
    'unique': True,
    'method': None
})
    ctx.drop_foreign_key("issue_relations", "fk_issue_relations_issue_id")
    ctx.drop_foreign_key("issue_relations", "fk_issue_relations_related_issue_id")
    ctx.create_index("ritual_attestations", {
    'name': 'uq_ritual_attestation_per_issue',
    'fields': [
        'ritual_id',
        'issue_id'
    ],
    'unique': True,
    'method': None,
    'where': 'issue_id IS NOT NULL'
})
    ctx.create_index("ritual_attestations", {
    'name': 'uq_ritual_attestation_per_sprint',
    'fields': [
        'ritual_id',
        'sprint_id'
    ],
    'unique': True,
    'method': None,
    'where': 'sprint_id IS NOT NULL'
})
    ctx.drop_foreign_key("ritual_attestations", "fk_ritual_attestations_attested_by")
    ctx.drop_foreign_key("ritual_attestations", "fk_ritual_attestations_approved_by")

