import * as React from 'react';
import {
  FaBookOpen as ApiReferenceIcon,
  FaCloud as WebServiceIcon,
  FaDatabase as DatabaseIcon,
} from 'react-icons/fa';

import GeoIP2Icon from './svgs/geoip2-icon.svg';
import GeoLite2Icon from './svgs/geolite2-icon.svg';
import MinFraudIcon from './svgs/minfraud-icon.svg';

export const Icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ApiReferenceIcon,
  DatabaseIcon,
  GeoIP2Icon,
  GeoLite2Icon,
  MinFraudIcon,
  WebServiceIcon,
};
