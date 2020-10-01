import React from 'react';

import Layout from '../components/Layout/Layout';

const NotFoundPage: React.FC = () => (
  <Layout
    title="404: Not found"
  >
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
