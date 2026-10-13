"""Ritual tools."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import TEAM_FIELD_DESC
from ..errors import ToolInputError

_TICKET_TRIGGERS = ("ticket_close", "ticket_claim")

# Backends hand rituals over in wire form (the enum's value), so this map
# only matters for a row that arrived in NAME form from somewhere older.
# Explicit rather than NAME.lower(): that fold worked only because every
# current member happens to satisfy it -- DocumentActivityType.CREATED
# is "doc_created" and would break it silently (CHT-1354).
_KNOWN_TRIGGERS = {
    "EVERY_SPRINT": "every_sprint",
    "TICKET_CLOSE": "ticket_close",
    "TICKET_CLAIM": "ticket_claim",
}


def _trigger_of(rit: dict) -> str:
    """A ritual's trigger as the enum's VALUE, whatever form it arrives in.
    Falls back to the raw string for a value the map doesn't know, so an
    unrecognised trigger still reaches the sprint branch rather than
    raising here."""
    raw = rit.get("trigger") or ""
    return _KNOWN_TRIGGERS.get(raw, raw)


async def _find_ritual(backend: Backend, project_id: str, name: str) -> dict:
    """Resolve a ritual by name (case-insensitively), or by id."""
    rituals = list(await backend.list_rituals(project_id) or [])
    if not rituals:
        raise ToolInputError("This project has no rituals configured.")

    for rit in rituals:
        if rit.get("id") == name:
            return rit
    lowered = name.lower()
    matches = [r for r in rituals if (r.get("name") or "").lower() == lowered]
    if len(matches) == 1:
        return matches[0]
    if len(matches) > 1:
        raise ToolInputError(f"Ambiguous ritual name '{name}'.")

    known = ", ".join(sorted(r["name"] for r in rituals))
    raise ToolInputError(f"No ritual named '{name}'. This project's rituals: {known}.")


async def _artifact_of(backend: Backend, rit: dict, document: str | None, url: str | None) -> tuple[str | None, str | None]:
    """(document_id, url) for the attestation request. A ritual that
    declares an artifact is refused here, with its prompt, when the
    matching argument is missing -- the server would refuse it too, but
    the caller has no other way to see what is asked. A `document` is
    resolved like every other document argument (id, prefix, or title).
    """
    kind = rit.get("artifact")
    if kind == "document" and not document:
        raise ToolInputError(
            f"Ritual '{rit['name']}' requires a document you wrote for it: pass `document` "
            f"(id or title). It asks: \"{rit.get('prompt')}\"."
        )
    if kind == "url" and not (url and url.strip()):
        raise ToolInputError(
            f"Ritual '{rit['name']}' requires a URL to the artifact: pass `url`. "
            f"It asks: \"{rit.get('prompt')}\"."
        )
    document_id = await backend.resolve_document(document) if document else None
    return document_id, (url.strip() if url else None)


def _require_note(rit: dict, note: str | None) -> None:
    """Reject a missing note the way the CLI does -- quoting the ritual's
    own prompt, because that prompt is the question the note has to
    answer and the caller has no other way to see it.
    """
    if rit.get("note_required", True) and not (note and note.strip()):
        raise ToolInputError(
            f"Ritual '{rit['name']}' requires a note. It asks: \"{rit.get('prompt')}\". "
            "Pass `note` with your answer."
        )


def _needs_identifier(rit: dict, identifier: str | None) -> None:
    if not identifier:
        raise ToolInputError(
            f"Ritual '{rit['name']}' is a {_trigger_of(rit)} ritual -- pass "
            "`identifier` naming the ticket it gates."
        )


async def ritual_pending(
    backend: Backend,
    identifier: Annotated[
        str | None,
        Field(description="Issue identifier for ticket-level rituals, e.g. CHT-123. "
                          "Omit for the project's sprint rituals.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Show which rituals are currently blocking you, and what each one asks.

    Without `identifier`: the project's pending SPRINT rituals -- what a
    sprint sitting in limbo after sprint_close is waiting on.
    With `identifier`: the pending close/claim rituals gating that ticket.

    This is the lookup that makes attestation possible at all: rituals
    are addressed by name, and nothing else on this surface tells you
    what those names are or what each one is asking for. Each entry
    carries its `prompt` (the question your note must answer),
    `approval_mode`, and any existing `attestation`.
    """
    if identifier:
        # Resolved AFTER the branch: a ticket's rituals are found from the
        # issue itself, so requiring project context here made the call
        # fail for a caller with no current project even though nothing
        # on this path uses it (CHT-1351).
        iss = await backend.get_issue(identifier)
        pending = await backend.get_pending_issue_rituals(iss["id"]) or {}
        rituals = pending.get("pending_rituals", []) or []
        return {
            "scope": "ticket",
            "identifier": identifier,
            "pending_rituals": rituals,
            "unattested": [r["name"] for r in rituals if not r.get("attestation")],
        }

    project_id, _ = await backend.resolve_project(project, team)
    status = await backend.get_limbo_status(project_id) or {}
    rituals = status.get("pending_rituals", []) or []
    return {
        "scope": "sprint",
        "in_limbo": bool(status.get("in_limbo")),
        "pending_rituals": rituals,
        "unattested": [r["name"] for r in rituals if not r.get("attestation")],
    }


