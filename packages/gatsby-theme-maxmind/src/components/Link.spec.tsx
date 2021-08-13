import { shallow } from 'enzyme';
import { Link as GatsbyLink } from 'gatsby';
import * as React from 'react';

import Link from './Link';

describe('Link', () => {
  it('appends query string to Link', () => {
    const component = shallow(
      <Link
        to="/foo"
      />
    );

    expect(component.find(GatsbyLink).prop('to')).toBe('/foo?lang=en');
  });

  it('does not append query string to Link if prop is passed in', () => {
    const component = shallow(
      <Link
        omitLangQuery={true}
        to="/foo"
      />
    );

    expect(component.find(GatsbyLink).prop('to')).toBe('/foo');
  });

  it('appends query string to Link, but before hash', () => {
    const component = shallow(
      <Link
        to="/foo#bar"
      />
    );

    expect(component.find(GatsbyLink).prop('to')).toBe('/foo?lang=en#bar');
  });

  it('does not double add query string', () => {
    const component = shallow(
      <Link
        to="/foo?lang=en"
      />
    );

    expect(component.find(GatsbyLink).prop('to')).toBe('/foo?lang=en');
  });

  it('does not double add query string paths with hash', () => {
    const component = shallow(
      <Link
        to="/foo?lang=en#bar"
      />
    );

    expect(component.find(GatsbyLink).prop('to')).toBe('/foo?lang=en#bar');
  });
});
