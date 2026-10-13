"""Batch-load principal summaries for responses (CHT-1500).

See ``app.schemas.principal`` for what a summary is and why it exists.
Two queries per call however many rows and principals there are: the
principals, then the owners of whichever of them are agents.
"""
from collections.abc import Iterable

from pydantic import BaseModel

from app.oxyde_models.user import OxydeUser
from app.schemas.principal import HasPrincipals, PrincipalSummary


def _get(row, key):
    return row[key] if isinstance(row, dict) else getattr(row, key)


async def load_principals(ids: Iterable[str | None]) -> dict[str, PrincipalSummary]:
    """Summaries for `ids`, keyed by id. Unknown ids (deleted) are absent."""
    wanted = {i for i in ids if i}
    if not wanted:
        return {}
    # Named columns, never whole rows: a user row carries the password hash.
    rows = await OxydeUser.objects.filter(id__in=list(wanted)).values(
        "id", "name", "is_agent", "parent_user_id",
    ).all()
    found = {_get(r, "id"): r for r in rows}

    owner_ids = {_get(r, "parent_user_id") for r in rows if _get(r, "is_agent")} - {None}
    owner_names = {i: _get(found[i], "name") for i in owner_ids if i in found}
    missing = owner_ids - owner_names.keys()
    if missing:
        owners = await OxydeUser.objects.filter(id__in=list(missing)).values("id", "name").all()
        owner_names.update({_get(o, "id"): _get(o, "name") for o in owners})

    out = {}
    for uid, r in found.items():
        is_agent = bool(_get(r, "is_agent"))
        owner_id = _get(r, "parent_user_id") if is_agent else None
        out[uid] = PrincipalSummary(
            id=uid,
            name=_get(r, "name"),
            is_agent=is_agent,
            owner_id=owner_id,
            owner_name=owner_names.get(owner_id) if owner_id else None,
        )
    return out


def _walk(obj, seen: set[int]):
    """Yield every HasPrincipals model in `obj`, descending into nested
    models and lists of them (an attestation inside a pending-ritual row)."""
    if isinstance(obj, (list, tuple)):
        for item in obj:
            yield from _walk(item, seen)
        return
    if not isinstance(obj, BaseModel) or id(obj) in seen:
        return
    seen.add(id(obj))
    if isinstance(obj, HasPrincipals):
        yield obj
    for name in type(obj).model_fields:
        value = getattr(obj, name, None)
        if isinstance(value, (BaseModel, list, tuple)):
            yield from _walk(value, seen)


async def fill_principals(responses):
    """Set every declared principal field on `responses` (a model or a
    list of them, nested models included) from one batched load.
    Returns `responses` so a caller can `return await fill_principals(x)`."""
    models = list(_walk(responses, set()))
    ids = {
        getattr(m, id_field)
        for m in models
        for id_field in type(m).principal_fields.values()
    }
    principals = await load_principals(ids)
    for m in models:
        names = type(m).principal_name_fields
        for field, id_field in type(m).principal_fields.items():
            uid = getattr(m, id_field)
            principal = principals.get(uid) if uid else None
            setattr(m, field, principal)
            name_field = names.get(field)
            if name_field and principal and getattr(m, name_field) is None:
                setattr(m, name_field, principal.name)
    return responses
