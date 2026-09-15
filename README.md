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
- [Creating a Release Note](#creating-a-release-note)

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

### Creating a Release Note

Each release note is its own content file. Create one with the `release-note`
archetype:

```sh
hugo new content --kind release-note geoip/release-notes/2026-01-15-geoip2-city-database-update.md
```

The archetype fills in the title from the filename, stamps the current date and
time, and sets `draft = false`. The time component orders notes that are
published on the same day, so do not replace it with a bare date. If you create
two different notes in the same second, move the later one forward by a minute
so that the order is unambiguous.

Rewrite the generated title before you publish. Note titles use sentence case,
but the archetype capitalizes only the first word of the slug, which is rarely
the final wording you want.

#### Filename Convention

Name the file `<YYYY-MM-DD>-<slug>.md`, where the date is the publication date
and the slug describes the note. The filename becomes the URL, so keep it
readable and do not change it after the note is published.

The date in the filename must match the date in the front matter. The archetype
stamps the current date, so create the file on the day you publish it.

#### Cross-Posting to Both Products

A note that applies to GeoIP and minFraud is two files, one in each product's
`release-notes` folder. Run the command twice with the same filename:

```sh
hugo new content --kind release-note geoip/release-notes/2026-01-15-web-service-maintenance.md
hugo new content --kind release-note minfraud/release-notes/2026-01-15-web-service-maintenance.md
```

Then copy the `date` value from the first file into the second. The two runs
stamp times that are seconds apart, and a shared timestamp keeps the note in the
same position in both listings and both feeds. You can then edit each copy
independently, for example to list the services that each product affects.

#### Setting a Description

The `description` field is optional. It controls the preview card that Slack,
email clients, and search engines show for the release note. Without it, the preview
falls back to the opening of the release note body.

```toml
+++
title = 'Monthly GeoIP database diff report'
date = 2026-01-15T09:30:00-05:00
draft = false
description = 'Changes between the December and January GeoIP database releases.'
+++
```

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
