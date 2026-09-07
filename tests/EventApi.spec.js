// assignment 1- section 14

import { test, expect, request } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const loginPayload = {
  email: "hey123@yopmail.com",
  password: "Test@123",
};

// Mock response with 6 events
const SIX_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 5,
      title: "Lollapalooza India",
      category: "Festival",
      eventDate: "2025-06-20T12:00:00.000Z",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 6,
      title: "AI & ML Expo",
      category: "Conference",
      eventDate: "2025-06-25T10:00:00.000Z",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: {
    page: 1,
    totalPages: 1,
    total: 6,
    limit: 12,
  },
};

// Mock response with 4 events
const FOUR_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: {
    page: 1,
    totalPages: 1,
    total: 4,
    limit: 12,
  },
};

let token;

//  in the response json the token name was token
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    { data: loginPayload }
  );
  const resposejson = await response.json();
  token = resposejson.token;
  console.log(token);
});

// helper function
async function loginAndGoToEvents(page) {
  page.addInitScript((value) => {
    window.localStorage.setItem("eventhub_token", value);
  }, token);
  await page.goto("https://eventhub.rahulshettyacademy.com/");
  await page.waitForLoadState("networkidle");
  await page.getByTestId("nav-events").click();
}

test("Banner text is visible when 6 events are returned", async ({ page }) => {
  await page.route("**/api/events**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(SIX_EVENTS_RESPONSE),
    });
  });
  await loginAndGoToEvents(page);
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards).toHaveCount(6);
  await expect(page.getByText("9 bookings")).toBeVisible();
});

test("Banner is not visible when 4 events are restored", async ({ page }) => {
  await page.route("**/api/events**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(FOUR_EVENTS_RESPONSE),
    });
  });
  await loginAndGoToEvents(page);
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards).toHaveCount(4);
  await expect(page.getByText("9 bookings")).not.toBeVisible();
});
