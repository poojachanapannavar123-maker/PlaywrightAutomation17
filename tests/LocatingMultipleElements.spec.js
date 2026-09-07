import { test, expect } from "@playwright/test";

test("LocateMultipleElements", async ({ page }) => {
  await page.goto("https://qa.zaxbys.com/");

  //   const links = await page.$$("a");

  //   for (const link of links) {
  //     const linktext = await link.textContent();
  //     console.log(linktext);
  //   }

  //   const categories = await page.$$(".categoryItemGrid");
  //   await page.waitForSelector('[data-testid="categoryName"]');
  const categories = await page.$$('[data-testid="categoryName"]');

  for (const category of categories) {
    const categoryName = await category.textContent();
    console.log(categoryName);
  }
});
