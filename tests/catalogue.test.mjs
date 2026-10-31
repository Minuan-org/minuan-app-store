import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { filterStoreItems, getAvailableDownloads, storeItems } from "../catalogue.js";

test("catalogue contains four unique SimVerse projects", () => {
  assert.equal(storeItems.length, 4);
  assert.equal(new Set(storeItems.map((item) => item.id)).size, storeItems.length);
});

test("only the published Minuan package is shown as a download", () => {
  const downloads = getAvailableDownloads();
  assert.equal(downloads.length, 1);
  assert.equal(downloads[0].id, "minuan");
  assert.equal(
    downloads[0].downloadUrl,
    "https://github.com/Minuan-org/Minuan/releases/download/v1.0.1/Minuan-Windows-x64.zip"
  );
});

test("Sunay is listed as a library and not as an installable application", () => {
  const sunay = storeItems.find((item) => item.id === "sunay");
  assert.ok(sunay);
  assert.equal(sunay.category, "Developer tool");
  assert.equal(sunay.downloadUrl, undefined);
  assert.match(sunay.status, /no installer/i);
});

test("included features are not presented as separate downloads", () => {
  const included = filterStoreItems("", "Included");
  assert.deepEqual(included.map((item) => item.id).sort(), ["gateway", "html6"]);
  assert.ok(included.every((item) => !item.downloadUrl));
});

test("search is case-insensitive and checks project descriptions", () => {
  assert.deepEqual(filterStoreItems("SUNAY").map((item) => item.id), ["sunay"]);
  assert.deepEqual(filterStoreItems("approved-site").map((item) => item.id), ["minuan"]);
});

test("category and search filters are applied together", () => {
  assert.deepEqual(filterStoreItems("project", "Included").map((item) => item.id), ["gateway"]);
  assert.deepEqual(filterStoreItems("not-a-real-project"), []);
});

test("project links only point to the official Minuan GitHub organisation", () => {
  assert.ok(storeItems.every((item) =>
    item.projectUrl.startsWith("https://github.com/Minuan-org/")
  ));
});

test("the app source contains no React, Vite or Supabase imports", async () => {
  const source = await readFile("app.js", "utf8");
  assert.doesNotMatch(source, /from ["'](?:react|vite|@supabase\/)/);
});
