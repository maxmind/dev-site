import { OpenAPIV3 } from 'openapi-types';

import addCompiledExamples from './addCompiledExamples';

const baseDocument: OpenAPIV3.Document = {
  info: {
    title: '',
    version: '',
  },
  openapi: '',
  paths: {},
};

describe('addCompiledExamples()', () => {
  it('returns spec if `schemas` is undefined', () => {
    const compiled = addCompiledExamples(baseDocument);
    expect(compiled).toStrictEqual(baseDocument);
  });

  describe('each schema has `x-compiled-example`', () => {
    const document = {
      ...baseDocument,
      components: {
        schemas: {
          Complex: {
            properties: {
              bar: {
                type: 'boolean',
              },
              foo: {
                type: 'string',
              },
            },
            type: 'object',
          } as OpenAPIV3.SchemaObject,
          Simple: {
            type: 'string',
          } as OpenAPIV3.SchemaObject,
        },
      },
    };

    const compiled = addCompiledExamples(document);

    Object.entries(
      compiled?.components?.schemas as {
        [key: string]: OpenAPIV3.SchemaObject
      }
    ).map(([
      schemaName,
      schema,
    ] : [
      string,
      OpenAPIV3.SchemaObject,
    ]) => {
      it(schemaName, () => {
        expect(schema['x-compiled-example']).toBeDefined();
        expect(schema['x-compiled-example']).not.toBeNull();
      });
    });
  });

  it('has correct `x-compiled-example` value', () => {
    const document = {
      ...baseDocument,
      components: {
        schemas: {
          Example: {
            properties: {
              bar: {
                type: 'boolean',
              },
              foo: {
                type: 'string',
              },
            },
            type: 'object',
          } as OpenAPIV3.SchemaObject,
        },
      },
    };

    const compiled = addCompiledExamples(document);
    const schema = (
      compiled.components?.schemas as OpenAPIV3.SchemaComponentsObject
    ).Example as OpenAPIV3.NonArraySchemaObject;

    expect(schema?.['x-compiled-example']).toBeDefined();

    expect(schema['x-compiled-example']).toStrictEqual({
      bar: true,
      foo: 'string',
    });
  });
});
