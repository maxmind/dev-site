const sortKeys = (x: any): any => {
  if (typeof x !== 'object' || !x) {
    return x;
  }

  if (Array.isArray(x)) {
    return x.map(sortKeys);
  }

  return Object.keys(x).sort().reduce(
    (o, k) => ({
      ...o,
      [k]: sortKeys(x[k]),
    }),
    {}
  );
};

export default sortKeys;
