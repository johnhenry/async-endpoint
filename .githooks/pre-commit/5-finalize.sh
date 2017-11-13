#!/bin/sh
# Allows us to read user input below, assigns stdin to keyboard
exec < /dev/tty

while true; do
  read -p "Finalize this commit? " yn
  if [ "$yn" = "" ]; then
    yn='Y'
  fi
  case $yn in
      [Yy] ) bundle outdated --pre; break;;
      [Nn] ) exit;;
      * ) echo "Please answer y or n for yes or no.";;
  esac
done