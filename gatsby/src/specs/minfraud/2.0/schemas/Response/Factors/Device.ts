import { SchemaObject } from 'openapi3-ts';

const Device: SchemaObject = {
  description: 'This object contains information about the device that MaxMind believes is associated with the IP address passed in the request.',
  properties: {
    confidence: {
      description: 'A number from 0.01 to 99 representing the confidence that the `/device/id` refers to a unique device as opposed to a cluster of similar devices. A confidence of 0.01 indicates very low confidence that the device is unique, whereas 99 indicates very high confidence.',
      example: 99,
      type: 'string',
    },
    id: {
      description: 'A UUID that MaxMind uses for the device associated with this IP address. Note that many devices cannot be uniquely identified because they are too common (for example, all iPhones of a given model and OS release). In these cases, the minFraud service will simply not return a UUID for that device. This is only available if you are using the [Device Tracking Add-on](https://dev.maxmind.com/minfraud/device/).',
      example: '7835b099-d385-4e5b-969e-7df26181d73b',
      type: 'string',
    },
    last_seen: {
      description: 'The date and time of the last sighting of the device. The value is formatted according to [RFC 3339](https://tools.ietf.org/html/rfc3339).',
      example: '2016-06-08T14:16:38Z',
      type: 'string',
    },
  },
  type: 'object',
};

export default Device;
