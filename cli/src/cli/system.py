"""System commands for self-hosted server management.

The system commands manage the lifecycle of a local Chaotic server installation:
install, start, stop, status, upgrade, migrate, logs, uninstall.

These commands orchestrate existing tools (git, systemd/launchd, just, uv)
rather than bundling the server.
"""
import html
import json
import os
import platform
import re
import secrets
import shlex
import shutil
import subprocess
import time
from pathlib import Path
from typing import Literal

import click
from rich.console import Console

from .config import GLOBAL_CONFIG_DIR, DEFAULT_PORT, set_api_url


def _confirm_action(prompt: str, **kwargs) -> bool:
    """Prompt for confirmation, auto-accepting if --yes flag is set (CHT-436)."""
    ctx = click.get_current_context(silent=True)
    if ctx and ctx.obj and ctx.obj.get('yes'):
        return True
    return _confirm_action(prompt, **kwargs)


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
) -> subprocess.CompletedProcess:
    """Run a shell command with optional output capture.

    Args:
        cmd: Command to run as list of strings
        cwd: Working directory
        capture: Whether to capture stdout/stderr
        check: Whether to raise on non-zero exit
        timeout: Maximum seconds to wait (default 60, None for no timeout)

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
    """Save server metadata to server.json."""
    GLOBAL_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    with open(SERVER_JSON, "w") as f:
        json.dump(data, f, indent=2)
    # Restrict permissions since server.json contains SECRET_KEY
    os.chmod(SERVER_JSON, 0o600)


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


def generate_systemd_service(port: int, secret_key: str, host: str = "127.0.0.1") -> str:
    """Generate systemd user service file content.

    Paths are quoted to handle spaces and special characters safely.
    systemd uses a minimal PATH, so we explicitly include common tool paths.
    """
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
Environment=PATH={extra_paths}:/usr/bin:/bin
Environment=DATABASE_URL={database_url}
Environment=DATABASE_PATH={database_path}
Environment=HOST={host}
Environment=PORT={port}
Environment=SECRET_KEY={secret_key}

[Install]
WantedBy=default.target
"""


def generate_launchd_plist(port: int, secret_key: str, host: str = "127.0.0.1") -> str:
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
    </dict>
    <key>StandardOutPath</key>
    <string>{logs_dir}/server.log</string>
    <key>StandardErrorPath</key>
    <string>{logs_dir}/server.log</string>
