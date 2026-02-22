import { describe, it, expect, vi } from 'vitest';
import {
  formatStatus,
  formatPriority,
  formatDate,
  formatTimeAgo,
  sanitizeColor,
  escapeHtml,
  escapeAttr,
  escapeJsString,
  debounce,
  getPriorityIcon,
  getStatusIcon,
} from './utils.js';

describe('formatStatus', () => {
  it('converts underscores to spaces and capitalizes words', () => {
    expect(formatStatus('in_progress')).toBe('In Progress');
    expect(formatStatus('in_review')).toBe('In Review');
  });

  it('capitalizes single word statuses', () => {
    expect(formatStatus('todo')).toBe('Todo');
    expect(formatStatus('done')).toBe('Done');
    expect(formatStatus('backlog')).toBe('Backlog');
  });

  it('handles empty/null input', () => {
    expect(formatStatus('')).toBe('');
    expect(formatStatus(null)).toBe('');
    expect(formatStatus(undefined)).toBe('');
  });
});

describe('formatPriority', () => {
  it('formats standard priorities', () => {
    expect(formatPriority('high')).toBe('High');
    expect(formatPriority('medium')).toBe('Medium');
    expect(formatPriority('low')).toBe('Low');
    expect(formatPriority('urgent')).toBe('Urgent');
  });

  it('handles no_priority specially', () => {
    expect(formatPriority('no_priority')).toBe('No Priority');
  });

  it('handles empty/null input', () => {
    expect(formatPriority('')).toBe('');
    expect(formatPriority(null)).toBe('');
    expect(formatPriority(undefined)).toBe('');
  });
});

describe('formatDate', () => {
  it('formats ISO date strings', () => {
    // Test that the output contains the expected components
    // Using regex to be timezone-agnostic (date may shift by 1 day depending on TZ)
    const result = formatDate('2024-01-15T12:00:00Z');
    expect(result).toMatch(/Jan \d{1,2}, 2024/);
    expect(result).toMatch(/\w+ \d{1,2}, \d{4}/); // General date format
  });

  it('handles empty/null input', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });

  it('handles invalid date strings', () => {
    expect(formatDate('not a date')).toBe('');
    expect(formatDate('2024-13-45')).toBe('');
    expect(formatDate('invalid')).toBe('');
  });
});

