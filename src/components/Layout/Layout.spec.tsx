import 'jest-pa11y/build/extendExpect';

import { useLocation } from '@reach/router';
import { mount } from 'enzyme';
import { useStaticQuery } from 'gatsby';
import { configurePa11y } from 'jest-pa11y';
import { recorders } from 'jest-style-transformer-utils';
import * as React from 'react';

import Layout from './Layout';

(useLocation as jest.Mock).mockReturnValue({
  hash: '',
  key: '',
  pathname: '/',
  search: '',
  state: {},
});

(useStaticQuery as jest.Mock).mockReturnValue({
  site: {
    siteMetadata: {
      description: 'description',
    },
  },
});

xdescribe('Layout', () => {
  it('has no Pa11y violations', async () => {
    const pa11y = configurePa11y();

    const component = mount(
      <Layout
        isSidebarOpen={true}
        title="foo"
      >
        Foo
      </Layout>
    );

    const html = `
      <style>${recorders.styles.get()}</style>
      ${component.html()}
    `;

    const results = await pa11y(html);

    await (global as any).page.screenshot({
      fullPage: true,
      path: 'foo.png',
    });

    expect(results).toHaveNoPa11yViolations();
  });
});
