"""Agent management commands."""
import sys

import click
from rich.markup import escape
from rich.table import Table

from cli import session_identity

from .shared import _client, console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def _require_ref(ref: str) -> str:
    """Refuse an empty or whitespace-only agent identifier: as an ID
    prefix it would match every agent, so with one agent in the team
    (and --yes) it would act on that agent unasked (CHT-1494)."""
    ref = ref.strip()
    if not ref:
        console.print("[red]Agent identifier must not be empty.[/red]")
        raise SystemExit(1)
    return ref


def _resolve_agent(agents: list, ref: str) -> dict:
    """The one agent whose ID, ID prefix or exact name is `ref`."""
    found = None
    for a in agents:
        if a["id"] == ref or a["id"].startswith(ref) or a["name"] == ref:
            if found is not None:
                console.print(f"[red]Ambiguous agent identifier '{ref}'. Please be more specific.[/red]")
                raise SystemExit(1)
            found = a
    if not found:
        console.print(f"[red]Agent '{ref}' not found.[/red]")
        raise SystemExit(1)
    return found


def _grouped_by_registrar(agents: list) -> list[tuple[dict, bool]]:
    """(agent, nested) rows for `agent list`: each agent in the server's
    order, followed by the session identities it registered (nested); a
    session identity whose registrar is not listed stays a top-level row
    in its own place (CHT-1501)."""
    ids = {a["id"] for a in agents}
    children: dict[str, list] = {}
    for a in agents:
        if a.get("registered_by_id") in ids:
            children.setdefault(a["registered_by_id"], []).append(a)
    rows = []
    for a in agents:
        if a.get("registered_by_id") in ids:
            continue
        rows.append((a, False))
        rows.extend((child, True) for child in children.get(a["id"], []))
    return rows


