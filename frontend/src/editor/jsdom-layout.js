/**
 * Test-only: the layout calls ProseMirror makes (scrolling the selection
 * into view, placing the @mention list) that jsdom does not implement.
 * Without them those calls throw inside animation frames, which vitest
 * reports as unhandled errors.
 */
const rect = () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON() { return this; } });
const rects = () => Object.assign([], { item: () => null });

for (const proto of [Range.prototype, Element.prototype]) {
    if (typeof proto.getClientRects !== 'function') proto.getClientRects = rects;
    if (typeof proto.getBoundingClientRect !== 'function') proto.getBoundingClientRect = rect;
}
if (typeof document.elementFromPoint !== 'function') document.elementFromPoint = () => null;
