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

const addHubspot = (args: ReplaceRendererArgs) => {
  const { setPostBodyComponents } = args;

  /* eslint-disable react/jsx-key */
  setPostBodyComponents([
    // HubSpot chat
    <script
      async
      defer
      id="hs-script-loader"
      src="//js-na1.hs-scripts.com/21266834.js"
      type="text/javascript"
    >
    </script>,
  ]);
  /* eslint-enable react/jsx-key */
};

export const replaceRenderer: GatsbySSR['replaceRenderer'] = (
  args: ReplaceRendererArgs
): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  addHubspot(args);
  extractInlinedStyles(args);
};
