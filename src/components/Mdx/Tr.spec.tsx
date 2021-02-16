import { mount  } from 'enzyme';
import * as React from 'react';

import Tr from './Tr';

describe('<Tr />', () => {
  it('passes default `<tr>` props to child', () => {
    const component = mount(
      <table>
        <tbody>
          <Tr
            title="foo"
          >
            <td>foo</td>
          </Tr>
        </tbody>
      </table>
    );
    expect(component.find('Tr').props().title).toBe('foo');
  });
});
