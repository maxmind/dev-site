import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FaBook,
  FaClipboardList,
  FaDesktop,
  FaPencilAlt,
  FaQuestionCircle,
  FaRocket,
} from 'react-icons/fa';

import Layout from '../../components/Layout/Layout';
import Card from './Card';
import styles from './Overview.module.scss';

interface IOverview {
  children: React.ReactNode;
  pageContext: {
    readonly frontmatter: {
      readonly description: string;
      readonly keywords: string[];
      readonly title: string;
    };
  };
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
            minFraud Web Services
          </h1>

          <h2
            className={styles.subheading}
          >
            Transaction Risk API
          </h2>
        </header>

        {props.children}

        <div
          className={styles.sections}
        >
          <section
            className={styles.guides}
          >
            <h2
              className={styles['section-heading']}
            >
              Guides
            </h2>
            <div
              className={styles.cards}
            >
              <Card
                className={styles.card}
                heading="Evaluate a Transaction"
                icon={FaRocket}
                to="/"
              >
                Start evaluating your transactions by installing, configuring,
                and using a minFraud API client.
              </Card>
              <Card
                className={styles.card}
                heading="Report Transactions"
                icon={FaPencilAlt}
                to="/"
              >
                Use the Report Transaction API to report chargebacks, false
                positives, suspected fraud, or spam/abuse.
              </Card>
              <Card
                className={styles.card}
                heading="Integrating Device Tracking"
                icon={FaDesktop}
                to="/"
              >
                Capture more data and catch more fraud using our JavaScript
                device tracking library.
              </Card>
            </div>
          </section>

          <section
            className={styles.resources}
          >
            <h2
              className={styles['section-heading']}
            >
              Resources
            </h2>
            <div
              className={styles.cards}
            >
              <Card
                className={styles.card}
                heading="API Reference"
                icon={FaBook}
                to="/"
              >
                Learn about each minFraud service&apos;s request and response
                objects.
              </Card>
              <Card
                className={styles.card}
                heading="Release Notes"
                icon={FaClipboardList}
                to="/"
              >
                Review minFraud release notes to understand changes to the
                minFraud API.
              </Card>
              <Card
                className={styles.card}
                heading="FAQ"
                icon={FaQuestionCircle}
                to="https://support.maxmind.com/minfraud-faq/"
              >
                Capture more data and catch more fraud using our JavaScript
                device tracking library.
              </Card>
            </div>
          </section>
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
