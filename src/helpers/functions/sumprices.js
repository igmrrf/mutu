import { config } from "winston";

/* eslint-disable no-restricted-syntax */
export const SumPrices = (orders) => {
  let paid = 0;
  let total = 0;

  for (const item of orders) {
    if (item.paid) paid += item.price.value;
    total += item.price.value;
  }
  return { paid, total };
};

export const CalculatePrice = (product, payload) => {
  const { product_data } = payload;
  const givenSize = product.sizes.find((prod) => prod.value === product_data.weight);
  const productPrice = givenSize.price;
  const orderPrice = productPrice.value * payload.quantity;
  const price = {
    currency: productPrice.currency,
    value: orderPrice,
  };
  return price;
};

export const Paystack = (request) => {
  const secretKey = `Bearer ${config.get("paystack.paystackSK")}`;
  const baseUrl = config.get("paystack.paystackBaseUrl");
  const initializePayment = (form, mycallback) => {
    const options = {
      url: `${baseUrl}/transaction/initialize`,
      headers: {
        authorization: secretKey,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      form,
    };
    const callback = (error, response, body) => mycallback(error, body);

    request.post(options, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url: `${baseUrl}/transaction/verify/${encodeURIComponent(ref)}`,
      headers: {
        authorization: secretKey,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };
    const callback = (error, response, body) => mycallback(error, body);

    request(options, callback);
  };
  return { initializePayment, verifyPayment };
};
