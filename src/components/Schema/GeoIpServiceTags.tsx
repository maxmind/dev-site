import PropTypes from 'prop-types';
import * as React from 'react';

import ServiceTag from './ServiceTag';
interface IServiceTags {
  className?: string;
  services: GeoIpServices;
}

const GeoIpServiceTags: React.FC<IServiceTags> = (props) => {
  const { className, services } = props;

  return (
    <div
      className={className}
    >
      <ServiceTag
        isDisabled={services !== '*' && !services.includes('country')}
        text="Country"
      />

      <ServiceTag
        isDisabled={services !== '*' && !services.includes('city')}
        text="City"
      />

      <ServiceTag
        isDisabled={services !== '*' && !services.includes('insights')}
        text="Insights"
      />
    </div>
  );
};

GeoIpServiceTags.propTypes = {
  className: PropTypes.string,
  services: PropTypes.any.isRequired,
};

export default GeoIpServiceTags;
