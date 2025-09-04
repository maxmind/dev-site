#!/bin/bash

set -eu

hugo --gc --minify -b "$CF_PAGES_URL"
npm run html2md
