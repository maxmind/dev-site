import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(currentDir, '..');

const grepOutput = execSync('grep -rl "{{< rawhtml >}}" content/ || true', {
  cwd: rootDir,
  encoding: 'utf8',
});
const rawhtmlFiles = new Set(grepOutput.trim().split('\n').filter(Boolean));

const ignoreFile = fs.readFileSync(
  path.join(rootDir, '.prettierignore'),
  'utf8'
);
const ignoreEntries = new Set(
  ignoreFile
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && l.startsWith('content/'))
);

const missing = [...rawhtmlFiles].filter((f) => !ignoreEntries.has(f)).sort();
const stale = [...ignoreEntries].filter((f) => !rawhtmlFiles.has(f)).sort();

if (missing.length) {
  console.log(
    '⚠️rawhtml detected in markdown file. Add file to .prettierignore:'
  );
  missing.forEach((f) => console.log(`   ${f}`));
}
if (stale.length) {
  console.log(
    '⚠️No rawhtml detected in file. Remove file from .prettierignore:'
  );
  stale.forEach((f) => console.log(`   ${f}`));
}

if (missing.length || stale.length) {
  process.exit(1);
}

console.log(`✅ .prettierignore in sync (${rawhtmlFiles.size} files)`);
