// Page object patterns for UI automation

class LoginPage {
  constructor(page) {
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.signInButton = page.locator("[name='login']");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(userName, password) {
    await this.userEmail.fill(userName);
    await this.userPassword.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
