import dedent from 'dedent';
import remark from 'remark';
import html from 'remark-html';

import sectionize from './sectionize';

const content = dedent`
  # Heading 1
  ## Heading 2
  Additional text.

  Additional text.

  ### Heading 3
  Additional text.

  Additional text.

  ## Heading 2
  Additional text.
`.trim();

describe('sectionize', () => {
  it('default export returns a function', () => {
    expect(sectionize()).toBeInstanceOf(Function);
  });

  it('generated output matches expected html structure', async () => {
    const output = await remark()
      .use(sectionize)
      .use(html)
      .process(content)
      .then(result => String(result).trim());

    const expected = [
      /* eslint-disable indent */
      '<div id="toc-heading-1">',
        '<h1 id="heading-1">Heading 1</h1>',

        '<div id="toc-heading-2">',
          '<h2 id="heading-2">Heading 2</h2>',
          '<p>Additional text.</p>',
          '<p>Additional text.</p>',

          '<div id="toc-heading-3">',
            '<h3 id="heading-3">Heading 3</h3>',
            '<p>Additional text.</p>',
            '<p>Additional text.</p>',
          '</div>',
        '</div>',

        '<div id="toc-heading-2-1">',
          '<h2 id="heading-2-1">Heading 2</h2>',
          '<p>Additional text.</p>',
        '</div>',
      '</div>',
      /* eslint-enable indent */
    ].join('');

    expect(output).toEqual(`${expected}`);
  });
});
