import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';

interface IPage {
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
    readonly prefix: string;
  };
}

const Page: React.FC<IPage> = (props) => {
  const { description, keywords, title } = props.pageContext.frontmatter;

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
    >
      {props.children}
    </Layout>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Page;
