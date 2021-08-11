import PropTypes from 'prop-types';
import * as React from 'react';

import Schema, { ISchema, schemaPropTypes } from './Schema';

interface IGeoIpSchema extends Omit<ISchema, 'productFamily'>{
  services?: GeoIpServices;
}

const GeoIpSchema: React.FC<IGeoIpSchema> = (props) => {
  return (
    <Schema
      productFamily="geoip"
      {...props}
    />
  );
};

GeoIpSchema.propTypes = {
  ...schemaPropTypes,
  services: PropTypes.oneOfType([
    PropTypes.oneOf([
      '*',
    ] as const),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'country',
        'city',
        'insights',
      ] as const).isRequired,
    ),
  ]),
};

export default GeoIpSchema;
