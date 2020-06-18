/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
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

import cheerio from 'cheerio';
import crypto from 'crypto';
import fs from 'fs';
import { renderToString } from 'react-dom/server';

export const replaceRenderer = (props) => {
  const $ = cheerio.load(renderToString(props.bodyComponent));
  const cssRules = [];

  const $elements = $('[style]');

  $elements.map((_, element) => {
    const $element = $(element);
    const styles = $element.attr('style');
    const className = `inlined__${crypto
      .randomBytes(4)
      .toString('hex')
    }`;
    $element.addClass(className);
    cssRules.push(`.${className} { ${styles}; }`);
    $element.removeAttr('style');
  });

  // eslint-disable-next-line quotes
  const css = cssRules.join("\n");

  const filenameHash = crypto
    .randomBytes(10)
    .toString('hex');

  const cssFileNameBase = props.pathname
    .replace(/^\/|\/$/g, '')
    .replace('/', '--')
    .replace('.html', '');

  const cssFileName =
    `inline---${cssFileNameBase || 'index'}.${filenameHash}.css`;

  const integrityHash = crypto
    .createHash('sha512')
    .update(css)
    .digest('base64');

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(`public/${cssFileName}`, css, 'utf-8');

  props.setHeadComponents(
    <link
      href={`/${cssFileName}`}
      integrity={`sha512-${integrityHash}`}
      rel="stylesheet"
      type="text/css"
    />
  );

  props.replaceBodyHTMLString($('body').html());
};
