import { useLocation } from '@reach/router';
import CustomPropTypes from 'airbnb-prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';

import {
  inferType,
  isArray,
  isBoolean,
  isObject,
  isString,
} from '../../utils/json';
import { formatSchemaName } from '../../utils/openapi';
import Example from '../Example';
import SchemaContext from './SchemaContext';
import ServiceTags from './ServiceTags';
import Tag from './Tag';

import styles from './Property.module.scss';

const slugger = new GithubSlugger();

type TagValue = boolean | string | number | null;
export interface IProperty {
  children?: React.ReactElement | React.ReactElement[],
  linkToSchemaName?: string;
  name: string;
  schemaId?: string;
  services?: MinFraudServices;
  tags?: Record<string, TagValue>;
  type?: SchemaPropertyType;
}

const Property: React.FC<IProperty> = (props) => {
  const {
    children: description,
    linkToSchemaName,
    tags: schemaTags,
    name,
    services,
    type,
  } = props;

  const location = useLocation();

  const {
    json: schemaJson,
    id: schemaId,
    jsonPointer: schemaJsonPath,
    services: schemaServices,
  } = React.useContext(SchemaContext);

  const [
    example,
    setExample,
  ] = React.useState('');

  const jsonPointer = React.useMemo(
    () => schemaJsonPath === '/'
      ? `${schemaJsonPath}${name}`
      : `${schemaJsonPath}/${name}`,
    [
      name,
      schemaJsonPath,
    ]
  );

  const propertyId = React.useMemo(
    () => `${schemaId}__${slugger.slug(name)}`,
    [
      schemaId,
      name,
    ]
  );

  const linkToSchemaId = React.useMemo(
    () => linkToSchemaName && slugger.slug(formatSchemaName(linkToSchemaName)),
    [
      linkToSchemaName,
    ]
  );

  React.useEffect(
    () => {
      if (!isObject(schemaJson)) {
        return;
      }

      // eslint-disable-next-line security/detect-object-injection
      const propertyExample = schemaJson[name];

      if (
        typeof propertyExample === 'undefined'
        || propertyExample === null
      ) {
        return;
      }

      if (isArray(propertyExample) || isObject(propertyExample)) {
        return setExample(JSON.stringify(
          propertyExample,
          null,
          2
        ));
      }

      if (isString(propertyExample)) {
        return setExample(`"${propertyExample}"`);
      }

      if (isBoolean(propertyExample)) {
        return setExample(propertyExample.toString());
      }

      return setExample(propertyExample.toString());
    },
    [
      name,
      schemaJson,
      type,
    ]
  );

  const inferredType = React.useMemo(
    () => {
      if (!isObject(schemaJson)) {
        return;
      }

      // eslint-disable-next-line security/detect-object-injection
      const propertyValue = schemaJson[name];

      if (!propertyValue) {
        return;
      }

      return inferType(propertyValue);
    },
    [
      name,
      schemaJson,
    ]
  );

  const exampleLanguage = React.useMemo(
    () => {
      if (type) {
        return type === 'object' || type.startsWith('array')
          ? 'json'
          : 'bash';
      }

      return inferredType === 'object' || inferredType === 'array'
        ? 'json'
        : 'bash';
    },
    [
      inferredType,
      type,
    ]
  );

  const serviceTags = services || schemaServices;

  return (
    <div
      className={classNames(
        styles.row,
        {
          [styles['row--targeted']]: location?.hash === `#${propertyId}`,
        }
      )}
      id={propertyId}
    >
      <Link
        className={styles.name}
        to={`#${propertyId}`}
      >
        {name}
      </Link>

      {(type || inferredType) && (
        <Tag
          className={styles.type}
        >
          {type || inferredType}
        </Tag>
      )}

      {description && (
        <div
          className={styles.description}
        >
          {description}
        </div>
      )}

      {example && (
        <Example
          label="Example"
          language={exampleLanguage}
        >
          <>
            {exampleLanguage === 'json' ? '//' : '#'}
            {` JSON Pointer: ${jsonPointer}\n`}
            {example}
          </>
        </Example>
      )}

      {(linkToSchemaId || schemaTags || serviceTags) && (
        <div
          className={styles.tags}
        >
          <div
            className={styles['tags__schema-tags']}
          >
            {linkToSchemaId && (
              <Link
                className={styles['schema-link']}
                to={`#schema--${linkToSchemaId}`}
              >
                <Tag
                  className={styles['schema-link__tag']}
                >
                  View object schema
                </Tag>
              </Link>
            )}

            {schemaTags && Object.entries(schemaTags).map(
              (
                [
                  name,
                  value,
                ] : [
                  string,
                  TagValue,
                ],
                index: number
              ) => (
                <Tag
                  className={styles['tags__schema-tag']}
                  key={`tag-${index}`}
                >

                  {name}
                  {typeof value !== 'undefined' && value !== null && (
                    <>
                      :
                      {' '}
                      <span
                        className={styles['tags__schema-tag-value']}
                      >
                        {value}
                      </span>
                    </>
                  )}
                </Tag>
              ))}
          </div>

          {serviceTags && (
            <ServiceTags
              className={styles['tags__service-tags']}
              services={serviceTags}
            />
          )}
        </div>
      )}
    </div>
  );
};

Property.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
  linkToSchemaName: PropTypes.string,
  name: PropTypes.string.isRequired,
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
  ]),
  tags: PropTypes.objectOf(
    CustomPropTypes.or([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
      CustomPropTypes.explicitNull(),
    ]).isRequired
  ),
  type: PropTypes.oneOf([
    'array<boolean>',
    'array<number>',
    'array<integer>',
    'array<object>',
    'array<string>',
    'boolean',
    'number',
    'integer',
    'object',
    'string',
  ] as const),
};

export default Property;
