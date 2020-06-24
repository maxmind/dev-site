/* eslint-disable simple-import-sort/sort */
// Disabling import sort because prismjs needs to be imported before
// the theme and components

import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';

import { ILanguage } from '../../../languages';
import styles from './Code.module.scss';

import 'prism-themes/themes/prism-material-oceanic.css';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

interface ICode {
  children: React.ReactNode;
  language: ILanguage;
  showInvisibles?: boolean;
}

const Code: React.FC<ICode> = (props) => {
  const preRef = React.createRef<HTMLPreElement>();
  const language = props.language;

  if (language.prismSettings.importScript) {
    // eslint-disable-next-line security/detect-non-literal-require
    require(`prismjs/components/prism-${language.id}.js`);
  }

  if (language.prismSettings.cli) {
    require('style-loader!prismjs/plugins/command-line/prism-command-line.css');
    require('prismjs/plugins/command-line/prism-command-line.js');
  } else {
    require(
      'style-loader!prismjs/plugins/line-numbers/prism-line-numbers.css'
    );
    require('prismjs/plugins/line-numbers/prism-line-numbers.js');
    require(
      'style-loader!prismjs/plugins/show-invisibles/prism-show-invisibles.css'
    );
    require('prismjs/plugins/show-invisibles/prism-show-invisibles.js');

    // eslint-disable-next-line security/detect-object-injection
    const firstGrammar =  (Prism.languages[language.id])
      // eslint-disable-next-line security/detect-object-injection
      ? Object.keys(Prism.languages[language.id]).shift()
      : '';

    Prism.languages.insertBefore(
      language.id,
      firstGrammar || '',
      {
        indent: {
          inside: {
            space: / /,
            tab: /\t/,
          },
          pattern: /^\s+/gm,
        },
      },
      Prism.languages
    );
  }

  const { indentSize, indentStyle } =  language.prismSettings.whitespace;

  Prism.plugins.NormalizeWhitespace.setDefaults({
    'left-trim': true,
    'remove-indent': true,
    'remove-initial-line-feed': true,
    'remove-trailing': true,
    'right-trim': true,
    'spaces-to-tabs': indentStyle === 'tab' ? indentSize : undefined,
    'tabs-to-spaces': indentStyle === 'space' ? indentSize : undefined,
  });

  React.useEffect(() => {
    Prism.highlightAllUnder(preRef.current as Element);
  });

  return (
    <pre
      className={classNames(
        `language-${language.id}`,
        {
          'command-line': language.prismSettings.cli,
          'line-numbers': !language.prismSettings.cli,
          [styles['invisibles--hidden']]: (
            language.prismSettings.cli || !props.showInvisibles
          ),
        },
        styles.pre
      )}
      {...language.prismSettings.cli}
      ref={preRef}
    >
      {props.children}
    </pre>
  );
};

Code.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.any.isRequired,
  // eslint-disable-next-line react/boolean-prop-naming
  showInvisibles: PropTypes.bool,
};

export default Code;
