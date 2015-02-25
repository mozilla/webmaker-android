# How to deploy Webmaker App

## Deploying to mofodev/nightly builds

Nothing needs to be done here except merging commits to master **with one exception**; `mozilla/webmaker-app-publisher` still needs to be deployed to heroku manually. You can do this with `git push heroku master` (ping `@k88hudson` for credentials).


## Tagging releases

You should only be deploying/tagging releases if you have commit access. Before you tag a release, it's good progress to check in with the team.

1. On the master branch in `mozilla/webmaker-app` run `npm version patch` if you want to tag a patch, `npm version minor` for a minor release, etc.
2. Push the tag to `mozilla` using `git push --tags`
3. **Wait** for the release to build and deploy to npm. Check `npm info webmaker` to confirm when the tag has been released.
4. Bump `webmaker` to the new version in package.json in `mozilla/webmaker-app-cordova`. Tag a release of `webmaker-app-cordova` using `npm version patch` (or `minor`, etc). Push that tag to `mozilla` with `git push --tags`.
5. Bump `webmaker` to the new version in package.json in `mozilla/webmaker-app-publisher`. Run  `npm version patch` (or `minor`, etc). Push that tag to `mozilla` with `git push --tags`.
6. Push `webmaker-app-publisher` to heroku with `git push heroku master`
