import { mount  } from 'enzyme';
import * as React from 'react';

import Li from './Li';

describe('<Li />', () => {
  it('passes default `<li>` props to child', () => {
    const component = mount(
      <Li
        title="foo"
      >
        Foo
      </Li>
    );
    expect(component.find('Li').props().title).toBe('foo');
  });
});
