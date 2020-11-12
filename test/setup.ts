import 'jest-enzyme';
import 'jest-pa11y/build/extendExpect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter(),
});
