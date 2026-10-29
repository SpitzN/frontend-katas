// Proves every reference solution passes its kata's tests.
// Builds .verify/ as a copy of the repo where each kata's solution/ files replace its starters,
// then runs the typecheck and the tests there. The starters themselves are meant to fail.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, ".verify");

rmSync(out, { recursive: true, force: true });
cpSync(join(root, "katas"), join(out, "katas"), { recursive: true });
for (const file of ["tsconfig.json", "vitest.config.ts", "vitest.setup.ts"]) {
  cpSync(join(root, file), join(out, file));
}

let katas = 0;
function promoteSolutions(dir) {
  const solution = join(dir, "solution");
  if (existsSync(solution)) {
    katas += 1;
    for (const name of readdirSync(solution)) {
      if (name.endsWith(".md")) continue;
      cpSync(join(solution, name), join(dir, name));
    }
    rmSync(solution, { recursive: true });
    return;
  }
  for (const name of readdirSync(dir)) {
    const child = join(dir, name);
    if (statSync(child).isDirectory()) promoteSolutions(child);
  }
}
promoteSolutions(join(out, "katas"));
console.log(`verify: ${katas} katas, solutions in place of starters`);

const run = (args) => execFileSync("pnpm", ["exec", ...args], { cwd: out, stdio: "inherit" });
run(["tsc", "-p", "tsconfig.json"]);
run(["vitest", "run"]);
console.log("verify: every solution passes");
