import { exec } from 'child_process';
import { CreateWebpackConfigArgs, GatsbyNode, PluginOptions } from 'gatsby';
import reporter from 'gatsby-cli/lib/reporter';
import path from 'path';

import { IThemeOptions } from '../gatsby-config';

/* eslint-disable @typescript-eslint/no-var-requires */
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig']= (
  props: CreateWebpackConfigArgs,
  options: PluginOptions & IThemeOptions,
) => {

  const IS_DEVELOP = props.stage === 'develop';
  const IS_PRODUCTION = !IS_DEVELOP;
  const IS_SSR = props.stage.includes('html');

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: IS_PRODUCTION,
    },
  };

  const sassRule = {
    test: /\.s(a|c)ss$/,
    use: IS_SSR
      ? [
        props.loaders.null(),
      ]
      : [
        props.loaders.miniCssExtract(),
        props.loaders.css({
          camelCase: true,
          importLoaders: 2,
        }),
        props.loaders.postcss(),
        sassLoader,
      ],
  };

  const sassRuleModules = {
    test: /\.module\.s(a|c)ss$/,
    use: [
      !IS_SSR && props.loaders.miniCssExtract({
        modules: true,
      }),
      props.loaders.css({
        camelCase: true,
        importLoaders: 2,
        modules: true,
      }),
      props.loaders.postcss(),
      sassLoader,
    ].filter(Boolean),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let configRules: any = [];

  switch (props.stage) {
  case 'develop':
  case 'build-javascript':
  case 'build-html':
  case 'develop-html': {
    configRules = configRules.concat([
      {
        oneOf: [
          sassRuleModules,
          sassRule,
        ],
      },
    ]);
    break;
  }
  }

  props.actions.setWebpackConfig({
    module: {
      rules: configRules,
    },
    resolve: {
      alias: {
        '@site': path.resolve(options.sitePath, 'src/'),
        '@theme': path.resolve(__dirname, '../../../src/'),
      },
    },
  });

  /**
   * In the development environment, we want eslint to parse files on change and
   * output any issues to console.
   */
  if (IS_DEVELOP) {
    props.actions.setWebpackConfig({
      plugins: [
        new ESLintPlugin({
          exclude: [
            'node_modules',
            '.cache',
            'public',
          ],
          extensions: [
            'js',
            'json',
            'md',
            'mdx',
            'ts',
            'tsx',
          ],
        }),
        new StylelintPlugin({
          configFile: './.stylelintrc.js',
          files: 'src/**/*.s(a|c)ss',
        }),
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          apply: (compiler: any) => {
            compiler.hooks.afterEmit.tapAsync(
              'RemarkLint',
              (_: unknown, next: () => void) => exec(
                'remark . --ext mdx --quiet',
                (_: unknown, stdout: string, stderr: string) => {
                  if (stdout) {
                    reporter.info(stdout);
                  }

                  if (stderr) {
                    reporter.warn(`RemarkLint error:\n${stderr}`);
                  }

                  next();
                }
              ));
          },
        },
      ],
    });
  }
};
