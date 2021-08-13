import { ReactWrapper } from 'enzyme';
import * as React from 'react';

import Link from '../Link';
import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';
import SchemaContext from './SchemaContext';

import * as styles from './Property.module.scss';

const json = {
  arr: [
    'foo',
    'bar',
  ],
  boolean: true,
  null: null,
  number: 42,
  obj: {
    bar: 'bar',
    foo: 'foo',
  },
  string: 'string',
};

const withContext = (element: React.ReactElement) => global.mountWithRouter(
  <SchemaContext.Provider
    value={{
      id: '',
      json,
      jsonPointer: '',
    }}
  >
    {element}
  </SchemaContext.Provider>
);

describe('<Property />', () => {
  it('can be marked as deprecated', () => {
    const component1 = withContext(
      <Property
        name="string"
      />
    );

    expect(component1.find(`.${styles.deprecated}`)).not.toExist();

    const component2 = withContext(
      <Property
        isDeprecated
        name="string"
      />
    );

    expect(component2.find(`.${styles.deprecated}`).first()).toExist();
  });

  describe('is linkable', () => {
    const name = 'bar';
    const schemaId = 'foo';
    const propertyId = `schema--${schemaId}__${name}`;
    let component: ReactWrapper;

    beforeAll(() => {
      component = global.mountWithRouter(
        <Schema
          json={{
            bar: 'bar',
            baz: {
              baz: 'baz',
            },
            foo: 'foo',
          }}
          jsonPointer="/"
          name="Foo"
          productFamily="minfraud"
        >
          <Property
            name={name}
            services="*"
          />
        </Schema>
      );
    });

    it('adds correct `id` to property container', () => {
      expect(
        component.find(`[id="${propertyId}"]`)
      ).toExist();
    });

    it('has a <Link /> component', () => {
      expect(component.find(Link)).toExist();
    });

    describe('<Link /> component', () => {
      let link: any;

      beforeAll(() => {
        link = component.find('Property').find(Link);
      });

      it('has correct `to` value', () => {
        expect(link.props().to).toBe(`#${propertyId}`);
      });

      it('has correct text value', () => {
        expect(link.text()).toBe(name);
      });
    });
  });

  describe('a type', () => {
    it('is inferred if no type property is defined', () => {
      const component = withContext(
        <Property
          name="string"
        />
      );

      expect(component.find(`.${styles.type}`).first().text()).toBe('string');
    });

    it('can be defined on the `Property` component', () => {
      const component = withContext(
        <Property
          name="string"
          type="object"
        />
      );

      expect(component.find(`.${styles.type}`).first().text()).toBe('object');
    });
  });

  describe('a description', () => {
    it('is not shown if component has no children', () => {
      const component = withContext(
        <Property
          name="foo"
        />
      );

      expect(component.find(`.${styles.description}`)).not.toExist();
    });

    it('is shown if component has children', () => {
      const component = withContext(
        <Property
          name="foo"
        >
          <P>This is a property!</P>
        </Property>
      );

      expect(component.find(`.${styles.description}`)).toExist();
    });
  });

  describe('an example', () => {
    it('is not shown if schema json is not an object', () => {
      const component = global.mountWithRouter(
        <SchemaContext.Provider
          value={{
            id: '',
            json: '',
            jsonPointer: '',
          }}
        >
          <Property
            name="foo"
          />
        </SchemaContext.Provider>
      );

      expect(component.find('Example')).not.toExist();
    });

    it('is not shown if property name does not exist in schema json', () => {
      const component = withContext(
        <Property
          name="foo"
        />
      );

      expect(component.find('Example')).not.toExist();
    });

    it('is not shown if property name has null value', () => {
      const component = withContext(
        <Property
          name="null"
        />
      );

      expect(component.find('Example')).not.toExist();
    });

    it('contains stringified json for object properties', () => {
      const component = withContext(
        <Property
          name="obj"
        />
      );

      const exampleValue = component.find('Example').first().text();
      expect(exampleValue).toContain(JSON.stringify(json.obj, null, 2));
    });

    it('contains stringified json for array properties', () => {
      const component = withContext(
        <Property
          name="arr"
        />
      );

      const exampleValue = component.find('Example').first().text();
      expect(exampleValue).toContain(JSON.stringify(json.arr, null, 2));
    });

    it('contains quotes around for string properties', () => {
      const component = withContext(
        <Property
          name="string"
        />
      );

      const exampleValue = component.find('Example').first().text();
      expect(exampleValue).toEqual(expect.stringMatching(/\s+"string"/));
    });

    it('stringifies boolean values', () => {
      const component = withContext(
        <Property
          name="boolean"
        />
      );

      const exampleValue = component.find('Example').first().text();
      const regex = new RegExp(/\s+true/);

      expect(regex.test(exampleValue)).toBe(true);
    });

    it('does not format numbers', () => {
      const component = withContext(
        <Property
          name="number"
        />
      );

      const exampleValue = component.find('Example').first().text();
      const regex = new RegExp(/\s+42/);

      expect(regex.test(exampleValue)).toBe(true);
    });
  });

  describe('tags section', () => {
    describe('is not shown if', () => {
      it(
        '`linkToSchemaName`, `services`, and `tags` props are undefined',
        () => {
          const component = withContext(
            <Property
              name="foo"
            />
          );

          expect(component.find(`.${styles.tags}`)).not.toExist();
        }
      );

      it('`isDeprecated` prop is true', () => {
        const component = withContext(
          <Property
            isDeprecated
            name="foo"
            services="*"
          />
        );

        expect(component.find(`.${styles.tags}`)).not.toExist();
      });
    });

    describe('is shown if', () => {
      it('`linkToSchemaName` is defined', () => {
        const component = withContext(
          <Property
            linkToSchemaName={'Boolean'}
            name="boolean"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });

      it('`services` is defined', () => {
        const component = withContext(
          <Property
            name="foo"
            services="*"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });

      it('`tags` is defined', () => {
        const component = withContext(
          <Property
            name="foo"
            tags={{
              foo: 'foo',
            }}
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });
    });

    describe('lists service tags', () => {
      it('for `geoip` product family', () => {
        const component = global.mountWithRouter(
          <Schema
            json={{
              bar: 'bar',
              baz: {
                baz: 'baz',
              },
              foo: 'foo',
            }}
            jsonPointer="/"
            name="Foo"
            productFamily="geoip"
          >
            <Property
              name="Bar"
              services="*"
            />
          </Schema>
        );

        expect(component.find('GeoIpServiceTags')).toExist();
      });

      it('for `minfraud` product family', () => {
        const component = global.mountWithRouter(
          <Schema
            json={{
              bar: 'bar',
              baz: {
                baz: 'baz',
              },
              foo: 'foo',
            }}
            jsonPointer="/"
            name="Foo"
            productFamily="minfraud"
          >
            <Property
              name="Bar"
              services="*"
            />
          </Schema>
        );

        expect(component.find('MinFraudServiceTags')).toExist();
      });
    });

    describe('schema tags', () => {
      let schemaTags: ReactWrapper;

      beforeAll(() => {
        const component = withContext(
          <Property
            name="foo"
            tags={{
              bar: 'bar',
              baz: null,
              foo: 'foo',
            }}
          />
        );

        schemaTags = component.find('Tag')
          .filter(`.${styles['tags__schemaTag']}`);
      });

      it('are listed', () => {
        expect(schemaTags.length).toBe(3);
      });

      it('text is key / value pairs', () => {
        expect(schemaTags.at(0).text()).toBe('bar: bar');
        expect(schemaTags.at(2).text()).toBe('foo: foo');
      });

      it('keys without values only show key', () => {
        expect(schemaTags.at(1).text()).toBe('baz');
      });
    });
  });
});
