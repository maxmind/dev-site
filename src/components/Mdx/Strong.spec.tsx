import { mount  } from 'enzyme';
import * as React from 'react';

import Strong from './Strong';

describe('<Strong />', () => {
  it('passes default `<strong>` props to child', () => {
    const component = mount(
      <Strong
        title="foo"
      >
        Foo
      </Strong>
    );
    expect(component.find('Strong').props().title).toBe('foo');
  });
});
