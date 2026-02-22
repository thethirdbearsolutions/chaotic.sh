import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Set up DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

// Import module (will attach to window)
import {
    renderConditionBuilder,
    collectConditions,
    FIELD_OPERATORS,
    OPERATOR_LABELS
} from './rituals.js';

describe('rituals.js', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    describe('FIELD_OPERATORS', () => {
        it('should have correct operators for estimate field', () => {
            expect(FIELD_OPERATORS.estimate).toEqual(['gte', 'lte', 'eq', 'isnull']);
        });

        it('should have correct operators for priority field', () => {
            expect(FIELD_OPERATORS.priority).toEqual(['eq', 'in', 'isnull']);
        });

        it('should have correct operators for labels field', () => {
            expect(FIELD_OPERATORS.labels).toEqual(['contains', 'isnull']);
        });
    });

    describe('OPERATOR_LABELS', () => {
        it('should have human-readable labels for all operators', () => {
            expect(OPERATOR_LABELS.gte).toBe('>=');
            expect(OPERATOR_LABELS.lte).toBe('<=');
            expect(OPERATOR_LABELS.eq).toBe('equals');
            expect(OPERATOR_LABELS.in).toBe('in (comma-separated)');
            expect(OPERATOR_LABELS.contains).toBe('contains');
            expect(OPERATOR_LABELS.isnull).toBe('is empty');
        });
    });

    describe('renderConditionBuilder', () => {
        it('should render empty builder when conditions is null', () => {
            const html = renderConditionBuilder(null);
            expect(html).toContain('Conditions (optional)');
            expect(html).toContain('id="condition-rows"');
            expect(html).toContain('+ Add Condition');
        });

        it('should render empty builder when conditions is empty object', () => {
            const html = renderConditionBuilder({});
            expect(html).toContain('id="condition-rows"');
        });

        it('should render existing conditions', () => {
            const conditions = {
                'estimate__gte': 3,
                'priority__eq': 'high'
            };
            const html = renderConditionBuilder(conditions);
            expect(html).toContain('condition-row');
            // Should have rows for both conditions
            expect(html.match(/condition-row/g).length).toBeGreaterThanOrEqual(2);
        });

        it('should include error placeholder element', () => {
            const html = renderConditionBuilder(null);
            expect(html).toContain('id="condition-error"');
        });
    });

    describe('collectConditions', () => {
        beforeEach(() => {
            // Set up a basic form structure
            document.body.innerHTML = `
                <div id="condition-rows"></div>
                <p id="condition-error" style="display: none;"></p>
            `;
        });

        it('should return null when no condition rows exist', () => {
            const result = collectConditions();
            expect(result).toBeNull();
        });

        it('should collect a simple equality condition', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="priority" selected>priority</option></select>
                    <select class="condition-operator"><option value="eq" selected>equals</option></select>
                    <input class="condition-value" value="high">
                </div>
            `;

            const result = collectConditions();
            expect(result).toEqual({ 'priority__eq': 'high' });
        });

        it('should parse numeric values for gte/lte operators', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="estimate" selected>estimate</option></select>
                    <select class="condition-operator"><option value="gte" selected>>=</option></select>
                    <input class="condition-value" value="5">
                </div>
            `;

            const result = collectConditions();
            expect(result).toEqual({ 'estimate__gte': 5 });
            expect(typeof result['estimate__gte']).toBe('number');
        });

        it('should parse comma-separated values for in operator', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="priority" selected>priority</option></select>
                    <select class="condition-operator"><option value="in" selected>in</option></select>
                    <input class="condition-value" value="high, urgent, medium">
                </div>
            `;

            const result = collectConditions();
            expect(result).toEqual({ 'priority__in': ['high', 'urgent', 'medium'] });
        });

        it('should set isnull to true', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="estimate" selected>estimate</option></select>
                    <select class="condition-operator"><option value="isnull" selected>is empty</option></select>
                    <input class="condition-value" value="">
                </div>
            `;

            const result = collectConditions();
            expect(result).toEqual({ 'estimate__isnull': true });
        });

        it('should skip completely empty rows', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="" selected>Select field...</option></select>
                    <select class="condition-operator"><option value="" selected></option></select>
                    <input class="condition-value" value="">
                </div>
            `;

            const result = collectConditions();
            expect(result).toBeNull();
        });

        it('should throw error for incomplete rows (field selected, no operator)', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="priority" selected>priority</option></select>
                    <select class="condition-operator"><option value="" selected></option></select>
                    <input class="condition-value" value="high">
                </div>
            `;

            expect(() => collectConditions()).toThrow('missing operator');
        });

        it('should throw error for duplicate condition keys', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="priority" selected>priority</option></select>
                    <select class="condition-operator"><option value="eq" selected>equals</option></select>
                    <input class="condition-value" value="high">
                </div>
                <div class="condition-row">
                    <select class="condition-field"><option value="priority" selected>priority</option></select>
                    <select class="condition-operator"><option value="eq" selected>equals</option></select>
                    <input class="condition-value" value="low">
                </div>
            `;

            expect(() => collectConditions()).toThrow('Duplicate condition key');
        });

        it('should throw error for invalid numeric value', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="estimate" selected>estimate</option></select>
                    <select class="condition-operator"><option value="gte" selected>>=</option></select>
                    <input class="condition-value" value="abc">
                </div>
            `;

            expect(() => collectConditions()).toThrow('Invalid numeric value');
        });

        it('should throw error for missing numeric value', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="estimate" selected>estimate</option></select>
                    <select class="condition-operator"><option value="gte" selected>>=</option></select>
                    <input class="condition-value" value="">
                </div>
            `;

            expect(() => collectConditions()).toThrow('Missing numeric value');
        });

        it('should collect multiple valid conditions', () => {
            document.getElementById('condition-rows').innerHTML = `
                <div class="condition-row">
                    <select class="condition-field"><option value="estimate" selected>estimate</option></select>
                    <select class="condition-operator"><option value="gte" selected>>=</option></select>
                    <input class="condition-value" value="3">
                </div>
                <div class="condition-row">
                    <select class="condition-field"><option value="priority" selected>priority</option></select>
                    <select class="condition-operator"><option value="in" selected>in</option></select>
                    <input class="condition-value" value="high,urgent">
                </div>
            `;

            const result = collectConditions();
            expect(result).toEqual({
                'estimate__gte': 3,
                'priority__in': ['high', 'urgent']
            });
        });
    });
});
