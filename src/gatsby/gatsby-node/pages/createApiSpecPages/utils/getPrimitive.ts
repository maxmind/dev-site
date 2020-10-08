import { OpenAPIV3 } from 'openapi-types';

import normalizeObject from './normalizeObject';
import { PrimitiveType } from './primitives';

export default (
  schema: OpenAPIV3.SchemaObject,
  primitives: Record<PrimitiveType, Function>,
): unknown => {
  const { type, format } = normalizeObject(schema);

  const fn = format
    ? (primitives as any)[`${type}_${format}`]
    : (primitives as any)[(type as string)];

  if (typeof(fn) !== 'function') {
    const fnName = format ? `${type}_${format}` : type;
    throw new Error(`Unknown primative: ${fnName}`);
  }

  return fn(schema);
};
