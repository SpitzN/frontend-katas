import { afterEach, describe, expect, it, vi } from "vitest";
import { promiseAll } from "./promise-all";

const later = <T>(value: T, ms: number) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

describe("promiseAll", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves in input order, not settle order", async () => {
    await expect(promiseAll([later("slow", 30), later("fast", 1), "now"])).resolves.toEqual([
      "slow",
      "fast",
      "now",
    ]);
  });

  it("resolves an empty input to an empty array", async () => {
    await expect(promiseAll([])).resolves.toEqual([]);
  });

  it("rejects with the first rejection, without waiting for the rest", async () => {
    const start = Date.now();
    await expect(
      promiseAll([later("never seen", 200), Promise.reject(new Error("boom"))]),
    ).rejects.toThrow("boom");
    expect(Date.now() - start).toBeLessThan(150);
  });

  it("does not use the built-in combinators", async () => {
    const all = vi.spyOn(Promise, "all");
    const allSettled = vi.spyOn(Promise, "allSettled");
    await promiseAll([1, Promise.resolve(2)]);
    expect(all).not.toHaveBeenCalled();
    expect(allSettled).not.toHaveBeenCalled();
  });
});
