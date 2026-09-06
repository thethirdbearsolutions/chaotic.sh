"""Signature conformance between the Backend protocol and its adapters
(CHT-1396). A tool body that passes a keyword one adapter lacks fails only
at runtime, on that transport; this makes it fail at test time, by name."""
from __future__ import annotations

import inspect

from .backend import Backend

_SKIP = {"self"}


def protocol_methods() -> list[str]:
    return sorted(
        name for name, member in vars(Backend).items()
        if not name.startswith("_") and inspect.isfunction(member)
    )


def _shape(fn) -> dict[str, tuple[str, object]]:
    return {
        p.name: (p.kind.name, p.default)
        for p in inspect.signature(fn).parameters.values()
        if p.name not in _SKIP
    }


def conformance_problems(adapter: type, label: str) -> list[str]:
    """Every difference between the protocol's method signatures and the
    adapter's, one line each, naming the method and the parameter."""
    problems = []
    for name in protocol_methods():
        expected = _shape(getattr(Backend, name))
        impl = getattr(adapter, name, None)
        if impl is None:
            problems.append(f"{label}.{name}: missing")
            continue
        if not inspect.iscoroutinefunction(impl):
            problems.append(f"{label}.{name}: not async")
        actual = _shape(impl)
        for param in sorted(set(expected) - set(actual)):
            problems.append(f"{label}.{name}: parameter {param!r} missing")
        for param in sorted(set(actual) - set(expected)):
            problems.append(f"{label}.{name}: unexpected parameter {param!r}")
        for param in sorted(set(expected) & set(actual)):
            if expected[param] != actual[param]:
                problems.append(
                    f"{label}.{name}: parameter {param!r} is {actual[param]} on the adapter, "
                    f"{expected[param]} on the protocol"
                )
    return problems
