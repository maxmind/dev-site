/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable filenames/match-exported */
const sortKeys = (x: any): any => {
  if (typeof x !== 'object' || x === null) {
    return x;
  }

  if (Array.isArray(x)) {
    return x.map(sortKeys);
  }

  return Object.keys(x)
    .sort()
    .reduce(
      (obj, key) => ({
        ...obj,
        // eslint-disable-next-line security/detect-object-injection
        [key]: sortKeys(x[key]),
      }),
      {}
    );
};

export default sortKeys;
