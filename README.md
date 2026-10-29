# frontend-katas

Small, focused exercises for keeping JavaScript, TypeScript and React skills sharp. Each kata is a short problem, a starter file and a test suite that tells you when you are done. A reference solution with notes sits beside it, for after.

## Run

```sh
pnpm install
pnpm kata katas/js/debounce        # watch mode for one kata
pnpm kata katas/js/debounce --run  # run once
```

The tests run on the starter file. They fail until it is solved. Type-level requirements fail too, through Vitest's typecheck.

## Two ways to practise

1. **Solo, against the clock.** Read the README, set a timer, solve it in the starter. Then read `solution/NOTES.md` and compare.
2. **With an agent.** Ask an agent to solve it, then review its code before running the tests: what would you change, what did it miss? `CLAUDE.md` tells the agent how to behave in both modes: hints before answers when you practise, full solutions when you ask.

Reset a kata with `git checkout -- katas/<track>/<name>`.

## Katas

| Track | Kata                                                   | Level        | Practises                                     |
| ----- | ------------------------------------------------------ | ------------ | --------------------------------------------- |
| JS    | [debounce](katas/js/debounce)                          | warm-up      | closures, timers, cancel and flush            |
| JS    | [promise-all](katas/js/promise-all)                    | core         | promises, ordering, first rejection           |
| JS    | [deep-clone](katas/js/deep-clone)                      | core         | recursion, `Map`/`Set`/`Date`, cycles         |
| JS    | [event-emitter](katas/js/event-emitter)                | core         | typed events, `once`, mutation during emit    |
| TS    | [utility-types](katas/ts/utility-types)                | core         | mapped, conditional and recursive types       |
| TS    | [group-by](katas/ts/group-by)                          | warm-up      | generics and inference                        |
| TS    | [result](katas/ts/result)                              | core         | discriminated unions, narrowing               |
| React | [use-debounced-value](katas/react/use-debounced-value) | warm-up      | effects and cleanup                           |
| React | [use-fetch](katas/react/use-fetch)                     | core         | race conditions, `AbortController`            |
| React | [accessible-tabs](katas/react/accessible-tabs)         | core         | ARIA tabs pattern, keyboard, roving tab index |
| React | [stopwatch-bug](katas/react/stopwatch-bug)             | find the bug | stale closures, missing cleanup               |

## How solutions are checked

`pnpm verify` copies the repo to `.verify/`, puts every `solution/` in place of its starter, and runs the typecheck and the full test suite there. CI runs it on every push, so every reference solution is known to pass.

## Stack

TypeScript (strict), Vitest with jsdom, Testing Library, React 19, pnpm.
