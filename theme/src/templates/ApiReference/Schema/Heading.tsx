import classNames from 'classnames';
import { SchemaObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Type from './Type';
import { getRefAnchorLink } from './utils';

import * as styles from './Heading.module.scss';

interface IHeading {
  className?: string;
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
      className={classNames(
        styles['heading'],
        props.className,
      )}
      id={id}
    >
      <a
        className={styles['headingLink']}
        href={`#${id}`}
      >
        {props.name.replace(NameRegex, ' › ')}
      </a>
      {' '}

      <Type
        className={styles['headingType']}
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
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  schema: PropTypes.any.isRequired,
};

export default Heading;
