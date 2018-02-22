echo 
    echo $(git symbolic-ref --short HEAD)
    echo "--------------------------------------------"
    echo id: $(git rev-parse HEAD )
    echo "--------------------------------------------"
    echo $(git --no-pager log -1 HEAD --pretty=format:%s)
    echo ""
echo "\033[42mFile Successfully Committed!\033[0m\n"