import { mount } from 'enzyme';
import * as React from 'react';

import GeoIpSchema from './GeoIpSchema';

describe('<GeoIpSchema />', () => {
  it('passes props to schema component', () => {
    const props = {
      children: (
        <p>Foo</p>
      ),
      json:{
        foo: 'foo',
      },
      jsonPointer: '/',
      name: 'Foo',
      services: '*' as GeoIpServices,
    };
    const component = mount(
      <GeoIpSchema
        {...props}
      />
    );

    const schemaComponent = component.find('Schema');

    expect(schemaComponent.props()).toStrictEqual({
      ...props,
      productFamily: 'geoip',
    });
  });
});
