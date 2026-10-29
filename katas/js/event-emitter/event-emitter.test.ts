import { describe, expect, it, vi } from "vitest";
import { EventEmitter } from "./event-emitter";

interface Events extends Record<string, unknown[]> {
  message: [text: string, from: string];
  close: [];
}

describe("EventEmitter", () => {
  it("calls listeners in subscription order with the emitted arguments", () => {
    const emitter = new EventEmitter<Events>();
    const calls: string[] = [];
    emitter.on("message", (text, from) => calls.push(`1:${text}:${from}`));
    emitter.on("message", (text) => calls.push(`2:${text}`));
    expect(emitter.emit("message", "hi", "ana")).toBe(true);
    expect(calls).toEqual(["1:hi:ana", "2:hi"]);
  });

  it("returns false when nobody listens", () => {
    expect(new EventEmitter<Events>().emit("close")).toBe(false);
  });

  it("unsubscribes through the returned function and through off", () => {
    const emitter = new EventEmitter<Events>();
    const first = vi.fn();
    const second = vi.fn();
    const unsubscribe = emitter.on("close", first);
    emitter.on("close", second);
    unsubscribe();
    emitter.off("close", second);
    expect(emitter.emit("close")).toBe(false);
    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
  });

  it("calls a once listener on the next emit only", () => {
    const emitter = new EventEmitter<Events>();
    const listener = vi.fn();
    emitter.once("close", listener);
    emitter.emit("close");
    emitter.emit("close");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("removes a once listener with off before it fires", () => {
    const emitter = new EventEmitter<Events>();
    const listener = vi.fn();
    emitter.once("close", listener);
    emitter.off("close", listener);
    emitter.emit("close");
    expect(listener).not.toHaveBeenCalled();
  });

  it("keeps an emit's listener list fixed while it runs", () => {
    const emitter = new EventEmitter<Events>();
    const late = vi.fn();
    const second = vi.fn();
    emitter.on("close", () => {
      emitter.on("close", late);
      emitter.off("close", second);
    });
    emitter.on("close", second);
    emitter.emit("close");
    expect(second).toHaveBeenCalledTimes(1);
    expect(late).not.toHaveBeenCalled();
    emitter.emit("close");
    expect(late).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });
});
