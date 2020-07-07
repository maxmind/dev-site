import { SchemaObject } from 'openapi3-ts';

const Error: SchemaObject = {
  properties: {
    code: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  type: 'object',
};

export const Errors: Record<number, SchemaObject> = {
  400: {
    content: {
      'application/json': {
        examples: {
          IP_ADDRESS_INVALID: {
            summary: 'IP Address Invalie',
            value: {
              code: 'IP_ADDRESS_INVALID',
              description: 'You have not supplied a valid IPv4 or IPv6 address.',
            },
          },
          IP_ADDRESS_REQUIRED: {
            summary: 'IP Address Required',
            value: {
              code: 'IP_ADDRESS_REQUIRED',
              description: 'You have not supplied an IP address, which is a required field.',
            },
          },
          IP_ADDRESS_RESERVED: {
            summary: 'IP Address Reserved',
            value: {
              code: 'IP_ADDRESS_RESERVED',
              description: 'You have supplied an IP address which is reserved.',
            },
          },
          JSON_INVALID: {
            summary: 'JSON Invalid',
            value: {
              code: 'JSON_INVALID',
              description: 'We cannot decode the body as a JSON object.',
            },
          },
        },
        schema: Error,
      },
    },
    description: 'Bad Request',
  },
  401: {
    content: {
      'application/json': {
        schema: Error,
      },
    },
    description: 'Unauthorized',
  },
  402: {
    content: {
      'application/json': {
        examples: {
          INSUFFICIENT_FUNDS: {
            value: {
              code: 'INSUFFICIENT_FUNDS',
              description: 'The license key you have provided does not have sufficient funds to use this service. Please purchase more service credits.',
            },
          },
        },
        schema: Error,
      },
    },
    description: 'Payment Required',
  },
  403: {
    content: {
      'application/json': {
        examples: {
          DEFAULT: {
            value: {
              description: 'Your request included a Content-Type header that is not supported. For GET requests, this means the web service cannot return content of that type. For PUT and POST queries, this means the web service cannot parse a request body of that type.',
            },
          },
          PERMISSION_REQUIRED: {
            value: {
              code: 'PERMISSION_REQUIRED',
              description: 'You do not have permission to use the service. Please contact support@maxmind.com for more information.',
            },
          },
        },
        schema: Error,
      },
    },
    description: 'Forbidden',
  },
  413: {
    content: {
      'application/json': {
        examples: {
          DEFAULT: {
            value: {
              description: 'Your request included a Content-Type header that is not supported. For GET requests, this means the web service cannot return content of that type. For PUT and POST queries, this means the web service cannot parse a request body of that type.',
            },
          },
        },
        schema: Error,
      },
    },
    description: 'Unsupported Media Type',
  },
  503: {
    content: {
      'application/json': {
        examples: {
          DEFAULT: {
            value: {
              description: 'There is a problem with the web service server. You can try this request again later.',
            },
          },
        },
        schema: Error,
      },
    },
    description: 'Service Not Available',
  },
};

export default Error;