async def ritual_list(
    backend: Backend,
    include_inactive: Annotated[
        bool,
        Field(description="Include deactivated rituals as well as active ones.")
    ] = False,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """List a project's configured rituals: name, trigger, prompt, and approval mode.

    `trigger` tells you which scope a ritual belongs to -- ticket_close
    and ticket_claim gate individual tickets, everything else gates the
    sprint. ritual_attest works that out for you.
    """
    project_id, _ = await backend.resolve_project(project, team)
    rituals = await backend.list_rituals(project_id, include_inactive=include_inactive)
    return {"rituals": list(rituals or [])}


async def ritual_attest(
    backend: Backend,
    ritual: Annotated[str, Field(description="Ritual name (or id), from ritual_pending/ritual_list.")],
    note: Annotated[
        str | None,
        Field(description="Your attestation note -- the answer to the ritual's prompt. "
                          "Required unless the ritual sets note_required=false.")
    ] = None,
    identifier: Annotated[
        str | None,
        Field(description="Issue identifier, for ticket-level rituals. Looked up "
                          "automatically when the ritual is ticket-scoped.")
    ] = None,
    document: Annotated[
        str | None,
        Field(description="For a ritual whose artifact is `document`: the document you wrote "
                          "for it (id, id prefix, or exact title). The server checks it is "
                          "yours and written for this sprint/ticket.")
    ] = None,
    url: Annotated[
        str | None,
        Field(description="For a ritual whose artifact is `url`: the link to the artifact "
                          "(a PR review comment, a report).")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Attest a ritual -- confirm you did the thing it asks about.

    Dispatches on the ritual's own trigger, so you don't have to know
    whether it's sprint-scoped or ticket-scoped: pass `identifier` when
    attesting a ticket's close/claim gate, omit it for a sprint ritual.

    If the ritual's approval_mode is `auto` this clears it outright.
    Under `review` it records the attestation and leaves it pending a
    human; `approved` in the result says which happened.

    Under `gate` this is REFUSED -- gate rituals are human-completion
    only and the server rejects an attestation outright rather than
    recording one. Use ritual_complete for those, and ritual_list to see
    each ritual's approval_mode before choosing.

    A ritual with an `artifact` (see ritual_list) binds the attestation
    to it: pass `document` (a document you wrote for it) or `url`. The
    server verifies a document is yours and written for this sprint or
    ticket; a note alone no longer clears such a ritual (CHT-1359).
    """
    project_id, _ = await backend.resolve_project(project, team)
    rit = await _find_ritual(backend, project_id, ritual)
    _require_note(rit, note)
    document_id, url = await _artifact_of(backend, rit, document, url)

    if _trigger_of(rit) in _TICKET_TRIGGERS:
        _needs_identifier(rit, identifier)
        iss = await backend.get_issue(identifier)
        result = await backend.attest_ritual_for_issue(
            rit["id"], iss["id"], note, document_id=document_id, url=url,
        )
        return {
            "scope": "ticket",
            "ritual": rit["name"],
            "identifier": identifier,
            "approved": bool(result.get("approved_at")),
            "attestation": result,
        }

    result = await backend.attest_ritual(rit["id"], project_id, note, document_id=document_id, url=url)
    status = await backend.get_limbo_status(project_id) or {}
    return {
        "scope": "sprint",
        "ritual": rit["name"],
        "approved": bool(result.get("approved_at")),
        "still_in_limbo": bool(status.get("in_limbo")),
        "remaining": [r["name"] for r in (status.get("pending_rituals") or [])],
        "attestation": result,
    }


async def ritual_complete(
    backend: Backend,
    ritual: Annotated[str, Field(description="Ritual name (or id), from ritual_pending/ritual_list.")],
    note: Annotated[str | None, Field(description="Optional note about the completion.")] = None,
    identifier: Annotated[
        str | None,
        Field(description="Issue identifier, for ticket-level rituals.")
    ] = None,
    document: Annotated[
        str | None,
        Field(description="For a ritual whose artifact is `document`: the document you wrote "
                          "for it (id, id prefix, or exact title). The server checks it is "
                          "yours and written for this sprint/ticket.")
    ] = None,
    url: Annotated[
        str | None,
        Field(description="For a ritual whose artifact is `url`: the link to the artifact "
                          "(a PR review comment, a report).")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Complete a GATE-mode ritual.

    Distinct from ritual_attest: gate rituals are the ones a human is
    supposed to sign off, and the server enforces that -- expect a
    permission error rather than success if the calling identity isn't
    allowed to. Attesting is the normal path; this is for the rare case
    where you legitimately hold that role.
    """
    project_id, _ = await backend.resolve_project(project, team)
    rit = await _find_ritual(backend, project_id, ritual)
    document_id, url = await _artifact_of(backend, rit, document, url)

    if _trigger_of(rit) in _TICKET_TRIGGERS:
        _needs_identifier(rit, identifier)
        iss = await backend.get_issue(identifier)
        result = await backend.complete_gate_ritual_for_issue(
            rit["id"], iss["id"], note, document_id=document_id, url=url,
        )
        return {"scope": "ticket", "ritual": rit["name"],
                "identifier": identifier, "attestation": result}

    result = await backend.complete_gate_ritual(rit["id"], project_id, note, document_id=document_id, url=url)
    status = await backend.get_limbo_status(project_id) or {}
    return {
        "scope": "sprint",
        "ritual": rit["name"],
        "still_in_limbo": bool(status.get("in_limbo")),
        "remaining": [r["name"] for r in (status.get("pending_rituals") or [])],
        "attestation": result,
    }
