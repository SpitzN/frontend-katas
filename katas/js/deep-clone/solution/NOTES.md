# Notes

- The `WeakMap` from original to copy solves cycles and shared references in one move. Register the copy **before** recursing, or a cycle recurses forever.
- Order of checks matters: `Date`, `Map` and `Set` are objects too, so they are handled before the plain-object fallback.
- Not handled, on purpose: class instances (their prototype is lost), symbol keys, getters, functions. Name these limits up front; `structuredClone` has its own list of what it refuses.
