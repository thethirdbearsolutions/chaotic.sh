"""Who did something, as an embedded summary (CHT-1500, partial CHT-1429).

Responses that name an actor used to carry only an id and a ``*_name``
string, so a client could not tell a person from an agent, or say whose
agent it is, without a second lookup per row. Each such response now
also carries a ``PrincipalSummary`` next to the name it already had
(additive, ADR-0005): ``creator``/``assignee`` on issues, ``author`` on
comments and documents, ``user`` on activity, ``source_user`` on inbox
entries, ``attester``/``approver`` on ritual attestations.

The summary is built by ``app.services.principals.fill_principals`` from
two batched queries per response (the principals, then their owners),
never from the ORM relation: an ``OxydeUser`` row carries the password
hash and agent-scoping columns, and a summary must not.

A principal that no longer exists (author deleted, CHT-1427) is ``None``;
the companion ``*_name`` already says "Deleted user".

``kind`` and the registrar land with the identity columns (CHT-1497);
until then ``is_agent`` and the owner are what tells principals apart.
"""
from typing import ClassVar

from pydantic import BaseModel


class PrincipalSummary(BaseModel):
    """A person or an agent, as a response names it."""

    id: str
    name: str
    is_agent: bool = False
    # An agent's owner: the human who created it (users.parent_user).
    # Both None for a person.
    owner_id: str | None = None
    owner_name: str | None = None


class HasPrincipals:
    """Mixin for a response that embeds principal summaries.

    ``principal_fields`` maps each summary field to the id field it
    summarises, e.g. ``{"creator": "creator_id"}``.
    ``fill_principals`` reads it, so a schema declares its actors once.

    ``principal_name_fields`` optionally maps a summary field to its
    ``*_name`` companion, which ``fill_principals`` sets from the summary
    when the builder left it unset, so a builder need not look names up.
    """

    principal_fields: ClassVar[dict[str, str]] = {}
    principal_name_fields: ClassVar[dict[str, str]] = {}
