"""Estimate scales (CHT-1365).

A project declares an ``estimate_scale``; until now nothing consulted it on
the write path, so the value was decorative and CHT's data drifted to
Fibonacci under a ``powers_of_2`` label. The scale is still not enforced
-- a hard stop earns its keep for budget arrears, not for an estimate
typo -- but both the MCP tools and the CLI now warn when an estimate is
off the declared scale, so drift is visible at the moment it happens.

The value tables mirror the frontend's ESTIMATE_SCALES (frontend/src/
projects.js), which is what the UI offers in its estimate dropdown.
"""
from __future__ import annotations

SCALE_VALUES: dict[str, tuple[int, ...]] = {
    "fibonacci": (1, 2, 3, 5, 8, 13, 21),
    "linear": (1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    "powers_of_2": (1, 2, 4, 8, 16, 32, 64),
    "tshirt": (1, 2, 3, 5, 8),  # XS, S, M, L, XL
}


def off_scale_warning(estimate: int | None, scale: str | None) -> str | None:
    """One sentence if ``estimate`` is not a value of ``scale``, else None.

    Unknown scales (a value this copy of the table has never heard of)
    produce no warning: the point is to catch drift, not to shout about
    a newer server. 0 is never off-scale: it is a zero-point estimate
    (charges nothing on close), not a typo for the nearest value.
    """
    if estimate is None:
        return None
    values = SCALE_VALUES.get(scale or "")
    if not values or estimate in values:
        return None
    if estimate == 0:
        # A zero-point estimate is a deliberate "costs nothing" (it charges
        # 0 to the sprint), not a typo for the nearest scale value.
        return None
    nearest = min(values, key=lambda v: (abs(v - estimate), v))
    listed = ", ".join(str(v) for v in values)
    return (
        f"Estimate {estimate} is not on this project's {scale} scale ({listed}); "
        f"nearest is {nearest}. Stored as given."
    )
