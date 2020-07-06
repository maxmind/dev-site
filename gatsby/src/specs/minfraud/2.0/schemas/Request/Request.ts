import { SchemaObject } from 'openapi3-ts';

const Request: SchemaObject = {
  properties: {
    account: {
      $ref: '#/components/schemas/Request.Account',
    },
    billing: {
      $ref: '#/components/schemas/Request.Address',
    },
    credit_card: {
      $ref: '#/components/schemas/Request.CreditCard',
    },
    custom_inputs: {
      $ref: '#/components/schemas/Request.CustomInputs',
    },
    device: {
      $ref: '#/components/schemas/Request.Device',
    },
    email: {
      $ref: '#/components/schemas/Request.Email',
    },
    event: {
      $ref: '#/components/schemas/Request.Event',
    },
    order: {
      $ref: '#/components/schemas/Request.Order',
    },
    payment: {
      $ref: '#/components/schemas/Request.Payment',
    },
    shipping: {
      $ref: '#/components/schemas/Request.Shipping',
    },
    shopping_cart: {
      $ref: '#/components/schemas/Request.ShoppingCart',
    },
  },
  required: [
    'device',
  ],
  type: 'object',
};

export default Request;
