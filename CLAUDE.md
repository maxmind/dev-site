# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MaxMind developer documentation site built with Hugo, TypeScript, and SCSS. Hosted on Cloudflare Pages.

## Development Setup

Tool versions are managed by [mise](https://mise.jdx.dev/) (Hugo, pnpm, Node.js, precious, Dart Sass). See `mise.toml` for versions.

```sh
mise trust && mise install   # Install all required tools
pnpm install                 # Install Node.js dependencies
git/setup.sh                 # Install pre-commit hook (runs precious lint --staged)
```

## Common Commands

- **Dev server:** `hugo server`
- **Build:** `./build.sh`
- **Lint changed files:** `precious lint -g`
- **Tidy changed files:** `precious tidy -g`
- **Lint all files:** `precious lint --all`
- **Format rawhtml content:** `pnpm run format:rawhtml <files>`
- **Generate Cloudflare headers:** `pnpm run build:headers`

There are no unit tests. Linting is the primary quality gate.

## Linting Architecture

`precious` (configured in `.precious.toml`) orchestrates all linting and formatting. Use `precious` rather than running individual tools. It runs:

- **ESLint + Prettier** on TypeScript (`assets/js/`, `bin/`)
- **Stylelint** on SCSS (`assets/scss/`)
- **Prettier** (markdown parser) on content (`content/**/*.md`, `assets/**/*.md`)
- **CSpell** for spell checking markdown (custom dictionary: `stopwords.txt`)
- **format-rawhtml** for content files using `{{< rawhtml >}}` shortcodes
- **shortcode-parity check** ensuring every `.html` shortcode has a `.md` counterpart
- **prettierignore-rawhtml check** ensuring rawhtml files are in `.prettierignore`

Files using `{{< rawhtml >}}` are excluded from prettier-markdown (listed in `.prettierignore`) and instead formatted by `format:rawhtml`.

## Code Style

- **TypeScript:** Single quotes, semicolons, 100-char max line length, strict mode. ESLint flat config in `eslint.config.mjs`.
- **SCSS:** Alphabetical property ordering, max nesting depth 4. Config in `.stylelintrc.cjs`.
- **Markdown:** Prose wrap always, Oxford commas. Raw HTML is allowed (MD033 disabled).

## Content Structure

Two main product sections under `content/`:
- **`geoip/`** — GeoIP database and web service documentation
- **`minfraud/`** — minFraud fraud detection service documentation

Each has subsections for docs (databases, web-services), release notes, and guides.

## Hugo Specifics

### Configuration

`hugo.toml` defines the sidebar navigation menus (`menus.geoip`, `menus.minfraud`, `menus.general`). Menu structure lives here, not in frontmatter.

Hugo generates both HTML and Markdown output formats for every page (configured via `[outputs]` and `[outputFormats]`).

### Shortcodes

Located in `layouts/shortcodes/`. Every shortcode must have both an `.html` implementation and a `.md` counterpart (enforced by linter). Key shortcodes: `alert`, `codeset`, `schema-table`, `geoip-schema-row`, `minfraud-schema-row`, `rawhtml`, `release-note`, `snippet`.

### Templates

- `layouts/_default/baseof.html` — root template
- `layouts/partials/` — reusable partials (head, header, footer, sidebar, page)
- `layouts/_default/_markup/` — Goldmark render hooks

### Frontmatter

Pages support `title`, `description` (SEO), `image` (social sharing, path without `static/` prefix), and `draft`.

## Important Files

- `hugo.toml` — Hugo config and navigation menus
- `.precious.toml` — Linting/formatting orchestration
- `bin/_headers.config.ts` — Cloudflare Pages headers (source of truth; never edit `static/_headers` directly)
- `static/_redirects` — URL redirects
- `stopwords.txt` — Custom spell check dictionary

## Brand Names

Always use correct capitalization: **MaxMind**, **minFraud**, **GeoIP**, **GeoLite**.
