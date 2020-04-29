<h3 align="center">
  <img 
    alt="MaxMind" 
    src="src/images/maxmind-logo-with-styles.svg" 
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


## Usage

* [Minimum Requirements](#minimum-requirements)
* [Installation](#installation)
* [Development](#development)
  * [Development Server](#development-server)
  * [Static Server](#static-server)
* [Testing](#testing)
* [Deployment](#deployment)

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
Build the static site and then serve them by running the following command. This is useful for testing features that might only be relevant to the production build, such as CSP Policies and SRI hashes.

```sh
yarn serve
```

### Testing

(todo)

### Deployment

(todo)
