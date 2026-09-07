import { expect, test, request } from "@playwright/test";

const loginPayload = {
  email: "hermoine@yopmail.com",
  password: "Virat@123",
  authType: "PASSWORD",
  isSignIn: true,
};

let tokens;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://api.qa.zaxbys.com/v1/users/complete-auth?isSignIn=true",
    {
      data: loginPayload,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponsejson = await loginResponse.json();
  tokens = loginResponsejson.authenticationResult;
  //   console.log(accessToken);
});

test("Zaxbys project automation with playwright", async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ["geolocation"],
    geolocation: { latitude: 33.9519, longitude: -83.3576 },
  });

  const page = await context.newPage();
  await context.addInitScript((value) => {
    window.localStorage.setItem("tokens", JSON.stringify(value));
  }, tokens);
  await page.goto("https://qa.zaxbys.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  //   await page.waitForLoadState("networkidle");
  const cookieButton = page.getByRole("button", { name: "ACCEPT ALL COOKIES" });
  if (await cookieButton.isVisible().catch(() => false)) {
    await cookieButton.click();
  }
  await page.getByRole("button", { name: "PickUP" }).click({ timeout: 30000 });

  await page
    .getByPlaceholder("Near me")
    .pressSequentially("30606", { delay: 100 });

  const dropdown = page
    .locator(".pac-container")
    .filter({ visible: true })
    .locator(".pac-item")
    .first();

  await expect(dropdown).toBeVisible({ timeout: 15000 });

  await dropdown.click({ force: true });

  const locationCard = page
    .locator("[class*='locationCardTile']")
    .filter({ hasText: "1040 Founders Boulevard" });

  await locationCard.locator("button").filter({ hasText: "SELECT" }).click();
  await page.getByRole("button", { name: "IN STORE" }).click();
  const product = page
    .locator("div")
    .filter({ hasText: "Featured ItemsAsian Zensation" })
    .nth(2);
  await product.click();
  //   await page.pause();
  //   const chooseDrink = page
  //     .getByLabel("Choose Your Drink")
  //     .selectOption("SMALL");

  //   await chooseDrink.click();
  await page.getByRole("button", { name: "ADD" }).click();
  await page.locator(".yourOrder:visible").click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByRole("button", { name: "YES, CONTINUE" }).click();
  await page.getByRole("button", { name: "Pay with Visa Card" }).click();
});
