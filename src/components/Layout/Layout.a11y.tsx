import { useLocation } from '@reach/router';
import { mount } from 'enzyme';
import { useStaticQuery } from 'gatsby';
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

describe('Layout', () => {
  it('has no Pa11y violations', async () => {
    const component = mount(
      <Layout
        isSidebarOpen={true}
        title="foo"
      >
        Foo
      </Layout>
    );

    const results = await pa11y(
      component,
      {
        ignore: [
          // <h3> tags are appropriate here in the context of other components
          'WCAG2AAA.Principle1.Guideline1_3.1_3_1_AAA.G141',
        ],
      },
    );
    await page.screenshot({
      path: 'foo.png',
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
