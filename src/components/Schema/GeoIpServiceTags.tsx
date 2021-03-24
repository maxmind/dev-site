import PropTypes from 'prop-types';
import * as React from 'react';

import ServiceTag from './ServiceTag';

interface IServiceTags {
  services: GeoIpServices;
}

const GeoIpServiceTags: React.FC<IServiceTags> = (props) => {
  const { services } = props;

  return (
    <div>
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
  services: PropTypes.any.isRequired,
};

export default GeoIpServiceTags;
