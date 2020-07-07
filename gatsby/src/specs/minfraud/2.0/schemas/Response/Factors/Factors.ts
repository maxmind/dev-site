import { SchemaObject } from 'openapi3-ts';

const Factors: SchemaObject = {
  allOf: [
    {
      $ref: '#/components/schemas/Response.Score',
    },
    {
      properties: {
        billing_address: {
          $ref: '#/components/schemas/Response.Factors.BillingAddress',
        },
        device: {
          $ref: '#/components/schemas/Response.Factors.Device',
        },
        email: {
          $ref: '#/components/schemas/Response.Factors.Email',
        },
        ip_address: {
          $ref: '#/components/schemas/Response.Factors.IpAddress',
        },
        shipping_address: {
          $ref: '#/components/schemas/Response.Factors.ShippingAddress',
        },
      },
      type: 'object',
    },
  ],
};

export default Factors;
