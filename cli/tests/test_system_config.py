"""Server settings through `chaotic system config` (CHT-1592).

Settings such as OAUTH_ENABLED and APP_BASE_URL had no supported home: an
Environment= line added to the systemd unit by hand was dropped by
`system reconfigure` and made `system upgrade` skip every later rewrite
of the unit. They now live in server.json's "settings" and every service
file writer renders them, so they survive both. Values of secret
settings never reach the terminal.
"""
import json
import plistlib
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest
from click.testing import CliRunner

from cli import server_settings as ss
from cli import system
from cli.main import cli
from cli.system import (
    generate_launchd_plist,
    generate_systemd_service,
    reconcile_service_file,
    write_service_file,
)

from test_service_file_reconcile import _unit_before_cht_1474
from test_service_stop_start import _flat, _upgrade

SECRET = "s3cr3t-0123456789abcdef"
PORT = 24267
HOST = "127.0.0.1"
PASSWORD = "hunter2-p4ss"
OAUTH = {"OAUTH_ENABLED": "true", "APP_BASE_URL": "https://chaotic.example.com"}


# --- names and values -----------------------------------------------------

class TestNames:
    @pytest.mark.parametrize("name", sorted(ss.RESERVED))
    def test_reserved_names_are_refused_even_with_force(self, name):
        assert "is not a setting" in ss.name_problem(name, force=True)

    @pytest.mark.parametrize("name", ["lower", "1ABC", "A-B", "A B", ""])
    def test_invalid_names_are_refused(self, name):
        assert "not a valid name" in ss.name_problem(name, force=True)

    def test_unknown_name_needs_force(self):
        assert "--force" in ss.name_problem("SOMETHING_ELSE")
        assert ss.name_problem("SOMETHING_ELSE", force=True) is None

    @pytest.mark.parametrize("name", sorted(ss.KNOWN))
    def test_known_names_are_accepted(self, name):
        assert ss.name_problem(name) is None

    def test_known_names_are_real_server_settings(self):
        """Every known name is a field of the server's Settings, and its
        default is the one shown (backend/app/config.py)."""
        config = (Path(__file__).parents[2] / "backend" / "app" / "config.py").read_text()
        for name, setting in ss.KNOWN.items():
            assert f"    {name.lower()}: " in config, name

    def test_secrets(self):
        assert ss.is_secret("SMTP_PASSWORD")
        assert ss.is_secret("ANYTHING_UNKNOWN")  # forced names might hold anything
        assert not ss.is_secret("APP_BASE_URL")
        assert ss.display_value("SMTP_PASSWORD", PASSWORD) == "<hidden>"
        assert ss.display_value("SMTP_PASSWORD", "") == "<hidden, empty>"
        assert ss.display_value("APP_BASE_URL", "https://x.example") == "https://x.example"
        assert ss.display_value("FORWARDED_ALLOW_IPS", "") == "<empty>"


class TestValues:
    @pytest.mark.parametrize("raw,stored", [
        ("true", "true"), ("TRUE", "true"), ("1", "true"), ("yes", "true"), ("on", "true"),
        ("false", "false"), ("0", "false"), ("No", "false"), ("off", "false"),
    ])
    def test_booleans_are_normalised(self, raw, stored):
        assert ss.normalize("OAUTH_ENABLED", raw) == (stored, None)

    def test_bad_boolean(self):
        assert "true or false" in ss.normalize("OAUTH_ENABLED", "maybe")[1]

    @pytest.mark.parametrize("raw,stored", [
        ("https://chaotic.example.com", "https://chaotic.example.com"),
        ("https://chaotic.example.com/", "https://chaotic.example.com"),  # trailing slash dropped
        ("https://chaotic.example.com:8443", "https://chaotic.example.com:8443"),
        ("http://localhost:24267", "http://localhost:24267"),
        ("http://10.0.0.5:24267", "http://10.0.0.5:24267"),  # fine without OAuth; check() judges it
        ("https://[::1]:8443", "https://[::1]:8443"),
    ])
    def test_good_base_urls(self, raw, stored):
        assert ss.normalize("APP_BASE_URL", raw) == (stored, None)

    @pytest.mark.parametrize("raw,why", [
        ("chaotic.example.com", "absolute http(s) URL"),
        ("ftp://chaotic.example.com", "absolute http(s) URL"),
        ("https://", "absolute http(s) URL"),
        ("https://chaotic.example.com/chaotic", "bare origin"),
        ("https://chaotic.example.com?x=1", "bare origin"),
        ("https://chaotic.example.com#top", "bare origin"),
        ("https://user:pw@chaotic.example.com", "credentials"),
        ("https://Chaotic.Example.com", "lower case"),
        ("https://chaotic.example.com:443", "default port"),
        ("http://localhost:80", "default port"),
        ("https://chaotic.example.com:99999", "not a valid URL"),
        ("https://chäotic.example.com", "xn--"),
        ('https://chaotic.example.com"', "canonical form"),
    ])
    def test_bad_base_urls(self, raw, why):
        value, problem = ss.normalize("APP_BASE_URL", raw)
        assert problem and why in problem, problem

    def test_default_port_suggestion(self):
        assert "'https://chaotic.example.com'" in ss.normalize("APP_BASE_URL", "https://chaotic.example.com:443")[1]

    @pytest.mark.parametrize("raw,stored", [
        ("10.0.0.5", "10.0.0.5"),
        ("10.0.0.5, 10.0.1.0/24 ,::1", "10.0.0.5,10.0.1.0/24,::1"),
        ("", ""),  # trust nobody
    ])
    def test_good_proxy_lists(self, raw, stored):
        assert ss.normalize("FORWARDED_ALLOW_IPS", raw) == (stored, None)

    @pytest.mark.parametrize("raw,why", [
        ("*", "every sender"), ("0.0.0.0/0", "every sender"), ("::/0", "every sender"),
        ("proxy.internal", "not an IP"), ("10.0.0.1/8", "not an IP"),
    ])
    def test_bad_proxy_lists(self, raw, why):
        assert why in ss.normalize("FORWARDED_ALLOW_IPS", raw)[1]

    @pytest.mark.parametrize("raw,stored", [
        ("*", "*"),
        ("https://a.example.com, http://localhost:6274/", "https://a.example.com,http://localhost:6274"),
    ])
    def test_good_origins(self, raw, stored):
        assert ss.normalize("CORS_ORIGINS", raw) == (stored, None)

    @pytest.mark.parametrize("raw", ["", "*,https://a.example.com", "https://a.example.com/x", "a.example.com"])
    def test_bad_origins(self, raw):
        assert ss.normalize("CORS_ORIGINS", raw)[1]

    def test_ports(self):
        assert ss.normalize("SMTP_PORT", " 465 ") == ("465", None)
        for bad in ("0", "65536", "smtp", ""):
            assert "port number" in ss.normalize("SMTP_PORT", bad)[1]

    @pytest.mark.parametrize("raw", ["a b", "a\nOAUTH_ENABLED=true", "a\"b", "a'b", "a\\b", "50%", "a\tb", "a\x00"])
    def test_values_a_service_file_cannot_carry_are_refused(self, raw):
        assert "cannot carry" in ss.normalize("SMTP_HOST", raw)[1]

    def test_a_refused_secret_is_not_echoed(self):
        _, problem = ss.normalize("SMTP_PASSWORD", f"{PASSWORD} with space")
        assert PASSWORD not in problem
        _, problem = ss.normalize("UNKNOWN_TOKEN", f"{PASSWORD}%")
        assert PASSWORD not in problem

    def test_free_text_is_kept(self):
        assert ss.normalize("SMTP_PASSWORD", PASSWORD) == (PASSWORD, None)
        assert ss.normalize("SMTP_HOST", "") == ("", None)


class TestStoredSettings:
    def test_only_safe_entries_reach_a_service_file(self):
        info = {"settings": {
            "OAUTH_ENABLED": "true",
            "BAD": "x\n[Service]\nExecStart=/bin/evil",
            "SECRET_KEY": "other",
            "lower": "x",
            "NUMBER": 5,
        }}
        assert ss.stored_settings(info) == {"OAUTH_ENABLED": "true"}

    @pytest.mark.parametrize("info", [{}, {"settings": None}, {"settings": ["OAUTH_ENABLED"]}])
    def test_missing_or_malformed(self, info):
        assert ss.stored_settings(info) == {}


