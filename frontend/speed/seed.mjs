/**
 * Seed a project for the speed budget (CHT-1898): one user, one team, one
 * project with ISSUES issues, through the real API.
 *
 *   node speed/seed.mjs http://127.0.0.1:24399 2000 > speed/.seed.json
 *
 * Prints {token, projectId} as JSON.
 */
const [base = 'http://127.0.0.1:24399', count = '2000'] = process.argv.slice(2);
const api = `${base}/api`;
const n = Number(count);

async function call(method, path, body, token) {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    let payload;
    if (body) {
        headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(body);
    }
    const res = await fetch(`${api}${path}`, { method, headers, body: payload });
    if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${await res.text()}`);
    return res.status === 204 ? null : res.json();
}

const email = `speed-${Date.now()}@example.com`;
const password = 'speed-budget-password';
await call('POST', '/auth/signup', { email, name: 'Speed', password });
const { access_token: token } = await call('POST', '/auth/login', { email, password });
const team = await call('POST', '/teams', { name: 'Speed', key: 'SPD' }, token);
const project = await call('POST', `/teams/${team.id}/projects`, { name: 'Speed', key: 'SP' }, token);

const statuses = ['backlog', 'todo', 'in_progress', 'in_review'];
const priorities = ['low', 'medium', 'high', 'urgent'];
for (let i = 0; i < n; i++) {
    await call('POST', `/projects/${project.id}/issues`, {
        title: `Speed issue ${i}: a title about the length of a real one`,
        description: 'A description of a few hundred characters. '.repeat(8),
        status: statuses[i % 4],
        priority: priorities[i % 4],
    }, token);
}
process.stdout.write(JSON.stringify({ token, projectId: project.id }));
