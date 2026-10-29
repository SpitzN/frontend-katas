# Utility types

**Track:** TS · **Level:** core

Rebuild five types without using the built-in utility types (`Pick`, `Omit`, `Exclude`, `Awaited`, `Readonly`).

- `MyPick<T, K>`: the properties of `T` named in `K`.
- `MyOmit<T, K>`: the properties of `T` not named in `K`.
- `MyAwaited<T>`: what a promise resolves to, unwrapping nested promises.
- `DeepReadonly<T>`: readonly all the way down, arrays included; functions stay as they are.
- `TupleToUnion<T>`: the union of a tuple's element types.

The tests are type assertions, so the typecheck is what fails.

```sh
pnpm kata katas/ts/utility-types
```