class TestCheck:
    def _check(self, **settings):
        return ss.check({"settings": settings})

    def test_nothing_set_is_fine(self):
        assert ss.check({}) == ([], [])

    def test_oauth_without_base_url_is_an_error(self):
        errors, _ = self._check(OAUTH_ENABLED="true")
        assert any("APP_BASE_URL is not set" in e for e in errors)

    def test_oauth_with_plain_http_is_an_error(self):
        errors, _ = self._check(OAUTH_ENABLED="true", APP_BASE_URL="http://chaotic.example.com")
        assert any("https" in e for e in errors)

    def test_oauth_on_loopback_is_a_warning(self):
        errors, warnings = self._check(OAUTH_ENABLED="true", APP_BASE_URL="http://localhost:24267",
                                       MCP_CAPABILITY_URL_ENABLED="false")
        assert errors == []
        assert len(warnings) == 1 and "loopback" in warnings[0]

    def test_oauth_with_the_capability_url_still_on_is_a_warning(self):
        errors, warnings = self._check(**OAUTH)
        assert errors == []
        assert any("MCP_CAPABILITY_URL_ENABLED=false" in w for w in warnings)

    def test_production_oauth_is_clean(self):
        assert self._check(**OAUTH, MCP_CAPABILITY_URL_ENABLED="false") == ([], [])

    def test_oauth_off_with_a_lan_http_url_is_fine(self):
        assert self._check(APP_BASE_URL="http://10.0.0.5:24267") == ([], [])

    def test_hand_edited_values_are_judged_as_the_server_would(self):
        errors, _ = self._check(OAUTH_ENABLED="True")
        assert any("APP_BASE_URL is not set" in e for e in errors)

    def test_hand_edited_bad_entries_are_errors(self):
        errors, _ = self._check(APP_BASE_URL="https://x.example.com/path", JUNK="a b")
        assert any("bare origin" in e for e in errors)
        assert any("'JUNK'" in e and "left out" in e for e in errors)

    def test_settings_that_is_not_an_object(self):
        errors, _ = ss.check({"settings": "OAUTH_ENABLED=true"})
        assert "not an object" in errors[0]

    def test_errors_never_carry_a_secret(self):
        errors, warnings = self._check(SMTP_PASSWORD=f"{PASSWORD} x", SMTP_PORT="nope")
        assert PASSWORD not in " ".join(errors + warnings)


def test_parse_dotenv_names():
    text = "# comment\n\nOAUTH_ENABLED=true\nexport APP_BASE_URL='https://x.example'\nsmtp_host=mail\nnot a line\n"
    assert ss.parse_dotenv_names(text) == {
        "OAUTH_ENABLED": "true", "APP_BASE_URL": "https://x.example", "SMTP_HOST": "mail"}


# --- service file generation ----------------------------------------------

class TestGeneration:
    def test_no_settings_generates_the_same_files_as_before(self):
        """An install that sets nothing sees no change on upgrade."""
        for settings in (None, {}):
            assert generate_systemd_service(PORT, SECRET, HOST, settings) == generate_systemd_service(PORT, SECRET, HOST)
            assert "OAUTH" not in generate_systemd_service(PORT, SECRET, HOST, settings)
            assert generate_launchd_plist(PORT, SECRET, HOST, settings) == generate_launchd_plist(PORT, SECRET, HOST)

    def test_unit_carries_settings_sorted_after_the_identity(self):
        unit = generate_systemd_service(PORT, SECRET, HOST, {"OAUTH_ENABLED": "true", "APP_BASE_URL": OAUTH["APP_BASE_URL"]})
        lines = unit.splitlines()
        i = lines.index(f"Environment=SECRET_KEY={SECRET}")
        assert lines[i + 1:i + 4] == [
            f"Environment=APP_BASE_URL={OAUTH['APP_BASE_URL']}", "Environment=OAUTH_ENABLED=true", ""]
        assert lines[i + 4] == "[Install]"
        parsed = system._parse_systemd_unit(unit)
        assert parsed.env["OAUTH_ENABLED"] == "true"

    def test_unsafe_values_are_never_written(self):
        unit = generate_systemd_service(PORT, SECRET, HOST, {"X": "a\nExecStartPre=/bin/evil"})
        assert "evil" not in unit and "Environment=X" not in unit

    def test_plist_carries_settings_escaped(self):
        plist = generate_launchd_plist(PORT, SECRET, HOST, {**OAUTH, "SMTP_FROM": "a&b<c>@example.com"})
        env = plistlib.loads(plist.encode())["EnvironmentVariables"]
        assert env["OAUTH_ENABLED"] == "true"
        assert env["APP_BASE_URL"] == OAUTH["APP_BASE_URL"]
        assert env["SMTP_FROM"] == "a&b<c>@example.com"
        assert env["SECRET_KEY"] == SECRET

    def test_write_service_file_passes_settings(self, tmp_path):
        path = tmp_path / "chaotic.service"
        with patch("cli.system.get_os", return_value="linux"), \
             patch("cli.system.get_service_file_path", return_value=path):
            write_service_file(PORT, SECRET, HOST, OAUTH)
        assert "Environment=OAUTH_ENABLED=true" in path.read_text()


# --- reconcile -------------------------------------------------------------

@pytest.fixture
def unit_env(tmp_path):
    path = tmp_path / "chaotic.service"
    with patch("cli.system.get_os", return_value="linux"), \
         patch("cli.system.get_service_file_path", return_value=path), \
         patch("cli.system.SERVICE_BACKUP_DIR", tmp_path / "backups"), \
         patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")):
        yield path


class TestReconcile:
    def test_a_unit_carrying_the_settings_is_unchanged(self, unit_env):
        unit_env.write_text(generate_systemd_service(PORT, SECRET, HOST, OAUTH))
        assert reconcile_service_file(PORT, HOST, SECRET, settings=OAUTH).status == "unchanged"

    def test_settings_are_added_to_an_old_unit(self, unit_env):
        unit_env.write_text(_unit_before_cht_1474())
        result = reconcile_service_file(PORT, HOST, SECRET, settings=OAUTH)
        assert result.status == "updated", result.reason
        assert unit_env.read_text() == generate_systemd_service(PORT, SECRET, HOST, OAUTH)
        assert "+Environment=OAUTH_ENABLED=<redacted>" in result.diff

    def test_a_hand_added_line_still_blocks_when_server_json_lacks_it(self, unit_env):
        """No behaviour change for an install that set nothing: the line
        is never silently dropped (that would turn OAuth off)."""
        hand = _unit_before_cht_1474().replace("[Install]", "Environment=OAUTH_ENABLED=true\n\n[Install]")
        unit_env.write_text(hand)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped" and "Environment OAUTH_ENABLED" in result.reason
        assert unit_env.read_text() == hand

    def test_adopting_the_hand_added_value_unblocks_upgrades(self, unit_env):
        hand = generate_systemd_service(PORT, SECRET, HOST).replace(
            "[Install]", "Environment=OAUTH_ENABLED=true\nEnvironment=APP_BASE_URL=https://chaotic.example.com\n[Install]")
        unit_env.write_text(hand)
        result = reconcile_service_file(PORT, HOST, SECRET, settings=OAUTH)
        assert result.status == "updated", result.reason
        assert reconcile_service_file(PORT, HOST, SECRET, settings=OAUTH).status == "unchanged"

    def test_a_changed_value_blocks_unless_owned(self, unit_env):
        unit_env.write_text(generate_systemd_service(PORT, SECRET, HOST, OAUTH))
        off = {**OAUTH, "OAUTH_ENABLED": "false"}
        assert reconcile_service_file(PORT, HOST, SECRET, settings=off).status == "skipped"
        result = reconcile_service_file(PORT, HOST, SECRET, settings=off, owned=frozenset({"OAUTH_ENABLED"}))
        assert result.status == "updated", result.reason
        assert "Environment=OAUTH_ENABLED=false" in unit_env.read_text()

    def test_owned_never_covers_identity_or_other_lines(self, unit_env):
        hand = generate_systemd_service(PORT, SECRET, HOST).replace("[Install]", "Environment=FOO=1\n[Install]")
        unit_env.write_text(hand)
        result = reconcile_service_file(PORT, HOST, SECRET, settings=OAUTH, owned=frozenset({"OAUTH_ENABLED"}))
        assert result.status == "skipped" and "Environment FOO" in result.reason


