import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import styles from './Overview.module.scss';
import { IOverviewContext } from './query';

interface IOverview {
  children: React.ReactNode;
  pageContext: IOverviewContext;
}

const Overview: React.FC<IOverview> = (props) => {
  const { frontmatter } = props.pageContext;
  const location = useLocation();
  const { description, keywords, title } = frontmatter;

  let type;

  if (location.pathname.startsWith('/minfraud')) {
    type = 'minfraud';
  }

  if (location.pathname.startsWith('/geoip2')) {
    type = 'geoip';
  }

  if (location.pathname.startsWith('/geolite2')) {
    type = 'geolite';
  }

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
      type={type as 'minfraud' | 'geoip'}
    >
      <article
        className={styles.container}
      >
        <header
          className={styles.header}
        >
          <h1
            className={styles.heading}
          >
            {frontmatter.title}
          </h1>

          <h2
            className={styles.subheading}
          >
            {frontmatter.subtitle}
          </h2>
        </header>

        {props.children}
      </article>
    </Layout>
  );
};

Overview.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Overview;
