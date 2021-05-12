/* eslint-disable filenames/match-exported */
import * as React from 'react';

import {
  DegradedPerformanceIcon,
  OperationalIcon,
  PartialServiceDisruptionIcon,
  SecurityEventIcon,
  ServiceDisruptionIcon,
} from '../components/SystemsStatusIcons';

type SystemStatus = {
  class: string;
  icon: JSX.Element;
  message?: string;
  title: string;
}

// https://kb.status.io/developers/status-codes/
const status: Record<string, SystemStatus> = {
  DEGRADED_PERFORMANCE: {
    class: 'degraded_performance',
    icon: <DegradedPerformanceIcon />,
    // eslint-disable-next-line max-len
    message: 'We are currently experiencing degraded performance in some of our web services.',
    title: 'Degraded Performance',
  },
  OPERATIONAL: {
    class: 'operational',
    icon: <OperationalIcon />,
    title: 'Operational',
  },
  PARTIAL_SERVICE_DISRUPTION: {
    class: 'partial_service_disruption',
    icon: <PartialServiceDisruptionIcon />,
    message: 'Some of our web services are temporarily unavailable.',
    title: 'Partial Service Disruption',
  },
  SECURITY_EVENT: {
    class: 'security_event',
    icon: <SecurityEventIcon />,
    // eslint-disable-next-line max-len
    message: 'We are currently mitigating issues relating to some of our web services.',
    title: 'Security Event',
  },
  SERVICE_DISRUPTION: {
    class: 'service_disruption',
    icon: <ServiceDisruptionIcon />,
    message: 'Our web services are temporarily unavailable.',
    title: 'Service Disruption',
  },
};

const useSystemStatus = (): null | SystemStatus => {
  const [
    systemStatus,
    setSystemStatus,
  ] = React.useState<null | SystemStatus>(null);

  const getSystemStatus = () => fetch(
    'https://status.maxmind.com/1.0/status/53fcfbb2ac0c957972000235',
  )
    .then(res => res.json())
    .then(json => {
      const { status_code } = json.result.status_overall;
      switch (status_code) {
      case 100:
        setSystemStatus(status.OPERATIONAL);
        break;
      case 300:
        setSystemStatus(status.DEGRADED_PERFORMANCE);
        break;
      case 400:
        setSystemStatus(status.PARTIAL_SERVICE_DISRUPTION);
        break;
      case 500:
        setSystemStatus(status.SERVICE_DISRUPTION);
        break;
      case 600:
        setSystemStatus(status.SECURITY_EVENT);
        break;
      }
    })
    .catch(() => {
      /**
       * No-op
       *
       * If something goes wrong, we intentionally want to swallow the error
       * and prevent the UI from knowing
       */
    });

  React.useEffect(() => {
    getSystemStatus();

    const intervalId = setInterval(() => {
      getSystemStatus();
    }, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return systemStatus;
};

export default useSystemStatus;
