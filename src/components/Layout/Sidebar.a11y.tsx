import 'jest-pa11y/build/extendExpect';

import { useLocation } from '@reach/router';
import { mount  } from 'enzyme';
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
    const results = await pa11y(component);
    expect(results).toHaveNoPa11yViolations();
  });
});
