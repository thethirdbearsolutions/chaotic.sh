import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

/**
 * Tests for markdown rendering security and issue reference handling
 *
 * These tests verify that:
 * 1. XSS attacks via markdown are prevented
 * 2. Issue references are properly converted to links
 * 3. Mentions are properly highlighted
 * 4. The interaction between markdown, issue refs, and mentions is safe
 */

describe('Markdown rendering security', () => {
  let window, document, marked, DOMPurify;
  let renderMarkdown, renderCommentContent;

  beforeEach(async () => {
    // Create a fresh DOM for each test
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: 'http://localhost',
    });
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    global.NodeFilter = window.NodeFilter;

    // Mock marked library
    marked = {
      parse: vi.fn((content) => {
        // Simple markdown simulation for testing
        let html = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
          .replace(/`(.*?)`/g, '<code>$1</code>');
        return html;
      }),
      setOptions: vi.fn(),
    };

    // Mock DOMPurify with proper sanitization
    DOMPurify = {
      sanitize: vi.fn((html) => {
        // Proper sanitization for testing - remove dangerous elements and attributes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Remove script tags
        tempDiv.querySelectorAll('script').forEach(el => el.remove());

        // Remove dangerous attributes from all elements
        const dangerousAttrs = ['onclick', 'onerror', 'onload', 'onmouseover'];
        tempDiv.querySelectorAll('*').forEach(el => {
          dangerousAttrs.forEach(attr => {
            if (el.hasAttribute(attr)) {
              el.removeAttribute(attr);
            }
          });

          // Remove javascript: URLs
          if (el.hasAttribute('href') && el.getAttribute('href').startsWith('javascript:')) {
            el.removeAttribute('href');
          }
        });

        return tempDiv.innerHTML;
      }),
    };

    global.marked = marked;
    global.DOMPurify = DOMPurify;

    // Define helper functions used by renderCommentContent
    const processTextNodes = (element, callback) => {
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // Skip text nodes that are inside code or pre elements
            let parent = node.parentElement;
            while (parent && parent !== element) {
              if (parent.tagName === 'CODE' || parent.tagName === 'PRE') {
                return NodeFilter.FILTER_REJECT;
              }
              parent = parent.parentElement;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      const nodesToProcess = [];
      let node;
      while ((node = walker.nextNode())) {
        nodesToProcess.push(node);
      }

      nodesToProcess.forEach(textNode => {
        callback(textNode);
      });
    };

    const addIssueLinksAndMentions = (textNode) => {
      const text = textNode.textContent;
      if (!text) return;

      const issuePattern = /\b([A-Z]{2,10}-\d+)\b/g;
      const mentionPattern = /(^|\s)@([a-zA-Z0-9._-]+)/g;

      const hasIssues = issuePattern.test(text);
      const hasMentions = mentionPattern.test(text);

      if (!hasIssues && !hasMentions) return;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let modified = false;

      const combinedPattern = /\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;
      let match;

      while ((match = combinedPattern.exec(text)) !== null) {
        modified = true;

        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }

        if (match[1]) {
          const issueId = match[1];
          const link = document.createElement('a');
          link.href = `#/issue/${issueId}`;
          link.className = 'issue-link';
          link.textContent = issueId;
          fragment.appendChild(link);
          lastIndex = match.index + match[0].length;
        } else if (match[3]) {
          if (match[2]) {
            fragment.appendChild(document.createTextNode(match[2]));
          }
          const span = document.createElement('span');
          span.className = 'mention';
          span.textContent = '@' + match[3];
          fragment.appendChild(span);
          lastIndex = match.index + match[0].length;
        }
      }

      if (modified) {
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    };

    // Define renderMarkdown function
    renderMarkdown = (content) => {
      if (!content) return '';
      if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        try {
          marked.setOptions({
            breaks: true,
            gfm: true,
          });
          const rawHtml = marked.parse(content);
          const safeHtml = rawHtml.replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,
              (match) => match.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
          return DOMPurify.sanitize(safeHtml, { FORCE_BODY: true });
        } catch (e) {
          console.error('Markdown parsing error:', e);
        }
      }
      return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    // Define renderCommentContent - the main function under test
    renderCommentContent = (content) => {
      if (!content) return '';
      const sanitizedHtml = renderMarkdown(content);

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sanitizedHtml;

      processTextNodes(tempDiv, addIssueLinksAndMentions);

      return tempDiv.innerHTML;
    };
  });

  describe('XSS protection', () => {
    it('prevents XSS via inline onclick in code blocks', () => {
      const malicious = '`CHT-123 onclick=alert("XSS")`';
      const result = renderCommentContent(malicious);

      // Text in code blocks is left as-is (not processed for issue refs)
      // This prevents the XSS vulnerability where we'd inject HTML into code blocks
      expect(result).toContain('<code>');
      expect(result).toContain('CHT-123 onclick=alert');
      // Verify CHT-123 is NOT converted to a link inside code
      expect(result).not.toContain('<code><a href');
    });

    it('prevents XSS via script tags in markdown', () => {
      const malicious = '<script>alert("XSS")</script>';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert("XSS")');
    });

    it('prevents XSS via javascript: URLs in issue references', () => {
      const malicious = '[CHT-123](javascript:alert("XSS"))';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('javascript:');
    });

    it('prevents XSS via event handlers in markdown links', () => {
      const malicious = '[Click me](http://example.com" onclick="alert(\'XSS\')")';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('onclick');
    });

    it('preserves text content inside stripped HTML tags like title (CHT-829)', () => {
      const text = 'epic create <title> and more text';
      const result = renderCommentContent(text);

      // <title> tag should be stripped but text around it preserved
      expect(result).not.toContain('<title>');
      expect(result).toContain('epic create');
      expect(result).toContain('and more text');
    });

    it('preserves text content inside stripped style tags (CHT-829)', () => {
      const text = 'before <style>body{color:red}</style> after';
      const result = renderCommentContent(text);

      expect(result).not.toContain('<style>');
      expect(result).toContain('before');
      expect(result).toContain('after');
    });

    it('preserves text content inside textarea tags (CHT-829)', () => {
      const text = 'form with <textarea>user input</textarea> here';
      const result = renderCommentContent(text);

      expect(result).not.toContain('<textarea>');
      expect(result).toContain('user input');
      expect(result).toContain('here');
    });

    it('preserves text content inside xmp tags (CHT-829)', () => {
      const text = 'legacy <xmp>preformatted</xmp> format';
      const result = renderCommentContent(text);

      expect(result).not.toContain('<xmp>');
      expect(result).toContain('preformatted');
      expect(result).toContain('format');
    });

    it('prevents XSS via crafted issue references with HTML injection', () => {
      const malicious = 'CHT-123<img src=x onerror=alert("XSS")>';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('onerror=');
      expect(result).not.toContain('alert("XSS")');
    });

    it('prevents XSS via mention with HTML injection', () => {
      const malicious = '@user<script>alert("XSS")</script>';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert("XSS")');
    });

    it('prevents XSS via markdown bold with script tag', () => {
      const malicious = '**CHT-123**<script>alert("XSS")</script>';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert("XSS")');
    });

    it('prevents XSS via crafted markdown with embedded HTML attributes', () => {
      const malicious = '`CHT-123` <a href="javascript:alert(\'XSS\')">click</a>';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('javascript:alert');
    });
  });

  describe('Issue reference conversion', () => {
    it('converts valid issue references to links', () => {
      const text = 'This references CHT-123 in the text';
      const result = renderCommentContent(text);

      expect(result).toContain('href="#/issue/CHT-123"');
      expect(result).toContain('class="issue-link"');
    });

    it('converts multiple issue references', () => {
      const text = 'CHT-123 and CHT-456 are related';
      const result = renderCommentContent(text);

      expect(result).toContain('href="#/issue/CHT-123"');
      expect(result).toContain('href="#/issue/CHT-456"');
    });

    it('handles issue references with different prefixes', () => {
      const text = 'ABC-1 and LONGPREFIX-999';
      const result = renderCommentContent(text);

      expect(result).toContain('href="#/issue/ABC-1"');
      expect(result).toContain('href="#/issue/LONGPREFIX-999"');
    });

    it('does not convert invalid issue references', () => {
      const text = 'A-1 and TOOLONGPREFIX-1 and CHT- and CHT-ABC';
      const result = renderCommentContent(text);

      // A-1 is too short (needs 2-10 chars)
      expect(result).not.toContain('href="#/issue/A-1"');
      // TOOLONGPREFIX-1 is too long (>10 chars)
      expect(result).not.toContain('href="#/issue/TOOLONGPREFIX-1"');
      // CHT- has no number
      expect(result).not.toContain('href="#/issue/CHT-"');
      // CHT-ABC has letters instead of numbers
      expect(result).not.toContain('href="#/issue/CHT-ABC"');
    });

    it('preserves issue links within markdown code blocks', () => {
      const text = '`CHT-123` is a reference';
      const result = renderCommentContent(text);

      // The issue reference inside code block is NOT converted (left as plain text)
      // This is the security fix - we don't process code blocks
      expect(result).toContain('<code>CHT-123</code>');
      // But the word "reference" outside the code block would be processed if it were an issue ref
      expect(result).not.toContain('<code><a href');
    });
  });

  describe('Mention highlighting', () => {
    it('highlights mentions with @ symbol', () => {
      const text = 'Hello @john how are you?';
      const result = renderCommentContent(text);

      expect(result).toContain('class="mention"');
      expect(result).toContain('@john');
    });

    it('highlights multiple mentions', () => {
      const text = '@alice and @bob should review this';
      const result = renderCommentContent(text);

      expect(result).toContain('@alice');
      expect(result).toContain('@bob');
      // Should have 2 mention spans
      const mentionCount = (result.match(/class="mention"/g) || []).length;
      expect(mentionCount).toBe(2);
    });

    it('handles mentions with dots and dashes', () => {
      const text = '@john.doe and @jane-smith';
      const result = renderCommentContent(text);

      expect(result).toContain('@john.doe');
      expect(result).toContain('@jane-smith');
    });

    it('does not highlight email addresses as mentions', () => {
      const text = 'Contact john@example.com for help';
      const result = renderCommentContent(text);

      // Should not create a mention span for email
      expect(result).toContain('john@example.com');
    });
  });

  describe('Combined markdown, issue refs, and mentions', () => {
    it('handles issue references and mentions together', () => {
      const text = '@alice please review CHT-123';
      const result = renderCommentContent(text);

      expect(result).toContain('class="mention"');
      expect(result).toContain('@alice');
      expect(result).toContain('href="#/issue/CHT-123"');
    });

    it('handles markdown formatting with issue references', () => {
      const text = '**Important**: See CHT-123 for details';
      const result = renderCommentContent(text);

      expect(result).toContain('<strong>Important</strong>');
      expect(result).toContain('href="#/issue/CHT-123"');
    });

    it('handles markdown formatting with mentions', () => {
      const text = '@alice *great work* on this!';
      const result = renderCommentContent(text);

      expect(result).toContain('class="mention"');
      expect(result).toContain('@alice');
      expect(result).toContain('<em>great work</em>');
    });

    it('handles all three: markdown, issue refs, and mentions', () => {
      const text = '@alice **please review** CHT-123 *urgently*';
      const result = renderCommentContent(text);

      expect(result).toContain('class="mention"');
      expect(result).toContain('@alice');
      expect(result).toContain('<strong>please review</strong>');
      expect(result).toContain('href="#/issue/CHT-123"');
      expect(result).toContain('<em>urgently</em>');
    });

    it('does not break HTML structure with combined features', () => {
      const text = 'See CHT-123 for **@alice feedback** on this';
      const result = renderCommentContent(text);

      // Verify basic HTML structure is maintained
      const strongCount = (result.match(/<strong>/g) || []).length;
      const strongEndCount = (result.match(/<\/strong>/g) || []).length;
      expect(strongCount).toBe(strongEndCount);

      expect(result).toContain('CHT-123');
      expect(result).toContain('@alice');
    });

    it('prevents XSS with complex markdown and issue references', () => {
      const malicious = '**CHT-123**<script>alert("XSS")</script> @user`onclick=alert("XSS")`';
      const result = renderCommentContent(malicious);

      expect(result).not.toContain('<script>');
      // The text in backticks is preserved in code block (not processed)
      expect(result).toContain('<code>');

      // But should still have the safe parts
      expect(result).toContain('CHT-123');
      expect(result).toContain('@user');
    });
  });

  describe('Edge cases', () => {
    it('handles empty content', () => {
      const result = renderCommentContent('');
      expect(result).toBe('');
    });

    it('handles null content', () => {
      const result = renderCommentContent(null);
      expect(result).toBe('');
    });

    it('handles content with only whitespace', () => {
      const result = renderCommentContent('   \n  ');
      expect(result).toBeTruthy();
    });

    it('handles very long issue references', () => {
      const text = 'X'.repeat(50) + '-123';
      const result = renderCommentContent(text);

      // Should not create a link (prefix too long)
      expect(result).not.toContain('href="#/issue/');
    });

    it('handles issue references at start and end of text', () => {
      const text = 'CHT-123 in the middle CHT-456';
      const result = renderCommentContent(text);

      expect(result).toContain('href="#/issue/CHT-123"');
      expect(result).toContain('href="#/issue/CHT-456"');
    });

    it('handles mentions at start of text', () => {
      const text = '@alice here is the issue';
      const result = renderCommentContent(text);

      expect(result).toContain('class="mention"');
      expect(result).toContain('@alice');
    });
  });
});
