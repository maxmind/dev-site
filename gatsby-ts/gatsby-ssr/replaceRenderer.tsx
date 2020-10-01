import cheerio from 'cheerio';
import crypto from 'crypto';
import fs from 'fs';
import { GatsbySSR, ReplaceRendererArgs } from 'gatsby';
import React from 'react';
import { renderToString } from 'react-dom/server';

export const replaceRenderer: GatsbySSR['replaceRenderer'] = (
  props: ReplaceRendererArgs
): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const $ = cheerio.load(
    renderToString(props.bodyComponent as React.ReactElement)
  );
  const cssRules: string[] = [];

  const $elements = $('[style]');

  $elements.map((_: number, element) => {
    const $element = $(element);
    const styles = $element.attr('style');
    const className = `inlined__${crypto
      .randomBytes(4)
      .toString('hex')
    }`;
    $element.addClass(className);
    cssRules.push(`.${className} { ${styles}; }`);
    $element.removeAttr('style');
  });

  // eslint-disable-next-line quotes
  const css = cssRules.join("\n");

  const filenameHash = crypto
    .randomBytes(10)
    .toString('hex');

  const cssFileNameBase = (props.pathname as string)
    .replace(/^\/|\/$/g, '')
    .replace('/', '--')
    .replace('/', '.')
    .replace('.html', '');

  console.log(props.pathname, cssFileNameBase);

  const cssFileName =
    `inline---${cssFileNameBase || 'index'}.${filenameHash}.css`;

  const integrityHash = crypto
    .createHash('sha512')
    .update(css)
    .digest('base64');

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(`public/${cssFileName}`, css, 'utf-8');

  props.setHeadComponents([
    (
      <link
        href={`/${cssFileName}`}
        integrity={`sha512-${integrityHash}`}
        key={integrityHash}
        rel="stylesheet"
        type="text/css"
      />
    ),
  ] as React.ReactNode[]);

  props.replaceBodyHTMLString($('body').html() as string);
};
