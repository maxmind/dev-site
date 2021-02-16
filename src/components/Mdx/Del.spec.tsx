import { mount  } from 'enzyme';
import * as React from 'react';

import Del from './Del';

describe('<Del />', () => {
  it('passes default `<del>` props to child', () => {
    const component = mount(
      <Del
        title="foo"
      >
        Foo
      </Del>
    );
    expect(component.find('Del').props().title).toBe('foo');
  });
});
