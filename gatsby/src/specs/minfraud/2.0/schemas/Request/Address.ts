import { SchemaObject } from 'openapi3-ts';

const Address: SchemaObject = {
  properties: {
    address: {
      description: 'The first line of the user’s billing address.',
      example: '400 Blake St.',
      maxLength: 255,
      type: 'string',
    },
    address_2: {
      description: 'The second line of the user’s billing address.',
      example: 'Suite 5',
      maxLength: 255,
      type: 'string',
    },
    city: {
      description: 'The city of the user’s billing address.',
      example: 'New Haven',
      maxLength: 255,
      type: 'string',
    },
    company: {
      description: 'The company of the end user as provided in their billing information.',
      example: 'Big Corp.',
      maxLength: 255,
      type: 'string',
    },
    country: {
      description: 'The two character [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the user’s billing address.',
      example: 'US',
      maxLength: 2,
      type: 'string',
    },
    first_name: {
      description: 'The first name of the end user as provided in their billing information.',
      example: 'John',
      maxLength: 255,
      type: 'string',
    },
    last_name: {
      description: 'The last name of the end user as provided in their billing information.',
      example: 'Doe',
      maxLength: 255,
      type: 'string',
    },
    phone_country_code: {
      description: 'The country code for phone number associated with the user’s billing address.',
      example: '1',
      maxLength: 3,
      type: 'string',
    },
    phone_number: {
      description: 'The phone number without the country code for the user’s billing address.',
      example: '203-000-0000',
      maxLength: 255,
      type: 'string',
    },
    postal: {
      description: 'The postal code of the user’s billing address.',
      example: '06515',
      maxLength: 255,
      type: 'string',
    },
    region: {
      description: 'The [ISO 3166-2 subdivision code](http://en.wikipedia.org/wiki/ISO_3166-2) for the user’s billing address.',
      example: 'CT',
      maxLength: 4,
      type: 'string',
    },
  },
  type: 'object',
};

export default Address;
