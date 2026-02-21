"""Profile management commands."""
import sys

import click

from .shared import console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def _show_profile_details(name, cfg):
    """Display profile details in a consistent format."""
    console.print(f"[bold]Profile:[/bold] {name}")

    api_url = cfg.get("api_url", "not set")
    console.print(f"  API URL: {api_url}")

    if cfg.get("api_key"):
        key = cfg["api_key"]
        masked = f"{key[:8]}...{key[-4:]}" if len(key) > 12 else "***"
        console.print(f"  Auth: API key ({masked})")
    elif cfg.get("token"):
        console.print("  Auth: JWT token")
    else:
        console.print("  Auth: [yellow]not configured[/yellow]")

    if cfg.get("current_team"):
        console.print(f"  Team: {cfg['current_team']}")
    if cfg.get("current_project"):
        console.print(f"  Project: {cfg['current_project']}")


def register(cli):
    """Register profile commands on the CLI group."""

    @cli.group()
    def profile():
        """Profile management for multi-agent setups.

        Profiles allow different identities (human, AI agents) to use separate
        configurations. Each profile is stored in ~/.chaotic/{name}.json.

        When multiple profiles exist, you MUST specify which to use via:
        - CHAOTIC_PROFILE environment variable
        - --profile / -p flag
        """
        pass

    @profile.command("list")
    def profile_list():
        """List all available profiles."""
        m = _main()
        profiles = m.list_profiles()
        if not profiles:
            console.print("[yellow]No profiles found in ~/.chaotic/[/yellow]")
            console.print("Create one with: chaotic profile create <name>")
            return

        current = m.get_effective_profile()
        console.print("[bold]Available profiles:[/bold]\n")
        for p in profiles:
            if p == current:
                console.print(f"  [green]* {p}[/green] [dim](active)[/dim]")
            else:
                console.print(f"    {p}")
        console.print()
        console.print(f"[dim]Set profile with: CHAOTIC_PROFILE=<name> or --profile <name>[/dim]")

    @profile.command("current")
    def profile_current():
        """Show the currently active profile."""
        m = _main()
        current = m.get_effective_profile()
        source = "CHAOTIC_PROFILE" if m.get_profile() else "default"

        console.print(f"[bold]Active profile:[/bold] {current}")
        console.print(f"[dim]Source: {source}[/dim]")

        # Show profile details
        try:
            cfg = m.load_config()
            if cfg.get("token"):
                console.print("[dim]Auth: JWT token[/dim]")
            elif cfg.get("api_key"):
                # Mask API key
                key = cfg["api_key"]
                masked = f"{key[:8]}...{key[-4:]}" if len(key) > 12 else "***"
                console.print(f"[dim]Auth: API key ({masked})[/dim]")
            else:
                console.print("[yellow]Auth: Not configured[/yellow]")
        except Exception:
            pass

    @profile.command("create")
    @click.argument("name")
    @click.option("--api-url", default=None, help="API URL for this profile.")
    @click.option("--api-key", default=None, help="API key for this profile.")
    def profile_create(name, api_url, api_key):
        """Create a new profile.

        Creates ~/.chaotic/{name}.json with optional initial configuration.
        """
        m = _main()

        # Check if profile already exists
        existing = m.list_profiles()
        if name in existing:
            console.print(f"[red]Error: Profile '{name}' already exists.[/red]")
            raise SystemExit(1)

        # Validate the name by attempting to resolve the config file path
        try:
            m.set_profile(name)
            config_file = m.get_global_config_file()
        except m.ProfileError as e:
            console.print(f"[red]Error: {e}[/red]")
            raise SystemExit(1)
        finally:
            m.set_profile(None)

        # Build initial config
        config = {}
        if api_url:
            config["api_url"] = api_url
        if api_key:
            config["api_key"] = api_key

        # Write the profile file
        m.set_profile(name)
        try:
            m.save_global_config(config)
        finally:
            m.set_profile(None)

        console.print(f"[green]Profile '{name}' created.[/green]")
        if not api_url and not api_key:
            console.print(f"[dim]Configure with: CHAOTIC_PROFILE={name} chaotic auth login[/dim]")

    @profile.command("show")
    @click.argument("name")
    def profile_show(name):
        """Show details for a specific profile."""
        m = _main()

        # Check profile exists
        existing = m.list_profiles()
        if name not in existing:
            console.print(f"[red]Error: Profile '{name}' not found.[/red]")
            console.print(f"[dim]Available profiles: {', '.join(existing) if existing else 'none'}[/dim]")
            raise SystemExit(1)

        # Load the profile's config
        m.set_profile(name)
        try:
            cfg = m.load_global_config()
        finally:
            m.set_profile(None)

        _show_profile_details(name, cfg)

    @profile.command("delete")
    @click.argument("name")
    @click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt.")
    @click.pass_context
    def profile_delete(ctx, name, yes):
        """Delete a profile.

        Removes ~/.chaotic/{name}.json. Cannot delete the currently active profile.
        """
        m = _main()

        # Check profile exists
        existing = m.list_profiles()
        if name not in existing:
            console.print(f"[red]Error: Profile '{name}' not found.[/red]")
            raise SystemExit(1)

        # Prevent deleting the active profile
        current = m.get_effective_profile()
        if name == current:
            console.print(f"[red]Error: Cannot delete the active profile '{name}'.[/red]")
            console.print("[dim]Switch to a different profile first.[/dim]")
            raise SystemExit(1)

        # Resolve the file path
        m.set_profile(name)
        try:
            config_file = m.get_global_config_file()
        except m.ProfileError as e:
            console.print(f"[red]Error: {e}[/red]")
            raise SystemExit(1)
        finally:
            m.set_profile(None)

        # Confirm unless --yes
        if not yes and not ctx.obj.get("yes") if ctx.obj else not yes:
            if not click.confirm(f"Delete profile '{name}'?"):
                console.print("[dim]Cancelled.[/dim]")
                return

        config_file.unlink(missing_ok=True)
        console.print(f"[green]Profile '{name}' deleted.[/green]")

    return profile
