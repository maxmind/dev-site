import { mount  } from 'enzyme';
import * as React from 'react';

import Em from './Em';

describe('<Em />', () => {
  it('passes default `<em>` props to child', () => {
    const component = mount(
      <Em
        title="foo"
      >
        Foo
      </Em>
    );
    expect(component.find('Em').props().title).toBe('foo');
  });
});
