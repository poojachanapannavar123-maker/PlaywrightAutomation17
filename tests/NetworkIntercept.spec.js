// Playwright route method and it's parameters in intercepting

import { expect, test, request } from "@playwright/test";
const { ApiUtils } = require("../utils/ApiUtils");

const loginPayload = {
  userEmail: "hey123@yopmail.com",
  userPassword: "Test@123",
};

const createOrderPlayload = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

const fakePayloadOrder = {
  data: [],
  meesage: "No Orders",
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtilsObject = new ApiUtils(apiContext, loginPayload);
  response = await apiUtilsObject.createOrder(createOrderPlayload);
});

test("storing token in the application", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // interxwpting/altering the network
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a881e2221054ba465e6d8ff",
    // "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      // Intercepting the repsonse  - API resposnse -> {playwright fake response}browser->render data
      const response = await page.request.fetch(route.request());
      // sending to browser with fake response
      let body = JSON.stringify(fakePayloadOrder); //converting the javascript object into json object
      route.fulfill({
        //response modification will be done by fulfill() method
        response,
        body,
      });
    }
  );

  //orders page

  // without waitForResponse will get the error
  const respnsePromise = page.waitForResponse((response) => {
    return response
      .url()
      .includes(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a881e2221054ba465e6d8ff"
      );
  });
  await page.locator("button[routerlink*= 'myorders']").click();
  await respnsePromise;
  console.log(await page.locator(".mt-4").textContent());
  // await page.locator("tbody").waitFor();
  // const rows = await page.locator("tbody tr");
  // for (let i = 0; i < (await rows.count()); i++) {
  //   const rowOrderId = await rows.nth(i).locator("th").textContent();
  //   if (response.orderId.includes(rowOrderId)) {
  //     await rows.nth(i).locator("button").first().click();
  //     break;
  //   }
  // }
  // const orderDetailsPage = await page.locator(".col-text").textContent();
  // await page.pause();
  // expect(response.orderId.includes(orderDetailsPage)).toBeTruthy;
});
