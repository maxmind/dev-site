#!/bin/bash

set -eu

# Generate _headers file from TypeScript configuration
pnpm run build:headers

hugo --gc --minify -b "$CF_PAGES_URL"
