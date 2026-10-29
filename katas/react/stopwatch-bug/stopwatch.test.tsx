import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Stopwatch } from "./stopwatch";

const elapsed = () => screen.getByLabelText("Elapsed seconds");
const tick = (ms: number) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

describe("Stopwatch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts every second while running", () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    tick(3000);
    expect(elapsed()).toHaveTextContent("3");
  });

  it("stops counting when stopped, and continues from there", () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    tick(2000);
    fireEvent.click(screen.getByRole("button", { name: "Stop" }));
    tick(5000);
    expect(elapsed()).toHaveTextContent("2");
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    tick(1000);
    expect(elapsed()).toHaveTextContent("3");
  });

  it("resets to zero", () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    tick(2000);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(elapsed()).toHaveTextContent("0");
    tick(1000);
    expect(elapsed()).toHaveTextContent("1");
  });

  it("leaves no timer behind on unmount", () => {
    const { unmount } = render(<Stopwatch />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