</dict>
</plist>
"""


def write_service_file(port: int, secret_key: str, host: str = "127.0.0.1"):
    """Write the appropriate service file for the current OS."""
    os_type = get_os()
    service_path = get_service_file_path()
    service_path.parent.mkdir(parents=True, exist_ok=True)

    if os_type == "linux":
        content = generate_systemd_service(port, secret_key, host)
    elif os_type == "darwin":
        content = generate_launchd_plist(port, secret_key, host)
    else:
        raise RuntimeError(f"Unsupported OS: {os_type}")

    with open(service_path, "w") as f:
        f.write(content)

    # Restrict permissions - service files contain SECRET_KEY
    os.chmod(service_path, 0o600)

    return service_path


def start_service() -> bool:
    """Start the server service. Returns True on success."""
    os_type = get_os()
    try:
        if os_type == "linux":
            # Enable lingering so user services survive SSH logout
            run_command(["loginctl", "enable-linger", os.environ.get("USER", "")], check=False)
            run_command(["systemctl", "--user", "daemon-reload"])
            run_command(["systemctl", "--user", "enable", SYSTEMD_SERVICE])
            run_command(["systemctl", "--user", "start", SYSTEMD_SERVICE])
        elif os_type == "darwin":
            plist_path = get_service_file_path()
            # Unload first in case it's already loaded (ignore errors)
            run_command(["launchctl", "unload", str(plist_path)], check=False)
            run_command(["launchctl", "load", str(plist_path)])
        else:
            return False
        return True
    except subprocess.CalledProcessError:
        return False


def stop_service() -> bool:
    """Stop the server service. Returns True on success."""
    os_type = get_os()
    try:
        if os_type == "linux":
            run_command(["systemctl", "--user", "stop", SYSTEMD_SERVICE])
        elif os_type == "darwin":
            plist_path = get_service_file_path()
            run_command(["launchctl", "unload", str(plist_path)])
        else:
            return False
        return True
    except subprocess.CalledProcessError:
        return False


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
            # launchctl list <label> outputs "PID\tStatus\tLabel"
            # PID is "-" when loaded but not running
            stdout = (result.stdout or "").strip()
            if not stdout:
                return False
            pid_field = stdout.split("\t")[0].strip('"')
            return pid_field != "-" and pid_field.isdigit()
        else:
            return False
    except subprocess.CalledProcessError:
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


def health_check(port: int, timeout: int = 30, host: str = "localhost") -> bool:
    """Poll the server health endpoint until it responds or timeout."""
    import urllib.request
    import urllib.error

    # Use localhost for wildcard binds (0.0.0.0/::) since they accept loopback
    check_host = "localhost" if host in ("0.0.0.0", "::") else host
    # Bracket IPv6 addresses for URL formatting
    if ":" in check_host and not check_host.startswith("["):
        check_host = f"[{check_host}]"
    url = f"http://{check_host}:{port}/health"
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


def create_backup() -> Path | None:
    """Create a backup of the database. Returns backup path or None if no db."""
    if not DATABASE_PATH.exists():
        return None

    backup_path = get_backup_path()
    shutil.copy2(DATABASE_PATH, backup_path)
    return backup_path


def restore_backup(backup_path: Path) -> bool:
    """Restore database from a backup. Returns True on success.

    Note: This is a pure file operation. Callers are responsible for
    stopping the server before calling and restarting after.
    """
    if not backup_path.exists():
        return False

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


def reinstall_cli() -> tuple[bool, str]:
    """Reinstall the CLI binary from the server repo so it picks up new code."""
    cli_dir = PROJECT_DIR / "cli"
    try:
        run_command(
            ["uv", "tool", "install", "--force", str(cli_dir)],
            cwd=PROJECT_DIR,
            timeout=120,
        )
        return True, "CLI reinstalled"
    except subprocess.CalledProcessError as e:
        return False, f"CLI reinstall failed: {e.stderr}"
    except subprocess.TimeoutExpired:
        return False, "CLI reinstall timed out"


def run_migrations(fake_initial: bool = False) -> tuple[bool, str]:
    """Run pending database migrations using Oxyde. Returns (success, message)."""
    backend_dir = PROJECT_DIR / "backend"
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
                ["uv", "run", "oxyde", "migrate", "0001_initial", "--fake"],
                cwd=backend_dir,
                timeout=30,
            )

        # Run Oxyde migrations
        run_command(
            ["uv", "run", "oxyde", "migrate"],
            cwd=backend_dir,
            timeout=120,
        )
        return True, "Migrations applied"
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
        return False, f"Migration failed: {e.stderr}"


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
def system_install(git_version, host, port, no_start, repo, yes):
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
        console.print(f"[red]{message}[/red]")
        raise SystemExit(1)
    console.print(f"  [dim]{message}[/dim]")

    # Generate secure secret key
    console.print("Generating secure SECRET_KEY...")
    secret_key = generate_secret_key()

    # Save server metadata (including secret key)
    save_server_json({
        "host": host,
        "port": port,
        "secret_key": secret_key,
        "installed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    })
    console.print("  [dim]Stored in ~/.chaotic/server.json[/dim]")

    # Write service file
    console.print(f"Installing {'systemd' if os_type == 'linux' else 'launchd'} service...")
    service_path = write_service_file(port, secret_key, host)
    console.print(f"  [dim]{service_path}[/dim]")

    # Start service
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
            else:
                console.print("[yellow]TIMEOUT[/yellow]")
                console.print("Server may still be starting. Check 'chaotic system status'.")
                console.print("Check logs with: chaotic system logs -n 20")

    # Update CLI config to point to local server
    local_url = f"http://localhost:{port}/api"
    set_api_url(local_url)

    console.print()
    console.print(f"[bold green]Chaotic is running at http://{_display_host(host)}:{port}[/bold green]")
    console.print("CLI configured to use local server.")
    console.print()
    console.print("[bold]Next steps:[/bold]")
    console.print("  chaotic quickstart     # Interactive setup (recommended)")
    console.print("  chaotic init           # Browser-based setup")


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
        console.print("[red]Failed to stop server.[/red]")
        raise SystemExit(1)


@system.command("reconfigure")
@click.option("--host", default=None, help="New host/IP to bind (use 0.0.0.0 for all interfaces)")
@click.option("--port", default=None, type=int, help="New port number")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
def system_reconfigure(host, port, yes):
    """Reconfigure server host, port, or other settings.

    Updates server.json, regenerates the service file, and restarts
    the server if it was running.
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

    if new_host == current_host and new_port == current_port:
        console.print("[yellow]No changes — configuration is already set to these values.[/yellow]")
        return

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
    service_path = write_service_file(new_port, secret_key, new_host)
    console.print(f"Regenerated service file: {service_path}")

    # Restart if running
    was_running = is_service_running()
    if was_running:
        console.print("Restarting server...")
        if not stop_service():
            console.print("[red]Failed to stop server.[/red]")
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
            console.print("Run 'chaotic system reconfigure --host {current_host} --port {current_port}' to revert.")
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


