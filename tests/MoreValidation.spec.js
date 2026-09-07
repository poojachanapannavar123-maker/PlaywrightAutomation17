import { test, expect } from "@playwright/test";

test("Pop up validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://www.google.com/");
  //   await page.goBack();
  //   await page.goForward();
  //when the we can see the content on clicking chevron or button
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.pause();

  //"on" method will hepls listen for events and emit when the event occured
  //   when we click the confirm on the DOm and open the dialogue box
  //   when we don't have the locators available and the alert pop up coming from js
  // if have to click "ok"
  page.on("dialog", (dialog) => dialog.accept());
  //   if have to click "cancel"
  //   page.on("dialog", (dialog) => dialog.dismiss());

  // before not yet clicked the confirm button just that in the above written the code for pop up when you see just handle that alert
  await page.locator("#confirmbtn").click();

  //   hover on the element
  await page.locator("#mousehover").hover();

  const iframePage = page.frameLocator("#courses-iframe");
  //   have to use iframePage instead of page
  //   tell playwright to fetch which is in visible mode if there are two elemetnts matching
  await iframePage.getByRole("link", { name: "NEW All Access plan" }).click();
  const textCheck = await iframePage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});

test("screenshot and visual comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  // on page level taking the screenshot
  await page.screenshot({ path: "screenshot.png" });
  // if wanted to take a screenshot on element level or on that particulat space
  // await page.locator("#displayed-text").screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.pause();
});

// here first it take the screen shot => store it => and then compared with the stored one and expected one on one more run
// on the first execution it will fail becuase it's capturing and storing
// on the second run it will pass

// toMatchSnapshot is the method to use for visual testing to compare each and every UI elememts and even slight difference in the timings here also matters
test("visual testing", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/");
  expect(await page.screenshot()).toMatchSnapshot("landing1.png");
});
