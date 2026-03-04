import * as fs from 'fs';

const PATTERN = /https?:\/\/dev\.maxmind\.com/;

const files = process.argv.slice(2);

if (files.length === 0) {
  console.log('No files to check.');
  process.exit(0);
}

let hasErrors = false;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (PATTERN.test(lines[i])) {
      hasErrors = true;
      console.error(
        `⚠️ ${filePath}:${i + 1}: Found hardcoded internal link. Use a root-relative path (e.g., /geoip/...) instead of https://dev.maxmind.com/...`
      );
    }
  }
}

if (hasErrors) {
  console.error(
    '\n❌ Hardcoded dev.maxmind.com links found. Replace them with root-relative paths.'
  );
  process.exit(1);
}
