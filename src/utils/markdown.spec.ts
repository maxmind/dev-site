import { mount } from 'enzyme';

import { renderMarkdown } from './markdown';

describe('renderMarkdown()', () => {
  it('renders markdown', () => {
    const component = mount(
      renderMarkdown(
        `
          # Foo

          foo

          ## Bar

          bar
        `
      )
    );

    expect(component.find('h1')).toExist();
    expect(component.find('h2')).toExist();

    const paragraphs = component.find('p');

    expect(paragraphs.at(0).text()).toBe('foo');
    expect(paragraphs.at(1).text()).toBe('bar');
  });
});
