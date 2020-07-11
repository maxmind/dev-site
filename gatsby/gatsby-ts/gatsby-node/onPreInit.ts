import fs from 'fs';
import { GatsbyNode } from 'gatsby';
import path from 'path';

import { getRenderedSpec } from '../../src/specs/minfraud/2.0/Spec';

export const onPreInit: GatsbyNode['onPreInit'] = async () => {
  const data = await getRenderedSpec();

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(
    path.resolve(`${__dirname}../../../static/specs/minfraud.json`),
    JSON.stringify(data, null, 2),
  );
};
