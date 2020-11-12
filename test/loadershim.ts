// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="jest" />

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Global {
    ___loader: {
      enqueue: jest.Mock;
    }
  }
}

global.___loader = {
  enqueue: jest.fn(),
};
