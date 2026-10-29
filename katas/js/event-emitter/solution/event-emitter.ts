export type Listener<Args extends unknown[]> = (...args: Args) => void;

interface Entry {
  call: (...args: unknown[]) => void;
  original: unknown;
}

export class EventEmitter<Events extends Record<string, unknown[]>> {
  #listeners = new Map<keyof Events, Entry[]>();

  on<E extends keyof Events>(event: E, listener: Listener<Events[E]>): () => void {
    return this.#add(event, listener, listener);
  }

  off<E extends keyof Events>(event: E, listener: Listener<Events[E]>): void {
    const entries = this.#listeners.get(event);
    if (!entries) return;
    const index = entries.findIndex((entry) => entry.original === listener);
    if (index !== -1) entries.splice(index, 1);
  }

  once<E extends keyof Events>(event: E, listener: Listener<Events[E]>): () => void {
    const wrapper: Listener<Events[E]> = (...args) => {
      this.off(event, listener);
      listener(...args);
    };
    return this.#add(event, wrapper, listener);
  }

  emit<E extends keyof Events>(event: E, ...args: Events[E]): boolean {
    const entries = this.#listeners.get(event);
    if (!entries || entries.length === 0) return false;
    // A copy, so listeners added or removed during this emit change the next emit, not this one.
    const snapshot = [...entries];
    for (const entry of snapshot) entry.call(...args);
    return true;
  }

  #add<E extends keyof Events>(
    event: E,
    call: Listener<Events[E]>,
    original: Listener<Events[E]>,
  ): () => void {
    const entries = this.#listeners.get(event) ?? [];
    entries.push({ call: call as unknown as (...args: unknown[]) => void, original });
    this.#listeners.set(event, entries);
    return () => {
      this.off(event, original);
    };
  }
}
