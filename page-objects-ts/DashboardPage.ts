import { Page, Locator } from "@playwright/test";
export class DashboardPage {
  page: Page;
  products: Locator;
  productText: Locator;
  cart: Locator;
  orders: Locator;
  constructor(page: Page) {
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*= 'myorders']");
  }

  async searchProductAddCart(productName: string) {
    const titles = await this.productText
      .locator(".card-body b")
      .allTextContents();
    console.log(titles);

    // fetch zara coat 3
    const count = await this.products.count(); // first we need to see how many products are there
    for (let i = 0; i < count; i++) {
      // chaining locator
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        // add the product to the card with chaining locator
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }

  async navigateToOrders() {
    await this.orders.click();
  }
}
