import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import Tag from './Tag';

import * as styles from './ServiceTag.module.scss';

interface IServiceTag {
  isDisabled?: boolean;
  text: string;
}

const ServiceTag: React.FC<IServiceTag> = (props) => {
  const { text, isDisabled } = props;
  return (
    <Tag
      className={classNames(
        styles.tag,
        {
          [styles.tag__disabled]: isDisabled,
        }
      )}
    >
      {text}
    </Tag>
  );
};

ServiceTag.propTypes = {
  isDisabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default ServiceTag;
