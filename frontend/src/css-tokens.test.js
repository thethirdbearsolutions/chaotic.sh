/**
 * Design tokens guard (CHT-2042).
 *
 * A var(--name) that nothing defines fails silently: the browser drops the
 * declaration (or takes the fallback), so the element quietly loses its
 * border, background or colour. Fifteen such names had crept in, each one
 * what a later change *thought* the token was called. This keeps the set
 * closed: every custom property the stylesheet, the template or a module
 * reads must be defined in the stylesheet or set from JS.
 */
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'static', 'css', 'style.css'), 'utf-8');
const html = fs.readFileSync(path.join(root, 'templates', 'index.html'), 'utf-8');
const modules = fs
    .readdirSync(__dirname)
    .filter((f) => f.endsWith('.js') && !f.endsWith('.test.js'))
    .map((f) => [f, fs.readFileSync(path.join(__dirname, f), 'utf-8')]);

const defined = new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
// Properties a module sets at runtime (style.setProperty('--x', ...)).
for (const [, src] of modules) {
    for (const m of src.matchAll(/setProperty\(\s*['"`](--[a-z0-9-]+)['"`]/g)) defined.add(m[1]);
}

function used(text) {
    return [...text.matchAll(/var\(\s*(--[a-z0-9-]+)/g)].map((m) => m[1]);
}

describe('CSS custom properties', () => {
    it('every var() in the stylesheet names a defined token', () => {
        const missing = [...new Set(used(css))].filter((n) => !defined.has(n));
        expect(missing).toEqual([]);
    });

    it('every var() in the template names a defined token', () => {
        const missing = [...new Set(used(html))].filter((n) => !defined.has(n));
        expect(missing).toEqual([]);
    });

    it('every var() in a module names a defined token', () => {
        const missing = modules.flatMap(([f, src]) =>
            used(src).filter((n) => !defined.has(n)).map((n) => `${f}: ${n}`));
        expect([...new Set(missing)]).toEqual([]);
    });

    it('defines one colour per issue status and priority', () => {
        for (const s of ['backlog', 'todo', 'in-progress', 'in-review', 'done', 'canceled']) {
            expect(defined.has(`--status-${s}`)).toBe(true);
        }
        for (const p of ['urgent', 'high', 'medium', 'low', 'none']) {
            expect(defined.has(`--priority-${p}`)).toBe(true);
        }
    });

    it('a :root token that reads a light-theme token is declared for light too', () => {
        // A var() inside a custom property resolves where it is declared, so
        // a token on :root alone that reads --text-muted keeps the dark value
        // under body.theme-light. Declare it on both scopes instead.
        const bare = css.replace(/\/\*[\s\S]*?\*\//g, '');
        const blocks = [...bare.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
            sel: m[1].trim(),
            decls: [...m[2].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2]]),
        }));
        const lightNames = new Set(blocks
            .filter((b) => b.sel.split(',').some((x) => x.trim() === 'body.theme-light'))
            .flatMap((b) => b.decls.map(([n]) => n)));
        const offenders = blocks
            .filter((b) => b.sel === ':root')
            .flatMap((b) => b.decls)
            .filter(([n, v]) => !lightNames.has(n) && used(v).some((r) => lightNames.has(r)))
            .map(([n]) => n);
        expect(offenders).toEqual([]);
    });
});
