import { MDXProvider } from '@mdx-js/react';
import { GatsbySSR, WrapRootElementNodeArgs } from 'gatsby';
import React from 'react';

import * as components from '../../src/components/mdx';
import { StoreProvider } from '../../src/store';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = (
  props: WrapRootElementNodeArgs
): any => (
  <MDXProvider
    components={components}
  >
    <StoreProvider>
      {props.element}
    </StoreProvider>
  </MDXProvider>
);
