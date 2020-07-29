import React from 'react';

import data from '../../../static/specs/minfraud.json';
import ApiReference from '../../templates/ApiReference';

const MinfraudApiReference = (): React.ReactElement => (
  <ApiReference
    description=""
    keywords={[]}
    specJson={data}
    tableOfContents={{
      items: [],
    }}
    title="minFraud API Reference"
    type="minfraud"
  >
    foo
  </ApiReference>
);

export default MinfraudApiReference;
