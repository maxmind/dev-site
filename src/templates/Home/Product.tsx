import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FaInfoCircle as InfoIcon } from 'react-icons/fa';

import { p as P } from '../../components/Mdx';
import ProductIcon from '../../components/ProductIcon';

import * as styles from './Product.module.scss';

interface IProduct {
  children: React.ReactNode;
  family: ProductFamily;
  footer: React.ReactNode,
  heading: string;
  icon: string;
  links: React.ReactNode,
  subheading: string;
}

const Product: React.FC<IProduct> = (props) => {
  const {
    children,
    family,
    icon,
    heading,
    footer,
    links,
    subheading,
  } = props;

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles['container__geoip']]: family === 'geoip',
          [styles['container__minfraud']]: family === 'minfraud',
        },
      )}
    >
      <div
        className={styles.header}
      >
        <div
          className={styles.lockup}
        >
          <ProductIcon
            className={styles.icon}
            svg={icon}
          />
          <h2
            className={styles.heading}
          >
            {heading}
          </h2>
          <h3
            className={styles.subheading}
          >
            {subheading}
          </h3>
        </div>
      </div>
      <div
        className={styles.content}
      >
        <P>{children}</P>
      </div>
      <div
        className={styles.links}
      >
        {links}
      </div>
      <div
        className={styles.footer}
      >
        <InfoIcon
          className={styles.infoIcon}
        />
        <P
          className={styles.learnMore}
        >
          {footer}
        </P>
      </div>
    </div>
  );
};

Product.propTypes = {
  children: PropTypes.node.isRequired,
  family: PropTypes.oneOf([
    'minfraud',
    'geoip',
  ] as const).isRequired,
  footer: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  links: PropTypes.node.isRequired,
  subheading: PropTypes.string.isRequired,
};

export default Product;
