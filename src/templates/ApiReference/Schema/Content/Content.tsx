import classNames from 'classnames';
import { OpenAPIV3 } from 'openapi-types';
import PropTypes from 'prop-types';
import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';

import { renderMarkdown } from '../../../../utils/markdown';
import Properties from './Properties';

import * as styles from './Content.module.scss';

interface IContent {
  className?: string;
  handleExpand: () => void;
  handleHightlightLines: (lines: string) => void;
  isExpanded?: boolean;
  name: string;
  schema: OpenAPIV3.SchemaObject;
}

const Content: React.FC<IContent> = (
  props
): React.ReactElement => {
  return (
    <div
      className={classNames(
        styles.body,
        props.className
      )}
    >
      <div
        className={styles.properties}
      >
        {props.schema.description
          && (
            <div
              className={styles.description}
            >
              {renderMarkdown(
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
          styles.toggleExample,
          {
            [
            styles.isExpanded
            ]: props.isExpanded,
          }
        )}
        onClick={props.handleExpand}
      >
        {props.isExpanded ? (
          <>
            <span
              className={styles.btnIcon}
            >
              <FaAngleDoubleDown />
            </span>
            {' '}
            Hide
          </>
        ) : (
          <>
            <span
              className={styles.btnIcon}
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
  className: PropTypes.string,
  handleExpand: PropTypes.func.isRequired,
  handleHightlightLines: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  name: PropTypes.string.isRequired,
  schema: PropTypes.any.isRequired,
};

export default Content;
