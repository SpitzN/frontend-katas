export type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

export type MyOmit<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: T[P] };

export type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;

export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export type TupleToUnion<T extends readonly unknown[]> = T[number];
