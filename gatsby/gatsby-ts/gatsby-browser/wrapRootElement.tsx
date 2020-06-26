import { MDXProvider } from '@mdx-js/react';
import { GatsbyBrowser, WrapRootElementBrowserArgs } from 'gatsby';
import React from 'react';

import * as components from '../../src/components/mdx';
import { StoreProvider } from '../../src/store';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  props: WrapRootElementBrowserArgs
) => (
  <MDXProvider
    components={components}
  >
    <StoreProvider>
      {props.element}
    </StoreProvider>
  </MDXProvider>
);
