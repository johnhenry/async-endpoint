#!/bin/sh
echo "\nCreating documentation...\n"
npm run extract-api-and-combine
git reset -- docs/api.md
rm docs/api.md
git add readme.md
echo "\033[42mDocumentation successfully created!\033[0m\n"