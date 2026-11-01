import { describe, it, expect, beforeEach, vi } from 'vitest';
import { enhanceSelect, initSelectPickers, isSelectPickerOpen, closeSelectPicker } from './select-picker.js';

function makeSelect(n = 3, { id = 'proj', value } = {}) {
    const opts = ['<option value="">All Projects</option>']
        .concat(Array.from({ length: n }, (_, i) => `<option value="p${i}">Project ${String.fromCharCode(65 + i)}</option>`));
    document.body.innerHTML = `<div class="view-actions"><select id="${id}" data-picker aria-label="Project">${opts.join('')}</select></div>`;
    const select = document.getElementById(id);
    if (value !== undefined) select.value = value;
    return select;
}

const key = (el, k) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

describe('select picker (CHT-1961)', () => {
    beforeEach(() => {
        closeSelectPicker({ restoreFocus: false });
        document.body.innerHTML = '';
    });

    it('puts a labelled button after the select and hides the select', () => {
        const select = makeSelect();
        initSelectPickers();
        const btn = select.nextElementSibling;
        expect(btn.classList.contains('picker-btn')).toBe(true);
        expect(btn.getAttribute('aria-label')).toBe('Project: All Projects');
        expect(btn.getAttribute('aria-haspopup')).toBe('listbox');
        expect(btn.textContent).toContain('All Projects');
        expect(select.classList.contains('picker-native')).toBe(true);
        expect(select.tabIndex).toBe(-1);
    });

    it('is idempotent', () => {
        const select = makeSelect();
        enhanceSelect(select);
        enhanceSelect(select);
        expect(document.querySelectorAll('.picker-btn').length).toBe(1);
    });

    it('follows value set in code, with no event', () => {
        const select = makeSelect();
        const btn = enhanceSelect(select);
        select.value = 'p1';
        expect(btn.textContent).toContain('Project B');
        expect(select.value).toBe('p1');
        select.selectedIndex = 0;
        expect(btn.textContent).toContain('All Projects');
    });

    it('follows options filled in later', async () => {
        document.body.innerHTML = '<select id="s" data-picker><option value="">Loading</option></select>';
        const select = document.getElementById('s');
        const btn = enhanceSelect(select);
        select.innerHTML = '<option value="x" selected>Chaotic</option>';
        await new Promise(r => setTimeout(r, 0)); // MutationObserver is a microtask
        expect(btn.textContent).toContain('Chaotic');
    });

    it('picking an option sets the value and fires one bubbling change', () => {
        const select = makeSelect();
        const btn = enhanceSelect(select);
        const onChange = vi.fn();
        document.addEventListener('change', onChange);
        btn.click();
        expect(isSelectPickerOpen()).toBe(true);
        expect(btn.getAttribute('aria-expanded')).toBe('true');
        document.querySelector('.picker-option[data-value="p2"]').click();
        expect(select.value).toBe('p2');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target).toBe(select);
        expect(isSelectPickerOpen()).toBe(false);
        expect(document.activeElement).toBe(btn);
        document.removeEventListener('change', onChange);
    });

    it('picking the current option fires no change', () => {
        const select = makeSelect(3, { value: 'p0' });
        const btn = enhanceSelect(select);
        const onChange = vi.fn();
        select.addEventListener('change', onChange);
        btn.click();
        key(document.querySelector('.picker-list'), 'Enter');
        expect(onChange).not.toHaveBeenCalled();
    });

    it('arrows and Enter pick; keys stay inside the popover', () => {
        const select = makeSelect(3, { value: '' });
        const btn = enhanceSelect(select);
        const outside = vi.fn();
        document.addEventListener('keydown', outside);
        btn.click();
        const list = document.querySelector('.picker-list');
        key(list, 'ArrowDown');
        key(list, 'ArrowDown');
        expect(document.querySelector('.picker-option.active').dataset.value).toBe('p1');
        expect(list.getAttribute('aria-activedescendant')).toBe(document.querySelector('.picker-option.active').id);
        key(list, 'Enter');
        expect(select.value).toBe('p1');
        expect(outside).not.toHaveBeenCalled();
        document.removeEventListener('keydown', outside);
    });

    it('Escape closes without changing the value', () => {
        const select = makeSelect(3, { value: 'p0' });
        const btn = enhanceSelect(select);
        btn.click();
        key(document.querySelector('.picker-list'), 'ArrowDown');
        key(document.querySelector('.picker-list'), 'Escape');
        expect(isSelectPickerOpen()).toBe(false);
        expect(select.value).toBe('p0');
        expect(document.activeElement).toBe(btn);
    });

    it('short lists jump by typing; long lists get a filter box', () => {
        const short = makeSelect(3);
        enhanceSelect(short).click();
        expect(document.querySelector('.picker-search')).toBeNull();
        key(document.querySelector('.picker-list'), 'p');
        key(document.querySelector('.picker-list'), 'r');
        expect(document.querySelector('.picker-option.active').dataset.value).toBe('p0');
        closeSelectPicker({ restoreFocus: false });

        const long = makeSelect(10);
        enhanceSelect(long).click();
        const search = document.querySelector('.picker-search');
        expect(document.activeElement).toBe(search);
        search.value = 'project c';
        search.dispatchEvent(new Event('input'));
        const shown = [...document.querySelectorAll('.picker-option')].map(li => li.dataset.value);
        expect(shown).toEqual(['p2']);
        key(search, 'Enter');
        expect(long.value).toBe('p2');
    });

    it('says so when nothing matches, and Enter then does nothing', () => {
        const select = makeSelect(10, { value: 'p0' });
        enhanceSelect(select).click();
        const search = document.querySelector('.picker-search');
        search.value = 'zzz';
        search.dispatchEvent(new Event('input'));
        expect(document.querySelector('.picker-empty').textContent).toBe('No matches');
        key(search, 'Enter');
        expect(select.value).toBe('p0');
    });

    it('a click outside closes it; opening another closes the first', () => {
        document.body.innerHTML = `
            <select id="a" data-picker><option value="1">One</option></select>
            <select id="b" data-picker><option value="2">Two</option></select>
            <p id="out">x</p>`;
        initSelectPickers();
        const [a, b] = document.querySelectorAll('.picker-btn');
        a.click();
        b.click();
        expect(document.querySelectorAll('.picker-popover').length).toBe(1);
        document.getElementById('out').dispatchEvent(new Event('pointerdown', { bubbles: true }));
        expect(isSelectPickerOpen()).toBe(false);
        expect(document.querySelectorAll('.picker-popover').length).toBe(0);
    });

    it('escapes option text', () => {
        document.body.innerHTML = '<select id="x" data-picker><option value="1">&lt;img src=x onerror=alert(1)&gt;</option></select>';
        enhanceSelect(document.getElementById('x')).click();
        expect(document.querySelector('.picker-popover img')).toBeNull();
        expect(document.querySelector('.picker-option').textContent).toContain('<img');
    });

    it('mirrors a disabled select through the observer alone', async () => {
        const select = makeSelect();
        const btn = enhanceSelect(select);
        select.disabled = true;
        await new Promise(r => setTimeout(r, 0));
        expect(btn.disabled).toBe(true);
    });

    it('keeps the current value in the accessible name', () => {
        const select = makeSelect();
        const btn = enhanceSelect(select);
        select.value = 'p2';
        expect(btn.getAttribute('aria-label')).toBe('Project: Project C');
    });

    it('Enter, Space and arrows on the button open it and never reach the page', () => {
        const select = makeSelect();
        const btn = enhanceSelect(select);
        const outside = vi.fn();
        document.addEventListener('keydown', outside);
        for (const k of ['Enter', ' ', 'ArrowDown', 'j']) {
            key(btn, k);
            if (k !== 'j') expect(isSelectPickerOpen()).toBe(true);
            closeSelectPicker({ restoreFocus: false });
        }
        expect(outside).not.toHaveBeenCalled();
        // A modifier shortcut still reaches the page.
        btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
        expect(outside).toHaveBeenCalledTimes(1);
        document.removeEventListener('keydown', outside);
    });

    it('Escape closes it first even with focus outside the popover', () => {
        const select = makeSelect();
        enhanceSelect(select).click();
        const outside = vi.fn();
        document.addEventListener('keydown', outside);
        key(document.body, 'Escape');
        expect(isSelectPickerOpen()).toBe(false);
        expect(outside).not.toHaveBeenCalled();
        document.removeEventListener('keydown', outside);
    });

    it('Tab closes it and puts focus back on the button', () => {
        const select = makeSelect();
        const btn = enhanceSelect(select);
        btn.click();
        key(document.querySelector('.picker-list'), 'Tab');
        expect(isSelectPickerOpen()).toBe(false);
        expect(document.activeElement).toBe(btn);
    });

    it('lets Cmd/Ctrl shortcuts through while open', () => {
        const select = makeSelect();
        enhanceSelect(select).click();
        const outside = vi.fn();
        document.addEventListener('keydown', outside);
        document.querySelector('.picker-list').dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
        expect(outside).toHaveBeenCalledTimes(1);
        document.removeEventListener('keydown', outside);
    });

    it('skips disabled and hidden options', () => {
        document.body.innerHTML = `<select id="d" data-picker>
            <option value="a" disabled>A</option><option value="b">B</option>
            <option value="h" hidden>H</option><option value="c" disabled>C</option></select>`;
        const select = document.getElementById('d');
        select.value = 'b';
        enhanceSelect(select).click();
        const list = document.querySelector('.picker-list');
        expect([...document.querySelectorAll('.picker-option')].map(li => li.dataset.value)).toEqual(['a', 'b', 'c']);
        key(list, 'ArrowDown');
        key(list, 'ArrowUp');
        key(list, 'Home');
        expect(document.querySelector('.picker-option.active').dataset.value).toBe('b');
    });

    it('closes when its options are replaced while open', async () => {
        const select = makeSelect();
        enhanceSelect(select).click();
        select.innerHTML = '<option value="z">Zed</option>';
        await new Promise(r => setTimeout(r, 0));
        expect(isSelectPickerOpen()).toBe(false);
    });

    it('closes on back/forward navigation', () => {
        const select = makeSelect();
        enhanceSelect(select).click();
        window.dispatchEvent(new PopStateEvent('popstate'));
        expect(isSelectPickerOpen()).toBe(false);
    });

    it('a pick reaches a delegated change handler on the document', () => {
        const select = makeSelect();
        select.dataset.action = 'set-current-project';
        const btn = enhanceSelect(select);
        const seen = [];
        const handler = (e) => { const el = e.target.closest('[data-action]'); if (el) seen.push([el.dataset.action, el.value]); };
        document.addEventListener('change', handler);
        btn.click();
        document.querySelector('.picker-option[data-value="p1"]').click();
        expect(seen).toEqual([['set-current-project', 'p1']]);
        document.removeEventListener('change', handler);
    });
});
