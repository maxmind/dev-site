import { MDXProvider } from '@mdx-js/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Th.module.scss';

const Th: React.FC<React.HTMLProps<HTMLTableDataCellElement>> = ({
  className,
  ...props
}) => (
  <th
    className={classNames(className, styles.th)}
    {...props}
  >
    {/* eslint-disable-next-line max-len */ }
    {/* @ts-expect-error: @type for @mdx-js/react has implicit children which is incompat with react 18 */}
    <MDXProvider
      disableParentContext
    >
      {props.children}
    </MDXProvider>
  </th>
);

Th.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Th;
