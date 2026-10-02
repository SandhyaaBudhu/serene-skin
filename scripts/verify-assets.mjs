import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const base = (process.env.SERENE_TEST_URL ?? "http://127.0.0.1:5182/serene-skin").replace(/\/$/, "");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  const failed = [];
  page.on("response", response => {
    if (response.status() >= 400 && ["image", "font", "stylesheet", "script"].includes(response.request().resourceType())) {
      failed.push(response.url());
    }
  });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/shop", "/shop/daily-dew", "/ritual", "/story", "/journal", "/journal/meet-your-textures"]) {
      await page.goto(base + route);
      await page.locator("h1").waitFor();
      const assets = await page.evaluate(async () => {
        document.querySelectorAll("img").forEach(image => image.loading = "eager");
        await Promise.all(Array.from(document.images).map(image => image.decode().catch(() => {})));
        await document.fonts.ready;
        return {
          broken: Array.from(document.images).filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
          fallbacks: document.querySelectorAll(".image-fallback").length,
          fonts: ['400 16px "DM Sans"', '400 16px "DM Serif Display"'].every(font => document.fonts.check(font)),
        };
      });
      assert.deepEqual(assets.broken, [], `${route}: broken images`);
      assert.equal(assets.fallbacks, 0, `${route}: image fallback shown`);
      assert(assets.fonts, `${route}: missing fonts`);
      console.log(`PASS Images and fonts: ${width}px ${route}`);
    }
  }
  assert.deepEqual(failed, [], "Failed asset requests");
} finally {
  await browser.close();
}
