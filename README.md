<h3 align="center">
  <img 
    alt="MaxMind" 
    src=".github/images/maxmind-logo-with-styles.svg" 
    width="300"
  />
  <br/>
  <br/>
  <small>Developer Documentation Static Site Generator</small>
</h3>

- - -

## Overview

* __Static Site Generator__: [GatsbyJS](https://www.gatsbyjs.org/) + 
[TypeScript](https://www.typescriptlang.org/) + 
[CSS Modules](https://github.com/css-modules/css-modules) + 
[MDX](https://mdxjs.com/)
* __Linting__: [ESLint](https://eslint.org/) +
[StyleLint](https://stylelint.io/) + 
[RemarkLint](https://github.com/remarkjs/remark-lint)
* __Hosting__: [Firebase](https://firebase.google.com/docs/hosting)


## Usage

* [Minimum Requirements](#minimum-requirements)
* [Installation](#installation)
* [Development](#development)
  * [Development Server](#development-server)
  * [Static Server](#static-server)
* [Testing](#testing)
* [Deployments](#deployments)

### Minimum Requirements
* Node 10.13.0
* Yarn 1.17.3

If you need help installing and/or managing Node and Yarn versions, check out [NVM](https://github.com/nvm-sh/nvm) or [Volta](https://docs.volta.sh/guide/).

### Installation
```sh
yarn install
```

### Development

#### Development Server
The development server watches files, rebuilds the site, and reloads the browser when files change.

```sh
yarn develop
```

#### Static Server
The static server is useful for testing features that might only be relevant to the production build, such as CSP Policies, SRI hashes, and Firebase routing rules, such as 301/302 redirects or url rewrites.

```sh
yarn serve
```

### Testing

(todo)

### Deployments
This project can be deployed to a staging environment or a production environment.

#### Staging Environment

Users authenticated with the Firebase CLI can deploy to the staging site by running the following from the root of the project.

```sh
yarn deploy
```

### Production Environment

Deployment to production is only meant to be done from via GitHub actions as part of our CI/CD pipeline. 
