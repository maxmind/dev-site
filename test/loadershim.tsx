import {
  createHistory,
  createMemorySource,
  LocationProvider,
  RouteComponentProps,
  Router,
} from '@reach/router';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

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
