import { mount  } from 'enzyme';
import * as React from 'react';

import Hr from './Hr';

describe('<Hr />', () => {
  it('passes default `<hr>` props to child', () => {
    const component = mount(
      <Hr
        title="foo"
      />
    );
    expect(component.find('Hr').props().title).toBe('foo');
  });
});
