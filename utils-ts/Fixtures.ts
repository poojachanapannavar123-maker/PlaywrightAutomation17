// const { base, request } = require("@playwright/test");

import { Page, test as base, request, APIResponse } from "@playwright/test";
import { ApiUtils } from "../utils-ts/ApiUtils";

type LoginPayload = {
  userEmail: string;
  userPassword: string;
};

type createOrderPlayload = {
  orders: {
    country: string;
    productOrderedId: string;
  }[];
};

const loginPayload: LoginPayload = {
  userEmail: "hey123@yopmail.com",
  userPassword: "Test@123",
};

const createOrderPlayload = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

const API_URL = "https://api.eventhub.rahulshettyacademy.com";

type EventData = {
  id: number;
  title: string;
  description: string;
  category: string;
  venue: string;
  city: string;
  eventDate: string;
  price: string;
  totalSeats: number;
  availableSeats: number;
  imageUrl: string;
  isStatic: boolean;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
};
// exports.customtest = base.test.extend({
export const customtest = base.extend<{
  authenticatedPage: Page;
  createOrder: { token: string; orderId: string };
  testDateForOrder: { productName: string };
}>({
  // UI context custom fixture
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("hey123@yopmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("[name='login']").click();
    await page.waitForLoadState("networkidle");
    await use(page);
    // tear down [ use will be gate between set up and tear down]
    // all the fixtures assigned in the spec.js will be execute first
    // here when it sees the use it will hold the rest of things[below of use line code] in that block
    await context.close();
  },
  //   API custom fixture
  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiContextObject = new ApiUtils(apiContext, loginPayload);
    // response = await apiContextObject.createOrder(createOrderPlayload);
    const response = await apiContextObject.createOrder(createOrderPlayload);
    await use(response);
    // tear down all the thread will be closed
    await apiContext.dispose();
  },
  //   Data driven custom fixture
  testDateForOrder: {
    productName: "ZARA COAT 3",
  },
});

export const eventstest = base.extend<{
  authenticatedPage: Page;
  createEvent: EventData;
}>({
  authenticatedPage: async ({ browser }, use: any) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("hey123@yopmail.com");
    await page.getByLabel("Password").fill("Test@123");

    await page.locator("#login-btn").click();

    await page.waitForLoadState("networkidle");

    await use(page);
    await context.close();
  },

  createEvent: async ({}, use) => {
    // login
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(`${API_URL}/api/auth/login`, {
      data: { email: "hey123@yopmail.com", password: "Test@123" },
    });
    const loginJson = await loginResponse.json();
    let token = loginJson.token;
    // create event
    const eventResponse = await apiContext.post(`${API_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: 3,
        title: "Dilli Diwali Mela",
        description:
          "Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.",
        category: "Festival",
        venue: "Pragati Maidan Exhibition Grounds",
        city: "Delhi",
        eventDate: "2026-10-20T17:00:00.000Z",
        price: "300",
        totalSeats: 10000,
        availableSeats: 8,
        imageUrl:
          "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
        isStatic: true,
        userId: null,
        createdAt: "2026-02-22T23:03:37.680Z",
        updatedAt: "2026-05-29T05:44:25.067Z",
      },
    });
    const eventJson = await eventResponse.json();
    await use(eventJson.data);
    await apiContext.dispose();
  },
});
