import { OpenAPIV3 } from 'openapi-types';

import addCompiledExamples from './addCompiledExamples';
import addLineNumbers from './addLineNumbers';

const baseDocument: OpenAPIV3.Document = {
  components: {},
  info: {
    title: 'Example Spec',
    version: '1.0',
  },
  openapi: '3.0.0',
  paths: {},
};

describe('addLineNumbers()', () => {
  it('returns document if schema components are not defined', () => {
    const document = addCompiledExamples(baseDocument);
    delete document.components?.schemas;
    expect(addLineNumbers(document)).toStrictEqual(document);
  });

  it('reference schemas are preserved as is', () => {
    let document = addCompiledExamples(baseDocument);
    document = {
      ...document,
      components: {
        schemas: {
          Ref: {
            $ref: '#/components/schemas/Foo',
          },
        },
      },
    };

    const result: OpenAPIV3.Document = addLineNumbers(document);

    expect(
      result.components?.schemas?.Foo
    ).toStrictEqual(
      document.components?.schemas?.Foo
    );
  });

  it(
    'does not add line numbers to array schemas with non-array example type',
    () => {
      const document = addCompiledExamples({
        ...baseDocument,
        components: {
          schemas: {
            Example: {
              items: {
                type: 'string',
              },
              type: 'array',
            },
          },
        },
      });

      (document.components?.schemas?.Example as OpenAPIV3.SchemaObject)[
        'x-compiled-example'
      ] = 'foo';

      const result = addLineNumbers(document);

      expect(
        (result.components?.schemas?.Example as OpenAPIV3.SchemaObject)
      ).not.toHaveProperty('x-line-numbers');
    });

  it(
    'if a schema does not have a compiled example, no line numbers are added',
    () => {
      const document = addCompiledExamples({
        ...baseDocument,
        components: {
          schemas: {
            Foo: {
              type: 'string',
            },
          },
        },
      });

      expect(
        (document.components?.schemas?.Foo as OpenAPIV3.SchemaObject)
      ).toHaveProperty('x-compiled-example');

      delete (
        document.components?.schemas?.Foo as OpenAPIV3.SchemaObject
      )['x-compiled-example'];

      const result: OpenAPIV3.Document = addLineNumbers(document);

      expect(
        (result.components?.schemas?.Foo as OpenAPIV3.SchemaObject)
      ).not.toHaveProperty('x-compiled-example');
    }
  );

  it(
    'does not add line numbers if there are mismatched object schema types',
    () => {
      const document = addCompiledExamples({
        ...baseDocument,
        components: {
          schemas: {
            Example: {
              properties: {
                foo: {
                  type: 'number',
                },
              },
              type: 'object',
            },
          },
        },
      });
      (document.components?.schemas?.Example as OpenAPIV3.SchemaObject)[
        'x-compiled-example'
      ] = 'foo';

      const result = addLineNumbers(document);

      expect(
        (result.components?.schemas?.Example as OpenAPIV3.SchemaObject)
      ).not.toHaveProperty('x-line-numbers');
    });

  it('adds line numbers to object schema types', () => {
    const document = addLineNumbers(addCompiledExamples({
      ...baseDocument,
      components: {
        schemas: {
          Example: {
            properties: {
              foo: {
                type: 'string',
              },
            },
            type: 'object',
          },
        },
      },
    }));

    expect(
      (
        document.components?.schemas?.Example as OpenAPIV3.SchemaObject
      )?.properties?.foo
    ).toHaveProperty('x-line-numbers');
  });

  it(
    'adds line numbers to object schemas with child objects',
    () => {
      const document = addCompiledExamples({
        ...baseDocument,
        components: {
          schemas: {
            Example: {
              properties: {
                foo: {
                  properties: {
                    bar: {
                      type: 'number',
                    },
                  },
                  type: 'object',
                },
              },
              type: 'object',
            },
          },
        },
      });

      const result =
        addLineNumbers(document)
          .components?.schemas?.Example as OpenAPIV3.NonArraySchemaObject;

      expect(
        result.properties?.foo
      ).toHaveProperty('x-line-numbers');
    });

  it(
    'adds line numbers to object schemas with child arrays',
    () => {
      const document = addCompiledExamples({
        ...baseDocument,
        components: {
          schemas: {
            Example: {
              properties: {
                foo: {
                  items: {
                    type: 'string',
                  },
                  type: 'array',
                },
              },
              type: 'object',
            },
          },
        },
      });

      const result =
        addLineNumbers(document)
          .components?.schemas?.Example as OpenAPIV3.ArraySchemaObject;

      expect(
        result.properties?.foo
      ).toHaveProperty('x-line-numbers');
    });

  it('adds line numbers to array schema types', () => {
    const document = addLineNumbers(addCompiledExamples({
      ...baseDocument,
      components: {
        schemas: {
          Example: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
      },
    }));

    expect(
      (document.components?.schemas?.Example as OpenAPIV3.SchemaObject)
    ).toHaveProperty('x-line-numbers');
  });

  it(
    'does not add line numbers to non-array nor non-object schema types'
    , () => {
      const document = addLineNumbers(addCompiledExamples({
        ...baseDocument,
        components: {
          schemas: {
            Example: {
              type: 'string',
            },
          },
        },
      }));

      expect(
        (document.components?.schemas?.Example as OpenAPIV3.SchemaObject)
      ).not.toHaveProperty('x-line-numbers');
    });
});
