// Page object patterns for UI automation
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;
  userEmail: Locator;
  userPassword: Locator;
  signInButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.signInButton = page.locator("[name='login']");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(userName: string, password: string) {
    await this.userEmail.fill(userName);
    await this.userPassword.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
