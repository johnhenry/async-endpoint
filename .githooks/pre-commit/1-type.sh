#!/bin/sh
echo "\nType checking...\n"
npm run flow check
rm -rf sub-modules
npm run type
git add sub-modules
echo "\033[42mType checking successful!\033[0m\n"

