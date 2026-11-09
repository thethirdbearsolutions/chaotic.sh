import { describe, it, expect, beforeEach, vi } from 'vitest';
import { enhanceSelect, initSelectPickers, isSelectPickerOpen, closeSelectPicker, openSelectPicker } from './select-picker.js';

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

    it('scrolling its own list does not re-place the popover, a page scroll does (CHT-2118)', () => {
        const select = makeSelect(30);
        const btn = enhanceSelect(select);
        btn.click();
        const popover = document.querySelector('.picker-popover');
        popover.style.maxHeight = '200px'; // stands in for place()'s value
        document.querySelector('.picker-list').dispatchEvent(new Event('scroll'));
        expect(popover.style.maxHeight).toBe('200px');
        document.dispatchEvent(new Event('scroll'));
        expect(popover.style.maxHeight).not.toBe('200px');
    });

    it('a press on a modal backdrop dismisses only the picker (CHT-2119)', () => {
        document.body.innerHTML = '<div id="modal-overlay"><div class="modal"><select id="s" data-picker><option value="a">A</option></select><input id="in"></div></div>';
        const overlay = document.getElementById('modal-overlay');
        enhanceSelect(document.getElementById('s')).click();
        expect(isSelectPickerOpen()).toBe(true);
        const onOverlayClick = vi.fn();
        overlay.addEventListener('click', onOverlayClick);
        overlay.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        expect(isSelectPickerOpen()).toBe(false);
        overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(onOverlayClick).not.toHaveBeenCalled();
        // Only that one click: the next reaches the backdrop.
        overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(onOverlayClick).toHaveBeenCalledTimes(1);

        // A press inside the modal closes the picker and keeps its click.
        enhanceSelect(document.getElementById('s'));
        document.querySelector('.picker-btn').click();
        const input = document.getElementById('in');
        const onInputClick = vi.fn();
        input.addEventListener('click', onInputClick);
        input.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(onInputClick).toHaveBeenCalledTimes(1);
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
        select.dataset.action = 'switch-project';
        const btn = enhanceSelect(select);
        const seen = [];
        const handler = (e) => { const el = e.target.closest('[data-action]'); if (el) seen.push([el.dataset.action, el.value]); };
        document.addEventListener('change', handler);
        btn.click();
        document.querySelector('.picker-option[data-value="p1"]').click();
        expect(seen).toEqual([['switch-project', 'p1']]);
        document.removeEventListener('change', handler);
    });

    // The sidebar project switcher (CHT-2058) shows each project's key.
    describe('option hints', () => {
        function hinted() {
            const opts = '<option value="">All projects</option>'
                + Array.from({ length: 8 }, (_, i) => `<option value="p${i}" data-hint="K${i}">Name ${i}</option>`).join('');
            document.body.innerHTML = `<select id="sw" data-picker aria-label="Project">${opts}</select>`;
            return document.getElementById('sw');
        }

        it('leads the label with the hint, and keeps it out of the accessible name', () => {
            const select = hinted();
            const btn = enhanceSelect(select);
            select.value = 'p3';
            expect(btn.querySelector('.picker-label-hint').textContent).toBe('K3');
            expect(btn.getAttribute('aria-label')).toBe('Project: Name 3');
            select.value = '';
            expect(btn.querySelector('.picker-label-hint')).toBeNull();
        });

        it('shows hints in the list and filters on them', () => {
            const select = hinted();
            const btn = enhanceSelect(select);
            btn.click();
            const popover = document.querySelector('.picker-popover');
            expect(popover.querySelectorAll('.picker-option-hint')).toHaveLength(8);
            const search = popover.querySelector('.picker-search');
            search.value = 'k5';
            search.dispatchEvent(new Event('input'));
            const shown = [...popover.querySelectorAll('.picker-option')].map(li => li.dataset.value);
            expect(shown).toEqual(['p5']);
        });

        // PR #543 review I4: opened by a shortcut, closing returns focus to
        // where it was rather than parking it on the button.
        it('returnFocus puts focus back where it was on close', () => {
            const select = hinted();
            const btn = enhanceSelect(select);
            const input = document.createElement('input');
            document.body.appendChild(input);
            input.focus();
            openSelectPicker(select, { returnFocus: true });
            key(document.querySelector('.picker-search'), 'Escape');
            expect(document.activeElement).toBe(input);
            // With nothing focused before, focus is not left on the button.
            input.blur();
            openSelectPicker(select, { returnFocus: true });
            key(document.querySelector('.picker-search'), 'Enter');
            expect(document.activeElement).not.toBe(btn);
            // A click still returns to the button, as before.
            btn.click();
            key(document.querySelector('.picker-search'), 'Escape');
            expect(document.activeElement).toBe(btn);
        });

        it('data-picker-keys="pass" lets single-key shortcuts through the button', () => {
            const select = hinted();
            select.dataset.pickerKeys = 'pass';
            const btn = enhanceSelect(select);
            const seen = [];
            const onKey = (e) => seen.push(e.key);
            document.addEventListener('keydown', onKey);
            key(btn, 'i');
            document.removeEventListener('keydown', onKey);
            expect(seen).toEqual(['i']);
        });

        it('refuses to open from a hidden button (review M4)', () => {
            const select = hinted();
            const btn = enhanceSelect(select);
            btn.checkVisibility = () => false;
            expect(openSelectPicker(select)).toBe(false);
            expect(isSelectPickerOpen()).toBe(false);
        });

        it('openSelectPicker opens it as a click would, and refuses a plain select', () => {
            const select = hinted();
            expect(openSelectPicker(select)).toBe(false);
            enhanceSelect(select);
            expect(openSelectPicker(select)).toBe(true);
            expect(isSelectPickerOpen()).toBe(true);
            // A second call leaves the open picker alone.
            expect(openSelectPicker(select)).toBe(true);
            expect(document.querySelectorAll('.picker-popover')).toHaveLength(1);
            select.disabled = true;
            select._picker.sync();
            expect(openSelectPicker(select)).toBe(false);
        });
    });
});
