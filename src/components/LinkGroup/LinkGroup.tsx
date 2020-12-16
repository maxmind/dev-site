import PropTypes from 'prop-types';
import * as React from 'react';

import styles from './LinkGroup.module.scss';

export interface ILinkGroup {
  children: React.ReactNode;
  heading: string;
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
      className={styles.cards}
    >
      {React.Children.map(
        props.children,
        (child: any, index) => React.cloneElement(child, {
          className: styles.card,
          key: index,
        })
      )}
    </div>
  </section>
);

LinkGroup.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

export default LinkGroup;
