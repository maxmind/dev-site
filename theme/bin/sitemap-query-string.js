const { existsSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const sitemapFile = resolve('./public/sitemap-pages.xml');
const queryString = 'lang=en';

if (!existsSync(sitemapFile)) {
  console.error(`ERROR: ${sitemapFile} not found.`);
  return;
}


const sitemapContents = readFileSync(sitemapFile, 'utf-8');
const locRegex = /<loc>(.*?)<\/loc>/g;

if (
  sitemapContents.match(locRegex).length > 0 &&
  sitemapContents.match(locRegex)[0].includes(queryString)
) {
  console.log('Query string is already present in sitemap.');
  return;
}

console.log(`Adding query string to sitemap: ${queryString}`);

const newSitemapContents = sitemapContents
  .replace(locRegex, `<loc>$1?${queryString}</loc>`);

writeFileSync(
  sitemapFile,
  newSitemapContents,
);
