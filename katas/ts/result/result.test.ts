import { describe, expect, expectTypeOf, it } from "vitest";
import { err, map, ok, tryCatch, unwrapOr, type Result } from "./result";

function parseAge(input: string): Result<number, string> {
  const age = Number(input);
  return Number.isInteger(age) && age >= 0 ? ok(age) : err(`not an age: ${input}`);
}

describe("Result", () => {
  it("narrows on ok", () => {
    const result = parseAge("42");
    if (result.ok) {
      expectTypeOf(result.value).toEqualTypeOf<number>();
      expect(result.value).toBe(42);
    } else {
      expectTypeOf(result.error).toEqualTypeOf<string>();
      throw new Error("expected ok");
    }
  });

  it("hides the value until the caller checks", () => {
    const result = parseAge("x");
    // @ts-expect-error: value is not readable before narrowing
    expect(result.value).toBeUndefined();
    expect(result.ok).toBe(false);
  });

  it("map transforms a value and passes an error through", () => {
    const doubled = map(parseAge("21"), (age) => age * 2);
    expectTypeOf(doubled).toEqualTypeOf<Result<number, string>>();
    expect(doubled).toEqual(ok(42));

    const label = map(parseAge("x"), (age) => `${age} years`);
    expectTypeOf(label).toEqualTypeOf<Result<string, string>>();
    expect(label).toEqual(err("not an age: x"));
  });

  it("unwrapOr gives the value or the fallback", () => {
    expect(unwrapOr(parseAge("7"), 0)).toBe(7);
    expect(unwrapOr(parseAge("x"), 0)).toBe(0);
  });

  it("tryCatch turns a throw into an error result", () => {
    const parsed = tryCatch(() => JSON.parse("{") as unknown);
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) expect(parsed.error).toBeInstanceOf(SyntaxError);
    expect(tryCatch(() => 1)).toEqual(ok(1));
  });
});
