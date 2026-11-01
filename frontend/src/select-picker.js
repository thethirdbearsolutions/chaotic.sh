/**
 * Searchable popover picker over a native <select> (CHT-1961).
 *
 * The view headers used tall native selects: the project picker opened a
 * 40-row OS menu with no search. This keeps the <select> as the source of
 * truth (every loader still reads and writes `select.value`, and handlers
 * still listen for its `change`) and draws a compact button + popover in
 * front of it: type to filter, arrows to move, Enter to pick, Escape to
 * close. Picking sets the select's value and fires a bubbling `change`, so
 * nothing downstream knows the difference.
 *
 * Opt in with `data-picker` on the select.
 *
 * The label follows `select.value` / `selectedIndex` set in code, options
 * replaced or toggled (`selected`, `hidden`, `disabled` attributes) and
 * `change`. Setting `option.selected = true` as a property is not followed:
 * set `select.value` instead.
 */
import { escapeHtml, escapeAttr } from './utils.js';

const SEARCH_THRESHOLD = 7; // show a filter box once the list is this long
const valueDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
const indexDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'selectedIndex');

const CHEVRON = '<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>';
const CHECK = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';

let patched = false;

/**
 * Make code that sets `select.value` / `selectedIndex` update the picker's
 * label. Patched once on the prototype (an own accessor on the element
 * does not work where the element is a proxy, as in jsdom); it does
 * nothing for a select without a picker.
 */
function patchSelectSetters() {
    if (patched) return;
    patched = true;
    Object.defineProperty(HTMLSelectElement.prototype, 'value', {
        ...valueDesc,
        set(v) { valueDesc.set.call(this, v); this._picker?.sync(); },
    });
    Object.defineProperty(HTMLSelectElement.prototype, 'selectedIndex', {
        ...indexDesc,
        set(v) { indexDesc.set.call(this, v); this._picker?.sync(); },
    });
}

let openPicker = null; // { select, button, popover, close }
let uid = 0;

/** Whether a picker popover is open (the global Escape layering asks). */
export function isSelectPickerOpen() {
    return !!openPicker;
}

/** Close the open picker, if any. Returns true if one was closed. */
export function closeSelectPicker({ restoreFocus = true } = {}) {
    if (!openPicker) return false;
    openPicker.close(restoreFocus);
    return true;
}

/**
 * Enhance every `select[data-picker]` under `root` that is not enhanced yet.
 */
export function initSelectPickers(root = document) {
    root.querySelectorAll('select[data-picker]').forEach(enhanceSelect);
}

/**
 * Put a picker button in front of one select. Idempotent.
 * @returns {HTMLButtonElement|null} the button
 */
export function enhanceSelect(select) {
    if (!select || select._picker) return select?._picker?.button || null;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'picker-btn';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    if (select.id) button.dataset.pickerFor = select.id;
    button.innerHTML = `<span class="picker-label"></span>${CHEVRON}`;
    select.classList.add('picker-native');
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;
    select.insertAdjacentElement('afterend', button);

    const sync = () => {
        syncLabel(select, button);
        // Options replaced or the select disabled while open: the open list
        // is stale, so close it rather than let it pick a value that is gone.
        if (openPicker?.select === select) openPicker.refresh();
    };
    select._picker = { button, sync };

    // Loaders set select.value directly, with no event: follow those too.
    patchSelectSetters();
    select.addEventListener('change', sync);
    // Options are filled in after load (projects arrive later).
    if (typeof MutationObserver !== 'undefined') {
        new MutationObserver(sync).observe(select, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['disabled', 'selected', 'hidden'] });
    }

    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (openPicker?.select === select) closeSelectPicker();
        else openPopover(select, button);
    });
    button.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
            // Open here and keep the key from the view's list navigation,
            // whose Enter would open the selected row (and cancel this
            // button's click) and whose arrows would move its cursor.
            e.preventDefault();
            e.stopPropagation();
            if (openPicker?.select !== select) openPopover(select, button);
        } else if (e.key.length === 1) {
            // A focused <select> kept single-key shortcuts (j/k, c, /) from
            // the global handlers; the button stands in for it, so it does too.
            e.stopPropagation();
        }
    });
    sync();
    return button;
}

