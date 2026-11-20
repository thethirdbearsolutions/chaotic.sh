/**
 * The text side of document references (CHT-2120), with no imports, so
 * the rich editor's bundle can share it with the textarea without pulling
 * in the API client. doc-refs.js re-exports all of it.
 */

/**
 * `[[` and what follows it up to the caret: a title search. No brackets
 * or newline in the query, so a closed `[[x]]` or a line break ends it.
 * Group 1 is the query.
 */
export const DOC_REF_TRIGGER = /\[\[([^[\]\n]{0,80})$/;

/**
 * A title made safe to sit between `[` and `]` and still read as the
 * title. A bracket would end the link text early and a backslash would
 * escape the next character; inline markdown and HTML (`*`, `_`, `` ` ``,
 * `~`, `<`, `&`, `!`, `|`) would render as emphasis, code, a tag or an
 * entity instead of the characters typed. Whitespace, line breaks
 * included, folds to one space: a line break would end the link.
 */
export function escapeLinkText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim().replace(/[\\[\]`*_~<>&!|]/g, '\\$&');
}
