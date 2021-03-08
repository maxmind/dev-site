import { mount  } from 'enzyme';
import * as React from 'react';

import Ol from './Ol';

describe('<Ol />', () => {
  it('passes default `<ol>` props to child', () => {
    const component = mount(
      <Ol
        title="foo"
      >
        Foo
      </Ol>
    );
    expect(component.find('Ol').props().title).toBe('foo');
  });
});
