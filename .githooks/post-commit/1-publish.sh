#! /bin/bash
version=`git diff HEAD^..HEAD -- "$(git rev-parse --show-toplevel)"/package.json | grep '^\+.*version' | sed -s 's/[^0-9\.]//g'`

if [ "$version" != "" ]; then
    branch=$(git rev-parse --symbolic --abbrev-ref $1)
    echo "Pushing to remote repository..."  
    #
    #git push origin $branch
    if [branch == "master"]; then
        echo "Publishing..."  
        npm publish
        echo "\033[42mPublished v$version to NPM.\033[0m\n"
    fi

fi

