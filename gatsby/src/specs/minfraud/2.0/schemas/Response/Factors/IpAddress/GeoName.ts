import { SchemaObject } from 'openapi3-ts';

const GeoName: SchemaObject = {
  properties: {
    geoname_id: {
      example: 'test',
      type: 'string',
    },
    names: {
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
    },
  },
  type: 'object',
};

export default GeoName;
