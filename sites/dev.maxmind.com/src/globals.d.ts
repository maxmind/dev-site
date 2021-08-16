declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.mdx';

declare type ProductFamily = 'geoip' | 'minfraud';

declare type MinFraudService = 'score' | 'factors' | 'insights';
declare type MinFraudServices = '*' | MinFraudService[];

declare type GeoIpService = 'country' | 'city' | 'insights';
declare type GeoIpServices = '*' | GeoIpService[];

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
