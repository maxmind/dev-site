import { mount  } from 'enzyme';
import * as React from 'react';

import Code from './Code';

describe('<Code />', () => {
  it('passes default `<code>` props to child', () => {
    const component = mount(
      <Code
        title="foo"
      >
        Foo
      </Code>
    );
    expect(component.find('Code').props().title).toBe('foo');
  });
});
