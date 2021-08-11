/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-object-injection */
/* eslint-disable filenames/match-exported */
import merge from 'lodash/merge';
import { OpenAPIV3 } from 'openapi-types';

import {
  isArraySchemaObject,
  isReferenceObject,
  isSchemaObject,
} from '../../../../../utils/openapi';
import getPrimitive from './getPrimitive';
import normalizeArray from './normalizeArray';
import normalizeObject from './normalizeObject';
import primitives from './primitives';

const fillSample = ({
  maxLength,
  minLength = 1,
  possibleItems,
} : {
  maxLength?: number;
  minLength?: number;
  possibleItems: unknown[];
}) => Array.from({
  length: maxLength || minLength,
}, (_, i) => possibleItems[i % possibleItems.length]);

const handleCompositeSchema = (
  schemas: OpenAPIV3.CompositeSchemaObjects,
  composedSchema : any = {}
) : any => {
  schemas.map((item: any) =>  {
    if (isReferenceObject(item)) {
      throw new Error(
        'Ensure that schemas are dereferenced before sampling them'
      );
    }

    if (item.allOf) {
      return merge(
        composedSchema,
        handleCompositeSchema(item.allOf, composedSchema)
      );
    }

    if (item.type !== 'object') {
      throw new Error('`allOf` schemas must have a type value of `object`');
    }

    return merge(composedSchema, item);
  });

  return sampleFromSchema(composedSchema);
};

const sampleFromSchema = (
  schema: OpenAPIV3.SchemaComponentObject,
): any => {
  if (isReferenceObject(schema)) {
    throw new Error(
      'Ensure that schemas are dereferenced before sampling them'
    );
  }

  if (schema.allOf) {
    return handleCompositeSchema(schema.allOf);
  }

  if (isArraySchemaObject(schema)) {
    if (!isSchemaObject(schema.items)) {
      return [];
    }

    const {
      default: def, // avoid keyword
      example,
      items,
      maxLength,
      minLength,
    } = schema;

    if (def !== undefined) {
      return def;
    }

    if (example !== undefined) {
      return example;
    }

    if (items && Array.isArray(items.anyOf)) {
      const types = items.anyOf.map((item: any)  => sampleFromSchema(item));

      return fillSample({
        maxLength,
        minLength,
        possibleItems: types,
      });
    }

    if (items && Array.isArray(items.oneOf)) {
      const types = items.oneOf.map((item: any)  => sampleFromSchema(item));

      return fillSample({
        maxLength,
        minLength,
        possibleItems: [
          types[0],
        ],
      });
    }

    if (Object.keys(items).length === 0) {
      return [];
    }

    return fillSample({
      maxLength,
      minLength,
      possibleItems: [
        sampleFromSchema(items),
      ],
    });
  }

  if (schema.example !== undefined) {
    return normalizeArray(schema.example)[0];
  }

  if (schema.type === 'object' && schema.properties) {
    const { properties } = schema;
    const props = normalizeObject(properties);
    const obj: { [key: string]: unknown } = {};
    for (const name in props) {
      if (props[name] && props[name].deprecated) {
        continue;
      }
      obj[name] = sampleFromSchema(props[name]);
    }

    return obj;
  }

  if (schema.enum) {
    if (schema.enum.length == 0) {
      throw new Error('No enumerated types defined for schema');
    }
    return normalizeArray(schema.enum)[0];
  }

  return getPrimitive(schema, primitives);
};

export default sampleFromSchema;
