/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet, { HelmetProps } from 'react-helmet';

export interface ISEO extends HelmetProps {
  description?: string;
  lang?: string;
}

const SEO: React.FC<ISEO> = (props) => {
  const { bodyAttributes, description, lang, meta = [], title } = props;
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      bodyAttributes={bodyAttributes}
      htmlAttributes={{
        lang,
      }}
      link={[
        {
          href:
            `${site.siteMetadata.siteUrl}${useLocation()?.pathname}?lang=en`,
          rel:'canonical',
        },
      ]}
      meta={[
        {
          content: metaDescription,
          name: 'description',
        },
        {
          content: title,
          property: 'og:title',
        },
        {
          content: metaDescription,
          property: 'og:description',
        },
        {
          content: 'website',
          property: 'og:type',
        },
        {
          content: 'summary',
          name: 'twitter:card',
        },
        {
          content: site.siteMetadata.author,
          name: 'twitter:creator',
        },
        {
          content: title,
          name: 'twitter:title',
        },
        {
          content: metaDescription,
          name: 'twitter:description',
        },
        {
          content: 'jzxJA9mJTD-WTNDG-fbAdNT-thiZRme30MvnzuXMxsQ',
          name: 'google-site-verification',
        },
        ...meta,
      ]}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    />
  );
};

SEO.defaultProps = {
  description: '',
  lang: 'en',
  meta: [],
};

SEO.propTypes = {
  bodyAttributes: PropTypes.any,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string.isRequired,
};

export default SEO;
