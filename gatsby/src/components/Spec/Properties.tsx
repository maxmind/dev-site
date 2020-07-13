import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import { parseSchema } from '../../specs';
import styles from './Properties.module.scss';
import Type from './Type';
import { getRefAnchorLink, renderMarkdownElement } from './utils';

interface IRow {
  description?: string;
  format?: string;
  key?: string;
  name: string;
  type?: string | React.ReactElement;
}

const renderRow = (props: IRow): React.ReactElement => (
  <div
    className={styles.row}
    key={props.key}
  >
    <div
      className={styles.heading}
    >
      <span
        className={styles.name}
      >
        {props.name}
      </span>

      <Type
        className={styles.type}
      >
        {props.type}
        {props.format && (
          <>
            {' '}
            {props.format}
          </>
        )}
      </Type>
    </div>

    {props.description && (
      <div
        className={styles.description}
      >
        {renderMarkdownElement(props.description)}
      </div>
    )}
  </div>
);

const renderObjectRows = (schema: SchemaObject): React.ReactElement[] => {
  return Object
    .entries(schema.properties as SchemaObject)
    .map((
      property: [string, SchemaObject],
      index: number
    ): React.ReactElement => {
      const [
        name,
        properties,
      ] = property;

      const type = properties.type || (
        <>
          {getRefAnchorLink(properties.$ref)}
        </>
      );

      return renderRow({
        description: properties.description,
        format: properties.format && `(${properties.format})`,
        key: `row-${index}`,
        name,
        type,
      });
    });
};

const renderArrayRows = (schema: SchemaObject): React.ReactElement => {
  return renderRow({
    description: schema.description,
    format: `<${schema.items?.$ref}>[]`,
    name: 'array',
    type: 'array',
  });
};

const renderRows = (
  schema: SchemaObject
):  React.ReactElement => {
  if (schema.type === 'object' && schema.properties) {
    return (
      <>
        {renderObjectRows(schema)}
      </>
    );
  }

  if (schema.type === 'array' && schema.items) {
    return (
      <>
        {renderArrayRows(schema)}
      </>
    );
  }

  return (
    <>
      {JSON.stringify(schema, null, 2)}
    </>
  );
};


interface IProperties {
  data: SchemaObject;
}

const Properties: React.FC<IProperties> = (props) => {
  const schema = parseSchema(props.data);

  return renderRows(schema);
};

Properties.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Properties;
