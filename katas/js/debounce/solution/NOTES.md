# Notes

- The state lives in the closure: one timer and the latest arguments. That is why two debounced functions never interfere.
- `invoke` clears its state before calling `fn`, so a call made from inside `fn` starts a fresh wait.
- `flush` checks the timer, not the arguments: `undefined` is a valid argument list entry, an absent timer is not.
- Variations worth knowing: a leading edge (call at the start of a burst), `maxWait` (call at least every N ms during a long burst), and throttle (at most once per window).
