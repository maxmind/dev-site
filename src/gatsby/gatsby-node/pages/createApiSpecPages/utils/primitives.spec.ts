import { OpenAPIV3 } from 'openapi-types';

import primitives from './primitives';

describe('primitives', () => {
  describe('defaultMiddleware()', () => {
    describe('every primitive uses default middleware', () => {
      Object.entries(primitives).forEach(([
        name,
        fn,
      ] : [
        string,
        (schema: OpenAPIV3.SchemaObject) => unknown,
      ]) => {
        it(`\`${name}\` primative uses \`default\` property`, () => {
          const schema: OpenAPIV3.SchemaObject = {
            default: 'foo',
          };
          expect(fn(schema)).toBe(schema.default);
        });

        // eslint-disable-next-line max-len
        it(`\`${name}\` primative uses fallback if no default is defined`, () => {
          const schema: OpenAPIV3.SchemaObject = {};
          expect(fn(schema)).toBeDefined();
        });
      });
    });
  });
});
