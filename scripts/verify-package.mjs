import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const packageJson = JSON.parse(await readFile(resolve(projectRoot, "package.json"), "utf8"));

const expectedFiles = [
  packageJson.main,
  packageJson.module,
  packageJson.types,
  packageJson.exports["./styles.css"],
  packageJson.exports["./tailwind-preset"],
];

for (const relativePath of expectedFiles) {
  await access(resolve(projectRoot, relativePath));
}

console.log(`Verified ${expectedFiles.length} package artifacts.`);
