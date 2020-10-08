/* eslint-disable security/detect-object-injection */
/* eslint-disable filenames/match-exported */
import merge from 'lodash/merge';
import { OpenAPIV3 } from 'openapi-types';

import {
  isArraySchemaObject,
  isNonArraySchemaObject,
  isSchemaObject,
} from '../../../../../utils/openapi';
import getPrimitive from './getPrimitive';
import normalizeArray from './normalizeArray';
import normalizeObject from './normalizeObject';
import primitives from './primitives';

const sampleFromSchema = (
  schema: OpenAPIV3.SchemaObject,
  config: any = {},
): any => {
  if (schema.allOf) {
    const composedSchema = {};
    schema.allOf.map((item: any) => merge(composedSchema, item));
    return sampleFromSchema(composedSchema as OpenAPIV3.SchemaObject, config);
  }

  if (isArraySchemaObject(schema)) {
    if (isArraySchemaObject(schema) && isSchemaObject(schema.items)) {
      const { items } = schema;

      if (Array.isArray(items.anyOf)) {
        return items.anyOf.map((item: any)  => sampleFromSchema(item, config));
      }

      if (Array.isArray(items.oneOf)) {
        return items.oneOf.map((item: any)  => sampleFromSchema(item, config));
      }

      return [
        sampleFromSchema(items, config),
      ];
    }
  }

  if (isNonArraySchemaObject(schema)) {
    if (schema.type === 'object') {
      const { properties } = schema;
      const props = normalizeObject(properties);
      const obj: any = {};
      for (const name in props) {
        if (
          props[name] && (
            props[name].deprecated ||
            (props[name].readOnly && !config.includeReadOnly) ||
            (props[name].writeOnly && !config.includeWriteOnly)
          )
        ) {
          continue;
        }
        obj[name] = sampleFromSchema(props[name], config);
      }

      return obj;
    }

    if (schema.enum) {
      return (schema.default)
        ? schema.default
        : normalizeArray(schema.enum)[0];
    }

    if (schema.example) {
      return normalizeArray(schema.example)[0];
    }

    if (schema.type) {
      return getPrimitive(schema, primitives);
    }
  }

  return;
};

export default sampleFromSchema;
