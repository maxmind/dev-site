import { mount  } from 'enzyme';
import * as React from 'react';

import H1 from './H1';

describe('<H1 />', () => {
  it('passes default `<h1>` props to child', () => {
    const component = mount(
      <H1
        title="foo"
      >
        Foo
      </H1>
    );
    expect(component.find('H1').props().title).toBe('foo');
  });
});
