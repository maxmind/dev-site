import { mount  } from 'enzyme';
import * as React from 'react';

import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';

const json = {
  bar: {
    bar: 'bar',
    foo: 'foo',
  },
  foo: 'foo',
};

describe('<Schema />', () => {
  it('has no Pa11y violations', async () => {
    const component = mount(
      <Schema
        json={json}
        jsonPointer="/"
        name={'Foo'}
        productFamily="minfraud"
        services={[
          'score',
          'factors',
        ]}
      >
        <P>This is a description of the schema.</P>

        <Property
          name="foo"
        >
          <P>This is a description of property `foo`.</P>
        </Property>

        <Property
          name="bar"
          tags={{
            bar: 'bar',
            foo: 'foo',
          }}
          type="object"
        >
          <P>This is a description of property `bar`.</P>
        </Property>
      </Schema>
    );

    const results = await pa11y(component, {
      ignore: [
        'region',
      ],
    });
    expect(results).toHaveNoPa11yViolations();
  });
});
