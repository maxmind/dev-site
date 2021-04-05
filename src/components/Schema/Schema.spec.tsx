import * as React from 'react';

import { p as P } from '../Mdx';
import Property from './Property';
import Schema from './Schema';

import * as styles from './Schema.module.scss';

const json = {
  bar: 'bar',
  baz: {
    baz: 'baz',
  },
  foo: 'foo',
};

describe('Schema', () => {
  it('renders children', async () => {
    const component = global.mountWithRouter(
      <Schema
        json={json}
        jsonPointer="/"
        name="Foo"
        productFamily="minfraud"
        type="object"
      >
        <P>This is example text.</P>

        <Property
          name="foo"
          type="string"
        >
          <p>This is a property value.</p>
        </Property>

        <Property
          name="foo"
          type="string"
        >
          <p>This is a property value.</p>
        </Property>
      </Schema>
    );
    expect(component.find('P')).toHaveLength(1);
    expect(component.find('Property')).toHaveLength(2);
  });

  it('infers the schema type', async () => {
    const component = global.mountWithRouter(
      <Schema
        json={json}
        jsonPointer="/"
        name="Foo"
        productFamily="minfraud"
      >
        <P>This is example text.</P>
      </Schema>
    );

    expect(
      component.find(`.${styles['heading__type']}`)
        .first().text()
    ).toBe('object');
  });

  it('does not infer the schema type if `json` prop is undefined', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const component = global.mountWithRouter(
      // @ts-expect-error leaving `json` undefined
      <Schema
        jsonPointer="/"
        name="Foo"
        productFamily="minfraud"
      >
        <P>This is example text.</P>
      </Schema>
    );

    expect(component.find(`.${styles['heading__type']}`)).not.toExist();
    expect(console.error).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('allows a custom schema type to be set', async () => {
    const component = global.mountWithRouter(
      <Schema
        json={json}
        jsonPointer="/"
        name="Foo"
        productFamily="minfraud"
        type={'array<object>'}
      >
        <P>This is example text.</P>
      </Schema>
    );

    expect(
      component.find(`.${styles['heading__type']}`)
        .first().text()
    ).toBe('array<object>');
  });

  describe('`services` property', () => {
    let component: any;

    beforeEach(() => {
      component = global.mountWithRouter(
        <Schema
          json={json}
          jsonPointer="/"
          name="Foo"
          productFamily="minfraud"
          services="*"
          type="object"
        >
          <P>This is example text.</P>

          <Property
            name="foo1"
            type="string"
          />

          <Property
            name="foo2"
            services={[
              'factors',
            ]}
            type="string"
          />
        </Schema>
      );
    });

    it(
      // eslint-disable-next-line max-len
      'passes `services` to `Property` children that do not have `service` property',
      () => {
        const property = component.find('Property').at(0);
        const serviceTags = property.find('MinFraudServiceTags');
        expect(serviceTags).toHaveLength(1);
        expect(serviceTags.props().services).toBe('*');
      }
    );

    it(
      // eslint-disable-next-line max-len
      '`Property` children that have `services` property defined overrides `service` property of Schema',
      () => {
        const property = component.find('Property').at(1);
        const serviceTags = property.find('MinFraudServiceTags');
        expect(serviceTags).toHaveLength(1);
        expect(serviceTags.props().services).toStrictEqual([
          'factors',
        ]);
      }
    );
  });
});
