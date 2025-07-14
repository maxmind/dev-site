import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import prettier from "prettier";

// Tags to format
const tags = [
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
  "div",
  "section",
  "article",
  "ul",
  "ol",
  "li",
  "p",
  "a"
];

// Regex to find HTML blocks
const htmlBlockRegex = new RegExp(
  `<(${tags.join("|")})([^>]*)>[\\s\\S]*?<\\/\\1>`,
  "gi"
);

// Format HTML blocks inside Markdown content
const formatHtmlBlocks = async (content: string) => {
  const matches: { block: string; index: number }[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(htmlBlockRegex.source, htmlBlockRegex.flags);

  while ((match = regex.exec(content)) !== null) {
    matches.push({ block: match[0], index: match.index });
  }

  let formattedContent = content;
  for (let i = matches.length - 1; i >= 0; i--) {
    const { block, index } = matches[i];
    let formattedBlock: string;
    try {
      formattedBlock = (await prettier.format(block, { parser: "html" })).trim();
    } catch (e: any) {
      console.warn(`⚠️ Failed to format HTML block:\n${block}\nError: ${e.message}`);
      formattedBlock = block;
    }
    formattedContent =
      formattedContent.slice(0, index) +
      formattedBlock +
      formattedContent.slice(index + block.length);
  }
  return formattedContent;
};

// Get list of changed or staged Markdown files from git
const getChangedMarkdownFilesFromGit = (): string[] => {
  const staged = execSync("git diff --cached --name-only", {
    encoding: "utf-8"
  });
  const unstaged = execSync("git diff --name-only", {
    encoding: "utf-8"
  });

  const files = [...staged.split("\n"), ...unstaged.split("\n")]
    .map(f => f.trim())
    .filter(f => f.endsWith(".md") && fs.existsSync(f));

  return Array.from(new Set(files)); // Deduplicate
};

// Format one file and re-stage it if needed
const formatFile = async (filePath: string) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const formatted = await formatHtmlBlocks(raw);

  if (formatted !== raw) {
    fs.writeFileSync(filePath, formatted, "utf8");
    execSync(`git add "${filePath}"`);
    console.log(`✅ Formatted and staged ${filePath}`);
  } else {
    console.log(`✅ No changes needed in ${filePath}`);
  }
};

// Entrypoint
const main = async () => {
  const args = process.argv.slice(2);

  if (args.includes("--git")) {
    const files = getChangedMarkdownFilesFromGit();
    if (files.length === 0) {
      console.log("📭 No changed or staged .md files found.");
      return;
    }

    for (const file of files) {
      await formatFile(file);
    }
  } else if (args.length === 1) {
    const inputFilePath = args[0];
    if (!fs.existsSync(inputFilePath)) {
      console.error(`❌ File not found: ${inputFilePath}`);
      process.exit(1);
    }
    await formatFile(inputFilePath);
  } else {
    console.error("❌ Usage:");
    console.error("npx ts-node format-rawhtml.ts --git");
    console.error("npx ts-node format-rawhtml.ts <file.md>");
    process.exit(1);
  }
};

main();
