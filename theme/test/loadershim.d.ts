import { ReactWrapper } from 'enzyme';
import * as React from 'react';

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Global {
      ___loader: {
        enqueue: jest.Mock;
      }
      mountWithRouter(child: React.ReactElement): ReactWrapper;
    }
  }
}

