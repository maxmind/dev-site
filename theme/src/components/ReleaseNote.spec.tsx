import { mount } from 'enzyme';
import * as React from 'react';

import H2 from './Mdx/H2';
import ReleaseNote from './ReleaseNote';

// eslint-disable-next-line css-modules/no-unused-class
import * as styles from './ReleaseNote.module.scss';

describe('ReleaseNote', () => {
  const component = mount(
    <ReleaseNote
      date="2021-10-23"
      title="Test Title"
    >
      <p>Hello world</p>
    </ReleaseNote>
  );

  it('renders children', () => {
    expect(component.find('p')).toHaveText('Hello world');
  });

  it('renders humanized date', () => {
    expect(component.find(`.${styles.date}`)).toHaveText('October 23, 2021');
  });

  it('renders title with slugified id', () => {
    const $title = component.find(H2);

    expect($title).toHaveText('Test Title');
    expect($title.prop('id')).toBe('test-title');
  });

  it('throws an error if date prop is in wrong format', () => {
    // silence prop type console error
    console.error = jest.fn();

    const badDate = () => {
      mount(
        <ReleaseNote
          //@ts-expect-error: We're using a bad date format
          date="foobar"
          title="Test Title"
        >
          <p>Hello world</p>
        </ReleaseNote>
      );
    };

    expect(badDate).toThrow();
  });
});
