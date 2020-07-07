import { SchemaObject } from 'openapi3-ts';

const Order: SchemaObject = {
  properties: {
    affiliate_id: {
      description: 'The ID of the affiliate where the order is coming from.',
      example: 'af12',
      maxLength: 255,
      type: 'string',
    },
    amount: {
      description: 'The total order amount for the transaction before taxes and discounts.',
      example: 323.21,
      format: 'decimal',
      maxLength: 255,
      type: 'number',
    },
    currency: {
      description: 'The [ISO 4217 currency code] (http://en.wikipedia.org/wiki/ISO_4217) for the currency used in the transaction.',
      example: 'USD',
      maxLength: 3,
      type: 'string',
    },
    discount_code: {
      description: 'The discount code applied to the transaction. If multiple discount codes were used, please separate them with a comma.',
      example: 'FIRST',
      maxLength: 255,
      type: 'string',
    },
    has_gift_message: {
      description: 'Whether the purchaser included a gift message.',
      example: false,
      type: 'boolean',
    },
    is_gift: {
      description: 'Whether order was marked as a gift by the purchaser.',
      example: true,
      type: 'boolean',
    },
    referrer_uri: {
      description: 'The URI of the referring site for this order. Needs to be absolute and have a URI scheme such as `https://`.',
      example: 'http://www.google.com/',
      maxLength: 1024,
      type: 'string',
    },
    subaffiliate_id: {
      description: 'The ID of the sub-affiliate where the order is coming from.',
      example: 'saf42',
      maxLength: 255,
      type: 'string',
    },
  },
  type: 'object',
};

export default Order;
