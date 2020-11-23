import { mount } from 'enzyme';
import * as React from 'react';

import AccessibilityNav from './AccessibilityNav';

describe('AccessibilityNav', () => {
  it('has no Pa11y violations', async () => {
    const component = mount(
      <AccessibilityNav />
    );

    const results = await pa11y(component, {
      ignore: [
        // Ignore missing anchors that are part of other components
        'WCAG2AAA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID',
      ],
    });

    expect(results).toHaveNoPa11yViolations();
  });
});
