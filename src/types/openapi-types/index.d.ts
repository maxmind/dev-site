/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OpenAPIV3 as OriginalOpenAPIV3 } from 'openapi-types';

declare module 'openapi-types' {
  export namespace OpenAPIV3 {
    interface BaseSchemaObject {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'x-compiled-example'?: any;
      'x-line-numbers'?: string;
    }

    type PropertyObject = OriginalOpenAPIV3.ReferenceObject | OriginalOpenAPIV3.SchemaObject;

    interface PropertiesObject {
      [name: string]: PropertyObject;
    }

    type SchemaComponentObject = OriginalOpenAPIV3.ReferenceObject | OriginalOpenAPIV3.SchemaObject;

    interface SchemaComponentsObject {
      [key: string]: SchemaComponentObject;
    }

    type CompositeSchemaObject = OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
    type CompositeSchemaObjects = CompositeSchemaObject[];
  }
}

