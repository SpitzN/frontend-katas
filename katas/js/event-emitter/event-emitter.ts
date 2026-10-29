export type Listener<Args extends unknown[]> = (...args: Args) => void;

export class EventEmitter<Events extends Record<string, unknown[]>> {
  on<E extends keyof Events>(event: E, listener: Listener<Events[E]>): () => void {
    throw new Error("Not implemented");
  }

  off<E extends keyof Events>(event: E, listener: Listener<Events[E]>): void {
    throw new Error("Not implemented");
  }

  once<E extends keyof Events>(event: E, listener: Listener<Events[E]>): () => void {
    throw new Error("Not implemented");
  }

  emit<E extends keyof Events>(event: E, ...args: Events[E]): boolean {
    throw new Error("Not implemented");
  }
}
