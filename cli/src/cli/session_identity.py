"""Automatic per-session identity for Claude Code (CHT-1499).

When a profile sets ``"session_identity": "auto"`` (or the environment
sets ``CHAOTIC_SESSION_IDENTITY=auto``) and ``CLAUDE_CODE_SESSION_ID`` is
set, the configured credential is treated as a *registrar*: it is used
only to register the session identity ``claude-code:session:<id>``
(``POST /agents/register``, CHT-1498) and every other request is sent
with that identity's own key. The CLI and ``chaotic mcp`` share this,
because both go through ``cli.client.Client``.

The rules:

1. The session key is cached at ``~/.chaotic/sessions/<sha256(ref)[:16]>.json``
   (0600, in a 0700 directory). A cache file that is a symlink, not
   ours, readable by anyone else, for another server or another
   registrar, or about to expire is not used.
2. Registering is serialised per session ref by an exclusive ``flock``
   on a sibling ``.lock`` file (and a thread lock inside one process,
   for the MCP server's worker threads). The server revokes an
   identity's other keys on every registration, so two processes of the
   same session registering at once would otherwise revoke each other's
   key in turn. Whoever takes the lock second re-reads the cache and
   uses what the first one saved.
3. A 401 for the session key re-registers once (``refresh``); a second
   401 is an error.
4. A failed registration is an error. The registrar credential is never
   used for anything but ``GET /auth/me`` and ``POST /agents/register``:
   nothing falls back to it (the server refuses a registrar's writes
   anyway, spec I8).

Off by default: without the setting, or without ``CLAUDE_CODE_SESSION_ID``,
nothing here runs and the configured credential is used as before.
"""
from __future__ import annotations

import fcntl
import hashlib
import json
import os
import secrets
import stat
import subprocess
import threading
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path

import httpx

from cli import config as _config

SESSION_ENV = "CLAUDE_CODE_SESSION_ID"
MODE_ENV = "CHAOTIC_SESSION_IDENTITY"
SETTING = "session_identity"
REF_PREFIX = "claude-code:session:"
MODES = ("auto", "off")
# A key this close to expiring is renewed before use rather than after a 401.
EXPIRY_MARGIN = timedelta(seconds=60)
# Server limits on AgentRegister (app.schemas.agent).
REF_MAX = 200
NAME_MAX = 255

NO_FALLBACK = "Not falling back to the registrar key."


class SessionIdentityError(Exception):
    """Session identity could not be set up. Carries the HTTP status and
    server detail when a server refusal caused it."""

    def __init__(self, message: str, status_code: int | None = None, detail=None):
        super().__init__(message)
        self.status_code = status_code
        self.detail = detail


# One thread lock per process: the stdio MCP server runs tool calls on
# worker threads that share this module. flock does not exclude threads
# of one process from each other when they open the lock file separately.
_thread_lock = threading.Lock()


def mode() -> str:
    """'auto' or 'off'. The environment overrides the profile, so a cloud
    environment can turn it on without writing a profile, and a person
    can turn it off for one command (`CHAOTIC_SESSION_IDENTITY=off
    chaotic auth whoami` shows the registrar). Only the global profile
    file is read, not a repository's `.chaotic`: which credential signs
    requests is a property of the machine's profile."""
    raw = os.environ.get(MODE_ENV)
    source = MODE_ENV
    if raw is None:
        raw = _config.load_global_config().get(SETTING)
        source = f"the profile's {SETTING!r}"
    if raw is None or raw == "":
        return "off"
    value = str(raw).strip().lower()
    if value not in MODES:
        raise SessionIdentityError(f"{source} must be 'auto' or 'off', not {raw!r}.")
    return value


_suspension = threading.local()


@contextmanager
def suspended():
    """Send the configured credential itself for the duration: for a
    command whose caller *is* the registrar (`agent register`)."""
    previous = getattr(_suspension, "on", False)
    _suspension.on = True
    try:
        yield
    finally:
        _suspension.on = previous


def set_mode(value: str) -> None:
    """Write the profile's setting ('auto' or 'off')."""
    if value not in MODES:
        raise SessionIdentityError(f"{SETTING} must be 'auto' or 'off', not {value!r}.")
    cfg = _config.load_global_config()
    if value == "off":
        cfg.pop(SETTING, None)
    else:
        cfg[SETTING] = value
    _config.save_global_config(cfg)


def active_ref() -> str | None:
    """The external_ref to act as, or None when session identity is off
    or this is not a Claude Code session."""
    if getattr(_suspension, "on", False):
        return None
    session_id = os.environ.get(SESSION_ENV)
    if not session_id:
        return None
    if mode() != "auto":
        return None
    ref = REF_PREFIX + session_id.strip()
    if len(ref) > REF_MAX or not all("!" <= c <= "~" for c in ref) or ref == REF_PREFIX:
        raise SessionIdentityError(
            f"{SESSION_ENV} is not a usable session id (printable ASCII, no spaces, "
            f"at most {REF_MAX - len(REF_PREFIX)} characters). {NO_FALLBACK}"
        )
    return ref


