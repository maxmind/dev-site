import { OpenAPIV3 } from 'openapi-types';

import {
  isArraySchemaObject,
  isReferenceObject,
} from '../../../../../utils/openapi';

type NonReferenceSchemaObject =
  OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject

type DestructuredProperty = [
  string,
  NonReferenceSchemaObject
];

const parseSchema = (
  schema : OpenAPIV3.SchemaComponentObject
) : OpenAPIV3.SchemaComponentObject => {
  if (isReferenceObject(schema)) {
    return schema;
  }

  const schemaExample = schema['x-compiled-example'];

  if (!schemaExample) {
    return schema;
  }

  const exampleJSON = JSON.stringify(
    schemaExample,
    null,
    2,
  );

  if (isArraySchemaObject(schema)) {
    return parseArraySchema({
      example: schemaExample,
      fullExampleJSON: exampleJSON,
      schema,
    });
  }

  if (!schema.properties) {
    return schema;
  }

  const properties: NonReferenceSchemaObject = schema.properties;

  return {
    ...schema,
    properties:  Object.fromEntries(
      Object.entries(properties).map((
        property : DestructuredProperty
      ) => parseObjectSchema({
        fullExampleJSON: exampleJSON,
        property,
        // eslint-disable-next-line security/detect-object-injection
        propertyExample: schemaExample[property[0]],
      })
      )),
  };
};

const parseArraySchema = ({
  example,
  fullExampleJSON,
  schema,
} : {
  example: unknown,
  fullExampleJSON: string,
  schema: OpenAPIV3.ArraySchemaObject
}) : OpenAPIV3.ArraySchemaObject => {
  const index = fullExampleJSON.search(
    new RegExp(
      '(?:\\[)((.|\\s)*?)(?:\\])',
      'gm'
    )
  );

  if (index < 0) {
    return schema;
  }

  const startingLineNumber = fullExampleJSON
    .substring(0, index)
    .split('\n')
    .length;

  const exampleJSON = JSON.stringify(
    example,
    null,
    2,
  );

  const endingLineNumber = (exampleJSON.split('\n')
    .length) + startingLineNumber - 1;

  return {
    ...schema,
    'x-line-numbers': `${startingLineNumber}-${endingLineNumber}`,
  };
};

const parseObjectSchema = ({
  fullExampleJSON,
  property,
  propertyExample,
} : {
  fullExampleJSON: string,
  property: DestructuredProperty,
  propertyExample: unknown,
}) : DestructuredProperty => {
  const propertyName: string = property[0];
  const propertyObj: NonReferenceSchemaObject = property[1];

  let PropertyExampleRegex: RegExp;

  switch(propertyObj.type) {
  case 'object':
    // eslint-disable-next-line security/detect-non-literal-regexp
    PropertyExampleRegex = new RegExp(
      `(?:"${propertyName}": {)((.|\\s)*?)(?:})`,
      'gm'
    );
    break;
  case 'array':
    // eslint-disable-next-line security/detect-non-literal-regexp
    PropertyExampleRegex = new RegExp(
      `(?:"${propertyName}": \\[)((.|\\s)*?)(?:\\])`,
      'gm'
    );
    break;
  default:
    PropertyExampleRegex = RegExp(
      `(?:"${propertyName}": )(.*?)(?:\\n)`,
      'gm'
    );
  }

  const index = fullExampleJSON.search(PropertyExampleRegex);

  if (index < 0) {
    return property;
  }

  const startingLineNumber = fullExampleJSON
    .substring(0, index)
    .split('\n')
    .length;

  const propertyExampleJSON = JSON.stringify(
    propertyExample,
    null,
    2,
  );

  const endingLineNumber = (propertyExampleJSON.split('\n')
    .length) + startingLineNumber - 1;

  return [
    propertyName,
    {
      ...propertyObj,
      'x-line-numbers': startingLineNumber === endingLineNumber
        ? startingLineNumber.toString()
        : `${startingLineNumber}-${endingLineNumber}`,
    },
  ];
};

export default (spec: OpenAPIV3.Document): OpenAPIV3.Document => {
  if (!spec.components?.schemas) {
    return spec;
  }

  return {
    ...spec,
    components: {
      ...spec.components,
      schemas:  Object.fromEntries(
        Object.entries(spec.components.schemas).map((schema : [
          string,
          OpenAPIV3.SchemaComponentObject,
        ]) => ([
          schema[0],
          parseSchema(schema[1]),
        ])),
      ),
    },
  };
};
