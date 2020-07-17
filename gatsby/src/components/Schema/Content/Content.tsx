import classNames from 'classnames';
import { SchemasObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';

import { renderMarkdownElement } from '../utils';
import styles from './Content.module.scss';
import Properties from './Properties';

interface IContent {
  handleExpand: () => void;
  handleHightlightLines: (lines: string) => void;
  isExpanded?: boolean;
  name: string;
  schema: SchemasObject;
}

const Content: React.FC<IContent> = (
  props
): React.ReactElement => {
  return (
    <div
      className={styles['schema__body']}
    >
      <div
        className={styles['schema__properties']}
      >
        {props.schema.description
          && (
            <div
              className={styles['schema__description']}
            >
              {renderMarkdownElement(
                props.schema.description as unknown as string
              )}
            </div>
          )
        }

        {props.schema && (
          <Properties
            data={props.schema}
            handleHightlightLines={props.handleHightlightLines}
            schemaName={props.name}
          />
        )}
      </div>
      <button
        className={classNames(
          styles['schema__toggle-example'],
          {
            [
            styles['schema__toggle-example-btn--is-expanded']
            ]: props.isExpanded,
          }
        )}
        onClick={props.handleExpand}
      >
        {props.isExpanded ? (
          <>
            <span
              className={styles['schema__toggle-example-btn-icon']}
            >
              <FaAngleDoubleDown />
            </span>
            {' '}
            Hide
          </>
        ) : (
          <>
            <span
              className={styles['schema__toggle-example-btn-icon']}
            >
              <FaAngleDoubleDown />
            </span>
            {' '}
            Show
          </>
        )}
        {' '}
        example
      </button>
    </div>
  );
};

Content.propTypes = {
  handleExpand: PropTypes.func.isRequired,
  handleHightlightLines: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  name: PropTypes.string.isRequired,
  schema: PropTypes.any.isRequired,
};

export default Content;
