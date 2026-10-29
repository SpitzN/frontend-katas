# Notes

- The roles and ARIA attributes carry the meaning: `aria-selected`, `aria-controls` from tab to panel, `aria-labelledby` from panel to tab. The tests find elements by role and accessible name, the way a screen reader would.
- Roving tab index: one tab has `tabIndex={0}`, the rest `-1`, so Tab enters the tablist once and moves on to the panel. Arrow keys move inside it.
- One key handler on the tablist, with a lookup table instead of a `switch`; `preventDefault` stops Home and End from scrolling the page.
- `useId` makes ids unique when two `Tabs` render on one page.
- Automatic activation (select on focus) suits panels that render instantly. When a panel is slow to load, use manual activation: arrows move focus, Enter or Space selects.
- In a real app, a headless library (Base UI, Radix, React Aria) ships this pattern; build it once to know what they do.