def missing_session_notice() -> str | None:
    """A warning for `chaotic mcp` to print (on stderr) when
    session_identity is auto but this process has no session id, so it
    will act with the configured key itself (a registrar's key can only
    read). None when there is nothing to say."""
    if os.environ.get(SESSION_ENV):
        return None
    try:
        if mode() != "auto":
            return None
    except SessionIdentityError as exc:
        return f"chaotic: {exc}"
    return (
        f"chaotic: session_identity is auto but {SESSION_ENV} is not set in this process, so "
        "requests use the configured key itself. A registrar's key can only read."
    )


def sessions_dir() -> Path:
    # Read at call time so a patched GLOBAL_CONFIG_DIR (tests) applies.
    return Path(_config.GLOBAL_CONFIG_DIR) / "sessions"


def cache_path(ref: str) -> Path:
    return sessions_dir() / f"{hashlib.sha256(ref.encode()).hexdigest()[:16]}.json"


def fingerprint(credential: str) -> str:
    """Which registrar credential a cached key came from, without storing
    the credential itself."""
    return hashlib.sha256(credential.encode()).hexdigest()[:16]


# -- the cache file ---------------------------------------------------------

def _ensure_dir() -> Path:
    d = sessions_dir()
    d.parent.mkdir(parents=True, exist_ok=True)
    try:
        d.mkdir(mode=0o700)
    except FileExistsError:
        pass
    st = os.lstat(d)
    if stat.S_ISLNK(st.st_mode) or not stat.S_ISDIR(st.st_mode):
        raise SessionIdentityError(f"{d} must be a directory, not a link or a file. {NO_FALLBACK}")
    if st.st_uid != os.getuid():
        raise SessionIdentityError(f"{d} is owned by another user. {NO_FALLBACK}")
    if st.st_mode & 0o077:
        os.chmod(d, 0o700)
    return d


def read_cache(path: Path) -> dict | None:
    """The cached record, or None when there is none or it must not be
    trusted (a symlink, another owner, readable by others, not JSON)."""
    try:
        fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW)
    except OSError:
        return None
    try:
        st = os.fstat(fd)
        if st.st_uid != os.getuid() or st.st_mode & 0o077:
            return None
        with os.fdopen(fd, "r") as f:
            fd = None
            data = json.load(f)
    except (OSError, ValueError):
        return None
    finally:
        if fd is not None:
            os.close(fd)
    return data if isinstance(data, dict) else None


def write_cache(path: Path, record: dict) -> None:
    """Atomically replace `path` with `record`, created 0600 (never a
    window with wider permissions, never following a planted link)."""
    tmp = path.with_name(f".{path.name}.{os.getpid()}.{secrets.token_hex(4)}.tmp")
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600)
    try:
        with os.fdopen(fd, "w") as f:
            json.dump(record, f, indent=2)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except BaseException:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


def _parse_time(value) -> datetime | None:
    if not isinstance(value, str):
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def usable(record: dict | None, ref: str, api_url: str, registrar_fp: str) -> bool:
    if not record or not isinstance(record.get("api_key"), str) or not record["api_key"]:
        return False
    if (record.get("external_ref"), record.get("api_url"), record.get("registrar")) != (ref, api_url, registrar_fp):
        return False
    expires = _parse_time(record.get("expires_at"))
    if record.get("expires_at") is not None and expires is None:
        return False
    return expires is None or expires - EXPIRY_MARGIN > datetime.now(timezone.utc)


@contextmanager
def _locked(path: Path):
    """This session's registration lock: the thread lock, then an
    exclusive flock on `<cache>.lock`."""
    with _thread_lock:
        lock_path = path.with_suffix(".lock")
        fd = os.open(lock_path, os.O_RDWR | os.O_CREAT | os.O_NOFOLLOW, 0o600)
        try:
            fcntl.flock(fd, fcntl.LOCK_EX)
            yield
        finally:
            os.close(fd)  # releases the flock


# -- registering ------------------------------------------------------------

def _server_error(response: httpx.Response) -> tuple[str, object]:
    try:
        detail = response.json().get("detail")
    except Exception:
        detail = None
    if isinstance(detail, dict):
        return detail.get("message") or str(detail), detail
    return (str(detail) if detail else f"HTTP {response.status_code}"), detail


