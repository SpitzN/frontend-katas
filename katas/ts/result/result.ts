export type Result<T, E> = unknown;

export function ok(value: unknown): unknown {
  throw new Error("Not implemented");
}

export function err(error: unknown): unknown {
  throw new Error("Not implemented");
}

export function map(result: unknown, fn: unknown): unknown {
  throw new Error("Not implemented");
}

export function unwrapOr(result: unknown, fallback: unknown): unknown {
  throw new Error("Not implemented");
}

export function tryCatch(fn: unknown): unknown {
  throw new Error("Not implemented");
}
