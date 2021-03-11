import { useLocation } from '@reach/router';
import CustomPropTypes from 'airbnb-prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';

import Example from '../Example';
import PropertyValues from './PropertyValues';
import SchemaContext  from './SchemaContext';
import ServiceTags from './ServiceTags';
import Tag from './Tag';

import styles from './Property.module.scss';

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
  } = props;

  const location = useLocation();

  const schema = React.useContext(SchemaContext);

  const {
    example,
    linkToSchemaId,
    id: propertyId,
    type,
  } = new PropertyValues({
    property: {
      linkToSchemaName,
      name,
      type: props.type,
    },
    schema,
  });

  const serviceTags = services || schema.services;

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

      {type && (
        <Tag
          className={styles.type}
        >
          {type}
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
          language={example.language}
        >
          <>
            {example.language === 'json' ? '//' : '#'}
            {` JSON Pointer: ${example.jsonPointer}\n`}
            {example.value}
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
