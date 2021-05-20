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
  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock.resetMocks();
  });

  it('type of `error` has no Pa11y violations', async () => {
    jest.useFakeTimers();
    fetchMock.mockIf(
      /^https:\/\/status\.maxmind\.com.*$/gm,
      () => Promise.resolve({
        body: JSON.stringify({
          result: {
            status_overall: {
              status: 'Operational',
              status_code: 100,
              updated: '2021-05-10T17:39:33.411Z',
            },
          },
        }),
        headers: [
          [
            'Content-Type',
            'application/json',
          ],
        ],
      })
    );

    const component = mount(
      <Overview
        pageContext={{
          frontmatter: {
            description: 'Foo',
            draft: false,
            icon: 'DatabaseIcon',
            keywords: [],
            subtitle: 'This is a test!',
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
        '#content > article > header > div > h1',
        '#content > article > header > div > h2',
      ].join(', '),
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
