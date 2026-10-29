# Notes

- Two separate guards: `abort()` cancels the network work, and the `aborted` check before `setState` stops a stale response from landing. A fetch that ignores the signal, or a response already in flight, still needs the second guard.
- The state remembers which `url` it belongs to, so a new `url` reads as `loading` on the very render it changes, without a `setState` inside the effect.
- `await response.json()` sits inside the same chain, so a body that fails to parse becomes an error too.
- In a real app, reach for TanStack Query: caching, deduplication, retries and refetching are the next ten problems this hook would grow into. Knowing what it solves is the point of the kata.
