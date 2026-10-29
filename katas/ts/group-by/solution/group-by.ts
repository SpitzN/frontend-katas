export function groupBy<T, K extends PropertyKey>(
  items: readonly T[],
  key: (item: T) => K,
): Partial<Record<K, T[]>> {
  const groups: Partial<Record<K, T[]>> = {};
  for (const item of items) {
    (groups[key(item)] ??= []).push(item);
  }
  return groups;
}
