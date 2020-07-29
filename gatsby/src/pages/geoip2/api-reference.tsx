import React from 'react';

import data from '../../../static/specs/minfraud.json';
import ApiReference from '../../templates/ApiReference';

const GeoipApiReference = (): React.ReactElement => (
  <ApiReference
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
  </ApiReference>
);

export default GeoipApiReference;
