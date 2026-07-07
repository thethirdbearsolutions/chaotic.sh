"""SMTP email delivery for gate-pending notices and team invitations (CHT-1251).

Exactly two things send email: a GATE ritual becoming pending for a human,
and a team invitation (the accept link is otherwise undeliverable without
DB access). Everything else in the human-supervision surface (mentions,
assignment, review requests) is inbox-only -- see InboxService.

Doctrine:
  * Unconfigured SMTP (no smtp_host) => log-and-skip. Never an error in
    the mutating path.
  * Configured but failing (connection refused, auth failure, etc.) =>
    loud log (logger.exception/error). Still never raises into the
    caller -- a flaky mail relay must not turn a ticket update or an
    invitation create into a 500.
  * Sends are fire-and-forget from the caller's perspective: scheduled
    via asyncio.create_task so the mutating request returns without
    waiting on an SMTP round-trip. Tasks are held in a module-level set
    so they aren't garbage-collected mid-flight (the standard
    "Task was destroyed but it is pending" asyncio pitfall).
"""
import asyncio
import logging
import smtplib
from email.message import EmailMessage

from app.config import get_settings

logger = logging.getLogger(__name__)

# Strong references for in-flight fire-and-forget tasks (see module
# docstring). Discarded via add_done_callback once each task finishes.
_background_tasks: set[asyncio.Task] = set()


def fire_and_forget(coro) -> asyncio.Task:
    """Schedule `coro` without awaiting it, keeping a strong reference
    until it completes. Exceptions inside `coro` must be handled by the
    coroutine itself (EmailService.send never raises) -- an unhandled
    exception here would only surface as an "exception never retrieved"
    log line, not a caller-visible failure, which is exactly the
    fail-soft/fail-loud contract this module promises.
    """
    task = asyncio.create_task(coro)
    _background_tasks.add(task)
    task.add_done_callback(_background_tasks.discard)
    return task


class EmailService:
    """Renders and sends the two plain-text email templates."""

    def __init__(self):
        self.settings = get_settings()

    def is_configured(self) -> bool:
        return bool(self.settings.smtp_host)

    async def send(self, to: str, subject: str, body: str) -> bool:
        """Send a plain-text email. Returns True if actually sent, False
        if skipped (unconfigured) or failed (configured but SMTP error).
        Never raises.
        """
        if not to:
            logger.info("Skipping email (no recipient address): %s", subject)
            return False
        if not self.is_configured():
            logger.info("SMTP not configured; skipping email to %s: %s", to, subject)
            return False

        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = self.settings.smtp_from
        msg["To"] = to
        msg.set_content(body)

        try:
            await asyncio.to_thread(self._send_sync, msg)
            return True
        except Exception:
            logger.exception(
                "SMTP send failed (host=%s port=%s) to=%s subject=%r",
                self.settings.smtp_host, self.settings.smtp_port, to, subject,
            )
            return False

    def _send_sync(self, msg: EmailMessage) -> None:
        """Blocking SMTP send, run off the event loop via asyncio.to_thread."""
        with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=10) as server:
            server.ehlo()
            if server.has_extn("STARTTLS"):
                server.starttls()
                server.ehlo()
            if self.settings.smtp_user:
                server.login(self.settings.smtp_user, self.settings.smtp_password)
            server.send_message(msg)

    # ------------------------------------------------------------------
    # Templates -- plain text, terse. Pure functions (no I/O) so they're
    # trivially unit-testable independent of the send path.
    # ------------------------------------------------------------------

    def render_gate_pending(
        self, *, requested_by_name: str, issue_identifier: str, issue_title: str,
        ritual_name: str, ritual_prompt: str, issue_url: str | None = None,
    ) -> tuple[str, str]:
        """Render the gate-pending notice. Returns (subject, body)."""
        subject = f"[Chaotic] Gate pending: {issue_identifier}"
        lines = [
            f"{requested_by_name} is waiting on you to complete a gate ritual.",
            "",
            f"Ticket: {issue_identifier} — {issue_title}",
            f"Ritual: {ritual_name}",
            ritual_prompt,
        ]
        if issue_url:
            lines += ["", issue_url]
        lines += ["", "— Chaotic"]
        return subject, "\n".join(lines)

    def render_invitation(
        self, *, team_name: str, role: str, invited_by_name: str, accept_url: str,
    ) -> tuple[str, str]:
        """Render the team-invitation email. Returns (subject, body)."""
        subject = f"[Chaotic] {invited_by_name} invited you to {team_name}"
        body = (
            f"{invited_by_name} invited you to join {team_name} on Chaotic as {role}.\n"
            "\n"
            f"Accept the invitation:\n{accept_url}\n"
            "\n"
            "This link expires in 7 days.\n"
            "\n"
            "— Chaotic"
        )
        return subject, body

    # ------------------------------------------------------------------
    # Fire-and-forget senders -- schedule the send (+ a fail-loud log)
    # without blocking the caller. Gate-pending notices are dispatched by
    # InboxService instead (it chains an issue-activity note on a
    # configured-but-failing send, which needs the issue in scope), so
    # only the invitation path -- with no such follow-up -- gets a
    # convenience method here.
    # ------------------------------------------------------------------

    def send_invitation_email(
        self, to: str, *, team_name: str, role: str, invited_by_name: str, accept_url: str,
    ) -> None:
        """Fire-and-forget the invitation email."""
        subject, body = self.render_invitation(
            team_name=team_name, role=role,
            invited_by_name=invited_by_name, accept_url=accept_url,
        )
        fire_and_forget(self.send(to, subject, body))
