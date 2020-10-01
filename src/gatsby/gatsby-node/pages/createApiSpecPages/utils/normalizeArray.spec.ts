import normalizeArray from './normalizeArray';

describe('normalizeArray()', () => {
  it('returns array when given an array', () => {
    expect(normalizeArray([
      'a',
    ])).toEqual([
      'a',
    ]);
  });

  it('returns array when anything besides an array', () => {
    expect(normalizeArray(1)).toEqual([
      1,
    ]);
    expect(normalizeArray('a')).toEqual([
      'a',
    ]);
    expect(normalizeArray(true)).toEqual([
      true,
    ]);
  });
});
