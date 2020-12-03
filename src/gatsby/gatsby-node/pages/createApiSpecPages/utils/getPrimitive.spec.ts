import { OpenAPIV3 } from 'openapi-types';

import getPrimitive from './getPrimitive';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedPrimitives: Record<string, (param?: any) => void> = {
  string: () => 'foo',
  string_uuid: () => 'bar',
};

describe('getPrimitive()', () => {
  it('returns primitive with no format', () => {
    const schema: OpenAPIV3.SchemaObject = {
      type: 'string',
    };

    const primitive = getPrimitive(schema, mockedPrimitives);

    expect(primitive).toBe('foo');
  });

  it('returns primitive with format', () => {
    const schema: OpenAPIV3.SchemaObject = {
      format: 'uuid',
      type: 'string',
    };

    const primitive = getPrimitive(schema, mockedPrimitives);

    expect(primitive).toBe('bar');
  });

  it('throws error if type is unknown', () => {
    const schema = {
      type: 'foo',
    };

    expect(
      () => getPrimitive(schema as OpenAPIV3.SchemaObject, mockedPrimitives)
    ).toThrow('Unknown primative: foo');
  });

  it('throws error if format is unknown', () => {
    const schema = {
      format: 'bar',
      type: 'foo',
    };

    expect(
      () => getPrimitive(schema as OpenAPIV3.SchemaObject, mockedPrimitives)
    ).toThrow('Unknown primative: foo_bar');
  });
});
