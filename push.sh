#!/bin/bash

git reset
#git pull
git add .
git status
git commit -m `date +%Y-%m-%d@%H-%M-%S`
git push -u origin master
