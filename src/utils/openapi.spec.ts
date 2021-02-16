import { OpenAPIV3 } from 'openapi-types';

import {
  formatSchemaName,
  isArraySchemaObject,
  isDocumentObject,
  isNonArraySchemaObject,
  isReferenceObject,
  isSchemaObject,
} from './openapi';

describe('formatSchemaName()', () => {
  describe(
    'replaces `|` with `›`, ensuring proper spacing before and after',
    () => {
      it.each([
        [
          'foo',
          'foo',
        ],
        [
          ' foo ',
          'foo',
        ],
        [
          'foo |',
          'foo |',
        ],
        [
          'foo | bar',
          'foo › bar',
        ],
      ])('given `%s`, returns `%s`', (given: string, expected: string) => {
        expect(formatSchemaName(given)).toBe(expected);
      });
    }
  );
});

describe('isArraySchemaObject()', () => {
  it('array type schema objects return true', () => {
    const obj: OpenAPIV3.SchemaObject = {
      items: {
        type: 'string',
      },
      type: 'array',
    };
    expect(isArraySchemaObject(obj)).toBe(true);
  });

  it('non-array type schema objects return false', () => {
    const obj: OpenAPIV3.SchemaObject = {
      type: 'string',
    };
    expect(isArraySchemaObject(obj)).toBe(false);
  });
});

describe('isDocumentObject()', () => {
  it('document objects return true', () => {
    const obj: OpenAPIV3.Document = {
      info: {
        title: '',
        version: '',
      },
      openapi: '',
      paths: {},
    };
    expect(isDocumentObject(obj)).toBe(true);
  });

  it('non-document objects return false', () => {
    const obj: OpenAPIV3.SchemaObject = {
      type: 'string',
    };
    expect(isDocumentObject(obj)).toBe(false);
  });
});

describe('isNonArraySchemaObject', () => {
  it('array type schema objects return false', () => {
    const obj: OpenAPIV3.SchemaObject = {
      items: {
        type: 'string',
      },
      type: 'array',
    };
    expect(isNonArraySchemaObject(obj)).toBe(false);
  });

  it('non-array type schema objects return true', () => {
    const obj: OpenAPIV3.NonArraySchemaObject = {
      type: 'string',
    };
    expect(isNonArraySchemaObject(obj)).toBe(true);
  });
});

describe('isReferenceObject()', () => {
  it('objects containing a `$ref` property are reference objects', () => {
    const obj: OpenAPIV3.ReferenceObject = {
      $ref: '',
    };
    expect(isReferenceObject(obj)).toBe(true);
  });

  it(
    'objects that don\'t contain a `$ref` property are not reference objects',
    () => {
      const obj: OpenAPIV3.SchemaObject = {};
      expect(isReferenceObject(obj)).toBe(false);
    }
  );
});

describe('isSchemaObject()', () => {
  it('document objects are not schema objects', () => {
    const obj: OpenAPIV3.Document = {
      info: {
        title: '',
        version: '',
      },
      openapi: '',
      paths: {},
    };
    expect(isSchemaObject(obj)).toBe(false);
  });

  it('reference objects are not schema objects', () => {
    const obj: OpenAPIV3.ReferenceObject = {
      $ref: '',
    };
    expect(isSchemaObject(obj)).toBe(false);
  });

  it('any non-reference, non-document objects are schema objects', () => {
    const obj = {};
    expect(isSchemaObject(obj)).toBe(true);
  });
});
