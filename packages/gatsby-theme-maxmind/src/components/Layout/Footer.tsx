import classNames from 'classnames';
import React from 'react';
import { FaLinkedin, FaTwitterSquare } from 'react-icons/fa';

import Logo from '../../assets/svgs/maxmind-footer-logo.svg';
import useSystemStatus from '../../hooks/useSystemStatus';

import * as styles from './Footer.module.scss';

const Footer: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  const systemStatus = useSystemStatus();

  return (
    <footer
      {...props}
      className={styles.footer}
    >
      <div
        className={styles.container}
      >
        <div
          className={styles.branding}
        >
          <a
            aria-label="https://www.maxmind.com"
            className={styles.logo}
            href="https://www.maxmind.com"
          >
            <Logo />
          </a>
          <div
            className={styles.social}
          >
            <a
              aria-label="Twitter"
              className={styles.socialIcon}
              href="https://twitter.com/maxmind"
            >
              <FaTwitterSquare />
            </a>
            <a
              aria-label="LinkedIn"
              className={styles.socialIcon}
              href="https://www.linkedin.com/company/maxmind"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div
          className={classNames(
            styles.group,
            styles['group__products']
          )}
        >
          <h3
            className={styles.heading}
          >
            Products
          </h3>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/solutions/minfraud-services"
          >
            minFraud Services
          </a>
          <a
            className={styles.link}
            // eslint-disable-next-line max-len
            href="https://www.maxmind.com/en/solutions/geoip2-enterprise-product-suite/anonymous-ip-database"
          >
            GeoIP2 Anonymous IP Database
          </a>
          <a
            className={styles.link}
            // eslint-disable-next-line max-len
            href="https://www.maxmind.com/en/solutions/geoip2-enterprise-product-suite/enterprise-database"
          >
            GeoIP2 Enterprise Database
          </a>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/geoip2-precision-services"
          >
            GeoIP2 Precision Services
          </a>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/geoip2-databases"
          >
            GeoIP2 Databases
          </a>
          <a
            className={styles.link}
            href="https://dev.maxmind.com/geoip/geoip2/geolite2"
          >
            GeoLite2 Databases
          </a>
        </div>

        <div
          className={classNames(
            styles.group,
            styles['group__support']
          )}
        >
          <h3
            className={styles.heading}
          >
            Support
          </h3>
          <a
            className={styles.link}
            href="https://support.maxmind.com/"
          >
            Support Center
          </a>
          <a
            className={classNames(
              styles['link'],
              styles.status,
            )}
            href="https://status.maxmind.com/"
            title={systemStatus ? `System Status: ${systemStatus.title}` : ''}
          >
            {systemStatus && (
              <>
                <span
                  className={styles.statusIcon}
                >
                  {systemStatus.icon}
                </span>
                {' '}
              </>
            )}
            <span
              className={styles.statusText}
            >
              System Status
            </span>
          </a>
          <a
            className={styles.link}
            href="https://support.maxmind.com/"
          >
            Frequently Asked Questions
          </a>
          <a
            className={styles.link}
            href="https://support.maxmind.com/geoip-data-correction-request/"
          >
            GeoIP Data Correction Request
          </a>
          <a
            className={styles.link}
            // eslint-disable-next-line max-len
            href="https://www.maxmind.com/en/privacy-policy#additional-disclosures-for-california-residents"
          >
            Do Not Sell My Personal Information
          </a>
          <a
            className={styles.link}
            // eslint-disable-next-line max-len
            href="https://www.maxmind.com/en/privacy-policy#california-notice-of-collection"
          >
            Notice of Collection
          </a>
        </div>

        <div
          className={classNames(
            styles.group,
            styles['group__developers']
          )}
        >
          <h3
            className={styles.heading}
          >
            Developers
          </h3>
          <a
            className={styles.link}
            href="https://dev.maxmind.com/"
          >
            Dev Center
          </a>
          <a
            className={styles.link}
            href="https://dev.maxmind.com/minfraud/"
          >
            minFraud
          </a>
          <a
            className={styles.link}
            href="https://dev.maxmind.com/geoip/"
          >
            GeoIP
          </a>
        </div>

        <div
          className={classNames(
            styles.group,
            styles['group__company']
          )}
        >
          <h3
            className={styles.heading}
          >
            Company
          </h3>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/company"
          >
            About MaxMind
          </a>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/company/working-at-maxmind"
          >
            Working at MaxMind
          </a>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/company/commitment-to-security"
          >
            Commitment to Security
          </a>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/company/charitable-giving"
          >
            Charitable Giving
          </a>
          <a
            className={styles.link}
            href="https://www.maxmind.com/en/company/contact-us"
          >
            Contact Us
          </a>
        </div>

        <section
          className={styles.copyright}
        >
          <p>
            &copy; 2012-
            {new Date().getFullYear()}
            {' '}
            MaxMind, Inc. All Rights Reserved.
            MaxMind, GeoIP, minFraud, and related trademarks belong to MaxMind,
            Inc.
          </p>

          <div
            className={styles.terms}
          >
            <a
              className={styles.termsLink}
              href="https://www.maxmind.com/en/terms-of-use"
            >
              Terms of Use
            </a>
            <a
              className={styles.termsLink}
              href="https://www.maxmind.com/en/privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
