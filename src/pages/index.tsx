import { Link } from 'gatsby';
import React from 'react';

import Image from '../components/Image';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import styles from './index.module.scss';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO
      title="Home"
    />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div
      className={styles.container}
    >
      <Image />
    </div>
    <Link
      to="/page-2s/"
    >
      Go to page 2
    </Link>
  </Layout>
);

export default IndexPage;
