export type FetchState<T> =
  { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: unknown };

export function useFetch<T>(url: string): FetchState<T> {
  throw new Error("Not implemented");
}
