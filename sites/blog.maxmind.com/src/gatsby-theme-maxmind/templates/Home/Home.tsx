import Layout from '@theme/components/Layout/Layout';
import LinkButton from '@theme/components/LinkButton';
import { a as A } from '@theme/components/Mdx';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FaBookOpen as ViewDocsIcon,
  FaCode as ContributeIcon,
  FaRocket as QuickstartIcon,
} from 'react-icons/fa';

import Product from './Product';
import { IHomeContext } from './query';

import * as styles from './Home.module.scss';

const queryString = '?lang=en';

interface IHome {
  pageContext: IHomeContext;
}

const Home: React.FC<IHome> = (props) => {
  const { pageContext } = props;
  const { frontmatter } = pageContext;
  const { description, keywords, title } = frontmatter;

  return (
    <Layout
      className={styles.layout}
      description={description}
      hasSidebar={false}
      keywords={keywords}
      title={title}
    >
      <div
        className={styles.callout}
      >
        <h1
          className={styles.calloutHeading}
        >
          <span
            aria-label="waving hand"
            role="img"
          >
            👋
          </span>
          {' '}
          Welcome to the
          {' '}
          <span
            className={styles.noWrap}
          >
            MaxMind Blog
          </span>
          !
        </h1>
      </div>
      <div
        className={styles.products}
      >
        <Product
          family="minfraud"
          footer={(
            <>
              Learn more about
              {' '}
              <A
                href="https://www.maxmind.com/en/solutions/minfraud-services"
              >
                minFraud Web Services
              </A>
              .
            </>
          )}
          heading="minFraud Web Services"
          icon="MinFraudIcon"
          links={(
            <>
              <LinkButton
                Icon={QuickstartIcon}
                text="Quickstart"
                to="/minfraud/evaluate-a-transaction"
              />
              <LinkButton
                Icon={ViewDocsIcon}
                text="View docs"
                to="/minfraud"
              />
            </>
          )}
          subheading="Transaction Risk API"
        >
          Use risk scoring and data to identify high-risk activity in
          e-commerce payments, platform user activity, incentivized traffic,
          and more.
        </Product>
        <Product
          family="geoip"
          footer={(
            <>
              Learn more about
              {' '}
              <A
                // eslint-disable-next-line max-len
                href="https://www.maxmind.com/en/geoip2-services-and-databases"
              >
                GeoIP2
              </A>
              {' '}
              and
              {' '}
              <A
                href={`/geoip/geolite2-free-geolocation-data?${queryString}`}
              >
                GeoLite2
              </A>
              .
            </>
          )}
          heading="GeoIP2 and GeoLite2"
          icon="GeoIPIcon"
          links={(
            <>
              <LinkButton
                Icon={QuickstartIcon}
                text="Quickstart"
                to="/geoip/geolocate-an-ip"
              />
              <LinkButton
                Icon={ViewDocsIcon}
                text="View docs"
                to="/geoip"
              />
            </>
          )}
          subheading="Databases and Web Services"
        >
          Use GeoIP intelligence for content customization, advertising,
          digital rights management, compliance, fraud detection, security and
          more.
        </Product>
      </div>
      <div
        className={styles.contribute}
      >
        <p
          className={styles.contributeCopy}
        >
          <ContributeIcon
            className={styles.contributeIcon}
          />
          Learn how to
          {' '}
          <A
            href="/contribute"
          >
            contribute to the MaxMind community
          </A>
          {' '}
          by developing third-party integrations, tools, and apps.
        </p>
      </div>
    </Layout>
  );
};

Home.propTypes = {
  pageContext: PropTypes.any,
};

export default Home;