describe('formatTimeAgo', () => {
  it('returns "just now" for very recent dates', () => {
    const now = new Date();
    const recent = new Date(now.getTime() - 30000); // 30 seconds ago
    expect(formatTimeAgo(recent.toISOString())).toBe('just now');
  });

  it('formats minutes ago correctly', () => {
    const now = new Date();
    const minutesAgo = new Date(now.getTime() - 5 * 60000); // 5 minutes ago
    expect(formatTimeAgo(minutesAgo.toISOString())).toBe('5m ago');

    const fiftyNineMinutesAgo = new Date(now.getTime() - 59 * 60000);
    expect(formatTimeAgo(fiftyNineMinutesAgo.toISOString())).toBe('59m ago');
  });

  it('formats hours ago correctly', () => {
    const now = new Date();
    const hoursAgo = new Date(now.getTime() - 3 * 3600000); // 3 hours ago
    expect(formatTimeAgo(hoursAgo.toISOString())).toBe('3h ago');

    const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 3600000);
    expect(formatTimeAgo(twentyThreeHoursAgo.toISOString())).toBe('23h ago');
  });

  it('formats days ago correctly', () => {
    const now = new Date();
    const daysAgo = new Date(now.getTime() - 2 * 86400000); // 2 days ago
    expect(formatTimeAgo(daysAgo.toISOString())).toBe('2d ago');

    const sixDaysAgo = new Date(now.getTime() - 6 * 86400000);
    expect(formatTimeAgo(sixDaysAgo.toISOString())).toBe('6d ago');
  });

  it('formats older dates as full date', () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 8 * 86400000); // 8 days ago
    const result = formatTimeAgo(weekAgo.toISOString());
    // Should be a full date string
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  it('handles null input', () => {
    expect(formatTimeAgo(null)).toBe('');
  });

  it('handles undefined input', () => {
    expect(formatTimeAgo(undefined)).toBe('');
  });

  it('handles empty string input', () => {
    expect(formatTimeAgo('')).toBe('');
  });

  it('handles invalid date strings', () => {
    expect(formatTimeAgo('not a date')).toBe('');
    expect(formatTimeAgo('2024-13-45')).toBe('');
    expect(formatTimeAgo('invalid')).toBe('');
  });

  it('handles future dates', () => {
    const now = new Date();
    const future = new Date(now.getTime() + 3600000); // 1 hour in future
    expect(formatTimeAgo(future.toISOString())).toBe('in the future');

    const farFuture = new Date(now.getTime() + 86400000 * 30); // 30 days in future
    expect(formatTimeAgo(farFuture.toISOString())).toBe('in the future');
  });

  it('handles various ISO date formats', () => {
    const now = new Date();
    const recent = new Date(now.getTime() - 120000); // 2 minutes ago

    // Test different ISO formats
    expect(formatTimeAgo(recent.toISOString())).toBe('2m ago');
    expect(formatTimeAgo(recent.toJSON())).toBe('2m ago');
  });

  it('handles boundary at exactly 60 seconds', () => {
    const now = new Date();
    // 59.9 seconds ago - should be "just now"
    const justUnder60s = new Date(now.getTime() - 59900);
    expect(formatTimeAgo(justUnder60s.toISOString())).toBe('just now');

    // Exactly 60 seconds (1 minute) ago - should be "1m ago"
    const exactly60s = new Date(now.getTime() - 60000);
    expect(formatTimeAgo(exactly60s.toISOString())).toBe('1m ago');
  });

  it('handles boundary at exactly 60 minutes (24h)', () => {
    const now = new Date();
    // 59 minutes ago - should be "59m ago"
    const fiftyNineMin = new Date(now.getTime() - 59 * 60000);
    expect(formatTimeAgo(fiftyNineMin.toISOString())).toBe('59m ago');

    // Exactly 60 minutes (1 hour) ago - should be "1h ago"
    const exactly60Min = new Date(now.getTime() - 60 * 60000);
    expect(formatTimeAgo(exactly60Min.toISOString())).toBe('1h ago');
  });

  it('handles boundary at exactly 24 hours', () => {
    const now = new Date();
    // 23 hours ago - should be "23h ago"
    const twentyThreeHours = new Date(now.getTime() - 23 * 3600000);
    expect(formatTimeAgo(twentyThreeHours.toISOString())).toBe('23h ago');

    // Exactly 24 hours (1 day) ago - should be "1d ago"
    const exactly24h = new Date(now.getTime() - 24 * 3600000);
    expect(formatTimeAgo(exactly24h.toISOString())).toBe('1d ago');
  });

  it('handles boundary at exactly 7 days', () => {
    const now = new Date();
    // 6 days ago - should be "6d ago"
    const sixDays = new Date(now.getTime() - 6 * 86400000);
    expect(formatTimeAgo(sixDays.toISOString())).toBe('6d ago');

    // Exactly 7 days ago - should be full date
    const exactly7d = new Date(now.getTime() - 7 * 86400000);
    const result = formatTimeAgo(exactly7d.toISOString());
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });
});

