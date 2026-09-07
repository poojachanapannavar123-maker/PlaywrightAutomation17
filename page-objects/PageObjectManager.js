// import { LoginPage } from "./LoginPage";
// import { DashboardPage } from "./DashboardPage";
// import { CartPage } from "./CartPage";
// import { OrdersReviewPage } from "./OrdersReviewPage";
// import { OrdersHistoryPage } from "./OrderHistoryPage";

const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");
const { OrdersHistoryPage } = require("./OrderHistoryPage");

class PageObjectManager {
  constructor(page) {
    this.page = page;
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

module.exports = { PageObjectManager };
