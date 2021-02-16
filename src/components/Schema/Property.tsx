import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';

import { formatSchemaName } from '../../utils/openapi';
import Pre from '../Mdx/Pre';
import ServiceTags from './ServiceTags';
import Tag from './Tag';

import styles from './Property.module.scss';

const slugger = new GithubSlugger();

type Service = 'score' | 'factors' | 'insights';

type TagValue = boolean | string | number;

export type PropertyType = 'boolean'
  | 'decimal'
  | 'enum'
  | 'integer'
  | 'object'
  | 'object[]'
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

  const exampleClassName = (type === 'object' || type === 'object[]')
    ? 'language-json'
    : 'language-cli';

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
      <div>
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
      </div>

      {description && (
        <div
          className={styles.description}
        >
          {description}
        </div>
      )}

      {example && (
        <div
          className={styles.example}
        >
          <div
            className={styles['example-label']}
          >
            Example:
          </div>

          <Pre
            className={classNames(
              styles['example-value'],
              'exampleClassName',
            )}
            showLineNumbers={false}
          >
            <code
              className={exampleClassName}
            >
              {(type === 'object' || type === 'object[]')
                ? JSON.stringify(JSON.parse(example), null, 2)
                : example.trim()
              }
            </code>
          </Pre>
        </div>
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
                  :
                  {' '}
                  <span
                    className={styles['tags__schema-tag-value']}
                  >
                    {value}
                  </span>
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
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]).isRequired
  ),
  type: PropTypes.oneOf([
    'boolean',
    'decimal',
    'enum',
    'integer',
    'object',
    'object[]',
    'string',
  ] as const).isRequired,
};

export default Property;
