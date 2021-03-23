import { OpenAPIV3 } from 'openapi-types';
import PropTypes from 'prop-types';
import React from 'react';

import CodeExample from './CodeExample';
import Content from './Content';
import Heading from './Heading';

import * as styles from './Schema.module.scss';

export interface ISchema {
  name: string;
  schema: OpenAPIV3.SchemaObject;
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
        className={styles.heading}
        name={props.name}
        schema={props.schema}
      />
      <Content
        className={styles.content}
        handleExpand={handleExpand}
        handleHightlightLines={handleHightlightLines}
        isExpanded={isExampleExpanded}
        name={props.name}
        schema={props.schema}
      />
      <CodeExample
        className={styles.example}
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
