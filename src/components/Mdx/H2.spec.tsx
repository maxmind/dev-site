import { mount  } from 'enzyme';
import * as React from 'react';

import H2 from './H2';

describe('<H2 />', () => {
  it('passes default `<h2>` props to child', () => {
    const component = mount(
      <H2
        title="foo"
      >
        Foo
      </H2>
    );
    expect(component.find('H2').props().title).toBe('foo');
  });
});
