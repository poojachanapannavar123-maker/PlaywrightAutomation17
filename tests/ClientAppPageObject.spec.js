import { expect, test } from "@playwright/test";
// import { LoginPage } from "../page-objects/LoginPage";
// import { DashboardPage } from "../page-objects/DashboardPage";
// import { Checkout } from "../page-objects/Checkout";
import { PageObjectManager } from "../page-objects/PageObjectManager";
// import { CartPage } from "../page-objects/CartPage";
// import { OrdersReviewPage } from "../page-objects/OrdersReviewPage";
// import { OrdersHistoryPage } from "../page-objects/OrderHistoryPage";
import PlaceOrderTestData from "../utils/PlaceOrderTestData.json";
const testData = JSON.parse(JSON.stringify(PlaceOrderTestData));
// here json-> string[stringify]=>js object[parse]

import { customtest } from "../utils/test-base";

// Implementing Parameterization in running tests with different data sets
for (const data of testData) {
  test(`client App for ${data.productName}`, async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //   const userName = "hey123@yopmail.com";
    //   const password = "Test@123";
    //   const productName = "ZARA COAT 3";

    //   const loginPage = new LoginPage(page);
    //   await loginPage.goTo();
    //   await loginPage.validLogin(userName, password);

    //   const dashboardPage = new DashboardPage(page);
    //   await dashboardPage.searchProductAddCart(productName);
    //   await dashboardPage.navigateToCart();

    //   const cartPage = new CartPage(page);
    //   await cartPage.VerifyProductIsDisplayed(productName);
    //   await cartPage.Checkout();
    //   await cartPage.getProductLocator(productName);

    //   const orderReviewPage = new OrdersReviewPage(page);
    //   await orderReviewPage.searchCountryAndSelect(countryCode, countryName);
    //   await orderReviewPage.VerifyEmailId(userName);
    //   await orderReviewPage.SubmitAndGetOrderId();

    //   const orderHistoryPage = new OrdersHistoryPage(page);
    //   await orderHistoryPage.searchOrderAndSelect(orderId);
    //   await orderHistoryPage.getOrderId();

    // instead of creating the new object for every classed storing it in PageObjectManager class and accessing it here for every diff page classes

    const poManager = new PageObjectManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
    await cartPage.getProductLocator(data.productName);

    const ordeReviewPage = poManager.getOrderReviewPage();
    await ordeReviewPage.searchCountryAndSelect("ind", "India");
    await ordeReviewPage.VerifyEmailId(data.userName);
    const orderId = await ordeReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
  });
}

// How to pass test data as fixture by extend test annotation behaviour
customtest("client App", async ({ page, testDataForOrder }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const poManager = new PageObjectManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.userName,
    testDataForOrder.password
  );

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
  await cartPage.getProductLocator(testDataForOrder.productName);

  const ordeReviewPage = poManager.getOrderReviewPage();
  await ordeReviewPage.searchCountryAndSelect("ind", "India");
  await ordeReviewPage.VerifyEmailId(testDataForOrder.userName);
  const orderId = await ordeReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();

  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
