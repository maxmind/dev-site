import { SchemaObject } from 'openapi3-ts';

const Disposition: SchemaObject = {
  description: 'This object contains information about how a request was handled by the [custom rules](https://www.maxmind.com/en/minfraud-custom-rules) you have defined. If your account does not have any custom rules defined, then this object will not be present in the response.',
  properties: {
    action: {
      default: 'accept',
      description: 'This describes how the request was handled.',
      enum: [
        'accept',
        'reject',
        'manual_review',
      ],
      example: 'accept',
      type: 'string',
    },
    reason: {
      description: 'This describes why the `action` was set to a particular value.',
      enum: [
        'default',
        'custom_rule',
      ],
      example: 'default',
      type: 'string',
    },
  },
  type: 'object',
};

export default Disposition;
