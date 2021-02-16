import { mount  } from 'enzyme';
import * as React from 'react';

import H6 from './H6';

describe('<H6 />', () => {
  it('passes default `<h6>` props to child', () => {
    const component = mount(
      <H6
        title="foo"
      >
        Foo
      </H6>
    );
    expect(component.find('H6').props().title).toBe('foo');
  });
});
