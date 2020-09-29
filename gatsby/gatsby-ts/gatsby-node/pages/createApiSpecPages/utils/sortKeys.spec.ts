import sortKeys from './sortKeys';

const obj = {
  c: 'c',
  b: 'b',
  a: 'a',
};

const nestedObject = {
  d: obj,
  ...obj,
};

const arrayOfObjects = [
  obj,
  obj,
];

const arrayOfNestedObjects = [
  nestedObject,
  {
    foo: 'foo',
    bar: 'bar',
  },
  nestedObject,
];

describe('sorkKeys()', () => {
  it('sorts object keys', () => {
    expect(sortKeys(obj)).toStrictEqual({
      a: 'a',
      b: 'b',
      c: 'c',
    });
  });

  it('sorts keys of nested objects', () => {
    expect(sortKeys(nestedObject)).toStrictEqual({
      a: 'a',
      b: 'b',
      c: 'c',
      d: {
        a: 'a',
        b: 'b',
        c: 'c',
      }
    });
  });

  it('sorts keys of objects in arrays', () => {
    expect(sortKeys(arrayOfObjects)).toStrictEqual([
      {
        a: 'a',
        b: 'b',
        c: 'c',
      },
      {
        a: 'a',
        b: 'b',
        c: 'c',
      }
    ]);
  });

  it('sorts keys of objects in arrays', () => {
    expect(sortKeys(arrayOfNestedObjects)).toStrictEqual([
      {
        a: 'a',
        b: 'b',
        c: 'c',
        d: {
          a: 'a',
          b: 'b',
          c: 'c',
        }
      },
      {
        bar: 'bar',
        foo: 'foo',
      },
      {
        a: 'a',
        b: 'b',
        c: 'c',
        d: {
          a: 'a',
          b: 'b',
          c: 'c',
        }
      },
    ]);
  });
});
