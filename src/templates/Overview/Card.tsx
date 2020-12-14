import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';
import { IconType } from 'react-icons';

import styles from './Card.module.scss';

interface ICard {
  children: React.ReactNode,
  className?: string;
  heading: string;
  icon: IconType,
  to: string;
}

const Card: React.FC<ICard> = (props) => {
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
        {props.children}
      </div>
    </Link>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  to: PropTypes.string.isRequired,
};

export default Card;
