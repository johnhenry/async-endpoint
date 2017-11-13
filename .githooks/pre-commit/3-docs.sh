#!/bin/sh
npm run docs

echo "\nCreating documentation...\n"
npm run test
echo "\033[42mDocumentation creation successful!\033[0m\n"