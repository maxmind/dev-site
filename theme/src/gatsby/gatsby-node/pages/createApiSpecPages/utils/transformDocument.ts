import OpenApiParser from '@apidevtools/swagger-parser';
import cloneDeep from 'lodash/cloneDeep';
import { OpenAPIV3 } from 'openapi-types';

import addCompiledExamples from './addCompiledExamples';
import addLineNumbers from './addLineNumbers';
import sortKeys from './sortKeys';

export default (Spec: OpenAPIV3.Document): Promise<OpenAPIV3.Document> => (
  OpenApiParser.validate(
    cloneDeep(Spec) as OpenAPIV3.Document
  ) as unknown as Promise<OpenAPIV3.Document>
)
  .then(addCompiledExamples)
  .then(addLineNumbers)
  .then((spec: OpenAPIV3.Document) => sortKeys(spec));
