// eslint-disable-next-line filenames/match-exported
import merge from 'lodash/merge';
import {
  isSchemaObject,
  OpenApiBuilder,
  ReferenceObject,
  SchemaObject,
} from 'openapi3-ts';

import minFraud from './minfraud/2.0';

const specs: Record<string, OpenApiBuilder> = {
  minFraud,
};

export const parseSchema = (
  schema: ReferenceObject | SchemaObject,
  combinedSchema: SchemaObject = {},
): SchemaObject => {
  if (isSchemaObject(schema)) {
    if (schema.allOf) {
      schema.allOf
        .map((s: SchemaObject) => parseSchema(s, combinedSchema))
        .forEach((s: SchemaObject) => merge(combinedSchema, s));

      return combinedSchema;
    }

    if (schema.properties) {
      Object.entries(schema.properties as SchemaObject).map((
        property: [string, SchemaObject]
      ) => {
        const [
          name,
          value,
        ] = property;

        // eslint-disable-next-line security/detect-object-injection
        (schema.properties as SchemaObject)[name] = parseSchema(value);
      });
    }
  }

  return schema;
};

export default specs;
