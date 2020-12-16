import PropTypes from 'prop-types';
import * as React from 'react';

import styles from './LinkGroup.module.scss';

interface ILinkGroupContainer {
  children: React.ReactNode,
}

const LinkGroupContainer: React.FC<ILinkGroupContainer> = (props) => {
  return(
    <div
      className={styles.sections}
    >
      {props.children}
    </div>
  );
};

LinkGroupContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LinkGroupContainer;
