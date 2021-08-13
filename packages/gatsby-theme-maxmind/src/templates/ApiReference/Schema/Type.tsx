import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Type.module.scss';

interface IType {
  children: React.ReactNode;
  className?: string;
}

const Type: React.FC<IType> = (props) => (
  <span
    className={classNames(
      props.className,
      styles.type
    )}
  >
    {props.children}
  </span>
);

Type.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Type;
