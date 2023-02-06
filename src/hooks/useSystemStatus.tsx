/* eslint-disable filenames/match-exported */
import * as React from 'react';

import {
  OperationalIcon,
  WarningIcon,
} from '../components/SystemsStatusIcons';

type SystemStatus = {
  class: string;
  icon: JSX.Element;
  message?: string;
  title: string;
}

// https://kb.status.io/developers/status-codes/
const status: Record<number, SystemStatus> = {
  100: {
    class: 'operational',
    icon: <OperationalIcon />,
    title: 'Operational',
  },
  200: {
    class: 'planned_maintenance',
    icon: <WarningIcon />,
    message: 'We are currently undergoing some scheduled maintenance.',
    title: 'Planned Maintenance',
  },
  300: {
    class: 'degraded_performance',
    icon: <WarningIcon />,
    // eslint-disable-next-line max-len
    message: 'We are currently experiencing degraded performance in some of our web services.',
    title: 'Degraded Performance',
  },
  400: {
    class: 'partial_service_disruption',
    icon: <WarningIcon />,
    message: 'Some of our web services are temporarily unavailable.',
    title: 'Partial Service Disruption',
  },
  500: {
    class: 'service_disruption',
    icon: <WarningIcon />,
    message: 'Our web services are temporarily unavailable.',
    title: 'Service Disruption',
  },
  600: {
    class: 'security_event',
    icon: <WarningIcon />,
    // eslint-disable-next-line max-len
    message: 'We are currently mitigating issues relating to some of our web services.',
    title: 'Security Event',
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
      const status_code = Number(json.result.status_overall);
      if (!(status_code in status)) {
        throw new TypeError('status_code invalid');
      }
      if (json.result.incidents.length != 0) {
        setSystemStatus({
          class: '',
          icon: <WarningIcon />,
          message: json.result.incidents[0].name,
          title: status[Number(status_code)].title,
        });
        return;
      }
      else if (json.result.maintenance.active.length != 0) {
        setSystemStatus({
          class: '',
          icon: <WarningIcon />,
          message: json.result.maintenance.active[0].name,
          title: status[Number(status_code)].title,
        });
        return;
      }
      setSystemStatus(status[Number(status_code)]);
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
