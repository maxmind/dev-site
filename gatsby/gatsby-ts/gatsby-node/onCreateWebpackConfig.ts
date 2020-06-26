import { CreateWebpackConfigArgs, GatsbyNode } from 'gatsby';
import path from 'path';

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
    });
  }

  /**
   * Ensure that correct packages are resolved when running Gatsby. This happens
   * because this project uses Yarn workspaces. Some packages that have
   * dependencies on others try to resolve them in the wrong places. The module
   * resolution below makes the dependency paths explicit rather than implicit.
   */
  props.actions.setWebpackConfig({
    resolve: {
      alias: {
        '@mdx-js/react': path.resolve(
          __dirname,
          '../../node_modules/@mdx-js/react'
        ),
        react: path.resolve(__dirname, '../../node_modules/react'),
      },
    },
  });
};
