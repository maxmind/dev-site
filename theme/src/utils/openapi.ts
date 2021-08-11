/* eslint-disable no-prototype-builtins */
import { OpenAPIV3 } from 'openapi-types';

export const formatSchemaName = (schemaPath: string): string => schemaPath
  .split(' | ')
  .map((part: string) => part.trim())
  .join(' › ');

export const isReferenceObject = (
  obj:  OpenAPIV3.Document
    | OpenAPIV3.SchemaObject
    | OpenAPIV3.ReferenceObject
): obj is OpenAPIV3.ReferenceObject => obj.hasOwnProperty('$ref');

export const isDocumentObject = (
  obj:  OpenAPIV3.Document
    | OpenAPIV3.SchemaObject
    | OpenAPIV3.ReferenceObject
): obj is OpenAPIV3.Document => obj.hasOwnProperty('openapi');

export const isSchemaObject = (
  obj:  OpenAPIV3.Document
    | OpenAPIV3.SchemaObject
    | OpenAPIV3.ReferenceObject
): obj is OpenAPIV3.SchemaObject => !isReferenceObject(obj)
  && !isDocumentObject(obj);

export const isArraySchemaObject = (
  obj: OpenAPIV3.SchemaObject
): obj is OpenAPIV3.ArraySchemaObject => isSchemaObject(obj)
  && obj.type === 'array';

export const isNonArraySchemaObject = (
  obj: OpenAPIV3.SchemaObject
): obj is OpenAPIV3.NonArraySchemaObject => !isArraySchemaObject(obj);
