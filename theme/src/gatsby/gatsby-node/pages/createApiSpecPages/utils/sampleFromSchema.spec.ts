import { OpenAPIV3 } from 'openapi-types';

import document from './openapi.fixture';
import primatives from './primitives';
import sampleFromSchema from './sampleFromSchema';

if (!document.components?.schemas) {
  fail('Fixture must have component schemas');
}

const schemas: OpenAPIV3.SchemaComponentsObject = document.components.schemas;

describe('sampleFromSchema()', () => {
  describe('array schemas', () => {
    describe('`array` type schemas', () => {
      it('by default, return primitive', () => {
        expect(
          sampleFromSchema(schemas.Array)
        ).toStrictEqual([]);
      });

      it('if defined, return `default` value', () => {
        const schema = schemas.ArrayWithDefault as OpenAPIV3.ArraySchemaObject;
        expect(sampleFromSchema(schema)).toStrictEqual(schema.default);
      });

      it('if defined, return `example` value', () => {
        const schema = schemas.ArrayWithExample as OpenAPIV3.ArraySchemaObject;
        expect(sampleFromSchema(schema)).toStrictEqual(schema.example);
      });

      it('handles item references', () => {
        expect(
          sampleFromSchema(schemas.ArrayWithItemReferences)
        ).toStrictEqual([]);
      });

      describe('if schema has `items`', () => {
        it('with no `minLength` or `maxLength`, return one item', () => {
          const schema = schemas.ArrayWithItems as OpenAPIV3.ArraySchemaObject;
          expect(
            sampleFromSchema(schema)
          ).toStrictEqual([
            (schema.items as OpenAPIV3.NonArraySchemaObject).type,
          ]);
        });

        it('with `minLength`, return `minLength` items', () => {
          expect(
            sampleFromSchema(schemas.ArrayWithItemsWithMin)
          ).toStrictEqual([
            'string',
            'string',
            'string',
          ]);
        });

        it('with `maxLength`, return `maxLength` items', () => {
          expect(
            sampleFromSchema(schemas.ArrayWithItemsWithMax)
          ).toStrictEqual([
            'string',
            'string',
            'string',
            'string',
            'string',
          ]);
        });

        describe('with `oneOf`', () => {
          it(
            'with no `minLength` or `maxLength`, return the first item',
            () => {
              expect(
                sampleFromSchema(schemas.ArrayWithItemsOneOf)
              ).toStrictEqual([
                'string',
              ]);
            }
          );

          it(
            // eslint-disable-next-line max-len
            'with `minLength`, return an array containing `minLength` items of first item',
            () => {
              expect(
                sampleFromSchema(schemas.ArrayWithItemsOneOfWithMin)
              ).toStrictEqual([
                'string',
                'string',
                'string',
              ]);
            }
          );

          it(
            // eslint-disable-next-line max-len
            'with `maxLength`, return an array containing `maxLength` items of first item',
            () => {
              expect(
                sampleFromSchema(schemas.ArrayWithItemsOneOfWithMax)
              ).toStrictEqual([
                0,
                0,
                0,
                0,
                0,
              ]);
            }
          );
        });

        describe('with `anyof`', () => {
          it(
            'with no `minLength` or `maxLength`, return the first item',
            () => {
              expect(
                sampleFromSchema(schemas.ArrayWithItemsAnyOf)
              ).toStrictEqual([
                'string',
              ]);
            }
          );

          it(
            // eslint-disable-next-line max-len
            'with `minLength`, return an array filled with `minLength` alternating items',
            () => {
              expect(
                sampleFromSchema(schemas.ArrayWithItemsAnyOfWithMin)
              ).toStrictEqual([
                'string',
                0,
                'string',
              ]);
            }
          );

          it(
            // eslint-disable-next-line max-len
            'with `maxLength`, return an array filled with `maxLength` alternating items',
            () => {
              expect(
                sampleFromSchema(schemas.ArrayWithItemsAnyOfWithMax)
              ).toStrictEqual([
                0,
                'string',
                0,
                'string',
                0,
              ]);
            }
          );
        });
      });
    });
  });

  describe('composite schemas', () => {
    describe('`allOf` schemas', () => {
      it('throws error if item is a reference object', () => {
        expect(
          () => sampleFromSchema(schemas.CompositeWithReference)
        ).toThrow('Ensure that schemas are dereferenced before sampling them');
      });

      it('throws error if item properties are not defined', () => {
        expect(
          () => sampleFromSchema(schemas.Composite)
        ).toThrow('`allOf` schemas must have a type value of `object`');
      });

      it('combines properties into a single object', () => {
        expect(
          sampleFromSchema(schemas.CompositeWithObjects)
        ).toStrictEqual({
          bar: 'bar',
          baz: 'bazbaz',
          foo: 'foo',
          qux: 'string',
        });
      });

      it(
        'handles overlapping objects, using object inheritence and extension',
        () => {
          expect(
            sampleFromSchema(schemas.CompositeWithOverlappingObjects)
          ).toStrictEqual({
            bar: 'string',
            foo: 'foo',
          });
        }
      );

      it('handles nested composite schemas', () => {
        expect(
          sampleFromSchema(schemas.CompositeWithNestedCompositeObjects)
        ).toStrictEqual({
          bar: 'string',
          foo: {
            bar: 'string',
            foo: 'foo',
          },
        });
      });
    });
  });

  describe('non-array schemas', () => {
    describe('`$ref` schemas', () => {
      it('throws error warning that schemas should be deferenced first', () => {
        expect(() => sampleFromSchema(schemas.Ref)).toThrow(
          'Ensure that schemas are dereferenced before sampling them'
        );
      });
    });

    describe('`boolean` type schemas', () => {
      it('by default, return primitive', () => {
        const schema = schemas.Boolean as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.boolean(schema));
      });

      it('if defined, return `default` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.BooleanWithDefault as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.default);
      });

      it('if defined, return `example` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.BooleanWithExample as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.example);
      });
    });

    describe('`integer` type schemas', () => {
      it('by default, return primitive', () => {
        const schema = schemas.Integer as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.integer(schema));
      });

      it('if defined, return `default` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.IntegerWithDefault as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.default);
      });

      it('if defined, return `example` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.IntegerWithExample as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.example);
      });
    });

    describe('`number` type schemas', () => {
      it('by default, return primitive', () => {
        const schema = schemas.Number as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.integer(schema));
      });

      it('if defined, return `default` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.NumberWithDefault as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.default);
      });

      it('if defined, return `example` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.NumberWithExample as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.example);
      });

      it('if format is `decimal`, return `number_decimal` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.NumberWithDecimalFormat as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.integer(schema));
      });

      it('if format is `float`, return `number_float` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.NumberWithFloatFormat as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.integer(schema));
      });

      it('if format is `integer`, return `number_integer` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.NumberWithIntegerFormat as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.integer(schema));
      });
    });

    describe('`object` type schemas', () => {
      it('by default, return primitive', () => {
        const schema = schemas.Object as OpenAPIV3.NonArraySchemaObject;
        expect(
          sampleFromSchema(schema)
        ).toStrictEqual(primatives.object(schema));
      });

      it(
        'if `default` is defined without `properties`, return `default` value',
        () => {
          // eslint-disable-next-line max-len
          const schema = schemas.ObjectWithDefault as OpenAPIV3.NonArraySchemaObject;
          expect(sampleFromSchema(schema)).toBe(schema.default);
        }
      );

      it(
        'if `default` and `properties` are defined, return `properties` values',
        () => {
          expect(
            sampleFromSchema(schemas.ObjectWithDefaultAndProperties)
          ).toStrictEqual({
            bar: 'bar',
            foo: 'foo',
          });
        }
      );

      it(
        'if `example` is defined without `properties`, return `example` value',
        () => {
          // eslint-disable-next-line max-len
          const schema = schemas.ObjectWithExample as OpenAPIV3.NonArraySchemaObject;
          expect(sampleFromSchema(schema)).toBe(schema.example);
        }
      );

      it(
        'if `example` and `properties` are defined, return `example` values',
        () => {
          expect(
            sampleFromSchema(schemas.ObjectWithExampleAndProperties)
          ).toStrictEqual({
            bar: 'barbar',
            foo: 'foofoo',
          });
        }
      );

      it(
        // eslint-disable-next-line max-len
        'if `properties` are defined without `example`, return an object of sampled property values',
        () => {
          expect(
            sampleFromSchema(schemas.ObjectWithProperties)
          ).toStrictEqual({
            bar: 'bar',
            foo: 'foo',
          });
        }
      );

      it(
        // eslint-disable-next-line max-len
        'if `properties` item is defined with `depricated`, exclude property from returned object',
        () => {
          expect(
            sampleFromSchema(schemas.ObjectWithDepricatedProperty)
          ).toStrictEqual({
            bar: 'bar',
          });
        }
      );
    });

    describe('`string` type schemas', () => {
      it('by default, return primative', () => {
        const schema = schemas.String as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.string(schema));
      });

      it('if defined, return `default` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithDefault as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.default);
      });

      it('if defined, return `example` value', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithExample as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(schema.example);
      });

      it('if format is `date`, return `string_date` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithDateFormat as OpenAPIV3.NonArraySchemaObject;
        expect(sampleFromSchema(schema)).toBe(primatives.string_date(schema));
      });

      it(
        'if format is `date-time`, return `string_date-time` primative',
        () => {
          // eslint-disable-next-line max-len
          const schema = schemas.StringWithDateTimeFormat as OpenAPIV3.NonArraySchemaObject;

          expect(
            sampleFromSchema(schema).slice(0, 19)
          ).toBe(
            (primatives['string_date-time'](schema) as string).slice(0, 19)
          );
        }
      );

      it('if format is `email`, return `string_email` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithEmailFormat as OpenAPIV3.NonArraySchemaObject;
        expect(
          sampleFromSchema(schema)
        ).toBe(primatives['string_email'](schema));
      });

      it('if format is `ipv4`, return `string_ipv4` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithIpv4Format as OpenAPIV3.NonArraySchemaObject;
        expect(
          sampleFromSchema(schema)
        ).toBe(primatives['string_ipv4'](schema));
      });

      it('if format is `ip6`, return `string_ipv6` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithIpv6Format as OpenAPIV3.NonArraySchemaObject;
        expect(
          sampleFromSchema(schema)
        ).toBe(primatives['string_ipv6'](schema));
      });

      it('if format is `uuid`, return `string_uuid` primative', () => {
        // eslint-disable-next-line max-len
        const schema = schemas.StringWithUuidFormat as OpenAPIV3.NonArraySchemaObject;
        expect(
          sampleFromSchema(schema)
        ).toBe(primatives['string_uuid'](schema));
      });

      it('if `enum` is set and is empty, throw error', () => {
        expect(() => sampleFromSchema(schemas.EnumEmpty))
          .toThrow('No enumerated types defined for schema');
      });

      it(
        'if `enum` is set and is not empty, return the first `enum` value',
        () => {
          // eslint-disable-next-line max-len
          const schema = schemas.EnumNonEmpty as OpenAPIV3.NonArraySchemaObject;
          expect(
            sampleFromSchema(schema)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ).toBe((schema.enum as any[])[0]);
        }
      );
    });
  });
});
