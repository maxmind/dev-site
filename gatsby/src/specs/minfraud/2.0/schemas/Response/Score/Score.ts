import { SchemaObject } from 'openapi3-ts';

const Score: SchemaObject = {
  properties: {
    disposition: {
      $ref: '#/components/schemas/Response.Score.Disposition',
    },
    funds_remaining: {
      description: 'The approximate US dollar value of the funds remaining on your MaxMind account.',
      example: 25.00,
      format: 'decimal',
      minimum: 0.01,
      type: 'number',
    },
    id: {
      description: 'This is the minFraud ID, a UUID that identifies the minFraud response. Use this ID to search your minFraud logs or when making support requests to MaxMind.',
      example: '5bc5d6c2-b2c8-40af-87f4-6d61af86b6ae',
      format: 'uuid',
      type: 'string',
    },
    ip_address: {
      $ref: '#/components/schemas/Response.Score.IpAddress',
    },
    queries_remaining: {
      description: 'The approximate number of queries remaining for the service before your account runs out of funds.',
      example: 5000,
      format: 'integer',
      type: 'number',
    },
    risk_score: {
      description: 'This field contains the risk score, from 0.01 to 99. A higher score indicates a higher risk of fraud. For example, a score of 20 indicates a 20% chance that a transaction is fraudulent. We never return a risk score of 0, since all transactions have the possibility of being fraudulent. Likewise we never return a risk score of 100.',
      example: 0.01,
      format: 'decimal',
      maximum: 99,
      minimum: 0.01,
      type: 'number',
    },
    warnings: {
      $ref: '#/components/schemas/Response.Score.Warnings',
      example: [
        {
          code: 'BILLING_CITY_NOT_FOUND',
          input_point: '/billing/city',
          warning: 'The billing city could not be found in our database.',
        },
        {
          code: 'BILLING_COUNTRY_NOT_FOUND',
          input_point: '/billing/country',
          warning: 'The billing country could not be found in our database.',
        },
        {
          code: 'BILLING_POSTAL_NOT_FOUND',
          input_point: '/billing/postal',
          warning: 'The billing postal could not be found in our database.',
        },
        {
          code: 'INPUT_INVALID',
          input_point: '/path/to/property',
          warning: 'The value associated with the key does not meet the required constraints.',
        },
        {
          code: 'INPUT_UNKNOWN',
          input_point: '/path/to/property',
          warning: 'An unknown key was encountered in the request body.',
        },
        {
          code: 'IP_ADDRESS_NOT_FOUND',
          input_point: '/device/ip_address',
          warning: 'The IP address could not be geolocated.',
        },
        {
          code: 'SHIPPING_CITY_NOT_FOUND',
          input_point: '/shipping/city',
          warning: 'The shipping city could not be found in our database.',
        },
        {
          code: 'SHIPPING_COUNTRY_NOT_FOUND',
          input_point: '/shipping/country',
          warning: 'The shipping country could not be found in our database.',
        },
        {
          code: 'SHIPPING_POSTAL_NOT_FOUND',
          input_point: '/shipping/postal',
          warning: 'The shipping postal could not be found in our database.',
        },
      ],
      type: 'array',
    },
  },
  type: 'object',
};

export default Score;
