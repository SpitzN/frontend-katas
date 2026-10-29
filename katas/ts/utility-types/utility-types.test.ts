import { describe, expectTypeOf, it } from "vitest";
import type { DeepReadonly, MyAwaited, MyOmit, MyPick, TupleToUnion } from "./utility-types";

interface Todo {
  title: string;
  description: string;
  done: boolean;
  meta: { tags: string[]; author: { name: string } };
}

describe("utility types", () => {
  it("MyPick keeps the named properties", () => {
    expectTypeOf<MyPick<Todo, "title" | "done">>().toEqualTypeOf<{
      title: string;
      done: boolean;
    }>();
  });

  it("MyOmit drops the named properties", () => {
    expectTypeOf<MyOmit<Todo, "description" | "meta">>().toEqualTypeOf<{
      title: string;
      done: boolean;
    }>();
  });

  it("MyAwaited unwraps promises, nested ones too", () => {
    expectTypeOf<MyAwaited<Promise<string>>>().toEqualTypeOf<string>();
    expectTypeOf<MyAwaited<Promise<Promise<number>>>>().toEqualTypeOf<number>();
    expectTypeOf<MyAwaited<boolean>>().toEqualTypeOf<boolean>();
  });

  it("DeepReadonly reaches nested objects and arrays, and leaves functions alone", () => {
    type Input = { meta: Todo["meta"]; onSave: (todo: Todo) => void };
    expectTypeOf<DeepReadonly<Input>>().toEqualTypeOf<{
      readonly meta: {
        readonly tags: readonly string[];
        readonly author: { readonly name: string };
      };
      readonly onSave: (todo: Todo) => void;
    }>();
  });

  it("TupleToUnion gives the union of the elements", () => {
    const sizes = ["sm", "md", "lg"] as const;
    expectTypeOf<TupleToUnion<typeof sizes>>().toEqualTypeOf<"sm" | "md" | "lg">();
  });
});
