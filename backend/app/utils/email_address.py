"""Comparing email addresses without regard to case (CHT-1790, CHT-1789).

Two accounts must not hold addresses that differ only in case: the
email-verification limits count per address (an HMAC of its folded
form), so ``Alice@corp.com`` and ``alice@corp.com`` as two accounts
would share one bucket, and either could exhaust the other's.

``fold_email`` lowercases ASCII letters only and strips whitespace, as
SQLite's built-in ``lower(trim(...))`` does for every address the app
stores: two addresses that differ in the case of a non-ASCII letter are
two addresses, and get two buckets. ``users.email_folded`` holds it,
under a unique index (migration 0034, CHT-1804), and lookups go through
that column rather than Oxyde's ``iexact``, which lowercases its
argument with Python's Unicode ``lower()`` and so never matches an
address with a non-ASCII capital on SQLite.
"""

_ASCII_FOLD = str.maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")


def fold_email(email: str) -> str:
    """The form two addresses are compared in: stripped, ASCII-lowercased."""
    return (email or "").strip().translate(_ASCII_FOLD)


def same_email(a: str, b: str) -> bool:
    """Are ``a`` and ``b`` the same address, ignoring (ASCII) case?"""
    return fold_email(a) == fold_email(b)