describe('formatTimeAgo', () => {
  describe('just now', () => {
    it('returns "just now" for times less than 1 minute ago', () => {
      const now = new Date();
      const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
      expect(formatTimeAgo(thirtySecondsAgo.toISOString())).toBe('just now');
    });

    it('returns "just now" for 59 seconds ago', () => {
      const now = new Date();
      const fiftyNineSecondsAgo = new Date(now.getTime() - 59 * 1000);
      expect(formatTimeAgo(fiftyNineSecondsAgo.toISOString())).toBe('just now');
    });

    it('returns "just now" for current time', () => {
      const now = new Date();
      expect(formatTimeAgo(now.toISOString())).toBe('just now');
    });
  });

  describe('minutes ago', () => {
    it('returns "1m ago" for exactly 60 seconds', () => {
      const now = new Date();
      const sixtySecondsAgo = new Date(now.getTime() - 60 * 1000);
      expect(formatTimeAgo(sixtySecondsAgo.toISOString())).toBe('1m ago');
    });

    it('returns "1m ago" for 1 minute 30 seconds ago', () => {
      const now = new Date();
      const oneMinThirtySecondsAgo = new Date(now.getTime() - 90 * 1000);
      expect(formatTimeAgo(oneMinThirtySecondsAgo.toISOString())).toBe('1m ago');
    });

    it('returns "30m ago" for 30 minutes ago', () => {
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      expect(formatTimeAgo(thirtyMinutesAgo.toISOString())).toBe('30m ago');
    });

    it('returns "59m ago" for 59 minutes ago (boundary)', () => {
      const now = new Date();
      const fiftyNineMinutesAgo = new Date(now.getTime() - 59 * 60 * 1000);
      expect(formatTimeAgo(fiftyNineMinutesAgo.toISOString())).toBe('59m ago');
    });

    it('returns "59m ago" for 59 minutes 59 seconds ago', () => {
      const now = new Date();
      const fiftyNineMinFiftyNineSecondsAgo = new Date(now.getTime() - (59 * 60 + 59) * 1000);
      expect(formatTimeAgo(fiftyNineMinFiftyNineSecondsAgo.toISOString())).toBe('59m ago');
    });
  });

  describe('hours ago', () => {
    it('returns "1h ago" for exactly 60 minutes', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      expect(formatTimeAgo(oneHourAgo.toISOString())).toBe('1h ago');
    });

    it('returns "1h ago" for 1 hour 30 minutes ago', () => {
      const now = new Date();
      const oneHourThirtyMinutesAgo = new Date(now.getTime() - 90 * 60 * 1000);
      expect(formatTimeAgo(oneHourThirtyMinutesAgo.toISOString())).toBe('1h ago');
    });

    it('returns "12h ago" for 12 hours ago', () => {
      const now = new Date();
      const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
      expect(formatTimeAgo(twelveHoursAgo.toISOString())).toBe('12h ago');
    });

    it('returns "23h ago" for 23 hours ago (boundary)', () => {
      const now = new Date();
      const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);
      expect(formatTimeAgo(twentyThreeHoursAgo.toISOString())).toBe('23h ago');
    });

    it('returns "23h ago" for 23 hours 59 minutes ago', () => {
      const now = new Date();
      const twentyThreeHoursFiftyNineMinutesAgo = new Date(now.getTime() - (23 * 60 + 59) * 60 * 1000);
      expect(formatTimeAgo(twentyThreeHoursFiftyNineMinutesAgo.toISOString())).toBe('23h ago');
    });
  });

  describe('days ago', () => {
    it('returns "1d ago" for exactly 24 hours', () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      expect(formatTimeAgo(oneDayAgo.toISOString())).toBe('1d ago');
    });

    it('returns "1d ago" for 36 hours ago', () => {
      const now = new Date();
      const thirtySixHoursAgo = new Date(now.getTime() - 36 * 60 * 60 * 1000);
      expect(formatTimeAgo(thirtySixHoursAgo.toISOString())).toBe('1d ago');
    });

    it('returns "3d ago" for 3 days ago', () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      expect(formatTimeAgo(threeDaysAgo.toISOString())).toBe('3d ago');
    });

    it('returns "6d ago" for 6 days ago (boundary)', () => {
      const now = new Date();
      const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
      expect(formatTimeAgo(sixDaysAgo.toISOString())).toBe('6d ago');
    });

    it('returns "6d ago" for 6 days 23 hours ago', () => {
      const now = new Date();
      const sixDaysTwentyThreeHoursAgo = new Date(now.getTime() - (6 * 24 + 23) * 60 * 60 * 1000);
      expect(formatTimeAgo(sixDaysTwentyThreeHoursAgo.toISOString())).toBe('6d ago');
    });
  });

  describe('date display for old items', () => {
    it('returns formatted date for exactly 7 days ago', () => {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const result = formatTimeAgo(sevenDaysAgo.toISOString());
      // Should return a formatted date string, not relative time
      expect(result).not.toContain('ago');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // Date format like "1/15/2024"
    });

    it('returns formatted date for 30 days ago', () => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const result = formatTimeAgo(thirtyDaysAgo.toISOString());
      expect(result).not.toContain('ago');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('returns formatted date for 365 days ago', () => {
      const now = new Date();
      const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      const result = formatTimeAgo(oneYearAgo.toISOString());
      expect(result).not.toContain('ago');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });
  });

  describe('edge cases and invalid inputs', () => {
    it('handles future dates by returning "just now" (negative diff < 1 min)', () => {
      const now = new Date();
      const futureDate = new Date(now.getTime() + 30 * 1000); // 30 seconds in future
      expect(formatTimeAgo(futureDate.toISOString())).toBe('in the future');
    });

    it('handles future dates beyond 1 minute gracefully', () => {
      const now = new Date();
      const futureDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes in future
      // Future dates are explicitly handled to return 'in the future'
      const result = formatTimeAgo(futureDate.toISOString());
      expect(result).toBe('in the future');
    });

    it('handles string dates in different formats', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      expect(formatTimeAgo(date.toISOString())).toBeTruthy();
    });

    it('handles Date object converted to string', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      expect(formatTimeAgo(oneHourAgo.toString())).toBe('1h ago');
    });
  });
});

