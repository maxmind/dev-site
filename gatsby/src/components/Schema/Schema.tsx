import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import CodeExample from './CodeExample';
import Heading from './Heading';
import Properties from './Properties';
import styles from './Schema.module.scss';

export interface ISchema {
  name: string;
  schema: SchemaObject;
}

const Schema: React.FC<ISchema> = (props) => {
  const [
    isExampleExpanded,
    setIsExampleExpanded,
  ] = React.useState(false);

  const [
    highlightedLines,
    setHighlightedLines,
  ] = React.useState<string>();

  const handleHightlightLines = (
    lines: string
  ): void => setHighlightedLines(lines as string);

  const handleExpand = (): void => setIsExampleExpanded(!isExampleExpanded);

  return (
    <article
      className={styles.schema}
    >
      <Heading
        name={props.name}
        schema={props.schema}
      />
      <Properties
        handleExpand={handleExpand}
        handleHightlightLines={handleHightlightLines}
        isExpanded={isExampleExpanded}
        name={props.name}
        schema={props.schema}
      />
      <CodeExample
        highlightLines={highlightedLines}
        isExpanded={isExampleExpanded}
        schema={props.schema}
      />
    </article>
  );
};

Schema.propTypes = {
  name: PropTypes.string.isRequired,
  schema: PropTypes.any.isRequired,
};

export default Schema;
