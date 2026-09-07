import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

async function bookEvent(page, ticketCount) {
  const EMAIL = "hey123@yopmail.com";
  const PASSWORD = "Test@123";
  const PHONE = "9848374908";
  const FULL_NAME = "hey123";
  await page.goto("https://eventhub.rahulshettyacademy.com/login");

  // Login
  await page.getByPlaceholder("you@email.com").fill(EMAIL);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.locator("#login-btn").click();

  await page.waitForLoadState("networkidle");

  // Go to Home
  await page.getByTestId("nav-home").click();

  // Book event
  await page
    .getByRole("article")
    .filter({ hasText: "World Tech Summit" })
    .getByTestId("book-now-btn")
    .click();

  // Ticket count starts at 1
  const plusButton = page.getByRole("button", {
    name: "+",
    exact: true,
  });

  // Increase from 1 to required number
  for (let i = 1; i < ticketCount; i++) {
    await plusButton.click();
  }

  // Customer details
  await page.getByRole("textbox", { name: "Full Name*" }).fill(FULL_NAME);

  await page
    .getByRole("textbox", { name: "Email*" })
    .fill("hey123@yopmail.com");

  await page.getByRole("textbox", { name: "Phone Number*" }).fill(PHONE);

  // Confirm
  await page.getByRole("button", { name: "Confirm Booking" }).click();
}

test("1 ticket - Eligible for refund", async ({ page }) => {
  await bookEvent(page, 1);
  const refId = await page
    .locator(".booking-ref.font-mono.font-bold.text-indigo-600")
    .textContent();
  console.log(refId);
  await page.getByTestId("nav-bookings").click();

  const rows = page.locator(".space-y-4.mb-8 #booking-card");

  await expect(rows.first()).toBeVisible({
    timeout: 15000,
  });

  // Find the booking using ref ID
  let bookingFound = false;

  for (let i = 0; i < (await rows.count()); i++) {
    const rowsrefId = await rows.nth(i).locator(".booking-ref").textContent();
    if (rowsrefId?.trim() === refId.trim()) {
      bookingFound = true;
      await rows.nth(i).getByRole("button", { name: "View Details" }).click();
      break;
    }
  }

  expect(bookingFound).toBeTruthy();
  // await page.waitForLoadState("networkidle");

  const refundButton1 = page.getByTestId("check-refund-btn");

  await expect(refundButton1).toBeVisible({
    timeout: 15000,
  });
  await expect(refundButton1).toBeEnabled({
    timeout: 15000,
  });
  await refundButton1.click();

  const spinner1 = page.locator("#refund-spinner");
  await expect(spinner1).toBeHidden({
    timeout: 6000,
  });

  await expect(page.getByText("Eligible for refund. Single-")).toBeVisible();

  // await expect(spinner).toBeVisible();

  //   await expect(
  //     page.getByText("Eligible for refund.", { exact: true })
  //   ).toContainText("Single-ticket bookings qualify for a full refund");
  return refundButton1;
});

test("3 tickets - Not eligible for refund", async ({ page }) => {
  await bookEvent(page, 3);
  const refId = await page
    .locator(".booking-ref.font-mono.font-bold.text-indigo-600")
    .textContent();
  console.log(refId);
  await page.getByTestId("nav-bookings").click();

  const rows = page.locator(".space-y-4.mb-8 #booking-card");
  await expect(rows.first()).toBeVisible({ timeout: 10000 });

  for (let i = 0; i < (await rows.count()); i++) {
    const rowsrefId = await rows.nth(i).locator(".booking-ref").textContent();
    if (rowsrefId?.trim() === refId.trim()) {
      await rows.nth(i).getByRole("button", { name: "View Details" }).click();
      break;
    }
  }

  await page.waitForLoadState("networkidle");

  const refundButton3 = page.getByTestId("check-refund-btn");

  await expect(refundButton3).toBeVisible({
    timeout: 10000,
  });

  await refundButton3.click();

  const spinner3 = page.locator("#refund-spinner");

  await expect(spinner3).toBeHidden({
    timeout: 6000,
  });

  await expect(page.getByText("Not eligible for refund.")).toBeVisible();

  // await expect(
  //   page.getByText("Not eligible for refund.", { exact: true })
  // ).toContainText("Not eligible for refund");
  return refundButton3;
});
