import { mount  } from 'enzyme';
import * as React from 'react';

import Ul from './Ul';

describe('<Ul />', () => {
  it('passes default `<ul>` props to child', () => {
    const component = mount(
      <Ul
        title="foo"
      >
        Foo
      </Ul>
    );
    expect(component.find('Ul').props().title).toBe('foo');
  });
});
