import { useLocation } from '@reach/router';
import CustomPropTypes from 'airbnb-prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';

import { formatSchemaName } from '../../utils/openapi';
import Example from './Example';
import ServiceTags from './ServiceTags';
import Tag from './Tag';

import styles from './Property.module.scss';

const slugger = new GithubSlugger();

type Service = 'score' | 'factors' | 'insights';

type TagValue = boolean | string | number | null;

export type PropertyType = 'array<boolean>'
  | 'array<number>'
  | 'array<integer>'
  | 'array<object>'
  | 'array<string>'
  | 'boolean'
  | 'number'
  | 'integer'
  | 'object'
  | 'string';

export interface IProperty {
  children?: React.ReactElement,
  example?: string;
  linkToSchemaName?: string;
  name: string;
  schemaId?: string;
  services?: '*' | Service[];
  tags?: Record<string, TagValue>;
  type: PropertyType;
}

const Property: React.FC<IProperty> = (props) => {
  const location = useLocation();

  const {
    children: description,
    example,
    linkToSchemaName,
    tags: schemaTags,
    schemaId,
    name,
    services,
    type,
  } = props;

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

  const exampleLanguage = (type === 'object' || type.startsWith('array'))
    ? 'json'
    : 'bash';


  let formattedExample = '';

  if (example) {
    formattedExample = example.trim();

    if (type === 'object' || type.startsWith('array')) {
      formattedExample = JSON.stringify(JSON.parse(formattedExample), null, 2);
    }

    if (type === 'string') {
      formattedExample = `"${formattedExample}"`;
    }
  }

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

      <Tag
        className={styles.type}
      >
        {type}
      </Tag>


      {description && (
        <div
          className={styles.description}
        >
          {description}
        </div>
      )}

      {example && (
        <Example
          language={exampleLanguage}
        >
          {formattedExample}
        </Example>
      )}

      {(linkToSchemaId || schemaTags || services) && (
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
                  {value && (
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

          {services && (
            <ServiceTags
              className={styles['tags__service-tags']}
              services={services}
            />
          )}
        </div>
      )}
    </div>
  );
};

Property.propTypes = {
  children: PropTypes.element,
  example: PropTypes.string,
  linkToSchemaName: PropTypes.string,
  name: PropTypes.string.isRequired,
  schemaId: PropTypes.string,
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
  ] as const).isRequired,
};

export default Property;
