// TODO - Figure out correct typings for React children that implement ISchema
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FaLink as LinkIcon } from 'react-icons/fa';

import { formatSchemaName } from '../../utils/openapi';
import Example from './Example';
import { IProperty } from './Property';
import { Service } from './ServiceTags';
import Tag from './Tag';

import styles from './Schema.module.scss';

interface ISchema {
  children: React.ReactElement | React.ReactElement[];
  example?: string,
  name: string;
  services?: '*' | Service[];
  type: 'array<object>' | 'object';
}

const slugger = new GithubSlugger();

const isPropertyComponent = (child: any) => (
  // First option for Jest renderer. Second for MDX Runtime.
  child.type.name === 'Property' || child.props.mdxType === 'Property'
);

const Schema: React.FC<ISchema> = (props) => {
  const { children, name, services, type } = props;
  let { example } = props;

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

  const content = React.Children.toArray(children)
    .map((child: any) => {
      if (!isPropertyComponent(child)) {
        return child;
      }

      let props: any = {
        ...child.props,
        schemaId,
      };

      if (!child.props.services && services) {
        props = {
          ...props,
          services,
        };
      }

      return React.cloneElement<IProperty>(child, props);
    });

  if (type === 'object' && !example) {
    example = content.reduce(
      (accumulator: any, child) => {
        if (child?.props?.name && child?.props?.example) {
          const { example, name, type } = child.props;

          let formattedExample = example;

          if (type === 'object' || type.startsWith('array')) {
            formattedExample = JSON.parse(formattedExample);

            console.log(formattedExample);
          }

          if (type === 'boolean') {
            formattedExample = (formattedExample === 'true');
          }

          if (type === 'integer') {
            formattedExample = parseInt(formattedExample);
          }

          if (type === 'number') {
            formattedExample = new Number(formattedExample);
          }

          return {
            ...accumulator,
            [name]: formattedExample,
          };
        }

        return accumulator;
      },
      example,
    );

    example = JSON.stringify(example, null, 2);
  }

  if (example) {
    const exampleComponent = (
      <Example
        language="json"
      >
        {example}
      </Example>
    );

    const firstPropertyComponentIndex = content.findIndex(
      (child) => isPropertyComponent(child)
    );

    if (firstPropertyComponentIndex != -1) {
      content.splice(firstPropertyComponentIndex, 0, exampleComponent);
    } else {
      content.push(exampleComponent);
    }
  }

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
        {content}
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
