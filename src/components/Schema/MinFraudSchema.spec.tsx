import { mount } from 'enzyme';
import * as React from 'react';

import MinFraudSchema from './MinFraudSchema';

describe('<MinFraudSchema />', () => {
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
      services: '*' as MinFraudServices,
    };

    const component = mount(
      <MinFraudSchema
        {...props}
      />
    );

    const schemaComponent = component.find('Schema');

    expect(schemaComponent.props()).toStrictEqual({
      ...props,
      productFamily: 'minfraud',
    });
  });
});
