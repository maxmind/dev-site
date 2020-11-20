import { mount } from 'enzyme';
import * as React from 'react';

import Footer from './Footer';

describe('Footer', () => {
  it('has no Pa11y violations', async () => {
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
