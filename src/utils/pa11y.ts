import 'jest-pa11y/build/extendExpect';
import '../styles/global.scss';

import { ReactWrapper } from 'enzyme';
import { configurePa11y } from 'jest-pa11y';
import { recorders } from 'jest-style-transformer-utils';

const pa11y = configurePa11y();

export default (
  component: ReactWrapper,
  options = {},
): Promise<any> => pa11y(
  `
    <style>${recorders.styles.get()}</style>
    ${component.html()}
  `,
  options,
);
