import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import styles from './LinkGroup.module.scss';
import { ILinkGroupCard } from './LinkGroupCard';

export interface ILinkGroup {
  children: React.ReactElement<ILinkGroupCard>
    | React.ReactElement<ILinkGroupCard>[];
  heading: string;
  isCompact?: boolean
}

const LinkGroup: React.FC<ILinkGroup> = (props) => (
  <section
    className={styles.section}
  >
    <h3
      className={styles['section-heading']}
    >
      {props.heading}
    </h3>
    <div
      className={classNames(
        styles.cards,
        {
          [styles['cards--is-compact']]: props.isCompact,
        }
      )}
    >
      {React.Children.map(
        props.children,
        (
          child: React.ReactElement<ILinkGroupCard>,
          index: number,
        ) => React.cloneElement((child), {
          className: styles.card,
          isCompact: props.isCompact,
          key: `link-group-child-${index}`,
        })
      )}
    </div>
  </section>
);

LinkGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired,
  heading: PropTypes.string.isRequired,
  isCompact: PropTypes.bool,
};

export default LinkGroup;
