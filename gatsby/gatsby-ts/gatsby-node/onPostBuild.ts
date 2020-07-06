/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable filenames/match-exported */
import fs from 'fs';
import { GatsbyNode } from 'gatsby';
import path from 'path';

import specs from '../../src/specs';

export const onPreBuild: GatsbyNode['onPreInit'] = async () => {
  fs.writeFileSync(
    path.resolve(`${__dirname}../../../static/specs/minfraud.json`),
    JSON.stringify(specs.minFraud.getSpec()),
  );
};
