import { mount } from 'enzyme';
import * as React from 'react';

import GeoIpServiceTags from './GeoIpServiceTags';

// eslint-disable-next-line css-modules/no-unused-class
import * as styles from './ServiceTag.module.scss';

describe('<GeoIpServiceTags />', () => {
  it('renders all service tags', () => {
    const component = mount(
      <GeoIpServiceTags
        services={'*'}
      />
    );

    expect(
      component.find('Tag[children="Country"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="City"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).not.toHaveClassName(styles['tag__disabled']);
  });

  it('renders `country` service tag', () => {
    const component = mount(
      <GeoIpServiceTags
        services={[
          'country',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Country"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="City"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).toHaveClassName(styles['tag__disabled']);
  });

  it('renders `city` service tag', () => {
    const component = mount(
      <GeoIpServiceTags
        services={[
          'city',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Country"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="City"]')
    ).not.toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).toHaveClassName(styles['tag__disabled']);
  });

  it('renders `insights` service tag', () => {
    const component = mount(
      <GeoIpServiceTags
        services={[
          'insights',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Country"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="City"]')
    ).toHaveClassName(styles['tag__disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).not.toHaveClassName(styles['tag__disabled']);
  });
});
