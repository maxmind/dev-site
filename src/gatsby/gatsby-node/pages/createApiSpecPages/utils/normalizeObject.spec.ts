import normalizeObject from './normalizeObject';

describe('normalizeObject()', () => {
  it('returns object when given an object', () => {
    expect(normalizeObject({
      a: 'a',
    })).toEqual({
      a: 'a',
    });
  });

  it('returns an object when given an array', () => {
    expect(normalizeObject([])).toEqual([]);
  });

  it('returns object when anything besides an object', () => {
    expect(normalizeObject(1)).toEqual({});
    expect(normalizeObject('a')).toEqual({});
    expect(normalizeObject(true)).toEqual({});
  });
});
