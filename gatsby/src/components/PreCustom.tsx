/* eslint-disable simple-import-sort/sort */
// Disabling import sort because prismjs needs to be imported before
// the theme and components
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';

import 'prismjs/themes/prism-okaidia.css';
// prism-markup-templating needs to be first language
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-go.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-typescript.js';


const PreCustom: React.FC = (props) => {
  const preRef = React.createRef<HTMLPreElement>();
  const child =
    React.Children.toArray(props.children)[0] as React.ReactElement;
  const languageClass = child.props.className;

  React.useEffect(() => {
    Prism.highlightElement(preRef.current as Element);
  });

  return (
    <pre
      className={languageClass}
      ref={preRef}
    >
      {props.children}
    </pre>
  );
};

PreCustom.propTypes = {
  children: PropTypes.node,
};

export default PreCustom;
