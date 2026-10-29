import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "./use-debounced-value";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the first value at once", () => {
    const { result } = renderHook(() => useDebouncedValue("a", 300));
    expect(result.current).toBe("a");
  });

  it("shows a change only after the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: "a" },
    });
    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe("a");
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("b");
  });

  it("waits for changes to stop", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: "r" },
    });
    for (const value of ["re", "rea", "reac", "react"]) {
      rerender({ value });
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(result.current).toBe("r");
    }
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("react");
  });

  it("leaves no timer behind on unmount", () => {
    const { rerender, unmount } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: 1 },
    });
    rerender({ value: 2 });
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
