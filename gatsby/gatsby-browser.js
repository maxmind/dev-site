/* eslint-disable import/namespace, import/named */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React from 'react';

import * as components from './src/components';
import { StoreProvider } from './src/store';

export const wrapRootElement = (props) => (
  <MDXProvider
    components={components}
  >
    <StoreProvider>
      {props.element}
    </StoreProvider>
  </MDXProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.instanceOf(React.ReactElement),
};
