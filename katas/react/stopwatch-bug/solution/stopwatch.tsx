import { useEffect, useState } from "react";

export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [running]);

  return (
    <div>
      <output aria-label="Elapsed seconds">{seconds}</output>
      <button type="button" onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"}
      </button>
      <button type="button" onClick={() => setSeconds(0)}>
        Reset
      </button>
    </div>
  );
}
