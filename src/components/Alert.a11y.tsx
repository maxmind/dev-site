import { mount  } from 'enzyme';
import * as React from 'react';

import Alert from './Alert';

describe('Alert', () => {
  it('type of `error` has no Pa11y violations', async () => {
    const component = mount(
      <Alert
        type="error"
      >
        <p>Error</p>
      </Alert>
    );
    const results = await pa11y(component, {
      ignore: [
        'region',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });

  it('type of `info` has no Pa11y violations', async () => {
    const component = mount(
      <Alert
        type="info"
      >
        <p>Info</p>
      </Alert>
    );
    const results = await pa11y(component, {
      ignore: [
        'region',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });

  it('type of `success` has no Pa11y violations', async () => {
    const component = mount(
      <Alert
        type="success"
      >
        <p>Success</p>
      </Alert>
    );
    const results = await pa11y(component, {
      ignore: [
        'region',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });

  it('type of `warning` has no Pa11y violations', async () => {
    const component = mount(
      <Alert
        type="warning"
      >
        <p>Warning</p>
      </Alert>
    );
    const results = await pa11y(component, {
      ignore: [
        'region',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
