import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';
import { IconType } from 'react-icons';
import { FaArrowRight } from 'react-icons/fa';

import styles from './LinkGroupCard.module.scss';

export interface ILinkGroupCard {
  className?: string;
  description: string;
  heading: string;
  icon: IconType,
  isCompact?: boolean,
  to: string;
}

const LinkGroupCard: React.FC<ILinkGroupCard> = (props) => {
  const { icon: Icon } = props;
  return (
    <Link
      className={classNames(
        styles.container,
        props.className,
        {
          [styles['container--is-compact']]: props.isCompact,
        }
      )}
      to={props.to}
    >
      <Icon
        className={styles.icon}
      />
      <h3
        className={styles.heading}
      >
        {props.heading}
      </h3>
      <p
        className={styles.description}
      >
        {props.description}
      </p>
      <div
        className={styles.arrow}
      >
        <FaArrowRight />
      </div>
    </Link>
  );
};

LinkGroupCard.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  isCompact: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

export default LinkGroupCard;
