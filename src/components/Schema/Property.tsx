import { useLocation } from '@reach/router';
import CustomPropTypes from 'airbnb-prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';

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
  example?: string;
  linkToSchemaName?: string;
  name: string;
  schemaId?: string;
  services?: MinFraudServices;
  tags?: Record<string, TagValue>;
  type: SchemaPropertyType;
}

const Property: React.FC<IProperty> = (props) => {
  const location = useLocation();

  const {
    addToSchemaExample,
    id: schemaId,
    jsonPointer: schemaJsonPath,
    services: schemaServices,
  } = React.useContext(SchemaContext);

  const [
    formattedExample,
    setFormattedExample,
  ] = React.useState('');

  const {
    children: description,
    example,
    linkToSchemaName,
    tags: schemaTags,
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

  React.useEffect(() => {
    if (example) {
      addToSchemaExample({
        payload: {
          name,
          type,
          value: example,
        },
      });

      const trimmedExample = example.trim();

      if (type === 'object' || type.startsWith('array')) {
        return setFormattedExample(JSON.stringify(
          JSON.parse(trimmedExample),
          null,
          2
        ));
      }

      if (type === 'string') {
        return setFormattedExample(`"${trimmedExample}"`);
      }

      return setFormattedExample(trimmedExample);
    }
  }, [
    addToSchemaExample,
    example,
    name,
    type,
  ]);

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
          label="Example"
          language={exampleLanguage}
        >
          <>
            {exampleLanguage === 'json' ? '//' : '#'}
            {` JSON Path: ${schemaJsonPath}.${name}\n`}
            {formattedExample}
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
  example: PropTypes.string,
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
  ] as const).isRequired,
};

export default Property;
