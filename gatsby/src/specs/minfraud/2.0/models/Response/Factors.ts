import { SchemaObject } from 'openapi3-ts';

import Score, { IpAddress as ScoreIpAddress } from './Score';

const Translations: SchemaObject = {
  properties: {
    de: {
      type: 'string',
    },
    en: {
      type: 'string',
    },
    es: {
      type: 'string',
    },
    fr: {
      type: 'string',
    },
    ja: {
      type: 'string',
    },
    'pt-BR': {
      type: 'string',
    },
    ru: {
      type: 'string',
    },
    'zh-CN': {
      type: 'string',
    },
  },
  type: 'object',
};

const IpAddress: SchemaObject = {
  properties: {
    ...ScoreIpAddress.properties,
    city: {
      allOf: [
        {
          example: {
            confidence: 25,
          },
          properties: {
            confidence: {
              example: 25,
              type: 'integer',
            },
          },
          type: 'object',
        },
        {
          example: {
            geoname_id: 6252001,
            names: {
              de: 'Los Angeles',
              en: 'Los Angeles',
              es: 'Los Ángeles',
              fr: 'Los Angeles',
              ja: 'ロサンゼルス市',
              'pt-BR': 'Los Angeles',
              ru: 'Лос-Анджелес',
              'zh-CN': '洛杉矶',
            },
          },
          properties: {
            geoname_id: {
              example: 'test',
              type: 'string',
            },
            names: Translations,
          },
          type: 'object',
        },
      ],
    },
    continent: {
      allOf: [
        {
          example: {
            code: 'NA',
          },
          properties: {
            code: {
              example: 'NA',
              type: 'string',
            },
          },
          type: 'object',
        },
        {
          example: {
            geoname_id: 123456,
            names: {
              de: 'Nordamerika',
              en: 'North America',
              es: 'América del Norte',
              fr: 'Amérique du Nord',
              ja: '北アメリカ',
              'pt-BR': 'América do Norte',
              ru: 'Северная Америка',
              'zh-CN': '北美洲',
            },
          },
          properties: {
            geoname_id: {
              example: 'test',
              type: 'string',
            },
            names: Translations,
          },
          type: 'object',
        },
      ],
    },
    country: {
      allOf: [
        {
          example: {
            confidence: 75,
            is_high_risk: true,
            iso_code: 'US',
          },
          properties: {
            confidence: {
              example: '75,',
              type: 'integer',
            },
            is_high_risk: {
              description: 'This value is true if the IP country is high risk.',
              example: true,
              type: 'boolean',
            },
            iso_code: {
              example: 'US',
              type: 'string',
            },
          },
          type: 'object',
        },
        {
          example: {
            geoname_id: 6252001,
            names: {
              de: 'USA',
              en: 'United States',
              es: 'Estados Unidos',
              fr: 'États-Unis',
              ja: 'アメリカ合衆国',
              'pt-BR': 'Estados Unidos',
              ru: 'США',
              'zh-CN': '美国',
            },
          },
          properties: {
            geoname_id: {
              example: 'test',
              type: 'string',
            },
            names: Translations,
          },
          type: 'object',
        },
      ],
    },
    location: {
      properties: {
        accuracy_radius: {
          example: 20,
          type: 'integer',
        },
        average_income: {
          example: 50321,
          type: 'integer',
        },
        latitude: {
          example: 37.6293,
          format: 'decimal',
          type: 'number',
        },
        local_time: {
          description: 'The date and time of the transaction in the time zone associated with the IP address. The value is formatted according to [RFC 3339](https://tools.ietf.org/html/rfc3339). For instance, the local time in Boston might be returned as `2015-04-27T19:17:24-04:00`.',
          example: '2015-04-26T01:37:17-08:00',
          maxLength: 255,
          type: 'string',
        },
        longitude: {
          example: -122.1163,
          format: 'decimal',
          type: 'number',
        },
        metro_code: {
          example: 807,
          type: 'integer',
        },
        population_density: {
          example: 7122,
          type: 'integer',
        },
        time_zone: {
          example: 'America/Los_Angeles',
          type: 'string',
        },
      },
      type: 'object',
    },
    postal: {
      properties: {
        code: {
          example: '90001',
          type: 'string',
        },
        confidence: {
          example: 10,
          type: 'integer',
        },
      },
      type: 'object',
    },
    registered_country: {
      allOf: [
        {
          example: {
            iso_code: 'US',
          },
          properties: {
            iso_code: {
              example: 'US',
              type: 'string',
            },
          },
          type: 'object',
        },
        {
          example: {
            geoname_id: 6252001,
            names: {
              de: 'USA',
              en: 'United States',
              es: 'Estados Unidos',
              fr: 'États-Unis',
              ja: 'アメリカ合衆国',
              'pt-BR': 'Estados Unidos',
              ru: 'США',
              'zh-CN': '美国',
            },
          },
          properties: {
            geoname_id: {
              example: 'test',
              type: 'string',
            },
            names: Translations,
          },
          type: 'object',
        },
      ],
    },
    represented_country: {
      allOf: [
        {
          example: {
            iso_code: 'US',
            type: 'military',
          },
          properties: {
            iso_code: {
              example: 'US',
              type: 'string',
            },
            type: {
              example: 'military',
              type: 'string',
            },
          },
          type: 'object',
        },
        {
          example: {
            geoname_id: 6252001,
            names: {
              de: 'USA',
              en: 'United States',
              es: 'Estados Unidos',
              fr: 'États-Unis',
              ja: 'アメリカ合衆国',
              'pt-BR': 'Estados Unidos',
              ru: 'США',
              'zh-CN': '美国',
            },
          },
          properties: {
            geoname_id: {
              example: 'test',
              type: 'string',
            },
            names: Translations,
          },
          type: 'object',
        },
      ],
    },
    subdivisons: {
      allOf: [
        {
          properties: {
            confidence: {
              example: 50,
              type: 'integer',
            },
            iso_code: {
              example: 'CA',
              type: 'string',
            },
          },
          type: 'object',
        },
        {
          example: {
            geoname_id: 5332921,
            names: {
              de: 'Kalifornien',
              en: 'California',
              es: 'California',
              fr: 'Californie',
              ja: 'カリフォルニア',
              'pt-BR': 'California',
              ru: 'Калифорния',
              'zh-CN': '加州',
            },
          },
          properties: {
            geoname_id: {
              example: 'test',
              type: 'string',
            },
            names: Translations,
          },
          type: 'object',
        },
      ],
    },
    traits: {
      properties: {
        autonomous_system_number: {
          example: 1239,
          type: 'integer',
        },
        autonomous_system_organization: {
          example: 'Linkem IR WiMax Network',
          type: 'string',
        },
        domain: {
          example: 'example.com',
          type: 'string',
        },
        ip_address: {
          example: '1.2.3.4',
          type: 'string',
        },
        is_anonymous_proxy: {
          example: true,
          type: 'boolean',
        },
        is_satellite_provider: {
          example: true,
          type: 'boolean',
        },
        isp: {
          example: 'Linkem spa',
          type: 'string',
        },
        organization: {
          example: 'Linkem IR WiMax Network',
          type: 'string',
        },
        user_type: {
          example: 'traveler',
          type: 'string',
        },
      },
      type: 'object',
    },
  },
};

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

const ShippingAddress: SchemaObject =  {
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

const Factors: SchemaObject = {
  properties: {
    ...Score.properties,
    billing_address: BillingAddress,
    device: Device,
    email: Email,
    ip_address: IpAddress,
    shipping_address: ShippingAddress,
  },
  type: 'object',
};

export default Factors;
