/* eslint-disable simple-import-sort/sort */
// Disabling import sort because prismjs needs to be imported before
// the theme and components
import classNames from 'classnames';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Pre.module.scss';

import 'prism-themes/themes/prism-material-oceanic.css';
// prism-markup-templating needs to be first language
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-go.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-sql.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/plugins/command-line/prism-command-line.css';
import 'prismjs/plugins/command-line/prism-command-line.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

const Pre: React.FC<React.HTMLProps<HTMLPreElement>> = (props) => {
  const preRef = React.createRef<HTMLPreElement>();
  const child =
    React.Children.toArray(props.children)[0] as React.ReactElement;
  const languageClass = child.props.className;

  React.useEffect(() => {
    Prism.highlightAllUnder(preRef.current as Element);
  });

  return (
    <pre
      className={classNames(
        languageClass,
        {
          'command-line': languageClass === 'language-cli',
          'language-bash': languageClass === 'language-cli',
          'line-numbers': languageClass !== 'language-cli',
        },
        styles.pre
      )}
      data-filter-output="> "
      data-host="maxmind"
      data-user="docs"
      ref={preRef}
    >
      {props.children}
    </pre>
  );
};

Pre.propTypes = {
  children: PropTypes.node,
};

export default Pre;
