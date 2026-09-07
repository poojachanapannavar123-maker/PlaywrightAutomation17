//Login UI

import { expect, test } from "@playwright/test";
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("hey123@yopmail.com");
  await page.locator("#userPassword").fill("Test@123");
  await page.locator("[name='login']").click();
  await page.waitForLoadState("networkidle");

  //   once context/instance may have many tabs in a browser, each tab is called as page.
  //   state.json file will be created and this file has token
  await context.storageState({ path: "state.json" });
  //   invoke a browser by injecting the state.json file
  //here we created a new Context as like line no.7 but here on opening the browser it has all the existing data.
  webContext = await browser.newContext({ storageState: "state.json" }); // add this webcontext in the below test to create page
});

test("Browser context playwright test", async () => {
  const productName = "ZARA COAT 3";
  //   now page is not fixture and git rid of from the function
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  const products = page.locator(".card-body");

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  // fetch zara coat 3
  const count = await products.count(); // first we need to see how many products are there
  for (let i = 0; i < count; i++) {
    // chaining locator
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // add the product to the card with chaining locator
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  // to see the partcular product grid, here adding from div not li only it's taking all the other navbar and their li so
  // waitFor() added becoz autowait is not there for isVisible() so added waitFor() have to check which all are autowaiting assertions
  // added first() becoz with out it was loading all the li inside the div
  await page.locator("div li").first().waitFor();
  // here added along with tag becoz it might think that the text from home/product page
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  // checkout
  await page.locator("text=Checkout").click();

  // type slowly letter by letter to show the suggestion so have to pressSequentially
  await page
    .locator("[placeholder*= Country]")
    .pressSequentially("ind", { delay: 150 });
  // select dropdown
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      //click the option
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name label[type='text']")).toHaveText(
    "hey123@yopmail.com"
  );

  await page.locator(".action__submit").click(); //Placeorder button
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  //orders page
  await page.locator("button[routerlink*= 'myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderDetailsPage = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderDetailsPage)).toBeTruthy;

  await page.pause();
});
