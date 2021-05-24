import * as React from 'react';
import { FaRegSurprise as O } from 'react-icons/fa';

import Layout from '../components/Layout/Layout';
import { p as P } from '../components/Mdx';

import * as styles from './FourOhFour.module.scss';

const NotFoundPage: React.FC = () => (
  <Layout
    hasSidebar={false}
    title="404: Not found"
  >
    <div
      aria-label="404"
      className={styles.fourOhFour}
      role="img"
    >
      4
      <O />
      4
    </div>
    <P
      className={styles.message}
    >
      It seems we can’t find what you’re looking for. Perhaps searching can
      help.
    </P>
  </Layout>
);

export default NotFoundPage;
