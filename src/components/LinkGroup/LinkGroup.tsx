import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import { ILinkGroupCard } from './LinkGroupCard';

import * as styles from './LinkGroup.module.scss';

export interface ILinkGroup {
  children: React.ReactElement<ILinkGroupCard>
    | React.ReactElement<ILinkGroupCard>[];
  heading?: string;
  isCompact?: boolean
}

const LinkGroup: React.FC<ILinkGroup> = (props) => (
  <section
    className={styles.section}
  >
    {props.heading && (
      <h3
        className={styles.sectionHeading}
      >
        {props.heading}
      </h3>
    )}
    <div
      className={classNames(
        styles.cards,
        {
          [styles['cards__isCompact']]: props.isCompact,
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
  heading: PropTypes.string,
  isCompact: PropTypes.bool,
};

export default LinkGroup;
