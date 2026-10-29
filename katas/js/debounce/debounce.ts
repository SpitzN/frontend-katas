export interface Debounced<Args extends unknown[]> {
  (...args: Args): void;
  cancel(): void;
  flush(): void;
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): Debounced<Args> {
  throw new Error("Not implemented");
}
