import { describe, it, expect } from 'vitest';
import { _internals } from './revisions.js';

const { diffLines, renderUnifiedDiff } = _internals;

describe('diffLines', () => {
  it('returns a single equal op when inputs are identical', () => {
    const ops = diffLines(['a', 'b', 'c'], ['a', 'b', 'c']);
    expect(ops).toEqual([{ type: 'equal', lines: ['a', 'b', 'c'] }]);
  });

  it('detects pure insertions', () => {
    const ops = diffLines(['a'], ['a', 'b']);
    expect(ops).toEqual([
      { type: 'equal', lines: ['a'] },
      { type: 'add', lines: ['b'] },
    ]);
  });

  it('detects pure deletions', () => {
    const ops = diffLines(['a', 'b'], ['a']);
    expect(ops).toEqual([
      { type: 'equal', lines: ['a'] },
      { type: 'del', lines: ['b'] },
    ]);
  });

  it('detects a replacement as del + add', () => {
    const ops = diffLines(['a', 'b', 'c'], ['a', 'B', 'c']);
    expect(ops).toEqual([
      { type: 'equal', lines: ['a'] },
      { type: 'del', lines: ['b'] },
      { type: 'add', lines: ['B'] },
      { type: 'equal', lines: ['c'] },
    ]);
  });

  it('coalesces consecutive same-type lines into one op', () => {
    const ops = diffLines([], ['a', 'b', 'c']);
    expect(ops).toEqual([{ type: 'add', lines: ['a', 'b', 'c'] }]);
  });

  it('handles empty-vs-empty', () => {
    expect(diffLines([], [])).toEqual([]);
  });
});

describe('renderUnifiedDiff', () => {
  it('shows "No changes" when inputs are identical', () => {
    const html = renderUnifiedDiff('hello\nworld', 'hello\nworld');
    expect(html).toContain('No changes');
  });

  it('renders +/- markers for changes', () => {
    const html = renderUnifiedDiff('old line', 'new line');
    expect(html).toContain('diff-del');
    expect(html).toContain('diff-add');
    expect(html).toContain('- old line');
    expect(html).toContain('+ new line');
  });

  it('escapes HTML to prevent XSS in diff output', () => {
    const html = renderUnifiedDiff('a', '<script>alert(1)</script>');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
