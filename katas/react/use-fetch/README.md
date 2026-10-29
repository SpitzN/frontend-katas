# useFetch

**Track:** React · **Level:** core

Write `useFetch<T>(url)`, returning `{ status: "loading" }`, `{ status: "success", data }` or `{ status: "error", error }`.

- A new `url` starts over at `loading`.
- A response for an old `url` never replaces the current one, even if it arrives last.
- A request that is no longer needed is aborted: on a new `url` and on unmount.
- A non-2xx response is an error.

```sh
pnpm kata katas/react/use-fetch
```
