/* eslint-disable filenames/match-exported */
import { GatsbyConfig, PluginOptions } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';

import sectionize from './remark/sectionize';

const { GATSBY_URL = 'http://localhost:5000' } = process.env;

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
];

const THEME_ROOT = `${__dirname}/../../../`;

const GLOBALLY_IGNORED_SOURCE_FILES = [
  '**/_**/*',
  '**/_*',
];

export interface IThemeOptions extends PluginOptions {
  defaultLayouts?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  feeds: any[];
  gtmTrackingId: string;
  icon: string;
  meta: {
    description: string,
    title: string,
  },
  sitePath: string;
  twitterUsername: string;
  url: string;
}

const config = (options: IThemeOptions): GatsbyConfig => {
  return {
    plugins: [
      {
        options: {
          ignore: [
            ...GLOBALLY_IGNORED_SOURCE_FILES,
            '**/index.mdx',
          ],
          name: 'pages',
          path: `${options.sitePath}/content/`,
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
          path: `${options.sitePath}/content/`,
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
          path: `${options.sitePath}/content/`,
        },
        resolve: 'gatsby-source-filesystem',
      },
      {
        options: {
          defaultLayouts: {
            home: require.resolve(`${THEME_ROOT}src/templates/Home`),
            overviews: require.resolve(`${THEME_ROOT}src/templates/Overview`),
            pages: require.resolve(`${THEME_ROOT}src/templates/Page`),
            ...options.defaultLayouts,
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
          path: `${THEME_ROOT}src/images`,
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
          rule: {
            include: /assets/,
          },
        },
        resolve: 'gatsby-plugin-react-svg',
      },
      'gatsby-plugin-remove-trailing-slashes',
      {
        options: {
          feeds: options.feeds,
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
            options.gtmTrackingId,
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
          host: options.url,
          resolveEnv: () => GATSBY_URL === 'https://dev.maxmind.com'
            ? 'production'
            : 'nonProduction',
          sitemap: `${options.url}/sitemap.xml`,
        },
        resolve: 'gatsby-plugin-robots-txt',
      },
      {
        options: {
          background_color: '#0b8ad0',
          display: 'minimal-ui',
          icon: options.icon,
          name: options.meta.title,
          start_url: '/',
          theme_color: '#0b8ad0',
        },
        resolve: 'gatsby-plugin-manifest',
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
      author: options.twitterUsername,
      description: options.meta.description,
      siteUrl: options.url,
      title: options.meta.title,
    },
  };
};

export default config;
