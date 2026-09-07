//How to pass test data as fixture by extend test annotation behaviour

import base from "@playwright/test";

exports.customtest = base.test.extend({
  testDataForOrder: {
    userName: "hey123@yopmail.com",
    password: "Test@123",
    productName: "ZARA COAT 3",
  },
});
