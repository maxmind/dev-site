import { mount } from 'enzyme';
import * as React from 'react';

import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock.resetMocks();
  });

  it('has no Pa11y violations', async () => {
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

    const component = mount(<Footer />);
    const results = await pa11y(
      component,
      {
        ignore: [
          // <h3> tags are appropriate here in the context of other components
          'WCAG2AAA.Principle1.Guideline1_3.1_3_1_AAA.G141',
        ],
      },
    );
    expect(results).toHaveNoPa11yViolations();
  });
});
