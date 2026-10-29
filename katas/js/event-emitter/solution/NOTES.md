# Notes

- `emit` iterates over a copy of the listener list. Iterating the live array while a listener unsubscribes skips the next listener: the classic bug.
- `once` wraps the listener but stores the original beside the wrapper, so `off(event, original)` still finds it.
- The `Events` map gives each event its own argument list: `emit("message", 42)` fails to compile when `message` takes a string.
- One cast remains, where listeners of different events share one map. It is contained in `#add`, and every public signature stays exact.
- Follow-ups: error isolation (one throwing listener should not stop the rest), a max-listeners warning, wildcard events.
