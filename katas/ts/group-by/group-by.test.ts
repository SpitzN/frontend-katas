import { describe, expect, expectTypeOf, it } from "vitest";
import { groupBy } from "./group-by";

interface Person {
  name: string;
  team: "red" | "blue";
  age: number;
}

const people: Person[] = [
  { name: "Ana", team: "red", age: 31 },
  { name: "Ben", team: "blue", age: 25 },
  { name: "Cy", team: "red", age: 40 },
];

describe("groupBy", () => {
  it("groups by the returned key, keeping input order", () => {
    expect(groupBy(people, (person) => person.team)).toEqual({
      red: [people[0], people[2]],
      blue: [people[1]],
    });
  });

  it("returns an empty object for no items", () => {
    expect(groupBy([] as Person[], (person) => person.team)).toEqual({});
  });

  it("works with computed keys", () => {
    const byDecade = groupBy(people, (person) => Math.floor(person.age / 10) * 10);
    expect(Object.keys(byDecade).sort()).toEqual(["20", "30", "40"]);
  });

  it("types the key function's argument and the result", () => {
    const byTeam = groupBy(people, (person) => {
      expectTypeOf(person).toEqualTypeOf<Person>();
      return person.team;
    });
    expectTypeOf(byTeam).toEqualTypeOf<Partial<Record<"red" | "blue", Person[]>>>();
    expectTypeOf(byTeam.red).toEqualTypeOf<Person[] | undefined>();
  });
});
