#! /bin/bash
version=`git diff HEAD^..HEAD -- "$(git rev-parse --show-toplevel)"/package.json | grep '^\+.*version' | sed -s 's/[^0-9\.]//g'`

if [ "$version" != "" ]; then
    branch=$(git rev-parse --abbrev-ref HEAD)
    echo "Pushing to remote repository $branch..."  
    git push origin $branch --tags
    if [ "$branch" == "master" ]; then
        echo "Publishing..."  
        npm publish
        echo "\033[42mPublished v$version to NPM.\033[0m\n"
    fi

fi