function syncLabel(select, button) {
    const opt = select.options[select.selectedIndex];
    const text = opt ? opt.textContent.trim() : '';
    button.querySelector('.picker-label').textContent = text;
    button.disabled = select.disabled;
    button.title = text;
    // The accessible name carries the current value too ("Project: Chaotic"):
    // an aria-label replaces the button's content, so the label alone would
    // never say what is selected.
    const label = select.getAttribute('aria-label');
    if (label) button.setAttribute('aria-label', text ? `${label}: ${text}` : label);
}

function optionList(select) {
    return [...select.options]
        .filter(o => !o.hidden)
        .map(o => ({ value: o.value, text: o.textContent.trim(), disabled: o.disabled }));
}

function openPopover(select, button) {
    closeSelectPicker({ restoreFocus: false });
    const options = optionList(select);
    const listId = `picker-list-${++uid}`;
    const withSearch = options.length >= SEARCH_THRESHOLD;
    const name = select.getAttribute('aria-label') || 'Options';
    const popover = document.createElement('div');
    popover.className = 'picker-popover';
    popover.tabIndex = -1; // a click on its padding keeps focus inside
    popover.innerHTML = `
        ${withSearch ? `<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${escapeAttr(name)}"
            role="combobox" aria-expanded="true" aria-controls="${listId}" aria-autocomplete="list" autocomplete="off" spellcheck="false">` : ''}
        <ul class="picker-list" role="listbox" id="${listId}" tabindex="-1" aria-label="${escapeAttr(name)}"></ul>
    `;
    document.body.appendChild(popover);
    const list = popover.querySelector('.picker-list');
    const search = popover.querySelector('.picker-search');
    const firstEnabled = (list) => Math.max(0, list.findIndex(o => !o.disabled));
    let active = options.findIndex(o => o.value === select.value && !o.disabled);
    if (active === -1) active = firstEnabled(options);
    let shown = options;

    const render = () => {
        list.innerHTML = shown.length
            ? shown.map((o, i) => `
                <li role="option" id="${listId}-${i}" class="picker-option${i === active ? ' active' : ''}${o.disabled ? ' disabled' : ''}"
                    data-index="${i}" data-value="${escapeAttr(o.value)}"
                    aria-selected="${o.value === select.value ? 'true' : 'false'}"${o.disabled ? ' aria-disabled="true"' : ''}>
                    <span class="picker-option-text">${escapeHtml(o.text)}</span>
                    ${o.value === select.value ? `<span class="picker-check">${CHECK}</span>` : ''}
                </li>`).join('')
            : '<li class="picker-empty" role="presentation">No matches</li>';
        const el = list.querySelector('.picker-option.active');
        if (el) (search || list).setAttribute('aria-activedescendant', el.id);
        else (search || list).removeAttribute('aria-activedescendant');
        el?.scrollIntoView?.({ block: 'nearest' });
    };

    const place = () => {
        const r = button.getBoundingClientRect();
        const vw = window.visualViewport?.width || window.innerWidth;
        const vh = window.visualViewport?.height || window.innerHeight;
        popover.style.minWidth = `${Math.min(Math.max(r.width, 220), vw - 16)}px`;
        popover.style.maxHeight = '';
        popover.style.top = '0px';
        // Measure the rendered popover, which can be wider than its minimum.
        const w = popover.offsetWidth || Math.max(r.width, 220);
        const h = popover.offsetHeight;
        popover.style.left = `${Math.max(8, Math.min(r.left, vw - w - 8))}px`;
        const below = vh - r.bottom - 12;
        const above = r.top - 12;
        if (h > below && above > below) {
            // Not enough room below and more above: open upward.
            const maxH = Math.max(120, above);
            popover.style.maxHeight = `${maxH}px`;
            popover.style.top = `${Math.max(8, r.top - 4 - Math.min(h, maxH))}px`;
        } else {
            popover.style.maxHeight = `${Math.max(120, below)}px`;
            popover.style.top = `${r.bottom + 4}px`;
        }
    };

    const choose = (o) => {
        if (!o || o.disabled || select.disabled) return;
        if (![...select.options].some(x => x.value === o.value && !x.disabled)) { close(true); return; }
        const changed = o.value !== select.value;
        valueDesc.set.call(select, o.value);
        syncLabel(select, button);
        close(true);
        if (changed) select.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const move = (delta) => {
        let i = active + delta;
        while (i >= 0 && i < shown.length && shown[i].disabled) i += delta;
        if (i < 0 || i >= shown.length) return; // nothing enabled that way
        active = i;
        render();
    };
    const jumpTo = (from, delta) => {
        let i = from;
        while (i >= 0 && i < shown.length && shown[i].disabled) i += delta;
        if (i >= 0 && i < shown.length) { active = i; render(); }
    };

    const onKey = (e) => {
        // The popover is the top layer: its keys never reach the view's
        // list navigation or the global Escape handling. A modifier shortcut
        // (Cmd/Ctrl+K) still goes through.
        if (e.metaKey || e.ctrlKey) return;
        e.stopPropagation();
        switch (e.key) {
            case 'ArrowDown': e.preventDefault(); move(1); break;
            case 'ArrowUp': e.preventDefault(); move(-1); break;
            case 'Home': if (!search) { e.preventDefault(); jumpTo(0, 1); } break;
            case 'End': if (!search) { e.preventDefault(); jumpTo(shown.length - 1, -1); } break;
            case 'PageDown': e.preventDefault(); jumpTo(Math.min(shown.length - 1, active + 8), -1); break;
            case 'PageUp': e.preventDefault(); jumpTo(Math.max(0, active - 8), 1); break;
            case 'Enter': e.preventDefault(); choose(shown[active]); break;
            case 'Escape': e.preventDefault(); close(true); break;
            // Back on the button first, so the browser's own Tab moves on
            // from there and not from the end of <body>.
            case 'Tab': close(true); break;
            case ' ':
                if (!search) { e.preventDefault(); choose(shown[active]); }
                break;
            default:
                // Short lists have no filter box: typing jumps instead.
                if (!search && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
                    typed = (Date.now() - typedAt < 700 ? typed : '') + e.key.toLowerCase();
                    typedAt = Date.now();
                    const i = shown.findIndex(o => !o.disabled && o.text.toLowerCase().startsWith(typed));
                    if (i !== -1) { active = i; render(); }
                }
        }
    };
    let typed = '';
    let typedAt = 0;

    const onInput = () => {
        const q = search.value.trim().toLowerCase();
        shown = q ? options.filter(o => o.text.toLowerCase().includes(q)) : options;
        const current = shown.findIndex(o => o.value === select.value && !o.disabled);
        active = !q && current !== -1 ? current : firstEnabled(shown);
        render();
    };

    const onPointer = (e) => {
        if (popover.contains(e.target) || button.contains(e.target)) return;
        close(false);
    };

    const onReflow = () => place();
    // Escape with focus outside the popover (a click left it on the page):
    // the popover is still the top layer, so it closes first.
    const onDocKey = (e) => {
        if (e.key !== 'Escape' || popover.contains(e.target)) return;
        e.preventDefault();
        e.stopPropagation();
        close(true);
    };
    const onNavigate = () => close(false);

    function close(restoreFocus) {
        if (openPicker?.popover !== popover) return;
        openPicker = null;
        popover.remove();
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('open');
        button.removeAttribute('aria-controls');
        document.removeEventListener('pointerdown', onPointer, true);
        document.removeEventListener('keydown', onDocKey, true);
        window.removeEventListener('popstate', onNavigate);
        window.removeEventListener('resize', onReflow);
        window.removeEventListener('scroll', onReflow, true);
        if (restoreFocus) button.focus({ preventScroll: true });
    }

    list.addEventListener('click', (e) => {
        const li = e.target.closest('.picker-option');
        if (li) choose(shown[Number(li.dataset.index)]);
    });
    list.addEventListener('mousemove', (e) => {
        const li = e.target.closest('.picker-option');
        if (!li) return;
        const i = Number(li.dataset.index);
        if (i !== active) { active = i; render(); }
    });
    popover.addEventListener('keydown', onKey);
    if (search) search.addEventListener('input', onInput);
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('keydown', onDocKey, true);
    window.addEventListener('popstate', onNavigate);
    window.addEventListener('resize', onReflow);
    window.addEventListener('scroll', onReflow, true);

    const refresh = () => {
        const now = optionList(select);
        const same = now.length === options.length
            && now.every((o, i) => o.value === options[i].value && o.text === options[i].text && o.disabled === options[i].disabled);
        if (!same || select.disabled) close(false);
        else render();
    };

    openPicker = { select, button, popover, close, refresh };
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-controls', listId);
    button.classList.add('open');
    render();
    place();
    (search || list).focus({ preventScroll: true });
}
