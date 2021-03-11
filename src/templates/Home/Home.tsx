import PropTypes from 'prop-types';
import React from 'react';

import UnderConstruction from '../../assets/svgs/under-construction.svg';
import Layout from '../../components/Layout/Layout';
import { IHomeContext } from './query';

import styles from './Home.module.scss';

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
      <div
        className={styles.container}
      >
        <div
          className={styles['under-construction']}
        >
          <UnderConstruction
            className={styles.icon}
          />
          <span
            className={styles.text}
          >
            <span
              className={styles.dark}
            >
              Under
            </span>
            {' '}
            Construction
          </span>
        </div>
      </div>
    </Layout>
  );
};

Home.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Home;
