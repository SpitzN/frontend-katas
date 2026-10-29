import { useEffect, useState } from "react";

export type FetchState<T> =
  { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: unknown };

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<{ url: string; state: FetchState<T> }>({
    url,
    state: { status: "loading" },
  });

  useEffect(() => {
    const controller = new AbortController();
    const settle = (next: FetchState<T>) => {
      if (!controller.signal.aborted) setState({ url, state: next });
    };

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        settle({ status: "success", data: (await response.json()) as T });
      })
      .catch((error: unknown) => {
        settle({ status: "error", error });
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  // A result for another url is stale: the new request is still loading.
  return state.url === url ? state.state : { status: "loading" };
}
