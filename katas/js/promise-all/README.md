# Promise.all

**Track:** JS · **Level:** core

Write `promiseAll(values)` without `Promise.all`, `allSettled`, `any` or `race`.

- Resolves to the results in input order, whatever order they settle in.
- Plain values in the input count as already resolved.
- An empty input resolves to `[]`.
- Rejects with the first rejection, as soon as it happens.

```sh
pnpm kata katas/js/promise-all
```
