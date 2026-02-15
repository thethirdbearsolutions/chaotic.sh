"""Configuration management commands."""
import sys

import click

from .shared import console


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

        if m.is_json_output():
            m.output_json({
                "profile": prof,
                "api_url": api_url,
                "local_config": str(local_cfg) if local_cfg else None,
                "has_token": has_token,
                "has_api_key": has_key,
                "team_id": team_id,
                "project_id": project_id,
            })
            return

        console.print(f"[bold]Configuration[/bold]\n")
        console.print(f"  [dim]Profile:[/dim]      {prof}")
        console.print(f"  [dim]API URL:[/dim]      {api_url}")
        if local_cfg:
            console.print(f"  [dim]Local config:[/dim] {local_cfg}")
        else:
            console.print(f"  [dim]Local config:[/dim] [dim](none)[/dim]")
        console.print(f"  [dim]Auth token:[/dim]  {'✓' if has_token else '✗'}")
        console.print(f"  [dim]API key:[/dim]     {'✓' if has_key else '✗'}")
        console.print(f"  [dim]Team ID:[/dim]     {team_id or '[dim](not set)[/dim]'}")
        console.print(f"  [dim]Project ID:[/dim]  {project_id or '[dim](not set)[/dim]'}")

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
        console.print(f"[green]API URL set to: {url}[/green]")

    return config