# --- the commands ------------------------------------------------------------

@pytest.fixture
def server(tmp_path):
    """An installed server under tmp_path: server.json, a current unit,
    no drop-ins, no backend/.env, and the server running."""
    class Server:
        json = tmp_path / "server.json"
        unit = tmp_path / "chaotic.service"
        project = tmp_path / "server"
        systemd_dir = tmp_path / "systemd"
        running = True

        def info(self):
            return json.loads(self.json.read_text())

        def write(self, settings=None, unit_settings=None):
            data = {"host": HOST, "port": PORT, "secret_key": SECRET}
            if settings is not None:
                data["settings"] = settings
            self.json.write_text(json.dumps(data))
            self.unit.write_text(generate_systemd_service(
                PORT, SECRET, HOST, settings if unit_settings is None else unit_settings))

        def invoke(self, *args):
            """The result, with rich's line wrapping undone in .output
            (.raw keeps it as printed)."""
            result = CliRunner().invoke(cli, ["system", "config", *args])
            return SimpleNamespace(exit_code=result.exit_code, output=_flat(result.output), raw=result.output)

    s = Server()
    s.project.mkdir()
    with patch("cli.system.SERVER_JSON", s.json), \
         patch("cli.system.GLOBAL_CONFIG_DIR", tmp_path), \
         patch("cli.system.PROJECT_DIR", s.project), \
         patch("cli.system.is_server_installed", return_value=True), \
         patch("cli.system.get_os", return_value="linux"), \
         patch("cli.system.get_service_file_path", return_value=s.unit), \
         patch("cli.system.get_systemd_user_dir", return_value=s.systemd_dir), \
         patch("cli.system.SERVICE_BACKUP_DIR", tmp_path / "backups"), \
         patch("cli.system.is_service_running", side_effect=lambda: s.running), \
         patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")):
        s.write()  # after PROJECT_DIR is patched: the unit names it
        yield s


class TestSet:
    def test_sets_saves_and_rewrites_the_unit(self, server):
        result = server.invoke("set", "APP_BASE_URL", "https://chaotic.example.com/")
        assert result.exit_code == 0, result.output
        assert server.info()["settings"] == {"APP_BASE_URL": "https://chaotic.example.com"}
        assert server.info()["secret_key"] == SECRET
        assert "Environment=APP_BASE_URL=https://chaotic.example.com\n" in server.unit.read_text()
        assert "Updated service file" in result.output
        assert "chaotic system stop && chaotic system start" in result.output
        assert oct(server.json.stat().st_mode & 0o777) == "0o600"

    def test_name_is_case_insensitive(self, server):
        assert server.invoke("set", "oauth_dcr_enabled", "no").exit_code == 0
        assert server.info()["settings"] == {"OAUTH_DCR_ENABLED": "false"}

    def test_not_running_says_when_it_applies(self, server):
        server.running = False
        result = server.invoke("set", "OAUTH_DCR_ENABLED", "false")
        assert result.exit_code == 0, result.output
        assert "next 'chaotic system start'" in result.output

    def test_turning_oauth_on_in_order(self, server):
        assert server.invoke("set", "APP_BASE_URL", "https://chaotic.example.com").exit_code == 0
        result = server.invoke("set", "OAUTH_ENABLED", "true")
        assert result.exit_code == 0, result.output
        assert "MCP_CAPABILITY_URL_ENABLED=false" in result.output  # the warning
        unit = server.unit.read_text()
        assert "Environment=OAUTH_ENABLED=true" in unit and "Environment=APP_BASE_URL=" in unit

    def test_oauth_before_base_url_is_refused(self, server):
        before = (server.json.read_text(), server.unit.read_text())
        result = server.invoke("set", "OAUTH_ENABLED", "true")
        assert result.exit_code == 1
        assert "APP_BASE_URL is not set" in result.output and "Nothing was changed" in result.output
        assert (server.json.read_text(), server.unit.read_text()) == before

    def test_force_saves_despite_errors(self, server):
        result = server.invoke("set", "--force", "OAUTH_ENABLED", "true")
        assert result.exit_code == 0, result.output
        assert "Error:" in result.output
        assert server.info()["settings"] == {"OAUTH_ENABLED": "true"}

    @pytest.mark.parametrize("args,why", [
        (("NOT_A_SETTING", "x"), "--force"),
        (("SECRET_KEY", "x"), "not a setting"),
        (("--force", "PORT", "9999"), "reconfigure --port"),
        (("APP_BASE_URL", "https://chaotic.example.com/x"), "bare origin"),
        (("FORWARDED_ALLOW_IPS", "*"), "every sender"),
    ])
    def test_refused_values_change_nothing(self, server, args, why):
        before = (server.json.read_text(), server.unit.read_text())
        result = server.invoke("set", *args)
        assert result.exit_code == 1
        assert why in result.output
        assert (server.json.read_text(), server.unit.read_text()) == before

    def test_forced_unknown_name_is_set_and_hidden(self, server):
        result = server.invoke("set", "--force", "SOME_TOKEN", PASSWORD)
        assert result.exit_code == 0, result.output
        assert PASSWORD not in result.output
        assert f"Environment=SOME_TOKEN={PASSWORD}" in server.unit.read_text()

    def test_secret_value_is_never_printed(self, server):
        result = server.invoke("set", "SMTP_PASSWORD", PASSWORD)
        assert result.exit_code == 0, result.output
        assert PASSWORD not in result.output
        assert "SMTP_PASSWORD = <hidden>" in result.output
        for args in (("list",), ("get", "SMTP_PASSWORD"), ("check",)):
            out = server.invoke(*args)
            assert PASSWORD not in out.output, args

    def test_adopts_a_hand_added_line(self, server):
        """The ticket's case: Environment= lines added by hand made every
        upgrade skip the unit. Setting the same value adopts it."""
        server.unit.write_text(server.unit.read_text().replace(
            "[Install]", "Environment=OAUTH_ENABLED=true\nEnvironment=APP_BASE_URL=https://chaotic.example.com\n[Install]"))
        listed = server.invoke("list").output
        assert "set in the service file by hand" in listed and "OAUTH_ENABLED" in listed
        # The first cannot rewrite the unit yet (the hand-added
        # OAUTH_ENABLED is not in server.json), so it says so and fails;
        # the second has both and rewrites it.
        first = server.invoke("set", "APP_BASE_URL", "https://chaotic.example.com")
        assert first.exit_code == 1 and "Environment OAUTH_ENABLED" in first.output
        assert server.info()["settings"] == {"APP_BASE_URL": "https://chaotic.example.com"}
        second = server.invoke("set", "OAUTH_ENABLED", "true")
        assert second.exit_code == 0, second.output
        assert server.unit.read_text() == generate_systemd_service(PORT, SECRET, HOST, OAUTH)
        assert reconcile_service_file(PORT, HOST, SECRET, settings=OAUTH).status == "unchanged"

    def test_a_blocked_unit_keeps_server_json_and_fails_loudly(self, server):
        blocked = server.unit.read_text().replace("[Install]", "# my note\n[Install]")
        server.unit.write_text(blocked)
        result = server.invoke("set", "OAUTH_DCR_ENABLED", "false")
        assert result.exit_code == 1
        assert "Service file not updated" in result.output and "comments" in result.output
        assert server.unit.read_text() == blocked
        assert server.info()["settings"] == {"OAUTH_DCR_ENABLED": "false"}
        assert "does not say what server.json says" in server.invoke("list").output

    def test_dropin_override_is_warned(self, server):
        dropin = server.systemd_dir / "chaotic.service.d"
        dropin.mkdir(parents=True)
        (dropin / "override.conf").write_text("[Service]\nEnvironment=OAUTH_DCR_ENABLED=true\n")
        result = server.invoke("set", "OAUTH_DCR_ENABLED", "false")
        assert result.exit_code == 0, result.output
        assert "override.conf" in result.output and "overrides this" in result.output

    def test_not_installed(self, server):
        with patch("cli.system.is_server_installed", return_value=False):
            result = server.invoke("set", "OAUTH_ENABLED", "true")
        assert result.exit_code == 1 and "not installed" in result.output


