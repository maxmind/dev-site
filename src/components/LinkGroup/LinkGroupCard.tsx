import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';
import { IconType } from 'react-icons';

import styles from './LinkGroupCard.module.scss';

export interface ILinkGroupCard {
  className?: string;
  description: string;
  heading: string;
  icon: IconType,
  to: string;
}

const LinkGroupCard: React.FC<ILinkGroupCard> = (props) => {
  const { icon: Icon } = props;
  return (
    <Link
      className={classNames(
        styles.container,
        props.className,
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
      <div
        className={styles.description}
      >
        {props.description}
      </div>
    </Link>
  );
};

LinkGroupCard.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkGroupCard;
