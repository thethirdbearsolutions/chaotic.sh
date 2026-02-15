"""Profile management commands."""
import sys

from .shared import console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


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
            console.print("Create one with: chaotic auth login")
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

    return profile
