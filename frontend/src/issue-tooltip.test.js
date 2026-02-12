import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initIssueTooltip, clearIssueCache, destroyIssueTooltip } from './issue-tooltip.js';

describe('Issue Tooltip', () => {
    let mockApi;

    beforeEach(() => {
        // Clean up any existing tooltip
        destroyIssueTooltip();

        mockApi = {
            getIssueByIdentifier: vi.fn(),
        };
    });

    afterEach(() => {
        destroyIssueTooltip();
    });

    describe('initIssueTooltip', () => {
        it('should create tooltip element on first init', () => {
            initIssueTooltip({ api: mockApi });

            const tooltip = document.querySelector('.issue-tooltip');
            expect(tooltip).not.toBeNull();
            expect(tooltip.style.display).toBe('none');
        });

        it('should not create duplicate tooltip elements on re-init', () => {
            initIssueTooltip({ api: mockApi });
            initIssueTooltip({ api: mockApi });

            const tooltips = document.querySelectorAll('.issue-tooltip');
            expect(tooltips.length).toBe(1);
        });

        it('should not register duplicate event listeners on re-init', () => {
            const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

            initIssueTooltip({ api: mockApi });
            const initialCalls = addEventListenerSpy.mock.calls.length;

            initIssueTooltip({ api: mockApi });
            const afterReinitCalls = addEventListenerSpy.mock.calls.length;

            // Should not have added more listeners
            expect(afterReinitCalls).toBe(initialCalls);

            addEventListenerSpy.mockRestore();
        });
    });

    describe('clearIssueCache', () => {
        it('should clear the cache', () => {
            initIssueTooltip({ api: mockApi });
            // The cache is internal, but we can verify clearIssueCache doesn't throw
            expect(() => clearIssueCache()).not.toThrow();
        });
    });

    describe('destroyIssueTooltip', () => {
        it('should remove tooltip element', () => {
            initIssueTooltip({ api: mockApi });
            expect(document.querySelector('.issue-tooltip')).not.toBeNull();

            destroyIssueTooltip();
            expect(document.querySelector('.issue-tooltip')).toBeNull();
        });

        it('should allow re-initialization after destroy', () => {
            initIssueTooltip({ api: mockApi });
            destroyIssueTooltip();
            initIssueTooltip({ api: mockApi });

            const tooltip = document.querySelector('.issue-tooltip');
            expect(tooltip).not.toBeNull();
        });
    });

    describe('hover behavior', () => {
        it('should show tooltip on mouseover of issue link', async () => {
            const mockIssue = {
                id: 'issue-1',
                identifier: 'CHT-123',
                title: 'Test Issue',
                status: 'in_progress',
                priority: 'high',
                issue_type: 'task',
                estimate: 3,
            };
            mockApi.getIssueByIdentifier.mockResolvedValue(mockIssue);

            initIssueTooltip({ api: mockApi });

            // Create a test link
            const link = document.createElement('a');
            link.className = 'issue-link';
            link.href = '#/issue/CHT-123';
            link.textContent = 'CHT-123';
            document.body.appendChild(link);

            // Trigger mouseover
            const event = new MouseEvent('mouseover', { bubbles: true });
            link.dispatchEvent(event);

            // Wait for debounce and API call
            await vi.waitFor(() => {
                expect(mockApi.getIssueByIdentifier).toHaveBeenCalledWith('CHT-123');
            }, { timeout: 500 });

            // Clean up
            link.remove();
        });

        it('should hide tooltip on mouseout', async () => {
            initIssueTooltip({ api: mockApi });

            const tooltip = document.querySelector('.issue-tooltip');

            // Create a test link
            const link = document.createElement('a');
            link.className = 'issue-link';
            link.href = '#/issue/CHT-123';
            document.body.appendChild(link);

            // Trigger mouseout
            const event = new MouseEvent('mouseout', { bubbles: true });
            link.dispatchEvent(event);

            // Wait for hide timeout
            await new Promise(resolve => setTimeout(resolve, 200));

            expect(tooltip.style.display).toBe('none');

            // Clean up
            link.remove();
        });
    });

    describe('identifier extraction', () => {
        it('should extract identifier from href', async () => {
            mockApi.getIssueByIdentifier.mockResolvedValue({
                identifier: 'TEST-456',
                title: 'Test',
                status: 'backlog',
                priority: 'medium',
            });

            initIssueTooltip({ api: mockApi });

            const link = document.createElement('a');
            link.className = 'issue-link';
            link.href = '#/issue/TEST-456';
            link.textContent = 'Some Text';
            document.body.appendChild(link);

            const event = new MouseEvent('mouseover', { bubbles: true });
            link.dispatchEvent(event);

            await vi.waitFor(() => {
                expect(mockApi.getIssueByIdentifier).toHaveBeenCalledWith('TEST-456');
            }, { timeout: 500 });

            link.remove();
        });

        it('should extract identifier from text content as fallback', async () => {
            mockApi.getIssueByIdentifier.mockResolvedValue({
                identifier: 'ABC-789',
                title: 'Test',
                status: 'done',
                priority: 'low',
            });

            initIssueTooltip({ api: mockApi });

            const link = document.createElement('a');
            link.className = 'issue-link';
            link.href = '#'; // No identifier in href
            link.textContent = 'ABC-789';
            document.body.appendChild(link);

            const event = new MouseEvent('mouseover', { bubbles: true });
            link.dispatchEvent(event);

            await vi.waitFor(() => {
                expect(mockApi.getIssueByIdentifier).toHaveBeenCalledWith('ABC-789');
            }, { timeout: 500 });

            link.remove();
        });
    });

    describe('caching', () => {
        it('should cache fetched issues', async () => {
            const mockIssue = {
                identifier: 'CHT-100',
                title: 'Cached Issue',
                status: 'todo',
                priority: 'medium',
            };
            mockApi.getIssueByIdentifier.mockResolvedValue(mockIssue);

            initIssueTooltip({ api: mockApi });

            const link = document.createElement('a');
            link.className = 'issue-link';
            link.href = '#/issue/CHT-100';
            document.body.appendChild(link);

            // First hover
            link.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            await vi.waitFor(() => {
                expect(mockApi.getIssueByIdentifier).toHaveBeenCalledTimes(1);
            }, { timeout: 500 });

            // Hide and show again
            link.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
            await new Promise(resolve => setTimeout(resolve, 200));

            link.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            await new Promise(resolve => setTimeout(resolve, 300));

            // Should still be 1 call (cached)
            expect(mockApi.getIssueByIdentifier).toHaveBeenCalledTimes(1);

            link.remove();
        });
    });
});
