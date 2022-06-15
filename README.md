<h3 align="center">
  <img
    alt="MaxMind"
    src=".github/images/maxmind-logo-with-styles.svg"
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
  [StyleLint](https://stylelint.io/) +
  [RemarkLint](https://github.com/remarkjs/remark-lint)
- **Hosting**: [Firebase](https://firebase.google.com/docs/hosting)

## Usage

- [Minimum Requirements](#minimum-requirements)
- [Installation](#installation)
- [Development](#development)
  - [Development Server](#development-server)
  - [Static Server](#static-server)
- [Testing](#testing)
- [Deployments](#deployments)

### Minimum Requirements

- Node 16
- npm 8.5.5

If you need help installing and/or managing Node and Yarn versions, check out [NVM](https://github.com/nvm-sh/nvm).

### Installation

```sh
npm install
```

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
npm run test:a11y        # runs accessibility tests
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
