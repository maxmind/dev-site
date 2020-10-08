/* eslint-disable filenames/match-exported */
import { merge } from 'lodash';
import { OpenAPIV3 } from 'openapi-types';

import { isSchemaObject } from '../../../../utils/openapi';

const parseSchema = (
  schema: OpenAPIV3.Document
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.SchemaObject,
  combinedSchema: OpenAPIV3.SchemaObject = ({} as OpenAPIV3.SchemaObject),
): OpenAPIV3.Document
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3.SchemaObject => {

  if (isSchemaObject(schema)) {
    if (schema.allOf) {
      schema.allOf
        .map((s) => parseSchema(s, combinedSchema))
        .forEach((s) => merge(combinedSchema, s));

      return combinedSchema;
    }

    if (schema && schema.properties) {
      Object.entries(schema.properties).map((property) => {
        const [
          name,
          value,
        ] = property;

        if (schema.properties) {
          // eslint-disable-next-line security/detect-object-injection
          schema.properties[name]
            = parseSchema(value) as OpenAPIV3.SchemaObject;
        }
      });
    }
  }

  return schema;
};

export default parseSchema;
