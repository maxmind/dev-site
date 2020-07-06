import { SchemaObject } from 'openapi3-ts';

const ShoppingCartItem: SchemaObject = {
  properties: {
    category: {
      description: 'The category of the item.',
      maxLength: 255,
      type: 'string',
    },
    item_id: {
      description: 'Your internal ID for the item.',
      maxLength: 255,
      type: 'string',
    },
    price: {
      description: 'The per-unit price of this item in the shopping cart. This should use the same currency as the order currency.',
      format: 'decimal',
      type: 'number',
    },
    quantity: {
      description: 'The quantity of the item in the shopping cart.',
      type: 'integer',
    },
  },
  type: 'object',
};

export default ShoppingCartItem;
