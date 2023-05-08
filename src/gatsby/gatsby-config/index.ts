import { GatsbyConfig } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';

import createReleaseNotesFeed from './feeds/createReleaseNotesFeed';
import createServerIpAddressesFeed from './feeds/createServerIpAddressesFeed';
import sectionize from './remark/sectionize';

const { GATSBY_URL = 'http://localhost:5000' } = process.env;

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
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
        typeName: 'Json',
      },
      resolve: 'gatsby-transformer-json',
    },
    {
      options: {
        name: 'maxmindServerIps',
        path: `${GATSBY_ROOT}/static/maxmind-server-ip-addresses.json`,
      },
      resolve: 'gatsby-source-filesystem',
    },
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
    {
      options: {
        feeds: [
          // The year needs to be hardcoded. A page for the new year's
          // release notes won't exist until a new MDX file is created
          // in the /content/<product>/release-notes folder for that new year.
          createReleaseNotesFeed({
            description: 'Release notes for MaxMind\'s GeoIP2 product line',
            inputUrl: '/geoip/release-notes/2023',
            outputUrl: '/geoip/release-notes/rss.xml',
            title: 'GeoIP2 Release Notes',
          }),
          createReleaseNotesFeed({
            description: 'Release notes for MaxMind\'s minFraud product line',
            inputUrl: '/minfraud/release-notes/2023',
            outputUrl: '/minfraud/release-notes/rss.xml',
            title: 'minFraud Release Notes',
          }),
          createServerIpAddressesFeed(),
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
          'G-8F9B6Q5C11',
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
    ...THESE_PLUGINS_MUST_COME_LAST,
  ],
  siteMetadata: {
    author: '@maxmind',
    // eslint-disable-next-line max-len
    description: 'Develop applications using industry-leading IP intelligence and risk scoring.',
    siteUrl: GATSBY_URL,
    title: 'MaxMind Developer Portal',
  },
  trailingSlash: 'never',
} as GatsbyConfig;
