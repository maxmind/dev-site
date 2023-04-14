const { existsSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const sitemapFile = resolve('./public/sitemap-pages.xml');

if (!existsSync(sitemapFile)) {
  console.error(`ERROR: ${sitemapFile} not found.`);
  process.exit();
}

const sitemapContents = readFileSync(sitemapFile, 'utf-8');

writeFileSync(
  sitemapFile,
  sitemapContents,
);
