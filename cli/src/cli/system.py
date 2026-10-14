"""System commands for self-hosted server management.

The system commands manage the lifecycle of a local Chaotic server installation:
install, status, start, stop, reconfigure, config, logs, upgrade, backup.

There is no standalone `migrate` command -- migrations run automatically
inside install/upgrade -- and no `uninstall` command.

These commands orchestrate existing tools (git, systemd/launchd, just, uv)
rather than bundling the server.
"""
import difflib
import html
import json
import os
import platform
import plistlib
import re
import secrets
import shlex
import shutil
import sqlite3
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Literal

import click
from rich.console import Console
from rich.markup import escape

from .config import GLOBAL_CONFIG_DIR, DEFAULT_PORT, set_api_url
from . import server_settings
from .server_settings import SETTINGS_KEY, stored_settings


def _confirm_action(prompt: str, **kwargs) -> bool:
    """Prompt for confirmation, auto-accepting if --yes flag is set (CHT-436)."""
    ctx = click.get_current_context(silent=True)
    if ctx and ctx.obj and ctx.obj.get('yes'):
        return True
    return click.confirm(prompt, **kwargs)


def validate_repo_url(url: str) -> bool:
    """Validate git repository URL to prevent command injection."""
    # Allow https:// and git@ URLs, reject anything suspicious
    if re.match(r'^https://[\w\-\.]+/[\w\-\./]+$', url):
        return True
    if re.match(r'^git@[\w\-\.]+:[\w\-\./]+$', url):
        return True
    return False


def validate_git_ref(ref: str) -> bool:
    """Validate git ref (tag/branch) to prevent option injection."""
    # Git refs can contain alphanumeric, dash, underscore, dot, slash
    # Must not start with dash (to prevent option injection)
    if ref.startswith('-'):
        return False
    if re.match(r'^[\w\-\./]+$', ref):
        return True
    return False


def validate_port(port: int) -> bool:
    """Validate port number."""
    return 1024 <= port <= 65535


def validate_host(host: str) -> bool:
    """Validate host/IP address to prevent injection in service files."""
    # Allow IPv4, IPv6, and valid hostnames (no whitespace, no control chars)
    if not host or len(host) > 255:
        return False
    if re.match(r'^[\w\.\-\:]+$', host):
        return True
    return False

console = Console()


def _display_host(host: str) -> str:
    """Return a user-friendly hostname for display."""
    if host in ("0.0.0.0", "127.0.0.1"):
        return "localhost"
    return host

# File locations
SERVER_DIR = GLOBAL_CONFIG_DIR / "server"  # Git clone location
PROJECT_DIR = SERVER_DIR  # Project root is the repo root
DATA_DIR = GLOBAL_CONFIG_DIR / "data"
LOGS_DIR = GLOBAL_CONFIG_DIR / "logs"
SERVER_JSON = GLOBAL_CONFIG_DIR / "server.json"
DATABASE_PATH = DATA_DIR / "chaotic.db"

# Service names
SYSTEMD_SERVICE = "chaotic.service"
LAUNCHD_LABEL = "com.chaotic.server"

# Shutdown budget, end to end (CHT-1474). Each layer must give the one inside
# it room to finish, or the outer one gives up while the inner one is still
# (correctly) waiting:
#   uvicorn --timeout-graceful-shutdown (justfile serve-prod)  10s
#   < systemd TimeoutStopSec / launchd ExitTimeOut (the units we write)  30s
#   < systemd's default TimeoutStopSec, which units written before this
#     change still have until an upgrade rewrites them (CHT-1476; the
#     upgrade's own first stop still runs under the old unit)  90s
#   < how long the CLI waits for `systemctl stop` / `launchctl unload`  120s
# The CLI used to wait 60s against a 90s unit while uvicorn waited forever on
# /mcp streams, so it raised TimeoutExpired mid-stop and left prod down.
UVICORN_GRACEFUL_SHUTDOWN_SEC = 10
SYSTEMD_TIMEOUT_STOP_SEC = 30
SYSTEMD_DEFAULT_TIMEOUT_STOP_SEC = 90
SERVICE_STOP_TIMEOUT = SYSTEMD_DEFAULT_TIMEOUT_STOP_SEC + 30

# Backup settings
MAX_BACKUPS = 5  # Keep last N backups


def get_os() -> Literal["linux", "darwin", "unsupported"]:
    """Detect the operating system."""
    system = platform.system().lower()
    if system == "linux":
        return "linux"
    elif system == "darwin":
        return "darwin"
    else:
        return "unsupported"


def check_prerequisite(cmd: str) -> bool:
    """Check if a command is available in PATH."""
    return shutil.which(cmd) is not None


def check_all_prerequisites() -> dict[str, bool]:
    """Check all required prerequisites."""
    return {
        "git": check_prerequisite("git"),
        "uv": check_prerequisite("uv"),
        "just": check_prerequisite("just"),
    }


def print_prerequisites_status(prereqs: dict[str, bool]) -> bool:
    """Print prerequisite status and return True if all are met."""
    console.print("Checking prerequisites...")
    all_ok = True
    for cmd, ok in prereqs.items():
        if ok:
            console.print(f"  {cmd}: [green]OK[/green]")
        else:
            console.print(f"  {cmd}: [red]MISSING[/red]")
            all_ok = False
    return all_ok


def print_prerequisite_install_hints(prereqs: dict[str, bool]):
    """Print installation hints for missing prerequisites."""
    console.print("\n[bold]Install missing prerequisites:[/bold]")
    if not prereqs.get("git"):
        console.print("  git: https://git-scm.com/downloads")
    if not prereqs.get("uv"):
        console.print("  uv: curl -LsSf https://astral.sh/uv/install.sh | sh")
    if not prereqs.get("just"):
        console.print("  just: cargo install just")
        console.print("        or see https://github.com/casey/just#installation")


def run_command(
    cmd: list[str],
    cwd: Path | None = None,
    capture: bool = True,
    check: bool = True,
    timeout: int = 60,
    env: dict | None = None,
) -> subprocess.CompletedProcess:
    """Run a shell command with optional output capture.

    Args:
        cmd: Command to run as list of strings
        cwd: Working directory
        capture: Whether to capture stdout/stderr
        check: Whether to raise on non-zero exit
        timeout: Maximum seconds to wait (default 60, None for no timeout)
        env: Optional environment overrides (defaults to parent env)

    Raises:
        subprocess.TimeoutExpired: If command exceeds timeout
    """
    return subprocess.run(
        cmd,
        cwd=cwd,
        capture_output=capture,
        text=True,
        check=check,
        timeout=timeout,
        env=env,
    )


def load_server_json() -> dict:
    """Load server metadata from server.json."""
    if SERVER_JSON.exists():
        try:
            with open(SERVER_JSON) as f:
                return json.load(f)
        except json.JSONDecodeError:
            return {}
    return {}


def save_server_json(data: dict):
    """Save server metadata to server.json: atomically and 0600 from the
    moment it exists, since it holds SECRET_KEY and a crash mid-write
    must not leave a truncated file (PR #349 review)."""
    GLOBAL_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    _write_private_file(SERVER_JSON, json.dumps(data, indent=2))


def generate_secret_key() -> str:
    """Generate a secure random secret key."""
    return secrets.token_hex(32)


def ensure_secret_key() -> str:
    """Ensure a secret key exists in server.json, generating one if needed."""
    config = load_server_json()
    if "secret_key" not in config or not config["secret_key"]:
        config["secret_key"] = generate_secret_key()
        save_server_json(config)
    return config["secret_key"]


def is_server_installed() -> bool:
    """Check if the server is installed."""
    return PROJECT_DIR.exists() and (PROJECT_DIR / "justfile").exists()


def get_systemd_user_dir() -> Path:
    """Get the systemd user service directory."""
    return Path.home() / ".config" / "systemd" / "user"


def get_launchd_agents_dir() -> Path:
    """Get the launchd LaunchAgents directory."""
    return Path.home() / "Library" / "LaunchAgents"


def get_service_file_path() -> Path:
    """Get the path to the service file for the current OS."""
    os_type = get_os()
    if os_type == "linux":
        return get_systemd_user_dir() / SYSTEMD_SERVICE
    elif os_type == "darwin":
        return get_launchd_agents_dir() / f"{LAUNCHD_LABEL}.plist"
    else:
        raise RuntimeError(f"Unsupported OS: {os_type}")


def _setting_items(settings: dict[str, str] | None) -> list[tuple[str, str]]:
    """The operator's settings (server.json "settings", CHT-1592) in the
    order every service file lists them. Only names and values that
    stored_settings() accepts get here, so none needs quoting."""
    return sorted(stored_settings({SETTINGS_KEY: settings or {}}).items())


def generate_systemd_service(port: int, secret_key: str, host: str = "127.0.0.1",
                             settings: dict[str, str] | None = None) -> str:
    """Generate systemd user service file content.

    Paths are quoted to handle spaces and special characters safely.
    systemd uses a minimal PATH, so we explicitly include common tool paths.
    `settings` (server.json's "settings") follow as one Environment= line
    each; with none, the unit is exactly what it was before CHT-1592.
    """
    setting_lines = "".join(f"Environment={name}={value}\n" for name, value in _setting_items(settings))
    home = Path.home()
    # Quote paths for systemd (handles spaces and special chars)
    project_dir = shlex.quote(str(PROJECT_DIR))
    database_path = shlex.quote(str(DATABASE_PATH))
    database_url = shlex.quote(f"sqlite+aiosqlite:///{DATABASE_PATH}")

    # Common paths where just/uv might be installed
    extra_paths = f"{home}/.local/bin:{home}/.cargo/bin:/usr/local/bin"

    return f"""[Unit]
Description=Chaotic Server
After=network.target

[Service]
Type=simple
WorkingDirectory={project_dir}
ExecStart=/usr/bin/env just serve-prod
Restart=on-failure
RestartSec=5
TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}
Environment=PATH={extra_paths}:/usr/bin:/bin
Environment=DATABASE_URL={database_url}
Environment=DATABASE_PATH={database_path}
Environment=HOST={host}
Environment=PORT={port}
Environment=SECRET_KEY={secret_key}
{setting_lines}
[Install]
WantedBy=default.target
"""


def generate_launchd_plist(port: int, secret_key: str, host: str = "127.0.0.1",
                           settings: dict[str, str] | None = None) -> str:
    """Generate launchd plist file content.

    Note: launchd doesn't expand ~ in paths, so we use absolute paths.
    We also need to set PATH explicitly since launchd has a minimal environment.
    Paths are XML-escaped to handle special characters safely.
    """
    home = Path.home()
    # Common paths where just/uv might be installed
    path_dirs = [
        "/opt/homebrew/bin",  # Homebrew on Apple Silicon
        "/usr/local/bin",     # Homebrew on Intel, manual installs
        f"{home}/.cargo/bin", # Cargo (just installed via cargo)
        f"{home}/.local/bin", # uv, pipx, etc.
        "/usr/bin",
        "/bin",
    ]
    path_value = html.escape(":".join(path_dirs))

    # Escape paths for XML (handles &, <, >, etc.)
    project_dir = html.escape(str(PROJECT_DIR))
    database_path = html.escape(str(DATABASE_PATH))
    logs_dir = html.escape(str(LOGS_DIR))
    # Escape secret key for XML in case it contains special chars
    secret_key_escaped = html.escape(secret_key)
    setting_entries = "".join(
        f"        <key>{html.escape(name)}</key>\n        <string>{html.escape(value)}</string>\n"
        for name, value in _setting_items(settings))

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>{LAUNCHD_LABEL}</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/env</string>
        <string>just</string>
        <string>serve-prod</string>
    </array>
    <key>WorkingDirectory</key>
    <string>{project_dir}</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>ExitTimeOut</key>
    <integer>{SYSTEMD_TIMEOUT_STOP_SEC}</integer>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>{path_value}</string>
        <key>DATABASE_URL</key>
        <string>sqlite+aiosqlite:///{database_path}</string>
        <key>DATABASE_PATH</key>
        <string>{database_path}</string>
        <key>HOST</key>
        <string>{html.escape(host)}</string>
        <key>PORT</key>
        <string>{port}</string>
        <key>SECRET_KEY</key>
        <string>{secret_key_escaped}</string>
{setting_entries}    </dict>
    <key>StandardOutPath</key>
    <string>{logs_dir}/server.log</string>
    <key>StandardErrorPath</key>
    <string>{logs_dir}/server.log</string>
