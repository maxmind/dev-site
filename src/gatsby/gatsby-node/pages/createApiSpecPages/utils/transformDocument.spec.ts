import { OpenAPIV3 } from 'openapi-types';

import transformDocument from './transformDocument';

const baseSpec: OpenAPIV3.Document = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  openapi: '3.0.0',
  // eslint-disable-next-line sort-keys
  info: {
    version: '1.0',
    // eslint-disable-next-line sort-keys
    title: 'Example Spec',
  },
  paths: {},
  /* eslint-enable sort-keys-fix/sort-keys-fix */
};

describe('transformDocument()', () => {
  it('returns a promise', () => {
    expect(transformDocument(baseSpec)).toBeInstanceOf(Promise);
  });

  it('returns a recursively sorted object', async () => {
    const document = await transformDocument(baseSpec);
    expect(
      Object.keys(baseSpec).sort()
    ).toStrictEqual(
      Object.keys(document)
    );

    expect(
      Object.keys(baseSpec.info).sort()
    ).toStrictEqual(
      Object.keys(document.info)
    );
  });
});
