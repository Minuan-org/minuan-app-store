import { spawnSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";

const files = [
  "app.js",
  "catalogue.js",
  "scripts/build.mjs",
  "tests/catalogue.test.mjs"
];

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }
}

const tests = spawnSync(
  process.execPath,
  ["--test", "tests/catalogue.test.mjs"],
  { encoding: "utf8", stdio: "inherit" }
);
if (tests.status !== 0) process.exit(tests.status || 1);

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
if (Object.keys(packageJson.dependencies || {}).length !== 0 ||
    Object.keys(packageJson.devDependencies || {}).length !== 0) {
  throw new Error("The App Store must not add third-party npm packages.");
}
await access("index.html");
await access("styles.css");
await access("public/favicon.svg");
console.log("Source checks passed. No third-party npm packages are installed.");
