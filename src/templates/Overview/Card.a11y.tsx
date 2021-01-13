import { mount  } from 'enzyme';
import * as React from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';

import Card from './Card';

describe('Card', () => {
  it('type of `error` has no Pa11y violations', async () => {
    const component = mount(
      <Card
        heading="Foo"
        icon={FaArrowCircleLeft}
        to={'foo'}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Card>
    );
    const results = await pa11y(component, {
      ignore: [
        // This component should be inserted into a region
        'region',

        /**
         * Ignore heading structure. This component is used with other
         * components to provide a valid heading structure.
         */
        'WCAG2AAA.Principle1.Guideline1_3.1_3_1_AAA.G141',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
