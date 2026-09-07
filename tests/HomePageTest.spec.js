const { test, expect } = require("@playwright/test");

// with browser fixture
test("BrowserContext", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://qa.zaxbys.com/");
});

//  with page fixture
// becoz of on adding only infront of test this test will only run.
test("Home Page", async ({ page }) => {
  await page.goto("https://qa.zaxbys.com/", {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });

  const pageTitle = await page.title();
  console.log({ pageTitle });

  await expect(page).toHaveTitle(
    "Famous Chicken Fingerz, Wings, Zalads & Sauces | Zaxbys"
  );

  const pageURL = await page.url();
  console.log({ pageURL });
  await expect(page).toHaveURL("https://qa.zaxbys.com/");

  await page.close();
});
