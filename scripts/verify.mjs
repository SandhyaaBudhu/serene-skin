import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

await mkdir(".qa", { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const base = (process.env.SERENE_TEST_URL ?? "http://localhost:5173").replace(/\/$/, "");
const basePath = new URL(base).pathname.replace(/\/$/, "");
const go = async (route) => {
  await page.goto(base + route);
  await page.locator("h1").waitFor();
};
const count = async (expected) =>
  await expect(page.locator(".shop-section .product-card")).toHaveCount(
    expected,
  );
const overflow = async () =>
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    `Horizontal overflow: ${page.url()}`,
  );

await go("/");
await page.evaluate(async () => {
  document.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
  await Promise.all(
    Array.from(document.images).map((img) => img.decode().catch(() => {})),
  );
  await document.fonts.ready;
});
await page.screenshot({ path: ".qa/home-desktop.png", fullPage: true });
await overflow();
await go("/shop");
await count(4);
await page.getByRole("button", { name: "Serum", exact: true }).click();
await count(1);
await page.getByRole("button", { name: "All essentials", exact: true }).click();
await count(4);
await page.getByRole("textbox", { name: "Search products" }).fill("oat");
await count(2);
await page.getByRole("textbox", { name: "Search products" }).fill("missing");
await count(0);
assert.equal(await page.getByText("A little too specific?").isVisible(), true);
await page.getByRole("button", { name: "See all essentials" }).click();
await count(4);
await page
  .getByRole("combobox", { name: "Sort products" })
  .selectOption("high");
await expect(page.locator(".product-card h3").first()).toHaveText("Moon Rest");
await page.getByRole("button", { name: "Save Daily Dew to wishlist" }).click();
await page.reload();
assert.equal(
  await page
    .getByRole("button", { name: "Remove Daily Dew from wishlist" })
    .count(),
  1,
);
await page
  .locator(".product-card")
  .filter({ hasText: "Daily Dew" })
  .getByRole("button", { name: "Quick view" })
  .click();
assert.equal(await page.getByRole("dialog").isVisible(), true);
await page.keyboard.press("Escape");
assert.equal(await page.getByRole("dialog").count(), 0);

await go("/shop/daily-dew");
await page.getByRole("button", { name: "10 ml" }).click();
await page
  .getByRole("button", { name: "Increase quantity", exact: true })
  .click();
await page.getByRole("button", { name: "Add to bag — $28" }).click();
await page
  .getByRole("button", { name: "Open bag, 2 items", exact: true })
  .click();
assert.equal(
  await page.getByRole("dialog").getByText("10 ml · $14").isVisible(),
  true,
);
await page
  .getByRole("dialog")
  .getByRole("button", { name: "Increase quantity", exact: true })
  .click();
await expect(page.getByRole("heading", { name: "Your bag (3)" })).toBeVisible();
await page.keyboard.press("Escape");
await page.reload();
assert.equal(
  await page
    .getByRole("button", { name: "Open bag, 3 items", exact: true })
    .isVisible(),
  true,
);

await go("/ritual");
await page.getByLabel("The full slow-down").check();
await page.getByRole("button", { name: "A little further" }).click();
await page.getByLabel("Rich & comforting").check();
await page.getByRole("button", { name: "A little further" }).click();
await page.getByLabel("An evening exhale").check();
await page.getByRole("button", { name: "Meet your ritual" }).click();
await expect(page.locator(".result-product")).toHaveCount(4);
await page.screenshot({ path: ".qa/ritual-desktop.png", fullPage: true });
await page.getByRole("button", { name: "Add my ritual to bag" }).click();
await expect(page.getByRole("heading", { name: "Your bag (7)" })).toBeVisible();
await page.getByRole("button", { name: "Continue to checkout" }).click();
await page.keyboard.press("Tab");
assert.equal(await page.evaluate(() => document.querySelector('[role="dialog"]').contains(document.activeElement)), true);
await page.getByRole("button", { name: "Confirm demonstration order" }).click();
assert.equal(
  await page.getByRole("heading", { name: "Complete your ritual" }).isVisible(),
  true,
);
await page
  .getByLabel("Your name", { exact: true })
  .pressSequentially("Alex Taylor");
assert.equal(
  await page.getByLabel("Your name", { exact: true }).inputValue(),
  "Alex Taylor",
);
await page
  .getByRole("dialog")
  .getByLabel("Email address", { exact: true })
  .fill("alex@example.com");
await page
  .getByLabel("Delivery address", { exact: true })
  .fill("12 Garden Lane");
await page.getByLabel("City", { exact: true }).fill("Cape Town");
await page.getByLabel("Postal code", { exact: true }).fill("8001");
await page.getByRole("button", { name: "Confirm demonstration order" }).click();
await expect(
  page.getByRole("heading", { name: "Thank you, Alex." }),
).toBeVisible();
await page.screenshot({ path: ".qa/checkout-confirmation.png" });
await page.getByRole("button", { name: "Keep exploring" }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Open bag, 0 items", exact: true })
    .isVisible(),
  true,
);

await page.getByRole("button", { name: "Switch to dark mode" }).click();
await page.reload();
assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
await go("/");
await page.screenshot({ path: ".qa/home-dark.png", fullPage: true });
await page.getByRole("button", { name: "Switch to light mode" }).click();

for (const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of [
    "/",
    "/shop",
    "/shop/soft-start",
    "/shop/moon-rest",
    "/ritual",
    "/story",
    "/journal",
    "/journal/less-but-better",
    "/journal/a-softer-evening",
    "/journal/meet-your-textures",
  ]) {
    await go(route);
    await overflow();
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await go("/");
await page.screenshot({ path: ".qa/home-mobile.png", fullPage: true });
await page.getByRole("button", { name: "Open navigation" }).click();
await page
  .locator(".mobile-nav")
  .getByRole("link", { name: "Build your ritual" })
  .click();
assert.equal(new URL(page.url()).pathname, basePath + "/ritual");
await page.screenshot({ path: ".qa/ritual-mobile.png", fullPage: true });
await go("/journal");
await page.getByRole("button", { name: "Skin notes", exact: true }).click();
await expect(page.locator(".journal-editorial-grid .journal-card")).toHaveCount(
  1,
);
await page.locator(".journal-editorial-grid .journal-card").click();
assert.equal(new URL(page.url()).pathname, basePath + "/journal/meet-your-textures");
assert.deepEqual(errors, [], "Unexpected browser errors");
console.log(
  "PASS: shopping, wishlist persistence, product options, bag quantities, ritual builder, validated checkout, theme persistence, navigation, journal filters, and 40 responsive route checks. No browser errors.",
);
await browser.close();
