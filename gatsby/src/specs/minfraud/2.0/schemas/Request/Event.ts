import { SchemaObject } from 'openapi3-ts';

const Event: SchemaObject = {
  description: 'This object contains general information related to the event being scored.',
  properties: {
    shop_id: {
      description: 'Your internal ID for the shop, affiliate, or merchant this order is coming from. Required for minFraud users who are resellers, payment providers, gateways and affiliate networks.',
      example: 's2123',
      maxLength: 255,
      type: 'string',
    },
    time: {
      description: 'The date and time the event occurred. The string must be in the [RFC 3339](https://tools.ietf.org/html/rfc3339) date-time format, e.g., “2012-04-12T23:20:50.52Z”. If this field is not in the request, the current time will be used.',
      example: '2012-04-12T23:20:50.52Z',
      type: 'string',
    },
    transaction_id: {
      description: 'Your internal ID for the transaction. We can use this to locate a specific transaction in our logs, and it will also show up in email alerts and notifications from us to you.',
      example: 'txn3134133',
      maxLength: 255,
      type: 'string',
    },
    type: {
      description: 'The type of event being scored.',
      enum: [
        'account_creation',
        'account_login',
        'email_change',
        'password_reset',
        'purchase',
        'recurring_purchase',
        'referral',
        'survey',
      ],
      example: 'purchase',
      type: 'string',
    },
  },
  type: 'object',
};

export default Event;
