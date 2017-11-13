#!/bin/sh
midir node

cp -R browser node

for file in node/*.js
do
 echo "changing $file to${file%.js}.mjs"
 mv "$file" "${file%.js}.mjs"
done

for file in node/sub-modules/*.js
do
 echo "changing $file to${file%.js}.mjs"
 mv "$file" "${file%.js}.mjs"
done

for file in node/sub-modules/*/*.js
do
 echo "changing $file to${file%.js}.mjs"
 mv "$file" "${file%.js}.mjs"
done

git add node

echo "\033[42mExtension Change Successful!\033[0m\n"