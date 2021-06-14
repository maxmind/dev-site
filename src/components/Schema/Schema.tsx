// TODO - Figure out correct typings for React children that implement ISchema
/* eslint-disable @typescript-eslint/no-explicit-any */
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FaLink as LinkIcon } from 'react-icons/fa';

import { inferType } from '../../utils/json';
import { formatSchemaName } from '../../utils/openapi';
import Example from '../Example';
import Link from '../Link';
import SchemaContext from './SchemaContext';
import Tag from './Tag';

import * as styles from './Schema.module.scss';

export interface ISchema {
  children: React.ReactElement | React.ReactElement[];
  json: Json;
  jsonPointer: string;
  name: string;
  productFamily: ProductFamily;
  services?: GeoIpServices | MinFraudServices;
  type?: SchemaType;
}

const slug = GithubSlugger.slug;

const Schema: React.FC<ISchema> = (props) => {
  const {
    children,
    json,
    jsonPointer,
    name,
    productFamily,
    services,
    type,
  } = props;

  const formattedSchemaName = formatSchemaName(name);

  const schemaId = `schema--${slug(formattedSchemaName)}`;

  let inferredType = '';

  if (typeof json !== 'undefined') {
    inferredType = inferType(json);
  }

  const schemaContent = React.Children.toArray(children);

  const firstPropertyComponentIndex =  schemaContent.findIndex(
    (child: any) => child.props.mdxType === 'Property'
  );

  const propertyContent = schemaContent.splice(firstPropertyComponentIndex);

  return (
    <div
      className={styles.container}
      id={schemaId}
    >
      <div
        className={styles.heading}
      >
        <span
          className={styles['heading__name']}
        >
          <Link
            className={styles['heading__link']}
            to={`#${schemaId}`}
          >
            <LinkIcon
              className={styles['heading__linkIcon']}
            />
            {formattedSchemaName}
          </Link>
        </span>

        {(type || inferredType) && (
          <span
            className={styles['heading__type']}
          >
            <Tag>
              {type || inferredType}
            </Tag>
          </span>
        )}
      </div>
      <div
        className={styles.content}
      >
        <SchemaContext.Provider
          value={{
            id: schemaId,
            json,
            jsonPointer,
            productFamily,
            services,
          }}
        >
          {schemaContent}

          {json && (
            <Example
              label="Example"
              language="json"
            >
              <>
                {`// JSON Pointer: ${jsonPointer}\n`}
                {JSON.stringify(json, null, 2)}
              </>
            </Example>
          )}

          {propertyContent}
        </SchemaContext.Provider>
      </div>
    </div>
  );
};

export const schemaPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element.isRequired
    ),
  ]).isRequired,
  json: PropTypes.any.isRequired,
  jsonPointer: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'array<object>',
    'object',
  ] as const),
};

Schema.propTypes = {
  ...schemaPropTypes,
  productFamily: PropTypes.oneOf([
    'geoip',
    'minfraud',
  ] as const).isRequired,
  services: PropTypes.oneOfType([
    PropTypes.oneOf([
      '*',
    ] as const),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'score',
        'factors',
        'insights',
      ] as const).isRequired,
    ),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'country',
        'city',
        'insights',
      ] as const).isRequired,
    ),
  ]),
};

export default Schema;
