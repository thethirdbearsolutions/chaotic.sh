"""How a response names the author of something whose author was deleted.

Authorship columns are ON DELETE SET NULL (CHT-1427): deleting a user or
agent keeps what it wrote and clears the reference. A response then
carries a null id, and the companion name says so in words, so every
client renders it without having to know the rule.
"""
from typing import Any

DELETED_USER_NAME = "Deleted user"


def name_deleted_author(response: Any, id_field: str, name_field: str) -> Any:
    """Set `name_field` to DELETED_USER_NAME when `id_field` is null and
    no name was supplied. For use in a pydantic `model_validator(mode="after")`."""
    if getattr(response, id_field) is None and getattr(response, name_field) is None:
        setattr(response, name_field, DELETED_USER_NAME)
    return response
