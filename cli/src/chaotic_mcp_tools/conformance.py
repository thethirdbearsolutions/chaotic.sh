"""Signature conformance between the Backend protocol and its adapters
(CHT-1396). A tool body that passes a keyword one adapter lacks fails only
at runtime, on that transport; this makes it fail at test time, by name.

What is compared, per protocol method: that the adapter has it, that it is
a coroutine function, and each parameter's name, kind and default (defaults
by type as well as value, so `0` is not `False`). Annotations are NOT
compared: the adapters mostly omit them, and the protocol's are
documentation for the bodies, not a contract the adapters restate. The
`capabilities` attribute is checked to exist and be a `Capabilities`.

This module is test support that lives in the package on purpose: the
backend suite imports it too and cannot reach `cli/tests`. It therefore
ships in the `chaotic-cli` wheel; that is accepted, not an oversight.
"""
from __future__ import annotations

import inspect

from .backend import Backend, Capabilities

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


def _same_default(a: object, b: object) -> bool:
    """`inspect.Parameter.empty` is compared by identity; anything else must
    match in type as well as value, so `0`/`False` and `1.0`/`1` differ."""
    return a is b or (type(a) is type(b) and a == b)


def _describe(shape: tuple[str, object]) -> str:
    kind, default = shape
    if default is inspect.Parameter.empty:
        return f"{kind}, no default"
    return f"{kind}, default {default!r} ({type(default).__name__})"


def conformance_problems(adapter: type, label: str) -> list[str]:
    """Every difference between the protocol's method signatures and the
    adapter's, one line each, naming the method and the parameter."""
    problems = []
    if not isinstance(getattr(adapter, "capabilities", None), Capabilities):
        # registry.bind reads backend.capabilities.team_param unconditionally;
        # both adapters carry it as a class attribute.
        problems.append(f"{label}.capabilities: missing or not a Capabilities")
    for name in protocol_methods():
        expected = _shape(getattr(Backend, name))
        impl = getattr(adapter, name, None)
        if impl is None:
            problems.append(f"{label}.{name}: missing")
            continue
        if not callable(impl):
            problems.append(f"{label}.{name}: not a method ({type(impl).__name__})")
            continue
        if not inspect.iscoroutinefunction(impl):
            problems.append(f"{label}.{name}: not async")
        actual = _shape(impl)
        for param in sorted(set(expected) - set(actual)):
            problems.append(f"{label}.{name}: parameter {param!r} missing")
        for param in sorted(set(actual) - set(expected)):
            problems.append(f"{label}.{name}: unexpected parameter {param!r}")
        for param in sorted(set(expected) & set(actual)):
            if expected[param][0] != actual[param][0] or not _same_default(expected[param][1], actual[param][1]):
                problems.append(
                    f"{label}.{name}: parameter {param!r} is ({_describe(actual[param])}) on the adapter, "
                    f"({_describe(expected[param])}) on the protocol"
                )
    return problems
