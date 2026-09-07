const { Given, When, Then } = require("@cucumber/cucumber");
// const { PageObjectManager } = require("../../page-objects/PageObjectManager");
const { expect } = require("@playwright/test");
// const playwright = require("@playwright/test");

Given(
  "a login to Ecommerce application with some {string} and {string}",
  { timeout: 100 * 1000 },
  async function (userName, password) {
    // const browser = await playwright.chromium.launch({ headless: false });
    // const context = await browser.newContext();
    // const page = await context.newPage();

    // // to add the life in other blocks of page and poManager have to add this.
    // // const poManager = new PageObjectManager(page);
    // this.poManager = new PageObjectManager(page);

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    // now we are not driving the data through json file we are driving through feature file and passed in the function.
    await loginPage.validLogin(userName, password);
  }
);

When("Add {string} product to the Cart", async function (productName) {
  // here poManager has no life becoz the object created in the above with the argument passing page , to get the life here have to retrieve with this.
  //   using dashboardPage in other below block so adding this.
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
  await cartPage.getProductLocator(productName);
});

When("Enter valid details and place the Order", async function () {
  const ordeReviewPage = this.poManager.getOrderReviewPage();
  await ordeReviewPage.searchCountryAndSelect("ind", "India");
  //   await ordeReviewPage.VerifyEmailId(userName);
  this.orderId = await ordeReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order is present in the order history", async function () {
  await this.dashboardPage.navigateToOrders();

  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(this.orderId);
  expect(
    this.orderId.includes(await orderHistoryPage.getOrderId())
  ).toBeTruthy();
});

Given(
  "a login to Ecommerce2 application with some {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    const userName = this.page.locator('[name="username"]');
    const signInBtn = this.page.locator("#signInBtn");

    await userName.fill(username);
    await this.page.locator("#password").fill(password);
    await signInBtn.click();
  }
);

Then("Verify error message is displayed", async function () {
  console.log(await this.page.locator('[style*="block"]').textContent());
  await expect(this.page.locator('[style*="block"]')).toContainText(
    "Incorrect"
  );
});
