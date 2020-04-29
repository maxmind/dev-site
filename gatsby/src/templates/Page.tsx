import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

interface IPage {children: React.ReactNode;
  pageContext: {
    readonly frontmatter: {
      readonly seo: {
        readonly description: string;
      };
      readonly title: string;
    };
    readonly itemTotal: number;
    readonly page: number;
    readonly pageTotal: number;
    readonly prefix: string;
  };
}

const Page: React.FC<IPage> = (props) => {
  const { seo, title } = props.pageContext.frontmatter;

  return (
    <Layout>
      <SEO
        description={seo?.description}
        title={title}
      />
      {props.children}
    </Layout>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Page;
