# Accessible tabs

**Track:** React · **Level:** core

Build `<Tabs tabs={[{ id, label, content }]} />` following the WAI-ARIA tabs pattern (automatic activation).

- A `tablist` of `tab` buttons; each `tabpanel` is labelled by its tab.
- The first tab starts selected; only the selected panel is shown.
- Clicking a tab selects it.
- Arrow Right and Arrow Left move to the next and previous tab, wrapping around; Home and End go to the first and last. Moving focus also selects.
- Roving tab index: only the selected tab is in the Tab order.

```sh
pnpm kata katas/react/accessible-tabs
```
