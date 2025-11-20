#!/bin/bash

set -eu

# Generate _headers file from TypeScript configuration
npx tsx scripts/generate-headers.ts

hugo --gc --minify -b "$CF_PAGES_URL"
