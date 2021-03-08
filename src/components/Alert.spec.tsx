import { mount } from 'enzyme';
import * as React from 'react';

import Alert from './Alert';

describe('<Alert />', () => {
  it('`error` type uses correct icon', () => {
    const component = mount(
      <Alert
        type={'error'}
      >
        error
      </Alert>
    );
    expect(component.find('FaTimes')).toHaveLength(1);
  });

  it('`info` type uses correct icon', () => {
    const component = mount(
      <Alert
        type={'info'}
      >
        info
      </Alert>
    );
    expect(component.find('FaInfo')).toHaveLength(1);
  });

  it('`success` type uses correct icon', () => {
    const component = mount(
      <Alert
        type={'success'}
      >
        success
      </Alert>
    );
    expect(component.find('FaCheck')).toHaveLength(1);
  });

  it('`warning` type uses correct icon', () => {
    const component = mount(
      <Alert
        type={'warning'}
      >
        warning
      </Alert>
    );
    expect(component.find('FaExclamation')).toHaveLength(1);
  });
});