def register(cli):
    """Register agent commands on the CLI group."""

    @cli.group()
    def agent():
        """Agent management commands."""
        pass

    @agent.command("create")
    @click.argument("name")
    @click.option("--project", "-p", is_flag=True, help="Create project-scoped agent (otherwise team-scoped)")
    @click.option(
        "--registrar", is_flag=True,
        help="Make it a registrar: its key may only register session identities and read (see docs/agents.md)",
    )
    @_main().require_team
    @_main().handle_error
    def agent_create(name, project, registrar):
        """Create a new agent.

        NAME is the display name for the agent (e.g., 'claude-bot').

        By default, creates a team-scoped agent that can access all projects in the team.
        Use --project to create a project-scoped agent that can only access the current project.

        --registrar makes it a registrar (CHT-1498): a harness's own agent
        that registers one identity per session (`chaotic agent register`,
        or `session_identity: auto`) and cannot write as itself.

        The API key is displayed only once - save it immediately!

        Examples:
            chaotic agent create claude-bot
            chaotic agent create ci-bot --project
            chaotic agent create "Claude Code" --registrar
        """
        m = _main()
        team_id = m.get_current_team()

        if project:
            project_id = m.get_current_project()
            if not project_id:
                console.print("[red]No project selected. Run 'chaotic project use <project_id>' first.[/red]")
                raise SystemExit(1)
            result = _client().create_project_agent(project_id, name, can_register=registrar)
            scope_msg = f"project-scoped (project: {project_id[:8]}...)"
        else:
            result = _client().create_team_agent(team_id, name, can_register=registrar)
            scope_msg = "team-scoped"

        if registrar and not result.get("can_register"):
            # A server older than CHT-1498 ignores the field: say so
            # rather than hand out a key that is not a registrar's.
            console.print(
                f"[yellow]Agent '{escape(result['name'])}' was created, but the server did not make it "
                "a registrar (it may predate registrars).[/yellow]"
            )
        kind_msg = ", registrar" if result.get("can_register") else ""
        console.print(f"[green]Agent '{escape(result['name'])}' created ({scope_msg}{kind_msg}).[/green]")
        console.print()
        console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
        console.print(f"[cyan]{result['api_key']}[/cyan]")
        console.print()
        console.print("To configure the CLI with this agent's key:")
        console.print(f"  chaotic auth set-key {result['api_key']}")
        if result.get("can_register"):
            console.print("Then give each Claude Code session its own identity with:")
            console.print("  chaotic config set-session-identity auto   [dim](or CHAOTIC_SESSION_IDENTITY=auto)[/dim]")

    @agent.command("update")
    @click.argument("agent_ref", metavar="AGENT")
    @click.option("--name", default=None, help="New display name")
    @click.option(
        "--registrar/--no-registrar", default=None,
        help="Turn the registrar capability on or off (CHT-1498)",
    )
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def agent_update(agent_ref, name, registrar):
        """Rename an agent, or make it a registrar or stop it being one.

        A registrar's key may only register session identities
        (`chaotic agent register`) and read; it cannot write as itself.
        --no-registrar does not retire the identities it registered: they
        keep working until their keys expire, but it can no longer renew them.
        Allowed to the agent's creator (while in its team) and team admins.
        A registered session identity cannot be made a registrar.

        AGENT can be the agent's full ID, an ID prefix, or its exact name.

        Examples:
            chaotic agent update "Claude Code" --registrar
            chaotic agent update claude-bot --name "Claude Bot"
        """
        m = _main()
        agent_ref = _require_ref(agent_ref)
        if name is None and registrar is None:
            raise click.UsageError("Nothing to change: pass --name, --registrar or --no-registrar.")
        agent_obj = _resolve_agent(_client().get_team_agents(m.get_current_team()), agent_ref)
        changes = {}
        if name is not None:
            changes["name"] = name
        if registrar is not None:
            changes["can_register"] = registrar
        result = _client().update_agent(agent_obj["id"], **changes)
        if registrar is not None and bool(result.get("can_register")) != registrar:
            raise click.ClickException(
                "The server did not change the registrar capability (it may predate registrars)."
            )
        if m.is_json_output():
            m.output_json(result)
            return
        state = "a registrar" if result.get("can_register") else "not a registrar"
        console.print(f"[green]Agent '{escape(result['name'])}' updated; it is {state}.[/green]")

    @agent.command("register")
    @click.option("--ref", "external_ref", required=True,
                  help="The session's address, e.g. claude-code:session:<id>")
    @click.option("--name", default=None, help="Display name (a new identity only; default '<registrar> · <ref tail>')")
    @click.option("--project", "project_ref", default=None,
                  help="Narrow the identity to one project of the registrar's team (id or key)")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def agent_register(external_ref, name, project_ref):
        """Register a session identity with the configured key as registrar.

        Gets or creates the identity this registrar knows by --ref and
        mints it a fresh key that expires (7 days by default). Calling it
        again for the same ref returns the same identity with a new key and
        revokes its previous one. The configured key must be a registrar's
        (`chaotic agent create --registrar`), or a person's, who registers
        in the current team.

        With `session_identity: auto` the CLI and `chaotic mcp` do this by
        themselves for each Claude Code session; this command is for other
        harnesses and for scripts.

        The key is displayed only once.

        Example:
            chaotic agent register --ref claude-code:session:abc123 --json
        """
        m = _main()
        kwargs = {"name": name}
        # Every request here is the registrar's own, even with
        # session_identity on.
        with session_identity.suspended():
            if project_ref:
                kwargs["project_id"] = m.resolve_project_id(project_ref)
            if not _client().get_me().get("is_agent"):
                # A person registers for themself, in a team they name.
                team_id = m.get_current_team()
                if not team_id and not project_ref:
                    console.print("[red]No team selected.[/red] Run 'chaotic team use <team>' first.")
                    raise SystemExit(1)
                kwargs["team_id"] = team_id
            result = _client().register_agent(external_ref, **kwargs)
        if m.is_json_output():
            m.output_json(result)
            return
        identity = result["agent"]
        verb = "Registered" if result.get("created") else "Renewed"
        console.print(
            f"[green]{verb} session identity '{escape(identity['name'])}' ({identity['id'][:8]}).[/green]"
        )
        console.print(f"Key expires: {escape(str(result.get('expires_at') or 'never'))}")
        console.print()
        console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
        console.print(f"[cyan]{result['api_key']}[/cyan]")

    @agent.command("list")
    @click.option("--all", "show_all", is_flag=True,
                  help="Include idle session identities (keys unused for 7 days)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def agent_list(show_all):
        """List agents in current team.

        Session identities are listed under the registrar that registered
        them, and idle ones (keys unused for 7 days) are left out unless
        --all. They still resolve by id or name everywhere else."""
        m = _main()
        team_id = m.get_current_team()
        agents = _client().get_team_agents(team_id, hide_idle=not show_all)
        if m.is_json_output():
            m.output_json(agents or [])
            return

        if not agents:
            console.print("[yellow]No agents found.[/yellow]")
            console.print("Create one with: chaotic agent create <name>")
            return

        table = Table(title="Agents")
        table.add_column("ID", style="dim")
        table.add_column("Name")
        table.add_column("Scope")
        table.add_column("Kind")
        table.add_column("Created By")
        table.add_column("Created At")

        for a, nested in _grouped_by_registrar(agents):
            agent_id = a["id"][:8] + "..."
            name = escape(a["name"])
            if a.get("can_register"):
                kind = "registrar"
            elif a.get("kind") == "session":
                kind = "session"
            else:
                kind = "agent"
            if a.get("agent_project_id"):
                scope = f"Project: {a['agent_project_id'][:8]}..."
            else:
                scope = "Team-wide"
            if a.get("is_active") is False:
                name = f"{name} [dim](deactivated)[/dim]"
            if a.get("idle"):
                name = f"{name} [dim](idle)[/dim]"
            if nested:
                name = f"  └ {name}"
            created_by = a.get("parent_user_name", "Unknown")
            created_at = a["created_at"][:10]
            table.add_row(agent_id, name, scope, kind, created_by, created_at)

        console.print(table)

    @agent.command("delete")
    @click.argument("agent_id")
    @_main().require_team
    @_main().handle_error
    def agent_delete(agent_id):
        """Delete an agent and revoke all its API keys.

        AGENT_ID can be the full agent ID or a prefix (e.g., the first 8 characters).
        """
        m = _main()
        agent_id = _require_ref(agent_id)
        if not m.confirm_action("Are you sure you want to delete this agent? This will revoke all its API keys."):
            raise SystemExit(0)
        # Try to find the agent by prefix if not a full ID
        team_id = m.get_current_team()
        agents = _client().get_team_agents(team_id)

        # Find agent by ID or prefix
        agent_obj = None
        for a in agents:
            if a["id"] == agent_id or a["id"].startswith(agent_id):
                if agent_obj is not None:
                    console.print(f"[red]Ambiguous agent ID prefix '{agent_id}'. Please be more specific.[/red]")
                    raise SystemExit(1)
                agent_obj = a

        if not agent_obj:
            console.print(f"[red]Agent '{agent_id}' not found.[/red]")
            raise SystemExit(1)

        _client().delete_agent(agent_obj["id"])
        console.print(f"[green]Agent '{agent_obj['name']}' deleted.[/green]")

    @agent.command("deactivate")
    @click.argument("agent_ref", metavar="AGENT")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def agent_deactivate(agent_ref):
        """Deactivate an agent: revoke all its API keys and block it from
        signing in, keeping the work it authored attributed to it.

        Use this to retire an agent that `agent delete` refuses to delete
        because it authored work. Allowed to the agent's creator and to
        team admins. Undo with `chaotic agent reactivate` (its old keys
        stay revoked).

        AGENT can be the agent's full ID, an ID prefix, or its exact name.

        Example:
            chaotic agent deactivate claude-bot
        """
        m = _main()
        agent_ref = _require_ref(agent_ref)
        agent_obj = _resolve_agent(_client().get_team_agents(m.get_current_team()), agent_ref)

        if not m.confirm_action(
            f"Deactivate agent '{agent_obj['name']}'? All its API keys will be revoked "
            "permanently; reactivating it later needs a new key."
        ):
            raise SystemExit(0)

        result = _client().deactivate_agent(agent_obj["id"])
        if m.is_json_output():
            m.output_json(result)
            return
        console.print(
            f"[green]Agent '{result['name']}' deactivated; its API keys are revoked.[/green]"
        )
        console.print("Issues still assigned to it stay assigned; reassign any open ones.")

    @agent.command("reactivate")
    @click.argument("agent_ref", metavar="AGENT")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def agent_reactivate(agent_ref):
        """Reactivate a deactivated agent so it can sign in again.

        Its revoked keys stay revoked: mint a new one with
        `chaotic agent keys create`. Allowed to the agent's creator and to
        team admins.

        AGENT can be the agent's full ID, an ID prefix, or its exact name.

        Example:
            chaotic agent reactivate claude-bot
        """
        m = _main()
        agent_ref = _require_ref(agent_ref)
        agent_obj = _resolve_agent(_client().get_team_agents(m.get_current_team()), agent_ref)

        result = _client().reactivate_agent(agent_obj["id"])
        if m.is_json_output():
            m.output_json(result)
            return
        console.print(f"[green]Agent '{result['name']}' reactivated.[/green]")
        console.print(f"Mint it a key with: chaotic agent keys create {result['id']}")

    @agent.group("keys")
    def agent_keys():
        """Agent API key management commands."""
        pass

    @agent_keys.command("create")
    @click.argument("agent_ref", metavar="AGENT")
    @_main().require_team
    @_main().handle_error
    def agent_keys_create(agent_ref):
        """Mint a new API key for an existing agent.

        AGENT can be the agent's full ID, an ID prefix (e.g., the first 8
        characters), or its exact name.

        The new key is displayed only once - save it immediately!

        Example:
            chaotic agent keys create claude-bot
        """
        m = _main()
        agent_ref = _require_ref(agent_ref)
        agent_obj = _resolve_agent(_client().get_team_agents(m.get_current_team()), agent_ref)

        result = _client().create_agent_key(agent_obj["id"])

        console.print(f"[green]New API key minted for agent '{agent_obj['name']}'.[/green]")
        console.print()
        console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
        console.print(f"[cyan]{result['key']}[/cyan]")
        console.print()
        console.print("To configure the CLI with this agent's key:")
        console.print(f"  chaotic auth set-key {result['key']}")

    @agent_keys.command("list")
    @click.argument("agent_ref", metavar="AGENT")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def agent_keys_list(agent_ref):
        """List every API key that signs in as an agent, active or revoked,
        with who holds it. A key the agent minted for itself is held by
        whoever holds the key it used; one minted before holders were
        recorded shows "(creator, legacy)".

        Allowed to team admins and to the agent's creator while in the team.

        Example:
            chaotic agent keys list claude-bot
        """
        m = _main()
        agent_ref = _require_ref(agent_ref)
        agent_obj = _resolve_agent(_client().get_team_agents(m.get_current_team()), agent_ref)
        keys = _client().list_agent_keys(agent_obj["id"])
        if m.is_json_output():
            m.output_json(keys)
            return
        if not keys:
            console.print(f"[yellow]Agent '{agent_obj['name']}' has no API keys.[/yellow]")
            return

        table = Table(title=f"API keys for {agent_obj['name']}")
        table.add_column("ID", style="dim")
        table.add_column("Name")
        table.add_column("Prefix")
        table.add_column("Held by")
        table.add_column("Created")
        table.add_column("Last Used")
        table.add_column("Active")
        for k in keys:
            holder = "(creator, legacy)" if k.get("legacy_self_minted") else (k.get("owner_name") or k.get("owner_id") or "-")
            table.add_row(
                k["id"][:8] + "...",
                k.get("name") or "Unnamed",
                k.get("key_prefix") or "-",
                holder,
                (k.get("created_at") or "")[:10] or "-",
                (k.get("last_used_at") or "")[:10] or "-",
                "Yes" if k.get("is_active") else "No",
            )
        console.print(table)

    @agent_keys.command("revoke")
    @click.argument("agent_ref", metavar="AGENT")
    @click.argument("key_ref", metavar="KEY")
    @_main().require_team
    @_main().handle_error
    def agent_keys_revoke(agent_ref, key_ref):
        """Revoke one of an agent's API keys, leaving its others working.

        KEY is the key's ID, an ID prefix, or its `ck_...` prefix, as
        `chaotic agent keys list` shows them (a pasted full key works too).
        Only active keys are considered. To revoke all of them and stop the agent, use
        `chaotic agent deactivate`.

        Example:
            chaotic agent keys revoke claude-bot 1a2b3c4d
            chaotic agent keys revoke claude-bot ck_9f8e7d6c
        """
        m = _main()
        agent_ref = _require_ref(agent_ref)
        key_ref = key_ref.strip()
        if not key_ref:
            console.print("[red]Key identifier must not be empty.[/red]")
            raise SystemExit(1)
        agent_obj = _resolve_agent(_client().get_team_agents(m.get_current_team()), agent_ref)
        def _matches(k):
            prefix = k.get("key_prefix") or ""
            return (
                k["id"].startswith(key_ref)
                or prefix.startswith(key_ref)
                # A pasted full secret: match it on the prefix it starts with.
                or (len(key_ref) > len(prefix) and prefix and key_ref.startswith(prefix))
            )

        # Already-revoked keys are not candidates: revoking one is a no-op,
        # and it must not make an active key's prefix ambiguous.
        matches = [k for k in _client().list_agent_keys(agent_obj["id"]) if k.get("is_active") and _matches(k)]
        # Never print a pasted secret back to the terminal.
        shown = key_ref if len(key_ref) <= 11 else key_ref[:11] + "..."
        if not matches:
            console.print(f"[red]Agent '{agent_obj['name']}' has no active key '{shown}'.[/red]")
            raise SystemExit(1)
        if len(matches) > 1:
            console.print(f"[red]Ambiguous key identifier '{shown}'. Please be more specific.[/red]")
            raise SystemExit(1)
        key = matches[0]
        if not m.confirm_action(f"Revoke key '{key['name']}' ({key['key_prefix']}) of agent '{agent_obj['name']}'?"):
            raise SystemExit(0)
        _client().revoke_api_key(key["id"])
        console.print(f"[green]Key '{key['name']}' revoked.[/green]")

    return agent