@system.command("upgrade")
@click.option("--version", "target_version", default=None, help="Version to upgrade to (default: latest)")
@click.option("--no-backup", is_flag=True, help="Skip database backup (not recommended)")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompts")
@click.option("--fake-initial", is_flag=True, help="Fake-apply initial migration (for pre-Oxyde databases)")
def system_upgrade(target_version, no_backup, yes, fake_initial):
    """Upgrade to a new version.

    This command:
    1. Backs up your database (unless --no-backup)
    2. Stops the server
    3. Pulls and checks out the new version
    4. Syncs dependencies and runs database migrations
    5. Restarts the server
    6. Rolls back automatically if health check fails

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
    if target_version is None:
        target_version = get_latest_version()
        if target_version is None:
            # Fall back to origin/main if no tags
            target_version = "origin/main"

    console.print(f"Target version:  {target_version}")

    # Show changelog between current and target
    if current_commit:
        try:
            log_result = run_command(
                ["git", "log", "--oneline", f"{current_commit}..{target_version}"],
                cwd=SERVER_DIR,
                check=False,
            )
            if log_result.returncode == 0 and log_result.stdout.strip():
                commits = log_result.stdout.strip().splitlines()
                console.print(f"\n[bold]Changelog[/bold] ({len(commits)} commit{'s' if len(commits) != 1 else ''}):")
                for line in commits:
                    console.print(f"  {line}")
                console.print()
        except (subprocess.TimeoutExpired, OSError):
            pass  # Non-critical, skip if git log fails

    # Check if already on target
    already_current = current_version == target_version
    if already_current and not fake_initial:
        console.print("\n[green]Already on the latest version.[/green]")
        raise SystemExit(0)

    # Stop server FIRST (before backup to ensure consistent db state)
    was_running = is_service_running()
    if was_running:
        console.print("Stopping server...")
        if not stop_service():
            console.print("[red]Failed to stop server.[/red]")
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
                start_service()
            raise SystemExit(0)

    console.print()

    # Backup database (now safe since server is stopped)
    backup_path = None
    if not no_backup and DATABASE_PATH.exists():
        console.print("Backing up database...")
        backup_path = create_backup()
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
            raise SystemExit(1)

    # Sync dependencies and run database migrations
    console.print("Syncing dependencies and running migrations...")
    success, message = run_migrations(fake_initial=fake_initial)
    if not success:
        console.print(f"[red]{message}[/red]")
        console.print("[yellow]Code has been updated but migrations did not complete.[/yellow]")
        console.print("[yellow]Fix the issue above, then run 'chaotic system upgrade --yes' again.[/yellow]")
        if was_running:
            console.print("Restarting server on new code...")
            if not start_service():
                console.print("[red]Failed to restart server. Run 'chaotic system start' manually.[/red]")
        raise SystemExit(1)

    # Start server
    if was_running:
        console.print("Starting server...")
        if not start_service():
            console.print("[red]Failed to start server.[/red]")
            console.print("Rolling back...")
            if current_commit:
                checkout_version(current_commit, force=True)
            if backup_path:
                restore_backup(backup_path)
            if not start_service():
                console.print("[red]CRITICAL: Failed to restart server after rollback. Manual intervention required.[/red]")
            raise SystemExit(1)

        # Health check
        server_info = load_server_json()
        port = server_info.get("port", DEFAULT_PORT)
        host = server_info.get("host", "127.0.0.1")
        console.print("Waiting for health check...", end=" ")
        if health_check(port, host=host):
            console.print("[green]OK[/green]")
        else:
            console.print("[red]FAILED[/red]")
            console.print("\nHealth check failed. Rolling back...")
            stop_service()
            if current_commit:
                checkout_version(current_commit, force=True)
            if backup_path:
                restore_backup(backup_path)
            if not start_service():
                console.print("[red]CRITICAL: Failed to restart server after rollback. Manual intervention required.[/red]")
            else:
                console.print("[yellow]Rolled back to previous version.[/yellow]")
            raise SystemExit(1)

    # Success
    new_version = get_current_version()
    console.print()
    console.print(f"[bold green]Upgraded to {new_version}[/bold green]")


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

        was_running = is_service_running()
        if was_running:
            console.print("Stopping server...")
            stop_service()
            if not wait_for_service_stop(timeout=10):
                console.print("[yellow]Warning: Service may still be stopping[/yellow]")

        if restore_backup(backup_path):
            console.print("[green]Database restored.[/green]")
        else:
            console.print("[red]Failed to restore backup.[/red]")
            raise SystemExit(1)

        if was_running:
            console.print("Starting server...")
            start_service()
            server_info = load_server_json()
            port = server_info.get("port", DEFAULT_PORT)
            host = server_info.get("host", "127.0.0.1")
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

    # Warn if server is running (backup may be inconsistent)
    if is_service_running():
        console.print("[yellow]Warning: Server is running. For a consistent backup, stop the server first:[/yellow]")
        console.print("  chaotic system stop && chaotic system backup && chaotic system start")
        if not _confirm_action("Create backup anyway?"):
            raise SystemExit(0)

    console.print("Creating backup...")
    backup_path = create_backup()
    if backup_path:
        size_mb = backup_path.stat().st_size / (1024 * 1024)
        console.print(f"[green]Backup created: {backup_path.name} ({size_mb:.1f} MB)[/green]")
        cleanup_old_backups()
    else:
        console.print("[red]Failed to create backup.[/red]")
        raise SystemExit(1)
