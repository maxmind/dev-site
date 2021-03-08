import { mount  } from 'enzyme';
import * as React from 'react';

import H3 from './H3';

describe('<H3 />', () => {
  it('passes default `<h3>` props to child', () => {
    const component = mount(
      <H3
        title="foo"
      >
        Foo
      </H3>
    );
    expect(component.find('H3').props().title).toBe('foo');
  });
});
