r"""Seed a throwaway Chaotic server with made-up data for the website's
product screenshots (CHT-2089). Everything here is fictional, and the
script refuses any server that is not on localhost.

    # in backend/, against a fresh database:
    DATABASE_URL=sqlite+aiosqlite:////tmp/demo.db BCRYPT_ROUNDS=4 \
        uv run uvicorn app.main:app --port 24300 &
    uv run python ../scripts/website-screenshots/seed.py
    NODE_PATH=../frontend/node_modules node ../scripts/website-screenshots/shoot.js /tmp \
        '[["inbox","/inbox"],["epics","/epics"],["detail","/issue/API-8"]]'

shoot.js reads the server from CHAOTIC_URL (default http://127.0.0.1:24300).
Crop each 2880x1800 shot to its top 2880x1620 and save it as
website/images/app-<name>.webp:

    uv run python -c "from PIL import Image; Image.open('/tmp/inbox.png').convert('RGB')\
        .crop((0, 0, 2880, 1620)).save('../website/images/app-inbox.webp', quality=86, method=6)"

Avatars come from DiceBear (notionists and bottts-neutral styles).
"""
import sys, json, pathlib, urllib.parse
import httpx

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:24300/api"
if urllib.parse.urlsplit(BASE).hostname not in ("127.0.0.1", "localhost", "::1"):
    raise SystemExit(f"refusing to seed {BASE}: this script is for a throwaway local server only")
HERE = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "/tmp")
AV = HERE / "chaotic-demo-avatars"
AV.mkdir(exist_ok=True)
c = httpx.Client(timeout=30)


def req(method, path, token=None, **kw):
    h = kw.pop("headers", {})
    if token:
        h["Authorization"] = f"Bearer {token}"
    r = c.request(method, BASE + path, headers=h, **kw)
    if r.status_code >= 400:
        raise SystemExit(f"{method} {path} -> {r.status_code}: {r.text[:500]}")
    return r.json() if r.content else None


def avatar(seed, style, bg):
    f = AV / f"{style}-{seed}.png"
    if not f.exists():
        url = f"https://api.dicebear.com/9.x/{style}/png?seed={urllib.parse.quote(seed)}&size=256&backgroundColor={bg}"
        r = httpx.get(url, timeout=30)
        r.raise_for_status()
        f.write_bytes(r.content)
    return f.read_bytes()


PEOPLE = [
    ("Ada Okafor", "ada@example.com", "she/her", "Runs the platform team.", "c0aede"),
    ("Bob Tanaka", "bob@example.com", "he/him", "Backend, mostly.", "b6e3f4"),
    ("Alice Moreno", "alice@example.com", "she/her", "Design and the web app.", "ffd5dc"),
]
tok = {}
for name, email, pron, bio, bg in PEOPLE:
    req("POST", "/auth/signup", json={"email": email, "password": "demo-password-1", "name": name})
    tok[name] = req("POST", "/auth/login", json={"email": email, "password": "demo-password-1"})["access_token"]
    req("PATCH", "/users/me", tok[name], json={"pronouns": pron, "bio": bio})
    req("PUT", "/users/me/avatar", tok[name], content=avatar(name.split()[0], "notionists", bg),
        headers={"Content-Type": "image/png"})
ada, bob, alice = (tok[p[0]] for p in PEOPLE)
me = {n: req("GET", "/auth/me", t)["id"] for n, t in tok.items()}

team = req("POST", "/teams", ada, json={"name": "Lumen Labs", "key": "LUM"})
for name, email, *_ in PEOPLE[1:]:
    inv = req("POST", f"/teams/{team['id']}/invitations", ada, json={"email": email})
    token = inv["accept_url"].rstrip("/").split("/")[-1]
    req("POST", f"/teams/invitations/{token}/accept", tok[name])

AGENTS = [  # name, owner, tagline
    ("Wren", "Ada Okafor", "Reviews every PR before it merges."),
    ("Juniper", "Bob Tanaka", "Works the backend queue."),
    ("Quill", "Alice Moreno", "Writes the docs nobody else will."),
]
agent = {}
for name, owner, tagline in AGENTS:
    a = req("POST", f"/teams/{team['id']}/agents", tok[owner], json={"name": name, "tagline": tagline})
    req("PUT", f"/agents/{a['id']}/avatar", tok[owner], content=avatar(name, "bottts-neutral", "d1d4f9"),
        headers={"Content-Type": "image/png"})
    agent[name] = {"id": a["id"], "key": a["api_key"]}
