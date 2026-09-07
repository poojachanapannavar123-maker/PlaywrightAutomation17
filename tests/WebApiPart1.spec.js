// import { expect, test, request } from "@playwright/test";
// const { ApiUtils } = require("./utils/ApiUtils");

// const loginPayload = {
//   userEmail: "hey123@yopmail.com",
//   userPassword: "Test@123",
// };

// const createOrderPlayload = {
//   orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
// };

// let token;
// let orderId;
// let response;

// test.beforeAll(async () => {
//   const apiContext = await request.newContext();
//   const apiUtilsObject = new ApiUtils(apiContext, loginPayload);
//   response = await apiUtilsObject.createOrder(createOrderPlayload);

//   // Login API
//   //   const loginResponse = await apiContext.post(
//   //     "https://rahulshettyacademy.com/api/ecom/auth/login",
//   //     {
//   //       data: loginPayload,
//   //     }
//   //   );
//   //   expect(loginResponse.ok()).toBeTruthy;
//   //   const loginResponseJson = await loginResponse.json();
//   //   token = loginResponseJson.token;
//   //   console.log(token);

//   // create-order API //verify created order can see
//   //   const createOrderResponse = await apiContext.post(
//   //     "https://rahulshettyacademy.com/api/ecom/order/create-order",
//   //     {
//   //       data: createOrderPlayload,
//   //       headers: {
//   //         Authorization: token,
//   //         "Content-type": "application/json",
//   //       },
//   //     }
//   //   );
//   //   const createOrderResponseJson = await createOrderResponse.json();
//   //   //orders[0] extracted from json editor from the network response

//   //   orderId = createOrderResponseJson.orders[0];
// });

// test("storing token in the application", async ({ page }) => {
//   page.addInitScript((value) => {
//     window.localStorage.setItem("token", value);
//   }, response.token);

//   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

//   //orders page
//   await page.locator("button[routerlink*= 'myorders']").click();
//   await page.locator("tbody").waitFor();
//   const rows = await page.locator("tbody tr");
//   for (let i = 0; i < (await rows.count()); i++) {
//     const rowOrderId = await rows.nth(i).locator("th").textContent();
//     if (response.orderId.includes(rowOrderId)) {
//       await rows.nth(i).locator("button").first().click();
//       break;
//     }
//   }
//   const orderDetailsPage = await page.locator(".col-text").textContent();
//   await page.pause();
//   expect(response.orderId.includes(orderDetailsPage)).toBeTruthy;
// });

import { test, expect, request } from "@playwright/test";
import { ApiUtils } from "../utils/ApiUtils";

const loginPayload = {
  userEmail: "hey123@yopmail.com",
  userPassword: "Test@123",
};

const createOrderPlayload = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiContextObject = new ApiUtils(apiContext, loginPayload);
  response = await apiContextObject.createOrder(createOrderPlayload);

  //login API
  //   const loginResponse = await apiContext.post(
  //     "https://rahulshettyacademy.com/api/ecom/auth/login",
  //     {
  //       data: loginPayload,
  //     }
  //   );
  //   console.log(expect(loginResponse.ok()).toBeTruthy());
  //   const loginResposeJson = await loginResponse.json();
  //   token = loginResposeJson.token;
  //   console.log(token);

  //   createdorder API
  //   const createdOrderresponse = await apiContext.post(
  //     "https://rahulshettyacademy.com/api/ecom/order/create-order",
  //     {
  //       data: createOrderPlayload,
  //       headers: { Authorization: token, "content-type": "application/json" },
  //     }
  //   );
  //   const createdorderJson = await createdOrderresponse.json();
  //   orderId = await createdorderJson.orders[0];
  //   console.log(orderId);
});

test("fetching the token before  we enter to the page", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("[routerlink*= myorders]").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderDetailsPage = await page.locator(".col-text.-main").textContent();
  await page.pause();
  expect(response.orderId.includes(orderDetailsPage)).toBeTruthy;
});
