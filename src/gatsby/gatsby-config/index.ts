import { GatsbyConfig } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';

import createFeed from './feeds/createFeed';
import sectionize from './remark/sectionize';

const { GATSBY_URL = 'http://localhost:5000' } = process.env;

const cspDirectives = {
  'connect-src': [
    '\'self\'',
    'www.googleapis.com',
    'www.google-analytics.com',
    'knrpc.olark.com',
  ],
  'font-src': [
    '\'self\'',
    'data:',
    'static.olark.com',
  ],
  'frame-src': [
    '\'self\'',
    'static.olark.com',
  ],
  'img-src': [
    '\'self\'',
    'data: www.google-analytics.com',
    'log.olark.com',
  ],
  'script-src': [
    '\'self\'',
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'knrpc.olark.com',
    'static.olark.com',
    '\'unsafe-inline\' api.olark.com',
  ],
  'style-src': [
    '\'self\'',
    '\'unsafe-inline\' static.olark.com',
  ],
};

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
  {
    options: {
      directives: Object.entries(cspDirectives).reduce((acc, [
        key,
        values,
      ]) => ({
        ...acc,
        [key]: values.join(' '),
      }), {}),
      mergeScriptHashes: false,
      mergeStyleHashes: false,
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
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        background_color: '#0b8ad0',
        display: 'minimal-ui',
        icon: 'src/images/maxmind-icon.png',
        name: 'MaxMind Developer Portal',
        start_url: '/',
        theme_color: '#0b8ad0',
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
    {
      options: {
        trackingIds: [
          'UA-171943-3',
        ],
      },
      resolve: 'gatsby-plugin-google-gtag',
    },
    'gatsby-plugin-advanced-sitemap',
    {
      options: {
        env: {
          nonProduction: {
            policy: [
              {
                disallow: [
                  '/',
                ],
                userAgent: '*',
              },
            ],
          },
          production: {
            policy: [
              {
                allow: '/',
                userAgent: '*',
              },
            ],
          },
        },
        host: GATSBY_URL,
        resolveEnv: () => GATSBY_URL === 'https://dev.maxmind.com'
          ? 'production'
          : 'nonProduction',
        sitemap: `${GATSBY_URL}/sitemap.xml`,
      },
      resolve: 'gatsby-plugin-robots-txt',
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
    // eslint-disable-next-line max-len
    description: 'Develop applications using industry-leading IP intelligence and risk scoring.',
    siteUrl: GATSBY_URL,
    title: 'MaxMind Developer Portal',
  },
} as GatsbyConfig;
