/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */
import OpenApiParser from '@apidevtools/swagger-parser';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { OpenAPI } from 'openapi-types';
import {
  addExtension,
  isSchemaObject,
  OpenAPIObject,
  SchemaObject,
} from 'openapi3-ts';

const normalizeArray = (subject: unknown): unknown[] => Array.isArray(subject)
  ? subject
  : [
    subject,
  ];

const normalizeObject = (subject: unknown): Record<any, any> => (
  subject && typeof subject === 'object'
)
  ? subject as Record<any, any>
  : {};

const primitives = {
  /* eslint-disable @typescript-eslint/camelcase */
  boolean: (
    schema: SchemaObject
  ): boolean => typeof schema.default === 'boolean' ? schema.default : true,
  integer: (): number => 0,
  number: (): number => 0,
  number_float: (): number => 0.0,
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

const getPrimative = (schema: SchemaObject): unknown => {
  const { type, format } = normalizeObject(schema);

  const fn = (primitives as any)[`${type}_${format}`]
    || (primitives as any)[(type as string)];

  if (typeof(fn) === 'function') {
    return fn(schema);
  }

  return 'Unknown Type: ' + schema.type;
};

const sampleFromSchema = (schema: SchemaObject, config: any = {}): any => {
  let { type } = schema;
  const { allOf, items, properties } = schema;
  const { includeReadOnly, includeWriteOnly } = config;

  if (allOf) {
    const composedSchema = {};
    allOf.map((item: any) => merge(composedSchema, item));
    return sampleFromSchema(composedSchema, config);
  }

  if (properties) {
    type = 'object';
  }

  if (items) {
    type = 'array';
  }

  if (!type || type === 'file') {
    return;
  }

  if (type === 'object') {
    const props = normalizeObject(properties);
    const obj: any = {};
    for (const name in props) {
      if (
        props[name] && (
          props[name].deprecated ||
          (props[name].readOnly && !includeReadOnly) ||
          (props[name].writeOnly && !includeWriteOnly)
        )
      ) {
        continue;
      }

      obj[name] = sampleFromSchema(props[name], config);
    }

    return obj;
  }

  if (type === 'array' && items && isSchemaObject(items)) {
    if (Array.isArray(items.anyOf)) {
      return items.anyOf.map((item: any)  => sampleFromSchema(item, config));
    }

    if (Array.isArray(items.oneOf)) {
      return sampleFromSchema(items.oneOf[0], config);
    }

    return [
      sampleFromSchema(items, config),
    ];
  }

  if (schema['enum']) {
    return (schema['default'])
      ? schema['default']
      : normalizeArray(schema['enum'])[0];
  }

  return getPrimative(schema);
};

const sortKeys = (x: any): any => {
  if (typeof x !== 'object' || !x) {
    return x;
  }

  if (Array.isArray(x)) {
    return x.map(sortKeys);
  }

  return Object.keys(x).sort().reduce(
    (o, k) => ({
      ...o,
      // eslint-disable-next-line security/detect-object-injection
      [k]: sortKeys(x[k]),
    }),
    {}
  );
};

// TODO: Add test for this
export const addCompiledExamples = (
  Spec: OpenAPIObject
): Promise<OpenAPI.Document> => OpenApiParser.validate(cloneDeep(Spec) as OpenAPI.Document)
  .then((spec: any): any => {
    Object.entries(spec.components.schemas).map(([
      name,
      schema,
    ]) => {
      if (Spec.components && Spec.components.schemas) {
        addExtension(
          Spec.components.schemas[name],
          'x-compiled-example',
          sampleFromSchema(schema as SchemaObject)
        );

        if (Spec.components.schemas[name]) {
          Object.values(Spec.components.schemas[name]);
        }
      }
    });

    return sortKeys(Spec);
  })
  .then((spec) => {
    Object.entries(spec.components.schemas).map(([
      name,
      schema,
    ]) => {
      const properties = (schema as SchemaObject).properties;

      if (!properties) {
        return;
      }

      Object.keys(properties).map(property => {
        const compiledExample = spec.components.schemas[name]['x-compiled-example'][property];
        const exampleProperty = JSON.stringify(
          compiledExample,
          null,
          2
        );

        if (!exampleProperty) {
          return;
        }

        let ExampleRegex = RegExp(
          `(?:"${property}": )(.*?)(?:\\n)`,
          'gm'
        );

        if (typeof compiledExample === 'object') {
          if (Array.isArray(compiledExample)) {
            // eslint-disable-next-line security/detect-non-literal-regexp
            ExampleRegex = new RegExp(
              `(?:"${property}": \\[)((.|\\s)*?)(?:\\])`,
              'gm'
            );
          } else {
            // eslint-disable-next-line security/detect-non-literal-regexp
            ExampleRegex = new RegExp(
              `(?:"${property}": {)((.|\\s)*?)(?:})`,
              'gm'
            );
          }
        }

        const example = JSON.stringify(
          spec.components.schemas[name]['x-compiled-example'],
          null,
          2,
        );

        const index = example.search(ExampleRegex);

        if (index <= 0) {
          return;
        }

        const startingLineNumber = example
          .substring(0, index)
          .split('\n')
          .length;

        const endingLineNumber = (exampleProperty.split('\n')
          .length) + startingLineNumber - 1;

        addExtension(
          spec.components.schemas[name].properties[property],
          'x-line-numbers',
          startingLineNumber === endingLineNumber
            ? startingLineNumber
            : `${startingLineNumber}-${endingLineNumber}`
        );
      });
    });

    return spec;
  });

