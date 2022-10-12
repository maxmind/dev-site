import { MDXProvider } from '@mdx-js/react';
import { GatsbyBrowser, WrapRootElementBrowserArgs } from 'gatsby';
import React from 'react';
import { IconContext } from 'react-icons';

import * as components from '../../components/Mdx';
import { StoreProvider } from '../../store';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  props: WrapRootElementBrowserArgs
) => (
  <IconContext.Provider
    value={{
      className: 'fa-icon',
    }}
  >
    {/* eslint-disable-next-line max-len */ }
    {/* @ts-expect-error: @type for @mdx-js/react has implicit children which is incompat with react 18 */}
    <MDXProvider
      components={components}
    >
      <StoreProvider>
        {props.element}
      </StoreProvider>
    </MDXProvider>
  </IconContext.Provider>
);
