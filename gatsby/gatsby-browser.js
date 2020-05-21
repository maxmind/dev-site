/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React from 'react';

import * as components from './src/components';

export const wrapRootElement = (props) => (
  <MDXProvider
    components={components}
  >
    {props.element}
  </MDXProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.instanceOf(React.ReactElement),
};