def _registrar_call(method: str, url: str, credential: str, body: dict | None = None) -> dict:
    """One request with the registrar credential. Only this module makes
    them, and only to /auth/me and /agents/register."""
    headers = {"Authorization": f"Bearer {credential}", "Content-Type": "application/json",
               "X-Chaotic-Interactive": "0"}
    with httpx.Client() as client:
        response = client.request(method, url, headers=headers, json=body)
    if response.is_success:
        try:
            return response.json()
        except ValueError:
            raise SessionIdentityError(
                f"Session identity registration: the server returned a non-JSON body. {NO_FALLBACK}",
                status_code=response.status_code,
            )
    message, detail = _server_error(response)
    if response.status_code == 401:
        message = f"the configured key was rejected ({message}); check `chaotic auth set-key`"
    raise SessionIdentityError(
        f"Session identity registration failed: {message.rstrip('.')}. {NO_FALLBACK}",
        status_code=response.status_code, detail=detail,
    )


def _workspace_label() -> str:
    """The git branch, or the working directory's name outside a branch."""
    try:
        branch = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True, text=True, timeout=5,
        ).stdout.strip()
    except (OSError, subprocess.SubprocessError):
        branch = ""
    if branch and branch != "HEAD":
        return branch
    return Path.cwd().name or "session"


def default_name(registrar_name: str, ref: str) -> str:
    session_id = ref[len(REF_PREFIX):]
    name = f"{registrar_name} · {_workspace_label()} · {session_id[:6]}"
    return name[:NAME_MAX]


def _register(ref: str, credential: str, api_url: str, *, renew: bool) -> dict:
    """Register `ref` with the registrar `credential`. A first
    registration names the identity; a renewal sends no name, so the
    server keeps whatever it is called now."""
    me = _registrar_call("GET", f"{api_url}/auth/me", credential)
    body: dict = {"external_ref": ref}
    if me.get("is_agent"):
        if me.get("kind") == "session" or me.get("registered_by_id"):
            raise SessionIdentityError(
                f"The configured key is the session identity {me.get('name')!r}, not a registrar. "
                f"Set the registrar's key, or turn session_identity off. {NO_FALLBACK}"
            )
        if not me.get("can_register"):
            raise SessionIdentityError(
                f"The configured key's agent {me.get('name')!r} is not a registrar. Make it one with "
                f"`chaotic agent update {me.get('name')!r} --registrar` (its creator or a team admin), "
                f"or turn session_identity off. {NO_FALLBACK}"
            )
    else:
        # A person registers for themself, and must say in which team.
        team_id = _config.get_current_team()
        if not team_id:
            raise SessionIdentityError(
                f"session_identity is auto but no team is selected (`chaotic team use`). {NO_FALLBACK}"
            )
        body["team_id"] = team_id
    if not renew:
        body["name"] = default_name(me.get("name") or "Claude Code", ref)
    reg = _registrar_call("POST", f"{api_url}/agents/register", credential, body)
    agent = reg.get("agent") or {}
    if not reg.get("api_key"):
        raise SessionIdentityError(f"Session identity registration returned no key. {NO_FALLBACK}")
    return {
        "external_ref": ref,
        "api_url": api_url,
        "registrar": fingerprint(credential),
        "api_key": reg["api_key"],
        "api_key_id": reg.get("api_key_id"),
        "expires_at": reg.get("expires_at"),
        "agent_id": agent.get("id"),
        "agent_name": agent.get("name"),
        "registered_at": datetime.now(timezone.utc).isoformat(),
    }


def session_key(ref: str, credential: str | None, api_url: str, *, failed_key: str | None = None) -> str:
    """The key to send for this session. With `failed_key` (the key a 401
    just refused), a cached key equal to it is not used: another process
    may already have replaced it, otherwise this one registers again."""
    if not credential:
        raise SessionIdentityError(
            "session_identity is auto but no registrar key is configured "
            "(`chaotic auth set-key`, or CHAOTIC_API_KEY)."
        )
    path = cache_path(ref)
    fp = fingerprint(credential)

    def fresh(record):
        return usable(record, ref, api_url, fp) and record["api_key"] != failed_key

    record = read_cache(path)
    if fresh(record):
        return record["api_key"]
    try:
        _ensure_dir()
        with _locked(path):
            record_now = read_cache(path)
            if fresh(record_now):
                return record_now["api_key"]
            # A renewal keeps the identity's current name: renaming it on
            # every renewal would follow the branch around and undo renames.
            previous = record_now or record or {}
            renew = previous.get("external_ref") == ref and previous.get("api_url") == api_url
            new_record = _register(ref, credential, api_url, renew=renew)
            write_cache(path, new_record)
            return new_record["api_key"]
    except OSError as exc:
        raise SessionIdentityError(
            f"Session identity: cannot use the key cache {path} ({exc}). {NO_FALLBACK}"
        ) from exc


def cached_record(ref: str) -> dict | None:
    """The cache entry for `ref` without its key, for display."""
    record = read_cache(cache_path(ref))
    if not record:
        return None
    return {k: v for k, v in record.items() if k != "api_key"}
