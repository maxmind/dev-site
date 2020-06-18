/* eslint-disable import/namespace, import/named */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React from 'react';

import * as components from './src/components/mdx';
import { StoreProvider } from './src/store';


/**
 * Export the root element with wrapped providers
 */
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

/**
 * Ensure that Reach Router honors url hash ids
 */
export const onRouteUpdate = (props) => {
  if (props.location.hash) {
    setTimeout(() => {
      document.querySelector(props.location.hash).scrollIntoView();
    }, 0);
  }
};
