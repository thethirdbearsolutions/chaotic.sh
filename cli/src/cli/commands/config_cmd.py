"""Configuration management commands."""
import sys

import click

from .shared import console
from ..markup import esc


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register config commands on the CLI group."""

    @cli.group()
    def config():
        """Configuration management."""
        pass

    @config.command("show")
    @_main().json_option
    def config_show():
        """Show current configuration."""
        m = _main()
        prof = m.get_effective_profile()
        api_url = m.get_api_url()
        local_cfg = m.find_local_config()
        has_token = bool(m.get_token())
        has_key = bool(m.get_api_key())
        team_id = m.get_current_team()
        project_id = m.get_current_project()
        try:
            from cli import session_identity
            session_mode = session_identity.mode()
        except Exception as exc:  # an invalid value: show it, don't crash `config show`
            session_mode = f"invalid ({exc})"

        if m.is_json_output():
            m.output_json({
                "profile": prof,
                "api_url": api_url,
                "local_config": str(local_cfg) if local_cfg else None,
                "has_token": has_token,
                "has_api_key": has_key,
                "team_id": team_id,
                "project_id": project_id,
                "session_identity": session_mode,
            })
            return

        console.print(f"[bold]Configuration[/bold]\n")
        console.print(f"  [dim]Profile:[/dim]      {esc(prof)}")
        console.print(f"  [dim]API URL:[/dim]      {esc(api_url)}")
        if local_cfg:
            console.print(f"  [dim]Local config:[/dim] {esc(local_cfg)}")
        else:
            console.print(f"  [dim]Local config:[/dim] [dim](none)[/dim]")
        console.print(f"  [dim]Auth token:[/dim]  {esc('✓' if has_token else '✗')}")
        console.print(f"  [dim]API key:[/dim]     {esc('✓' if has_key else '✗')}")
        console.print(f"  [dim]Team ID:[/dim]     {esc(team_id) if team_id else '[dim](not set)[/dim]'}")
        console.print(f"  [dim]Project ID:[/dim]  {esc(project_id) if project_id else '[dim](not set)[/dim]'}")
        console.print(f"  [dim]Session identity:[/dim] {esc(session_mode)}")

    @config.command("set-session-identity")
    @click.argument("mode", type=click.Choice(["auto", "off"]))
    def config_set_session_identity(mode):
        """Give each Claude Code session its own identity (auto) or not (off).

        With auto, and CLAUDE_CODE_SESSION_ID set (Claude Code sets it), the
        configured key is used only as a registrar: the CLI and `chaotic mcp`
        register `claude-code:session:<id>` once, cache its key under
        ~/.chaotic/sessions/, and send every request with it. The key must
        be a registrar's (`chaotic agent create --registrar`). Outside Claude
        Code nothing changes. CHAOTIC_SESSION_IDENTITY=auto|off overrides
        this setting. Saved in the current profile.
        """
        from cli import session_identity

        session_identity.set_mode(mode)
        console.print(f"[green]session_identity set to: {esc(mode)}[/green]")

    @config.command("set-url")
    @click.argument("url")
    def config_set_url(url):
        """Set API URL.

        Accepts either a base URL (e.g. http://localhost:24267) or a full API
        URL (e.g. http://localhost:24267/api). The /api suffix is added
        automatically if not present.
        """
        url = url.rstrip("/")
        if not url.endswith("/api"):
            url = f"{url}/api"
        _main().set_api_url(url)
        console.print(f"[green]API URL set to: {esc(url)}[/green]")

    return config
