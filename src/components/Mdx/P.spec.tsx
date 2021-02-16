import { mount  } from 'enzyme';
import * as React from 'react';

import P from './P';

describe('<P />', () => {
  it('passes default `<p>` props to child', () => {
    const component = mount(
      <P
        title="foo"
      >
        Foo
      </P>
    );
    expect(component.find('P').props().title).toBe('foo');
  });
});
