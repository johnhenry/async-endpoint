#!/bin/sh
echo "\nType Checking...\n"
npm run flow check
rm -rf browser
rm -rf node
npm run type
cp index.js browser/index.js
git add browser
echo "\033[42mType Checking Successful!\033[0m\n"
