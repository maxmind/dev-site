import { mount  } from 'enzyme';
import * as React from 'react';

import A from './A';

describe('<A />', () => {
  it('passes default `<a>` props to child', () => {
    const component = mount(
      <A
        href="#foo"
      >
        Foo
      </A>
    );
    expect(component.find('A').props().href).toBe('#foo');
  });

  describe('<ExternalLinkIcon />', () => {
    it('renders if `target="_blank"` is defined', () => {
      const component = mount(
        <A
          target="_blank"
        >
          Foo
        </A>
      );
      expect(component.find('FaExternalLinkAlt')).toHaveLength(1);
    });

    it('does not render if `target="_blank"` is not defined', () => {
      const component = mount(
        <A>
          Foo
        </A>
      );
      expect(component.find('FaExternalLinkAlt')).toHaveLength(0);
    });
  });
});
