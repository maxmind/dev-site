import cheerio from 'cheerio';
import crypto from 'crypto';
import fs from 'fs';
import { GatsbySSR, ReplaceRendererArgs } from 'gatsby';
import GithubSlugger from 'github-slugger';
import React from 'react';
import { renderToString } from 'react-dom/server';

const slugger = new GithubSlugger();

const extractInlinedStyles = (args: ReplaceRendererArgs) => {
  const {
    bodyComponent,
    pathname,
    replaceBodyHTMLString,
    setHeadComponents,
  } = args;

  const $ = cheerio.load(
    renderToString(bodyComponent as React.ReactElement)
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

  const cssFileNameBase = (pathname as string)
    .replace(/^\/|\/$/g, '')
    .replace('.html', '');

  const cssFileName =
    `inline---${slugger.slug(cssFileNameBase) || 'index'}.${filenameHash}.css`;

  const integrityHash = crypto
    .createHash('sha512')
    .update(css)
    .digest('base64');

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(`public/${cssFileName}`, css, 'utf-8');

  setHeadComponents([
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

  replaceBodyHTMLString($('body').html() as string);
};

const addZendesk = (args: ReplaceRendererArgs) => {
  const { setPostBodyComponents } = args;

  setPostBodyComponents([
    <script
      id="ze-snippet"
      src="https://static.zdassets.com/ekr/snippet.js?key=e32809b5-6032-4c2f-b1f9-63931adc0cc1"
    />,
  ]);
};

export const replaceRenderer: GatsbySSR['replaceRenderer'] = (
  args: ReplaceRendererArgs
): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  addZendesk(args);
  extractInlinedStyles(args);
};
