import * as React from 'react';

import DatabaseIcon from './svgs/database-icon.svg';
import GeoIP2Icon from './svgs/geoip2-icon.svg';
import GeoLite2Icon from './svgs/geolite2-icon.svg';
import MinFraudIcon from './svgs/minfraud-icon.svg';
import WebServiceIcon from './svgs/web-service-icon.svg';

export const Icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  DatabaseIcon,
  GeoIP2Icon,
  GeoLite2Icon,
  MinFraudIcon,
  WebServiceIcon,
};
