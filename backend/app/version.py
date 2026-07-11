"""Deploy/build legibility (CHT-1294).

Root cause of the Sprint-84 "app feels the same after the megasprint"
confusion: there was no way to tell what commit/bundle was live without
downloading app.bundle.js and grepping the minified source, and the
``?v=NN`` cache-buster in templates/index.html was hand-incremented --
one forgotten bump silently served stale JS.

This module answers both: ``get_version_info`` reports the running git
sha + build time (surfaced at ``/api/version`` and in ``/health``), and
``asset_cache_buster`` derives each asset's ``?v=`` from a hash of its
actual bytes, so the browser cache busts exactly when (and only when)
the content changes -- no manual counter to forget.

Everything here is fail-soft: a missing git, a non-checkout deploy, or
an unreadable asset degrades to ``"unknown"``/``"missing"`` rather than
crashing the page or the endpoint.
"""
from __future__ import annotations

import functools
import hashlib
import os
import subprocess
from datetime import datetime, timezone

# Process start time -- the closest honest proxy for "when this build went
# live", since every deploy restarts the server (see the systemd unit in
# reference docs). Captured once, at import.
_START_TIME = datetime.now(timezone.utc).isoformat()


def _git(repo_root: str, *args: str) -> str | None:
    """Run a git command in ``repo_root``, returning stripped stdout or
    None on any failure (git absent, not a checkout, timeout, non-zero).
    Never raises -- deploy legibility must not be able to break a request.
    """
    try:
        out = subprocess.run(
            ["git", "-C", repo_root, *args],
            capture_output=True,
            text=True,
            timeout=5,
            check=True,
        )
    except Exception:
        return None
    return out.stdout.strip() or None


@functools.lru_cache(maxsize=8)
def asset_cache_buster(path: str) -> str:
    """First 8 hex chars of the file's sha256, or ``"missing"`` if it
    can't be read. Cached per path: an asset's bytes don't change within
    a running process (a deploy is a restart), so this is computed once.
    """
    try:
        with open(path, "rb") as f:
            return hashlib.sha256(f.read()).hexdigest()[:8]
    except OSError:
        return "missing"


@functools.lru_cache(maxsize=4)
def get_version_info(repo_root: str, frontend_dir: str) -> dict:
    """Assemble the deploy-legibility payload for ``repo_root`` /
    ``frontend_dir``. Cached on the paths: the git sha and asset hashes
    are constant for the life of the process, so this runs its git
    subprocesses once (on first request) and reuses the result.
    """
    static = os.path.join(frontend_dir, "static")
    return {
        "git_sha": _git(repo_root, "rev-parse", "HEAD") or "unknown",
        "git_sha_short": _git(repo_root, "rev-parse", "--short", "HEAD") or "unknown",
        "git_commit_time": _git(repo_root, "show", "-s", "--format=%cI", "HEAD") or "unknown",
        # True only when the working tree has uncommitted changes -- a
        # loud signal that a prod checkout was hand-edited off a clean sha.
        "git_dirty": bool(_git(repo_root, "status", "--porcelain")),
        "start_time": _START_TIME,
        "bundle_hash": asset_cache_buster(os.path.join(static, "js", "app.bundle.js")),
        "css_hash": asset_cache_buster(os.path.join(static, "css", "style.css")),
    }
