/* eslint-disable simple-import-sort/imports */
// Disabling import sort because prismjs needs to be imported before
// the theme and components

import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';

import { ILanguage } from '../../../languages';
import * as styles from './Code.module.scss';
import './Code.dark-theme.css';

import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

interface ICode {
  children: React.ReactNode;
  highlightLines?: string;
  language: ILanguage;
  showLineNumbers?: boolean;
}

const hasScrollbar = (
  $el: HTMLElement
): boolean => $el.scrollHeight > $el.offsetHeight;

const Code: React.FC<ICode> = (props) => {
  const {
    children,
    language,
    highlightLines,
    showLineNumbers,
  } = props;

  const preRef = React.createRef<HTMLPreElement>();
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
    ];
  }

  const mmReactCodeMount = new CustomEvent('mm-react-code-mount');

  React.useEffect(() => {
    Promise.race(promises).then(() => {
      document.dispatchEvent(mmReactCodeMount);
    });

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
          [styles['container__expandable']]: isExpandable,
          [styles['container__expanded']]: isExpanded,
        }
      )}
    >
      <pre
        className={classNames(
          `language-${language.id}`,
          {
            'line-numbers': !language.prismSettings.cli && showLineNumbers,
          },
          styles.pre
        )}
        {...language.prismSettings.cli}
        data-line={highlightLines}
        ref={preRef}
      >
        {children}
      </pre>
      {isExpandable && (
        <button
          className={styles.expandBtn}
          onClick={handleExpansionToggle}
          title={isExpanded ? 'Collapse code example' : 'Expand code example'}
        >
          <FaAngleDoubleDown />
        </button>
      )}
    </div>
  );
};

Code.defaultProps = {
  showLineNumbers: true,
};

Code.propTypes = {
  children: PropTypes.node.isRequired,
  highlightLines: PropTypes.string,
  language: PropTypes.any.isRequired,
  // eslint-disable-next-line react/boolean-prop-naming
  showLineNumbers: PropTypes.bool.isRequired,
};

export default Code;
