import 'jest-pa11y/build/extendExpect';

import { useLocation } from '@reach/router';
import { mount } from 'enzyme';
import * as React from 'react';

import Sidebar from './Sidebar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(useLocation as any).mockReturnValue({
  hash: '',
  key: '',
  pathname: '/',
  search: '',
  state: {},
});

describe('Sidebar', () => {
  it('has no Pa11y violations', async () => {
    const component = mount(<Sidebar />);
    const results = await __pa11y(
      component,
      {
        ignore: [
          // See https://github.com/pa11y/pa11y/issues/623
          'color-contrast',
        ],
      },
    );
    expect(results).toHaveNoPa11yViolations();
  });
});
