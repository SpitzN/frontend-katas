# Event emitter

**Track:** JS · **Level:** core

Write a typed `EventEmitter<Events>`, where `Events` maps each event name to its argument list.

- `on(event, listener)` subscribes and returns a function that unsubscribes.
- `off(event, listener)` unsubscribes, including a listener added with `once`.
- `once(event, listener)` calls the listener on the next emit only.
- `emit(event, ...args)` calls the event's listeners in subscription order and returns whether there were any.
- A listener added or removed during an emit does not change who that emit calls.

```sh
pnpm kata katas/js/event-emitter
```
