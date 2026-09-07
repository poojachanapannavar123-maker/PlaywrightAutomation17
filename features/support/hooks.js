const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");
const { PageObjectManager } = require("../../page-objects/PageObjectManager");
const playwright = require("@playwright/test");

// cucumber hooks implementations
Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();

  // to add the life in other blocks of page and poManager have to add this.
  // const poManager = new PageObjectManager(page);
  this.poManager = new PageObjectManager(this.page);
});

BeforeStep(function () {});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});

After(function () {
  console.log("Exit");
});