class TestUnset:
    def test_removes_the_setting_and_its_line(self, server):
        server.write({"OAUTH_DCR_ENABLED": "false"})
        result = server.invoke("unset", "OAUTH_DCR_ENABLED")
        assert result.exit_code == 0, result.output
        assert server.info()["settings"] == {}
        assert "OAUTH_DCR_ENABLED" not in server.unit.read_text()
        assert server.unit.read_text() == generate_systemd_service(PORT, SECRET, HOST)

    def test_base_url_cannot_go_while_oauth_is_on(self, server):
        server.write(dict(OAUTH))
        result = server.invoke("unset", "APP_BASE_URL")
        assert result.exit_code == 1 and "APP_BASE_URL is not set" in result.output
        assert server.info()["settings"] == OAUTH

    def test_not_set(self, server):
        result = server.invoke("unset", "OAUTH_ENABLED")
        assert result.exit_code == 0 and "not set" in result.output

    def test_removes_an_invalid_hand_edited_entry(self, server):
        server.write({"BROKEN": "a b"}, unit_settings={})
        result = server.invoke("unset", "BROKEN")
        assert result.exit_code == 0, result.output
        assert server.info()["settings"] == {}


    def test_set_names_invalid_entries_it_drops(self, server):
        server.write({"BROKEN": "a b"}, unit_settings={})
        result = server.invoke("set", "OAUTH_DCR_ENABLED", "false")
        assert result.exit_code == 0, result.output
        assert "Removed invalid server.json setting 'BROKEN'" in result.output
        assert server.info()["settings"] == {"OAUTH_DCR_ENABLED": "false"}


class TestGetListCheck:
    def test_get(self, server):
        server.write(dict(OAUTH))
        result = server.invoke("get", "app_base_url")
        assert result.exit_code == 0 and result.raw == "https://chaotic.example.com\n"

    def test_get_unset_exits_1_with_the_default(self, server):
        result = server.invoke("get", "OAUTH_ENABLED")
        assert result.exit_code == 1 and "server default is false" in result.output

    def test_get_secret(self, server):
        server.write({"SMTP_PASSWORD": PASSWORD})
        result = server.invoke("get", "SMTP_PASSWORD")
        assert result.exit_code == 0 and PASSWORD not in result.output and "not shown" in result.output

    def test_list_shows_values_and_defaults(self, server):
        server.write({**OAUTH, "MCP_CAPABILITY_URL_ENABLED": "false"})
        out = server.invoke("list").output
        assert "https://chaotic.example.com" in out
        assert "not set (server default: 127.0.0.1,::1)" in out  # FORWARDED_ALLOW_IPS
        for name in ss.KNOWN:
            assert name in out
        assert "Note:" not in out and "Warning:" not in out

    def test_list_reports_backend_dotenv(self, server):
        server.write({"OAUTH_DCR_ENABLED": "false"})
        backend = server.project / "backend"
        backend.mkdir()
        (backend / ".env").write_text(f"OAUTH_DCR_ENABLED=true\nSMTP_PASSWORD={PASSWORD}\n")
        out = server.invoke("list").output
        assert "OAUTH_DCR_ENABLED: also set in" in out
        assert "SMTP_PASSWORD: set in" in out
        assert PASSWORD not in out

    def test_check_errors_exit_1(self, server):
        server.write({"OAUTH_ENABLED": "true"})
        result = server.invoke("check")
        assert result.exit_code == 1 and "APP_BASE_URL is not set" in result.output

    def test_check_warnings_exit_0(self, server):
        server.write(dict(OAUTH))
        result = server.invoke("check")
        assert result.exit_code == 0 and "Warning:" in result.output

    def test_check_clean(self, server):
        result = server.invoke("check")
        assert result.exit_code == 0 and "Settings look right" in result.output


# --- the other writers keep the settings ------------------------------------

def test_reconfigure_keeps_settings(server):
    server.write(dict(OAUTH))
    with patch("cli.system.validate_host", return_value=True), \
         patch("cli.system.set_api_url"):
        server.running = False
        result = CliRunner().invoke(cli, ["system", "reconfigure", "--port", "24300", "--yes"])
    assert result.exit_code == 0, result.output
    assert server.unit.read_text() == generate_systemd_service(24300, SECRET, HOST, OAUTH)


def test_upgrade_keeps_settings(tmp_path):
    path = tmp_path / "chaotic.service"
    path.write_text(_unit_before_cht_1474().replace(
        "[Install]", "Environment=APP_BASE_URL=https://chaotic.example.com\nEnvironment=OAUTH_ENABLED=true\n\n[Install]"))
    result, _ = _upgrade(
        load_server_json=dict(return_value={"port": PORT, "host": HOST, "secret_key": SECRET, "settings": OAUTH}),
        get_os=dict(return_value="linux"),
        get_service_file_path=dict(return_value=path),
        SERVICE_BACKUP_DIR=dict(new=tmp_path / "service-backups"),
    )
    assert result.exit_code == 0, result.output
    assert "Updated service file" in _flat(result.output)
    assert path.read_text() == generate_systemd_service(PORT, SECRET, HOST, OAUTH)


def test_upgrade_reports_settings_the_server_will_not_start_with(tmp_path):
    path = tmp_path / "chaotic.service"
    settings = {"OAUTH_ENABLED": "true"}  # saved with --force
    path.write_text(generate_systemd_service(PORT, SECRET, HOST, settings))
    result, _ = _upgrade(
        load_server_json=dict(return_value={"port": PORT, "host": HOST, "secret_key": SECRET, "settings": settings}),
        get_os=dict(return_value="linux"),
        get_service_file_path=dict(return_value=path),
        SERVICE_BACKUP_DIR=dict(new=tmp_path / "service-backups"),
    )
    assert "APP_BASE_URL is not set" in _flat(result.output)


class TestInstall:
    def _install(self, tmp_path, *config):
        from test_system_install import _install_patches
        saved = {}
        written = {}
        patches = _install_patches(
            GLOBAL_CONFIG_DIR=tmp_path, SERVER_DIR=tmp_path / "server",
            DATA_DIR=tmp_path / "data", LOGS_DIR=tmp_path / "logs",
            save_server_json=MagicMock(side_effect=saved.update),
            write_service_file=MagicMock(side_effect=lambda *a: written.setdefault("args", a) and Path("/x")),
        )
        args = ["system", "install", "--yes", "--no-start"]
        for pair in config:
            args += ["--config", pair]
        with patch.multiple("cli.system", **patches):
            result = CliRunner().invoke(cli, args)
        return result, saved, written, patches

    def test_config_is_saved_and_written(self, tmp_path):
        result, saved, written, _ = self._install(
            tmp_path, "APP_BASE_URL=https://chaotic.example.com/", "oauth_enabled=yes", "MCP_CAPABILITY_URL_ENABLED=false")
        assert result.exit_code == 0, result.output
        assert saved["settings"] == {**OAUTH, "MCP_CAPABILITY_URL_ENABLED": "false"}
        assert written["args"][3] == saved["settings"]

    def test_no_config_writes_no_settings(self, tmp_path):
        result, saved, written, _ = self._install(tmp_path)
        assert result.exit_code == 0, result.output
        assert "settings" not in saved
        assert written["args"][3] == {}

    @pytest.mark.parametrize("pair,why", [
        ("OAUTH_ENABLED=true", "APP_BASE_URL is not set"),
        ("NOPE=1", "--force"),
        ("APP_BASE_URL", "expected NAME=VALUE"),
        ("APP_BASE_URL=chaotic.example.com", "absolute"),
    ])
    def test_bad_config_installs_nothing(self, tmp_path, pair, why):
        result, saved, _, patches = self._install(tmp_path, pair)
        assert result.exit_code == 1
        assert why in result.output
        patches["run_migrations"].assert_not_called()
        assert saved == {}

    def test_secret_is_not_echoed_in_the_confirmation(self, tmp_path):
        from test_system_install import _install_patches
        patches = _install_patches(
            GLOBAL_CONFIG_DIR=tmp_path, SERVER_DIR=tmp_path / "server",
            DATA_DIR=tmp_path / "data", LOGS_DIR=tmp_path / "logs",
        )
        with patch.multiple("cli.system", **patches), \
             patch("cli.system._confirm_action", return_value=False):
            result = CliRunner().invoke(cli, ["system", "install", "--config", f"SMTP_PASSWORD={PASSWORD}"])
        assert result.exit_code == 0
        assert "SMTP_PASSWORD:" in result.output and PASSWORD not in result.output


