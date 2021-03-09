import { ReactWrapper } from 'enzyme';
import { Link } from 'gatsby';
import * as React from 'react';

import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';
import SchemaContext from './SchemaContext';

import styles from './Property.module.scss';

const withContext = (element: React.ReactElement) => global.mountWithRouter(
  <SchemaContext.Provider
    value={{
      id: '',
      json: {},
      jsonPointer: '',
    }}
  >
    {element}
  </SchemaContext.Provider>
);

describe('<Property />', () => {
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
          type="object"
        >
          <Property
            name={name}
            services="*"
            type="string"
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

  describe('a description', () => {
    it('is not shown if component has no children', () => {
      const component = withContext(
        <Property
          name="foo"
          type="string"
        />
      );

      expect(component.find(`.${styles.description}`)).not.toExist();
    });

    it('is shown if component has children', () => {
      const component = withContext(
        <Property
          name="foo"
          type="string"
        >
          <P>This is a property!</P>
        </Property>
      );

      expect(component.find(`.${styles.description}`)).toExist();
    });
  });

  describe('an example', () => {
    it('is not shown if `example` property exists', () => {
      const component = withContext(
        <Property
          name="foo"
          type="string"
        />
      );

      expect(component.find('Example')).not.toExist();
    });

    it('is shown if `example` property exists', () => {
      const component = withContext(
        <Property
          name="foo"
          type="string"
        />
      );

      expect(component.find('Example')).toExist();
    });

    it(
      'if `type` is `array<object>`, the `example` value is formatted json',
      () => {
        const component = withContext(
          <Property
            name="foo"
            type="array<object>"
          />
        );

        const exampleValue = component.find('Example').props().children;

        expect(exampleValue).toBe(JSON.stringify([
          {
            foo: 'bar',
          },
        ], null, 2));
      }
    );

    it('if `type` is `object`, the `example` value is formatted json', () => {
      const component = withContext(
        <Property
          name="foo"
          type="object"
        />
      );

      const exampleValue = component.find('Example').props().children;

      expect(exampleValue).toBe(JSON.stringify({
        foo: 'bar',
      }, null, 2));
    });

    it(
      // eslint-disable-next-line max-len
      'if `type` is `string`, the `example` value is formatted is wrapped in quotes',
      () => {
        const component = withContext(
          <Property
            name="foo"
            type="string"
          />
        );

        const exampleValue = component.find('Example').props().children;

        expect(exampleValue).toBe('"foo"');
      }
    );

    it.each([
      [
        'boolean',
        'true',
      ],
      [
        'integer',
        '1',
      ],
      [
        'number',
        '0.1',
      ],
    ])(
      'if `type` is `%s`, the `example` value is not formatted',
      (type, example) => {
        const component = withContext(
          <Property
            name="foo"
            type={type as SchemaPropertyType}
          />
        );

        const exampleValue = component.find('Example').props().children;

        expect(exampleValue).toBe(example);
      }
    );
  });

  describe('tags section', () => {
    it(
      // eslint-disable-next-line max-len
      'is not shown if `linkToSchemaName`, `services`, and `tags`  props are undefined',
      () => {
        const component = withContext(
          <Property
            name="foo"
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).not.toExist();
      }
    );

    describe('is shown if', () => {
      fit('`linkToSchemaName` is defined', () => {
        const component = withContext(
          <Property
            linkToSchemaName={'Foo'}
            name="foo"
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });

      it('`services` is defined', () => {
        const component = withContext(
          <Property
            name="foo"
            services="*"
            type="string"
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
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });
    });

    it('lists service tags', () => {
      const component = withContext(
        <Property
          name="foo"
          type="string"
        />
      );

      expect(component.find('ServiceTags')).toExist();
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
            type="string"
          />
        );

        schemaTags = component.find('Tag')
          .filter(`.${styles['tags__schema-tag']}`);
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
