/* eslint-disable filenames/match-exported */
import { OpenAPIV3 } from 'openapi-types';

const document: OpenAPIV3.Document = {
  components: {
    schemas: {
      Array: {
        items: {},
        type: 'array',
      },
      ArrayWithDefault: {
        default: [
          'foo',
          'bar',
        ],
        items: {},
        type: 'array',
      },
      ArrayWithExample: {
        example: [
          'foo',
          'bar',
        ],
        items: {},
        type: 'array',
      },
      ArrayWithItemReferences: {
        items: {
          $ref: '#/components/schemas/String',
        },
        type: 'array',
      },
      ArrayWithItems: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
      ArrayWithItemsAnyOf: {
        items: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        type: 'array',
      },
      ArrayWithItemsAnyOfWithMax: {
        items: {
          anyOf: [
            {
              type: 'number',
            },
            {
              type: 'string',
            },
          ],
        },
        maxLength: 5,
        minLength: 3,
        type: 'array',
      },
      ArrayWithItemsAnyOfWithMin: {
        items: {
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        minLength: 3,
        type: 'array',
      },
      ArrayWithItemsOneOf: {
        items: {
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        type: 'array',
      },
      ArrayWithItemsOneOfWithMax: {
        items: {
          oneOf: [
            {
              type: 'number',
            },
            {
              type: 'string',
            },
          ],
        },
        maxLength: 5,
        minLength: 3,
        type: 'array',
      },
      ArrayWithItemsOneOfWithMin: {
        items: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        minLength: 3,
        type: 'array',
      },
      ArrayWithItemsWithMax: {
        items: {
          type: 'string',
        },
        minLength: 5,
        type: 'array',
      },
      ArrayWithItemsWithMin: {
        items: {
          type: 'string',
        },
        minLength: 3,
        type: 'array',
      },
      Boolean: {
        type: 'boolean',
      },
      BooleanWithDefault: {
        default: false,
        type: 'boolean',
      },
      BooleanWithExample: {
        example: false,
        type: 'boolean',
      },
      Composite: {
        allOf: [
          {
            type: 'boolean',
          },
          {
            type: 'string',
          },
        ],
      },
      CompositeWithNestedCompositeObjects: {
        allOf: [
          {
            allOf: [
              {
                properties: {
                  bar: {
                    type: 'string',
                  },
                  foo: {
                    allOf: [
                      {
                        properties: {
                          bar: {
                            type: 'string',
                          },
                          foo: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      {
                        properties: {
                          foo: {
                            example: 'foo',
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                    ],
                  },
                },
                type: 'object',
              },
              {
                properties: {
                  foo: {
                    example: 'foo',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            properties: {
              foo: {
                example: 'foo',
                type: 'string',
              },
            },
            type: 'object',
          },
        ],
      },
      CompositeWithObjects: {
        allOf: [
          {
            properties: {
              bar: {
                default: 'bar',
                type: 'string',
              },
              baz: {
                default: 'baz',
                example: 'bazbaz',
                type: 'string',
              },
            },
            type: 'object',
          },
          {
            properties: {
              foo: {
                example: 'foo',
                type: 'string',
              },
              qux: {
                type: 'string',
              },
            },
            type: 'object',
          },
        ],
      },
      CompositeWithOverlappingObjects: {
        allOf: [
          {
            properties: {
              bar: {
                type: 'string',
              },
              foo: {
                type: 'string',
              },
            },
            type: 'object',
          },
          {
            properties: {
              foo: {
                example: 'foo',
                type: 'string',
              },
            },
            type: 'object',
          },
        ],
      },
      CompositeWithReference: {
        allOf: [
          {
            $ref: '#/components/schemas/Boolean',
          },
          {
            type: 'string',
          },
        ],
      },
      EnumEmpty: {
        enum: [],
        type: 'string',
      },
      EnumNonEmpty: {
        enum: [
          'foo',
          'bar',
          'baz',
        ],
        type: 'string',
      },
      Integer: {
        type: 'integer',
      },
      IntegerWithDefault: {
        default: 2,
        type: 'integer',
      },
      IntegerWithExample: {
        example: 2,
        type: 'integer',
      },
      Number: {
        type: 'number',
      },
      NumberWithDecimalFormat: {
        format: 'decimal',
        type: 'number',
      },
      NumberWithDefault: {
        default: 100,
        type: 'number',
      },
      NumberWithExample: {
        example: 100,
        type: 'number',
      },
      NumberWithFloatFormat: {
        format: 'float',
        type: 'number',
      },
      NumberWithIntegerFormat: {
        format: 'integer',
        type: 'number',
      },
      Object: {
        type: 'object',
      },
      ObjectWithDefault: {
        default: {
          bar: 'barbar',
          foo: 'foofoo',
        },
        type: 'object',
      },
      ObjectWithDefaultAndProperties: {
        default: {
          bar: 'barbar',
          foo: 'foofoo',
        },
        properties: {
          bar: {
            example: 'bar',
            type: 'string',
          },
          foo: {
            example: 'foo',
            type: 'string',
          },
        },
        type: 'object',
      },
      ObjectWithDepricatedProperty: {
        properties: {
          bar: {
            example: 'bar',
            type: 'string',
          },
          foo: {
            deprecated: true,
            example: 'foo',
            type: 'string',
          },
        },
        type: 'object',
      },
      ObjectWithExample: {
        example: {
          bar: 'barbar',
          foo: 'foofoo',
        },
        type: 'object',
      },
      ObjectWithExampleAndProperties: {
        example: {
          bar: 'barbar',
          foo: 'foofoo',
        },
        properties: {
          bar: {
            example: 'bar',
            type: 'string',
          },
          foo: {
            example: 'foo',
            type: 'string',
          },
        },
        type: 'object',
      },
      ObjectWithProperties: {
        properties: {
          bar: {
            example: 'bar',
            type: 'string',
          },
          foo: {
            example: 'foo',
            type: 'string',
          },
        },
        type: 'object',
      },
      Ref: {
        $ref: '#/components/schemas/String',
      },
      String: {
        type: 'string',
      },
      StringWithDateFormat: {
        format: 'date',
        type: 'string',
      },
      StringWithDateTimeFormat: {
        format: 'date-time',
        type: 'string',
      },
      StringWithDefault: {
        default: 'foo',
        type: 'string',
      },
      StringWithEmailFormat: {
        format: 'email',
        type: 'string',
      },
      StringWithExample: {
        example: 'foo',
        type: 'string',
      },
      StringWithHostnameFormat: {
        format: 'hostname',
        type: 'string',
      },
      StringWithIpv4Format: {
        format: 'ipv4',
        type: 'string',
      },
      StringWithIpv6Format: {
        format: 'ipv6',
        type: 'string',
      },
      StringWithUuidFormat: {
        format: 'uuid',
        type: 'string',
      },
    },
  },
  info: {
    title: 'Example Spec',
    version: '1.0',
  },
  openapi: '3.0.0',
  paths: {},
};

export default document;
