import { Link } from 'gatsby';
import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FaLink as LinkIcon } from 'react-icons/fa';

import { formatSchemaName } from '../../utils/openapi';
import { IProperty } from './Property';
import { Service } from './ServiceTags';
import Tag from './Tag';

import styles from './Schema.module.scss';

interface ISchema {
  children: React.ReactElement | React.ReactElement[];
  name: string;
  services?: '*' | Service[];
}

const slugger = new GithubSlugger();

const Schema: React.FC<ISchema> = (props) => {
  const { children, name, services } = props;

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

  const properties = React.Children.toArray(children)
    .map((child: any) => {
      if (
        // First option for Jest renderer. Second for MDX Runtime.
        !(child.type.name === 'Property' || child.props.mdxType === 'Property')
      ) {
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
            object
          </Tag>
        </span>
      </div>
      <div
        className={styles.content}
      >
        {properties}
      </div>
    </div>
  );
};

Schema.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.element.isRequired
    ),
  ]).isRequired,
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
};

export default Schema;
