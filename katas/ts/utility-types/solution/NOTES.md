# Notes

- `MyPick` is a mapped type over `K`; the `K extends keyof T` constraint is what makes `MyPick<Todo, "nope">` an error.
- `MyOmit` uses key remapping (`as`), mapping a key to `never` to drop it. It keeps `readonly` and `?` modifiers because it maps over `keyof T`.
- `MyAwaited` recurses through `infer`. Using `PromiseLike` covers any thenable, as the built-in does.
- `DeepReadonly` checks functions first: a function is an object, and mapping over it would lose its call signature. A homomorphic mapped type over an array produces a readonly array, so arrays need no special case.
- `T[number]` indexes a tuple by every numeric key at once.
