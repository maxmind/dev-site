import { mount  } from 'enzyme';
import * as React from 'react';

import Td from './Td';

describe('<Td />', () => {
  it('passes default `<td>` props to child', () => {
    const component = mount(
      <table>
        <tbody>
          <tr>
            <Td
              title="foo"
            >
              Foo
            </Td>
          </tr>
        </tbody>
      </table>

    );
    expect(component.find('Td').props().title).toBe('foo');
  });
});
