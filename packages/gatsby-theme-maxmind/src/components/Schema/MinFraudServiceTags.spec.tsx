import { mount } from 'enzyme';
import * as React from 'react';

import MinFraudServiceTags from './MinFraudServiceTags';

// eslint-disable-next-line css-modules/no-unused-class
import * as styles from './ServiceTag.module.scss';

describe('<MinFraudServiceTags />', () => {
  it('renders all service tags', () => {
    const component = mount(
      <MinFraudServiceTags
        services={'*'}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).not.toHaveClassName(styles['tag__disabled']);
  });

  it('renders `score` service tag', () => {
    const component = mount(
      <MinFraudServiceTags
        services={[
          'score',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).toHaveClassName(styles['tag__disabled']);
  });

  it('renders `insights` service tag', () => {
    const component = mount(
      <MinFraudServiceTags
        services={[
          'insights',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).toHaveClassName(styles['tag__disabled']);
  });

  it('renders `factors` service tag', () => {
    const component = mount(
      <MinFraudServiceTags
        services={[
          'factors',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).not.toHaveClassName(styles['tag__disabled']);
  });
});
