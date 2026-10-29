export interface Debounced<Args extends unknown[]> {
  (...args: Args): void;
  cancel(): void;
  flush(): void;
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): Debounced<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: Args | undefined;

  const invoke = () => {
    const args = pending;
    pending = undefined;
    timer = undefined;
    if (args) fn(...args);
  };

  const debounced = (...args: Args) => {
    pending = args;
    clearTimeout(timer);
    timer = setTimeout(invoke, wait);
  };
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
    pending = undefined;
  };
  debounced.flush = () => {
    if (timer === undefined) return;
    clearTimeout(timer);
    invoke();
  };
  return debounced;
}
