import { mount  } from 'enzyme';
import * as React from 'react';

import H4 from './H4';

describe('<H4 />', () => {
  it('passes default `<h4>` props to child', () => {
    const component = mount(
      <H4
        title="foo"
      >
        Foo
      </H4>
    );
    expect(component.find('H4').props().title).toBe('foo');
  });
});
