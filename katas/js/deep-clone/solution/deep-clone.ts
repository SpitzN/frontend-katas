export function deepClone<T>(value: T): T {
  return cloneInto(value, new WeakMap()) as T;
}

function cloneInto(value: unknown, seen: WeakMap<object, unknown>): unknown {
  if (typeof value !== "object" || value === null) return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof Map) {
    const copy = new Map<unknown, unknown>();
    seen.set(value, copy);
    for (const [key, entry] of value) copy.set(cloneInto(key, seen), cloneInto(entry, seen));
    return copy;
  }
  if (value instanceof Set) {
    const copy = new Set<unknown>();
    seen.set(value, copy);
    for (const entry of value) copy.add(cloneInto(entry, seen));
    return copy;
  }
  if (Array.isArray(value)) {
    const copy: unknown[] = [];
    seen.set(value, copy);
    for (const entry of value) copy.push(cloneInto(entry, seen));
    return copy;
  }

  const copy: Record<string, unknown> = {};
  seen.set(value, copy);
  for (const [key, entry] of Object.entries(value)) copy[key] = cloneInto(entry, seen);
  return copy;
}
