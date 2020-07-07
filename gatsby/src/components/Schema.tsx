import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { parseSchema } from '../specs';
import { a } from './mdx';
import styles from './Schema.module.scss';

const renderers = {
  link: a,
};

interface ISchema {
  data: SchemaObject;
}

const Schema: React.FC<ISchema> = (props) => {
  const schema = parseSchema(props.data);

  const renderRows = (
    schema: SchemaObject
  ):  React.ReactElement[] => Object
    .entries(schema.properties as SchemaObject)
    .map((
      property: [string, SchemaObject],
      index: number
    ): React.ReactElement => {
      const [
        name,
        properties,
      ] = property;

      return (
        <div
          className={styles.row}
          key={`row-${index}`}
        >
          <div
            className={styles.heading}
          >
            <span
              className={styles.name}
            >
              {name}
            </span>

            {properties?.type && (
              <span
                className={styles.type}
              >
                {properties?.type}

                {properties?.format && ` (${properties.format})`}
              </span>
            )}
          </div>


          <div
            className={styles.description}
          >
            <ReactMarkdown
              renderers={renderers}
            >
              {properties?.description}
            </ReactMarkdown>
          </div>
        </div>
      );
    });

  return (
    <article>
      {schema.properties && (
        <>
          {renderRows(schema)}
        </>
      )}
    </article>
  );
};

Schema.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Schema;
