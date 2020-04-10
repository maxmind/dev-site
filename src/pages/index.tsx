import { Link } from 'gatsby';
import React from 'react';

import Image from '../components/Image';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO
      title="Home"
    />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div
      style={{
        marginBottom: '1.45rem',
        maxWidth: '300px',
      }}
    >
      <Image />
    </div>
    <Link
      to="/page-2/"
    >
      Go to page 2
    </Link>
  </Layout>
);

export default IndexPage;
