# Result

**Track:** TS · **Level:** core

Model a `Result<T, E>`: either a value or an error, where the compiler makes the caller check which before reading either. The starter's types are `unknown` on purpose.

- `ok(value)` and `err(error)` build one.
- `if (result.ok)` narrows: `result.value` is readable only inside, `result.error` only outside.
- `map(result, fn)` transforms a value and passes an error through untouched.
- `unwrapOr(result, fallback)` gives the value or the fallback.
- `tryCatch(fn)` runs `fn` and turns a throw into an error result.

```sh
pnpm kata katas/ts/result
```
