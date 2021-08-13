import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from './Tag.module.scss';

interface ITag {
  children: React.ReactNode,
  className?: string,
}

const Tag: React.FC<ITag> = (props) => {
  const { children, className } = props;

  return (
    <span
      className={classNames(
        styles.container,
        className,
      )}
    >
      {children}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Tag;
