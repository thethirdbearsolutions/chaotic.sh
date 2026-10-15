"""Per-source-address limits for the unauthenticated OAuth endpoints
(CHT-1518 review S3/S4, CHT-1572).

``address_bucket`` is what a "source address" is: an IPv4 address, or
the /64 an IPv6 address is in (one host routinely holds a whole /64, so
per-address IPv6 limits are no limit). An IPv4-mapped IPv6 address is
its IPv4 address.

``SlidingWindowLimiter`` is an in-process, in-memory limiter for events
that leave nothing in the database to count (a CIMD fetch of a URL that
fails, an /oauth/authorize request). It is per process: a server run as
several workers allows each worker its own budget, which is still a
bound. It tracks at most ``max_keys`` addresses, forgetting the least
recently seen one past that, so the limiter itself can't be grown
without bound by an attacker rotating addresses; the global caps in the
database are what bound that attacker.
"""
from __future__ import annotations

import ipaddress
import time
from collections import OrderedDict, deque


def address_bucket(ip: str) -> str:
    """The rate-limit key for a source address (see module docstring)."""
    try:
        parsed = ipaddress.ip_address(ip.split("%", 1)[0])
    except ValueError:
        return ip
    if isinstance(parsed, ipaddress.IPv6Address):
        if parsed.ipv4_mapped is not None:
            return str(parsed.ipv4_mapped)
        return str(ipaddress.IPv6Network((parsed, 64), strict=False))
    return str(parsed)


class SlidingWindowLimiter:
    def __init__(self, window_seconds: float, *, max_keys: int = 10_000):
        self.window_seconds = window_seconds
        self.max_keys = max_keys
        self._hits: OrderedDict[str, deque[float]] = OrderedDict()

    def allow(self, key: str, limit: int, *, now: float | None = None) -> bool:
        """Record an event for ``key`` and say whether it is within
        ``limit`` events per window. A refused event is not recorded, so
        a client that backs off gets back in when the window slides."""
        now = time.monotonic() if now is None else now
        hits = self._hits.get(key)
        if hits is None:
            hits = self._hits[key] = deque()
            while len(self._hits) > self.max_keys:
                self._hits.popitem(last=False)
        else:
            self._hits.move_to_end(key)
        cutoff = now - self.window_seconds
        while hits and hits[0] <= cutoff:
            hits.popleft()
        if len(hits) >= limit:
            return False
        hits.append(now)
        return True

    def clear(self) -> None:
        self._hits.clear()


# Shared by the service and the endpoints; tests clear them.
cimd_fetches = SlidingWindowLimiter(3600)
authorize_requests = SlidingWindowLimiter(60)
# The unauthenticated invitation preview behind /invite/<token> (CHT-1265).
invitation_lookups = SlidingWindowLimiter(60)
