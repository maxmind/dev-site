import { SchemaObject } from 'openapi3-ts';

const CustomInput: SchemaObject = {
  oneOf: [
    {
      properties: {
        '[your custom key]': {
          type: 'boolean',
        },
      },
    },
    {
      properties: {
        '[your custom key]': {
          description: 'A floating point number between -10<sup>13</sup> and 10<sup>13</sup>',
          maximum: 10e13,
          minimum: -10e13,
          type: 'number',
        },
      },
    },
    {
      properties: {
        '[your custom key]': {
          description: 'A phone number, limited to 255 characters. Numbers, spaces and punctuation accepted, although spaces and punctuation will be stripped. The following ASCII characters constitute the accepted punctuation: ` ~ ! @ # $ % ^ & * ( ) – _ = + ‘ ” ; : , < . > / ? \\ | [ ] { and }.',
          format: 'phone',
          maxLength: 255,
          type: 'string',
        },
      },
    },
    {
      properties: {
        '[your custom key]': {
          description: 'A string, limited to 255 characters. The null character is not allowed.',
          maxLength: 255,
          type: 'string',
        },
      },
    },
  ],
  type: 'object',
};

export default CustomInput;
