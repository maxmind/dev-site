import {
  createHistory,
  createMemorySource,
  LocationProvider,
  RouteComponentProps,
  Router,
} from '@reach/router';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { TextEncoder } from 'util';

// TODO: Remove this once we get off of enzyme
global.TextEncoder = TextEncoder;

global.mountWithRouter = (child: React.ReactElement): ReactWrapper => {
  const history = createHistory(createMemorySource('/starting/url#foo'));

  const Page: React.FC<RouteComponentProps> = () => (
    <LocationProvider
      history={history}
    >
      {child}
    </LocationProvider>
  );

  return mount(
    <Router>
      <Page
        path="/"
      />
    </Router>
  );
};

global.___loader = {
  enqueue: jest.fn(),
};
