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
