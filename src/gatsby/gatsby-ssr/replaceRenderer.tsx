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

const addOlark = (args: ReplaceRendererArgs) => {
  const { setPostBodyComponents } = args;

  setPostBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(o,l,a,r,k,y){if(o.olark)return;
          r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0];
          y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r);
          y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)};
          y.extend=function(i,j){y("extend",i,j)};
          y.identify=function(i){y("identify",k.i=i)};
          y.configure=function(i,j){y("configure",i,j);k.c[i]=j};
          k=y._={s:[],t:[+new Date],c:{},l:a};
          })(window,document,"static.olark.com/jsclient/loader.js");
          olark.identify("8022-431-10-3383");`,
      }}
      key="olark"
    />,
  ]);
};

export const replaceRenderer: GatsbySSR['replaceRenderer'] = (
  args: ReplaceRendererArgs
): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  addOlark(args);
  extractInlinedStyles(args);
};
