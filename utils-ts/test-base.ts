//How to pass test data as fixture by extend test annotation behaviour

import { test as base } from "@playwright/test";
interface testDataForOrder {
  userName: string;
  password: string;
  productName: string;
}

export const customTest = base.extend<{ testDataForOrder: testDataForOrder }>({
  testDataForOrder: {
    userName: "hey123@yopmail.com",
    password: "Test@123",
    productName: "ZARA COAT 3",
  },
});
