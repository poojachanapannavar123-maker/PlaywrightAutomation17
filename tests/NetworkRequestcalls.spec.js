// Intercept network request calls with playright
// security testing scenario
// request modification

import test from "@playwright/test";

test("security test request intercept", async ({ page }) => {
  // login and orders page

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const email = "hey123@yopmail.com";
  //   const productName = "ZARA COAT 3";
  //   const products = page.locator(".card-body");

  const userEmail = page.locator("#userEmail");
  const userPassword = page.locator("#userPassword");

  await userEmail.fill(email);
  await userPassword.fill("Test@123");

  await page.locator("[name='login']").click();

  // once login is done has to ask based upon the websites that wait otherwise for the next fetch operation will get an empty array.
  await page.waitForLoadState("networkidle");

  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*= 'myorders']").click();

  //   make to ready that watch out for the below api
  //   IMP
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    // here we are telling don't take the above url and continue with the below url
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b4053f6765465b6",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
});
