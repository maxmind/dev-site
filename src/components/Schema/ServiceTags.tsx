import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import Tag from './Tag';

import styles from './ServiceTags.module.scss';

interface IServiceTags {
  className?: string;
  services: MinFraudServices;
}

const renderTag = (service: string, isDisabled?: boolean) => (
  <Tag
    className={classNames(
      styles.tag,
      {
        [styles['tag--disabled']]: isDisabled,
      }
    )}
  >
    {service}
  </Tag>
);

const ServiceTags: React.FC<IServiceTags> = (props) => {
  const { className, services } = props;
  return (
    <div
      className={className}
    >
      {(services === '*' || services.includes('score'))
        ? renderTag('Score')
        : renderTag('Score', true)
      }

      {(services === '*' || services.includes('factors'))
        ? renderTag('Factors')
        : renderTag('Factors', true)
      }

      {(services === '*' || services.includes('insights'))
        ? renderTag('Insights')
        : renderTag('Insights', true)
      }
    </div>
  );
};

ServiceTags.propTypes = {
  className: PropTypes.string,
  services: PropTypes.any.isRequired,
};

export default ServiceTags;
