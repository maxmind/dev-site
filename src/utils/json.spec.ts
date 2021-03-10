import {
  inferType,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
} from './json';

describe('json utils', () => {
  describe('isArray()', () => {
    it('returns `true` if value is an array', () => {
      expect(isArray([])).toBe(true);
    });

    describe('returns `false` when', () => {
      it('value is null', () => {
        expect(isArray(null)).toBe(false);
      });

      it('value is a string', () => {
        expect(isArray('')).toBe(false);
      });

      it('value is a boolean', () => {
        expect(isArray(true)).toBe(false);
      });

      it('value is a number', () => {
        expect(isArray(1)).toBe(false);
      });

      it('value is a object', () => {
        expect(isArray({})).toBe(false);
      });

    });
  });

  describe('isBoolean()', () => {
    it('returns `true` if value is a boolean', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    describe('returns `false` when', () => {
      it('value is null', () => {
        expect(isBoolean(null)).toBe(false);
      });

      it('value is a string', () => {
        expect(isBoolean('')).toBe(false);
      });

      it('value is a number', () => {
        expect(isBoolean(1)).toBe(false);
      });

      it('value is a object', () => {
        expect(isBoolean({})).toBe(false);
      });

      it('value is an array', () => {
        expect(isBoolean([])).toBe(false);
      });
    });
  });

  describe('isNumber()', () => {
    it('returns `true` if value is a number', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(1.1)).toBe(true);
    });

    describe('returns `false` when', () => {
      it('value is null', () => {
        expect(isNumber(null)).toBe(false);
      });

      it('value is a string', () => {
        expect(isNumber('')).toBe(false);
      });

      it('value is a boolean', () => {
        expect(isNumber(true)).toBe(false);
      });

      it('value is an object', () => {
        expect(isNumber({})).toBe(false);
      });

      it('value is an array', () => {
        expect(isNumber([])).toBe(false);
      });
    });
  });

  describe('isObject()', () => {
    it('returns `true` if value is a boolean', () => {
      expect(isObject({})).toBe(true);
    });

    describe('returns `false` when', () => {
      it('value is null', () => {
        expect(isObject(null)).toBe(false);
      });

      it('value is a string', () => {
        expect(isObject('')).toBe(false);
      });

      it('value is a number', () => {
        expect(isObject(1)).toBe(false);
      });

      it('value is a boolean', () => {
        expect(isObject(false)).toBe(false);
      });

      it('value is an array', () => {
        expect(isObject([])).toBe(false);
      });
    });
  });

  describe('isString()', () => {
    it('returns `true` if value is a string', () => {
      expect(isString('')).toBe(true);
    });

    describe('returns `false` when', () => {
      it('value is null', () => {
        expect(isString(null)).toBe(false);
      });

      it('value is a number', () => {
        expect(isString(1)).toBe(false);
      });

      it('value is a boolean', () => {
        expect(isString(false)).toBe(false);
      });

      it('value is an object', () => {
        expect(isString({})).toBe(false);
      });

      it('value is an array', () => {
        expect(isString([])).toBe(false);
      });
    });
  });

  describe('inferType()', () => {
    it('returns `array` when given an array', () => {
      expect(inferType([])).toBe('array');
    });

    it('returns `boolean` when given an boolean', () => {
      expect(inferType(true)).toBe('boolean');
    });

    it('returns `number` when given a number', () => {
      expect(inferType(1)).toBe('number');
    });

    it('returns `object` when given an object', () => {
      expect(inferType({})).toBe('object');
    });

    it('returns `string` when given a string', () => {
      expect(inferType('')).toBe('string');
    });

    it('throws an error if a type cannot be inferred', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => inferType(null)).toThrowError(
        // eslint-disable-next-line max-len
        'Cannot infer type from value. See console error labeled: `Invalid Type`'
      );

      expect(console.error).toHaveBeenLastCalledWith('Invalid Type', null);

      spy.mockRestore();
    });
  });
});


