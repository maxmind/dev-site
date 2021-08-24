import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { OpenAPIV3 } from 'openapi-types';
import PropTypes from 'prop-types';
import React from 'react';

import { renderMarkdown } from '../../../../utils/markdown';
import Type from '../Type';
import { getRefAnchorLink } from '../utils';
import parseSchema from './parseSchema';

import * as styles from './Properties.module.scss';

interface IRow {
  description?: string;
  format?: string;
  handleHightlightLines: (lines: string) => void;
  key?: string;
  lineNumbers?: string;
  name: string;
  schemaName: string;
  type?: string | React.ReactElement;
}

const NameRegex = new RegExp('\\.', 'g');

const Row: React.FC<IRow> = (props) => {
  const { handleHightlightLines, lineNumbers } = props;
  const location = useLocation();
  const id = [
    props.schemaName.replace(NameRegex, '_'),
    props.name.replace(NameRegex, '_'),
  ].join('__');

  React.useEffect(() => {
    if (location.hash === `#${id}` && lineNumbers) {
      handleHightlightLines(`${lineNumbers}`);
    }
  }, [
    id,
    location.hash,
    lineNumbers,
    handleHightlightLines,
  ]);

  return (
    <div
      className={classNames(
        styles.row,
        {
          [styles['row__targeted']]: location.hash === `#${id}`,
        }
      )}
      id={id}
      onMouseEnter={(): void => handleHightlightLines(`${props.lineNumbers}`)}
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
          {renderMarkdown(props.description)}
        </div>
      )}
    </div>
  );
};

Row.propTypes = {
  description: PropTypes.string,
  format: PropTypes.string,
  handleHightlightLines: PropTypes.any.isRequired,
  lineNumbers: PropTypes.any,
  name: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  type: PropTypes.any,
};

// TODO - Add proper types for anything that uses `TempAny` type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TempAny = any;

const renderObjectRows = (
  schema: OpenAPIV3.SchemaObject,
  schemaName: string,
  handleHightlightLines: (lines: string) => void,
): React.ReactElement[] => {
  return Object
    .entries(schema.properties as unknown as OpenAPIV3.SchemaObject)
    .map((
      property: [string, OpenAPIV3.SchemaObject],
      index: number
    ): React.ReactElement => {
      const [
        name,
        properties,
      ] = property;

      const type = properties.type || (
        <>
          {getRefAnchorLink((properties as TempAny).$ref)}
        </>
      );

      return (
        <Row
          description={properties.description}
          format={properties.format && `(${properties.format})`}
          handleHightlightLines={handleHightlightLines}
          key={`row-${index}`}
          lineNumbers={(properties as TempAny)['x-line-numbers']}
          name={name}
          schemaName={schemaName}
          type={type}
        />
      );
    });
};

const renderArrayRows = (
  schema: OpenAPIV3.ArraySchemaObject,
  schemaName: string,
  handleHightlightLines: (lines: string) => void,
): React.ReactElement => {
  return (
    <Row
      description={schema.description}
      format={(schema.items as TempAny)?.$ref
        && `<${(schema.items as TempAny)?.$ref}>[]`}
      handleHightlightLines={handleHightlightLines}
      name="array"
      schemaName={schemaName}
      type="array"
    />
  );
};

const renderRows = (
  schema: OpenAPIV3.SchemaObject,
  schemaName: string,
  handleHightlightLines: (lines: string) => void,
):  React.ReactElement => {
  if (schema.type === 'object' && schema.properties) {
    return (
      <>
        {renderObjectRows(schema, schemaName, handleHightlightLines)}
      </>
    );
  }

  if (schema.type === 'array' && schema.items) {
    return (
      <>
        {renderArrayRows(schema, schemaName, handleHightlightLines)}
      </>
    );
  }

  return (
    <>
      {/* {JSON.stringify(schema, null, 2)} */}
    </>
  );
};


interface IProperties {
  data: OpenAPIV3.SchemaObject;
  handleHightlightLines: (lines: string) => void;
  schemaName: string;
}

const Properties: React.FC<IProperties> = (props) => {
  const schema = parseSchema(props.data);

  return renderRows(
    schema as OpenAPIV3.SchemaObject,
    props.schemaName,
    props.handleHightlightLines
  );
};

Properties.propTypes = {
  data: PropTypes.any.isRequired,
  handleHightlightLines: PropTypes.any.isRequired,
  schemaName: PropTypes.string.isRequired,
};

export default Properties;
