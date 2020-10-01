// TODO: Enable stylelint + postcss integration for feedback
// using `gatsby develop`

// import reporter from 'postcss-reporter';
import { GatsbyConfig } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';
import remarkSlug from 'remark-slug';
// import stylelint from 'stylelint';

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
  'gatsby-plugin-csp',
];

const GATSBY_ROOT = `${__dirname}/../../`;

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
        /* eslint-disable array-bracket-newline */
        postCssPlugins: [
          // stylelint(),
          // reporter({
          //   clearReportedMessages: true,
          // }),
        ],
        /* eslint-enable array-bracket-newline */
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
    'gatsby-plugin-typescript-checker',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        /* eslint-disable @typescript-eslint/camelcase */
        background_color: '#663399',
        display: 'minimal-ui',
        // This path must be relative to the Gatsby root
        icon: 'src/images/gatsby-icon.png',
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        theme_color: '#663399',
        /* eslint-enable @typescript-eslint/camelcase */
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
