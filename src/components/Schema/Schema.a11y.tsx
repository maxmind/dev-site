import { mount  } from 'enzyme';
import * as React from 'react';

import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';

describe('<Schema />', () => {
  it('has no Pa11y violations', async () => {
    const component = mount(
      <Schema
        name={'Foo'}
        services={[
          'score',
          'factors',
        ]}
      >
        <P>This is a description of the schema.</P>

        <Property
          example="foo"
          name="foo"
          type="string"
        >
          <P>This is a description of property `foo`.</P>
        </Property>

        <Property
          example={`
            {
              "foo": "foo",
              "bar": "bar"
            }
          `}
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
