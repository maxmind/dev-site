import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import ProductIcon from '../../components/ProductIcon';
import { IOverviewContext } from './query';

import * as styles from './Overview.module.scss';

interface IOverview {
  children: React.ReactNode;
  pageContext: IOverviewContext;
}

const Overview: React.FC<IOverview> = (props) => {
  const { frontmatter } = props.pageContext;
  const location = useLocation();
  const { description, icon, keywords, title } = frontmatter;

  let type;

  if (location.pathname.startsWith('/minfraud')) {
    type = 'minfraud';
  }

  if (location.pathname.startsWith('/geoip')) {
    type = 'geoip';
  }

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
      type={type as 'minfraud' | 'geoip'}
    >
      <article>
        <header
          className={styles.header}
        >
          <div
            className={styles.lockup}
          >
            <ProductIcon
              className={styles.icon}
              svg={icon}
            />

            <h1
              className={styles.heading}
              dangerouslySetInnerHTML={{
                __html: frontmatter.title,
              }}
            />

            <h2
              className={styles.subheading}
            >
              {frontmatter.subtitle}
            </h2>
          </div>
        </header>

        <div
          className={styles.content}
        >
          {props.children}
        </div>
      </article>
    </Layout>
  );
};

Overview.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Overview;
