import { useLocation } from '@reach/router';
import { mount  } from 'enzyme';
import * as React from 'react';

import TableOfContents, { IItem } from './TableOfContents';

(useLocation as jest.Mock).mockReturnValue({
  hash: '',
  key: '',
  pathname: '/',
  search: '',
  state: {},
});

const items: IItem[] = [
  {
    items: [
      {
        items: [],
        title: 'Foo',
        url: '#',
      },
    ],
    title: 'Foo',
    url: '#',
  },
];

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}));

describe('TableOfContents', () => {
  it('has no Pa11y violations', async () => {
    const component = mount(
      <TableOfContents
        items={items}
      />
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
    expect(results).toHaveNoPa11yViolations();
  });
});
