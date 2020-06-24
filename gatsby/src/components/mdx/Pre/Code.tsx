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

  let promises: Promise<void>[] = [];

  if (language.prismSettings.importScript) {
    promises = [
      ...promises,
      import(`prismjs/components/prism-${language.id}.js`),
    ];
  }

  if (language.prismSettings.cli) {
    promises = [
      ...promises,
      import(
        'prismjs/plugins/command-line/prism-command-line.css' as string
      ),
      import(
        'prismjs/plugins/command-line/prism-command-line.js' as string
      ),
    ];
  } else {
    promises = [
      ...promises,
      import(
        'prismjs/plugins/line-numbers/prism-line-numbers.css' as string
      ),
      import(
        'prismjs/plugins/line-numbers/prism-line-numbers.js' as string
      ),
      import(
        'prismjs/plugins/show-invisibles/prism-show-invisibles.css' as string
      ),
      import(
        'prismjs/plugins/show-invisibles/prism-show-invisibles.js' as string
      ).then(() => {
        const firstGrammar =  (Prism.languages[language.id])
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
      }),
    ];
  }

  React.useEffect(() => {
    Promise.all(promises).then(() => {
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

      Prism.highlightAllUnder(preRef.current as Element);
    });
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
