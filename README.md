<h1 align="center">
  <img
    alt="MaxMind"
    src="assets/maxmind-logo.svg"
    width="300"
  >
  <br>
  <br>
  <small>Developer Documentation Static Site Generator</small>
</h1>

---

## Overview

- **Static Site Generator**: [Hugo](https://gohugo.io/) +
  [TypeScript](https://www.typescriptlang.org/) +
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)

## Usage

- [Minimum Requirements](#minimum-requirements)
- [Installation](#installation)
- [Development](#development)
  - [Development Server](#development-server)
- [Updating Release Notes for the New Year](#updating-release-notes-for-the-new-year)

### Prerequisites

This project uses [mise](https://mise.jdx.dev/) to manage tool versions
(Node.js, Hugo, pnpm, precious, Dart Sass).

#### Install mise

```sh
curl https://mise.jdx.dev/install.sh | sh
```

See the [mise installation guide](https://mise.jdx.dev/getting-started.html)
for other installation methods.

### Installation

```sh
mise trust    # Trust the mise.toml configuration
mise install  # Install all required tools (Node, Hugo, pnpm, etc.)
pnpm install  # Install Node.js dependencies
```

#### Pre-commit Hooks

You should install our pre-commit hook. You can do this from your checkout
by running `git/setup.sh`. These hooks do things like ensure that the code you
commit is tidy and passes various linter checks.

### Development

#### Development Server

The development server watches files, rebuilds the site, and reloads the browser
when files change.

```sh
hugo server
```

#### Cloudflare Pages HTTP Headers Configuration

The `static/_headers` file is automatically generated from
`bin/_headers.config.ts` during the build process. **Do not edit `static/_headers`
directly**.

##### Making Changes to Headers

1. Edit `bin/_headers.config.ts` (the source of truth with readable format
   and TypeScript type safety)
2. Test your changes locally by generating the headers file:
   ```sh
   pnpm run build:headers
   ```
3. Commit only `bin/_headers.config.ts` - the `_headers` file will be
   generated automatically during deployment

##### Build-Time Generation

The headers file is generated automatically during deployment via `build.sh`.
You can also generate it manually for local testing with `pnpm run build:headers`.

### Updating Release Notes for the New Year

Whenever you create your first release note for a product category for a new
year:

1. Add a file called `<year>.md` to the `/content/<product>/release-notes`
   folder. (e.g., `/content/geoip/release-notes/2024.md`) - Add the header to
   your new release note file with the title: `<Product> Release Notes` (e.g.,
   `GeoIP Release Notes`) and draft to `false`. - Add the email subscription notification to
   the top of the new file.
2. Change the `title:` field in the previous year's `md` file to read:
   `<Product> Release Notes - <Year> Archive` (e.g.,
   `GeoIP Release Notes - 2023 Archive`) - Remove the email subscription notification from the
   top of the archived file.
3. Update link to the release notes in the navigation menu (`hugo.toml`) to
   point to the current year's path.
4. Update the redirect in `static/_redirects` for the base release notes path
   to point to the current year.

### Updating Example CSVs

To do this, use the `create-example-csv-zips-for-dev-site` script in the
internal oneoffs repository.

### Adding Page Metadata for SEO and Social Sharing

#### Adding a description

In the markdown (mdx) file, add a `description` to the frontmatter located at
the top of the file:

```md
---
draft: false
title: GeoIP is the best
description: GeoIP is the best IP Intelligence product suite ever made
---
```

#### Adding an image

1. Add your image to the [static/images](static/images) directory.

2. In the markdown (mdx) file, add the path to the `image` key in the
   frontmatter located at the top of the file. **Do not include `static` to the
   path.** For example, if your file is at `static/images/geoip2-so-cool.gif`,
   your frontmatter would look like:

```md
---
draft: false
title: GeoIP is the best
description: GeoIP is the best IP Intelligence product suite ever made
image: /images/geoip2-so-cool.gif
---
```
