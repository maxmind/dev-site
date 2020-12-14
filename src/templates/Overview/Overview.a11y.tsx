import { useLocation } from '@reach/router';
import { mount  } from 'enzyme';
import { useStaticQuery } from 'gatsby';
import * as React from 'react';

import Overview from './Overview';

(useLocation as jest.Mock).mockReturnValue({
  hash: '',
  key: '',
  pathname: '/minfraud/foo/bar',
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

describe('Overview', () => {
  it('type of `error` has no Pa11y violations', async () => {
    const component = mount(
      <Overview
        pageContext={{
          frontmatter: {
            description: 'Foo',
            keywords: [],
            title: 'Foo',
          },
        }}
      >
        afsfsd
      </Overview>
    );
    const results = await pa11y(component, {
      hideElements: [
        /**
         * Skip testing for these two heading elements, which have a gradient
         * background and drop shadow behind the text. Pa11y doesn't take these
         * properties into account when asserting contrast.
         */
        '#content > article > header > h1',
        '#content > article > header > h2',
      ].join(', '),
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
