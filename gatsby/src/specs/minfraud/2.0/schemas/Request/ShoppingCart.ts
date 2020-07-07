import { SchemaObject } from 'openapi3-ts';

const ShoppingCart: SchemaObject = {
  description: 'This is an array of shopping cart item objects. A shopping cart should consist of an array of one or more item objects.',
  example: [
    {
      category: 'pets',
      item_id: 'ad23232',
      price: 20.43,
      quantity: 2,
    },
    {
      category: 'beauty',
      item_id: 'bst112',
      price: 100,
      quantity: 1,
    },
  ],
  items: {
    $ref: '#/components/schemas/Request.ShoppingCartItem',
  },
  type: 'array',
};

export default ShoppingCart;
