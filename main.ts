import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This program copies the front-page image that sits next to it into the
// output folder, byte for byte, so the submitted entry is exactly the image
// in this repository. It does no drawing and needs no network.

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const targetPath = join(outDir, "entry.png");

const imageBytes = readFileSync(sourcePath);

if (imageBytes.length === 0) {
  throw new Error("entry.png is empty, refusing to write an empty output");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(targetPath, imageBytes);

// Sanity check: what landed on disk must be exactly what we read.
const written = readFileSync(targetPath);
if (!written.equals(imageBytes)) {
  throw new Error("output does not match the source image");
}

console.log(`Wrote ${imageBytes.length} bytes to ${targetPath}`);
