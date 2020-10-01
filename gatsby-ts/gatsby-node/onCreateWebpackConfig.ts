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
};
