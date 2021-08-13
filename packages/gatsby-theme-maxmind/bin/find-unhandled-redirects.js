/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable compat/compat */
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const { parseStringPromise } = require('xml2js');

const OUTPUT_FILE = path.resolve('.tmp/redirects.json');

const FIREBASE_URL = 'https://mm-static-site-staging.web.app';

const SOURCE_SITEMAPS = [
  'https://dev.maxmind.com/wp-sitemap-posts-page-1.xml',
  'https://dev.maxmind.com/wp-sitemap-posts-release_note-1.xml',
  'https://dev.maxmind.com/wp-sitemap-taxonomies-product-1.xml',
];

const findUnhandledRedirects = (sitemap) =>
  fetch(sitemap)
    .then((result) => result.text())
    .then((text) => parseStringPromise(text))
    .then((sitemap) => sitemap.urlset.url.reduce((acc, item) => ([
      ...acc,
      item.loc[0],
    ]), []))
    .then((urls) => urls.map((url) => url.replace(
      'https://dev.maxmind.com',
      FIREBASE_URL,
    )))
    .then((urls) => Promise.all(urls.map(url => fetch(url))))
    .then(responses => responses.map(res => ({
      redirected: res.redirected,
      status: res.status,
      url: res.url,
    })))
    .then(responses => responses.filter(res => res.status !== 200))
    .then(responses => responses.map(res => ({
      destination: '',
      source: new URL(res.url).pathname,
      type: 302,
    })));

Promise.all(SOURCE_SITEMAPS.map(sitemap => findUnhandledRedirects(sitemap)))
  .then(results => results.reduce((acc, result) => ([
    ...acc,
    ...result,
  ]), []))
  .then(redirects => {
    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
      fs.mkdirSync(path.dirname(OUTPUT_FILE));
    }

    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE, {
        recursive: true,
      });
    }

    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(redirects, null, 2)
    );
  });
