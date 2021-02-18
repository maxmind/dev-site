import * as React from 'react';

import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';

describe('Schema', () => {
  it('renders children', async () => {
    const component = global.mountWithRouter(
      <Schema
        name="Foo"
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
        >
          <P>This is example text.</P>

          <Property
            name="foo"
            type="string"
          />

          <Property
            name="foo"
            type="string"
          />

          <Property
            name="foo"
            services={[
              'factors',
            ]}
            type="string"
          />
        </Schema>
      );
    });

    it('does not set `services` property on non-`Property` children', () => {
      expect(component.first('P').props().services).toBeUndefined();
    });

    it(
      // eslint-disable-next-line max-len
      'sets `services` property on `Property` children that do not have `service` property',
      () => {
        const properties = component.find('Property')
          .filterWhere((node: any) => node.props().services === '*');
        expect(properties).toHaveLength(2);
      }
    );

    it(
      // eslint-disable-next-line max-len
      'does not set `services` property on `Property` children that have `services` property',
      () => {
        const properties = component.find('Property')
          .filterWhere((node: any) => node.props().services !== '*');
        expect(properties).toHaveLength(1);
      }
    );
  });
});
