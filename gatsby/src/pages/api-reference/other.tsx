import React from 'react';

import data from '../../../static/specs/minfraud.json';
import ApiSpec from '../../templates/ApiReference';

const Minfraud = (): React.ReactElement => (
  <ApiSpec
    description=""
    keywords={[]}
    specJson={data}
    tableOfContents={{
      items: [],
    }}
    title="minFraud API Reference"
  >
    foo
  </ApiSpec>
);

export default Minfraud;
