import { OpenAPIV3 } from 'openapi-types';

import sampleFromSchema from './sampleFromSchema';

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
          {
            ...schema[1],
            ['x-compiled-example']: sampleFromSchema(
              schema[1] as OpenAPIV3.SchemaObject
            ),
          },
        ])),
      ),
    },
  };
};
