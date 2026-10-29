# Deep clone

**Track:** JS · **Level:** core

Write `deepClone(value)` without `structuredClone` or JSON.

- Primitives come back as they are.
- Plain objects and arrays are copied all the way down.
- `Date`, `Map` and `Set` become new instances with cloned contents.
- Cycles work: an object that contains itself clones to a copy that contains the copy.
- A reference shared in the input is shared in the output.

```sh
pnpm kata katas/js/deep-clone
```
