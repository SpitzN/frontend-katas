export function promiseAll<T extends readonly unknown[]>(
  values: T,
): Promise<{ -readonly [K in keyof T]: Awaited<T[K]> }> {
  return new Promise((resolve, reject) => {
    const results: unknown[] = new Array(values.length);
    let remaining = values.length;
    const done = () => {
      resolve(results as { -readonly [K in keyof T]: Awaited<T[K]> });
    };
    if (remaining === 0) {
      done();
      return;
    }
    values.forEach((value, index) => {
      Promise.resolve(value).then((result) => {
        results[index] = result;
        remaining -= 1;
        if (remaining === 0) done();
      }, reject);
    });
  });
}
