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

### Minimum Requirements

The minimum Node and NPM versions can be found in the
[package.json file](package.json) under `engines`.

If you need help installing and/or managing Node and NPM versions, check out
[NVM](https://github.com/nvm-sh/nvm).

### Installation

```sh
npm install
```

- `npm install` installs the necessary node modules for development.

#### Install Precious

You should install our pre-commit hook. You can do this from your checkout by
running `git/setup.sh`. These hooks do things like ensure that the code you
commit is tidy and passes various linter checks.

#### Install Hugo

##### Homebrew (macOS)

```sh
brew install hugo
```

##### Debian / Ubuntu

It is recommended that you install
[the latest release of Hugo](https://github.com/gohugoio/hugo/releases/latest).
For debian and ubuntu users, they offer a .deb file.

##### Other OS

See [Hugo Installation](https://gohugo.io/getting-started/installing/)

#### Install Embedded Dart Sass

Download
[Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/releases) and
make sure it is in your `$PATH`. This is necessary for Hugo to process SASS and
SCSS files. See the
[Hugo documentation](https://gohugo.io/hugo-pipes/scss-sass/) for more
information.

### Development

#### Development Server

The development server watches files, rebuilds the site, and reloads the browser
when files change.

```sh
hugo server
```

### Updating Release Notes for the New Year

Whenever you create your first release note for a product category for a new
year:

1. Add a file called `<year>.md` to the `/content/<product>/release-notes`
   folder. (e.g., `/content/geoip/release-notes/2024.md`) - Add the header to
   your new release note file with the title: `<Product> Release Notes` (e.g.,
   `GeoIP Release Notes`) and draft to `false`. - Add the RSS notification to
   the top of the new file.
2. Change the `title:` field in the previous year's `md` file to read:
   `<Product> Release Notes - <Year> Archive` (e.g.,
   `GeoIP Release Notes - 2023 Archive`) - Remove the RSS notification from the
   top of the archived file.
3. Update link to the release notes in the navigation menu (`hugo.toml`) to
   point to the current year's path.
4. Update the URLs in the redirects file (`static/_redirects`) to the current
   year's path.

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
