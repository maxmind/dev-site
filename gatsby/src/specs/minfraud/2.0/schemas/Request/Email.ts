import { SchemaObject } from 'openapi3-ts';

const Email: SchemaObject = {
  properties: {
    address: {
      description: 'This field must be either be a valid email address or an MD5 of the email used in the transaction.',
      example: '977577b140bfb7c516e4746204fbdb01',
      maxLength: 255,
      type: 'string',
    },
    domain: {
      description: 'The domain of the email address used in the transaction.',
      example: 'maxmind.com',
      maxLength: 255,
      type: 'string',
    },
  },
  type: 'object',
};

export default Email;
