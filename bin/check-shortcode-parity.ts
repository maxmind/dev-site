
import * as fs from 'fs';
import * as path from 'path';

const SHORTCODES_DIR = path.join(__dirname, '..', 'layouts', 'shortcodes');

function getShortcodeFiles(dir: string, extension: string): Set<string> {
  const files = new Set<string>();

  function scanDir(currentDir: string, basePath: string = ''): void {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const relativePath = basePath ? path.join(basePath, item) : item;
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath, relativePath);
      } else if (path.extname(item) === extension) {
        // Store the path without extension for comparison
        files.add(path.join(basePath, path.basename(item, extension)));
      }
    }
  }

  scanDir(dir);
  return files;
}

function checkShortcodeParity(): void {
  if (!fs.existsSync(SHORTCODES_DIR)) {
    console.error(`Error: ${SHORTCODES_DIR} directory not found`);
    process.exit(1);
  }

  console.log('Checking shortcode parity between HTML and Markdown files...\n');

  const htmlFiles = getShortcodeFiles(SHORTCODES_DIR, '.html');
  const mdFiles = getShortcodeFiles(SHORTCODES_DIR, '.md');

  const missingMd: string[] = [];
  const missingHtml: string[] = [];

  // Check for HTML files without corresponding MD files
  for (const file of htmlFiles) {
    if (!mdFiles.has(file)) {
      missingMd.push(file);
    }
  }

  // Check for MD files without corresponding HTML files
  for (const file of mdFiles) {
    if (!htmlFiles.has(file)) {
      missingHtml.push(file);
    }
  }

  let hasErrors = false;

  // Report missing markdown files
  if (missingMd.length > 0) {
    hasErrors = true;
    console.log('❌ HTML shortcodes missing corresponding Markdown files:');
    for (const file of missingMd) {
      console.log(`   - ${file}.html (missing ${file}.md)`);
    }
    console.log();
  }

  // Report missing HTML files (might be intentional, but worth noting)
  if (missingHtml.length > 0) {
    console.log('⚠️  Markdown shortcodes without corresponding HTML files:');
    for (const file of missingHtml) {
      console.log(`   - ${file}.md (missing ${file}.html)`);
    }
    console.log();
  }

  if (hasErrors) {
    console.log('❌ Shortcode parity check failed\n');
    console.log(
      'Every HTML shortcode should have a corresponding Markdown version.'
    );
    console.log(
      'Please create the missing Markdown shortcode files listed above.'
    );
    process.exit(1);
  } else {
    console.log('✅ All HTML shortcodes have corresponding Markdown versions');
    process.exit(0);
  }
}

checkShortcodeParity();
