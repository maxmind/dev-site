import { GatsbyConfig } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';
import remarkSlug from 'remark-slug';

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

export default {
  plugins: [
    {
      options: {
        cssLoaderOptions: {
          camelCase: true,
        },
        includePaths: [
          'src/styles',
        ],
      },
      resolve: 'gatsby-plugin-sass',
    },
    {
      options: {
        name: 'content',
        path: `${GATSBY_ROOT}/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        defaultLayouts: {
          content: require.resolve(`${GATSBY_ROOT}src/templates/Page`),
        },
        extensions: [
          '.mdx',
          '.md',
        ],
        remarkPlugins: [
          remarkExternalLinks,
          remarkSlug,
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
    title: 'MaxMind Developer Site',
  },
} as GatsbyConfig;
