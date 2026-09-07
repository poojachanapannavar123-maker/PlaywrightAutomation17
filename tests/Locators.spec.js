// const { test, expect } = require("@playwright/test");

import { test, expect } from "@playwright/test";

test("Locator", async ({ page }) => {
  await page.goto("https://qa.zaxbys.com/");

  //   click on login button - property

  await page.click(".sc-fSLNDe.htymeT");

  //   to fill the login field with css method
  //   await page.fill("#username");
  //   await page.fill(".sc-lbpDNm.kRxKFx.textfieldSpacing", "hermoine@yopmail.com"); //added class insted of css
  await page.fill('input[name="username"]', "hermoine@yopmail.com");

  //   Login button
  //   await page.click(
  //     ".sc-bdDsCe.sc-gtcBCx.deauNl.efzUQq.button-wrapper.button-wrapper"
  //   );
  await page.getByRole("button", { name: "Log in" }).click();

  //   verify logout link
  //   const logoutLink = await page.locator(".sc-fSLNDe.htymeT");
  //   await expect(logoutLink).toBeVisible();
  //   await page.close();
});