wren, juniper, quill = (agent[n]["key"] for n in ("Wren", "Juniper", "Quill"))

api = req("POST", f"/teams/{team['id']}/projects", ada, json={
    "name": "Backend API", "key": "API", "color": "#6366f1", "default_sprint_budget": 20})
web = req("POST", f"/teams/{team['id']}/projects", ada, json={
    "name": "Web App", "key": "WEB", "color": "#10b981", "default_sprint_budget": 15})
rituals = {}
sprint = {}
for p in (api, web):
    sprint[p["id"]] = req("POST", f"/projects/{p['id']}/sprints", ada)["id"]
    rituals[p["id"]] = req("POST", f"/projects/{p['id']}/rituals", ada, json={
        "name": "code-review", "prompt": "Get an oppositional review of the change and address every finding.",
        "trigger": "ticket_close", "approval_mode": "review"})

labels = {}
for n, col in [("bug", "#ef4444"), ("perf", "#f59e0b"), ("auth", "#8b5cf6"), ("docs", "#10b981"), ("ux", "#ec4899")]:
    labels[n] = req("POST", f"/teams/{team['id']}/labels", ada, json={"name": n, "color": col})["id"]


def issue(p, title, token=ada, **kw):
    if "labels" in kw:
        kw["label_ids"] = [labels[l] for l in kw.pop("labels")]
    if kw.get("issue_type") != "epic":
        kw.setdefault("sprint_id", sprint[p["id"]])
    return req("POST", f"/projects/{p['id']}/issues", token, json={"title": title, **kw})


A = {"Wren": agent["Wren"]["id"], "Juniper": agent["Juniper"]["id"], "Quill": agent["Quill"]["id"], **me}

e1 = issue(api, "Public API v2", issue_type="epic", priority="high",
           description="Cursor pagination, idempotent writes and versioned errors across every endpoint.")
e2 = issue(api, "Webhooks that never drop an event", issue_type="epic", priority="medium")
e5 = issue(api, "Audit log for every write", issue_type="epic", priority="medium")
e6 = issue(api, "Faster cold starts", issue_type="epic", priority="low")
e3 = issue(web, "Onboarding in under five minutes", issue_type="epic", priority="high")
e4 = issue(web, "Accessible by default", issue_type="epic", priority="medium")

work = [
    # project, title, parent, assignee, status, estimate, type, priority, labels
    (api, "Paginate /v2/orders with cursors", e1, "Juniper", "done", 3, "feature", "high", []),
    (api, "Idempotency keys on every POST", e1, "Juniper", "done", 5, "feature", "high", []),
    (api, "Versioned error codes", e1, "Bob Tanaka", "in_progress", 3, "feature", "medium", []),
    (api, "Rotate signing keys without downtime", e1, "Juniper", "in_review", 5, "task", "high", ["auth"]),
    (api, "Session cookies missing SameSite on login", e1, "Wren", "todo", 1, "bug", "urgent", ["auth", "bug"]),
    (api, "Deprecation headers for v1", e1, None, "backlog", 2, "task", "low", []),
    (api, "Retry webhooks with exponential backoff", e2, "Juniper", "done", 3, "feature", "high", []),
    (api, "Dead-letter queue for failed deliveries", e2, "Bob Tanaka", "in_progress", 5, "feature", "medium", ["perf"]),
    (api, "Webhook retries double-deliver on 502", e2, "Wren", "todo", 2, "bug", "high", ["bug"]),
    (api, "Signed payloads", e2, None, "backlog", 3, "feature", "medium", ["auth"]),
    (api, "Record actor and diff on every mutation", e5, "Juniper", "in_review", 3, "feature", "medium", []),
    (api, "Audit log retention policy", e5, "Ada Okafor", "todo", 2, "task", "medium", []),
    (api, "Export audit log as CSV", e5, "Wren", "done", 1, "feature", "low", []),
    (api, "Lazy-load the template engine", e6, "Juniper", "done", 2, "tech_debt", "low", ["perf"]),
    (api, "Profile boot with 10k projects", e6, None, "backlog", 3, "task", "low", ["perf"]),
    (web, "Guided first project", e3, "Alice Moreno", "done", 3, "feature", "high", ["ux"]),
    (web, "Invite teammates from the empty state", e3, "Quill", "done", 2, "feature", "medium", ["ux"]),
    (web, "Connect an agent in one step", e3, "Alice Moreno", "in_progress", 5, "feature", "high", ["ux"]),
    (web, "Quickstart doc for agent harnesses", e3, "Quill", "in_review", 2, "docs", "medium", ["docs"]),
    (web, "Sample data toggle", e3, None, "todo", 3, "feature", "low", []),
    (web, "Keyboard navigation on the board", e4, "Alice Moreno", "todo", 3, "feature", "medium", ["ux"]),
    (web, "Contrast audit for status colors", e4, "Quill", "done", 1, "task", "medium", ["ux"]),
    (web, "Screen-reader labels on icon buttons", e4, None, "backlog", 2, "task", "medium", []),
]
made = {}
for p, title, parent, who, status, est, typ, pri, lab in work:
    i = issue(p, title, parent_id=parent["id"], assignee_id=A[who] if who else None, estimate=est,
              issue_type=typ, priority=pri, labels=lab, status="todo" if status != "backlog" else "backlog")
    made[title] = (i, who, status)

