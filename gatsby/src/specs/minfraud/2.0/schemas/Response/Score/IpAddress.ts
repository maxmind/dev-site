import { SchemaObject } from 'openapi3-ts';

const IpAddress: SchemaObject = {
  properties: {
    risk: {
      description: 'This field contains the risk associated with the IP address. The value ranges from 0.01 to 99. A higher score indicates a higher risk.',
      example: 0.01,
      format: 'decimal',
      maximum: 99,
      minimum: 0.01,
      type: 'number',
    },
  },
  type: 'object',
};

export default IpAddress;
