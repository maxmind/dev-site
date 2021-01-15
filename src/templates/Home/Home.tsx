import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import { IHomeContext } from './query';

interface IHome {
  children: React.ReactNode;
  pageContext: IHomeContext;
}

const Home: React.FC<IHome> = (props) => {
  const { frontmatter } = props.pageContext;
  const { description, keywords, title } = frontmatter;

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
    >
      Hello world!
    </Layout>
  );
};

Home.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Home;
