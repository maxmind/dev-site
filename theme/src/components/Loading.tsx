import React from 'react';

import * as styles from './Loading.module.scss';

const Loading: React.FC = () => (
  <div
    className={styles.image}
  >
    <div
      className={styles.dotContainer}
    >
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
    </div>
    <div
      className={styles.dotContainer}
    >
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
    </div>
    <div
      className={styles.dotContainer}
    >
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
    </div>
  </div>
);

export default Loading;
