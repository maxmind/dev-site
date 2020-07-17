import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Heading.module.scss';
import Type from './Type';
import { getRefAnchorLink } from './utils';

interface IHeading {
  name: string;
  schema: SchemaObject;
}

const NameRegex = new RegExp('\\.', 'g');

const Heading: React.FC<IHeading> = (
  props
): React.ReactElement => {
  const id = props.name.replace(NameRegex, '_');

  return (
    <h1
      className={styles['schema__heading']}
      id={id}
    >
      <a
        className={styles['schema__heading-link']}
        href={`#${id}`}
      >
        {props.name.replace(NameRegex, ' › ')}
      </a>
      {' '}

      <Type
        className={styles['schema__heading-type']}
      >
        {props.schema.type === 'array' ? (
          <>
            {props.schema.items?.$ref
              && getRefAnchorLink(props.schema.items?.$ref)
            }
            []
          </>
        ) : (
          <>
            {props.schema.type}
          </>
        )}
      </Type>
    </h1>
  );
};

Heading.propTypes = {
  name: PropTypes.string.isRequired,
  schema: PropTypes.any.isRequired,
};

export default Heading;
