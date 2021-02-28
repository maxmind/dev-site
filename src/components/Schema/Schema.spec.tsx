import * as React from 'react';

import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';

describe('Schema', () => {
  it('renders children', async () => {
    const component = global.mountWithRouter(
      <Schema
        name="Foo"
        type="object"
      >
        <P>This is example text.</P>

        <Property
          name="foo"
          type="string"
        >
          <p>This is a property value.</p>
        </Property>

        <Property
          name="foo"
          type="string"
        >
          <p>This is a property value.</p>
        </Property>
      </Schema>
    );
    expect(component.find('P')).toHaveLength(1);
    expect(component.find('Property')).toHaveLength(2);
  });

  describe('`services` property', () => {
    let component: any;

    beforeEach(() => {
      component = global.mountWithRouter(
        <Schema
          name="Foo"
          services="*"
          type="object"
        >
          <P>This is example text.</P>

          <Property
            name="foo1"
            type="string"
          />

          <Property
            name="foo2"
            services={[
              'factors',
            ]}
            type="string"
          />
        </Schema>
      );
    });

    it(
      // eslint-disable-next-line max-len
      'passes `services` to `Property` children that do not have `service` property',
      () => {
        const property = component.find('Property').at(0);
        const serviceTags = property.find('ServiceTags');
        expect(serviceTags).toHaveLength(1);
        expect(serviceTags.props().services).toBe('*');
      }
    );

    it(
      // eslint-disable-next-line max-len
      '`Property` children that have `services` property defined overrides `service` property of Schema',
      () => {
        const property = component.find('Property').at(1);
        const serviceTags = property.find('ServiceTags');
        expect(serviceTags).toHaveLength(1);
        expect(serviceTags.props().services).toStrictEqual([
          'factors',
        ]);
      }
    );
  });
});
