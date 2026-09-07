// class ApiUtils {
//   // Constructor
//   //   when we create an object for the class APIUtils the constructor will execute by default , so we have created an object in the wbAPIpart1 test and passed the paraeter apiContext there and in the constructor also cached the same parameter in ()
//   constructor(apiContext, loginPayload) {
//     //assigning to the local class apiContext object = the parameter we are receiving
//     //this refers to the current class
//     this.apiContext = apiContext;
//     this.loginPayload = loginPayload;
//   }

//   //getToken method
//   async getToken() {
//     const loginResponse = await this.apiContext.post(
//       "https://rahulshettyacademy.com/api/ecom/auth/login",
//       {
//         data: this.loginPayload,
//       }
//     );
//     // expect(loginResponse.ok()).toBeTruthy;
//     const loginResponseJson = await loginResponse.json();
//     let token = loginResponseJson.token;
//     console.log(token);
//     return token;
//   }

//   //   create order
//   async createOrder(createOrderPlayload) {
//     let response = {};
//     response.token = await this.getToken();
//     const createOrderResponse = await this.apiContext.post(
//       "https://rahulshettyacademy.com/api/ecom/order/create-order",
//       {
//         data: createOrderPlayload,
//         headers: {
//           //  " Authorization": this.getToken(),
//           Authorization: response.token,
//           "Content-type": "application/json",
//         },
//       }
//     );
//     const createOrderResponseJson = await createOrderResponse.json();
//     //orders[0] extracted from json editor from the network response

//     const orderId = createOrderResponseJson.orders[0];
//     response.orderId = orderId;
//     return response; //holds orderId and token
//   }
// }

// module.exports = { ApiUtils };

class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    // console.log(expect(loginResponse.ok()).toBeTruthy());
    const loginResposeJson = await loginResponse.json();
    let token = loginResposeJson.token;
    console.log(token);
    return token;
  }

  async createOrder(createOrderPlayload) {
    let response = {};
    response.token = await this.getToken();
    const createdOrderresponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createOrderPlayload,
        headers: {
          Authorization: response.token,
          "content-type": "application/json",
        },
      }
    );
    const createdorderJson = await createdOrderresponse.json();
    const orderId = createdorderJson.orders[0];
    response.orderId = orderId;
    console.log(response.orderId);
    return response;
  }
}

module.exports = { ApiUtils };
