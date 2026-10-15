"""Comparing email addresses without regard to case (CHT-1790, CHT-1789).

Two accounts must not hold addresses that differ only in case: the
email-verification limits count per address (an HMAC of its folded
form), so ``Alice@corp.com`` and ``alice@corp.com`` as two accounts
would share one bucket, and either could exhaust the other's.

``fold_email`` lowercases ASCII letters only and strips whitespace. It
matches what SQLite's LIKE (and so Oxyde's ``iexact`` there) treats as
equal, so the database lookup and the Python comparison agree: two
addresses that differ in the case of a non-ASCII letter are two
addresses to both, and get two buckets.
"""

_ASCII_FOLD = str.maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")


def fold_email(email: str) -> str:
    """The form two addresses are compared in: stripped, ASCII-lowercased."""
    return (email or "").strip().translate(_ASCII_FOLD)


def same_email(a: str, b: str) -> bool:
    """Are ``a`` and ``b`` the same address, ignoring (ASCII) case?"""
    return fold_email(a) == fold_email(b)
