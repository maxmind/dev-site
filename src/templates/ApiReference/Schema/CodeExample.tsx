import classNames from 'classnames';
import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Pre from '../../../components/Mdx/Pre';

import * as styles from './CodeExample.module.scss';

interface ICodeExample {
  className?: string;
  highlightLines?: string;
  isExpanded?: boolean;
  schema: SchemaObject;
}

const CodeExample: React.FC<ICodeExample> = (props) => (
  <div
    className={classNames(
      {
        [styles['example__isExpanded']]: props.isExpanded,
      },
      styles.example,
      props.className,
    )}
  >
    <Pre
      className={styles.exampleJson}
      highlightLines={props.highlightLines}
    >
      <code
        className="language-json"
      >
        {JSON.stringify(props.schema['x-compiled-example'], null, 2)}
      </code>
    </Pre>
  </div>
);

CodeExample.propTypes = {
  className: PropTypes.string,
  highlightLines: PropTypes.string,
  isExpanded: PropTypes.bool,
  schema: PropTypes.any.isRequired,
};

export default CodeExample;