</dict>
</plist>
"""


def write_service_file(port: int, secret_key: str, host: str = "127.0.0.1",
                       settings: dict[str, str] | None = None):
    """Write the appropriate service file for the current OS, with the
    operator's `settings` (server.json "settings"; pass them, or a
    rewrite drops them)."""
    os_type = get_os()
    service_path = get_service_file_path()
    service_path.parent.mkdir(parents=True, exist_ok=True)

    if os_type == "linux":
        content = generate_systemd_service(port, secret_key, host, settings)
    elif os_type == "darwin":
        content = generate_launchd_plist(port, secret_key, host, settings)
    else:
        raise RuntimeError(f"Unsupported OS: {os_type}")

    # Atomic and 0600 throughout (service files contain SECRET_KEY): a
    # failed write leaves the previous file, never a truncated one.
    _write_private_file(service_path, content)

    return service_path


# `system upgrade` regenerates the service file (CHT-1476) so fixes to the
# generated unit (e.g. TimeoutStopSec) reach existing installs. It only ever
# ADDS to what the file on disk says: it rewrites when every setting the
# current file makes survives unchanged in the regenerated one, and
# otherwise leaves the file alone and says which settings (by name, never
# value) are in the way. Previous files are kept outside the service
# manager's directories, newest SERVICE_BACKUPS_KEPT per file.
SERVICE_BACKUP_DIR = GLOBAL_CONFIG_DIR / "service-backups"
SERVICE_BACKUPS_KEPT = 5

_JUSTFILE_DEFAULT_HOST = "127.0.0.1"  # serve-prod: --host ${HOST:-127.0.0.1}
# Settings that say WHICH server the file runs and as whom. A different
# SECRET_KEY logs every session out, a different HOST/PORT moves the
# server, a different directory points it at another install.
_IDENTITY_ENV_KEYS = ("SECRET_KEY", "HOST", "PORT", "DATABASE_PATH", "DATABASE_URL")
_SERVICE_IDENTITY_KEYS = ("WorkingDirectory", *_IDENTITY_ENV_KEYS)


class _ParsedService:
    """What a service file sets: its directives other than Environment
    (as {(section, key): [values in order]}), the environment the service
    manager would apply (last assignment wins), and anything that makes
    the file unsafe to rewrite from here."""

    def __init__(self):
        self.directives: dict[tuple[str, str], list] = {}
        self.env: dict[str, str] = {}
        self.env_counts: dict[str, int] = {}
        self.quoted_env: set[str] = set()
        self.comments: list[str] = []
        self.unsafe: list[str] = []

    def workdirs(self) -> list:
        return self.directives.get(("Service", "WorkingDirectory")) or self.directives.get(("", "WorkingDirectory")) or []

    def identity(self) -> dict[str, str]:
        found = {k: self.env[k] for k in _IDENTITY_ENV_KEYS if k in self.env}
        workdirs = self.workdirs()
        if workdirs and isinstance(workdirs[-1], str):
            found["WorkingDirectory"] = workdirs[-1]
        return found


def _split_environment(value: str) -> list[tuple[str, str]] | None:
    """An Environment= value as systemd reads it: whitespace-separated
    KEY=VALUE words, each optionally quoted. None if it cannot be read."""
    try:
        words = shlex.split(value)
    except ValueError:
        return None
    pairs = []
    for word in words:
        key, sep, val = word.partition("=")
        if not sep or not key:
            return None
        pairs.append((key, val))
    return pairs


def _parse_systemd_unit(content: str) -> _ParsedService | None:
    unit = _ParsedService()
    section = ""
    for raw in content.replace("\r\n", "\n").split("\n"):
        line = raw.strip()
        if not line:
            continue
        if line[0] in "#;":
            unit.comments.append(line)
            continue
        if line.endswith("\\"):
            return None  # line continuation: not worth guessing at
        if line.startswith("[") and line.endswith("]"):
            section = line[1:-1]
            continue
        key, sep, value = line.partition("=")
        key, value = key.strip(), value.strip()
        if not sep or not key:
            return None
        if key == "EnvironmentFile":
            unit.unsafe.append("it sets EnvironmentFile, which this CLI cannot see into")
        if key != "Environment":
            unit.directives.setdefault((section, key), []).append(value)
            continue
        if not value:
            unit.unsafe.append("it has an empty Environment= (which resets the environment)")
            continue
        pairs = _split_environment(value)
        if pairs is None:
            return None
        quoted = any(c in value for c in "\"'\\")
        for var, val in pairs:
            unit.env[var] = val  # systemd: a later assignment wins
            unit.env_counts[var] = unit.env_counts.get(var, 0) + 1
            if quoted:
                unit.quoted_env.add(var)
    return unit


def _parse_launchd_plist(content: str) -> _ParsedService | None:
    try:
        data = plistlib.loads(content.encode())
    except Exception:  # plistlib raises several types on bad input
        return None
    if not isinstance(data, dict):
        return None
    unit = _ParsedService()
    # plistlib drops XML comments; record that there were some.
    unit.comments.extend(m.group(0) for m in re.finditer(r"<!--.*?-->", content, re.DOTALL))
    if "<!--" in content and not unit.comments:
        return None  # unterminated comment
    for key, value in data.items():
        if key != "EnvironmentVariables":
            unit.directives[("", key)] = [value]
            continue
        if not isinstance(value, dict) or not all(isinstance(v, str) for v in value.values()):
            return None
        unit.env.update(value)
        unit.env_counts.update({k: 1 for k in value})
    return unit


def _parse_service(content: str, os_type: str) -> _ParsedService | None:
    if os_type == "linux":
        return _parse_systemd_unit(content)
    if os_type == "darwin":
        return _parse_launchd_plist(content)
    return None


def _rewrite_blockers(have: _ParsedService, want: _ParsedService,
                      owned: frozenset[str] = frozenset(),
                      identity_owned: frozenset[str] = frozenset()) -> list[str]:
    """Why the file on disk must not be replaced by the regenerated one,
    naming settings but never their values. Empty means the rewrite only
    adds settings and changes none the file already makes, other than
    the environment variables in `owned`: the ones `system config` was
    just told to set or unset, which it may change or drop. Likewise
    `identity_owned` names the identity keys (HOST, PORT) that
    `system reconfigure` was told to change (CHT-1676)."""
    reasons = list(have.unsafe)
    # A comment may hold anything (an old secret, a note the owner needs),
    # and the regenerated file has none: never drop one.
    if any(c not in want.comments for c in have.comments):
        reasons.append("the rewrite would drop comments")
    risky = sorted(k for k in _IDENTITY_ENV_KEYS
                   if have.env_counts.get(k, 0) > 1 or k in have.quoted_env)
    if len(have.workdirs()) > 1:
        risky.append("WorkingDirectory")
    if risky:
        reasons.append(f"it sets {', '.join(risky)} more than once or quoted")
    have_id, want_id = have.identity(), want.identity()
    # Units written before CHT-761 set no HOST: the server bound to the
    # justfile's ${HOST:-127.0.0.1}, so writing that value changes nothing.
    have_id.setdefault("HOST", _JUSTFILE_DEFAULT_HOST)
    differing = [k for k in _SERVICE_IDENTITY_KEYS
                 if k not in identity_owned and have_id.get(k) != want_id.get(k)]
    if differing:
        reasons.append(f"it disagrees with server.json about {', '.join(differing)}")
    changed = {key for (section, key), values in have.directives.items()
               if key not in _SERVICE_IDENTITY_KEYS and want.directives.get((section, key)) != values}
    changed |= {f"Environment {var}" for var, value in have.env.items()
                if var not in _SERVICE_IDENTITY_KEYS and var not in owned and want.env.get(var) != value}
    if changed:
        reasons.append(f"the rewrite would drop or change {', '.join(sorted(changed))}")
    return reasons


def _write_private_file(path: Path, content: str) -> None:
    """Atomically replace `path` with `content`, mode 0600 from the moment
    it exists (service files hold SECRET_KEY)."""
    tmp = path.with_name(f".{path.name}.tmp")
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    try:
        with os.fdopen(fd, "w") as f:
            f.write(content)
        os.chmod(tmp, 0o600)  # O_CREAT's mode does not apply to an existing tmp
        os.replace(tmp, path)
    except BaseException:
        tmp.unlink(missing_ok=True)
        raise


def _backup_service_file(path: Path, content: str) -> Path:
    """Keep `content` as SERVICE_BACKUP_DIR/<name>.<timestamp>.bak (0600,
    directory 0700), pruning all but the newest SERVICE_BACKUPS_KEPT."""
    SERVICE_BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    os.chmod(SERVICE_BACKUP_DIR, 0o700)
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
    backup = SERVICE_BACKUP_DIR / f"{path.name}.{stamp}.bak"
    _write_private_file(backup, content)
    for old in sorted(SERVICE_BACKUP_DIR.glob(f"{path.name}.*.bak"))[:-SERVICE_BACKUPS_KEPT]:
        if old != backup:
            try:
                old.unlink()
            except OSError:
                pass  # pruning is best effort
    return backup


_PLIST_STRING = re.compile(r"(<string>).*?(</string>)")


def _redact_service_text(content: str, os_type: str, secret_key: str) -> list[str]:
    """The file's lines with every environment value replaced, so a diff of
    them can go to a terminal or a deploy log."""
    out = []
    in_env = in_comment = False
    for line in content.splitlines():
        stripped = line.strip()
        indent = line[: len(line) - len(line.lstrip())]
        if os_type == "linux" and stripped[:1] in ("#", ";"):
            line = f"{indent}# <comment redacted>"
        elif os_type == "darwin" and (in_comment or "<!--" in stripped):
            in_comment = "-->" not in stripped.split("<!--")[-1]
            line = f"{indent}<!-- <comment redacted> -->"
        elif os_type == "linux" and stripped.startswith("Environment="):
            pairs = _split_environment(stripped.partition("=")[2])
            names = " ".join(f"{k}=<redacted>" for k, _ in pairs) if pairs else "<redacted>"
            line = f"{indent}Environment={names}"
        elif os_type == "darwin":
            if stripped == "<key>EnvironmentVariables</key>":
                in_env = True
            elif in_env and stripped == "</dict>":
                in_env = False
            elif in_env:
                line = _PLIST_STRING.sub(r"\1<redacted>\2", line)
        if secret_key:
            line = line.replace(secret_key, "<redacted>")
        out.append(line)
    return out


def _redacted_diff(old: str, new: str, path: Path, os_type: str, secret_key: str) -> list[str]:
    return list(difflib.unified_diff(
        _redact_service_text(old, os_type, secret_key), _redact_service_text(new, os_type, secret_key),
        fromfile=f"{path} (before)", tofile=f"{path} (after)", lineterm="", n=1,
    ))


class ServiceFileUpdate:
    """What reconcile_service_file() did. `status` is "updated",
    "unchanged" or "skipped"; `backup` is set only when it wrote."""

    def __init__(self, status: str, path: Path | None = None, backup: Path | None = None,
                 diff: list[str] | None = None, reason: str = ""):
        self.status = status
        self.path = path
        self.backup = backup
        self.diff = diff or []
        self.reason = reason


def _daemon_reload() -> bool:
    try:
        run_command(["systemctl", "--user", "daemon-reload"], timeout=30)
        return True
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError):
        return False


def reconcile_service_file(port: int, host: str, secret_key: str,
                           settings: dict[str, str] | None = None,
                           owned: frozenset[str] = frozenset()) -> ServiceFileUpdate:
    """Bring an existing service file up to what this CLI generates
    (CHT-1476), so a fix to the generated unit (e.g. TimeoutStopSec)
    reaches installs made before it. Only `system install` and
    `system reconfigure` used to write the file.

    Regenerates from server.json's port/host/secret exactly as install
    does, and writes only when the content differs AND the rewrite would
    keep every setting the current file makes (see _rewrite_blockers).
    The previous file is kept in SERVICE_BACKUP_DIR; on Linux it then runs
    `systemctl --user daemon-reload`. Never raises. Anything it cannot
    vouch for (no secret in server.json, no file, a symlink, an
    unreadable or unparseable file, a blocker) is "skipped" with the
    reason. Server settings belong in server.json (`chaotic system
    config set`, CHT-1592), which `settings` carries into the file;
    anything else in a systemd drop-in (chaotic.service.d/), which is
    never touched and keeps the file rewritable. `owned` names the
    settings the caller is changing on purpose (see _rewrite_blockers).
    """
    os_type = get_os()
    if os_type not in ("linux", "darwin"):
        return ServiceFileUpdate("skipped", reason=f"unsupported OS ({os_type})")
    if not secret_key:
        return ServiceFileUpdate(
            "skipped", reason="server.json has no secret_key, and inventing one would log everyone out")
    path = get_service_file_path()
    if path.is_symlink():
        # install writes through a link; an atomic replace would turn it
        # into a regular file and strand the real target. Leave it alone.
        return ServiceFileUpdate("skipped", path, reason=f"{path} is a symlink")
    try:
        current = path.read_bytes().decode()  # as on disk: a CRLF file is backed up as CRLF
    except FileNotFoundError:
        return ServiceFileUpdate("skipped", path, reason=f"no service file at {path}")
    except (OSError, UnicodeDecodeError) as e:
        return ServiceFileUpdate("skipped", path, reason=f"could not read {path}: {e}")

    try:
        if os_type == "linux":
            desired = generate_systemd_service(port, secret_key, host, settings)
        else:
            desired = generate_launchd_plist(port, secret_key, host, settings)
    except Exception as e:  # noqa: BLE001 -- "never raises": upgrade must reach start_service
        return ServiceFileUpdate("skipped", path, reason=f"could not generate it ({type(e).__name__})")
    if current == desired:
        return ServiceFileUpdate("unchanged", path)

    have = _parse_service(current, os_type)
    want = _parse_service(desired, os_type)
    if have is None or want is None:
        return ServiceFileUpdate("skipped", path, reason=f"could not parse {path}")
    blockers = _rewrite_blockers(have, want, owned)
    if blockers:
        return ServiceFileUpdate("skipped", path, reason=f"{path}: {'; '.join(blockers)}")

    try:
        backup = _backup_service_file(path, current)
        _write_private_file(path, desired)
    except OSError as e:
        return ServiceFileUpdate("skipped", path, reason=f"could not write {path}: {e}")
    except ValueError as e:  # UnicodeEncodeError: name the kind, never the text
        return ServiceFileUpdate("skipped", path, reason=f"could not write {path} ({type(e).__name__})")
    if os_type == "linux" and not _daemon_reload():
        # Not fatal: start_service() runs daemon-reload again before
        # starting, and fails loudly (with a rollback) if it cannot.
        console.print("[yellow]  systemctl --user daemon-reload failed; it is retried at start.[/yellow]")
    return ServiceFileUpdate("updated", path, backup, _redacted_diff(current, desired, path, os_type, secret_key))


def restore_service_file(update: ServiceFileUpdate) -> bool:
    """Undo an "updated" reconcile from this run's backup, byte for byte
    (used by rollback, so a rolled-back server starts under the unit it
    ran with before). Returns True if there was nothing to undo or the
    undo worked."""
    if update.status != "updated" or update.path is None or update.backup is None:
        return True
    try:
        _write_private_file(update.path, update.backup.read_bytes().decode())
    except (OSError, UnicodeDecodeError):
        return False
    if get_os() == "linux":
        _daemon_reload()
    return True


def start_service() -> bool:
    """Start the server service. Returns True on success, False on any
    failure (never raises: a traceback here would hide whether the server
    is up, CHT-1474)."""
    os_type = get_os()
    try:
        if os_type == "linux":
            # Enable lingering so user services survive SSH logout
            run_command(["loginctl", "enable-linger", os.environ.get("USER", "")], check=False)
            run_command(["systemctl", "--user", "daemon-reload"])
            run_command(["systemctl", "--user", "enable", SYSTEMD_SERVICE])
            # A start queued behind an unfinished stop waits for that stop,
            # so give it the same budget as a stop.
            run_command(["systemctl", "--user", "start", SYSTEMD_SERVICE], timeout=SERVICE_STOP_TIMEOUT)
        elif os_type == "darwin":
            plist_path = get_service_file_path()
            # Unload first in case it's already loaded (ignore errors)
            run_command(["launchctl", "unload", str(plist_path)], check=False, timeout=SERVICE_STOP_TIMEOUT)
            run_command(["launchctl", "load", str(plist_path)])
        else:
            return False
        return True
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError):
        return False


def stop_service() -> bool:
    """Stop the server service. Returns True on success, False on any
    failure, including the CLI's own wait running out (CHT-1474); it never
    raises. A False does not say whether the server is up: the stop may be
    half done. Callers report that with _handle_failed_stop().

    A stop that systemd ends with SIGKILL at TimeoutStopSec leaves the unit
    "failed", and the stop job still finishes as done, so systemctl exits 0
    (systemd src/core/unit.c, unit_process_job: JOB_STOP finishes JOB_DONE
    on UNIT_IS_INACTIVE_OR_FAILED). Should some systemd exit non-zero
    anyway, a unit that settled to inactive or failed is stopped all the
    same, and is reported as such."""
    os_type = get_os()
    try:
        if os_type == "linux":
            run_command(["systemctl", "--user", "stop", SYSTEMD_SERVICE], timeout=SERVICE_STOP_TIMEOUT)
        elif os_type == "darwin":
            plist_path = get_service_file_path()
            run_command(["launchctl", "unload", str(plist_path)], timeout=SERVICE_STOP_TIMEOUT)
        else:
            return False
        return True
    except subprocess.CalledProcessError:
        return os_type == "linux" and wait_for_service_settled() in _STOPPED_STATES
    except (subprocess.TimeoutExpired, OSError):
        return False


# systemd states a unit passes through on its way somewhere else.
_TRANSITIONAL_STATES = frozenset({"activating", "deactivating", "reloading", "refreshing"})
# States in which no process of the unit is running.
_STOPPED_STATES = frozenset({"inactive", "failed"})


def service_state() -> str:
    """The service's state as systemd names it ("active", "inactive",
    "deactivating", ...). On macOS, which reports no transitional states,
    "active" or "inactive". "unknown" if it cannot be read."""
    if get_os() != "linux":
        return "active" if is_service_running() else "inactive"
    try:
        result = run_command(["systemctl", "--user", "is-active", SYSTEMD_SERVICE], check=False, timeout=5)
    except (subprocess.TimeoutExpired, OSError):
        return "unknown"
    return (result.stdout or "").strip() or "unknown"


def wait_for_service_settled(timeout: int = SERVICE_STOP_TIMEOUT) -> str:
    """Poll until the service is no longer mid-transition: a stop the CLI
    gave up on is still running inside systemd, which SIGKILLs at
    TimeoutStopSec. Returns the last state seen."""
    start = time.time()
    while True:
        state = service_state()
        if state not in _TRANSITIONAL_STATES or time.time() - start >= timeout:
            return state
        time.sleep(1)


def _handle_failed_stop(port: int, host: str, restart: bool = True) -> bool:
    """A stop failed (CHT-1474). Say plainly whether the server is up or
    down; if it is down and `restart`, start it again and verify /health.
    Returns True when the server is up on return."""
    console.print("[red]Failed to stop server.[/red]")
    state = wait_for_service_settled()
    if is_service_running():
        console.print("[yellow]The server is still RUNNING; it was not stopped.[/yellow]")
        return True
    if not restart:
        if state in _STOPPED_STATES:
            console.print("[yellow]The server is DOWN: the stop completed after the CLI stopped waiting.[/yellow]")
        else:
            console.print(
                f"[red]Could not confirm the server stopped: the service manager reports '{state}'. "
                "Check 'chaotic system status'.[/red]"
            )
        return False
    console.print("[yellow]The server is DOWN (the stop half finished). Starting it again...[/yellow]")
    if start_service() and health_check(port, host=host):
        console.print("[green]The server is back UP and answering /health.[/green]")
        return True
    console.print(
        "[red]CRITICAL: the server is DOWN and could not be restarted. "
        "Run 'chaotic system start' and check 'chaotic system logs -n 50'.[/red]"
    )
    return False


def _print_service_state(port: int | None, host: str = "127.0.0.1") -> None:
    """End a failed upgrade with one plain line about the server (CHT-1475).
    An active unit is not a serving app: a server that refuses to start
    (e.g. verify_migrations_current) is relaunched by Restart=on-failure and
    can read as active between crashes. Say RUNNING only when /health
    answers too."""
    if not is_service_running():
        console.print("[red]Server is DOWN. Start it with 'chaotic system start'.[/red]")
    elif health_check(port if port is not None else DEFAULT_PORT, timeout=10, host=host):
        console.print("Server is RUNNING and answering /health. Check 'chaotic system status' for its version.")
    else:
        console.print(
            "[red]Server is NOT SERVING: the service is up but /health does not answer "
            "(it may be crash-looping). Check 'chaotic system logs -n 50'.[/red]"
        )


def is_service_running() -> bool:
    """Check if the server service is running."""
    os_type = get_os()
    try:
        if os_type == "linux":
            result = run_command(
                ["systemctl", "--user", "is-active", SYSTEMD_SERVICE],
                check=False,
            )
            return result.returncode == 0
        elif os_type == "darwin":
            result = run_command(
                ["launchctl", "list", LAUNCHD_LABEL],
                check=False,
            )
            if result.returncode != 0:
                return False
            # `launchctl list <label>` returns a plist dict, e.g.:
            #     {
            #         "PID" = 12345;
            #         "LastExitStatus" = 0;
            #         "Label" = "com.chaotic.server";
            #         ...
            #     };
            # The "PID" key is present (with an integer) when the job is
            # currently running, and absent when the job is loaded but not
            # running. The bare `launchctl list` (no label) uses the
            # "PID\tStatus\tLabel" format with "-" for stopped jobs, but
            # that format does NOT apply here.
            stdout = result.stdout or ""
            return re.search(r'"PID"\s*=\s*\d+\s*;', stdout) is not None
        else:
            return False
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError):
        return False


def wait_for_service_stop(timeout: int = 10) -> bool:
    """Poll until service stops or timeout. Returns True if stopped."""
    start = time.time()
    while time.time() - start < timeout:
        if not is_service_running():
            return True
        time.sleep(0.5)
    return False


def is_port_in_use(port: int, host: str = "127.0.0.1") -> bool:
    """Check if a port is already in use."""
    import socket
    check_host = "127.0.0.1" if host in ("0.0.0.0", "::") else host
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)
            return s.connect_ex((check_host, port)) == 0
    except OSError:
        return False


def _server_url(port: int, host: str = "localhost", path: str = "/health") -> str:
    """Build a URL on the local server, normalizing wildcard binds and IPv6 hosts."""
    # Use localhost for wildcard binds (0.0.0.0/::) since they accept loopback
    check_host = "localhost" if host in ("0.0.0.0", "::") else host
    # Bracket IPv6 addresses for URL formatting
    if ":" in check_host and not check_host.startswith("["):
        check_host = f"[{check_host}]"
    return f"http://{check_host}:{port}{path}"


def _health_url(port: int, host: str = "localhost") -> str:
    """Build the /health URL."""
    return _server_url(port, host, "/health")


def health_check(port: int, timeout: int = 30, host: str = "localhost") -> bool:
    """Poll the server health endpoint until it responds or timeout."""
    import urllib.request
    import urllib.error

    url = _health_url(port, host)
    start = time.time()

    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if response.status == 200:
                    return True
        except (urllib.error.URLError, TimeoutError, ConnectionRefusedError):
            pass
        time.sleep(1)

    return False


def get_health(port: int, host: str = "localhost", timeout: int = 3) -> dict | None:
    """Single GET against /health -- unlike health_check(), does not poll
    or retry. Returns the parsed JSON body (status/db/version), or None if
    the server didn't respond at all (network error, non-200, bad JSON).

    Used by `chaotic system status` to distinguish process-alive (which
    is_service_running() already checks) from app-actually-works.
    """

    return _get_json(_health_url(port, host), timeout)


def get_remote_version(port: int, host: str = "localhost", timeout: int = 3) -> dict | None:
    """Single GET against /api/version (git sha, mcp_toolset_fingerprint,
    mcp_tool_count, ...), or None if the server didn't answer. Used by
    `system upgrade` to compare the MCP toolset before and after (CHT-1364).
    """
    return _get_json(_server_url(port, host, "/api/version"), timeout)


def _get_json(url: str, timeout: int) -> dict | None:
    import json
    import urllib.request
    import urllib.error

    try:
        with urllib.request.urlopen(url, timeout=timeout) as response:
            if response.status == 200:
                return json.loads(response.read().decode())
    except (urllib.error.URLError, TimeoutError, ConnectionRefusedError, ValueError):
        pass
    return None


def _mcp_reconnect_note(before: dict | None, after: dict | None) -> str:
    """What to tell the operator about MCP clients after an upgrade (CHT-1364).

    MCP clients cache tools/list at connect time and the stateless /mcp
    transport hides a restart from them, so a changed toolset needs a
    reconnect. With /api/version from both before and after the upgrade
    this is a definite answer; without (server wasn't running, or an
    older server without the field) it can only be the general reminder.
    """
    before_fp = (before or {}).get("mcp_toolset_fingerprint")
    after_fp = (after or {}).get("mcp_toolset_fingerprint")
    if before_fp and after_fp:
        if before_fp == after_fp:
            return "[dim]MCP toolset unchanged; connected MCP clients need no action.[/dim]"
        return (
            f"[yellow]MCP toolset changed ({before.get('mcp_tool_count')} -> "
            f"{after.get('mcp_tool_count')} tools). MCP clients cache the toolset at connect "
            "time: remove and re-add connectors, or restart Claude Code sessions, so they "
            "see the new tools (docs/agents.md).[/yellow]"
        )
    return (
        "[dim]MCP clients cache the toolset at connect time. If this upgrade changed any "
        "tool, reconnect them (/api/version reports mcp_toolset_fingerprint; see "
        "docs/agents.md).[/dim]"
    )


def get_backup_path(timestamp: str | None = None) -> Path:
    """Get path for a backup file."""
    if timestamp is None:
        timestamp = time.strftime("%Y%m%d-%H%M%S", time.gmtime())
    return DATA_DIR / f"chaotic.db.backup-{timestamp}"


def list_backups() -> list[Path]:
    """List all backup files, sorted newest first."""
    if not DATA_DIR.exists():
        return []
    backups = sorted(
        DATA_DIR.glob("chaotic.db.backup-*"),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    return backups


def _sidecars(db_path: Path) -> list[Path]:
    """The WAL-mode companions of a SQLite file (`<db>-wal`, `<db>-shm`)."""
    return [db_path.with_name(db_path.name + suffix) for suffix in ("-wal", "-shm")]


class BackupError(RuntimeError):
    """create_backup could not produce a verified backup; the message says why."""


BACKUP_TIMEOUT = 60.0


def create_backup(timeout: float = BACKUP_TIMEOUT) -> Path | None:
    """Create a backup of the database. Returns backup path or None if no db.

    Uses SQLite's online backup API rather than copying the file: the
    server runs the database in WAL mode, so committed rows can live in
    `chaotic.db-wal` until the next checkpoint, and a plain copy of
    `chaotic.db` taken while the server is up silently misses them
    (CHT-1207). The backup API reads through the WAL and produces a
    single self-contained, consistent file, whether or not the server is
    running. The result is verified with `PRAGMA quick_check` before it
    is reported as a backup.

    Raises BackupError (never a bare sqlite3 error) when the source cannot
    be read, the copy fails verification, or the backup does not finish
    within `timeout` seconds. The last case exists because the backup API
    retries a locked source forever: a rollback-journal database held by an
    exclusive writer would otherwise hang this command with no output.
    """
    if not DATABASE_PATH.exists():
        return None

    backup_path = get_backup_path()
    deadline = time.monotonic() + timeout

    def _check_deadline(_status, _remaining, _total):
        # Called after every backup step, including the BUSY retries.
        if time.monotonic() > deadline:
            raise TimeoutError(
                f"backup did not finish within {timeout:g}s: the database is locked by a writer"
            )

    try:
        src = sqlite3.connect(f"file:{DATABASE_PATH}?mode=ro", uri=True)
        try:
            dst = sqlite3.connect(backup_path)
            try:
                src.backup(dst, pages=256, progress=_check_deadline, sleep=0.05)
                # The copy inherits the WAL flag from the live file; flip the
                # backup to a rollback journal so it is one self-contained
                # file that never grows -wal/-shm sidecars of its own.
                dst.execute("PRAGMA journal_mode=DELETE")
                ok = dst.execute("PRAGMA quick_check").fetchone()[0] == "ok"
            finally:
                dst.close()
        finally:
            src.close()
    except (sqlite3.Error, TimeoutError, OSError) as e:
        backup_path.unlink(missing_ok=True)  # never leave a half-written backup behind
        raise BackupError(f"Backup failed: {e}") from e
    except BaseException:
        backup_path.unlink(missing_ok=True)
        raise
    if not ok:
        backup_path.unlink(missing_ok=True)
        raise BackupError("Backup failed verification (PRAGMA quick_check) and was discarded")
    return backup_path


def database_in_use(port: int | None = None, host: str = "127.0.0.1") -> bool:
    """True if something that could hold the database open is still running:
    the managed service, or (when a port is given) any process on the port.
    The port check matters because the CHT-1363 failure is precisely a
    process the service unit does not own answering the port."""
    if is_service_running():
        return True
    return port is not None and is_port_in_use(port, host)


def restore_backup(backup_path: Path, port: int | None = None, host: str = "127.0.0.1") -> bool:
    """Restore database from a backup. Returns True on success.

    A backup made by create_backup is a single self-contained file, so
    restoring is a copy -- but the live database's `-wal`/`-shm` sidecars
    belong to the file being replaced, and a stale WAL left next to the
    restored file would be replayed onto it at the next open (CHT-1207).
    They are removed first.

    Refuses (returns False, says why) while the service or, if `port` is
    given, anything on that port is still running: overwriting a database
    under a live connection loses the restore at best and corrupts the file
    at worst. Callers stop the server first and pass the port so a process
    the service unit could not stop is caught too.
    """
    if not backup_path.exists():
        return False
    if database_in_use(port, host):
        console.print(
            "[red]Refusing to restore: something is still running against the database"
            + (f" (port {port} is in use)" if port is not None and is_port_in_use(port, host) else "")
            + ". Stop it first.[/red]"
        )
        return False

    for sidecar in _sidecars(DATABASE_PATH):
        sidecar.unlink(missing_ok=True)
    shutil.copy2(backup_path, DATABASE_PATH)
    return True


def cleanup_old_backups(keep: int = MAX_BACKUPS):
    """Remove old backups, keeping only the most recent N.

    This is best-effort cleanup - individual file deletion failures
    (permissions, file in use, etc.) are silently ignored.
    """
    backups = list_backups()
    for old_backup in backups[keep:]:
        try:
            old_backup.unlink()
        except OSError:
            pass  # Best-effort cleanup, ignore failures


def get_current_version() -> str | None:
    """Get the current installed version from git."""
    if not is_server_installed():
        return None
    try:
        result = run_command(
            ["git", "describe", "--tags", "--always"],
            cwd=SERVER_DIR,
            check=False,
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except subprocess.CalledProcessError:
        pass
    return None


def get_current_commit() -> str | None:
    """Get the current commit hash."""
    if not is_server_installed():
        return None
    try:
        result = run_command(
            ["git", "rev-parse", "HEAD"],
            cwd=SERVER_DIR,
            check=False,
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except subprocess.CalledProcessError:
        pass
    return None


def fetch_updates() -> bool:
    """Fetch updates from remote. Returns True on success."""
    try:
        run_command(["git", "fetch", "--tags"], cwd=SERVER_DIR, timeout=120)
        return True
    except subprocess.CalledProcessError:
        return False


def get_latest_version() -> str | None:
    """Get the latest version tag from remote."""
    try:
        result = run_command(
            ["git", "describe", "--tags", "--abbrev=0", "origin/main"],
            cwd=SERVER_DIR,
            check=False,
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except subprocess.CalledProcessError:
        pass
    return None


def _git_query(args: list[str]) -> subprocess.CompletedProcess | None:
    """Run a read-only git query in the server checkout; None if git itself
    could not run (missing binary, timeout). A non-zero exit is returned to
    the caller to interpret, since for `merge-base --is-ancestor` it is an
    answer, not an error."""
    try:
        return run_command(["git", *args], cwd=SERVER_DIR, check=False)
    except (subprocess.TimeoutExpired, OSError):
        return None


def resolve_commit(ref: str) -> str | None:
    """Full sha a tag/branch/commit ref points at, or None if it does not resolve."""
    result = _git_query(["rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}"])
    if result is None or result.returncode != 0:
        return None
    return result.stdout.strip() or None


def is_ancestor(older: str, newer: str) -> bool | None:
    """True if `older` is an ancestor of (or equal to) `newer`, False if not,
    None if git could not answer (unknown ref, corrupt checkout, no git)."""
    result = _git_query(["merge-base", "--is-ancestor", older, newer])
    if result is None or result.returncode not in (0, 1):
        return None
    return result.returncode == 0


def describe_commit(sha: str) -> str:
    """`abc1234 (2026-07-24)` -- short sha and commit date, for messages."""
    result = _git_query(["log", "-1", "--format=%h (%cs)", sha])
    if result is None or result.returncode != 0 or not result.stdout.strip():
        return sha[:7]
    return result.stdout.strip()


def upgrade_direction(current_commit: str | None, target_commit: str) -> str:
    """Where an upgrade from `current_commit` to `target_commit` would move
    the server: "same", "forward" (target descends from current), "backward"
    (target is an ancestor of current -- a downgrade), "diverged" (neither),
    or "unknown" when the current commit could not be determined or git
    could not answer the ancestry question (CHT-1357).
    """
    if current_commit is None:
        return "unknown"
    if current_commit == target_commit:
        return "same"
    forward = is_ancestor(current_commit, target_commit)
    if forward is None:
        return "unknown"
    if forward:
        return "forward"
    backward = is_ancestor(target_commit, current_commit)
    if backward is None:
        return "unknown"
    if backward:
        return "backward"
    return "diverged"


# /health has reported git_sha since 4a9db89 (2026-07-11). Anything shorter
# than a short sha is not one.
_MIN_SHA_PREFIX = 7


def verify_deployed_commit(
    port: int, expected_sha: str, host: str = "localhost", timeout: int = 30,
) -> tuple[bool | None, str | None]:
    """Poll /health until the process answering the port reports the commit
    we just checked out (CHT-1363). health_check() only proves that
    SOMETHING answers; if start_service() failed while an old process
    still held the port, the old code would pass it. /health reports the
    short sha, so compare by prefix. Returns (verdict, last sha seen):
    True when it matched, False when the port kept reporting a DIFFERENT
    commit, None when nothing on the port ever reported a usable sha (a
    server older than 4a9db89, or a git-less host reporting "unknown"), in
    which case the caller can only warn -- a missing sha proves nothing
    about which process answered.

    Polls rather than failing on the first mismatch: during a restart the
    old process may answer briefly before the new one binds.
    """
    start = time.time()
    served = None
    saw_sha = False
    while True:
        body = get_health(port, host=host)
        sha = (body or {}).get("git_sha") or None
        if isinstance(sha, str) and len(sha) >= _MIN_SHA_PREFIX and sha != "unknown":
            served = sha
            saw_sha = True
            if expected_sha.startswith(sha) or sha.startswith(expected_sha):
                return True, sha
        if time.time() - start >= timeout:
            return (False if saw_sha else None), served
        time.sleep(1)


def checkout_version(version: str, force: bool = False) -> tuple[bool, str]:
    """Checkout a specific version (tag, branch, or commit).

    Returns (success, error_message). When force=True, uses git reset --hard
    to handle dirty working trees (e.g. lock files modified by uv sync).
    """
    try:
        if force:
            # For upgrades: reset hard to handle dirty state from uv sync etc.
            run_command(["git", "reset", "--hard", version], cwd=SERVER_DIR)
        else:
            run_command(["git", "checkout", version], cwd=SERVER_DIR)
        return True, ""
    except subprocess.CalledProcessError as e:
        return False, (e.stderr or e.stdout or "Unknown error").strip()


CLI_TOOL_NAME = "chaotic-cli"
# The importable packages the CLI wheel ships (cli/pyproject.toml's
# [tool.hatch.build.targets.wheel] packages), each under cli/src/.
CLI_PACKAGES = ("cli", "chaotic_mcp_tools")


def reinstall_cli() -> tuple[bool, str]:
    """Reinstall the CLI binary from the server repo so it picks up new code,
    then check that it did.

    `--reinstall-package` forces uv to rebuild the CLI from the checkout
    (it implies `--refresh-package`). Without it uv may reuse a wheel it
    cached for the same name and version, built from an earlier commit:
    prod deploys main by sha between CLI releases, so the version string
    usually does not change, and prod once got a CLI with no
    `system config` after an upgrade that included it (CHT-1675).
    Dependencies are left alone; only the CLI itself is rebuilt.
    """
    cli_dir = PROJECT_DIR / "cli"
    try:
        run_command(
            ["uv", "tool", "install", "--force", "--reinstall-package", CLI_TOOL_NAME, str(cli_dir)],
            cwd=PROJECT_DIR,
            timeout=120,
        )
    except subprocess.CalledProcessError as e:
        return False, f"CLI reinstall failed:\n{_command_output(e)}"
    except subprocess.TimeoutExpired:
        return False, "CLI reinstall timed out"
    return verify_installed_cli(cli_dir)


def _installed_cli_dirs() -> dict[str, Path] | None:
    """Where the installed `chaotic` tool imports each CLI package from,
    asked of the tool's own interpreter (-I: not from the cwd or
    PYTHONPATH). None if that cannot be determined."""
    try:
        tool_dir = run_command(["uv", "tool", "dir"], timeout=30).stdout.strip()
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError):
        return None
    python = Path(tool_dir) / CLI_TOOL_NAME / "bin" / "python"
    script = (
        "import importlib, pathlib\n"
        f"for name in {CLI_PACKAGES!r}:\n"
        "    print(name, pathlib.Path(importlib.import_module(name).__file__).parent)\n"
    )
    try:
        result = run_command([str(python), "-I", "-c", script], timeout=30)
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError):
        return None
    dirs = {}
    for line in (result.stdout or "").splitlines():
        name, _, path = line.partition(" ")
        if name in CLI_PACKAGES and path:
            dirs[name] = Path(path)
    return dirs if set(dirs) == set(CLI_PACKAGES) else None


def verify_installed_cli(cli_dir: Path) -> tuple[bool, str]:
    """Check that the installed CLI is the checkout's code (CHT-1675):
    every .py file of each package under cli/src must be in the installed
    package with the same bytes. Returns (ok, message); a mismatch names
    the files and the command that fixes it."""
    fix = f"Reinstall it by hand: uv tool install --force --reinstall {cli_dir}"
    installed = _installed_cli_dirs()
    if installed is None:
        return False, (
            f"CLI reinstall could not be verified: could not find where the installed "
            f"{CLI_TOOL_NAME} tool imports its code from. {fix}"
        )
    differing = []
    for name in CLI_PACKAGES:
        source_root = cli_dir / "src" / name
        for source in sorted(source_root.rglob("*.py")):
            rel = source.relative_to(source_root)
            target = installed[name] / rel
            try:
                same = target.read_bytes() == source.read_bytes()
            except OSError:
                same = False
            if not same:
                differing.append(f"{name}/{rel.as_posix()}")
    if differing:
        shown = ", ".join(differing[:5]) + (f" and {len(differing) - 5} more" if len(differing) > 5 else "")
        return False, (
            f"CLI reinstall did not take: the installed CLI differs from the checkout in "
            f"{shown}. {fix}"
        )
    return True, "CLI reinstalled (verified against the checkout)"


def run_migrations(fake_initial: bool = False) -> tuple[bool, str]:
    """Run pending database migrations using Oxyde. Returns (success, message)."""
    backend_dir = PROJECT_DIR / "backend"
    # Point Oxyde at the same database file the running server opens
    # (set by the systemd unit / launchd plist). Without this, oxyde_config.py
    # would default to backend/chaotic.db while the server reads
    # ~/.chaotic/data/chaotic.db, and migrations would land in the wrong DB.
    migration_env = dict(os.environ)
    migration_env["DATABASE_URL"] = f"sqlite+aiosqlite:///{DATABASE_PATH}"
    try:
        # Sync dependencies first (may download packages)
        run_command(["just", "sync"], cwd=PROJECT_DIR, timeout=300)

        # Reinstall CLI binary so it picks up code changes
        ok, msg = reinstall_cli()
        if not ok:
            return ok, msg

        # If user specified --fake-initial, mark the initial schema migration
        # as applied without running it (for pre-Oxyde databases)
        if fake_initial:
            run_command(
                ["uv", "run", "--frozen", "oxyde", "migrate", "0001_initial", "--fake"],
                cwd=backend_dir,
                timeout=30,
                env=migration_env,
            )

        # Run Oxyde migrations. --frozen (here and above): use the env
        # `just sync` just built from the committed uv.lock; a plain
        # `uv run` would re-resolve and rewrite a stale lock (CHT-1201).
        result = run_command(
            ["uv", "run", "--frozen", "oxyde", "migrate"],
            cwd=backend_dir,
            timeout=120,
            env=migration_env,
        )
        # What oxyde printed: the migrations it applied, and anything a
        # migration reports as it runs (0021 lists the dead API keys it
        # deletes, CHT-1537), so it stays in the upgrade's output.
        output = result.stdout.strip() if isinstance(result.stdout, str) else ""
        return True, "Migrations applied" + (f"\n{output}" if output else "")
    except subprocess.TimeoutExpired:
        return False, "Migration timed out"
    except subprocess.CalledProcessError as e:
        output = (e.stderr or "") + (e.stdout or "")
        if "already exists" in output:
            if fake_initial:
                return False, (
                    "Migration failed: tables already exist even after --fake-initial.\n"
                    "A migration beyond 0001_initial is trying to create existing tables.\n"
                    "Manual intervention required — check 'oxyde showmigrations' in the backend directory."
                )
            return False, (
                "Migration failed: tables already exist.\n"
                "This usually means the database predates the Oxyde migration system.\n"
                "To fix, re-run with --fake-initial:\n"
                "  chaotic system upgrade --fake-initial --yes"
            )
        return False, f"Migration failed:\n{_command_output(e)}"


def _command_output(error: subprocess.CalledProcessError) -> str:
    """Everything a failed command printed. `oxyde migrate` reports its
    errors (a migration's refusal and what to fix) on stdout, not stderr,
    so reporting stderr alone showed an operator nothing (CHT-1548)."""
    parts = [
        text.strip() for text in (error.stdout, error.stderr)
        if isinstance(text, str) and text.strip()
    ]
    return "\n".join(parts) or f"exit status {error.returncode}"


def rebuild_frontend() -> tuple[bool, str]:
    """Install npm deps and rebuild the frontend bundle.

    The upstream repo commits the built bundle (frontend/static/js/app.bundle.js)
    so a fresh clone "just works." But if a PR forgets to commit the rebuilt
    bundle alongside source changes, an in-place git pull/reset leaves source
    files updated and the served bundle stale — the daemon then renders an
    older UI than the code on disk implies. Rebuilding as part of the upgrade
    closes that gap.

    Uses `npm ci`, not `npm install`. `ci` reproducibly installs from
    package-lock.json (wiping any stale node_modules) and refuses to mutate
    the committed lockfile. That's the deploy-shaped install we want —
    `npm install` would silently rewrite the lockfile, and combined with
    a node_modules existence-guard would never reinstall after an upstream
    lockfile bump, reproducing the exact silent-skew bug this function
    exists to prevent (just at the deps layer instead of the bundle layer).

    Best-effort: if node/npm is unavailable, skip with a message rather
    than failing the upgrade. The committed bundle (if up to date) will
    still be served.

    Returns (success, message).
    """
    if shutil.which("npm") is None or shutil.which("node") is None:
        return True, "skipped (node/npm not on PATH; serving committed bundle)"
    frontend_dir = PROJECT_DIR / "frontend"
    if not (frontend_dir / "package.json").exists():
        return True, "skipped (no frontend/package.json)"
    try:
        # `npm ci` is idempotent and the only safe way to ensure
        # node_modules matches the committed lockfile on disk.
        run_command(["npm", "ci"], cwd=frontend_dir, timeout=600)
        run_command(["npm", "run", "build"], cwd=frontend_dir, timeout=180)
        return True, "rebuilt"
    except subprocess.CalledProcessError as e:
        stderr = (e.stderr or "").strip()
        return False, f"npm ci/build failed: {stderr[:200]}"
    except subprocess.TimeoutExpired:
        return False, "npm ci/build timed out"


# CLI Command Group
@click.group()
def system():
    """Manage local Chaotic server installation.

    These commands help you install, run, and maintain a self-hosted
    Chaotic server on your local machine.
    """
    pass


@system.command("install")
@click.option("--version", "git_version", default=None, help="Git tag/branch to install (default: latest release)")
@click.option("--host", default="127.0.0.1", help="Host/IP to bind to (use 0.0.0.0 for all interfaces)")
@click.option("--port", default=DEFAULT_PORT, help=f"Port to run on (default: {DEFAULT_PORT})")
@click.option("--no-start", is_flag=True, help="Install but don't start the server")
@click.option("--repo", default="https://github.com/thethirdbearsolutions/chaotic.sh.git", help="Git repository URL")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompts")
@click.option("--config", "config_pairs", multiple=True, metavar="NAME=VALUE",
              help="A server setting, e.g. APP_BASE_URL=https://chaotic.example.com (repeatable; "
                   "see 'chaotic system config')")
def system_install(git_version, host, port, no_start, repo, yes, config_pairs):
    """Install and start a local Chaotic server.

    This command clones the Chaotic repository, sets up the database,
    configures a system service (systemd on Linux, launchd on macOS),
    and starts the server.
    """
    # Check OS
    os_type = get_os()
    if os_type == "unsupported":
        console.print(f"[red]Unsupported operating system: {platform.system()}[/red]")
        console.print("Chaotic system commands support Linux and macOS only.")
        raise SystemExit(1)

    # Validate inputs (security)
    if not validate_repo_url(repo):
        console.print(f"[red]Invalid repository URL: {repo}[/red]")
        console.print("URL must be https:// or git@ format.")
        raise SystemExit(1)

    if not validate_host(host):
        console.print(f"[red]Invalid host: {host}[/red]")
        console.print("Host must be a valid IP address or hostname.")
        raise SystemExit(1)

    if not validate_port(port):
        console.print(f"[red]Invalid port: {port}[/red]")
        console.print("Port must be between 1024 and 65535.")
        raise SystemExit(1)

    if git_version and not validate_git_ref(git_version):
        console.print(f"[red]Invalid version: {git_version}[/red]")
        console.print("Version must be a valid git tag or branch name.")
        raise SystemExit(1)

    settings = _parse_install_settings(config_pairs)

    # Check if already installed
    if is_server_installed():
        console.print("[yellow]Chaotic server is already installed.[/yellow]")
        console.print(f"  Location: {SERVER_DIR}")
        console.print("\nRun 'chaotic system status' to check server status.")
        console.print("Run 'chaotic system upgrade' to upgrade to a new version.")
        raise SystemExit(1)

    # Check prerequisites
    prereqs = check_all_prerequisites()
    if not print_prerequisites_status(prereqs):
        print_prerequisite_install_hints(prereqs)
        raise SystemExit(1)

    console.print()  # blank line

    # Confirm installation
    if not yes:
        console.print(f"[bold]This will install Chaotic to:[/bold] {SERVER_DIR}")
        console.print(f"[bold]Database:[/bold] {DATABASE_PATH}")
        console.print(f"[bold]Host:[/bold] {host}")
        console.print(f"[bold]Port:[/bold] {port}")
        for name, value in sorted(settings.items()):
            console.print(f"[bold]{name}:[/bold] {escape(server_settings.display_value(name, value))}",
                          highlight=False)
        if not _confirm_action("\nProceed with installation?"):
            console.print("[yellow]Installation cancelled.[/yellow]")
            raise SystemExit(0)

    console.print()

    # Create directories
    console.print("Creating directories...")
    GLOBAL_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    # Clone or update repository
    if (SERVER_DIR / ".git").exists():
        console.print(f"Existing installation found at {SERVER_DIR}, updating...")
        try:
            run_command(["git", "fetch", "--tags"], cwd=SERVER_DIR, timeout=120)
            run_command(["git", "pull", "--ff-only"], cwd=SERVER_DIR, timeout=120)
        except subprocess.CalledProcessError as e:
            console.print(f"[yellow]Warning: Could not update repository: {e.stderr}[/yellow]")
            console.print("[dim]Continuing with existing version.[/dim]")
    else:
        console.print(f"Cloning repository to {SERVER_DIR}...")
        try:
            run_command(["git", "clone", repo, str(SERVER_DIR)], timeout=300)
        except subprocess.TimeoutExpired:
            console.print("[red]Clone timed out (exceeded 5 minutes).[/red]")
            console.print("This usually means a network connectivity issue.")
            console.print("Check your internet connection and try again.")
            raise SystemExit(1)
        except subprocess.CalledProcessError as e:
            stderr = e.stderr or ""
            console.print(f"[red]Failed to clone repository.[/red]")
            if "Could not resolve host" in stderr:
                console.print("DNS resolution failed. Check your internet connection.")
            elif "Connection refused" in stderr or "Connection timed out" in stderr:
                console.print("Could not connect to the git server. Check your network.")
            elif "Authentication failed" in stderr:
                console.print("Authentication failed. Check repository access permissions.")
            else:
                console.print(f"[dim]{stderr.strip()}[/dim]")
            raise SystemExit(1)

    # Checkout version if specified
    if git_version:
        console.print(f"Checking out {git_version}...")
        try:
            run_command(["git", "checkout", git_version], cwd=SERVER_DIR)
        except subprocess.TimeoutExpired:
            console.print(f"[red]Checkout timed out[/red]")
            raise SystemExit(1)
        except subprocess.CalledProcessError as e:
            console.print(f"[red]Failed to checkout {git_version}: {e.stderr}[/red]")
            raise SystemExit(1)
    else:
        # Try to get latest tag
        try:
            result = run_command(
                ["git", "describe", "--tags", "--abbrev=0"],
                cwd=SERVER_DIR,
                check=False,
            )
            if result.returncode == 0 and result.stdout.strip():
                latest_tag = result.stdout.strip()
                console.print(f"Checking out {latest_tag}...")
                run_command(["git", "checkout", latest_tag], cwd=SERVER_DIR)
        except subprocess.CalledProcessError:
            console.print("[dim]No tags found, using main branch.[/dim]")

    # Install dependencies and run migrations
    console.print("Installing dependencies and running migrations...")
    success, message = run_migrations()
    if not success:
        # escape(): the message carries the command's own output.
        console.print(f"[red]{escape(message)}[/red]")
        raise SystemExit(1)
    console.print(f"  [dim]{escape(message)}[/dim]")

    # Generate secure secret key
    console.print("Generating secure SECRET_KEY...")
    secret_key = generate_secret_key()

    # Save server metadata (including secret key)
    server_info = {
        "host": host,
        "port": port,
        "secret_key": secret_key,
        "installed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    if settings:
        server_info[SETTINGS_KEY] = settings
    save_server_json(server_info)
    console.print("  [dim]Stored in ~/.chaotic/server.json[/dim]")

    # Write service file
    console.print(f"Installing {'systemd' if os_type == 'linux' else 'launchd'} service...")
    service_path = write_service_file(port, secret_key, host, settings)
    console.print(f"  [dim]{service_path}[/dim]")

    # Start service
    started_ok = False
    if not no_start:
        # Check if port is already in use
        if is_port_in_use(port, host):
            console.print(f"[yellow]Warning: Port {port} is already in use.[/yellow]")
            console.print(f"Another process is listening on port {port}.")
            console.print(f"Use 'chaotic system reconfigure --port <port>' to change, or stop the other process.")
            console.print("Installed but not started. Run 'chaotic system start' when the port is free.")
        else:
            console.print("Starting server...")
            if not start_service():
                console.print("[red]Failed to start service.[/red]")
                console.print("Try starting manually with 'chaotic system start'.")
                console.print("Check logs with: chaotic system logs -n 20")
                raise SystemExit(1)

            console.print("Waiting for health check...", end=" ")
            if health_check(port, host=host):
                console.print("[green]OK[/green]")
                started_ok = True
            else:
                console.print("[yellow]TIMEOUT[/yellow]")
                console.print("Server may still be starting. Check 'chaotic system status'.")
                console.print("Check logs with: chaotic system logs -n 20")

    # Update CLI config to point to local server
    local_url = f"http://localhost:{port}/api"
    set_api_url(local_url)

    console.print()
    if started_ok:
        console.print(f"[bold green]Chaotic is running at http://{_display_host(host)}:{port}[/bold green]")
    else:
        console.print("[bold]Installed.[/bold] Run 'chaotic system start' when ready.")
    console.print("CLI configured to use local server.")
    console.print()
    console.print("[bold]Next steps:[/bold]")
    console.print("  chaotic quickstart     # Interactive setup (recommended)")
    console.print("  chaotic init           # Browser-based setup")


def _parse_install_settings(pairs) -> dict[str, str]:
    """install --config NAME=VALUE pairs, validated as 'system config set'
    validates them (without --force) before anything is installed."""
    settings: dict[str, str] = {}
    for pair in pairs:
        name, sep, value = pair.partition("=")
        name = name.strip().upper()
        problem = None if sep else "--config: expected NAME=VALUE"  # never echo it: it may be a secret
        problem = problem or server_settings.name_problem(name)
        if not problem:
            value, problem = server_settings.normalize(name, value)
        if problem:
            console.print(f"[red]{escape(problem)}[/red]")
            raise SystemExit(1)
        settings[name] = value
    errors, warnings = server_settings.check({SETTINGS_KEY: settings})
    if errors:
        _print_problems(errors, [])
        raise SystemExit(1)
    _print_problems([], warnings)
    return settings


@system.command("status")
def system_status():
    """Show server status."""
    if not is_server_installed():
        console.print("[yellow]Chaotic server is not installed.[/yellow]")
        console.print()
        console.print("Run 'chaotic system install' to set up a local server,")
        console.print("or 'chaotic config set-url <url>' to use a remote server.")
        raise SystemExit(0)

    server_info = load_server_json()
    port = server_info.get("port", DEFAULT_PORT)

    console.print("[bold]Chaotic Server Status[/bold]")

    host = server_info.get("host", "127.0.0.1")
    if is_service_running():
        console.print(f"  Status:   [green]running[/green]")
        console.print(f"  URL:      http://{_display_host(host)}:{port}")
    else:
        console.print(f"  Status:   [red]stopped[/red]")
        console.print()
        console.print("Run 'chaotic system start' to start the server.")
        return

    # Process is alive per is_service_running() above -- that's not the same
    # as the app actually working (e.g. an unmigrated DB). Hit /health too.
    health = get_health(port, host=host)
    if health is None:
        console.print("  Health:   [red]unreachable[/red] (process is running but /health did not respond)")
    elif health.get("db") == "error":
        console.print("  Health:   [yellow]degraded[/yellow] (db: error -- check 'chaotic system logs')")
    else:
        console.print(f"  Health:   [green]ok[/green] (db: {health.get('db', 'unknown')})")

    # Try to get version from git
    try:
        result = run_command(
            ["git", "describe", "--tags", "--always"],
            cwd=SERVER_DIR,
            check=False,
        )
        if result.returncode == 0:
            version = result.stdout.strip()
            console.print(f"  Version:  {version}")
    except subprocess.CalledProcessError:
        pass

    # What the running process actually is (CHT-1401): the clone's git
    # describe above says what is checked out, not what is serving.
    remote = get_remote_version(port, host=host)
    if remote:
        sha = remote.get("git_sha_short") or remote.get("git_sha") or "unknown"
        dirty = " (dirty)" if remote.get("git_dirty") else ""
        console.print(f"  Commit:   {sha}{dirty}")
        count = remote.get("mcp_tool_count")
        if count is not None:
            console.print(f"  MCP:      {count} tools served (fingerprint {(remote.get('mcp_toolset_fingerprint') or 'unknown')[:12]})")

    # Show database info
    if DATABASE_PATH.exists():
        size_mb = DATABASE_PATH.stat().st_size / (1024 * 1024)
        console.print(f"  Database: {DATABASE_PATH} ({size_mb:.1f} MB)")


@system.command("start")
def system_start():
    """Start the server."""
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        console.print("Run 'chaotic system install' first.")
        raise SystemExit(1)

    if is_service_running():
        console.print("[yellow]Server is already running.[/yellow]")
        raise SystemExit(0)

    server_info = load_server_json()
    port = server_info.get("port", DEFAULT_PORT)
    host = server_info.get("host", "127.0.0.1")

    # Check if port is already in use by another process
    if is_port_in_use(port, host):
        console.print(f"[red]Port {port} is already in use.[/red]")
        console.print(f"Another process is listening on port {port}.")
        console.print(f"\nTo use a different port: chaotic system reconfigure --port <port>")
        console.print(f"To find what's using the port: lsof -i :{port}")
        raise SystemExit(1)

    console.print("Starting server...")
    if start_service():
        console.print("Waiting for health check...", end=" ")
        if health_check(port, host=host):
            console.print("[green]OK[/green]")
            console.print(f"\n[green]Server started at http://{_display_host(host)}:{port}[/green]")
        else:
            console.print("[yellow]TIMEOUT[/yellow]")
            console.print("Server may still be starting. Check 'chaotic system status'.")
            console.print("Check logs with: chaotic system logs -n 20")
    else:
        console.print("[red]Failed to start server.[/red]")
        console.print("Check logs with: chaotic system logs -n 20")
        raise SystemExit(1)


@system.command("stop")
def system_stop():
    """Stop the server."""
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        raise SystemExit(1)

    if not is_service_running():
        console.print("[yellow]Server is not running.[/yellow]")
        raise SystemExit(0)

    console.print("Stopping server...")
    if stop_service():
        console.print("[green]Server stopped.[/green]")
    else:
        server_info = load_server_json()
        up = _handle_failed_stop(
            server_info.get("port", DEFAULT_PORT), server_info.get("host", "127.0.0.1"), restart=False,
        )
        # Exit 0 only when the server is confirmed stopped, not merely
        # "not reported as running" (an unreadable state is not a stop).
        if up or service_state() not in _STOPPED_STATES:
            raise SystemExit(1)


def _current_service_file() -> tuple[Path | None, str | None, _ParsedService | None]:
    """(path, content, parsed) of the service file on disk; content is
    None when there is none (or it cannot be read), parsed None when it
    cannot be parsed."""
    os_type = get_os()
    if os_type not in ("linux", "darwin"):
        return None, None, None
    path = get_service_file_path()
    try:
        content = path.read_bytes().decode()  # as on disk: a CRLF file is backed up as CRLF
    except (OSError, UnicodeDecodeError):
        return path, None, None
    return path, content, _parse_service(content, os_type)


def _reconfigure_blockers(port: int, host: str, secret_key: str,
                          settings: dict[str, str]) -> tuple[list[str], list[str]]:
    """Why `system reconfigure` must not replace the service file on disk
    with one generated from server.json: what keeps reconcile_service_file
    from rewriting it, other than the HOST and PORT that reconfigure is
    for (CHT-1676: an OAUTH_ENABLED added to the unit by hand was dropped,
    turning OAuth off). Returns (reasons, identity keys among them that
    the new file would change, such as SECRET_KEY). Empty when there is
    no file to lose."""
    path, content, have = _current_service_file()
    if content is None:
        return [], []
    if have is None:
        return [f"{path} cannot be parsed"], []
    os_type = get_os()
    generate = generate_systemd_service if os_type == "linux" else generate_launchd_plist
    want = _parse_service(generate(port, secret_key, host, settings), os_type)
    if want is None:
        return [], []
    have_id, want_id = have.identity(), want.identity()
    identity = [k for k in _SERVICE_IDENTITY_KEYS
                if k not in ("HOST", "PORT") and have_id.get(k) != want_id.get(k)]
    return _rewrite_blockers(have, want, identity_owned=frozenset({"HOST", "PORT"})), identity


@system.command("reconfigure")
@click.option("--host", default=None, help="New host/IP to bind (use 0.0.0.0 for all interfaces)")
@click.option("--port", default=None, type=int, help="New port number")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@click.option("--force", is_flag=True,
              help="Replace the service file even if that drops lines added to it by hand")
def system_reconfigure(host, port, yes, force):
    """Reconfigure server host, port, or other settings.

    Updates server.json, regenerates the service file, and restarts
    the server if it was running. It refuses (unless --force) when the
    new file would drop or change anything the current one sets other
    than HOST and PORT, such as a setting added by hand: adopt those
    first with 'chaotic system config adopt'. The previous file is kept.
    """
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        console.print("Run 'chaotic system install' first.")
        raise SystemExit(1)

    if host is None and port is None:
        # No changes requested — show current config
        server_info = load_server_json()
        current_host = server_info.get("host", "127.0.0.1")
        current_port = server_info.get("port", DEFAULT_PORT)
        console.print("[bold]Current server configuration:[/bold]")
        console.print(f"  Host: {current_host}")
        console.print(f"  Port: {current_port}")
        console.print()
        console.print("Use --host and/or --port to change settings.")
        return

    # Validate inputs before anything else
    if host is not None and not validate_host(host):
        console.print(f"[red]Invalid host: {host}[/red]")
        console.print("Host must be a valid IP address or hostname.")
        raise SystemExit(1)

    if port is not None and not validate_port(port):
        console.print(f"[red]Invalid port: {port}[/red]")
        console.print("Port must be between 1024 and 65535.")
        raise SystemExit(1)

    server_info = load_server_json()
    current_host = server_info.get("host", "127.0.0.1")
    current_port = server_info.get("port", DEFAULT_PORT)
    secret_key = server_info.get("secret_key", "")

    new_host = host if host is not None else current_host
    new_port = port if port is not None else current_port

    # The service file is what the server runs with; server.json can say
    # otherwise (CHT-1676), and then the file still needs rewriting.
    _, _, unit = _current_service_file()
    unit_id = unit.identity() if unit else {}
    unit_id.setdefault("HOST", _JUSTFILE_DEFAULT_HOST)

    def unit_says(h, p):
        return unit is None or (unit_id.get("HOST") == h and unit_id.get("PORT") == str(p))

    if new_host == current_host and str(new_port) == str(current_port) and unit_says(new_host, new_port):
        console.print("[yellow]No changes — configuration is already set to these values.[/yellow]")
        return
    if not unit_says(current_host, current_port):
        console.print(f"[yellow]The service file says host {unit_id.get('HOST')} port {unit_id.get('PORT')}, "
                      "not what server.json says; the server runs with the service file's.[/yellow]")

    dropin_identity, _ = _dropin_problems()
    if dropin_identity and not force:
        for problem in dropin_identity:
            console.print(f"[red]{escape(problem)}[/red]")
        console.print("Nothing was changed: the drop-in would keep overriding what reconfigure writes. "
                      "(--force writes it anyway.)")
        raise SystemExit(1)

    # A missing secret_key gets a new one below, which the file's
    # SECRET_KEY blocks: replacing it would log everyone out.
    blockers, identity = _reconfigure_blockers(new_port, new_host, secret_key or "<new>",
                                               server_settings.valid_settings(server_info))
    if blockers and not force:
        console.print(f"[red]Not replacing the service file: {escape('; '.join(blockers))}.[/red]")
        if identity:
            consequence = " (every session is logged out)" if "SECRET_KEY" in identity else ""
            console.print(f"Nothing was changed. --force would write server.json's {', '.join(identity)} "
                          f"into the service file{consequence}. Usually the service file is right: edit "
                          f"{SERVER_JSON} to match it, or restore server.json from a backup.")
        else:
            console.print("Nothing was changed. Adopt settings added to it by hand with "
                          "'chaotic system config adopt' first, or pass --force to replace it anyway "
                          "(the previous file is kept).")
        raise SystemExit(1)


    # Show before/after and confirm
    console.print("[bold]Current config:[/bold]")
    console.print(f"  Host: {current_host}")
    console.print(f"  Port: {current_port}")
    console.print()
    console.print("[bold]New config:[/bold]")
    console.print(f"  Host: {new_host}")
    console.print(f"  Port: {new_port}")
    console.print()

    if not yes:
        if not _confirm_action("Apply these changes?"):
            console.print("[yellow]Reconfigure cancelled.[/yellow]")
            raise SystemExit(0)

    # Keep the previous service file before anything is written, so a
    # failure here leaves server.json and the file as they were.
    path, previous, _ = _current_service_file()
    backup = None
    if previous is not None:
        try:
            backup = _backup_service_file(path, previous)
        except OSError as e:
            console.print(f"[red]Could not keep a copy of {path} in {SERVICE_BACKUP_DIR}: {escape(str(e))}[/red]")
            console.print("Nothing was changed.")
            raise SystemExit(1)

    # Generate secret key inline if missing (avoid ensure_secret_key clobber)
    if not secret_key:
        secret_key = generate_secret_key()
        server_info["secret_key"] = secret_key

    # Update server.json
    server_info["host"] = new_host
    server_info["port"] = new_port
    save_server_json(server_info)
    console.print("Updated server.json.")

    # Regenerate service file
    if backup is not None:
        console.print(f"Previous service file kept at {backup}")
    service_path = write_service_file(new_port, secret_key, new_host, server_settings.valid_settings(server_info))
    console.print(f"Regenerated service file: {service_path}")

    # Restart if running
    was_running = is_service_running()
    if was_running:
        console.print("Restarting server...")
        if not stop_service():
            # The unit file is already rewritten; a restart here picks up
            # the new config, which is what reconfigure was asked to do.
            _handle_failed_stop(new_port, new_host)
            console.print(f"[dim]Previous config was: host={current_host} port={current_port}[/dim]")
            console.print("Try 'chaotic system stop' and then 'chaotic system start' manually.")
            raise SystemExit(1)
        if not wait_for_service_stop(timeout=10):
            console.print("[yellow]Server did not stop in time.[/yellow]")
            console.print(f"[dim]Previous config was: host={current_host} port={current_port}[/dim]")
            console.print("Try 'chaotic system stop' and then 'chaotic system start' manually.")
            raise SystemExit(1)
        if start_service():
            console.print("Waiting for health check...", end=" ")
            if health_check(new_port, host=new_host):
                console.print("[green]OK[/green]")
            else:
                console.print("[yellow]TIMEOUT[/yellow]")
                console.print("Server may still be starting. Check 'chaotic system status'.")
        else:
            console.print("[red]Failed to restart server.[/red]")
            console.print(f"[dim]Previous config was: host={current_host} port={current_port}[/dim]")
            console.print(f"Run 'chaotic system reconfigure --host {current_host} --port {current_port}' to revert.")
            raise SystemExit(1)
    else:
        console.print("[dim]Server was not running; skipping restart.[/dim]")

    # Update CLI api_url if port changed
    if new_port != current_port:
        local_url = f"http://localhost:{new_port}/api"
        set_api_url(local_url)
        console.print(f"Updated CLI API URL to {local_url}")

    console.print()
    console.print(f"[bold green]Server reconfigured: http://{_display_host(new_host)}:{new_port}[/bold green]")


@system.command("logs")
@click.option("--follow", "-f", is_flag=True, help="Follow log output")
@click.option("--lines", "-n", default=50, help="Number of lines to show")
def system_logs(follow, lines):
    """View server logs."""
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        raise SystemExit(1)

    os_type = get_os()

    if os_type == "linux":
        cmd = ["journalctl", "--user", "-u", SYSTEMD_SERVICE, f"-n{lines}"]
        if follow:
            cmd.append("-f")
    elif os_type == "darwin":
        log_file = LOGS_DIR / "server.log"
        if not log_file.exists():
            console.print("[yellow]No log file found yet.[/yellow]")
            raise SystemExit(0)
        cmd = ["tail", f"-n{lines}"]
        if follow:
            cmd.append("-f")
        cmd.append(str(log_file))
    else:
        console.print(f"[red]Unsupported OS: {os_type}[/red]")
        raise SystemExit(1)

    # Run without capture to stream output directly
    try:
        subprocess.run(cmd)
    except KeyboardInterrupt:
        pass  # User interrupted, exit cleanly


def _print_commit_list(rev_range: str, heading: str) -> None:
    """`git log --oneline <range>` under a heading; silent if git fails
    (non-critical), explicit when the range is empty."""
    try:
        log_result = run_command(
            ["git", "log", "--oneline", rev_range],
            cwd=SERVER_DIR,
            check=False,
        )
    except (subprocess.TimeoutExpired, subprocess.CalledProcessError, OSError):
        return
    if log_result.returncode != 0:
        return
    commits = log_result.stdout.strip().splitlines()
    if not commits:
        console.print(f"\n[bold]{heading}[/bold]: no commits in {rev_range}")
        return
    console.print(f"\n[bold]{heading}[/bold] ({len(commits)} commit{'s' if len(commits) != 1 else ''}):")
    for line in commits:
        console.print(f"  {line}")
    console.print()


def _report_service_file_update(update: ServiceFileUpdate) -> None:
    if update.status == "updated":
        console.print(f"Updated service file {update.path} (previous kept at {update.backup}):")
        for line in update.diff:
            console.print(f"  {line}", markup=False, highlight=False)
    elif update.status == "unchanged":
        console.print("  [dim]Service file is up to date.[/dim]")
    else:
        console.print(f"  [yellow]Service file not updated: {escape(update.reason)}.[/yellow]")
        console.print("  [dim]It is used as it is. Server settings such as OAUTH_ENABLED belong in "
                      "'chaotic system config set' (see 'chaotic system config list').[/dim]")
        if get_os() == "linux":
            console.print("  [dim]Other settings of your own belong in a drop-in "
                          "(systemctl --user edit chaotic) so future upgrades can update the unit.[/dim]")


def _roll_back(
    current_commit: str | None, backup_path: Path | None,
    port: int | None = None, host: str = "127.0.0.1", was_running: bool = True,
    service_update: ServiceFileUpdate | None = None,
) -> None:
    """Undo a failed upgrade: stop whatever is running, restore the previous
    checkout, the previous service file (if the upgrade rewrote it) and (if
    one was taken) the database backup, restart.

    The database step is skipped, loudly, if something still holds the port
    after the service was told to stop: that is exactly the CHT-1363 case
    (a process the service unit does not own), and copying a backup over a
    file that process has open would lose the restore or corrupt the file.
    """
    # A stop still in progress reads as "not active" and uvicorn closes its
    # listener on SIGTERM, so neither database_in_use() nor the port proves
    # the dying process has let go of the database. Restore only after a
    # stop that succeeded AND settled to a state with no process.
    stopped = stop_service()
    state = wait_for_service_settled()
    if current_commit:
        checkout_version(current_commit, force=True)
    if service_update is not None and service_update.status == "updated":
        if restore_service_file(service_update):
            console.print(f"Restored the previous service file from {service_update.backup}.")
        else:
            console.print(
                f"[red]Could not restore the previous service file; it is at {service_update.backup}.[/red]"
            )
    if backup_path:
        if database_in_use(port, host):
            console.print(
                f"[red]NOT restoring the database backup: something is still running against it"
                f"{f' (port {port} is in use)' if port is not None else ''}. "
                f"Stop it, then restore by hand: chaotic system backup --restore {backup_path.name}[/red]"
            )
        elif not (stopped and state in _STOPPED_STATES):
            console.print(
                f"[red]NOT restoring the database backup: the server did not stop cleanly "
                f"(service state '{state}'), so it may still have the database open. "
                f"Stop it, then restore by hand: chaotic system backup --restore {backup_path.name}[/red]"
            )
        elif not restore_backup(backup_path, port=port, host=host):
            console.print(f"[red]Database restore failed. Backup is at {backup_path}[/red]")
    if not was_running:
        console.print(
            "[yellow]The server was not running before this upgrade; starting the previous "
            "version anyway so it is not left down.[/yellow]"
        )
    if not start_service():
        console.print("[red]CRITICAL: Failed to restart server after rollback. Manual intervention required.[/red]")
    else:
        console.print("[yellow]Rolled back to previous version.[/yellow]")
    _print_service_state(port, host)


@system.command("upgrade")
@click.option("--version", "target_version", default=None, help="Version to upgrade to (default: latest)")
@click.option("--no-backup", is_flag=True, help="Skip database backup (not recommended)")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompts")
@click.option("--fake-initial", is_flag=True, help="Fake-apply initial migration (for pre-Oxyde databases)")
@click.option(
    "--allow-downgrade", is_flag=True,
    help="Permit a target that is older than (or diverged from) the deployed commit. "
         "Off by default: an upgrade must never move a server backwards by accident (CHT-1357).",
)
def system_upgrade(target_version, no_backup, yes, fake_initial, allow_downgrade):
    """Upgrade to a new version.

    This command:
    1. Backs up your database (unless --no-backup)
    2. Stops the server
    3. Pulls and checks out the new version
    4. Syncs dependencies and runs database migrations
    5. Regenerates the systemd unit / launchd plist when what this CLI
       would write differs and only adds settings (backing up the old
       file to ~/.chaotic/service-backups and printing a redacted
       diff); rollback restores that backup
    6. Starts the server (even if it was stopped beforehand) and verifies
       /health
    7. Rolls back automatically (previous checkout, database backup,
       previous code restarted) if syncing, reinstalling the CLI or
       migrating fails, if the health check fails, or if the process
       answering the port is not running the new commit

    Refuses to move the server to an older or diverged commit unless
    --allow-downgrade is given: the default target is the newest tag on
    origin/main, and tags can fall behind what is deployed.

    If migrations fail with "already exists", your database predates the
    migration system. Re-run with --fake-initial to mark the initial schema
    as already applied, then apply new migrations normally:

        chaotic system upgrade --fake-initial --yes

    The --fake-initial flag can be used even when already on the latest
    code version — it will skip the checkout but still run migrations.
    """
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        console.print("Run 'chaotic system install' first.")
        raise SystemExit(1)

    # Validate version if provided (security)
    if target_version and not validate_git_ref(target_version):
        console.print(f"[red]Invalid version: {target_version}[/red]")
        console.print("Version must be a valid git tag or branch name.")
        raise SystemExit(1)

    # Get current version
    current_version = get_current_version()
    current_commit = get_current_commit()
    console.print(f"Current version: {current_version or 'unknown'}")

    # Fetch updates
    console.print("Fetching updates...")
    if not fetch_updates():
        console.print("[red]Failed to fetch updates.[/red]")
        raise SystemExit(1)

    # Determine target version
    target_was_default = target_version is None
    if target_version is None:
        target_version = get_latest_version()
        if target_version is None:
            # Fall back to origin/main if no tags
            target_version = "origin/main"

    console.print(f"Target version:  {target_version}")

    target_commit = resolve_commit(target_version)
    if target_commit is None:
        console.print(f"[red]Unknown version: {target_version}[/red] (not a tag, branch, or commit in the server checkout)")
        raise SystemExit(1)

    # An upgrade must never move the server backwards by accident (CHT-1357):
    # the default target is the newest tag, and tags can lag origin/main --
    # production once sat 13 days AHEAD of the newest tag, so a bare
    # `system upgrade` would have checked out older code, shown an empty
    # changelog, passed its health check and reported success.
    direction = upgrade_direction(current_commit, target_commit)
    if direction in ("backward", "diverged"):
        current_desc = describe_commit(current_commit)
        target_desc = describe_commit(target_commit)
        if direction == "backward":
            console.print(
                f"\n[red]Target {target_desc} is OLDER than the deployed commit {current_desc}:[/red] "
                "it is an ancestor of what is running, so this would be a downgrade, not an upgrade."
            )
            _print_commit_list(f"{target_commit}..{current_commit}", "Commits that would be REMOVED")
        else:
            console.print(
                f"\n[red]Target {target_desc} does not descend from the deployed commit {current_desc}:[/red] "
                "the histories have diverged, so this is not an upgrade."
            )
        if not allow_downgrade:
            if target_was_default:
                console.print(
                    "The newest tag is behind what is deployed. To deploy main instead: "
                    "chaotic system upgrade --version origin/main"
                )
            console.print("To roll back deliberately: chaotic system upgrade --version <ref> --allow-downgrade")
            raise SystemExit(1)
        console.print("[yellow]Proceeding anyway because --allow-downgrade was given.[/yellow]\n")
    elif direction == "forward":
        _print_commit_list(f"{current_commit}..{target_commit}", "Changelog")
    elif direction == "unknown":
        console.print(
            "[yellow]Could not determine where the deployed checkout sits relative to the target "
            "(no current commit, or git could not answer), so the downgrade check is skipped.[/yellow]"
        )

    # Check if already on target (commit identity, not version-string
    # equality: `describe --tags --always` output and a tag name only agree
    # when HEAD sits exactly on the tag).
    already_current = direction == "same" or (direction == "unknown" and current_version == target_version)
    if already_current and not fake_initial:
        console.print("\n[green]Already on the latest version.[/green]")
        raise SystemExit(0)

    # Stop server FIRST (before backup to ensure consistent db state).
    # Stop anything that is not settled-stopped (CHT-1474): a crash-looping
    # unit sits in "activating" (auto-restart) and is not "running", but
    # systemd keeps relaunching it through the backup, checkout and migrate.
    state = service_state()
    was_running = is_service_running()
    must_stop = was_running or state not in _STOPPED_STATES
    server_info = load_server_json()
    port = server_info.get("port", DEFAULT_PORT)
    host = server_info.get("host", "127.0.0.1")
    # CHT-1364: what MCP toolset the running server serves, so the success
    # message can say definitively whether MCP clients must reconnect.
    version_before = get_remote_version(port, host=host) if was_running else None
    version_after = None
    if must_stop:
        console.print("Stopping server..." if was_running else f"Stopping server (service state '{state}')...")
        if not stop_service():
            # CHT-1474: nothing has been changed yet; make sure the server
            # is back up (or say plainly that it is not) before giving up.
            _handle_failed_stop(port, host)
            console.print("Nothing was changed. Retry the upgrade once the server can be stopped.")
            raise SystemExit(1)
        if not wait_for_service_stop(timeout=10):
            console.print("[yellow]Warning: Service may still be stopping[/yellow]")

    # Confirm action
    if not yes:
        if already_current:
            action = "Run migrations with --fake-initial?"
        else:
            action = f"Upgrade from {current_version} to {target_version}?"
        if not _confirm_action(f"\n{action}"):
            console.print("[yellow]Cancelled.[/yellow]")
            if was_running:
                console.print("Starting server again...")
                if not (start_service() and health_check(port, host=host)):
                    console.print("[red]The server did not come back up.[/red]")
                    _print_service_state(port, host)
                    raise SystemExit(1)
            _print_service_state(port, host)
            raise SystemExit(0)

    console.print()

    # Backup database (now safe since server is stopped)
    backup_path = None
    if not no_backup and DATABASE_PATH.exists():
        console.print("Backing up database...")
        try:
            backup_path = create_backup()
        except BackupError as e:
            console.print(f"[red]{e}[/red]")
            console.print("Nothing was changed. Fix the backup problem or pass --no-backup deliberately.")
            if was_running:
                start_service()
            _print_service_state(port, host)
            raise SystemExit(1)
        if backup_path:
            console.print(f"  [dim]{backup_path}[/dim]")
            cleanup_old_backups()
        else:
            console.print("  [dim]No database to backup[/dim]")

    if already_current:
        console.print("Already on latest code. Running migrations...")
    else:
        # Checkout new version (force to handle dirty state from uv sync etc.)
        console.print(f"Checking out {target_version}...")
        ok, err = checkout_version(target_version, force=True)
        if not ok:
            console.print(f"[red]Failed to checkout version.[/red]")
            if err:
                console.print(f"  [dim]{err}[/dim]")
            # Rollback
            if current_commit:
                console.print("Rolling back...")
                checkout_version(current_commit, force=True)
            if was_running:
                if not start_service():
                    console.print("[red]CRITICAL: Failed to restart server after rollback. Manual intervention required.[/red]")
            _print_service_state(port, host)
            raise SystemExit(1)

    # Sync dependencies and run database migrations
    console.print("Syncing dependencies and running migrations...")
    success, message = run_migrations(fake_initial=fake_initial)
    if not success:
        # escape(): the message carries the command's own output.
        console.print(f"[red]{escape(message)}[/red]")
        # CHT-1477: a migration run that failed partway can leave the
        # database between schemas (each migration is transactional, a run
        # of several is not), and neither the new code nor the old one
        # serves that. Undo it like any other post-checkout failure: the
        # previous checkout, the backup (under _roll_back's guards), the
        # previous code restarted and checked.
        console.print("Migrations did not complete. Rolling back...")
        _roll_back(current_commit, backup_path, port=port, host=host, was_running=was_running)
        if backup_path is None and DATABASE_PATH.exists():
            console.print(
                "[red]No database backup was taken (--no-backup), so the database was NOT restored "
                "and may be partially migrated. The previous code refuses to start against "
                "migrations it does not know, and the new code against missing ones.[/red]"
            )
            console.print(
                "To recover, either restore a backup you trust "
                "('chaotic system backup --list', then 'chaotic system backup --restore <timestamp>'), "
                "or fix the cause above and run the upgrade again to finish migrating forward. "
                f"'uv run --frozen oxyde showmigrations' in {PROJECT_DIR / 'backend'} "
                f"(with DATABASE_URL=sqlite+aiosqlite:///{DATABASE_PATH}) shows what was applied."
            )
        console.print("Fix the issue above, then run 'chaotic system upgrade --yes' again.")
        raise SystemExit(1)
    console.print(f"  [dim]{escape(message)}[/dim]")

    # Rebuild frontend bundle so it matches the updated src/. Non-fatal: the
    # committed bundle (if a PR remembered to commit it) is still served.
    console.print("Rebuilding frontend...")
    fe_ok, fe_msg = rebuild_frontend()
    if fe_ok:
        console.print(f"  [dim]{fe_msg}[/dim]")
    else:
        console.print(f"  [yellow]{fe_msg}[/yellow]")
        console.print("  [yellow]Continuing; UI may be stale until the next successful build.[/yellow]")

    # Regenerate the service file while the server is down (CHT-1476):
    # install and reconfigure were the only writers, so fixes to the unit
    # never reached existing installs. No-op when nothing differs.
    console.print("Checking service file...")
    # Settings never stop an upgrade (PR #349 review): an entry the server
    # would refuse is named and left out of the regenerated file (which
    # then keeps the file as it is if that would drop it), and anything
    # unexpected is reported by type, never value, before the start.
    try:
        bad_settings = server_settings.invalid_settings(server_info)
        settings_errors, _ = server_settings.check(server_info)
        service_update = reconcile_service_file(
            port, host, server_info.get("secret_key", ""), settings=server_settings.valid_settings(server_info))
    except Exception as e:  # noqa: BLE001
        bad_settings, settings_errors = [], []
        service_update = ServiceFileUpdate("skipped", reason=f"checking server settings failed ({type(e).__name__})")
    _report_service_file_update(service_update)
    if bad_settings:
        console.print(f"  [yellow]Left out of the service file (invalid in server.json): "
                      f"{escape(', '.join(bad_settings))}. See 'chaotic system config check'.[/yellow]")
    # Including a setting saved with `system config set --force` the
    # server cannot start with: say so before the start fails.
    _print_problems(settings_errors, [])

    # Start server, whatever state the upgrade found it in (CHT-1475): an
    # upgrade ends with the server running the new commit and verified, or
    # it fails saying so. A server stopped by hand beforehand used to be
    # left down behind an "Upgraded to" message.
    if not was_running:
        console.print("Starting server (it was not running before the upgrade)...")
    else:
        console.print("Starting server...")
    if not start_service():
        console.print("[red]Failed to start server.[/red]")
        console.print("Rolling back...")
        _roll_back(current_commit, backup_path, port=port, host=host, was_running=was_running,
                   service_update=service_update)
        raise SystemExit(1)

    # Health check
    console.print("Waiting for health check...", end=" ")
    if not health_check(port, host=host):
        console.print("[red]FAILED[/red]")
        console.print("\nHealth check failed. Rolling back...")
        _roll_back(current_commit, backup_path, port=port, host=host, was_running=was_running,
                   service_update=service_update)
        raise SystemExit(1)
    console.print("[green]OK[/green]")

    # Liveness is not identity (CHT-1363): /health answering proves that
    # SOMETHING is on the port. If the new process failed to start while
    # an old one still held the port, the old code passes the health
    # check and "Upgraded to X" would be a lie. /health reports the
    # commit it is running; insist it is the one we checked out.
    new_commit = get_current_commit()
    if new_commit:
        console.print("Verifying the new process took over...", end=" ")
        matched, served = verify_deployed_commit(port, new_commit, host=host)
        if matched is False:
            console.print("[red]FAILED[/red]")
            console.print(
                f"\nPort {port} is answering, but with {served}, not "
                f"{new_commit[:7]}: the new process did not take over. Rolling back..."
            )
            _roll_back(current_commit, backup_path, port=port, host=host, was_running=was_running,
                       service_update=service_update)
            raise SystemExit(1)
        if matched is None:
            # A server too old to report git_sha (before 4a9db89) or a
            # git-less host. Nothing on the port disagreed with us, but
            # nothing confirmed us either; say so instead of failing a
            # deliberate downgrade that can never pass this check.
            console.print("[yellow]UNVERIFIED[/yellow]")
            console.print(
                f"  /health on port {port} reports no git_sha, so whether the new process took over "
                "could not be confirmed. Check `chaotic system status` after this finishes."
            )
        else:
            console.print("[green]OK[/green]")
    version_after = get_remote_version(port, host=host)
    if version_after and version_after.get("git_dirty"):
        console.print("[yellow]Warning: the server checkout has uncommitted changes (git_dirty).[/yellow]")

    # Success
    new_version = get_current_version()
    console.print()
    console.print(f"[bold green]Upgraded to {new_version}[/bold green]")
    console.print(_mcp_reconnect_note(version_before, version_after))


@system.command("backup")
@click.option("--list", "list_mode", is_flag=True, help="List available backups")
@click.option("--restore", "restore_timestamp", default=None, help="Restore from backup (timestamp or 'latest')")
def system_backup(list_mode, restore_timestamp):
    """Manage database backups.

    Without options, creates a new backup.
    Use --list to see available backups.
    Use --restore to restore from a backup.
    """
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        raise SystemExit(1)

    if list_mode:
        backups = list_backups()
        if not backups:
            console.print("[yellow]No backups found.[/yellow]")
            return

        console.print("[bold]Available backups:[/bold]")
        for i, backup in enumerate(backups):
            size_mb = backup.stat().st_size / (1024 * 1024)
            # Extract timestamp from filename
            timestamp = backup.name.replace("chaotic.db.backup-", "")
            age = ""
            if i == 0:
                age = " [dim](latest)[/dim]"
            console.print(f"  {timestamp}  ({size_mb:.1f} MB){age}")
        return

    if restore_timestamp:
        backups = list_backups()
        if not backups:
            console.print("[red]No backups found.[/red]")
            raise SystemExit(1)

        if restore_timestamp == "latest":
            backup_path = backups[0]
        else:
            backup_path = get_backup_path(restore_timestamp)
            if not backup_path.exists():
                console.print(f"[red]Backup not found: {restore_timestamp}[/red]")
                console.print("Run 'chaotic system backup --list' to see available backups.")
                raise SystemExit(1)

        console.print(f"Restoring from {backup_path.name}...")

        server_info = load_server_json()
        port = server_info.get("port", DEFAULT_PORT)
        host = server_info.get("host", "127.0.0.1")

        was_running = is_service_running()
        if was_running:
            console.print("Stopping server...")
            if not stop_service():
                _handle_failed_stop(port, host)
                console.print("Database NOT restored.")
                raise SystemExit(1)
            if not wait_for_service_stop(timeout=10):
                console.print("[yellow]Warning: Service may still be stopping[/yellow]")

        # restore_backup refuses while the service or anything on the port
        # is still up: a restore under a live connection is not a restore.
        if restore_backup(backup_path, port=port, host=host):
            console.print("[green]Database restored.[/green]")
        else:
            console.print("[red]Failed to restore backup.[/red]")
            if was_running:
                start_service()
            raise SystemExit(1)

        if was_running:
            console.print("Starting server...")
            start_service()
            console.print("Waiting for health check...", end=" ")
            if health_check(port, host=host):
                console.print("[green]OK[/green]")
            else:
                console.print("[yellow]TIMEOUT[/yellow]")
        return

    # Default: create backup
    if not DATABASE_PATH.exists():
        console.print("[yellow]No database to backup.[/yellow]")
        return

    # The backup API snapshots through the WAL, so a running server is
    # fine (CHT-1207); say so rather than asking the operator to stop it.
    if is_service_running():
        console.print("[dim]Server is running; taking a consistent snapshot with SQLite's online backup.[/dim]")

    console.print("Creating backup...")
    try:
        backup_path = create_backup()
    except BackupError as e:
        console.print(f"[red]{e}[/red]")
        raise SystemExit(1)
    if backup_path:
        size_mb = backup_path.stat().st_size / (1024 * 1024)
        console.print(f"[green]Backup created: {backup_path.name} ({size_mb:.1f} MB)[/green]")
        cleanup_old_backups()
    else:
        console.print("[red]Failed to create backup.[/red]")
        raise SystemExit(1)


# --- Server settings (CHT-1592) -------------------------------------------
#
# server.json's "settings" map is the one supported place for server
# settings such as OAUTH_ENABLED and APP_BASE_URL. Every service file
# writer renders it, so a setting survives reconfigure and upgrade; a
# setting is never read back from the service file.


def _dropin_dir() -> Path:
    return get_systemd_user_dir() / f"{SYSTEMD_SERVICE}.d"


def _read_dropins() -> list[tuple[str, _ParsedService | None]]:
    """Each systemd drop-in (chaotic.service.d/*.conf) in the order
    systemd applies them, after the unit: by file name, so a later one
    wins. None for one that cannot be read or parsed."""
    if get_os() != "linux":
        return []
    try:
        files = sorted(_dropin_dir().glob("*.conf"))
    except OSError:
        return []
    found = []
    for conf in files:
        try:
            parsed = _parse_systemd_unit(conf.read_text())
        except (OSError, UnicodeDecodeError):
            parsed = None
        found.append((conf.name, parsed))
    return found


def _dropin_settings() -> dict[str, list[str]]:
    """Variable name -> the systemd drop-ins that set it ("?" -> the ones
    that could not be read). A drop-in is applied after the unit, so it
    wins over server.json."""
    found: dict[str, list[str]] = {}
    for name, parsed in _read_dropins():
        for var in (parsed.env if parsed else ["?"]):
            found.setdefault(var, []).append(name)
    return found


def _dropin_env() -> dict[str, tuple[str, str]]:
    """Variable name -> (value, drop-in it comes from) for what the
    drop-ins set, the last drop-in winning as in systemd."""
    found: dict[str, tuple[str, str]] = {}
    for name, parsed in _read_dropins():
        for var, value in (parsed.env if parsed else {}).items():
            found[var] = (value, name)
    return found


def _setting_env(env: dict[str, str]) -> dict[str, str]:
    """`env` without the variables every service file sets itself."""
    return {k: v for k, v in env.items() if k not in _IDENTITY_ENV_KEYS and k != "PATH"}


def _service_file_env() -> dict[str, str] | None:
    """The environment the service file on disk sets, or None if there is
    no readable, parseable one."""
    os_type = get_os()
    if os_type not in ("linux", "darwin"):
        return None
    try:
        parsed = _parse_service(get_service_file_path().read_text(), os_type)
    except (OSError, UnicodeDecodeError, RuntimeError):
        return None
    return parsed.env if parsed else None


def _dotenv_settings() -> dict[str, str]:
    """What backend/.env in the install sets (the server's fallback: any
    variable the service file sets wins over it)."""
    try:
        return server_settings.parse_dotenv_names((PROJECT_DIR / "backend" / ".env").read_text())
    except (OSError, UnicodeDecodeError):
        return {}


def _settings_notes(settings: dict[str, str]) -> list[str]:
    """Where the service file, a drop-in or backend/.env disagrees with
    server.json about a setting. Names only, never values."""
    notes = []
    unit_env = _service_file_env()
    if unit_env is not None:
        for name in sorted(settings):
            if unit_env.get(name) != settings[name]:
                notes.append(f"{name}: the service file does not say what server.json says. "
                             f"Run 'chaotic system config set {name} ...' again to rewrite it.")
        for name in sorted(set(_setting_env(unit_env)) - set(settings)):
            adopt = "adopt" if name in server_settings.KNOWN else f"adopt {name} --force"
            notes.append(f"{name}: set in the service file by hand, not in server.json, so "
                         "'chaotic system upgrade' will not update the file while it is there. "
                         f"Adopt it with 'chaotic system config {adopt}'.")
    dropin_env = _dropin_env()
    for name, files in sorted(_dropin_settings().items()):
        where = f"drop-in {', '.join(files)}"
        if name == "?":
            notes.append(f"Could not read drop-in {', '.join(files)} in {_dropin_dir()}.")
        elif name in settings and dropin_env[name][0] == settings[name]:
            notes.append(f"{name}: also set in {where}, to the same value. Delete it there so "
                         "server.json alone sets it.")
        elif name in settings:
            notes.append(f"{name}: also set in {where}, which overrides server.json.")
        elif name in server_settings.KNOWN:
            notes.append(f"{name}: set in {where}, not in server.json. Adopt it with "
                         "'chaotic system config adopt', then delete it from the drop-in.")
    dotenv = _dotenv_settings()
    for name in sorted(dotenv):
        if name in settings:
            notes.append(f"{name}: also set in {PROJECT_DIR / 'backend' / '.env'}, where the service "
                         "file's value overrides it. Remove it there to avoid confusion.")
        elif name in server_settings.KNOWN:
            notes.append(f"{name}: set in {PROJECT_DIR / 'backend' / '.env'}, not in server.json. "
                         f"Move it with 'chaotic system config set {name} <value>' and delete the line.")
    return notes


def _dropin_problems() -> tuple[list[str], list[str]]:
    """Drop-ins this CLI cannot account for: one that sets what the
    server is (HOST, PORT, SECRET_KEY, its database, PATH), which wins
    over both the service file and server.json and so defeats
    'system reconfigure', or one that resets or unsets the environment
    or reads an EnvironmentFile, which `check` cannot see through.
    Returns (identity problems, the rest)."""
    identity_problems, problems = [], []
    for name, parsed in _read_dropins():
        if parsed is None:
            continue
        identity = sorted(k for k in parsed.env if k in _IDENTITY_ENV_KEYS or k == "PATH")
        if identity:
            identity_problems.append(
                f"Drop-in {name} sets {', '.join(identity)}, which overrides the service file and "
                "server.json, so 'chaotic system reconfigure' cannot change it. Remove it from the "
                f"drop-in ({_dropin_dir()}) and use 'chaotic system reconfigure'.")
        resets = [*parsed.unsafe, *(["it sets UnsetEnvironment"] if any(
            key == "UnsetEnvironment" for _, key in parsed.directives) else [])]
        if resets:
            problems.append(f"Drop-in {name}: {'; '.join(resets)}, so the settings checked here may "
                            "not be the ones the server gets.")
    return identity_problems, problems


def _identity_mismatch(server_info: dict) -> dict[str, tuple[str | None, str | None]] | None:
    """{key: (server.json's, the service file's)} for each identity key
    (HOST, PORT, SECRET_KEY, the database, WorkingDirectory) they
    disagree on, or None if there is no service file to compare."""
    os_type = get_os()
    if os_type not in ("linux", "darwin"):
        return None
    try:
        have = _parse_service(get_service_file_path().read_bytes().decode(), os_type)
        generate = generate_systemd_service if os_type == "linux" else generate_launchd_plist
        want = _parse_service(generate(server_info.get("port", DEFAULT_PORT),
                                       server_info.get("secret_key") or "<none>",
                                       server_info.get("host", "127.0.0.1"),
                                       server_settings.valid_settings(server_info)), os_type)
    except Exception:  # noqa: BLE001 -- unreadable or ungenerable: nothing to compare
        return None
    if have is None or want is None:
        return None
    have_id, want_id = have.identity(), want.identity()
    have_id.setdefault("HOST", _JUSTFILE_DEFAULT_HOST)  # as in _rewrite_blockers
    if not server_info.get("secret_key"):
        want_id.pop("SECRET_KEY", None)
    return {k: (want_id.get(k), have_id.get(k)) for k in _SERVICE_IDENTITY_KEYS if have_id.get(k) != want_id.get(k)}


def _identity_drift(server_info: dict) -> list[str]:
    """Where the service file disagrees with server.json about what the
    server is: HOST and PORT (shown), SECRET_KEY, the database or the
    working directory (named only). While they disagree, 'system config
    set' and 'system upgrade' leave the file alone, and 'system
    reconfigure' writes server.json's values into it (CHT-1676). Also a
    drop-in that sets any of them."""
    mismatch = _identity_mismatch(server_info) or {}
    problems = []
    for key, flag in (("HOST", "--host"), ("PORT", "--port")):
        if key in mismatch:
            want, have = mismatch[key]
            problems.append(
                f"server.json says {key} {want} but the service file says {have}. "
                "Until they agree, 'chaotic system config set' and 'chaotic system upgrade' leave the "
                "service file as it is, and 'chaotic system reconfigure' would write server.json's "
                f"{key} into it. Make them agree with 'chaotic system reconfigure {flag} <the one you want>'.")
    others = [k for k in mismatch if k not in ("HOST", "PORT")]
    if others:
        problems.append(
            f"server.json and the service file disagree about {', '.join(others)}, so "
            "'chaotic system config set' and 'chaotic system upgrade' leave the service file as it is. "
            f"Edit {SERVER_JSON} to match the service file (or restore it from a backup).")
    return problems + _dropin_problems()[0]


def _settings_problems(server_info: dict) -> tuple[list[str], list[str]]:
    """(errors, warnings) for `system config check` and `list`: the
    entries of server.json, the service file's identity against it, and
    the combination rules judged on what the server actually gets. That
    is the service file's environment with the drop-ins over it, and,
    where it differs, what a rewrite from server.json would give
    (CHT-1676: a capability URL turned off in a drop-in was reported as
    still served)."""
    if not is_server_installed():
        return server_settings.check(server_info)
    errors, warnings = server_settings.check(server_info, combination=False)
    errors = _identity_drift(server_info) + errors
    warnings = _dropin_problems()[1] + warnings
    dropins = _setting_env({name: value for name, (value, _) in _dropin_env().items()})
    # server.json's invalid entries are reported above; do not report
    # them again as missing, unless a drop-in sets them anyway.
    invalid = frozenset(server_settings.invalid_settings(server_info)) - set(dropins)
    after_rewrite = {**server_settings.valid_settings(server_info), **dropins}
    unit_env = _service_file_env()
    if unit_env is None:
        now_errors, now_warnings = server_settings.check_combination(after_rewrite, skip=invalid)
        next_errors, next_warnings = [], []
    else:
        now = {**_setting_env(unit_env), **dropins}
        now_errors, now_warnings = server_settings.check_combination(now)
        next_errors, next_warnings = (server_settings.check_combination(after_rewrite, skip=invalid)
                                      if after_rewrite != now else ([], []))
    later = "Once server.json is written to the service file: "
    errors += now_errors + [later + e for e in next_errors if e not in now_errors and e not in errors]
    warnings += now_warnings + [later + w for w in next_warnings if w not in now_warnings]
    return list(dict.fromkeys(errors)), list(dict.fromkeys(warnings))


def _print_problems(errors: list[str], warnings: list[str]) -> None:
    for error in errors:
        console.print(f"[red]Error:[/red] {escape(error)}")
    for warning in warnings:
        console.print(f"[yellow]Warning:[/yellow] {escape(warning)}")


def _restart_hint() -> None:
    if is_service_running():
        console.print("Restart the server to apply it: chaotic system stop && chaotic system start")
    else:
        console.print("[dim]The server is not running; it applies at the next 'chaotic system start'.[/dim]")


def _apply_settings(server_info: dict, settings: dict[str, str], owned: set[str], force: bool,
                    adopting: bool = False) -> None:
    """Save `settings` to server.json and rewrite the service file with
    them, refusing (unless forced) a combination the server would not
    start with. Exits non-zero if the service file could not be
    rewritten, since the server will not see the change."""
    candidate = {**server_info, SETTINGS_KEY: settings}
    raw = server_info.get(SETTINGS_KEY)
    dropped = sorted(name for name in (raw if isinstance(raw, dict) else {})
                     if name not in settings and name not in owned)
    errors, warnings = server_settings.check(candidate)
    if errors and not force:
        _print_problems(errors, [])
        hand_set = set(_service_file_env() or {}) | set(_dropin_env())
        for name in sorted(n for n in hand_set & set(server_settings.KNOWN) - set(settings)
                           if any(n in error for error in errors)):
            # Adopting hand-added lines: the server runs fine with this
            # one, server.json just does not have it yet.
            console.print(f"{name} is set in the service file or a drop-in by hand; adopt it first "
                          f"with 'chaotic system config adopt {name}', then run this again.")
        console.print("Nothing was changed. (--force saves it anyway.)")
        raise SystemExit(1)
    save_server_json(candidate)
    console.print("Saved to server.json.")
    for name in dropped:
        console.print(f"[yellow]Removed invalid server.json setting {escape(repr(name))}[/yellow] "
                      "(it was never written to the service file).")
    _print_problems(errors, warnings)

    update = reconcile_service_file(
        server_info.get("port", DEFAULT_PORT), server_info.get("host", "127.0.0.1"),
        server_info.get("secret_key", ""), settings=server_settings.valid_settings(candidate),
        owned=frozenset(owned))
    if update.status == "skipped":
        console.print(f"[yellow]Service file not updated: {escape(update.reason)}.[/yellow]")
        for problem in _identity_drift(candidate):
            console.print(escape(problem))
        if adopting:
            console.print(f"server.json now holds {', '.join(sorted(owned))}; the server keeps running with "
                          "the same values. Once what is in the way is fixed, 'chaotic system upgrade' or "
                          "the next 'config set' rewrites the service file. See 'chaotic system config list'.")
        else:
            console.print("The server will not see this setting until the service file carries it. "
                          "See 'chaotic system config list'.")
        raise SystemExit(1)
    if update.status == "updated":
        console.print(f"Updated service file {update.path} (previous kept at {update.backup}).")
    else:
        console.print("[dim]Service file already says this.[/dim]")
    for name in sorted(owned):
        files = _dropin_settings().get(name)
        if files:
            console.print(f"[yellow]Warning:[/yellow] {name} is also set in drop-in {', '.join(files)}, "
                          "which overrides this.")
    _restart_hint()


def _require_installed() -> dict:
    """server.json of an installed server, read strictly: `set`/`unset`
    rewrite the whole file, so one that does not parse, or has lost its
    secret_key, is refused rather than replaced (PR #349 review)."""
    if not is_server_installed():
        console.print("[red]Chaotic server is not installed.[/red]")
        console.print("Run 'chaotic system install' first (it takes --config NAME=VALUE).")
        raise SystemExit(1)
    try:
        server_info = json.loads(SERVER_JSON.read_text())
        problem = None if isinstance(server_info, dict) and server_info.get("secret_key") else "it has no secret_key"
    except FileNotFoundError:
        problem = "it does not exist"
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as e:
        problem = f"it cannot be read ({type(e).__name__})"
    if problem:
        console.print(f"[red]{SERVER_JSON}: {problem}.[/red]")
        console.print("Nothing was changed. Fix it or restore it from a backup first; it holds the "
                      "server's SECRET_KEY, host and port (the service file has the same values).")
        raise SystemExit(1)
    return server_info


@system.group("config")
def system_config():
    """Show and change server settings such as OAUTH_ENABLED and APP_BASE_URL.

    Settings are kept in ~/.chaotic/server.json and written into the
    service file (systemd unit / launchd plist) as environment variables,
    so they survive 'system reconfigure' and 'system upgrade'. Values of
    secret settings are never printed.
    """


@system_config.command("list")
def system_config_list():
    """List settings: what server.json sets, and the defaults of the rest."""
    server_info = load_server_json()
    settings = stored_settings(server_info)
    width = max(len(name) for name in [*server_settings.KNOWN, *settings])
    console.print("[bold]Server settings[/bold] (~/.chaotic/server.json)")
    for name in sorted(set(server_settings.KNOWN) | set(settings)):
        if name in settings:
            shown = server_settings.display_value(name, settings[name])
            console.print(f"  {name:<{width}}  {escape(shown)}", highlight=False)
        else:
            default = server_settings.KNOWN[name].default
            console.print(f"  {name:<{width}}  [dim]not set (server default: {escape(default or '<empty>')})[/dim]",
                          highlight=False)
    notes = _settings_notes(settings) if is_server_installed() else []
    if notes:
        console.print()
        for note in notes:
            console.print(f"[yellow]Note:[/yellow] {escape(note)}")
    errors, warnings = _settings_problems(server_info)
    if errors or warnings:
        console.print()
        _print_problems(errors, warnings)


@system_config.command("get")
@click.argument("name")
def system_config_get(name):
    """Print one setting's value (exit 1 if it is not set).

    A secret setting's value is never printed, only whether it is set.
    """
    name = name.upper()
    settings = stored_settings(load_server_json())
    if name not in settings:
        known = server_settings.KNOWN.get(name)
        default = f"; the server default is {known.default or '<empty>'}" if known else ""
        click.echo(f"{name} is not set in server.json{default}", err=True)
        raise SystemExit(1)
    if server_settings.is_secret(name):
        click.echo(f"{name} is set (secret; not shown)", err=True)
        return
    click.echo(settings[name])


@system_config.command("set")
@click.argument("name")
@click.argument("value")
@click.option("--force", is_flag=True,
              help="Set a name this CLI does not know, or save despite errors the server would not start with")
def system_config_set(name, value, force):
    """Set a server setting and write it into the service file.

    \b
    Examples:
      chaotic system config set APP_BASE_URL https://chaotic.example.com
      chaotic system config set OAUTH_ENABLED true
      chaotic system config set MCP_CAPABILITY_URL_ENABLED false
      chaotic system config set SMTP_PASSWORD - < password-file

    A VALUE of - reads it from standard input (one trailing newline is
    dropped), which keeps a secret out of shell history and the process
    list. Takes effect when the server restarts.
    """
    name = name.upper()
    server_info = _require_installed()
    if value == "-":
        value = sys.stdin.read()
        value = value[:-1] if value.endswith("\n") else value
        value = value[:-1] if value.endswith("\r") else value
    problem = server_settings.name_problem(name, force)
    if problem:
        console.print(f"[red]{escape(problem)}[/red]")
        raise SystemExit(1)
    value, problem = server_settings.normalize(name, value)
    if problem:
        console.print(f"[red]{escape(problem)}[/red]")
        raise SystemExit(1)
    settings = stored_settings(server_info)
    settings[name] = value
    console.print(f"{name} = {escape(server_settings.display_value(name, value))}", highlight=False)
    _apply_settings(server_info, settings, {name}, force)


@system_config.command("unset")
@click.argument("name")
@click.option("--force", is_flag=True, help="Remove it even though the server would not start without it")
def system_config_unset(name, force):
    """Remove a setting, so the server uses its default again."""
    name = name.upper()
    server_info = _require_installed()
    settings = stored_settings(server_info)
    raw = server_info.get(SETTINGS_KEY)
    if name not in settings and not (isinstance(raw, dict) and name in raw):
        console.print(f"[yellow]{escape(name)} is not set in server.json.[/yellow]")
        return
    settings.pop(name, None)
    _apply_settings(server_info, settings, {name}, force)


@system_config.command("adopt")
@click.argument("names", nargs=-1)
@click.option("--force", is_flag=True,
              help="Adopt a name this CLI does not know, or save despite errors the server would not start with")
def system_config_adopt(names, force):
    """Move settings set by hand in the service file or a drop-in into server.json.

    \b
    Examples:
      chaotic system config adopt
      chaotic system config adopt CORS_ORIGINS APP_BASE_URL

    With no NAME, adopts every known setting that the service file or a
    drop-in sets and server.json does not. Name a setting to adopt it
    even where server.json holds another value, or (with --force) one
    this CLI does not know. The value adopted is the one the server runs
    with: a drop-in's wins over the service file's. The service file is
    then rewritten from server.json, so 'system upgrade' can manage it
    again. Drop-ins are never edited; delete the adopted lines from them
    afterwards.
    """
    server_info = _require_installed()
    settings = stored_settings(server_info)
    unit_env = _setting_env(_service_file_env() or {})
    found = {name: (value, "the service file") for name, value in unit_env.items()}
    found.update({name: (value, f"drop-in {conf}") for name, (value, conf) in _dropin_env().items()
                  if name not in _IDENTITY_ENV_KEYS and name != "PATH"})
    if names:
        wanted = []
        for name in (n.upper() for n in names):
            reserved = server_settings.name_problem(name, force=True)
            if reserved:  # HOST, PATH, ...: say why, not "not set"
                console.print(f"[red]{escape(reserved)}[/red]")
                raise SystemExit(1)
            if name not in found:
                console.print(f"[red]{escape(name)} is not set in the service file or a drop-in.[/red]")
                raise SystemExit(1)
            problem = server_settings.name_problem(name, force)
            if problem:
                console.print(f"[red]{escape(problem)}[/red]")
                raise SystemExit(1)
            wanted.append(name)
    else:
        known = [n for n in sorted(found) if n in server_settings.KNOWN]
        wanted = [n for n in known if n not in settings]
        for name in (n for n in known if n in settings and settings[n] != found[n][0]):
            console.print(f"[dim]{name}: server.json holds another value than {found[name][1]}; "
                          f"'chaotic system config adopt {name}' takes {found[name][1]}'s.[/dim]")
        for name in (n for n in sorted(found) if n not in server_settings.KNOWN and n not in settings):
            console.print(f"[dim]{name}: not a setting this CLI knows; "
                          f"'chaotic system config adopt {name} --force' adopts it.[/dim]")
    adopted = {}
    for name in wanted:
        value, problem = server_settings.normalize(name, found[name][0])
        if problem and names:
            console.print(f"[red]{escape(problem)}[/red] (in {found[name][1]})")
            console.print("Nothing was changed. Correct it there, or set it with 'chaotic system config set'.")
            raise SystemExit(1)
        if problem:
            console.print(f"[yellow]Not adopting {name}:[/yellow] {escape(problem)} (in {found[name][1]}). "
                          "Correct it there, or set it with 'chaotic system config set'.")
            continue
        adopted[name] = value
    if wanted and not adopted:
        console.print("Nothing was changed.")
        raise SystemExit(1)
    if not adopted:
        console.print("Nothing to adopt: server.json already holds every setting the service file "
                      "and its drop-ins set.")
        return
    for name, value in adopted.items():
        console.print(f"{name} = {escape(server_settings.display_value(name, value))} "
                      f"(from {found[name][1]})", highlight=False)
    _apply_settings(server_info, {**settings, **adopted}, set(adopted), force, adopting=True)
    for name in (n for n in adopted if found[n][1].startswith("drop-in")):
        console.print(f"server.json now holds {name}: delete it from {found[name][1]} "
                      f"in {_dropin_dir()}, then run 'systemctl --user daemon-reload'.")


@system_config.command("check")
def system_config_check():
    """Check the settings for mistakes (exit 1 on an error).

    An error is something the server would not start with, such as
    OAUTH_ENABLED=true without an https APP_BASE_URL, or a service file
    whose HOST or PORT is not the one server.json says. Settings are
    judged as the server gets them: the service file with its drop-ins.
    """
    server_info = load_server_json()
    errors, warnings = _settings_problems(server_info)
    notes = _settings_notes(stored_settings(server_info)) if is_server_installed() else []
    _print_problems(errors, warnings)
    for note in notes:
        console.print(f"[yellow]Note:[/yellow] {escape(note)}")
    if errors:
        raise SystemExit(1)
    if not (warnings or notes):
        console.print("[green]Settings look right.[/green]")
