import { test, expect } from "@playwright/test";

test("Playwright special locators", async ({ page }) => {
  //if we are overriding entire test timeout,1min/60s here
  test.setTimeout(60000);
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //to override timeout
  const slowExpect = expect.configure({ timeout: 10000 });
  //   for selection like checkbox,dropdown and radio button can use getByLabel it works
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByLabel("Employed").check();

  //   when it comes to editing boxes or input boxes getByLabel is in-consistent and can't use
  await page.getByPlaceholder("Password").fill("Test@123");

  //   Button / action
  await page.getByRole("button", { name: "Submit" }).click();

  //   get me the text
  //here in this isVisible test will not fail it will just throw true or false
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  //here with the assertion toBevisible test will fail if it's false
  //5seconds/5000ms default for expect
  await expect(
    page.getByText("Success! The Form has been submitted successfully!.")
  ).toBeVisible();
  //if we want to override the default timeout
  await expect(
    page.getByText("Success! The Form has been submitted successfully!.")
  ).toBeVisible({ timeout: 10_000 });
  //   or with using globally declared variable slowExpct
  await slowExpect(
    page.getByText("Success! The Form has been submitted successfully!.")
  ).toBeVisible();

  await page.getByRole("link", { name: "Shop" }).click();

  await page
    .locator("app-card")
    .filter({ hasText: "iphone X" })
    .getByRole("button", { name: "Add " })
    .click();
});
