import React from 'react';

import data from '../../../static/specs/minfraud.json';
import ApiSpec from '../../templates/ApiSpec';

const Minfraud = (): React.ReactElement => (
  <ApiSpec
    description=""
    keywords={[]}
    specJson={data}
    tableOfContents={{
      items: [],
    }}
    title="GeoIP API Reference"
    type="geoip"
  >
    foo
  </ApiSpec>
);

export default Minfraud;
