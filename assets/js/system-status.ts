window.addEventListener('DOMContentLoaded', () => {
  const $headerStatus = <HTMLDivElement>(
    document.querySelector('.header-system-status-container')
  );
  const $headerStatusMessage = <HTMLDivElement>(
    document.querySelector('.header__status-message')
  );

  const $operationalIcons = document.querySelectorAll('.operational');
  const $warningIcons = document.querySelectorAll('.warning');
  const $allSystemStatusIcons = document.querySelectorAll('.status-icon');

  type SystemStatus = {
    icons: NodeList;
    message: string;
    title: string;
  };

  // https://kb.status.io/developers/status-codes/
  const status: Record<number, SystemStatus> = {
    100: {
      icons: $operationalIcons,
      message: '',
      title: 'Operational',
    },
    200: {
      icons: $warningIcons,
      message: 'We are currently undergoing some scheduled maintenance.',
      title: 'Planned Maintenance',
    },
    300: {
      icons: $warningIcons,
      message:
        'We are currently experiencing degraded performance in some of our ' +
        'web services.',
      title: 'Degraded Performance',
    },
    400: {
      icons: $warningIcons,
      message: 'Some of our web services are temporarily unavailable.',
      title: 'Partial Service Disruption',
    },
    500: {
      icons: $warningIcons,
      message: 'Our web services are temporarily unavailable.',
      title: 'Service Disruption',
    },
    600: {
      icons: $warningIcons,
      message:
        'We are currently mitigating issues relating to some of our ' +
        'web services.',
      title: 'Security Event',
    },
  };

  const setSystemStatus = ($status: SystemStatus) => {
    $allSystemStatusIcons.forEach(($systemStatusIcon) => {
      if ($systemStatusIcon) {
        $systemStatusIcon.classList.remove('show-status-icon');
      }
    });

    // This should probably be cleaned up, but the
    // operational icon appears on the
    // page only once, whereas the other icons show twice.
    // All are hidden on page load using display: none;.

    if ($status.icons.length > 1) {
      $headerStatus.classList.add('show-header-system-status');
      $headerStatusMessage.innerText = `${$status.title}: ${$status.message}`;
    } else {
      $headerStatus.classList.remove('show-header-system-status');
    }

    $status.icons.forEach((icon) => {
      (icon as Element).classList.add('show-status-icon');
    });
  };

  const getSystemStatus = () =>
    fetch('https://status.maxmind.com/1.0/status/53fcfbb2ac0c957972000235')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('status document could not be fetched');
      })
      .then((json) => {
        const status_code = json.result.status_overall.status_code;
        if (!(Number(status_code) in status)) {
          throw new TypeError('status_code invalid');
        }
        if (json.result.incidents.length != 0) {
          setSystemStatus({
            icons: $warningIcons,
            message: json.result.incidents[0].name,
            title: status[Number(status_code)].title,
          });
          return;
        } else if (json.result.maintenance.active.length != 0) {
          setSystemStatus({
            icons: $warningIcons,
            message: json.result.maintenance.active[0].name,
            title: status[Number(status_code)].title,
          });
          return;
        }
        setSystemStatus(status[Number(status_code)]);
      })
      .catch(($error) => {
        console.error($error);
      });

  getSystemStatus();

  setInterval(() => {
    getSystemStatus();
  }, 30 * 1000);
});
