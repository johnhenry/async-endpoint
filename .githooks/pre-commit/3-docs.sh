#!/bin/sh
echo "\nCreating documentation...\n"
npm run docs
rm readme.md
git add docs/api.md
git add readme.md
echo "\033[42mDocumentation successfully created!\033[0m\n"