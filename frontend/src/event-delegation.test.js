/**
 * Tests for event-delegation.js module (CHT-1062)
 */
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { registerActions, initEventDelegation, _resetForTest } from './event-delegation.js';

describe('event-delegation', () => {
    // Initialise listeners once for the whole suite
    beforeAll(() => {
        initEventDelegation();
    });

    beforeEach(() => {
        // Clear action registry between tests (but keep listeners attached)
        _resetForTest();
        document.body.innerHTML = '';
    });

    describe('registerActions + click dispatch', () => {
        it('dispatches click to registered action handler', () => {
            const handler = vi.fn();
            registerActions({ 'test-click': handler });

            document.body.innerHTML = '<button data-action="test-click" data-id="42">Click me</button>';
            document.querySelector('button').click();

            expect(handler).toHaveBeenCalledTimes(1);
            const [event, dataset, target] = handler.mock.calls[0];
            expect(event).toBeInstanceOf(Event);
            expect(dataset.action).toBe('test-click');
            expect(dataset.id).toBe('42');
            expect(target.tagName).toBe('BUTTON');
        });

        it('dispatches to innermost data-action element (nested)', () => {
            const outerHandler = vi.fn();
            const innerHandler = vi.fn();
            registerActions({ 'outer': outerHandler, 'inner': innerHandler });

            document.body.innerHTML = `
                <div data-action="outer">
                    <button data-action="inner">Click</button>
                </div>
            `;
            document.querySelector('button').click();

            expect(innerHandler).toHaveBeenCalledTimes(1);
            expect(outerHandler).not.toHaveBeenCalled();
        });

        it('ignores clicks on elements without data-action', () => {
            const handler = vi.fn();
            registerActions({ 'some-action': handler });

            document.body.innerHTML = '<button>No action</button>';
            document.querySelector('button').click();

            expect(handler).not.toHaveBeenCalled();
        });

        it('warns on unregistered action names in dev mode', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            document.body.innerHTML = '<button data-action="nonexistent">Click</button>';

            document.querySelector('button').click();

            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining('nonexistent')
            );
            warnSpy.mockRestore();
        });

        it('bubbles from child to ancestor with data-action', () => {
            const handler = vi.fn();
            registerActions({ 'parent-action': handler });

            document.body.innerHTML = `
                <div data-action="parent-action" data-id="1">
                    <span class="child">text</span>
                </div>
            `;
            document.querySelector('.child').click();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][1].id).toBe('1');
        });
    });

    describe('change dispatch', () => {
        it('dispatches change events to action handler', () => {
            const handler = vi.fn();
            registerActions({ 'filter-change': handler });

            document.body.innerHTML = '<select data-action="filter-change"><option value="a">A</option><option value="b">B</option></select>';
            const select = document.querySelector('select');
            select.value = 'b';
            select.dispatchEvent(new Event('change', { bubbles: true }));

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].target.value).toBe('b');
        });
    });

    describe('submit dispatch', () => {
        it('dispatches submit and calls preventDefault', () => {
            const handler = vi.fn();
            registerActions({ 'create-issue': handler });

            document.body.innerHTML = '<form data-action="create-issue" data-issue-id="5"><button type="submit">Go</button></form>';
            const form = document.querySelector('form');
            const event = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(event);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(event.defaultPrevented).toBe(true);
            expect(handler.mock.calls[0][1].issueId).toBe('5');
        });

        it('ignores submit on forms without data-action', () => {
            document.body.innerHTML = '<form><button type="submit">Go</button></form>';
            const form = document.querySelector('form');
            const event = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(event);

            expect(event.defaultPrevented).toBe(false);
        });
    });

    describe('input dispatch', () => {
        it('dispatches input events to action handler', () => {
            const handler = vi.fn();
            registerActions({ 'search-input': handler });

            document.body.innerHTML = '<input data-action="search-input" type="text">';
            const input = document.querySelector('input');
            input.value = 'hello';
            input.dispatchEvent(new Event('input', { bubbles: true }));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    describe('keydown dispatch', () => {
        it('dispatches keydown events to action handler', () => {
            const handler = vi.fn();
            registerActions({ 'key-handler': handler });

            document.body.innerHTML = '<input data-action="key-handler" type="text">';
            const input = document.querySelector('input');
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].key).toBe('Enter');
        });
    });

    describe('mouseover dispatch', () => {
        it('dispatches mouseover events to action handler', () => {
            const handler = vi.fn();
            registerActions({ 'hover-item': handler });

            document.body.innerHTML = '<div data-action="hover-item" data-index="3">Item</div>';
            const item = document.querySelector('[data-action="hover-item"]');
            item.dispatchEvent(new Event('mouseover', { bubbles: true }));

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][1].index).toBe('3');
        });
    });

    describe('drag dispatch', () => {
        it('dispatches dragstart to action handler', () => {
            const handler = vi.fn();
            registerActions({ 'drag-card': handler });

            document.body.innerHTML = '<div data-action="drag-card" draggable="true" data-id="99">Card</div>';
            const card = document.querySelector('[data-action="drag-card"]');
            card.dispatchEvent(new Event('dragstart', { bubbles: true }));

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][1].id).toBe('99');
        });
    });
});
