import { GatsbyConfig } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';

import createFeed from './feeds/createFeed';
import sectionize from './remark/sectionize';

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
  {
    options: {
      directives: {
        // eslint-disable-next-line quotes
        'connect-src': "'self' www.googleapis.com",
      },
    },
    resolve: 'gatsby-plugin-csp',
  },
];

const GATSBY_ROOT = `${__dirname}/../../../`;

const GLOBALLY_IGNORED_SOURCE_FILES = [
  '**/_**/*',
  '**/_*',
];

export default {
  plugins: [
    {
      options: {
        ignore: [
          ...GLOBALLY_IGNORED_SOURCE_FILES,
          '**/index.mdx',
        ],
        name: 'pages',
        path: `${GATSBY_ROOT}/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        ignore: [
          ...GLOBALLY_IGNORED_SOURCE_FILES,
          '**/!(content)/index.mdx',
        ],
        name: 'home',
        path: `${GATSBY_ROOT}/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        ignore: [
          ...GLOBALLY_IGNORED_SOURCE_FILES,
          '**/!(index).mdx',
        ],
        name: 'overviews',
        path: `${GATSBY_ROOT}/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        defaultLayouts: {
          home: require.resolve(`${GATSBY_ROOT}src/templates/Home`),
          overviews: require.resolve(`${GATSBY_ROOT}src/templates/Overview`),
          pages: require.resolve(`${GATSBY_ROOT}src/templates/Page`),
        },
        extensions: [
          '.mdx',
          '.md',
        ],
        remarkPlugins: [
          sectionize,
          remarkExternalLinks,
        ],
      },
      resolve: 'gatsby-plugin-mdx',
    },
    'gatsby-plugin-react-helmet',
    {
      options: {
        name: 'images',
        path: `${GATSBY_ROOT}src/images`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-ts-checker',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        background_color: '#663399',
        display: 'minimal-ui',
        // This path must be relative to the Gatsby root
        icon: 'src/images/gatsby-icon.png',
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        theme_color: '#663399',
      },
      resolve: 'gatsby-plugin-manifest',
    },
    {
      options: {
        rule: {
          include: /assets/,
        },
      },
      resolve: 'gatsby-plugin-react-svg',
    },
    'gatsby-plugin-remove-trailing-slashes',
    {
      options: {
        feeds: [
          createFeed({
            description: 'Release notes for MaxMind\'s GeoIP2 product line',
            title: 'GeoIP2 Release Notes',
            url: '/geoip/release-notes',
          }),
          createFeed({
            description: 'Release notes for MaxMind\'s minFraud product line',
            title: 'minFraud Release Notes',
            url: '/minfraud/release-notes',
          }),
        ],
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      },
      resolve: 'gatsby-plugin-feed',
    },
    // {
    //   options: {
    //     analyzerPort: 3000,
    //     production: true,
    //   },
    //   resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    // },
    ...THESE_PLUGINS_MUST_COME_LAST,
  ],
  siteMetadata: {
    author: '@maxmind',
    description: 'Developer website for MaxMind.',
    siteUrl: 'https://dev.maxmind.com',
    title: 'MaxMind Developer Site',
  },
} as GatsbyConfig;
