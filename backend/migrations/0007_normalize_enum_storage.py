"""Manual migration: normalize legacy DbEnum rows from .value to .name (CHT-1209).

DbEnum columns are meant to store the enum member .name ('GATE'); some
legacy writers stored .value ('gate'). PR #196 binds .name in query
filters (e.g. approval_mode=ApprovalMode.GATE.name), which silently
misses .value-stored rows. Rewrite every known .value to its .name, once,
across all DbEnum columns.

Created: 2026-07-05
"""

depends_on = "0006_normalize_datetime_format"

# Every DbEnum column and its value -> name rewrite map, frozen at the
# 0.7-upgrade/CHT-1209 sweep (derived from app.oxyde_models field metadata;
# members whose value == name need no rewrite and are omitted).
ENUM_COLUMNS = {
    "document_activities": {
        "activity_type": {
            "doc_created": "CREATED",
            "doc_updated": "UPDATED",
            "doc_deleted": "DELETED",
            "doc_commented": "COMMENTED",
        },
    },
    "issue_activities": {
        "activity_type": {
            "created": "CREATED",
            "updated": "UPDATED",
            "status_changed": "STATUS_CHANGED",
            "priority_changed": "PRIORITY_CHANGED",
            "assigned": "ASSIGNED",
            "unassigned": "UNASSIGNED",
            "commented": "COMMENTED",
            "labeled": "LABELED",
            "unlabeled": "UNLABELED",
            "moved_to_sprint": "MOVED_TO_SPRINT",
            "removed_from_sprint": "REMOVED_FROM_SPRINT",
            "ritual_attested": "RITUAL_ATTESTED",
            "ritual_approved": "RITUAL_APPROVED",
            "intent_opened": "INTENT_OPENED",
            "intent_cleared": "INTENT_CLEARED",
            "intent_canceled": "INTENT_CANCELED",
        },
    },
    "issue_relations": {
        "relation_type": {
            "blocks": "BLOCKS",
            "relates_to": "RELATES_TO",
            "duplicates": "DUPLICATES",
        },
    },
    "issues": {
        "status": {
            "backlog": "BACKLOG",
            "todo": "TODO",
            "in_progress": "IN_PROGRESS",
            "in_review": "IN_REVIEW",
            "done": "DONE",
            "canceled": "CANCELED",
        },
        "priority": {
            "no_priority": "NO_PRIORITY",
            "urgent": "URGENT",
            "high": "HIGH",
            "medium": "MEDIUM",
            "low": "LOW",
        },
        "issue_type": {
            "task": "TASK",
            "bug": "BUG",
            "feature": "FEATURE",
            "chore": "CHORE",
            "docs": "DOCS",
            "tech_debt": "TECH_DEBT",
            "epic": "EPIC",
        },
    },
    "projects": {
        "estimate_scale": {
            "fibonacci": "FIBONACCI",
            "linear": "LINEAR",
            "powers_of_2": "POWERS_OF_2",
            "tshirt": "TSHIRT",
        },
        "unestimated_handling": {
            "default_one_point": "DEFAULT_ONE_POINT",
            "block_until_estimated": "BLOCK_UNTIL_ESTIMATED",
        },
    },
    "ritual_groups": {
        "selection_mode": {
            "random_one": "RANDOM_ONE",
            "round_robin": "ROUND_ROBIN",
            "percentage": "PERCENTAGE",
        },
    },
    "rituals": {
        "trigger": {
            "every_sprint": "EVERY_SPRINT",
            "ticket_close": "TICKET_CLOSE",
            "ticket_claim": "TICKET_CLAIM",
        },
        "approval_mode": {
            "auto": "AUTO",
            "review": "REVIEW",
            "gate": "GATE",
        },
    },
    "sprints": {
        "status": {
            "planned": "PLANNED",
            "active": "ACTIVE",
            "completed": "COMPLETED",
        },
    },
    "team_invitations": {
        "role": {
            "owner": "OWNER",
            "admin": "ADMIN",
            "member": "MEMBER",
        },
        "status": {
            "pending": "PENDING",
            "accepted": "ACCEPTED",
            "declined": "DECLINED",
            "expired": "EXPIRED",
        },
    },
    "team_members": {
        "role": {
            "owner": "OWNER",
            "admin": "ADMIN",
            "member": "MEMBER",
        },
    },
}


def upgrade(ctx):
    """Apply migration."""
    for table, columns in ENUM_COLUMNS.items():
        for col, mapping in columns.items():
            whens = " ".join(
                f"WHEN '{value}' THEN '{name}'" for value, name in mapping.items()
            )
            in_list = ", ".join(f"'{value}'" for value in mapping)
            ctx.execute(f"""
                UPDATE {table}
                SET "{col}" = CASE "{col}" {whens} ELSE "{col}" END
                WHERE "{col}" IN ({in_list})
            """)


def downgrade(ctx):
    """Revert migration."""
    # .name is the canonical storage form; the legacy .value rows were the
    # bug. Nothing to restore.
    pass
