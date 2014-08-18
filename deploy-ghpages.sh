#!/bin/sh

make build

cd build
git init
git config user.name "Travis-CI"
git add .
git commit -m "Deploy"
git push --force "https://${GH_TOKEN}@${GH_REF}" gh-pages
