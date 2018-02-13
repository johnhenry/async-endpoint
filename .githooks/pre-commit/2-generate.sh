#!/bin/sh
echo "\Creating Files...\n"
## remove types
echo "Creating JS Files"
rm -rf js/
npm run type
git add js/
echo "Creating MJS Filses"
rm -rf mjs/
cp -r js/ mjs/
echo "renaming files to mjs"
find ./mjs/ -name "*.js" -exec rename -v 's/\.js$/\.mjs/i' {} \;
echo "changing references to mjs"
find ./mjs/ -type f -exec sed -i 's/.js"/.mjs"/g' {} +
git add mjs/
# echo "Creating Common JS and Browser Files"
# npm run rollup
echo "\033[42mType Checking Successful!\033[0m\n"