describe('sanitizeColor', () => {
  it('accepts valid hex colors', () => {
    expect(sanitizeColor('#ffffff')).toBe('#ffffff');
    expect(sanitizeColor('#FF0000')).toBe('#FF0000');
    expect(sanitizeColor('#12345678')).toBe('#12345678');
  });

  it('normalizes 3-digit hex to 6-digit', () => {
    expect(sanitizeColor('#fff')).toBe('#ffffff');
    expect(sanitizeColor('#abc')).toBe('#aabbcc');
    expect(sanitizeColor('#F00')).toBe('#FF0000');
  });

  it('produces valid CSS when opacity suffix is appended', () => {
    // The ${sanitizeColor(color)}20 pattern must produce valid 8-digit hex
    const result = sanitizeColor('#abc') + '20';
    expect(result).toBe('#aabbcc20');
    expect(result).toMatch(/^#[0-9a-fA-F]{8}$/);
  });

  it('returns default for invalid colors', () => {
    expect(sanitizeColor('red')).toBe('#888888');
    expect(sanitizeColor('rgb(255,0,0)')).toBe('#888888');
    expect(sanitizeColor('#gg0000')).toBe('#888888');
    expect(sanitizeColor('')).toBe('#888888');
    expect(sanitizeColor(null)).toBe('#888888');
    expect(sanitizeColor(undefined)).toBe('#888888');
    expect(sanitizeColor(123)).toBe('#888888');
  });

  it('prevents XSS via color injection', () => {
    expect(sanitizeColor('javascript:alert(1)')).toBe('#888888');
    expect(sanitizeColor('<script>')).toBe('#888888');
    expect(sanitizeColor('#fff" onclick="alert(1)')).toBe('#888888');
  });
});

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
    expect(escapeHtml('a & b')).toBe('a &amp; b');
    expect(escapeHtml('<div class="test">')).toBe('&lt;div class="test"&gt;');
  });

  it('leaves safe text unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
    expect(escapeHtml('test123')).toBe('test123');
  });

  it('handles empty/null input', () => {
    expect(escapeHtml('')).toBe('');
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('converts numbers to strings', () => {
    expect(escapeHtml(123)).toBe('123');
  });
});

