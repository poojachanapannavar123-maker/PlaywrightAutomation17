import { expect, test } from "@playwright/test";

test("Browser context playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // To abort the servers, css, images
  // For Css
  // await page.route("**/*.css", (route) => route.abort());
  // For images
  // await page.route("**/*.{jpeg,png}", (route) => route.abort());

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  const userName = page.locator('[name="username"]');
  const signInBtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  // request and response activation
  // await page.on("request", (request) => request.url());
  // await page.on("response", (response) => {
  //   response.status(), response.url();
  // });

  //  from css adding locator to enter into the edit boxes can use type and fill, for the latest have to use fill.
  await userName.fill("hermoine@yopmail.com");
  await page.locator("#password").fill("Learning@830$3mK2");
  await signInBtn.click();

  //   when we are getting the error and what the diplay value shows on the inspect that should add as value, if in the value space we have [display:none] then we should add ["style*=block"]
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toContainText("Incorrect");

  //   wipes of the existing contect n login
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signInBtn.click();

  //   for first product
  console.log(await cardTitles.first().textContent());
  //   console.log(await page.locator(".card-body a").nth(0).textContent());

  //   for second element
  console.log(await cardTitles.nth(1).textContent());

  //   for all the cardTitles
  console.log(await cardTitles.allTextContents());
});

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator('[name="username"]');
  const signInBtn = page.locator("#signInBtn");
  const documentLink = page.locator('[href*="documents"]');

  //   select dropdown
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  //   radio buttons
  await page.locator(".radiotextsty").last().check();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  //   assertion

  //   checkbox

  await page.locator('[name="terms"]').check();
  await expect(page.locator('[name="terms"]')).toBeChecked();
  //if it's already checked and to want to uncheck
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //   to see link/content is blinking or not
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  await page.pause();
});

test("child windows handeling", async ({ browser }) => {
  // have to write from browser when we are opening new page
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator('[href*="documents"]');
  const userName = page.locator('[name="username"]');
  //   before cliking have to create new context for new page to open // we are not adding await becoz these two run parellely and add promiseAll
  // we are adding in as array at 76th line becoz it's taking two promises clicking and opening the new page through event, in the array fulfilled promises are in index
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //listen for any new page to open and "page" is the value , promise pending, promise rejected , promise fulfilled
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  //   if we want the particular text from that fetched sentence from the new page
  const arrayText = text.split("@");
  const fetchedEmail = arrayText[1].split(" ")[0];
  console.log(fetchedEmail);
  await page.locator("#username").fill(fetchedEmail);
  //   we are adding the fetchedEmail from newpage to main page
  //   console.log(await page.userName.fill(fetchedEmail).inputValue());
  await page.pause();
});
