import { Link } from 'gatsby';
import React from 'react';

import Image from '../components/Image';
import Layout from '../components/Layout';

const IndexPage: React.FC = () => (
  <Layout
    title="Home"
  >
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Image />
    <Link
      to="/page-2/"
    >
      Go to page 2
    </Link>
  </Layout>
);

export default IndexPage;