describe('escapeAttr', () => {
  it('escapes quotes for attribute context', () => {
    expect(escapeAttr("it's")).toBe('it&#39;s');
    expect(escapeAttr('say "hello"')).toBe('say &quot;hello&quot;');
  });

  it('also escapes HTML special characters', () => {
    expect(escapeAttr('<test>')).toBe('&lt;test&gt;');
    expect(escapeAttr('a & b')).toBe('a &amp; b');
  });

  it('handles combined escaping', () => {
    expect(escapeAttr('<a href="test">')).toBe('&lt;a href=&quot;test&quot;&gt;');
  });
});

describe('escapeJsString', () => {
  describe('basic escaping', () => {
    it('escapes backslashes', () => {
      expect(escapeJsString('path\\to\\file')).toBe('path\\\\to\\\\file');
      expect(escapeJsString('\\')).toBe('\\\\');
    });

    it('escapes backticks', () => {
      expect(escapeJsString('`template`')).toBe('\\`template\\`');
      expect(escapeJsString('`')).toBe('\\`');
    });

    it('escapes dollar signs', () => {
      expect(escapeJsString('$100')).toBe('\\$100');
      expect(escapeJsString('${var}')).toBe('\\${var}');
    });

    it('escapes single quotes to hex', () => {
      expect(escapeJsString("it's")).toBe('it\\x27s');
      expect(escapeJsString("'quoted'")).toBe('\\x27quoted\\x27');
    });

    it('escapes double quotes to hex', () => {
      expect(escapeJsString('say "hello"')).toBe('say \\x22hello\\x22');
      expect(escapeJsString('"')).toBe('\\x22');
    });

    it('escapes newlines', () => {
      expect(escapeJsString('line1\nline2')).toBe('line1\\nline2');
      expect(escapeJsString('\n')).toBe('\\n');
    });

    it('escapes carriage returns', () => {
      expect(escapeJsString('line1\rline2')).toBe('line1\\rline2');
      expect(escapeJsString('\r\n')).toBe('\\r\\n');
    });

    it('escapes angle brackets to hex', () => {
      expect(escapeJsString('<script>')).toBe('\\x3cscript\\x3e');
      expect(escapeJsString('<')).toBe('\\x3c');
      expect(escapeJsString('>')).toBe('\\x3e');
    });
  });

  describe('edge cases', () => {
    it('handles null input', () => {
      expect(escapeJsString(null)).toBe('');
    });

    it('handles undefined input', () => {
      expect(escapeJsString(undefined)).toBe('');
    });

    it('handles empty string', () => {
      expect(escapeJsString('')).toBe('');
    });

    it('converts numbers to strings', () => {
      expect(escapeJsString(123)).toBe('123');
      expect(escapeJsString(0)).toBe('0');
    });

    it('leaves safe text unchanged', () => {
      expect(escapeJsString('hello world')).toBe('hello world');
      expect(escapeJsString('abc123')).toBe('abc123');
      expect(escapeJsString('test_value')).toBe('test_value');
    });

    it('does not escape ampersand (browser HTML-decodes before JS eval)', () => {
      expect(escapeJsString('a&b')).toBe('a&b');
      expect(escapeJsString('foo&amp;bar')).toBe('foo&amp;bar');
    });
  });

  describe('combined escaping', () => {
    it('escapes multiple special characters in one string', () => {
      expect(escapeJsString("It's a \"test\"\nwith <html>")).toBe(
        'It\\x27s a \\x22test\\x22\\nwith \\x3chtml\\x3e'
      );
    });

    it('escapes template literal injection attempts', () => {
      expect(escapeJsString('${alert(1)}')).toBe('\\${alert(1)}');
      expect(escapeJsString('`${x}`')).toBe('\\`\\${x}\\`');
    });

    it('escapes backslash followed by special char', () => {
      expect(escapeJsString('\\n')).toBe('\\\\n');
      expect(escapeJsString("\\'")).toBe('\\\\\\x27');
    });
  });

  describe('XSS prevention', () => {
    it('prevents script tag injection', () => {
      const result = escapeJsString('<script>alert("xss")</script>');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
      expect(result).toBe('\\x3cscript\\x3ealert(\\x22xss\\x22)\\x3c/script\\x3e');
    });

    it('prevents onclick handler injection', () => {
      const result = escapeJsString('onclick="alert(1)"');
      expect(result).toBe('onclick=\\x22alert(1)\\x22');
    });

    it('prevents JavaScript protocol injection', () => {
      const result = escapeJsString("javascript:alert('xss')");
      expect(result).toBe('javascript:alert(\\x27xss\\x27)');
    });

    it('prevents closing script tag injection', () => {
      const result = escapeJsString('</script><script>evil()</script>');
      expect(result).toBe('\\x3c/script\\x3e\\x3cscript\\x3eevil()\\x3c/script\\x3e');
    });

    it('prevents quote-breaking in inline handlers', () => {
      // Simulating: onclick="func('${escapeJsString(userInput)}')"
      const userInput = "'); alert('xss";
      const result = escapeJsString(userInput);
      expect(result).toBe('\\x27); alert(\\x27xss');
    });

    it('prevents HTML attribute breakout via double quotes', () => {
      // Critical: onclick="func('${escapeJsString(val)}')"
      // If val contains ", it must NOT produce a literal " that closes the attribute
      const result = escapeJsString('x" onmouseover="alert(1)" data-x="');
      expect(result).not.toContain('"');
      expect(result).toBe('x\\x22 onmouseover=\\x22alert(1)\\x22 data-x=\\x22');
    });
  });
});

