import { mount  } from 'enzyme';
import * as React from 'react';

import Th from './Th';

describe('<Th />', () => {
  it('passes default `<th>` props to child', () => {
    const component = mount(
      <table>
        <thead>
          <tr>
            <Th
              title="foo"
            >
              Foo
            </Th>
          </tr>
        </thead>
      </table>
    );
    expect(component.find('Th').props().title).toBe('foo');
  });
});
