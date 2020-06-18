import { Link } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';

const SecondPage: React.FC = () => (
  <Layout
    description="This is page 2."
    title="Page two"
  >
    <p>Welcome to page 2</p>
    <Link
      to="/"
    >
      Go back to the homepage
    </Link>
  </Layout>
);

export default SecondPage;
