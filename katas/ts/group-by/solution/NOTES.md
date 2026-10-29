# Notes

- Two type parameters do the work: `T` is inferred from the items, and `K` from what the key function returns. `K extends PropertyKey` keeps it usable as an object key, and lets TypeScript keep a literal union like `"red" | "blue"` instead of widening to `string`.
- `Partial<Record<K, T[]>>` says honestly that a key may have no group. A plain `Record` would claim `byTeam.green` exists.
- `readonly T[]` accepts both mutable and readonly arrays.
- `??=` creates the group on first use in one expression.
- The platform now has `Object.groupBy` and `Map.groupBy`; knowing their return types (`Partial<Record<…>>` and `Map`) is a good follow-up.