# --- PR #349 independent review -------------------------------------------

class TestValuesThatUsedToRaise:
    """Finding 1: values that made normalize/check or the write raise."""

    @pytest.mark.parametrize("name,value", [
        ("APP_BASE_URL", "https://[x"),
        ("CORS_ORIGINS", "https://[x"),
        ("SMTP_PORT", "²"),
        ("SMTP_FROM", "a\udcffb"),
        ("SMTP_PASSWORD", "\udcff"),
    ])
    def test_refused_not_raised(self, name, value):
        _, problem = ss.normalize(name, value)
        assert problem

    def test_surrogates_are_never_stored(self):
        assert ss.stored_settings({"settings": {"SMTP_FROM": "a\udcffb"}}) == {}

    @pytest.mark.parametrize("settings", [
        {"APP_BASE_URL": "https://[x", "OAUTH_ENABLED": "true"},
        {"SMTP_PORT": "²"},
        {"SMTP_FROM": "a\udcffb"},
    ])
    def test_check_and_valid_settings_do_not_raise(self, settings):
        info = {"settings": settings}
        errors, _ = ss.check(info)
        assert errors
        assert set(ss.invalid_settings(info)) <= set(settings)
        assert all(name not in ss.valid_settings(info) for name in ss.invalid_settings(info))

    def test_an_invalid_base_url_is_reported_once(self):
        errors, _ = ss.check({"settings": {"APP_BASE_URL": "https://x.example.com/p", "OAUTH_ENABLED": "true"}})
        assert len(errors) == 1 and "bare origin" in errors[0]


class TestCanonicalOrigins:
    """Finding 3: inputs the server's issuer check refuses as non-canonical
    (backend/tests/test_cli_settings_parity.py pins the general rule)."""

    @pytest.mark.parametrize("raw", [
        "https://example.com:08443", "https://example.com:", "https://[0:0::1]",
        "https://010.0.0.1", "https://0x7f.0.0.1", "https://1234", "https://127.1",
        "https://a..b", "https://-a.example.com", "https://ab--c.example.com", "https://xn--zz",
        "https://exa_mple.com", "https://example.com:0",
    ])
    def test_refused(self, raw):
        assert ss.normalize("APP_BASE_URL", raw)[1], raw

    @pytest.mark.parametrize("raw", [
        "https://[::1]:8443", "https://127.0.0.1", "https://xn--bcher-kva.example", "https://a-b.example.com",
    ])
    def test_accepted(self, raw):
        assert ss.normalize("APP_BASE_URL", raw) == (raw, None)


class TestIPv6Origins:
    """CHT-1710: a CORS origin's IPv6 host is kept as written (lower case
    only), as the server keeps it; an APP_BASE_URL's is written as
    pydantic/WHATWG writes it, never in Python's dotted IPv4-mapped form."""

    @pytest.mark.parametrize("raw", [
        "http://[::ffff:7f00:1]:6274",  # what a browser sends
        "http://[::ffff:127.0.0.1]", "http://[0:0::1]", "https://[2001:0db8::1]:8443", "http://[::1]",
        "http://[1:0:0:2:0:0:0:3]",
    ])
    def test_cors_keeps_ipv6_text_as_written(self, raw):
        assert ss.normalize("CORS_ORIGINS", raw) == (raw, None)

    def test_cors_ipv6_must_be_lower_case(self):
        problem = ss.normalize("CORS_ORIGINS", "http://[::FFFF:7f00:1]:6274")[1]
        assert problem.endswith("lower case: 'http://[::ffff:7f00:1]:6274'"), problem

    @pytest.mark.parametrize("name", ["CORS_ORIGINS", "APP_BASE_URL"])
    @pytest.mark.parametrize("raw", ["http://[::1%eth0]", "http://[::g]", "http://[1:2:3]"])
    def test_not_an_ipv6_address_is_refused(self, name, raw):
        assert ss.normalize(name, raw)[1]

    @pytest.mark.parametrize("raw,canonical", [
        ("http://[::ffff:127.0.0.1]", "http://[::ffff:7f00:1]"),
        ("http://[0:0::1]", "http://[::1]"),
        ("http://[1:0:0:2:0:0:0:3]", "http://[1:0:0:2::3]"),  # the longest run
        ("http://[1:0:0:2:0:0:3:4]", "http://[1::2:0:0:3:4]"),  # the first of equal runs
    ])
    def test_base_url_suggests_the_whatwg_form(self, raw, canonical):
        problem = ss.normalize("APP_BASE_URL", raw)[1]
        assert problem.endswith(f"use {canonical!r}"), problem
        assert ss.normalize("APP_BASE_URL", canonical) == (canonical, None)

    @pytest.mark.parametrize("address,written", [
        ("::ffff:7f00:1", "::ffff:7f00:1"), ("::", "::"), ("::1", "::1"), ("1::", "1::"),
        ("1:0:2:3:4:5:6:7", "1:0:2:3:4:5:6:7"),  # a lone zero piece is not compressed
        ("2001:db8:0:0:1:0:0:1", "2001:db8::1:0:0:1"),
    ])
    def test_whatwg_serialisation(self, address, written):
        import ipaddress
        assert ss._whatwg_ipv6(ipaddress.IPv6Address(address)) == written


@pytest.mark.parametrize("line,value", [
    ("A=b # comment", "b"),
    ("A=b#not-a-comment", "b#not-a-comment"),
    ("A='b # kept' # gone", "b # kept"),
    ('A="b \\" c"', 'b " c'),
    ("A=", ""),
])
def test_dotenv_inline_comments(line, value):
    assert ss.parse_dotenv_names('A="b" trailing') == {}  # python-dotenv refuses the line
    """Finding 7: as python-dotenv reads them (parity: backend test)."""
    assert ss.parse_dotenv_names(line) == {"A": value}


