import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import { ITableOfContents } from '../components/TableOfContents';

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
    readonly tableOfContents: ITableOfContents;
  };
}

const Page: React.FC<IPage> = (props) => {
  const { frontmatter, tableOfContents } = props.pageContext;
  const { description, keywords, title } = frontmatter;

  return (
    <Layout
      description={description}
      keywords={keywords}
      tableOfContents={tableOfContents}
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
