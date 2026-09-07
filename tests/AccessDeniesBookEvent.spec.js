// // Assignment 2 - section 14

// import { test, expect, request } from "@playwright/test";

// const BASE_URL = "https://eventhub.rahulshettyacademy.com";

// const loginPayload = { email: "hey123@yahoo.com", password: "Test@123" };

// const bookingPayload = {
//   customerName: "hey",
//   customerEmail: "hey123@yahoo.com",
//   customerPhone: "7878787909",
//   quantity: 1,
//   eventId: 3,
// };

// const GMAIL_USER = {
//   email: "hey123@gmail.com",
//   password: "Test@123",
// };
// let token, eventId, yahooBookingId;

// test.beforeAll(async () => {
//   const apiContext = await request.newContext();
//   //   login
//   const loginresponse = await apiContext.post(
//     "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
//     {
//       data: loginPayload,
//     }
//   );
//   expect(loginresponse.ok()).toBeTruthy();
//   const responsejson = await loginresponse.json();
//   token = responsejson.token;

//   //   fetch eventId with get method
//   const eventResponse = await apiContext.get(
//     "https://api.eventhub.rahulshettyacademy.com/api/events?limit=6",
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//         "content-type": "application/json",
//       },
//     }
//   );
//   expect(eventResponse.ok()).toBeTruthy();
//   const eventResponsejson = await eventResponse.json();
//   eventId = eventResponsejson.data[0].id;
//   console.log(eventId);

//   //   created event
//   const bookingResponse = await apiContext.post(
//     "https://api.eventhub.rahulshettyacademy.com/api/bookings/",
//     {
//       data: bookingPayload,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "content-type": "application/json",
//       },
//     }
//   );
//   expect(bookingResponse.ok()).toBeTruthy();
//   const bookingResponsejson = await bookingResponse.json();
//   yahooBookingId = bookingResponsejson.data.id;
//   console.log(yahooBookingId);
// });

// async function loginAs(page, user) {
//   await page.goto(`${BASE_URL}/login`);
//   await page.getByPlaceholder("you@email.com").fill(user.email);
//   await page.getByLabel("Password").fill(user.password);

//   await page.locator("#login-btn").click();

//   await page.waitForLoadState("networkidle");
// }

// test("API", async ({ page }) => {
// From line no, 80 to 84 should not be there becoz we are login to diff account
//   //   page.addInitScript(
//   //     (value) => window.localStorage.setItem("eventhub_token", value),
//   //     token
//   //   );
//   //   await page.goto(BASE_URL);

//   await loginAs(page, GMAIL_USER);

//   await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
//     waitUntil: "networkidle",
//   });

//   await expect(
//     page.getByText("You are not authorized to view this booking")
//   ).toBeVisible();
// });

// Assignment 3 - seection 14
import { eventstest } from "../utils/Fixtures";
import { expect } from "@playwright/test";

eventstest(
  "Build a Two-Fixture Test — Login Fixture + Event Creation Fixture",
  async ({ authenticatedPage, createEvent }) => {
    await authenticatedPage.getByTestId("nav-events").click();

    await expect(
      authenticatedPage.getByText(createEvent.title).first()
    ).toBeVisible();
  }
);
