import { mount } from 'enzyme';
import * as React from 'react';

import ServiceTag from './ServiceTag';

// eslint-disable-next-line css-modules/no-unused-class
import * as styles from './ServiceTag.module.scss';

describe('<ServiceTag />', () => {
  it('renders provided text', () => {
    const component = mount(
      <ServiceTag
        text="Foo"
      />
    );

    expect(
      component.find('ServiceTag').text()
    ).toBe('Foo');
  });

  it('can be disabled', () => {
    const component = mount(
      <ServiceTag
        isDisabled
        text="Foo"
      />
    );

    expect(
      component.find('Tag')
    ).toHaveClassName(styles['tag__disabled']);
  });
});
