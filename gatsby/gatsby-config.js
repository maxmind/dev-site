// TODO: Enable stylelint + postcss integration for feedback
// using `gatsby develop`

// const reporter = require('postcss-reporter');
const remarkSlug = require('remark-slug');
// const stylelint = require('stylelint');

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
  'gatsby-plugin-csp',
];

module.exports = {
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
        path: `${__dirname}/../content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        defaultLayouts: {
          content: require.resolve('./src/templates/Page.tsx'),
        },
        extensions: [
          '.mdx',
          '.md',
        ],
        remarkPlugins: [
          remarkSlug,
        ],
      },
      resolve: 'gatsby-plugin-mdx',
    },
    'gatsby-plugin-react-helmet',
    {
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
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
        analyzerPort: 3000,
        production: true,
      },
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    },
    ...THESE_PLUGINS_MUST_COME_LAST,
  ],
  siteMetadata: {
    author: '@maxmind',
    description: 'Developer website for MaxMind.',
    title: 'MaxMind Developer Site',
  },
};
