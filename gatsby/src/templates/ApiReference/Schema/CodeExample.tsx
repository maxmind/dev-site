import classNames from 'classnames';
import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Pre from '../../../components/Mdx/Pre';
import styles from './CodeExample.module.scss';

interface ICodeExample {
  highlightLines?: string;
  isExpanded?: boolean;
  schema: SchemaObject;
}

const CodeExample: React.FC<ICodeExample> = (props) => (
  <div
    className={classNames(
      {
        [styles['example--is-expanded']]: props.isExpanded,
      },
      styles.example
    )}
  >
    <Pre
      className={styles['example-json']}
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
  highlightLines: PropTypes.string,
  isExpanded: PropTypes.bool,
  schema: PropTypes.any.isRequired,
};

export default CodeExample;
