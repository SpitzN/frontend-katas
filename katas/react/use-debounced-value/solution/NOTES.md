# Notes

- The effect's cleanup is the debounce: every new `value` clears the previous timer before starting its own, and unmounting clears the last one.
- This is a legitimate effect: it synchronises with something outside React (a timer). The value itself is still state, because it changes over time on its own.
- Compare with a debounced _callback_ (`useDebouncedCallback`), which debounces an event handler instead of a value. Pick by which side you control: the value (search box text) or the call (save on change).
- Objects as `value` need a stable identity, or every render restarts the timer.
