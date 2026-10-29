import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFetch } from "./use-fetch";

interface Call {
  url: string;
  signal: AbortSignal | null | undefined;
  respond: (body: unknown, status?: number) => void;
}

let calls: Call[] = [];

beforeEach(() => {
  calls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(
      (url: string, init?: RequestInit) =>
        new Promise((resolve) => {
          calls.push({
            url,
            signal: init?.signal,
            respond: (body, status = 200) => {
              resolve({ ok: status >= 200 && status < 300, status, json: async () => body });
            },
          });
        }),
    ),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const call = (index: number) => {
  const found = calls[index];
  if (!found) throw new Error(`no fetch call #${index}`);
  return found;
};

describe("useFetch", () => {
  it("goes from loading to success", async () => {
    const { result } = renderHook(() => useFetch<{ id: number }>("/a"));
    expect(result.current).toEqual({ status: "loading" });
    await act(async () => {
      call(0).respond({ id: 1 });
    });
    await waitFor(() => {
      expect(result.current).toEqual({ status: "success", data: { id: 1 } });
    });
  });

  it("treats a non-2xx response as an error", async () => {
    const { result } = renderHook(() => useFetch("/broken"));
    await act(async () => {
      call(0).respond({ message: "nope" }, 500);
    });
    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });
  });

  it("aborts the old request and ignores its late response", async () => {
    const { result, rerender } = renderHook(({ url }) => useFetch<string>(url), {
      initialProps: { url: "/first" },
    });
    rerender({ url: "/second" });
    expect(call(0).signal?.aborted).toBe(true);
    expect(result.current).toEqual({ status: "loading" });

    await act(async () => {
      call(1).respond("second");
    });
    await waitFor(() => {
      expect(result.current).toEqual({ status: "success", data: "second" });
    });

    await act(async () => {
      call(0).respond("first");
    });
    expect(result.current).toEqual({ status: "success", data: "second" });
  });

  it("aborts on unmount", () => {
    const { unmount } = renderHook(() => useFetch("/a"));
    unmount();
    expect(call(0).signal?.aborted).toBe(true);
  });
});
