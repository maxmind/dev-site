import 'jest-pa11y/build/extendExpect';
import '../src/styles/global.scss';

import { ReactWrapper } from 'enzyme';
import { configurePa11y } from 'jest-pa11y';
import { recorders } from 'jest-style-transformer-utils';

const _pa11y = configurePa11y();

global.pa11y = (
  component: ReactWrapper,
  options = {},
): Promise<unknown> => _pa11y(
  `
    <style>${recorders.styles.get()}</style>
    ${component.html()}
  `,
  options,
);
