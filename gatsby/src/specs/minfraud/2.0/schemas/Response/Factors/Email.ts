import { SchemaObject } from 'openapi3-ts';

const Email: SchemaObject =  {
  description: 'This object contains minFraud response data associated with the shipping address. If the shipping address was not provided in the request or could not be parsed, this object will not be present in the response.',
  properties: {
    distance_to_billing_address: {
      description: 'The distance in kilometers from the shipping address to billing address.',
      example: null,
      type: 'integer',
    },
    distance_to_ip_location: {
      description: 'The distance in kilometers from the address to the IP location.',
      example: null,
      type: 'integer',
    },
    is_high_risk: {
      description: 'This field is true if the shipping address is an address associated with fraudulent transactions. The field is false when the address is not associated with increased risk.',
      example: 'true',
      type: 'boolean',
    },
    is_in_ip_country: {
      description: 'This field is true if the shipping address is in the IP country. The field is false when the address is not in the IP country. If the IP address could not be geolocated, then the field will not be included in the response.',
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
      example: 37.632,
      format: 'decimal',
      type: 'number',
    },
    longitude: {
      description: 'The approximate longitude associated with the address.',
      example: -122.313,
      format: 'decimal',
      type: 'number',
    },
  },
  type: 'object',
};

export default Email;
