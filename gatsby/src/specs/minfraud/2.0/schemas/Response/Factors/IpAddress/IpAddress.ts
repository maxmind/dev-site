import { SchemaObject } from 'openapi3-ts';

const IpAddress: SchemaObject = {
  allOf: [
    {
      $ref: '#/components/schemas/Response.Score.IpAddress',
    },
    {
      properties: {
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
              $ref: '#/components/schemas/Response.Factors.IpAddress.GeoName',
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
              $ref: '#/components/schemas/Response.Factors.IpAddress.GeoName',
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
              $ref: '#/components/schemas/Response.Factors.IpAddress.GeoName',
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
              $ref: '#/components/schemas/Response.Factors.IpAddress.GeoName',
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
              $ref: '#/components/schemas/Response.Factors.IpAddress.GeoName',
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
              $ref: '#/components/schemas/Response.Factors.IpAddress.GeoName',
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
      type: 'object',
    },
  ],
};

export default IpAddress;
