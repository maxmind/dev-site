import { mount  } from 'enzyme';
import * as React from 'react';

import Table from './Table';

describe('<Table />', () => {
  it('passes default `<table>` props to child', () => {
    const component = mount(
      <Table
        title="foo"
      >
        <tbody>
          <tr>
            <td>foo</td>
          </tr>
        </tbody>
      </Table>
    );
    expect(component.find('Table').props().title).toBe('foo');
  });
});
