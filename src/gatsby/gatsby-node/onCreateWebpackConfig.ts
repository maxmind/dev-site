import { CreateWebpackConfigArgs, GatsbyNode } from 'gatsby';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require('stylelint-webpack-plugin');

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig']= (
  props: CreateWebpackConfigArgs
) => {
  /**
   * In the development environment, we want eslint to parse files on change and
   * output any issues to console.
   */
  if (props.stage === 'develop') {
    props.actions.setWebpackConfig({
      module: {
        rules: [
          {
            exclude: /(node_modules|cache|public)/,
            test: /\.(js|json|md|mdx|ts|tsx)$/,
            use: [
              {
                loader: 'eslint-loader',
              },
            ],
          },
        ],
      },
      plugins: [
        new StylelintPlugin({
          configFile: './.stylelintrc.js',
          files: 'src/**/*.s(a|c)ss',
          fix: true,
        }),
      ],
    });
  }
};
