// to run tsc demo1.ts

let message: string = "heyyyy";

let data: number = 20;

let isActive: boolean = false;

let message12 = "hey welcome";

let numbers: number[] = [1, 2, 3];

// here if we given any means can assign anything after this one but not with the cases they are following strict types
let dataset: any = "heyyyyy byeeeee";
dataset = 20;

function add(a: number, b: number): number {
  return a + b;
}

add(3, 4);

let user: { name: string; age: number } = { name: "bob", age: 34 };

import { expect, type Page, type Locator } from "@playwright/test";
class CartPage {
  page: Page;
  cartProducts: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;
  checkout: Locator;
  constructor(page: any) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
  }

  async VerifyProductIsDisplayed(productName) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}
module.exports = { CartPage };
