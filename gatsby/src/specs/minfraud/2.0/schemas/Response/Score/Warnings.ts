import { SchemaObject } from 'openapi3-ts';

const Warnings: SchemaObject = {
  description: 'Array of warnings.',
  items: {
    properties: {
      code: {
        description: 'This value is a machine-readable code identifying the warning.',
        type: 'string',
      },
      input_pointer: {
        description: 'A JSON Pointer to the input field that the warning is associated with. For instance, if the warning was about the billing city, this would be `/billing/city`. If it was for the price in the second shopping cart item, it would be `/shopping_cart/1/price`.',
        type: 'string',
      },
      warning: {
        description: 'This field provides a human-readable explanation of the warning. The description may change at any time and should not be matched against.',
        type: 'string',
      },
    },
    type: 'object',
  },
  type: 'array',
};

export default Warnings;
