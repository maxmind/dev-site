import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from './Footnote.module.scss';

interface IFootnote {
  children: string;
}

const Footnote: React.FC<IFootnote> = (props) => {
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
  children: PropTypes.string.isRequired,
};

export default Footnote;