class TestUpgradeNeverStopsOverSettings:
    """Finding 1 (blocker): settings can never crash an upgrade or keep it
    from starting the server."""

    def _upgrade_with(self, tmp_path, settings, unit=None, os_type="linux", **overrides):
        name = "chaotic.service" if os_type == "linux" else "com.chaotic.server.plist"
        path = tmp_path / name
        path.write_text(unit if unit is not None else (
            generate_systemd_service(PORT, SECRET, HOST) if os_type == "linux"
            else generate_launchd_plist(PORT, SECRET, HOST)))
        defaults = dict(
            load_server_json=dict(return_value={"port": PORT, "host": HOST, "secret_key": SECRET, "settings": settings}),
            get_os=dict(return_value=os_type),
            get_service_file_path=dict(return_value=path),
            SERVICE_BACKUP_DIR=dict(new=tmp_path / "service-backups"),
        )
        defaults.update(overrides)
        result, mocks = _upgrade(**defaults)
        return result, mocks, path

    @pytest.mark.parametrize("bad", [
        {"APP_BASE_URL": "https://[x"},
        {"SMTP_FROM": "a\udcffb"},
        {"SMTP_PORT": "²"},
        {"SMTP_PASSWORD": "\udcff" + PASSWORD},
    ])
    def test_bad_settings_are_named_left_out_and_the_server_starts(self, tmp_path, bad):
        settings = {"OAUTH_DCR_ENABLED": "false", **bad}
        result, m, path = self._upgrade_with(tmp_path, settings)
        assert result.exit_code == 0, result.output
        m["start_service"].assert_called_once()
        out = _flat(result.output)
        (name,) = bad
        assert f"Left out of the service file (invalid in server.json): {name}" in out
        assert PASSWORD not in result.output
        # Rendered without it, the good setting still lands.
        assert path.read_text() == generate_systemd_service(PORT, SECRET, HOST, {"OAUTH_DCR_ENABLED": "false"})

    def test_a_bad_value_already_in_the_unit_keeps_the_unit(self, tmp_path):
        """Dropping the line would change what the server runs with: the
        unit is kept as it is, and the server still starts."""
        unit = generate_systemd_service(PORT, SECRET, HOST).replace(
            "[Install]", "Environment=APP_BASE_URL=https://example.com:08443\n[Install]")
        result, m, path = self._upgrade_with(tmp_path, {"APP_BASE_URL": "https://example.com:08443"}, unit=unit)
        assert result.exit_code == 0, result.output
        m["start_service"].assert_called_once()
        assert path.read_text() == unit
        assert "Service file not updated" in _flat(result.output)

    def test_an_unexpected_exception_still_reaches_start(self, tmp_path):
        with patch("cli.server_settings.valid_settings", side_effect=RuntimeError("boom")):
            result, m, path = self._upgrade_with(tmp_path, {"OAUTH_DCR_ENABLED": "false"})
        assert result.exit_code == 0, result.output
        m["start_service"].assert_called_once()
        assert "checking server settings failed (RuntimeError)" in _flat(result.output)

    def test_darwin_upgrade_writes_settings_into_the_plist(self, tmp_path):
        result, m, path = self._upgrade_with(tmp_path, dict(OAUTH), os_type="darwin")
        assert result.exit_code == 0, result.output
        m["start_service"].assert_called_once()
        env = plistlib.loads(path.read_bytes())["EnvironmentVariables"]
        assert env["OAUTH_ENABLED"] == "true" and env["APP_BASE_URL"] == OAUTH["APP_BASE_URL"]
        assert ["systemctl", "--user", "daemon-reload"] not in [c.args[0] for c in m["run_command"].call_args_list]

    def test_darwin_upgrade_with_a_bad_setting(self, tmp_path):
        result, m, path = self._upgrade_with(tmp_path, {"SMTP_FROM": "a\udcffb"}, os_type="darwin")
        assert result.exit_code == 0, result.output
        m["start_service"].assert_called_once()
        assert path.read_text() == generate_launchd_plist(PORT, SECRET, HOST)


class TestAtomicWrites:
    def test_a_failed_service_file_write_keeps_the_old_file(self, tmp_path):
        path = tmp_path / "chaotic.service"
        path.write_text("old unit\n")
        with patch("cli.system.get_os", return_value="linux"), \
             patch("cli.system.get_service_file_path", return_value=path):
            with pytest.raises(UnicodeEncodeError):
                write_service_file(PORT, SECRET + "\udcff", HOST)
        assert path.read_text() == "old unit\n"
        assert list(tmp_path.iterdir()) == [path]

    def test_reconfigure_leaves_out_a_bad_setting(self, server):
        server.write({"OAUTH_DCR_ENABLED": "false", "SMTP_FROM": "a\udcffb"}, unit_settings={"OAUTH_DCR_ENABLED": "false"})
        server.running = False
        with patch("cli.system.validate_host", return_value=True), patch("cli.system.set_api_url"):
            result = CliRunner().invoke(cli, ["system", "reconfigure", "--port", "24300", "--yes"])
        assert result.exit_code == 0, result.output
        assert server.unit.read_text() == generate_systemd_service(24300, SECRET, HOST, {"OAUTH_DCR_ENABLED": "false"})

    def test_save_server_json_is_atomic_and_private(self, tmp_path):
        target = tmp_path / "server.json"
        target.write_text('{"secret_key": "KEEPME"}')
        with patch("cli.system.SERVER_JSON", target), patch("cli.system.GLOBAL_CONFIG_DIR", tmp_path):
            with pytest.raises(TypeError):
                system.save_server_json({"bad": object()})
            assert json.loads(target.read_text()) == {"secret_key": "KEEPME"}
            system.save_server_json({"secret_key": "NEW"})
        assert json.loads(target.read_text()) == {"secret_key": "NEW"}
        assert oct(target.stat().st_mode & 0o777) == "0o600"
        assert sorted(p.name for p in tmp_path.iterdir()) == ["server.json"]


class TestUnreadableServerJson:
    """Finding 2: set/unset never replace a server.json they cannot read."""

    @pytest.mark.parametrize("content", [
        '{"host": "127.0.0.1", "secret_key": "KEEPME", ',  # truncated
        '["not", "an", "object"]',
        '{"host": "127.0.0.1", "port": 24267}',  # lost its secret_key
        b'\xff\xfe',
    ])
    @pytest.mark.parametrize("args", [("set", "OAUTH_DCR_ENABLED", "false"), ("unset", "OAUTH_DCR_ENABLED")])
    def test_refused_and_untouched(self, server, content, args):
        raw = content if isinstance(content, bytes) else content.encode()
        server.json.write_bytes(raw)
        unit = server.unit.read_text()
        result = server.invoke(*args)
        assert result.exit_code == 1
        assert "Nothing was changed" in result.output and "restore it" in result.output
        assert server.json.read_bytes() == raw
        assert server.unit.read_text() == unit

    def test_missing(self, server):
        server.json.unlink()
        result = server.invoke("set", "OAUTH_DCR_ENABLED", "false")
        assert result.exit_code == 1 and "does not exist" in result.output
        assert not server.json.exists()


def test_adoption_refusal_names_the_hand_added_line(server):
    """Finding 4."""
    server.unit.write_text(server.unit.read_text().replace(
        "[Install]", "Environment=APP_BASE_URL=https://chaotic.example.com\n[Install]"))
    result = server.invoke("set", "OAUTH_ENABLED", "true")
    assert result.exit_code == 1
    assert "APP_BASE_URL is set in the service file or a drop-in by hand; adopt it first" in result.output
    assert "'chaotic system config adopt APP_BASE_URL'" in result.output


class TestStdin:
    """Finding 6: `set NAME -` keeps a secret out of argv."""

    def test_reads_stdin(self, server):
        result = CliRunner().invoke(cli, ["system", "config", "set", "SMTP_PASSWORD", "-"], input=PASSWORD + "\n")
        assert result.exit_code == 0, result.output
        assert server.info()["settings"] == {"SMTP_PASSWORD": PASSWORD}
        assert PASSWORD not in result.output

    def test_crlf_and_empty(self, server):
        CliRunner().invoke(cli, ["system", "config", "set", "SMTP_PASSWORD", "-"], input=PASSWORD + "\r\n")
        assert server.info()["settings"] == {"SMTP_PASSWORD": PASSWORD}
        CliRunner().invoke(cli, ["system", "config", "set", "SMTP_HOST", "-"], input="")
        assert server.info()["settings"]["SMTP_HOST"] == ""


def test_malformed_install_config_is_not_echoed(tmp_path):
    """Finding 5."""
    from test_system_install import _install_patches
    patches = _install_patches(GLOBAL_CONFIG_DIR=tmp_path, SERVER_DIR=tmp_path / "server",
                               DATA_DIR=tmp_path / "data", LOGS_DIR=tmp_path / "logs")
    with patch.multiple("cli.system", **patches):
        result = CliRunner().invoke(cli, ["system", "install", "--yes", "--config", f"SMTP_PASSWORD {PASSWORD}"])
    assert result.exit_code == 1
    assert "expected NAME=VALUE" in result.output and PASSWORD not in result.output


