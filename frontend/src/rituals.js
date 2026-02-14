/**
 * Rituals module - condition builder UI components
 */

import { escapeHtml, escapeAttr } from './utils.js';

// Supported fields and their valid operators
const FIELD_OPERATORS = {
    estimate: ['gte', 'lte', 'eq', 'isnull'],
    priority: ['eq', 'in', 'isnull'],
    issue_type: ['eq', 'in', 'isnull'],
    status: ['eq', 'in', 'isnull'],
    labels: ['contains', 'isnull']
};

const OPERATOR_LABELS = {
    eq: 'equals',
    in: 'in (comma-separated)',
    gte: '>=',
    lte: '<=',
    contains: 'contains',
    isnull: 'is empty'
};

let conditionRowCounter = 0;

/**
 * Render the condition builder HTML with existing conditions
 */
function renderConditionBuilder(conditions) {
    conditionRowCounter = 0;
    let rowsHtml = '';

    if (conditions && typeof conditions === 'object') {
        for (const [key, value] of Object.entries(conditions)) {
            const [field, operator] = key.split('__');
            rowsHtml += renderConditionRow(field, operator, value);
        }
    }

    return `
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${rowsHtml}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `;
}

/**
 * Render a single condition row
 */
function renderConditionRow(field = '', operator = '', value = '') {
    const rowId = conditionRowCounter++;
    const fieldOptions = Object.keys(FIELD_OPERATORS).map(f =>
        `<option value="${f}" ${f === field ? 'selected' : ''}>${f}</option>`
    ).join('');

    const operators = field ? FIELD_OPERATORS[field] : FIELD_OPERATORS.estimate;
    const operatorOptions = operators.map(op =>
        `<option value="${op}" ${op === operator ? 'selected' : ''}>${OPERATOR_LABELS[op]}</option>`
    ).join('');

    // Handle boolean values for isnull - don't display them
    const displayValue = value === true ? '' : (Array.isArray(value) ? value.join(',') : (value ?? ''));
    const hideValue = operator === 'isnull';

    return `
        <div class="condition-row" id="condition-row-${rowId}">
            <select class="condition-field" onchange="updateOperatorOptions(${rowId})">
                <option value="">Select field...</option>
                ${fieldOptions}
            </select>
            <select class="condition-operator" id="condition-operator-${rowId}" onchange="toggleValueInput(${rowId})">
                ${operatorOptions}
            </select>
            <input type="text" class="condition-value" id="condition-value-${rowId}" value="${escapeAttr(String(displayValue))}" placeholder="Value"${hideValue ? ' style="display: none;"' : ''}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${rowId})">&times;</button>
        </div>
    `;
}

/**
 * Add a new empty condition row
 */
function addConditionRow() {
    const container = document.getElementById('condition-rows');
    if (container) {
        container.insertAdjacentHTML('beforeend', renderConditionRow());
    }
    clearConditionError();
}

/**
 * Remove a condition row by ID
 */
function removeConditionRow(rowId) {
    const row = document.getElementById(`condition-row-${rowId}`);
    if (row) {
        row.remove();
    }
    clearConditionError();
}

/**
 * Update operator dropdown when field changes
 */
function updateOperatorOptions(rowId) {
    const row = document.getElementById(`condition-row-${rowId}`);
    if (!row) return;

    const fieldSelect = row.querySelector('.condition-field');
    const operatorSelect = row.querySelector('.condition-operator');
    const field = fieldSelect.value;

    if (!field) return;

    const operators = FIELD_OPERATORS[field] || [];
    operatorSelect.innerHTML = operators.map(op =>
        `<option value="${op}">${OPERATOR_LABELS[op]}</option>`
    ).join('');

    toggleValueInput(rowId);
    clearConditionError();
}

/**
 * Show/hide value input based on operator (isnull doesn't need value)
 */
function toggleValueInput(rowId) {
    const operatorSelect = document.getElementById(`condition-operator-${rowId}`);
    const valueInput = document.getElementById(`condition-value-${rowId}`);

    if (operatorSelect && valueInput) {
        valueInput.style.display = operatorSelect.value === 'isnull' ? 'none' : '';
    }
}

/**
 * Show error message in the condition builder
 */
function showConditionError(message) {
    const errorEl = document.getElementById('condition-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

/**
 * Clear error message
 */
function clearConditionError() {
    const errorEl = document.getElementById('condition-error');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

/**
 * Collect all condition rows into a conditions object for API.
 * Returns null if no conditions, or throws an error if validation fails.
 */
function collectConditions() {
    const rows = document.querySelectorAll('.condition-row');
    const conditions = {};
    const seenKeys = new Set();

    for (const row of rows) {
        const field = row.querySelector('.condition-field')?.value;
        const operator = row.querySelector('.condition-operator')?.value;
        const valueInput = row.querySelector('.condition-value');
        let value = valueInput?.value?.trim();

        // Skip completely empty rows (user added but didn't fill in)
        if (!field && !operator) continue;

        // Validate incomplete rows
        if (!field) {
            showConditionError('Please select a field for all condition rows, or remove empty rows.');
            throw new Error('Incomplete condition row: missing field');
        }
        if (!operator) {
            showConditionError('Please select an operator for all condition rows.');
            throw new Error('Incomplete condition row: missing operator');
        }

        const key = `${field}__${operator}`;

        // Check for duplicate keys
        if (seenKeys.has(key)) {
            showConditionError(`Duplicate condition: ${field} ${OPERATOR_LABELS[operator]}. Each field+operator combination can only be used once.`);
            throw new Error(`Duplicate condition key: ${key}`);
        }
        seenKeys.add(key);

        if (operator === 'isnull') {
            conditions[key] = true;
        } else if (operator === 'in' || operator === 'contains') {
            // Parse comma-separated values into array
            conditions[key] = value ? value.split(',').map(v => v.trim()).filter(v => v) : [];
        } else if (operator === 'gte' || operator === 'lte') {
            // Validate and parse numeric values
            if (!value) {
                showConditionError(`Please enter a numeric value for ${field} ${OPERATOR_LABELS[operator]}.`);
                throw new Error(`Missing numeric value for ${key}`);
            }
            const parsed = parseInt(value, 10);
            if (isNaN(parsed)) {
                showConditionError(`Invalid number "${value}" for ${field}. Please enter a valid integer.`);
                throw new Error(`Invalid numeric value for ${key}: ${value}`);
            }
            conditions[key] = parsed;
        } else {
            conditions[key] = value;
        }
    }

    clearConditionError();
    return Object.keys(conditions).length > 0 ? conditions : null;
}

// Export to window for onclick handlers and app.js usage
Object.assign(window, {
    renderConditionBuilder,
    addConditionRow,
    removeConditionRow,
    updateOperatorOptions,
    toggleValueInput,
    collectConditions
});

export {
    renderConditionBuilder,
    addConditionRow,
    removeConditionRow,
    updateOperatorOptions,
    toggleValueInput,
    collectConditions,
    FIELD_OPERATORS,
    OPERATOR_LABELS
};
