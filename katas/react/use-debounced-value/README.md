# useDebouncedValue

**Track:** React · **Level:** warm-up

Write `useDebouncedValue(value, delay)`: it returns `value`, but only once `value` has stopped changing for `delay` ms. A search box uses it to avoid a request per keystroke.

- The first render returns the value as it is.
- A change shows up `delay` ms after the last change, not before.
- Unmounting leaves no timer behind.

```sh
pnpm kata katas/react/use-debounced-value
```
