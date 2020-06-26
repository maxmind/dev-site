/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable filenames/match-exported */
import fs from 'fs';
import { GatsbyNode } from 'gatsby';
import path from 'path';

import * as specs from '../../src/specs';

export const onPostBuild: GatsbyNode['onPostBuild'] = async () => {
  fs.writeFileSync(
    path.resolve(`${__dirname}../../../public/specs/minfraud.json`),
    JSON.stringify(specs.minFraud_2_0.getSpec()),
  );
};
