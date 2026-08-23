import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import console from "node:console";
import process from "node:process";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const outputDirectory = join(root, "dist");

function fail(message) {
  throw new Error(`Release artifact validation failed: ${message}`);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

if (!existsSync(outputDirectory)) {
  fail("dist is missing; run npm run build first");
}

const requiredFiles = ["index.html", "_headers", "favicon.svg", "robots.txt"];
for (const file of requiredFiles) {
  if (!existsSync(join(outputDirectory, file))) fail(`${file} is missing`);
}

const files = walk(outputDirectory);
const relativeFiles = files.map((file) =>
  relative(outputDirectory, file).replaceAll("\\", "/"),
);

const forbiddenArtifacts = relativeFiles.filter(
  (file) =>
    file.endsWith(".map") ||
    file === "_redirects" ||
    file === "_worker.js" ||
    file.startsWith("functions/"),
);
if (forbiddenArtifacts.length > 0) {
  fail(`unexpected deployable files: ${forbiddenArtifacts.join(", ")}`);
}

const html = readFileSync(join(outputDirectory, "index.html"), "utf8");
const htmlRequirements = [
  '<html lang="it">',
  "<title>Netto — dalla RAL al netto</title>",
  'name="description"',
  'rel="icon"',
];
for (const requirement of htmlRequirements) {
  if (!html.includes(requirement)) fail(`index.html lacks ${requirement}`);
}

const localReferences = [
  ...html.matchAll(/(?:href|src)="\/(?!\/)([^"#?]+)"/g),
].map(([, path]) => path);
for (const path of localReferences) {
  if (!existsSync(join(outputDirectory, path))) {
    fail(`index.html references missing local asset /${path}`);
  }
}

const headers = readFileSync(join(outputDirectory, "_headers"), "utf8");
const headerRequirements = [
  "Content-Security-Policy:",
  "default-src 'self'",
  "frame-ancestors 'none'",
  "Permissions-Policy:",
  "Referrer-Policy:",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
];
for (const requirement of headerRequirements) {
  if (!headers.includes(requirement)) fail(`_headers lacks ${requirement}`);
}

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  "",
]);
const forbiddenPublicText = [
  "http://localhost",
  "http://127.0.0.1",
  "file://",
  "C:\\Users\\",
  "/Users/",
];
for (const file of files) {
  if (!textExtensions.has(extname(file)) && !file.endsWith("_headers"))
    continue;
  const contents = readFileSync(file, "utf8");
  for (const forbidden of forbiddenPublicText) {
    if (contents.includes(forbidden)) {
      fail(`${relative(outputDirectory, file)} contains ${forbidden}`);
    }
  }
}

const bundles = files
  .filter((file) => [".css", ".js"].includes(extname(file)))
  .map((file) => {
    const contents = readFileSync(file);
    return {
      file: relative(outputDirectory, file).replaceAll("\\", "/"),
      rawBytes: statSync(file).size,
      gzipBytes: gzipSync(contents).byteLength,
    };
  });

console.log(
  JSON.stringify(
    {
      files: relativeFiles,
      bundles,
      sourceMaps: 0,
      functions: 0,
      redirects: 0,
    },
    null,
    2,
  ),
);
