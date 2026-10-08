#!/bin/bash

set -eu

# Generate _headers file from TypeScript configuration
pnpm run build:headers

hugo --gc --minify --cleanDestinationDir -b "$CF_PAGES_URL"

# Reads public/, so it must run after hugo
pnpm run build:llms-full
