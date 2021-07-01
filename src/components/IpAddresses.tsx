import * as React from 'react';

import MaxMindIpAddresses from '../../static/maxmind-server-ip-addresses.json';
import Example from './Example';

const IpAddresses: React.FC = () => (
  <Example
    language="bash"
  >
    {MaxMindIpAddresses.IPv4.join('\n')}
    {'\n'}
    {MaxMindIpAddresses.IPv6.join('\n')}
  </Example>
);

export default IpAddresses;
