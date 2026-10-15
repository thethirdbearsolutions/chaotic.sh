"""Whether a URL host names only the machine it is read on (CHT-1822).

That covers loopback hosts (``localhost``, ``*.localhost``, 127.0.0.0/8,
``::1`` and IPv4-mapped ``::ffff:127.x.y.z``) and unspecified ones
(``0.0.0.0``, ``::``: a bind address copied into a URL by mistake). A link
on such a host cannot be opened from another machine.

IPv4 is read the way a browser's URL parser reads it (WHATWG). A host is
one to four dot-separated parts, each decimal, ``0x`` hex or
leading-zero octal, and the last part fills the remaining bytes. So
``127.1``, ``2130706433`` and ``0x7f.1`` are all 127.0.0.1. ``ipaddress``
rejects those forms, and its ``is_loopback`` sees through IPv4-mapped
addresses only from Python 3.13. This module handles both on every
version.

Keep this module identical to its twin (backend/app/utils/local_host.py
and cli/src/cli/local_host.py) and to ``isLocalHost`` in
frontend/src/teams.js. All three are tested against
testdata/local-hosts.json.
"""
from __future__ import annotations

import ipaddress


def _ipv4_number(part: str) -> int | None:
    if not part:
        return None
    try:
        if part[:2] in ("0x", "0X"):
            return int(part[2:], 16) if part[2:] else 0
        if not part.isdigit():
            return None
        if len(part) > 1 and part[0] == "0":
            return int(part[1:], 8)
        return int(part)
    except ValueError:
        return None


def _whatwg_ipv4(host: str) -> ipaddress.IPv4Address | None:
    if not host.isascii():
        return None
    parts = host.split(".")
    if len(parts) > 4:
        return None
    numbers = [_ipv4_number(p) for p in parts]
    if any(n is None for n in numbers):
        return None
    *head, last = numbers
    if any(n > 255 for n in head) or last >= 256 ** (5 - len(numbers)):
        return None
    value = last
    for i, n in enumerate(head):
        value += n << (8 * (3 - i))
    return ipaddress.IPv4Address(value)


def is_local_host(host: str | None) -> bool:
    """True for a loopback or unspecified host (see the module doc).

    ``host`` is a URL hostname in any case, IPv6 with or without
    brackets, with or without one trailing dot."""
    h = (host or "").strip().lower()
    if h.startswith("[") and h.endswith("]"):
        h = h[1:-1]
    if h.endswith("."):
        h = h[:-1]
    if not h:
        return False
    if h == "localhost" or h.endswith(".localhost"):
        return True
    try:
        ip: ipaddress.IPv4Address | ipaddress.IPv6Address | None = ipaddress.ip_address(h)
    except ValueError:
        ip = _whatwg_ipv4(h)
    if ip is None:
        return False
    if isinstance(ip, ipaddress.IPv6Address) and ip.ipv4_mapped is not None:
        ip = ip.ipv4_mapped
    return ip.is_loopback or ip.is_unspecified
