import { SchemaObject } from 'openapi3-ts';

const Device: SchemaObject = {
  description: 'This object contains information about the device used in the transaction.',
  properties: {
    accept_langauge: {
      description: 'The HTTP “Accept-Language” header of the device used in the transaction.',
      example: 'en-US,en;q=0.8',
      maxLength: 255,
      type: 'string',
    },
    ip_address: {
      description: 'The IP address associated with the device used by the customer in the transaction. The IP address must be in IPv4 or IPv6 presentation format, i.e., dotted-quad notation or the IPv6 hexadecimal-colon notation.',
      example: '45.36.197.188',
      type: 'string',
    },
    user_agent: {
      description: 'The HTTP “User-Agent” header of the browser used in the transaction.',
      example: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
      maxLength: 255,
      type: 'string',
    },
  },
  required: [
    'ip_address',
  ],
  type: 'object',
};

export default Device;
