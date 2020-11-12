import 'jest-pa11y/build/extendExpect';

import { useLocation } from '@reach/router';
import { mount  } from 'enzyme';
import { configurePa11y } from 'jest-pa11y';
import { recorders } from 'jest-style-transformer-utils';
import * as React from 'react';

import Sidebar from './Sidebar';

(useLocation as any).mockReturnValue({
  hash: '',
  key: '',
  pathname: '/',
  search: '',
  state: {},
});

xdescribe('Sidebar', () => {
  it('has no Pa11y violations', async () => {
    const pa11y = configurePa11y();

    const component = mount(<Sidebar />);

    const html = `
      <style>${recorders.styles.get()}</style>
      ${component.html()}
    `;

    const results = await pa11y(html);

    expect(results).toHaveNoPa11yViolations();
  });
});
