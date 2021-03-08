import { mount  } from 'enzyme';
import * as React from 'react';

import Blockquote from './Blockquote';

describe('<Blockquote />', () => {
  it('passes default `<blockquote>` props to child', () => {
    const component = mount(
      <Blockquote
        title="foo"
      >
        Foo
      </Blockquote>
    );
    expect(component.find('Blockquote').props().title).toBe('foo');
  });
});
