# frontend-katas

Practice exercises in JS, TypeScript and React. Each kata is a folder under `katas/<track>/<name>/`: a `README.md` with the problem, a starter file, its tests, and `solution/` with a reference solution and `NOTES.md`.

## When I am practising

I am training my own judgement, so the goal is that I solve it.

- Leave `solution/` closed unless I ask for it by name.
- When I ask for help, give the smallest useful hint first: a question, then a pointer to the concept, then a sketch. Full code only when I ask for it.
- When I ask you to review my attempt, run `pnpm kata <folder> --run`, then review it like a pull request: correctness first, then edge cases the tests miss, then clarity. Compare with `solution/` only after that, and say where mine differs and whether the difference matters.

## When I ask you to solve a kata

Solve it in the starter file, run its tests until they pass, and explain the approach. I will review your code the way I would review a colleague's.

## Adding a kata

- Folder layout as above; the starter keeps the exported signature and throws `Not implemented` (or returns `null` for a component, or holds the bug for a find-the-bug kata).
- Tests are the spec: every requirement in the README has a test, and type requirements use `expectTypeOf` or `@ts-expect-error`.
- `pnpm verify` passes (every solution green) and the new kata's tests fail on its starter.
- Add the kata to the table in `README.md`.
