import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url)).replace(/[\\/]scripts$/, "");
const output = join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js", "catalogue.js"]) {
  await cp(join(root, file), join(output, file));
}
await cp(join(root, "public", "favicon.svg"), join(output, "favicon.svg"));

console.log("SimVerse App Store built in dist/.");
