import { describe, it, expect } from 'vitest';
import { getMemberHandle } from './mention-autocomplete.js';

describe('getMemberHandle', () => {
    it('returns first name lowercased', () => {
        expect(getMemberHandle({ name: 'John Smith', email: 'john@example.com' })).toBe('john');
    });

    it('returns email prefix when no name', () => {
        expect(getMemberHandle({ email: 'alice.bob@example.com' })).toBe('alice.bob');
    });

    it('returns "user" fallback when no name or email', () => {
        expect(getMemberHandle({})).toBe('user');
    });

    it('returns email prefix when name is empty string', () => {
        expect(getMemberHandle({ name: '', email: 'test@example.com' })).toBe('test');
    });
});
