import 'jest-pa11y/build/extendExpect';

import { mount  } from 'enzyme';
import { configurePa11y } from 'jest-pa11y';
import { recorders } from 'jest-style-transformer-utils';
import * as React from 'react';

import Footer from './Footer';

xdescribe('Footer', () => {
  it('has no Pa11y violations', async () => {
    const pa11y = configurePa11y();

    const component = mount(<Footer />);

    const html = `
      <style>${recorders.styles.get()}</style>
      ${component.getDOMNode().outerHTML};
    `;

    const results = await pa11y(html);

    expect(results).toHaveNoPa11yViolations();
  });
});
