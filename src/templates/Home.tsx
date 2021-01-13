import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout/Layout';

interface IHome {
  children: React.ReactNode;
  pageContext: {
    readonly frontmatter: {
      readonly description: string;
      readonly keywords: string[];
      readonly title: string;
    };
    readonly itemTotal: number;
    readonly page: number;
    readonly pageTotal: number;
    readonly parent: {
      modifiedTime: string;
    };
    readonly prefix: string;
    readonly timeToRead: number;
  };
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
      Hello world.a
    </Layout>
  );
};

Home.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Home;
