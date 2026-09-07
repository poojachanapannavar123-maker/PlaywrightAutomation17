import { expect } from "@playwright/test";
import { customtest } from "../utils/Fixtures";

customtest(
  "Fixtures demo",
  async ({ authenticatedPage, createOrder, testDateForOrder }) => {
    // Login to application/create order and verify if the order is created
    // authenticatedPage, createOrder, testDateForOrder has to be executed before it will enter the block
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    await authenticatedPage.locator("[routerlink*= myorders]").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(
      authenticatedPage.getByText(createOrder.orderId)
    ).toBeVisible();
    console.log(testDateForOrder.productName);
  }
);
