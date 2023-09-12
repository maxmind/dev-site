<h3 align="center">
  <img
    alt="MaxMind"
    src="src/assets/svgs/maxmind-logo.svg"
    width="300"
  >
  <br>
  <br>
  <small>Developer Documentation Static Site Generator</small>
</h3>

* * *

## Overview

- **Static Site Generator**: [GatsbyJS](https://www.gatsbyjs.org/) +
  [TypeScript](https://www.typescriptlang.org/) +
  [CSS Modules](https://github.com/css-modules/css-modules) +
  [MDX](https://mdxjs.com/)
- **Linting**: [ESLint](https://eslint.org/) +
  [StyleLint](https://stylelint.io/)
- **Hosting**: [Firebase](https://firebase.google.com/docs/hosting)

## Usage

- [Minimum Requirements](#minimum-requirements)
- [Installation](#installation)
- [Development](#development)
  - [Development Server](#development-server)
  - [Static Server](#static-server)
- [Testing](#testing)
- [Deployments](#deployments)
- [Updating Release Notes for the New Year](#updating-release-notes-for-the-new-year)

### Minimum Requirements

- Node 18
- npm 8.5.5

If you need help installing and/or managing Node and Yarn versions, check out [NVM](https://github.com/nvm-sh/nvm).

### Installation

```sh
npm install && npm run prepare
```

#### Explanation

* `npm install` installs the neccessary node modules for development.
* `npm run prepare` sets up the linting pre-commit hooks via husky.

### Development

#### Development Server

The development server watches files, rebuilds the site, and reloads the browser
when files change.

```sh
npm run develop
```

#### Static Server

The static server is useful for testing features that might only be relevant to
the production build, such as CSP Policies, SRI hashes, Firebase routing
rules (301/302 redirects or url rewrites), and Firebase functions.


```sh
npm run build && npm run serve
```

### Testing

```sh
npm run test             # runs all tests
npm run test:unit        # runs unit tests
npm run test:regressions # runs regression tests
```

### Deployments

This project has two environments: staging environment and production. All
preview links are deployed to the staging environment. The production
environment can only be deploy to via a PR being merged into `main`.

#### Preview Link Generation

All PRs will be assigned a preview link during the CI/CD process. These links
are good for 7 days. To regenerate a link, delete the comment and run the CI/CD
action again.

Users authenticated with the Firebase CLI can generate an ad-hoc preview link
site by running the following from the root of the project.

```sh
npm run build && npm run preview
```

#### Firebase Functions

**Firebase function resources are shared throughout environments.** If two PRs
have changes to Firebase functions, the deployed functions will be those of the
PR whose `Firebase - Staging` GitHub workflow has run most recently.

### Updating Release Notes for the New Year

Whenever you create your first release note for a product category for a new
year:

1. Add a file called `<year>.mdx` to the `content/<product>/release-notes`
folder. (e.g., `content/geoip/release-notes/2024.mdx`)
2. Add the header to your new release note file with the title: `<Product> Release Notes`
(e.g., `GeoIP2 Release Notes`)
3. Add the RSS notification to the top of the new file.
4. Change the `title:` field in the previous year's `mdx` file to read: `<Product> Release Notes - <Year> Archive`
(e.g., `GeoIP2 Release Notes - 2023 Archive`)
5. Remove the RSS notification from the top of the archived file.
6. Update link to the release notes in the navigation menu (`content/navigation.tsx`)
to point to the current year's pathway.
7. Update the URL in the JS redirects (`firebase/redirects/release-notes/current-year.js`)
to the current year's pathway.
8. Update the URLs used to create RSS feeds (`gatsby/gatsby-config/index.ts`) to
the current year's pathway.
