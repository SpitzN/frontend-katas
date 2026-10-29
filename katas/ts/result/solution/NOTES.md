# Notes

- A discriminated union on a literal `ok` field is what makes `if (result.ok)` narrow. Each branch has only its own field, so reading `value` before checking is a compile error.
- `ok` returns `Result<T, never>` and `err` returns `Result<never, E>`: `never` is assignable to anything, so both fit any `Result` the caller declares.
- `map` returns the error branch as it is; no copy is needed, because its type already fits `Result<U, E>`.
- `tryCatch` types the error as `unknown`, matching what `catch` receives. Narrow it at the use site.
- Follow-ups: `flatMap` (a function that itself returns a `Result`), an async `tryCatch`, and when a thrown error is the better tool.
