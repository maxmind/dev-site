/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */
import OpenApiParser from '@apidevtools/swagger-parser';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { OpenAPI } from 'openapi-types';
import { addExtension,
  isSchemaObject,
  OpenAPIObject,
  SchemaObject } from 'openapi3-ts';

const normalizeArray = (arr: unknown): unknown[] => Array.isArray(arr) ? arr : [
  arr,
];

const objectify = (thing: unknown): Record<any, any> => {
  if (!(!!thing && typeof thing === 'object')) {
    return {
    };
  }

  return thing as Record<any, any>;
};

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

const primitive = (schema: SchemaObject): unknown => {
  schema = objectify(schema);
  const { type, format } = schema;

  const fn = (primitives as any)[`${type}_${format}`]
    || (primitives as any)[(type as string)];

  if (typeof(fn) === 'function') {
    return fn(schema);
  }

  return 'Unknown Type: ' + schema.type;
};

const deeplyStripKey = (
  input: any,
  keyToStrip: string,
  predicate: (
    a: any,
    b: any
  ) => boolean = (): boolean => true
): Record<any, any> => {
  if (
    typeof input !== 'object'
      || Array.isArray(input)
      || input === null
      || !keyToStrip
  ) {
    return input;
  }

  const obj = Object.assign({
  }, input);

  Object.keys(obj).forEach(k => {
    if (k === keyToStrip && predicate(obj[k], k)) {
      delete obj[k];
      return;
    }
    obj[k] = deeplyStripKey(obj[k], keyToStrip, predicate);
  });

  return obj;
};

const sampleFromSchema = (schema: SchemaObject, config: any = {
}): any => {
  let { type } = schema;
  const {
    allOf,
    additionalProperties,
    example,
    items,
    properties,
  } = schema;
  const { includeReadOnly, includeWriteOnly } = config;

  if (example !== undefined) {
    return deeplyStripKey(example, '$$ref', (val: unknown) => {
      // do a couple of quick sanity tests to ensure the value
      // looks like a $$ref that swagger-client generates.
      return typeof val === 'string' && val.indexOf('#') > -1;
    });
  }

  if (allOf) {
    const foo = {
    };
    allOf.map((item: any) => merge(foo, item));
    return sampleFromSchema(foo, config);
  }

  if (!type) {
    if (properties) {
      type = 'object';
    } else if (items) {
      type = 'array';
    } else {
      return;
    }
  }

  if (type === 'object') {
    const props = objectify(properties);
    const obj = {
    };
    for (const name in props) {
      if ( props[name] && props[name].deprecated ) {
        continue;
      }
      if ( props[name] && props[name].readOnly && !includeReadOnly ) {
        continue;
      }
      if ( props[name] && props[name].writeOnly && !includeWriteOnly ) {
        continue;
      }
      (obj as any)[name] = sampleFromSchema(props[name], config);
    }

    if ( additionalProperties === true ) {
      (obj as any).additionalProp1 = {
      };
    } else if ( additionalProperties ) {
      const additionalProps = objectify(additionalProperties);
      const additionalPropVal = sampleFromSchema(additionalProps, config);

      for (let i = 1; i < 4; i++) {
        (obj as any)['additionalProp' + i] = additionalPropVal;
      }
    }
    return obj;
  }

  if (type === 'array' && items && isSchemaObject(items)) {
    if (Array.isArray(items.anyOf)) {
      return items.anyOf.map((i: any)  => sampleFromSchema(i, config));
    }

    if (Array.isArray(items.oneOf)) {
      return sampleFromSchema(items.oneOf[0], config);
      // return items.oneOf.map((i: any) => sampleFromSchema(i, config));
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

  if (type === 'file') {
    return;
  }

  return primitive(schema);
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
    {
    }
  );
};

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
      if (properties) {
        Object.keys(properties).map(property => {
          const exampleProperty = JSON.stringify(
            spec.components.schemas[name]['x-compiled-example'][property],
            null,
            2
          );

          if (!exampleProperty) {
            return;
          }

          const exampleRegex = exampleProperty.replace(/\s+/gm, '\\s+');
          // eslint-disable-next-line security/detect-non-literal-regexp
          const ExampleRegex = new RegExp(exampleRegex, 'gm');

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
      }
    });
    return spec;
  });

