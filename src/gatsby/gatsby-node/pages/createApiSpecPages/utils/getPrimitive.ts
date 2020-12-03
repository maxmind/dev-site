import { OpenAPIV3 } from 'openapi-types';

import normalizeObject from './normalizeObject';
import { PrimitiveType } from './primitives';

export default (
  schema: OpenAPIV3.SchemaObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  primitives: Record<PrimitiveType, (param?: any) => void>,
): unknown => {
  const { type, format } = normalizeObject(schema);

  const fn = format
    /* eslint-disable @typescript-eslint/no-explicit-any */
    ? (primitives as any)[`${type}_${format}`]
    : (primitives as any)[(type as string)];
    /* eslint-enable @typescript-eslint/no-explicit-any */

  if (typeof(fn) !== 'function') {
    const fnName = format ? `${type}_${format}` : type;
    throw new Error(`Unknown primative: ${fnName}`);
  }

  return fn(schema);
};
