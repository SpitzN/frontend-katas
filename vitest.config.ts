import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["katas/**/*.test.{ts,tsx}"],
    // Type-level assertions (expectTypeOf, @ts-expect-error) in the same test files fail the kata too.
    typecheck: {
      enabled: true,
      include: ["katas/**/*.test.{ts,tsx}"],
      tsconfig: "./tsconfig.json",
    },
  },
});
