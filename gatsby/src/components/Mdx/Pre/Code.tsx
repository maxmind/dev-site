/* eslint-disable simple-import-sort/sort */
// Disabling import sort because prismjs needs to be imported before
// the theme and components

import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';

import { ILanguage } from '../../../languages';
import styles from './Code.module.scss';

import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

interface ICode {
  children: React.ReactNode;
  hightlightLines?: string;
  language: ILanguage;
  showInvisibles?: boolean;
}

const hasScrollbar = (
  $el: HTMLElement
): boolean => $el.scrollHeight > $el.offsetHeight;

const Code: React.FC<ICode> = (props) => {
  const preRef = React.createRef<HTMLPreElement>();
  const language = props.language;
  const [
    isExpandable,
    setIsExpandable,
  ] = React.useState(false);
  const [
    isExpanded,
    setIsExpanded,
  ] = React.useState(false);

  let promises: Promise<unknown>[] = [];

  if (language.prismSettings.importScript) {
    promises = [
      ...promises,
      // Needed for PHP
      import('prismjs/components/prism-markup-templating.js' as string),
      // To add/remove languages, you also have to update languages.ts
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
      Promise.all([
        import(
          'prismjs/plugins/line-numbers/prism-line-numbers.css' as string
        ),
        import(
          'prismjs/plugins/line-numbers/prism-line-numbers.js' as string
        ),
      ]).then(() => Promise.all([
        import(
          'prismjs/plugins/line-highlight/prism-line-highlight.js' as string
        ),
        import(
          'prismjs/plugins/line-highlight/prism-line-highlight.css' as string
        ),
      ])),

      // import(
      //   'prismjs/plugins/show-invisibles/prism-show-invisibles.css' as string
      // ),
      // import(
      //   'prismjs/plugins/show-invisibles/prism-show-invisibles.js' as string
      // ).then(() => {
      //   const firstGrammar =  (Prism.languages[language.id])
      //     ? Object.keys(Prism.languages[language.id]).shift()
      //     : '';

      //   Prism.languages.insertBefore(
      //     language.id,
      //     firstGrammar || '',
      //     {
      //       indent: {
      //         inside: {
      //           space: / /,
      //           tab: /\t/,
      //         },
      //         pattern: /^[^\S\r\n]+/gm,
      //       },
      //     },
      //     Prism.languages
      //   );
      // }),
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

      if(preRef.current) {
        Prism.highlightAllUnder(preRef.current as Element);
      }
    });
  });

  React.useEffect(() => {
    setIsExpandable(hasScrollbar(preRef.current as HTMLElement));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isExpandable,
  ]);

  const handleExpansionToggle = (): void => setIsExpanded(!isExpanded);

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles['container--expandable']]: isExpandable,
          [styles['container--expanded']]: isExpanded,
        }
      )}
    >
      <pre
        className={classNames(
          `language-${language.id}`,
          {
            'line-numbers': !language.prismSettings.cli,
            [styles['invisibles--hidden']]: (
              language.prismSettings.cli || !props.showInvisibles
            ),
          },
          styles.pre
        )}
        {...language.prismSettings.cli}
        data-line={props.hightlightLines}
        ref={preRef}
      >
        {props.children}
      </pre>
      {isExpandable && (
        <button
          className={styles['expand-btn']}
          onClick={handleExpansionToggle}
          title={isExpanded ? 'Collapse code example' : 'Expand code example'}
        >
          <FaAngleDoubleDown />
        </button>
      )}
    </div>
  );
};

Code.propTypes = {
  children: PropTypes.node.isRequired,
  hightlightLines: PropTypes.string,
  language: PropTypes.any.isRequired,
  // eslint-disable-next-line react/boolean-prop-naming
  showInvisibles: PropTypes.bool,
};

export default Code;
