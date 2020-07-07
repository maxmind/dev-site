import { SchemaObject } from 'openapi3-ts';

const BillingAddress: SchemaObject = {
  description: 'This object contains minFraud response data associated with the billing address. If the billing address was not provided in the request or could not be parsed, this object will not be present in the response.',
  properties: {
    distance_to_ip_location: {
      description: 'The distance in kilometers from the address to the IP location.',
      example: 100,
      type: 'integer',
    },
    is_in_ip_country: {
      description: 'This field is true if the address is in the IP country. The field is false when the address is not in the IP country. If the IP address could not be geolocated, the field will not be included in the response.',
      example: true,
      type: 'boolean',
    },
    is_postal_in_city: {
      description: 'This field is true if the postal code provided with the address is in the city for the address. The field is false when the postal code is not in the city.',
      example: true,
      type: 'boolean',
    },
    latitude: {
      description: 'The approximate latitude associated with the address.',
      example: true,
      format: 'decimal',
      type: 'number',
    },
    longitude: {
      description: 'The approximate longitude associated with the address.',
      example: -122.421,
      format: 'decimal',
      type: 'number',
    },
  },
  type: 'object',
};

export default BillingAddress;
