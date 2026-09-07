import { test, expect } from "@playwright/test";

test("Event creation", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  //   await page.getByRole("textbox", { name: "Email" }).fill("hey123@yopmail.com");
  await page.getByPlaceholder("you@email.com").fill("hey123@yopmail.com");
  //   await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
  await page.getByLabel("Password").fill("Test@123");

  //   await page.getByRole("button", { name: "Sign in" }).click();
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Admin" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Manage Events" })
    .click();
  await page
    .getByRole("textbox", { name: "Title*" })
    .fill("Confernce on Playwright");
  await page.getByLabel("Category*").selectOption("Conference");
  await page.getByRole("textbox", { name: "City*" }).fill("Banglore");
  await page
    .getByRole("textbox", { name: "Venue*" })
    .fill("st.102 Rajajinagar,Banglore");
  const eventDate = page.getByRole("textbox", {
    name: "Event Date & Time*",
  });

  await eventDate.fill("2026-08-30T16:02");

  await eventDate.press("Escape");
  await page.getByRole("spinbutton", { name: "Price ($)*" }).fill("500");
  await page.getByRole("spinbutton", { name: "Total Seats*" }).fill("50");
  await page.getByRole("button", { name: "+ Add Event" }).click();
  await page.getByTestId("nav-home").click();
  await page
    .getByRole("article")
    .filter({ hasText: "ConferenceConfernce on" })
    .getByTestId("book-now-btn")
    .click();
  await page.getByRole("textbox", { name: "Full Name*" }).fill("hey123");
  await page
    .getByRole("textbox", { name: "Email*" })
    .fill("hey123@yopmail.com");
  await page.getByRole("textbox", { name: "Phone Number*" }).fill("9848374908");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await page.getByRole("button", { name: "View My Bookings" }).click();
});

test("booking 1 ticket eligible for refund", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  //   await page.getByRole("textbox", { name: "Email" }).fill("hey123@yopmail.com");
  await page.getByPlaceholder("you@email.com").fill("hey123@yopmail.com");
  //   await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
  await page.getByLabel("Password").fill("Test@123");

  //   await page.getByRole("button", { name: "Sign in" }).click();
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Admin" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Manage Events" })
    .click();
  await page
    .getByRole("textbox", { name: "Title*" })
    .fill("Confernce on Playwright");
  await page.getByLabel("Category*").selectOption("Conference");
  await page.getByRole("textbox", { name: "City*" }).fill("Banglore");
  await page
    .getByRole("textbox", { name: "Venue*" })
    .fill("st.102 Rajajinagar,Banglore");
  const eventDate = page.getByRole("textbox", {
    name: "Event Date & Time*",
  });

  await eventDate.fill("2026-08-30T16:02");

  await eventDate.press("Escape");
  await page.getByRole("spinbutton", { name: "Price ($)*" }).fill("500");
  await page.getByRole("spinbutton", { name: "Total Seats*" }).fill("50");
  await page.getByRole("button", { name: "+ Add Event" }).click();
  await page.getByTestId("nav-home").click();
  await page
    .getByRole("article")
    .filter({ hasText: "ConferenceConfernce on" })
    .getByTestId("book-now-btn")
    .click();
  await expect(page.getByText("1", { exact: true })).toBeVisible();
  await page.getByRole("textbox", { name: "Full Name*" }).fill("hey123");
  await page
    .getByRole("textbox", { name: "Email*" })
    .fill("hey123@yopmail.com");
  await page.getByRole("textbox", { name: "Phone Number*" }).fill("9848374908");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(
    page.getByText("Eligible for refund", { exact: true })
  ).toBeVisible();
});

test("booking 3 tickets not eligible for refund", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  //   await page.getByRole("textbox", { name: "Email" }).fill("hey123@yopmail.com");
  await page.getByPlaceholder("you@email.com").fill("hey123@yopmail.com");
  //   await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
  await page.getByLabel("Password").fill("Test@123");

  //   await page.getByRole("button", { name: "Sign in" }).click();
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Admin" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Manage Events" })
    .click();
  await page
    .getByRole("textbox", { name: "Title*" })
    .fill("Confernce on Playwright");
  await page.getByLabel("Category*").selectOption("Conference");
  await page.getByRole("textbox", { name: "City*" }).fill("Banglore");
  await page
    .getByRole("textbox", { name: "Venue*" })
    .fill("st.102 Rajajinagar,Banglore");
  const eventDate = page.getByRole("textbox", {
    name: "Event Date & Time*",
  });

  await eventDate.fill("2026-08-30T16:02");

  await eventDate.press("Escape");
  await page.getByRole("spinbutton", { name: "Price ($)*" }).fill("500");
  await page.getByRole("spinbutton", { name: "Total Seats*" }).fill("50");
  await page.getByRole("button", { name: "+ Add Event" }).click();
  await page.getByTestId("nav-home").click();
  await page
    .getByRole("article")
    .filter({ hasText: "ConferenceConfernce on" })
    .getByTestId("book-now-btn")
    .click();

  const plusButton = page.getByRole("button", {
    name: "+",
    exact: true,
  });
  for (let i = 1; i < 3; i++) {
    await plusButton.click();
  }
  await expect(page.getByText("3", { exact: true })).toBeVisible();
  await page.getByRole("textbox", { name: "Full Name*" }).fill("hey123");
  await page
    .getByRole("textbox", { name: "Email*" })
    .fill("hey123@yopmail.com");
  await page.getByRole("textbox", { name: "Phone Number*" }).fill("9848374908");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await page.getByRole("button", { name: "View My Bookings" }).click();

  await expect(
    page.getByText("Not eligible for refund", { exact: true })
  ).toBeVisible();
});
