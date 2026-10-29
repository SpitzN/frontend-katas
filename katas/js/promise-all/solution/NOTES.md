# Notes

- `Promise.resolve(value)` handles plain values and thenables alike.
- Results are written by index, and completion is counted, not inferred from `results.length` (a sparse array has the full length from the start).
- `reject` can be called many times; only the first call settles the promise, which gives "first rejection wins" for free.
- The mapped return type keeps tuple positions: `promiseAll([1, Promise.resolve("a")] as const)` is `Promise<[1, string]>`.
- Follow-ups: write `allSettled`, and a version with a concurrency limit.
