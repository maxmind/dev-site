import * as React from 'react';

import MaxMindIpAddresses from '../../static/maxmind-server-ip-addresses.json';
import Example from './Example';
import { p as P } from './Mdx';

const lastUpdated = new Date(MaxMindIpAddresses.lastUpdated).toUTCString();

const IpAddresses: React.FC = () => (
  <>
    <Example
      language="bash"
    >
      {MaxMindIpAddresses.IPv4.join('\n')}
      {'\n'}
      {MaxMindIpAddresses.IPv6.join('\n')}
    </Example>
    <P>
      Last updated:
      {' '}
      {lastUpdated}
    </P>
  </>
);

export default IpAddresses;
