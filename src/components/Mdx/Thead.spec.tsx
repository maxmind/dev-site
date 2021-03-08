import { mount  } from 'enzyme';
import * as React from 'react';

import Thead from './Thead';

describe('<Thead />', () => {
  it('passes default `<thead>` props to child', () => {
    const component = mount(
      <table>
        <Thead
          title="foo"
        >
          <tr>
            <th>foo</th>
          </tr>
        </Thead>
      </table>
    );
    expect(component.find('Thead').props().title).toBe('foo');
  });
});