describe('debounce', () => {
  it('delays function execution', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('resets timer on subsequent calls', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced(); // reset
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('passes arguments to debounced function', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    vi.useRealTimers();
  });

  it('uses default delay of 300ms', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn);

    debounced();
    vi.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('can be cancelled', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced.cancel();
    vi.advanceTimersByTime(100);

    expect(fn).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});

describe('getPriorityIcon', () => {
  it('returns SVG for known priorities', () => {
    expect(getPriorityIcon('urgent')).toContain('svg');
    expect(getPriorityIcon('urgent')).toContain('priority-urgent');
    expect(getPriorityIcon('high')).toContain('priority-high');
    expect(getPriorityIcon('medium')).toContain('priority-medium');
    expect(getPriorityIcon('low')).toContain('priority-low');
    expect(getPriorityIcon('no_priority')).toContain('priority-none');
  });

  it('returns no_priority icon for unknown values', () => {
    expect(getPriorityIcon('unknown')).toContain('priority-none');
    expect(getPriorityIcon(null)).toContain('priority-none');
    expect(getPriorityIcon(undefined)).toContain('priority-none');
  });
});

describe('getStatusIcon', () => {
  it('returns SVG for known statuses', () => {
    expect(getStatusIcon('backlog')).toContain('status-backlog');
    expect(getStatusIcon('todo')).toContain('status-todo');
    expect(getStatusIcon('in_progress')).toContain('status-in-progress');
    expect(getStatusIcon('in_review')).toContain('status-in-review');
    expect(getStatusIcon('done')).toContain('status-done');
    expect(getStatusIcon('canceled')).toContain('status-canceled');
  });

  it('returns backlog icon for unknown values', () => {
    expect(getStatusIcon('unknown')).toContain('status-backlog');
    expect(getStatusIcon(null)).toContain('status-backlog');
    expect(getStatusIcon(undefined)).toContain('status-backlog');
  });
});