keys = {"Wren": wren, "Juniper": juniper, "Quill": quill}


def actor(who):
    return keys.get(who) or tok.get(who)


for title, (i, who, status) in made.items():
    if status == "todo" or status == "backlog":
        continue
    t = actor(who)
    req("PATCH", f"/issues/{i['id']}", t, json={"status": "in_progress"})
    if status in ("done", "in_review"):
        req("PATCH", f"/issues/{i['id']}", t, json={"status": "in_review"})
        r = rituals[i["project_id"]]
        req("POST", f"/rituals/{r['id']}/attest-issue/{i['id']}", t,
            json={"note": "Review found two edge cases in the retry path; both fixed with tests."})
    if status == "done":
        req("POST", f"/rituals/{rituals[i['project_id']]['id']}/approve-issue/{i['id']}", ada)
        req("PATCH", f"/issues/{i['id']}", t, json={"status": "done"})

# Conversation on the ticket we'll show in detail
det = made["Rotate signing keys without downtime"][0]
req("POST", f"/issues/{det['id']}/comments", juniper, json={"content":
    "Both keys are now valid during the overlap window; the old one stops verifying after 24h. Migration and tests are in."})
req("POST", f"/issues/{det['id']}/comments", bob, json={"content":
    "Nice. Can we log which key signed each token, so we can see when the old one goes quiet?"})
req("POST", f"/issues/{det['id']}/comments", juniper, json={"content":
    "Added a `kid` to every token and a counter per key. Ready for review."})
req("POST", f"/issues/{made['Quickstart doc for agent harnesses'][0]['id']}/comments", quill,
    json={"content": "Draft is up. @alice can you check the screenshots match the new settings page?"})
req("POST", f"/issues/{made['Session cookies missing SameSite on login'][0]['id']}/comments", wren,
    json={"content": "Found while reviewing the signing-key change. @ada this one is yours to prioritize."})
req("PATCH", f"/issues/{det['id']}", ada, json={"description":
    "Signing keys rotate every 90 days, and today a rotation logs everyone out.\n\n"
    "- Accept tokens signed by the old **and** new key during a 24h overlap\n"
    "- Stamp a `kid` on every token\n- Alert when the old key is still verifying after the window"})
req("POST", f"/issues/{made['Dead-letter queue for failed deliveries'][0]['id']}/comments", juniper,
    json={"content": "@ada should replays from the dead-letter queue count against the sprint budget?"})
req("POST", f"/issues/{made['Connect an agent in one step'][0]['id']}/comments", alice,
    json={"content": "@ada new flow is on staging, would love your eyes before Friday."})
req("PATCH", f"/issues/{made['Audit log retention policy'][0]['id']}", bob, json={"assignee_id": me["Ada Okafor"]})
req("PATCH", f"/issues/{made['Deprecation headers for v1'][0]['id']}", bob, json={"assignee_id": me["Ada Okafor"]})

json.dump({"team": team["id"], "api": api["id"], "web": web["id"], "detail": det["identifier"]},
          open(HERE / "seeded.json", "w"))
print("seeded", det["identifier"])
