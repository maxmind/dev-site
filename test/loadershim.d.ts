import { ReactWrapper } from 'enzyme';
import * as React from 'react';

declare global {
  function mountWithRouter(child: React.ReactElement): ReactWrapper;
  // eslint-disable-next-line no-var
  var ___loader: {
    enqueue: jest.Mock;
  };
}