class TestVapidSetting:
    """VAPID_PRIVATE_KEY (CHT-1604): checked as the server checks a raw key."""

    GOOD = "7gD3QmEeDDHi0Ywv7QqzKn5Up9IGI1DSUoUyRmTAH7c"

    def test_accepts_a_raw_key_and_keeps_it_secret(self):
        assert ss.normalize("VAPID_PRIVATE_KEY", f" {self.GOOD} ") == (self.GOOD, None)
        assert ss.is_secret("VAPID_PRIVATE_KEY")
        assert ss.normalize("VAPID_PRIVATE_KEY", "") == ("", None)

    @pytest.mark.parametrize("value", [
        "short", "!!!" * 15, "A" * 44, "_" * 43, "A" * 43 + "%",
        "-----BEGIN-PRIVATE-KEY-----",
    ])
    def test_refuses_what_the_server_would(self, value):
        _value, problem = ss.normalize("VAPID_PRIVATE_KEY", value)
        assert problem and "P-256" in problem and value not in problem

    def test_check_reports_a_bad_stored_key(self):
        errors, _ = ss.check({"settings": {"VAPID_PRIVATE_KEY": "nope"}})
        assert any("VAPID_PRIVATE_KEY" in e for e in errors)

    def test_private_endpoints_is_a_bool(self):
        assert ss.normalize("PUSH_ALLOW_PRIVATE_ENDPOINTS", "YES") == ("true", None)
        assert ss.normalize("PUSH_ALLOW_PRIVATE_ENDPOINTS", "maybe")[1]


# --- drift between server.json, the unit and its drop-ins (CHT-1676) --------
#
# Found on prod: server.json said HOST 0.0.0.0 while the unit bound
# 127.0.0.1; CORS_ORIGINS, APP_BASE_URL and OAUTH_ENABLED were set by hand
# in the unit and MCP_CAPABILITY_URL_ENABLED=false in a drop-in, and
# `config check` still said the capability URL was served.

HAND = {**OAUTH, "CORS_ORIGINS": "https://chaotic.example.com"}


def _hand_unit(server, env=HAND, host=HOST):
    """The unit as install wrote it, with `env` added by hand."""
    lines = "".join(f"Environment={k}={v}\n" for k, v in env.items())
    server.unit.write_text(generate_systemd_service(PORT, SECRET, host).replace("[Install]", lines + "[Install]"))


def _dropin(server, body="[Service]\nTimeoutStopSec=30\nEnvironment=MCP_CAPABILITY_URL_ENABLED=false\n"):
    d = server.systemd_dir / "chaotic.service.d"
    d.mkdir(parents=True, exist_ok=True)
    (d / "override.conf").write_text(body)
    return d / "override.conf"


def _reconfigure(*args):
    with patch("cli.system.validate_host", return_value=True), patch("cli.system.set_api_url"):
        result = CliRunner().invoke(cli, ["system", "reconfigure", *args, "--yes"])
    return SimpleNamespace(exit_code=result.exit_code, output=_flat(result.output))


class TestCheckJudgesWhatTheServerGets:
    def test_host_drift_is_an_error(self, server):
        server.json.write_text(json.dumps({"host": "0.0.0.0", "port": PORT, "secret_key": SECRET}))
        result = server.invoke("check")
        assert result.exit_code == 1
        assert "server.json says HOST 0.0.0.0 but the service file says 127.0.0.1" in result.output
        assert "reconfigure --host" in result.output
        assert "server.json says HOST" in server.invoke("list").output

    def test_other_identity_drift_is_named_not_shown(self, server):
        server.json.write_text(json.dumps({"host": HOST, "port": PORT, "secret_key": "another-secret"}))
        result = server.invoke("check")
        assert result.exit_code == 1 and "disagree about SECRET_KEY" in result.output
        assert SECRET not in result.output and "another-secret" not in result.output

    def test_capability_url_turned_off_in_a_dropin_is_not_reported_as_served(self, server):
        server.write(dict(OAUTH))
        assert "still served" in server.invoke("check").output
        _dropin(server)
        result = server.invoke("check")
        assert result.exit_code == 0, result.output
        assert "still served" not in result.output
        assert "MCP_CAPABILITY_URL_ENABLED: set in drop-in override.conf, not in server.json" in result.output

    def test_settings_set_by_hand_in_the_unit_are_judged(self, server):
        _hand_unit(server, {"OAUTH_ENABLED": "true"})
        result = server.invoke("check")
        assert result.exit_code == 1 and "APP_BASE_URL is not set" in result.output
        assert "Once server.json" not in result.output

    def test_what_a_rewrite_would_break_is_reported_as_such(self, server):
        server.write({"OAUTH_ENABLED": "true"}, unit_settings={})
        result = server.invoke("check")
        assert result.exit_code == 1
        assert "Once server.json is written to the service file: OAUTH_ENABLED is true" in result.output

    def test_a_dropin_holding_the_same_value(self, server):
        server.write({"MCP_CAPABILITY_URL_ENABLED": "false"})
        _dropin(server)
        assert "to the same value. Delete it there" in server.invoke("list").output

    def test_hand_set_lines_point_at_adopt(self, server):
        _hand_unit(server, {"OAUTH_DCR_ENABLED": "false", "FOO": "1"})
        out = server.invoke("list").output
        assert "Adopt it with 'chaotic system config adopt'" in out
        assert "'chaotic system config adopt FOO --force'" in out


class TestAdopt:
    def test_the_prod_case(self, server):
        _hand_unit(server)
        conf = _dropin(server)
        dropin_before = conf.read_text()
        result = server.invoke("adopt")
        assert result.exit_code == 0, result.output
        adopted = {**HAND, "MCP_CAPABILITY_URL_ENABLED": "false"}
        assert server.info()["settings"] == adopted
        assert server.unit.read_text() == generate_systemd_service(PORT, SECRET, HOST, adopted)
        assert "MCP_CAPABILITY_URL_ENABLED = false (from drop-in override.conf)" in result.output
        assert "OAUTH_ENABLED = true (from the service file)" in result.output
        assert "delete it from drop-in override.conf" in result.output
        assert conf.read_text() == dropin_before  # drop-ins are never edited
        check = server.invoke("check")
        assert check.exit_code == 0 and "still served" not in check.output
        assert reconcile_service_file(PORT, HOST, SECRET, settings=adopted).status == "unchanged"

    def test_with_host_drift_it_saves_and_says_how_to_finish(self, server):
        _hand_unit(server)
        server.json.write_text(json.dumps({"host": "0.0.0.0", "port": PORT, "secret_key": SECRET}))
        result = server.invoke("adopt")
        assert result.exit_code == 1
        assert "Service file not updated" in result.output and "reconfigure --host" in result.output
        assert server.info()["settings"] == HAND
        # Then reconfigure to the unit's host: nothing hand-set is lost now.
        server.running = False
        done = _reconfigure("--host", HOST)
        assert done.exit_code == 0, done.output
        assert server.unit.read_text() == generate_systemd_service(PORT, SECRET, HOST, HAND)
        assert server.invoke("check").exit_code == 0

    def test_a_differing_value_is_adopted_only_when_named(self, server):
        server.write({"OAUTH_DCR_ENABLED": "true"}, unit_settings={"OAUTH_DCR_ENABLED": "false"})
        result = server.invoke("adopt")
        assert result.exit_code == 0 and "server.json holds another value" in result.output
        assert server.info()["settings"] == {"OAUTH_DCR_ENABLED": "true"}
        named = server.invoke("adopt", "oauth_dcr_enabled")
        assert named.exit_code == 0, named.output
        assert server.info()["settings"] == {"OAUTH_DCR_ENABLED": "false"}

    def test_unknown_names_need_force(self, server):
        _hand_unit(server, {"FOO": "1"})
        assert "adopt FOO --force" in server.invoke("adopt").output
        refused = server.invoke("adopt", "FOO")
        assert refused.exit_code == 1 and "--force" in refused.output
        forced = server.invoke("adopt", "FOO", "--force")
        assert forced.exit_code == 0, forced.output
        assert server.info()["settings"] == {"FOO": "1"}

    def test_a_name_set_nowhere(self, server):
        result = server.invoke("adopt", "OAUTH_ENABLED")
        assert result.exit_code == 1 and "not set in the service file or a drop-in" in result.output

    def test_nothing_to_adopt(self, server):
        result = server.invoke("adopt")
        assert result.exit_code == 0 and "Nothing to adopt" in result.output

    def test_an_unusable_value_changes_nothing(self, server):
        _hand_unit(server, {"OAUTH_ENABLED": "maybe"})
        before = server.unit.read_text()
        result = server.invoke("adopt")
        assert result.exit_code == 1 and "Nothing was changed" in result.output
        assert "settings" not in server.info() and server.unit.read_text() == before

    def test_secrets_are_not_shown(self, server):
        _hand_unit(server, {"SMTP_PASSWORD": PASSWORD})
        result = server.invoke("adopt")
        assert result.exit_code == 0, result.output
        assert PASSWORD not in result.output and "SMTP_PASSWORD = <hidden>" in result.output


