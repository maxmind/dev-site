import OpenApiParser from '@apidevtools/swagger-parser';
import cloneDeep from 'lodash/cloneDeep';
import { OpenAPIV3 } from 'openapi-types';

import sampleFromSchema from './sampleFromSchema';
import sortKeys from './sortKeys';

export default (
  Spec: OpenAPIV3.Document
): Promise<OpenAPIV3.Document> => OpenApiParser.validate(
  cloneDeep(Spec) as any
)
  .then((spec: any): any => {
    Object.entries(spec.components.schemas).map(([
      name,
      schema,
    ]) => {
      if (Spec.components && Spec.components.schemas) {
        // eslint-disable-next-line security/detect-object-injection
        (Spec.components.schemas[name] as any)['x-compiled-example']
          = sampleFromSchema(schema as OpenAPIV3.SchemaObject);

        // eslint-disable-next-line security/detect-object-injection
        if (Spec.components.schemas[name]) {
          // eslint-disable-next-line security/detect-object-injection
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
      const properties = (schema as OpenAPIV3.SchemaObject).properties;

      if (!properties) {
        return;
      }

      Object.keys(properties).map(property => {
        const compiledExample
          // eslint-disable-next-line security/detect-object-injection
          = spec.components.schemas[name]['x-compiled-example'][property];
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
          // eslint-disable-next-line security/detect-object-injection
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

        (
          // eslint-disable-next-line security/detect-object-injection
          spec.components.schemas[name].properties[property] as any
        )['x-line-numbers'] = startingLineNumber === endingLineNumber
          ? startingLineNumber
          : `${startingLineNumber}-${endingLineNumber}`;
      });
    });

    return spec;
  });
