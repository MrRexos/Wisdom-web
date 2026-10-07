import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Tooling dependencies can be supplied through NODE_PATH; no runtime dependency.
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const sharp = require("sharp");
const root = fileURLToPath(new URL("../../", import.meta.url));
const output = path.join(root, "output/playwright/how-it-works");
const publicOutput = path.join(root, "public/images/how-it-works");
const baseUrl = process.env.WISDOM_SCREENSHOT_URL || "http://127.0.0.1:5186";
const steps = [
  "search",
  "choose",
  "reserve",
  "relax",
  "publish",
  "manage",
  "deliver",
  "earn",
];
await mkdir(output, { recursive: true });
await mkdir(publicOutput, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
    colorScheme: "light",
    locale: "en-US",
  });
  const page = await context.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(message.text());
  });
  const results = [];
  for (const step of steps) {
    await page.goto(`${baseUrl}/tools/how-it-works/index.html?screen=${step}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.decode()));
    });
    const screen = page.locator(`[data-screen="${step}"]`);
    const size = await screen.boundingBox();
    if (size.width !== 375 || size.height !== 812)
      throw new Error(`Unexpected ${step} viewport: ${JSON.stringify(size)}`);
    const png = await screen.screenshot({ animations: "disabled" });
    await writeFile(path.join(output, `${step}.png`), png);
    // Lossless encoding keeps text, colors and subtle light-theme edges intact.
    const result = await sharp(png)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(publicOutput, `${step}.png`));
    results.push({
      step,
      width: result.width,
      height: result.height,
      bytes: result.size,
    });
  }
  if (failures.length) throw new Error(failures.join("\n"));
  await context.close();
  const overview = await browser.newPage({
    viewport: { width: 1632, height: 1780 },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  await overview.goto(`${baseUrl}/tools/how-it-works/index.html`, {
    waitUntil: "networkidle",
  });
  await overview.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode()));
  });
  await overview.screenshot({
    path: path.join(output, "overview.png"),
    fullPage: true,
  });
  await writeFile(
    path.join(output, "export-results.json"),
    JSON.stringify(results, null, 2) + "\n",
    "utf8",
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
