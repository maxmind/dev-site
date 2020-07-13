import { useLocation } from '@reach/router';
import classNames from 'classnames';
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
  lineNumbers?: string;
  name: string;
  schemaName: string;
  type?: string | React.ReactElement;
}

const NameRegex = new RegExp('\\.', 'g');

const Row: React.FC<IRow> = (props) => {
  const location = useLocation();
  const id = [
    props.schemaName.replace(NameRegex, '_'),
    props.name.replace(NameRegex, '_'),
  ].join('__');
  return (
    <div
      className={classNames(
        styles.row,
        {
          [styles['row--targeted']]: location.hash === `#${id}`,
        }
      )}
      id={id}

    >
      <div>
        <a
          className={styles.name}
          href={`#${id}`}
        >
          {props.name}
        </a>

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

      {props.lineNumbers && props.lineNumbers}
    </div>
  );
};

Row.propTypes = {
  description: PropTypes.string,
  format: PropTypes.string,
  lineNumbers: PropTypes.string,
  name: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  type: PropTypes.string,
};

const renderObjectRows = (
  schema: SchemaObject,
  schemaName: string
): React.ReactElement[] => {
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

      return (
        <Row
          description={properties.description}
          format={properties.format && `(${properties.format})`}
          key={`row-${index}`}
          lineNumbers={properties['x-line-numbers']}
          name={name}
          schemaName={schemaName}
          type={type}
        />
      );
    });
};

const renderArrayRows = (
  schema: SchemaObject,
  schemaName: string,
): React.ReactElement => {
  return (
    <Row
      description={schema.description}
      format={`<${schema.items?.$ref}>[]`}
      name="array"
      schemaName={schemaName}
      type="array"
    />
  );
};

const renderRows = (
  schema: SchemaObject,
  schemaName: string,
):  React.ReactElement => {
  if (schema.type === 'object' && schema.properties) {
    return (
      <>
        {renderObjectRows(schema, schemaName)}
      </>
    );
  }

  if (schema.type === 'array' && schema.items) {
    return (
      <>
        {renderArrayRows(schema, schemaName)}
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
  schemaName: string;
}

const Properties: React.FC<IProperties> = (props) => {
  const schema = parseSchema(props.data);

  return renderRows(schema, props.schemaName);
};

Properties.propTypes = {
  data: PropTypes.any.isRequired,
  schemaName: PropTypes.string.isRequired,
};

export default Properties;
