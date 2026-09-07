import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { OrdersHistoryPage } from "./OrderHistoryPage";

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  orderReviewPage: OrdersReviewPage;
  orderHistoryPage: OrdersHistoryPage;

  constructor(page: Page) {
    this.page = page;
    // here class object is going inside the loginPage so type will be classname
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderReviewPage = new OrdersReviewPage(this.page);
    this.orderHistoryPage = new OrdersHistoryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrderReviewPage() {
    return this.orderReviewPage;
  }

  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
}
