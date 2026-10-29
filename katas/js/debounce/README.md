# Debounce

**Track:** JS · **Level:** warm-up

Write `debounce(fn, wait)`. It returns a function that delays calling `fn` until `wait` ms have passed since the last call, then calls it once with the latest arguments.

- Each call restarts the wait.
- `debounced.cancel()` drops a pending call.
- `debounced.flush()` runs a pending call now; with nothing pending it does nothing.
- Two debounced functions never share state.

```sh
pnpm kata katas/js/debounce
```
