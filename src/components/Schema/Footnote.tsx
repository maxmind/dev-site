import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from './Footnote.module.scss';

const Footnote: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div
      className={styles.container}
    >
      {children}
    </div>
  );
};

Footnote.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footnote;
