import PropTypes from 'prop-types';
import * as React from 'react';

import ServiceTag from './ServiceTag';

interface IServiceTags {
  className?: string;
  services: MinFraudServices;
}

const MinFraudServiceTags: React.FC<IServiceTags> = (props) => {
  const { className, services } = props;

  return (
    <div
      className={className}
    >
      <ServiceTag
        isDisabled={services !== '*' && !services.includes('score')}
        text="Score"
      />

      <ServiceTag
        isDisabled={services !== '*' && !services.includes('insights')}
        text="Insights"
      />

      <ServiceTag
        isDisabled={services !== '*' && !services.includes('factors')}
        text="Factors"
      />
    </div>
  );
};

MinFraudServiceTags.propTypes = {
  className: PropTypes.string,
  services: PropTypes.any.isRequired,
};

export default MinFraudServiceTags;
