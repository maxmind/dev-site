import PropTypes from 'prop-types';
import React from 'react';

import Article from '../components/Article';
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
    readonly parent: {
      modifiedTime: string;
    };
    readonly prefix: string;
    readonly tableOfContents: ITableOfContents;
    readonly timeToRead: number;
  };
}

const Page: React.FC<IPage> = (props) => {
  const {
    frontmatter,
    parent,
    tableOfContents,
    timeToRead,
  } = props.pageContext;
  const { description, keywords, title } = frontmatter;
  const { modifiedTime } = parent;

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
    >
      <Article
        lastUpdated={modifiedTime}
        tableOfContents={tableOfContents}
        timeToRead={timeToRead}
        title={title}
      >
        {props.children}
      </Article>
    </Layout>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Page;
