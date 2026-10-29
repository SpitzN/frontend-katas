import { afterEach, describe, expect, it, vi } from "vitest";
import { deepClone } from "./deep-clone";

describe("deepClone", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns primitives as they are", () => {
    expect(deepClone(1)).toBe(1);
    expect(deepClone("a")).toBe("a");
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it("copies nested objects and arrays", () => {
    const input = { a: 1, list: [1, { b: 2 }], nested: { deep: { c: 3 } } };
    const copy = deepClone(input);
    expect(copy).toEqual(input);
    expect(copy).not.toBe(input);
    expect(copy.list).not.toBe(input.list);
    expect(copy.list[1]).not.toBe(input.list[1]);
    expect(copy.nested.deep).not.toBe(input.nested.deep);
  });

  it("clones Date, Map and Set", () => {
    const date = new Date("2026-01-01T00:00:00Z");
    const input = { date, map: new Map([["k", { v: 1 }]]), set: new Set([{ s: 1 }]) };
    const copy = deepClone(input);
    expect(copy.date).toBeInstanceOf(Date);
    expect(copy.date).not.toBe(date);
    expect(copy.date.getTime()).toBe(date.getTime());
    expect(copy.map).toBeInstanceOf(Map);
    expect(copy.map.get("k")).toEqual({ v: 1 });
    expect(copy.map.get("k")).not.toBe(input.map.get("k"));
    expect(copy.set).toBeInstanceOf(Set);
    expect([...copy.set][0]).toEqual({ s: 1 });
    expect([...copy.set][0]).not.toBe([...input.set][0]);
  });

  it("handles cycles", () => {
    const input: { name: string; self?: unknown } = { name: "loop" };
    input.self = input;
    const copy = deepClone(input);
    expect(copy).not.toBe(input);
    expect(copy.self).toBe(copy);
  });

  it("keeps shared references shared", () => {
    const shared = { x: 1 };
    const copy = deepClone({ p: shared, q: shared });
    expect(copy.p).toBe(copy.q);
    expect(copy.p).not.toBe(shared);
  });

  it("does not use structuredClone or JSON", () => {
    const structured = vi.spyOn(globalThis, "structuredClone");
    const parse = vi.spyOn(JSON, "parse");
    deepClone({ a: [1, 2] });
    expect(structured).not.toHaveBeenCalled();
    expect(parse).not.toHaveBeenCalled();
  });
});
