import * as React from 'react';
import {
  FaBookOpen as ApiReferenceIcon,
  FaCloud as WebServiceIcon,
  FaCogs as IntegrationsIcon,
  FaDatabase as DatabaseIcon,
  FaFileCsv as CsvIcon,
  FaMapMarkedAlt as GeolocateIAddressIcon,
} from 'react-icons/fa';

import GeoIPIcon from './svgs/geoip-icon.svg';
import MinFraudIcon from './svgs/minfraud-icon.svg';

export const Icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ApiReferenceIcon,
  CsvIcon,
  DatabaseIcon,
  GeoIPIcon,
  GeolocateIAddressIcon,
  IntegrationsIcon,
  MinFraudIcon,
  WebServiceIcon,
};
