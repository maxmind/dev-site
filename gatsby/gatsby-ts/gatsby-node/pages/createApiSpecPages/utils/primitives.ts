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

const primatives: Record<PrimitiveType, Function> = {
  /* eslint-disable @typescript-eslint/camelcase */
  boolean: (
    schema: OpenAPIV3.SchemaObject
  ): boolean => typeof schema.default === 'boolean' ? schema.default : true,
  integer: (): number => 0,
  null: (): null => null,
  number: (): number => 0,
  number_decimal: (): number => 0.0,
  number_float: (): number => 0.0,
  number_integer: (): number => 0,
  object: (): object => ({}),
  string: (): string => 'string',
  string_date: (): string => new Date().toISOString().substring(0, 10),
  'string_date-time': (): string => new Date().toISOString(),
  string_email: (): string => 'user@example.com',
  string_hostname: (): string => 'example.com',
  string_ipv4: (): string => '198.51.100.42',
  string_ipv6: (): string => '2001:0db8:5b96:0000:0000:426f:8e17:642a',
  string_uuid: (): string => '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  /* eslint-enable @typescript-eslint/camelcase */
};

export default primatives;
