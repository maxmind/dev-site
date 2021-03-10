import { mount } from 'enzyme';
import * as React from 'react';

import Footnote from './Footnote';

describe('<Footnote />', () => {
  it('renders children', () => {
    const text = 'foo';
    const component = mount(
      <Footnote>
        {text}
      </Footnote>
    );

    expect(component.text()).toBe(text);
  });
});
