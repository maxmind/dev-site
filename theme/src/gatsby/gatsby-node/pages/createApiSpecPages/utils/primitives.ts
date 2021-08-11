/* eslint-disable filenames/match-exported */
import { OpenAPIV3 } from 'openapi-types';

export type PrimitiveType = OpenAPIV3.NonArraySchemaObjectType
  | 'number_decimal'
  | 'number_float'
  | 'number_integer'
  | 'string_date'
  | 'string_date-time'
  | 'string_email'
  | 'string_hostname'
  | 'string_ipv4'
  | 'string_ipv6'
  | 'string_uuid';

const defaultMiddleware = (
  schema: OpenAPIV3.SchemaObject,
  next: (schema: OpenAPIV3.SchemaObject) => unknown
) => {
  if (schema.default !== undefined) {
    return schema.default;
  }

  return next(schema);
};

const primatives: Record<
  PrimitiveType,
  (schema: OpenAPIV3.SchemaObject) => unknown
> = {
  boolean: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): boolean => true),

  integer: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): number => 0),

  number: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): number => 0),

  number_decimal: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): number => 0.0),

  number_float: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): number => 0.0),

  number_integer: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): number => 0),

  object: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): Record<string, unknown> => ({})),

  string: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): string => 'string'),

  string_date: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(
    schema,
    (): string => new Date().toISOString().substring(0, 10)
  ),
  'string_date-time': (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): string => new Date().toISOString()),

  string_email: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): string => 'user@example.com'),

  string_hostname: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): string => 'example.com'),

  string_ipv4: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(schema, (): string => '198.51.100.42'),

  string_ipv6: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(
    schema,
    (): string => '2001:0db8:5b96:0000:0000:426f:8e17:642a'
  ),

  string_uuid: (
    schema: OpenAPIV3.SchemaObject
  ) => defaultMiddleware(
    schema,
    (): string => '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  ),
};

export default primatives;
