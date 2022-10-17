import { MDXProvider } from '@mdx-js/react';
import { GatsbySSR, WrapRootElementNodeArgs } from 'gatsby';
import React from 'react';
import { IconContext } from 'react-icons';

import * as components from '../../components/Mdx';
import { StoreProvider } from '../../store';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = (
  props: WrapRootElementNodeArgs
): any => ( // eslint-disable-line @typescript-eslint/no-explicit-any
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
