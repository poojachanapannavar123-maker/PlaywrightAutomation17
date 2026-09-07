import { expect, test } from "@playwright/test";

test("Browser context playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const email = "hey123@yopmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  const userEmail = page.getByPlaceholder("email@example.com");
  const userPassword = page.getByPlaceholder("enter your passsword");

  await userEmail.fill(email);
  await userPassword.fill("Test@123");

  await page.getByRole("button", { name: "Login" }).click();

  // once login is done has to ask based upon the websites that wait otherwise for the next fetch operation will get an empty array.
  await page.waitForLoadState("networkidle"); // here it will made all the network call are made after login and navigating to another page if it's flaky try the below one
  // we don't have anything for getBy methods for div so have to use locator
  await page.locator(".card-body b").first().waitFor(); // will wait until this page loads after login

  // const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);

  // fetch zara coat 3
  // const count = await products.count(); // first we need to see how many products are there
  // for (let i = 0; i < count; i++) {
  //   // chaining locator
  //   if ((await products.nth(i).locator("b").textContent()) === productName) {
  //     // add the product to the card with chaining locator
  //     await products.nth(i).locator("text= Add To Cart").click();
  //     break;
  //   }
  // }

  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  // await page.locator("[routerlink*='cart']").click();

  //here adding listitem parent becoz add to cart text os also there in the same page
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "  Cart " })
    .click();
  // to see the partcular product grid, here adding from div not li only it's taking all the other navbar and their li so
  // waitFor() added becoz autowait is not there for isVisible() so added waitFor() have to check which all are autowaiting assertions
  // added first() becoz with out it was loading all the li inside the div
  // await page.locator("div li").first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();
  // here added along with tag becoz it might think that the text from home/product page
  // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // expect(bool).toBeTruthy();

  // checkout
  // await page.locator("text=Checkout").click();
  await page.getByRole("button", { name: "Checkout" }).click();

  // type slowly letter by letter to show the suggestion so have to pressSequentially
  // await page
  //   .locator("[placeholder*= Country]")
  //   .pressSequentially("ind", { delay: 150 });
  // // select dropdown
  // const dropdown = page.locator(".ta-results");
  // await dropdown.waitFor();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  // const optionsCount = await dropdown.locator("button").count();
  // for (let i = 0; i < optionsCount; i++) {
  //   const text = await dropdown.locator("button").nth(i).textContent();
  //   if (text === " India") {
  //     //click the option
  //     await dropdown.locator("button").nth(i).click();
  //     break;
  //   }
  // }
  await page.getByRole("button", { name: "India" }).nth(1).click();

  // await expect(page.locator(".user__name label[type='text']")).toHaveText(
  //   email
  // );

  // await page.locator(".action__submit").click(); //Placeorder button
  // await expect(page.locator(".hero-primary")).toHaveText(
  //   " Thankyou for the order. "
  // );
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText(" Thankyou for the order.")).toBeVisible();

  //need to do from here

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
