// TODO - Figure out correct typings for React children that implement ISchema
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FaLink as LinkIcon } from 'react-icons/fa';

import { formatSchemaName } from '../../utils/openapi';
import Example from '../Example';
import SchemaContext from './SchemaContext';
import Tag from './Tag';

import styles from './Schema.module.scss';

interface ISchema {
  children: React.ReactElement | React.ReactElement[];
  example?: string;
  jsonPointer: string;
  name: string;
  services?: MinFraudServices;
  type: SchemaType;
}

const slugger = new GithubSlugger();

const Schema: React.FC<ISchema> = (props) => {
  const {
    children,
    example: exampleProp,
    jsonPointer,
    name,
    services,
    type,
  } = props;

  const [
    example,
    addToSchemaExample,
  ] = React.useReducer(
    (state: any, action: any) => {
      const { name: property, type, value } = action.payload;

      let formattedValue = value;

      if (type === 'object' || type.startsWith('array')) {
        formattedValue = JSON.parse(formattedValue);
      }

      if (type === 'boolean') {
        formattedValue = (formattedValue === 'true');
      }

      if (type === 'integer') {
        formattedValue = parseInt(formattedValue);
      }

      if (type === 'number') {
        formattedValue = new Number(formattedValue);
      }

      return {
        ...state,
        [property]: formattedValue,
      };
    },
    exampleProp ? JSON.parse(exampleProp) : {}
  );

  const formattedSchemaName = React.useMemo(
    () => formatSchemaName(name),
    [
      name,
    ]
  );

  const schemaId = React.useMemo(
    () => `schema--${slugger.slug(formattedSchemaName)}`,
    [
      formattedSchemaName,
    ]
  );

  const [
    schemaContent,
    propertyContent,
  ] = React.useMemo(() => {
    const content = React.Children.toArray(children);

    const firstPropertyComponentIndex =  content.findIndex(
      (child: any) => (
        child?.type?.name === 'Property'
          || child?.props?.mdxType === 'Property'
          || child?.props?.originalType?.name === 'MDXContent'
      )
    );

    return [
      content,
      content.splice(firstPropertyComponentIndex),
    ];
  }, [
    children,
  ]);

  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.heading}
        id={schemaId}
      >
        <span
          className={styles['heading__name']}
        >
          <Link
            className={styles['heading__link']}
            to={`#${schemaId}`}
          >
            <LinkIcon
              className={styles['heading__link-icon']}
            />
            {formattedSchemaName}
          </Link>
        </span>

        <span
          className={styles['heading__type']}
        >
          <Tag
            className={styles['heading__tag']}
          >
            {type}
          </Tag>
        </span>
      </div>
      <div
        className={styles.content}
      >
        <SchemaContext.Provider
          value={{
            addToSchemaExample,
            id: schemaId,
            jsonPointer,
            services,
          }}
        >
          {schemaContent}

          {Object.keys(example).length > 0 && (
            <Example
              label="Example"
              language="json"
            >
              <>
                {`// JSON Path: \`${jsonPointer}\`\n`}
                {JSON.stringify(example, null, 2)}
              </>
            </Example>
          )}

          {propertyContent}
        </SchemaContext.Provider>
      </div>
    </div>
  );
};

Schema.defaultProps = {
  type: 'object',
};

Schema.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element.isRequired
    ),
  ]).isRequired,
  example: PropTypes.string,
  jsonPointer: PropTypes.string.isRequired,
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
  type: PropTypes.oneOf([
    'array<object>',
    'object',
  ] as const).isRequired,
};

export default Schema;
