declare type MinFraudService = 'score' | 'factors' | 'insights';
declare type MinFraudServices = '*' | MinFraudService[];

declare type SchemaType = 'array<object>' | 'object';
declare type SchemaPropertyType = 'array<boolean>'
  | 'array<number>'
  | 'array<integer>'
  | 'array<object>'
  | 'array<string>'
  | 'boolean'
  | 'number'
  | 'integer'
  | 'object'
  | 'string';
