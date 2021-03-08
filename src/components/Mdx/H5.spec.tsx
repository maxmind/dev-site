import { mount  } from 'enzyme';
import * as React from 'react';

import H5 from './H5';

describe('<H5 />', () => {
  it('passes default `<h5>` props to child', () => {
    const component = mount(
      <H5
        title="foo"
      >
        Foo
      </H5>
    );
    expect(component.find('H5').props().title).toBe('foo');
  });
});
