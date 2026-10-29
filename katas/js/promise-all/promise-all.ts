export function promiseAll<T extends readonly unknown[]>(
  values: T,
): Promise<{ -readonly [K in keyof T]: Awaited<T[K]> }> {
  throw new Error("Not implemented");
}
