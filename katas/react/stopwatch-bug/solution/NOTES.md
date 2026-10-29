# Notes

Two bugs.

1. **A stale closure.** The interval callback captured `seconds` from the render that started it, where it was `0`, so it sets `0 + 1` forever. The updater form, `setSeconds((current) => current + 1)`, reads the latest value instead. Adding `seconds` to the dependencies would also "work", by tearing down and recreating the interval every second.
2. **No cleanup.** The effect never cleared its interval, so Stop left it running, Start added a second one, and unmount leaked it. Returning `() => clearInterval(timer)` ties the interval's life to `running` and to the component.

The lint rule `react-hooks/exhaustive-deps` flags the first bug: `seconds` is read but missing from the dependencies. A missing-dependency warning is often a stale closure in disguise.
