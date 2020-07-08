import fs from 'fs';
import { GatsbyNode } from 'gatsby';
import path from 'path';

import specs from '../../src/specs';

export const onPreInit: GatsbyNode['onPreInit'] = async () => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(
    path.resolve(`${__dirname}../../../static/specs/minfraud.json`),
    JSON.stringify(specs.minFraud.getSpec()),
  );
  console.log(`${__dirname}../../../static/specs/minfraud.json`);
};
