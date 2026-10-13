"""How the CLI names who did something (CHT-1500).

Responses that name an actor carry a principal summary next to the
``*_name`` string: ``{id, name, is_agent, owner_id, owner_name}``.
``principal_label`` turns it into one line a person can read at a glance,
"Builder Bot (agent of Ada)", so an agent is never mistaken for its
owner. A response from a backend older than the summary has only the
name, and gets it unchanged.
"""
from __future__ import annotations

from rich.markup import escape


def principal_label(principal, fallback: str | None = None) -> str | None:
    """``"Name"`` for a person, ``"Name (agent of Owner)"`` for an agent
    (``"Name (agent)"`` when it has no owner); `fallback` when there is
    no summary to read."""
    if not isinstance(principal, dict) or not principal.get("name"):
        return fallback
    name = principal["name"]
    if not principal.get("is_agent"):
        return name
    owner = principal.get("owner_name")
    return f"{name} (agent of {owner})" if owner else f"{name} (agent)"


def principal_markup(principal, fallback: str | None = None) -> str | None:
    """`principal_label`, escaped for a Rich markup string or table cell.

    Names are free text: a name containing ``[/dim]`` would otherwise
    crash the render (MarkupError) and one containing ``[link=...]`` would
    inject a terminal hyperlink. Use this wherever the label lands in
    markup; use `principal_label` for plain output (click.echo, JSON)."""
    label = principal_label(principal, fallback)
    return None if label is None else escape(label)