class TestReconfigureKeepsHandSetLines:
    def test_refuses_to_drop_a_hand_set_line(self, server):
        _hand_unit(server)
        before, info = server.unit.read_text(), server.info()
        server.running = False
        result = _reconfigure("--port", "24300")
        assert result.exit_code == 1, result.output
        assert "Not replacing the service file" in result.output and "OAUTH_ENABLED" in result.output
        assert "config adopt" in result.output
        assert server.unit.read_text() == before and server.info() == info

    def test_force_replaces_it_and_keeps_the_old_file(self, server, tmp_path):
        _hand_unit(server)
        before = server.unit.read_text()
        server.running = False
        result = _reconfigure("--port", "24300", "--force")
        assert result.exit_code == 0, result.output
        assert server.unit.read_text() == generate_systemd_service(24300, SECRET, HOST)
        backups = list((tmp_path / "backups").glob("chaotic.service.*.bak"))
        assert [b.read_text() for b in backups] == [before]

    def test_rewrites_a_unit_that_disagrees_even_when_server_json_agrees(self, server):
        server.unit.write_text(generate_systemd_service(PORT, SECRET, "0.0.0.0"))
        server.running = False
        result = _reconfigure("--host", HOST)
        assert result.exit_code == 0, result.output
        assert "No changes" not in result.output and "The service file says host 0.0.0.0" in result.output
        assert server.unit.read_text() == generate_systemd_service(PORT, SECRET, HOST)

    def test_a_missing_secret_does_not_replace_the_units(self, server):
        server.json.write_text(json.dumps({"host": HOST, "port": PORT}))
        before = server.unit.read_text()
        server.running = False
        result = _reconfigure("--port", "24300")
        assert result.exit_code == 1 and "SECRET_KEY" in result.output
        assert server.unit.read_text() == before


class TestReviewFindings:
    """PR #370 review: values from the unit or a drop-in were never
    checked by `set`, drop-ins can set what the server is, and
    reconfigure/adopt had misleading or half-done paths."""

    def test_an_unparseable_url_in_the_unit_is_reported_not_raised(self, server):
        _hand_unit(server, {"OAUTH_ENABLED": "true", "APP_BASE_URL": "http://[::1"})
        result = server.invoke("check")
        assert result.exit_code == 1 and "APP_BASE_URL" in result.output
        assert "Traceback" not in result.output and "Error:" in result.output

    def test_a_value_the_server_would_refuse_is_an_error(self, server):
        _hand_unit(server, {"OAUTH_ENABLED": "maybe"})
        result = server.invoke("check")
        assert result.exit_code == 1 and "true or false" in result.output

    def test_an_invalid_server_json_url_is_not_also_reported_missing(self, server):
        server.write({"OAUTH_ENABLED": "true", "APP_BASE_URL": "ftp://chaotic.example.com"}, unit_settings=OAUTH)
        result = server.invoke("check")
        assert result.exit_code == 1 and "absolute http(s) URL" in result.output
        assert "is not set" not in result.output

    def test_a_dropin_setting_the_port_is_an_error_and_blocks_reconfigure(self, server):
        _dropin(server, f"[Service]\nEnvironment=PORT=9999\nEnvironment=SECRET_KEY={SECRET}x\n")
        result = server.invoke("check")
        assert result.exit_code == 1 and "Drop-in override.conf sets PORT, SECRET_KEY" in result.output
        assert SECRET not in result.output
        before = server.unit.read_text()
        server.running = False
        refused = _reconfigure("--port", "24300")
        assert refused.exit_code == 1 and "drop-in would keep overriding" in refused.output
        assert server.unit.read_text() == before and server.info()["port"] == PORT

    def test_a_dropin_that_resets_the_environment_is_a_warning(self, server):
        _dropin(server, "[Service]\nEnvironment=\n")
        result = server.invoke("check")
        assert result.exit_code == 0 and "may not be the ones the server gets" in result.output

    def test_an_ordinary_port_change_says_nothing_about_drift(self, server):
        server.running = False
        result = _reconfigure("--port", "24300")
        assert result.exit_code == 0, result.output
        assert "The service file says" not in result.output

    def test_a_failed_backup_changes_nothing(self, server, tmp_path):
        (tmp_path / "backups").write_text("not a directory")
        before, info = server.unit.read_text(), server.info()
        server.running = False
        result = _reconfigure("--port", "24300")
        assert result.exit_code == 1 and "Nothing was changed" in result.output
        assert server.unit.read_text() == before and server.info() == info

    def test_a_secret_mismatch_names_the_consequence(self, server):
        server.json.write_text(json.dumps({"host": HOST, "port": PORT, "secret_key": "another-secret"}))
        before = server.unit.read_text()
        server.running = False
        result = _reconfigure("--port", "24300")
        assert result.exit_code == 1 and "every session is logged out" in result.output
        assert "config adopt" not in result.output and server.unit.read_text() == before

    def test_a_string_port_in_server_json_is_no_change(self, server):
        server.json.write_text(json.dumps({"host": HOST, "port": str(PORT), "secret_key": SECRET}))
        result = _reconfigure("--port", str(PORT))
        assert result.exit_code == 0 and "No changes" in result.output

    def test_adopt_skips_a_bad_value_and_adopts_the_rest(self, server):
        _hand_unit(server, {"OAUTH_DCR_ENABLED": "maybe", "CORS_ORIGINS": "https://chaotic.example.com"})
        result = server.invoke("adopt")
        assert "Not adopting OAUTH_DCR_ENABLED" in result.output
        assert server.info()["settings"] == {"CORS_ORIGINS": "https://chaotic.example.com"}
        # The bad line is still in the unit, so the rewrite is blocked; it says so honestly.
        assert result.exit_code == 1 and "server.json now holds CORS_ORIGINS" in result.output
        assert "will not see this setting" not in result.output

    def test_adopt_partial_success_names_what_is_left(self, server):
        _hand_unit(server, {"OAUTH_DCR_ENABLED": "false", "FOO": "1"})
        result = server.invoke("adopt")
        assert result.exit_code == 1
        assert "adopt FOO --force" in result.output and "server.json now holds OAUTH_DCR_ENABLED" in result.output

    def test_adopt_takes_the_dropins_value_over_the_units(self, server):
        _hand_unit(server, {"OAUTH_DCR_ENABLED": "true"})
        _dropin(server, "[Service]\nEnvironment=OAUTH_DCR_ENABLED=false\n")
        result = server.invoke("adopt")
        assert result.exit_code == 0, result.output
        assert server.info()["settings"] == {"OAUTH_DCR_ENABLED": "false"}
        assert server.unit.read_text() == generate_systemd_service(PORT, SECRET, HOST, {"OAUTH_DCR_ENABLED": "false"})

    def test_adopt_a_reserved_name_says_why(self, server):
        result = server.invoke("adopt", "PATH")
        assert result.exit_code == 1 and "is not a setting" in result.output

    def test_launchd_drift(self, server, tmp_path):
        plist = tmp_path / "chaotic.plist"
        plist.write_text(generate_launchd_plist(PORT, SECRET, "0.0.0.0"))
        with patch("cli.system.get_os", return_value="darwin"), \
             patch("cli.system.get_service_file_path", return_value=plist):
            result = server.invoke("check")
        assert result.exit_code == 1
        assert "server.json says HOST 127.0.0.1 but the service file says 0.0.0.0" in result.output
